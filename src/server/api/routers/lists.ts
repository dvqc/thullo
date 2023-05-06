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
        tasks: true
      }
    });

    if (!list) throw new TRPCError({ code: "NOT_FOUND" });

    return list;
  })

  // create: protectedProcedure.mutation(async ({ ctx, input }) => {
  //   // const authorId = ctx.userId;
  //   const list = await ctx.prisma.list.create({
  //     data: {
  //       // userId: authorId,
  //       content: input.content
  //     }
  //   });

  //   return list;
  // })
});
