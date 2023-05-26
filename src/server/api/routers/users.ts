import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const usersRouter = createTRPCRouter({
  search: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    if (input.length < 2) return [];
    const foundUsers = await ctx.prisma.user.findMany({
      where: {
        name: {
          contains: input
        }
      }
    });
    return foundUsers;
  }),
  searchInBoard: protectedProcedure
    .input(
      z.object({
        boardId: z.string().min(1),
        q: z.string().min(1)
      })
    )
    .query(async ({ ctx, input }) => {
      if (input.q.length < 2) return [];

      const foundUsers = await ctx.prisma.user.findMany({
        where: {
          AND: {
            boards: {
              some: {
                id: input.boardId
              }
            },
            name: {
              contains: input.q
            }
          }
        }
      });
      return foundUsers;
    })
});

export default usersRouter;
