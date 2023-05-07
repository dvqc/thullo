/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";

export const listsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.list.findMany();
  }),

  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const list = await ctx.prisma.list.findUnique({
      where: { id: input },
      include: {
        tasks: {
          select: {
            id: true,
            order: true
          }
        }
      }
    });

    if (!list) throw new TRPCError({ code: "NOT_FOUND" });

    return list;
  }),
  create: protectedProcedure
    .input(
      z.object({
        data: z.object({
          title: z.string()
        }),
        boardId: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const board = await ctx.prisma.board.findUnique({
        where: {
          id: input.boardId
        }
      });

      if (!board) throw new TRPCError({ code: "BAD_REQUEST" });
      if (board.userId != userId) throw new TRPCError({ code: "FORBIDDEN" });

      const list = await ctx.prisma.list.create({
        data: {
          ...input.data,
          boardId: board.id
        }
      });

      return list;
    })
});
