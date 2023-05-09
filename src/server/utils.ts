import { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export async function memberGuard(prisma: PrismaClient, boardId: string, userId: string) {
  const board = await prisma.board.findUnique({
    where: {
      id: boardId
    },
    include: {
      team: true
    }
  });
  if (!board) throw new TRPCError({ code: "BAD_REQUEST" });

  if (userId === board.userId) return;

  for (const member of board.team) {
    if (member.id === userId) return;
  }

  throw new TRPCError({ code: "FORBIDDEN" });
}
