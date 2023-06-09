import { z } from "zod";
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

//Funcion para procesar los datos
//Si un dato viene vacio se le asigna un valor por defecto
function processData(data: employee[], size: number){
  const correctData: employee[] = [...data];

  for(let i = 0; i < size; i++){
    if(correctData[i]?.employeeArea == ''){
      correctData[i]!.employeeArea = "Unknown work area";
    }

    if(correctData[i]?.work_location == ''){
      correctData[i]!.work_location = "Guadalajara, JAL, Mexico";
    }
    
    if(correctData[i]?.certificationName == ''){
      correctData[i]!.certificationName = "Unknown certification";
    }

    if(correctData[i]?.expirationDate == ''){
      correctData[i]!.expirationDate = "1/1/2000";
    }

    if(correctData[i]?.certificationType == ''){
      correctData[i]!.certificationType = "Unknown";
    }

  }
  return correctData;
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
  const size: number = parsedData.data.length;
  let prismaInsert;

  //Utilizaremos los datos postprocesamiento
  const correctedData = processData(parsedData.data, size);

  for(let i = 0; i < size; i++){
    const locations = correctedData[i]?.work_location.split(",");
    const existingUser = await prisma.employee.findUnique({ where: { employeeID: <string>correctedData[i]?.employeeID } });

    if(!existingUser){
      prismaInsert = await prisma.employee.create({
        data:{
          employeeID: correctedData[i]?.employeeID as string,
          employeeCountry: locations?.[2] as string,
          employeeCity: locations?.[0] as string,
          employeeState: locations?.[1] as string,
          employeeArea: correctedData[i]?.employeeArea as string,
        }
      })
    }
    //Falta el fix que Jairo hizo para la relacion de uno a muchos 

    // const userID = existingUser?.id;
    // const existingCertification = await prisma.certification.findFirst({where: {certificationName: <string>parsedData.data[i]?.certificationName, employeeId: userID}});
    // if(!existingCertification){
    //   prismaInsert = await prisma.certification.create({
    //     data:{
    //       certificationName: <string>parsedData.data[i]?.certificationName,
    //       expirationDate: new Date(<string>parsedData.data[i]?.expirationDate),
    //       certificationType: <string>parsedData.data[i]?.certificationType,
    //       marketCertification: false,
    //       employeeId: <string>userID,
    //     }
    //   })
    // }
  }
}

export const CSV_Router = createTRPCRouter({
  CSV_Upload: publicProcedure.
    input(z.string()).
    mutation(async ({input}) => {
      const CSV_Result = await separateCSV(input)
    })
});