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
  })
});

export default usersRouter;
