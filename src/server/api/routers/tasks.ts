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
      memberGuard(ctx.prisma, list.boardId, userId);

      const task = await ctx.prisma.task.create({
        data: {
          listId: input.listId,
          ...input.data
        }
      });

      return task;
    })
});
