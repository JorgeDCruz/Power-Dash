import * as z from "zod";

const ModalEmployeeSchm: z.ZodSchema = z.object({
    employeeName: z.string().max(50).default(""),
    employeeCountry: z.string().max(50).default(""),
    employeeState: z.string().max(50).default(""),
    employeeCity: z.string().max(50).default(""),
    yearsXP: z.coerce.number().
        nonnegative("Solo se permiten números posivos").
        int("Solo números enteros").
        safe().
        default(0),
    employeePosition: z.string().max(100).default(""),
    programmingLanguages: z.coerce.string().
        array().
        max(50).
        default([""]),
    technologies: z.coerce.string().max(50).default("")
}).required();

export default interface IModalEmployee
    extends z.infer<typeof ModalEmployeeSchm> {};
export {ModalEmployeeSchm as EmployeeSchema};