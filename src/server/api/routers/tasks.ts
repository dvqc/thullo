import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { boardMemberGuard, taskMemberGuard } from "~/server/utils";

export const tasksRouter = createTRPCRouter({
  getPreviewById: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const task = await ctx.prisma.task.findUnique({
      where: { id: input },
      include: {
        labels: true,
        list: {
          include: {
            board: true
          }
        },
        _count: {
          select: {
            comments: true
          }
        },
        members: {
          take: 3,
          select: {
            _count: true,
            id: true,
            name: true,
            image: true
          }
        }
      }
    });

    if (!task) throw new TRPCError({ code: "NOT_FOUND" });
    if (!task.list.board.isPrivate) return task as Omit<typeof task, "list">;
    const userId = ctx.session.user.id;
    await boardMemberGuard(ctx.prisma, task.list.boardId, userId);

    return task as Omit<typeof task, "list">;
  }),
  getById: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const task = await ctx.prisma.task.findUnique({
      where: { id: input },
      include: {
        labels: true,
        comments: true,
        list: {
          include: {
            board: true
          }
        },
        members: {
          select: {
            id: true,
            name: true,
            image: true
          }
        }
      }
    });
    if (!task) throw new TRPCError({ code: "NOT_FOUND" });
    const { list, ...taskReturn } = task;

    if (!list.board.isPrivate) return { ...taskReturn, list: { title: list.title } };
    const userId = ctx.session.user.id;
    await boardMemberGuard(ctx.prisma, list.boardId, userId);

    return { ...taskReturn, list: { title: list.title } };
  }),

  create: protectedProcedure
    .input(
      z.object({
        listId: z.string(),
        data: z.object({
          title: z.string(),
          description: z.string().optional(),
          cover: z.string().optional(),
          indx: z.number()
        })
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const list = await ctx.prisma.list.findUnique({
        where: {
          id: input.listId
        }
      });

      if (!list) throw new TRPCError({ code: "BAD_REQUEST" });
      await boardMemberGuard(ctx.prisma, list.boardId, userId);

      const task = await ctx.prisma.task.create({
        data: {
          listId: input.listId,
          ...input.data
        }
      });

      return task;
    }),

  patch: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.object({
          title: z.string().optional(),
          description: z.string().optional(),
          cover: z.string().optional()
        })
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const taskToUpdate = await ctx.prisma.task.findUnique({
        where: {
          id: input.id
        },
        include: {
          list: true
        }
      });

      if (!taskToUpdate) throw new TRPCError({ code: "NOT_FOUND" });
      await boardMemberGuard(ctx.prisma, taskToUpdate.list.boardId, userId);

      const updatedTask = await ctx.prisma.task.update({
        data: {
          ...input.data
        },
        where: {
          id: input.id
        }
      });

      return updatedTask;
    }),

  moveTask: protectedProcedure
    .input(
      z.object({
        taskId: z.string(),
        destListId: z.string(),
        indx: z.number().min(0)
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const destList = await ctx.prisma.list.findUnique({
        where: {
          id: input.destListId
        }
      });
      const task = await ctx.prisma.task.findUnique({
        where: {
          id: input.taskId
        },
        include: {
          list: true
        }
      });
      if (!destList || !task || !task.list) throw new TRPCError({ code: "BAD_REQUEST" });
      await boardMemberGuard(ctx.prisma, destList.boardId, userId);
      if (task.listId !== input.destListId) await boardMemberGuard(ctx.prisma, task.list.boardId, userId);

      if (input.destListId !== task.listId)
        await ctx.prisma.$transaction([
          ctx.prisma
            .$executeRaw`UPDATE Task SET indx = indx+1 WHERE "listId"=${input.destListId} and indx >= ${input.indx};`,
          ctx.prisma.task.update({
            data: {
              listId: input.destListId,
              indx: input.indx
            },
            where: {
              id: input.taskId
            }
          }),
          ctx.prisma.$executeRaw`UPDATE Task SET indx = indx-1 WHERE "listId"=${task.listId} and indx > ${task.indx};`
        ]);
      else if (input.indx > task.indx)
        await ctx.prisma.$transaction([
          ctx.prisma.$executeRaw`UPDATE Task SET indx = -1 WHERE id=${input.taskId};`,
          ctx.prisma
            .$executeRaw`UPDATE Task SET indx = indx-1 WHERE "listId"=${task.listId} and indx > ${task.indx} and indx <= ${input.indx};`,
          ctx.prisma.$executeRaw`UPDATE Task SET indx =${input.indx} WHERE id=${input.taskId};`
        ]);
      else if (input.indx < task.indx)
        await ctx.prisma.$transaction([
          ctx.prisma.$executeRaw`UPDATE Task SET indx = -1 WHERE id=${input.taskId};`,
          ctx.prisma
            .$executeRaw`UPDATE Task SET indx = indx+1 WHERE "listId"=${task.listId} and indx < ${task.indx} and indx >= ${input.indx};`,
          ctx.prisma.$executeRaw`UPDATE Task SET indx =${input.indx} WHERE id=${input.taskId};`
        ]);
    })
});
