import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { boardMemberGuard, taskMemberGuard } from "~/server/utils";

export const commentsRouter = createTRPCRouter({
  getById: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const comment = await ctx.prisma.comment.findUnique({
      where: { id: input },
      include: {
        owner: {
          select: {
            id: true,
            image: true,
            name: true
          }
        },
        task: {
          include: {
            list: {
              select: {
                boardId: true
              }
            }
          }
        }
      }
    });
    const userId = ctx.session.user.id;
    if (!comment) throw new TRPCError({ code: "NOT_FOUND" });
    await boardMemberGuard(ctx.prisma, comment.task.list.boardId, userId);

    return comment;
  }),
  getByTaskId: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const task = await ctx.prisma.task.findUnique({
      where: { id: input },
      include: {
        list: true
      }
    });
    if (!task) throw new TRPCError({ code: "NOT_FOUND" });
    const userId = ctx.session.user.id;
    await boardMemberGuard(ctx.prisma, task.list.boardId, userId);
    const comments = await ctx.prisma.comment.findMany({
      where: {
        taskId: input
      },
      include: {
        owner: {
          select: {
            id: true,
            image: true,
            name: true
          }
        }
      }
    });
    return comments;
  }),

  create: protectedProcedure
    .input(
      z.object({
        taskId: z.string(),
        data: z.object({
          text: z.string().min(1)
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
      await taskMemberGuard(ctx.prisma, task.id, userId);

      const comment = await ctx.prisma.comment.create({
        data: {
          taskId: input.taskId,
          userId,
          createdOn: new Date(),
          ...input.data
        }
      });

      return comment;
    }),

  patch: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.object({
          text: z.string().min(1)
        })
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const commentToUpdate = await ctx.prisma.comment.findUnique({
        where: {
          id: input.id
        }
      });

      if (!commentToUpdate) throw new TRPCError({ code: "NOT_FOUND" });
      if (commentToUpdate.userId !== userId) throw new TRPCError({ code: "FORBIDDEN" });

      const updatedComment = await ctx.prisma.comment.update({
        data: {
          ...input.data
        },
        where: {
          id: input.id
        }
      });

      return updatedComment;
    }),

  delete: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    const comment = await ctx.prisma.comment.findUnique({
      where: {
        id: input
      }
    });

    if (!comment) throw new TRPCError({ code: "NOT_FOUND" });
    if (comment.userId !== userId) throw new TRPCError({ code: "FORBIDDEN" });

    const deletedComment = await ctx.prisma.comment.delete({
      where: {
        id: input
      }
    });
    return deletedComment;
  })
});
