import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const CSV_Router = createTRPCRouter({
    CSV_Upload: publicProcedure.
        input(z.string()).
        mutation(({input}) => {
            console.log(input)
        })
});