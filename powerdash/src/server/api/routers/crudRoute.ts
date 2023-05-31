import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const employeeSchema = z.object({
    employeeID: z.string(),
    employeeName: z.string().optional(),
    employeeCountry: z.string(),
    employeeState: z.string(),
    employeeCity: z.string(),
    yearsXP: z.number().optional(),
    employeePosition: z.string().optional(),
    employeeArea: z.string(),
    programmingLanguages: z.array(z.string()).optional(),
    technologies: z.array(z.string()).optional(),
});


export const crudRouter = createTRPCRouter({
    addEmployee: protectedProcedure
        .input(employeeSchema)
        .mutation(async (req) => {
            const { input } = req;
            const empID = input.employeeID

            const existingEmployee = await prisma.employee.findUnique({where: {employeeID: empID}});
            if (existingEmployee) {
                throw new Error('Ya existe el empleado');
            }
            
            const newEmployee = await prisma.employee.create({
                data: {
                    employeeID: input.employeeID,
                    employeeName: input.employeeName,
                    employeeCountry: input.employeeCountry,
                    employeeState: input.employeeState,
                    employeeCity: input.employeeCity,
                    yearsXP: input.yearsXP,
                    employeePosition: input.employeePosition,     
                    employeeArea: input.employeeArea,
                    programmingLanguages: input.programmingLanguages,
                    technologies: input.technologies,
                }
            })
            console.log(newEmployee);
            return newEmployee;
        }),
    readEmployee: protectedProcedure
        .input(z.string().optional())
        .query(async ({input}) => {
            if(input) {
                const employee = await prisma.employee.findUnique({ where: {employeeID: input}})
                return employee;
            } else {
                const employees = await prisma.employee.findMany()
                return employees;
            }
            
        }),
    updateEmployee: protectedProcedure
        .input(employeeSchema)
        .mutation(async (req) => {
            const { input } = req;
            // const { ...data } = employeeSchema.parse(input);
            const  updtEmp = await prisma.employee.update({
                where: {
                    employeeID: input.employeeID
                },
                data: {
                    employeeID: input.employeeID,
                    employeeName: input.employeeName,
                    employeeCountry: input.employeeCountry,
                    employeeState: input.employeeState,
                    employeeCity: input.employeeCity,
                    yearsXP: input.yearsXP,
                    employeePosition: input.employeePosition,     
                    employeeArea: input.employeeArea,
                    programmingLanguages: input.programmingLanguages,
                    technologies: input.technologies,
                    
                }
            })
            return updtEmp;
        }),
    deleteEmployee: protectedProcedure
        .input(z.string())
        .mutation(async ({input}) => {

            const ourID = await prisma.employee.findUnique({
                where: {
                    employeeID: input,
                }
            })

            const deleteCertification = await prisma.certification.deleteMany({
                where: {
                    employeeId: ourID?.id
                }
            })
            const deleteEmp = await prisma.employee.delete({
                where:{
                    id: ourID?.id
                },
            })
        }),
})