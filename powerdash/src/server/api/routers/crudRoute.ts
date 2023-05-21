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

const uptEmpSchema = z.object({
    employeeID: z.string(),
    attributeName: z.string(),
    newValue: z.string()
});


async function updateEmployee(_employeeID: string, _attributeName: string, _value: string) {
    
    switch (_attributeName) {
        case 'employeeName':
            const name = await prisma.employee.update({
                where: { employeeID: _employeeID},
                data: {employeeName: <string>_value}
            });
            return name;
        case 'employeeCountry':
            const country = await prisma.employee.update({
                where: { employeeID: _employeeID},
                data: {employeeCountry: <string>_value}
            });
            return country;
        case 'employeeState':
            const state = await prisma.employee.update({
                where: { employeeID: _employeeID},
                data: {employeeState: <string>_value}
            });
            return state;
        case 'employeeCity':
            const city = await prisma.employee.update({
                where: { employeeID: _employeeID},
                data: {employeeCity: <string>_value}
            });
            return city;
        case 'yearsXP':
            const xp = await prisma.employee.update({
                where: { employeeID: _employeeID},
                data: {yearsXP: <number>parseInt(_value)}
            });
        return xp;
        case 'employeePosition':
            const position = await prisma.employee.update({
                where: { employeeID: _employeeID},
                data: {employeePosition: <string>_value}
            });
            return position;
        case 'employeeArea':
            const area = await prisma.employee.update({
                where: { employeeID: _employeeID},
                data: {employeeArea: <string>_value}
            });
            return area;
    }
    
}



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
        .input(uptEmpSchema)
        .mutation(async (req) => {
            const { input } = req;
            // const { ...data } = employeeSchema.parse(input);
            const  updtEmp = await updateEmployee(input.employeeID, input.attributeName, input.newValue);
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