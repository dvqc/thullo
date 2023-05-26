import { createTRPCRouter } from "~/server/api/trpc";
import { boardRouter } from "~/server/api/routers/boards";
import usersRouter from "./routers/users";
import { tasksRouter } from "./routers/tasks";
import { listsRouter } from "./routers/lists";
import { commentsRouter } from "./routers/comments";
import { labelsRouter } from "./routers/labels";
import { invitationsRouter } from "./routers/invitations";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  boards: boardRouter,
  users: usersRouter,
  tasks: tasksRouter,
  lists: listsRouter,
  comments: commentsRouter,
  labels: labelsRouter,
  invitations: invitationsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
