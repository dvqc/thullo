import { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export async function boardMemberGuard(prisma: PrismaClient, boardId: string, userId: string) {
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

export async function taskMemberGuard(prisma: PrismaClient, taskId: string, userId: string) {
  const task = await prisma.task.findUnique({
    where: {
      id: taskId
    },
    include: {
      members: true,
      list: {
        include: {
          board: true
        }
      }
    }
  });
  if (!task) throw new TRPCError({ code: "BAD_REQUEST" });

  if (userId === task.list.board.userId) return;

  for (const member of task.members) {
    if (member.id === userId) return;
  }

  throw new TRPCError({ code: "FORBIDDEN" });
}
