import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { memberGuard } from "~/server/utils";

export const tasksRouter = createTRPCRouter({
  getById: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const task = await ctx.prisma.task.findUnique({
      where: { id: input },
      include: {
        labels: true,
        members: true
      }
    });

    if (!task) throw new TRPCError({ code: "NOT_FOUND" });

    return task;
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
      await memberGuard(ctx.prisma, list.boardId, userId);

      const task = await ctx.prisma.task.create({
        data: {
          listId: input.listId,
          ...input.data
        }
      });

      return task;
    }),

  moveTask: protectedProcedure
    .input(
      z.object({
        taskId: z.string(),
        distListId: z.string(),
        indx: z.number().min(0)
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const distList = await ctx.prisma.list.findUnique({
        where: {
          id: input.distListId
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
      if (!distList || !task || !task.list) throw new TRPCError({ code: "BAD_REQUEST" });
      await memberGuard(ctx.prisma, distList.boardId, userId);
      await memberGuard(ctx.prisma, task.list.boardId, userId);

      if (input.distListId !== task.listId)
        await ctx.prisma.$transaction([
          ctx.prisma
            .$executeRaw`UPDATE Task SET indx = indx+1 WHERE listId=${input.distListId} and indx >= ${input.indx};`,
          ctx.prisma.task.update({
            data: {
              listId: input.distListId,
              indx: input.indx
            },
            where: {
              id: input.taskId
            }
          }),
          ctx.prisma.$executeRaw`UPDATE Task SET indx = indx-1 WHERE listId=${task.listId} and indx > ${task.indx};`
        ]);
      else if (input.indx > task.indx)
        await ctx.prisma.$transaction([
          ctx.prisma.$executeRaw`UPDATE Task SET indx = -1 WHERE id=${input.taskId};`,
          ctx.prisma
            .$executeRaw`UPDATE Task SET indx = indx-1 WHERE listId=${task.listId} and indx > ${task.indx} and indx <= ${input.indx};`,
          ctx.prisma.$executeRaw`UPDATE Task SET indx =${input.indx} WHERE id=${input.taskId};`
        ]);
      else if (input.indx < task.indx)
        await ctx.prisma.$transaction([
          ctx.prisma.$executeRaw`UPDATE Task SET indx = -1 WHERE id=${input.taskId};`,
          ctx.prisma
            .$executeRaw`UPDATE Task SET indx = indx+1 WHERE listId=${task.listId} and indx < ${task.indx} and indx >= ${input.indx};`,
          ctx.prisma.$executeRaw`UPDATE Task SET indx =${input.indx} WHERE id=${input.taskId};`
        ]);
    })
});
