import { createTRPCRouter } from "~/server/api/trpc";
import { boardRouter } from "~/server/api/routers/boards";
import usersRouter from "./routers/users";
import { tasksRouter } from "./routers/tasks";
import { listsRouter } from "./routers/lists";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  boards: boardRouter,
  users: usersRouter,
  tasks: tasksRouter,
  lists: listsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
