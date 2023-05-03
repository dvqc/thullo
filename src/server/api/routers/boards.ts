/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const boardRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.board.findMany({
      include: {
        owner: true,
        team:  true
      }
    });
  }),

  getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const board = await ctx.prisma.board.findUnique({
      where: { id: input.id }
    });

    if (!board) throw new TRPCError({ code: "NOT_FOUND" });

    return board;
  }),

  getOwn: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session.user.id;
    return ctx.prisma.board.findMany({
      where: {
        userId: {
          equals: userId
        }
      },
      include: {
        owner: true,
        team: true
      }
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        isPrivate: z.boolean().optional(),
        picture: z.string().optional()
        // .any()
        // .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
        // .refine(
        //   (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        //   "Only .jpg, .jpeg, .png and .webp formats are supported."
        // )
        // .optional()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.session.user.id;
      const board = await ctx.prisma.board.create({
        data: {
          ...input,
          userId: authorId
        }
      });

      return board;
    })
});
