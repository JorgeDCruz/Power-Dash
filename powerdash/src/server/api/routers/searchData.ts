import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const searchRouter = createTRPCRouter({
    searchData: publicProcedure
        .input(z.string())
        .mutation(async (req) => {
            const {input} = req;
            const given_ID = input;
            //Hay que checar que nos regresa la query si no encuentra el dato
            const retrievedRecords = await prisma.user.findMany({ where: {id: given_ID}});
            if(!retrievedRecords){
                throw new Error('No se encontro usuarios con el ID');
            }
            return retrievedRecords;
        })
});