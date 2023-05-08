/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";
import { memberGuard } from "~/server/utils";

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
          },
          orderBy: {
            order: "asc"
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

      memberGuard(ctx.prisma, input.boardId, userId);

      const list = await ctx.prisma.list.create({
        data: {
          ...input.data,
          boardId: input.boardId
        }
      });

      return list;
    }),

  patch: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.object({
          title: z.string().optional()
        })
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      let list = await ctx.prisma.list.findUnique({
        where: {
          id: input.id
        }
      });
      if (!list) throw new TRPCError({ code: "NOT_FOUND" });
      memberGuard(ctx.prisma, list.boardId, userId);

      list = await ctx.prisma.list.update({
        data: {
          ...input.data
        },
        where: {
          id: input.id
        }
      });

      return list;
    }),

  delete: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    const list = await ctx.prisma.list.findUnique({
      where: { id: input },
      include: {
        board: true
      }
    });

    if (!list) throw new TRPCError({ code: "NOT_FOUND" });
    memberGuard(ctx.prisma, list.boardId, userId);

    const deleted = await ctx.prisma.list.delete({
      where: {
        id: input
      }
    });

    return deleted;
  })
});
