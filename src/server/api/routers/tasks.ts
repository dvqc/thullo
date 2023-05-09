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
          order: z.number()
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
        order: z.number().min(0)
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
            .$executeRaw`UPDATE Task SET order = order+1 WHERE listId=${input.distListId} and order >= ${input.order};`,
          ctx.prisma.task.update({
            data: {
              listId: input.distListId,
              order: input.order
            },
            where: {
              id: input.taskId
            }
          }),
          ctx.prisma.$executeRaw`UPDATE Task SET order = order-1 WHERE listId=${task.listId} and order > ${task.order};`
        ]);
      else if (input.order > task.order)
        await ctx.prisma.$transaction([
          ctx.prisma.$executeRaw`UPDATE Task SET order = -1 WHERE id=${input.taskId};`,
          ctx.prisma
            .$executeRaw`UPDATE Task SET order = order-1 WHERE listId=${task.listId} and order > ${task.order} and order <= ${input.order};`,
          ctx.prisma.$executeRaw`UPDATE Task SET order =${input.order} WHERE id=${input.taskId};`
        ]);
      else if (input.order < task.order)
        await ctx.prisma.$transaction([
          ctx.prisma.$executeRaw`UPDATE Task SET order = -1 WHERE id=${input.taskId};`,
          ctx.prisma
            .$executeRaw`UPDATE Task SET order = order+1 WHERE listId=${task.listId} and order < ${task.order} and order >= ${input.order};`,
          ctx.prisma.$executeRaw`UPDATE Task SET order =${input.order} WHERE id=${input.taskId};`
        ]);
    })
});
