/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";
import { content } from "tailwind.config.cjs";

export const boardRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.board.findMany();
  }),

  getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const board = await ctx.prisma.board.findUnique({
      where: { id: input.id }
    });

    if (!board) throw new TRPCError({ code: "NOT_FOUND" });

    return board;
  })

  // create: protectedProcedure.mutation(async ({ ctx, input }) => {
  //   // const authorId = ctx.userId;
  //   const board = await ctx.prisma.board.create({
  //     data: {
  //       // userId: authorId,
  //       content: input.content
  //     }
  //   });

  //   return board;
  // })
});
