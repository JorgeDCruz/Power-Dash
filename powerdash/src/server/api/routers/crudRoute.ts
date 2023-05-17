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


async function updateEmployee(employeeID: string, data: z.input<typeof employeeSchema>) {
    return await prisma.employee.update({
        where: { employeeID },
        data,
    });
}



export const crudRouter = createTRPCRouter({
    addEmployee: publicProcedure
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
                console.log(employee);
                return employee;
            }
            const employees = await prisma.employee.findMany()
            console.log(employees);
            return employees;
        }),
    updateEmployee: protectedProcedure
        .input(employeeSchema)
        .mutation(async (input) => {
            const { ...data } = employeeSchema.parse(input);
            return await updateEmployee(data.employeeID, data)
        }),
    deleteEmployee: protectedProcedure
        .input(z.string())
        .mutation(async ({input}) => {
            const deleteEmp = await prisma.employee.delete({
                where:{
                    employeeID: input
                },
            })
        }),
})