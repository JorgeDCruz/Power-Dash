import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { PrismaClient } from "@prisma/client";
import helpers from "~/utils/middleware/helpers";
import { Console } from "console";

const prisma = new PrismaClient();

function getRandom(min: number, max: number){
    min = Math.ceil(min);   
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const graphRouter = createTRPCRouter({
    dataGraph: publicProcedure
        .input(z.object({
            xAxis: z.string(),
            yAxis: z.string(),
            type: z.string()
        }))
        .query(async (req) => {
            const { input } = req;
            //Debido a que no tenemos tiempo para recopilar los datos y procesarlos optamos por regresar dummy data
            //Si se llegase a dar el tiempo se deberian de hacer 2 consultas a la base de datos y contar cuantos valores regresa
            const xValue = getRandom(100, 500);
            const yValue = getRandom(100, 500);
            let values = {xValue, yValue};
            return values;
        })
});
