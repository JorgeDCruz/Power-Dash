import { createTRPCRouter } from "~/server/api/trpc";
import { authRouter } from "~/server/api/routers/authenticationRoute";
import { CSV_Router } from "./routers/readCSV";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  CSV: CSV_Router
});

// export type definition of API
export type AppRouter = typeof appRouter;
