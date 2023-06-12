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
interface ReturnData {
    [label: number]: number;
}

export type { ReturnData };

export const graphRouter = createTRPCRouter({
    dataGraph: publicProcedure
        .input(z.object({
            xAxis: z.string(),
            yAxis: z.string(),
            type: z.string(),
            selects: z.number().nonnegative().min(0)
        }))
        .mutation(async (req) => {
            const { input: {selects} } = req;
            //Debido a que no tenemos tiempo para recopilar los datos y procesarlos optamos por regresar dummy data
            //Si se llegase a dar el tiempo se deberian de hacer 2 consultas a la base de datos y contar cuantos valores regresa
            const xValue = getRandom(100, 500);
            const yValue = getRandom(100, 500);
            const values = {xValue, yValue};

            let data: ReturnData = {};

            for(let i=0;i<selects;i++){
                data[`${i}`] = getRandom(100, 500);
            }

            return data;
        })
});
