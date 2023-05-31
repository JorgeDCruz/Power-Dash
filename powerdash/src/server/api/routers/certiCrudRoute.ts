import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { PrismaClient } from "@prisma/client";
import { Certificate } from "crypto";
import { Console } from "console";

const prisma = new PrismaClient();

const certificationSchema = z.object({
    employeeID: z.string(),
    certificationName: z.string(),
    certificationProvider: z.string().optional(),
    certificationStatus: z.boolean().optional(),
    certificationType: z.string().optional(),
    expirationDate: z.date().optional(),
    marketCertification: z.boolean(),
});

const createOrUpdateCertifications = async (_certification: z.infer<typeof certificationSchema>) => {
    const existingEmployee = await prisma.employee.findUnique({
        where: { employeeID: _certification.employeeID },
        include: { certifications: true },
    })
    if(existingEmployee?.certifications) {
        const updateCerti = [...existingEmployee.certifications];
        updateCerti.push({
            id: "",
            certificationName: _certification.certificationName,
            certificationProvider: <string>_certification.certificationProvider,
            certificationStatus: <boolean>_certification.certificationStatus,
            certificationType:<string> _certification.certificationType,
            expirationDate: _certification.expirationDate ?? null,
            marketCertification: _certification.marketCertification,
            employeeId: existingEmployee.id
        });

        const updatedCertification = await prisma.employee.update({
            where: { employeeID: _certification.employeeID },
            include: { certifications: true },
            data: {
                certifications: {
                    create: updateCerti,
                },
            },
        });
        return updatedCertification;
    }
    
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

export const certificationCrudRouter = createTRPCRouter({
    addCertification: protectedProcedure
        .input(certificationSchema)
        .mutation(async (req) => {
            const { input } = req;
            const insertCertification = createOrUpdateCertifications(input)
            console.log(insertCertification);
            return insertCertification;
        }),
    readCertification: protectedProcedure
        .input(z.string().optional())
        .query(async ({input}) => {
            if(input) {
                const certification = await prisma.certification.findUnique({ where: {id: input}})
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
        })
})