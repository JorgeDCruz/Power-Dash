import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { PrismaClient } from "@prisma/client";
import Papa, {ParseResult} from "papaparse"

const prisma = new PrismaClient();

interface employee {
    employeeID: string;
    employeeArea: string;
    work_location: string;
    certificationName: string;
    expirationDate: string;
    certificationType: string;
}


function separateCSV(data: string){
    const config = {
        header: true,
        //Cambiamos los nombres de las columnas por aquellas de la DB
        transformHeader: (header: any) => {
          switch (header) {
            case "uid":
              return "employeeID";
            case "org":
              return "employeeArea";
            case "certification":
              return "certificationName";
            case "issue_date":
                return "expirationDate";
            case "type":
                return "certificationType"
            default:
              return header;
          }
        },
    };
    //Hay que separar los datos de work_location para poderlo subir a la DB
    const parsedData:ParseResult<employee>  = Papa.parse(data, config);
    console.log("D: ", parsedData.data[0]?.work_location)

       
}

export const CSV_Router = createTRPCRouter({
    CSV_Upload: publicProcedure.
        input(z.string()).
        mutation(({input}) => {
            separateCSV(input)
        })

});