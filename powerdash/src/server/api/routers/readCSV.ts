import { object, z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { PrismaClient } from "@prisma/client";
import Papa, {ParseResult} from "papaparse"

const prisma = new PrismaClient();

interface employee {
  employeeID: string | null;
  employeeArea: string;
  work_location: string;
  certificationName: string;
  expirationDate: string;
  certificationType: string;
}

async function separateCSV(data: string){
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
  
  let size = parsedData.data.length;
  let prismaInsert;

  for(let i = 0; i < size; i++){
    //Separamos la "work_location" por comas
    let locations = parsedData.data[i]?.work_location.split(",");

    // prismaInsert = await prisma.employee.create({
    //   data:{
    //     employeeID: parsedData.data[i]?.employeeID as string,
    //     employeeCountry: locations?.[2] as string,
    //     employeeCity: locations?.[0] as string,
    //     employeeState: locations?.[1] as string,
    //     employeeArea: parsedData.data[i]?.employeeArea as string
    //   }
    // })

    prismaInsert = await prisma.certification.create({
      data:{
        employeeID: parsedData.data[i]?.employeeID as string,
        certificationName: parsedData.data[i]?.certificationName as string,
        expirationDate: new Date(parsedData.data[i]?.expirationDate as string),
        certificationType: parsedData.data[i]?.certificationType as string,
        marketCertification: false,
        employeeId: parsedData.data[i]?.employeeID as string
      }
    })

  }

  //console.log("Size: ", parsedData.data);
}

export const CSV_Router = createTRPCRouter({
  CSV_Upload: publicProcedure.
    input(z.string()).
    mutation(async ({input}) => {
      const CSV_Result = await separateCSV(input)
    })
});