import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const invitationsRouter = createTRPCRouter({
  getUserInvitations: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const receivedInvitations = await ctx.prisma.invitations.findMany({
      where: { receiverId: userId },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        board: true
      }
    });

    return receivedInvitations;
  }),

  sendInvitation: protectedProcedure
    .input(
      z.object({
        receiverId: z.string().min(1),
        data: z.object({
          boardId: z.string().min(1)
        })
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      if (userId === input.receiverId) throw new TRPCError({ code: "BAD_REQUEST" });
      const receiver = ctx.prisma.user.findUnique({
        where: {
          id: input.receiverId
        }
      });
      if (!receiver) throw new TRPCError({ code: "NOT_FOUND" });
      const board = await ctx.prisma.board.findUnique({
        where: {
          id: input.data.boardId
        }
      });

      if (!board) throw new TRPCError({ code: "BAD_REQUEST" });
      if (userId !== board.userId) throw new TRPCError({ code: "FORBIDDEN" });

      const invitation = await ctx.prisma.invitations
        .create({
          data: {
            ...input.data,
            receiverId: input.receiverId,
            senderId: userId
          }
        })
        .catch((err) => {
          if (err.code === "P2002") throw new TRPCError({ code: "CONFLICT" });
        });
      return invitation;
    }),

  acceptInvitation: protectedProcedure
    .input(
      z.object({
        boardId: z.string().min(1),
        senderId: z.string().min(1)
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      if (userId === input.senderId) throw new TRPCError({ code: "BAD_REQUEST" });

      const invitation = await ctx.prisma.invitations.findUnique({
        where: {
          senderId_receiverId_boardId: { senderId: input.senderId, receiverId: userId, boardId: input.boardId }
        }
      });
      if (!invitation) throw new TRPCError({ code: "NOT_FOUND" });
      const board = await ctx.prisma.board.findUnique({
        where: {
          id: input.boardId
        }
      });
      if (!board || board.userId !== input.senderId) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const sender = await ctx.prisma.user.findUnique({
        where: {
          id: input.senderId
        }
      });
      if (!sender) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      await ctx.prisma.board.update({
        data: {
          team: {
            connect: { id: userId }
          }
        },
        where: {
          id: board.id
        }
      });

      return;
    })
});
