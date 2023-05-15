import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { boardMemberGuard, taskMemberGuard } from "~/server/utils";

export const labelsRouter = createTRPCRouter({
  getByTaskId: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const task = await ctx.prisma.task.findUnique({
      where: { id: input },
      include: {
        list: {
          include: {
            board: true
          }
        }
      }
    });

    if (!task) throw new TRPCError({ code: "NOT_FOUND" });

    const labels = await ctx.prisma.label.findMany({
      where: {
        taskId: input
      }
    });

    if (!task.list.board.isPrivate) return labels;
    const userId = ctx.session.user.id;
    await boardMemberGuard(ctx.prisma, task.list.boardId, userId);

    return labels;
  }),

  create: protectedProcedure
    .input(
      z.object({
        taskId: z.string(),
        data: z.object({
          name: z.string().min(1),
          color: z.string().min(3).max(6)
        })
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const task = await ctx.prisma.task.findUnique({
        where: {
          id: input.taskId
        },
        include: {
          list: true
        }
      });

      if (!task) throw new TRPCError({ code: "BAD_REQUEST" });
      await boardMemberGuard(ctx.prisma, task.list.boardId, userId);

      const label = await ctx.prisma.label.create({
        data: {
          taskId: input.taskId,
          ...input.data
        }
      });

      return label;
    })
});
