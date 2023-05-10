import { string, z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

interface CertificationInterface {
    certificationName: string
    certificationProvider?: string
    certificationStatus?: boolean
    certificationType?: string
    expirationDate?: string
}

interface EmployeeInterface {
    employeeName: string;
    employeeCountry: string; 
    employeeState: string;
    employeeCity: string;
    yearsXP?: number; 
    employeePosition?: string;     
    employeeArea: string;
    programmingLanguages: string[]
    technologies:         string[]
    certifications?: CertificationInterface[]
}



async function createEmployee(_dataEmployee: EmployeeInterface) {
    const employee = await prisma.employee.create({
        data: {
            employeeName: _dataEmployee.employeeName, 
            employeeCountry: _dataEmployee.employeeCountry,
            employeeState: _dataEmployee.employeeState,
            employeeCity: _dataEmployee.employeeCity,
            yearsXP: _dataEmployee.yearsXP,   
            employeePosition: _dataEmployee.employeePosition,    
            employeeArea: _dataEmployee.employeeArea,
            programmingLanguages: _dataEmployee.programmingLanguages,
            technologies: _dataEmployee.technologies
        }
    })
    console.log(employee);
    return employee
}

async function readEmployee(_idEmployee?: string | null) {
    if(_idEmployee) {
        const employee = await prisma.employee.findUnique({ where: {employeeID: _idEmployee}})
        console.log(readEmployee);
        return employee;
    }
    const employees = await prisma.employee.findMany()
    console.log(employees);
    return employees;
}

async function updateEmployee(_newDataEmp: any, _idEmployee: string) {
    const updatedEmp = await prisma.employee.update({
        where: { employeeID: _idEmployee },
        data: _newDataEmp
    });
}

export const crudRouter = createTRPCRouter({
    addEmployee: protectedProcedure
    // TODO: verificar cuales son nullos y especificarlo
        .input(z.object({
            name: z.string(),
            country: z.string(),
            state: z.string(),
            city: z.string(),
            yearsXp: z.string(),
            position: z.string(),
            area: z.string(),
            programLang: z.array(z.string()),
            technologies: z.array(z.string()),
        }))
        .mutation(async (req) => {
            const { input } = req;
        }),
})