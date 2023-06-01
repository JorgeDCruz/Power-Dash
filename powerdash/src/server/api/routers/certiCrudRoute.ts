import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const addCertificationSchema = z.object({
    employeeID: z.string(),
    certificationName: z.string(),
    certificationProvider: z.string().optional(),
    certificationStatus: z.boolean().optional(),
    certificationType: z.string().optional(),
    expirationDate: z.date().optional(),
    marketCertification: z.boolean(),
});

const certificationSchema = z.object({
    certificationID: z.string(),
    certificationName: z.string(),
    certificationProvider: z.string().optional(),
    certificationStatus: z.boolean().optional(),
    certificationType: z.string().optional(),
    expirationDate: z.date().optional(),
    marketCertification: z.boolean(),
});

const createOrAddCertification = async (_certification: z.infer<typeof addCertificationSchema>) => {
    // const existingEmployee = await prisma.employee.findUnique({
    //     where: { employeeID: _certification.employeeID },
    //     include: { certifications: true },
    // })
    // if(existingEmployee?.certifications) {
    //     const updateCerti = [...existingEmployee.certifications];
    //     updateCerti.push({
    //         id: "",
    //         certificationName: _certification.certificationName,
    //         certificationProvider: <string>_certification.certificationProvider,
    //         certificationStatus: <boolean>_certification.certificationStatus,
    //         certificationType:<string> _certification.certificationType,
    //         expirationDate: _certification.expirationDate ?? null,
    //         marketCertification: _certification.marketCertification,
    //         employeeId: existingEmployee.id
    //     });

    //     const updatedCertification = await prisma.employee.update({
    //         where: { employeeID: _certification.employeeID },
    //         include: { certifications: true },
    //         data: {
    //             certifications: {
    //                 create: updateCerti,
    //             },
    //         },
    //     });
    //     return updatedCertification;
    // }
    
    const newCertification = await prisma.employee.update({
        where: { employeeID: _certification.employeeID },
        include:{ certifications: true },
        data:{
            certifications: {
                create:[
                    {
                        certificationName: _certification.certificationName,
                        certificationProvider: <string>_certification.certificationProvider,
                        certificationStatus: <boolean>_certification.certificationStatus,
                        certificationType:<string> _certification.certificationType,
                        expirationDate: <Date>_certification.expirationDate,
                        marketCertification: _certification.marketCertification,
                    },
                ],
            }
        }
    })
    return newCertification;
};
// hola
export const certificationCrudRouter = createTRPCRouter({
    addCertification: protectedProcedure
        .input(addCertificationSchema)
        .mutation(async (req) => {
            const { input } = req;
            const insertCertification = createOrAddCertification(input)
            console.log(insertCertification);
            return insertCertification;
        }),
    readCertification: protectedProcedure
        .input(z.string().optional())
        .query(async ({input}) => {
            if(input) {
                const certification = await prisma.certification.findMany({ where: {employeeId: input} })
                return certification;
            } else {
                const certifications = await prisma.certification.findMany()
                return certifications;
            }
        }),
    updateCertification: protectedProcedure
        .input(certificationSchema)
        .mutation(async (req) => {
            const { input } = req;
            const updtCertification = await prisma.certification.update({
                where: {id: input.certificationID},
                data: {
                    certificationName: input.certificationName,
                    marketCertification: input.marketCertification,
                    certificationProvider: input.certificationProvider,
                    certificationStatus: input.certificationStatus,
                    certificationType: input.certificationType,
                    expirationDate: input.expirationDate,
                }
            });
            console.log(updtCertification);
            return updtCertification;
        }),
    deleteCertification: protectedProcedure
        .input(z.string())
        .mutation(async ({input}) => {
            const deleteCertification = await prisma.certification.delete({
                where: {id: input}
            });
            console.log(deleteCertification);
        })
})