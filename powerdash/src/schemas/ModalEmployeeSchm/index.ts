import * as z from "zod";

const ModalEmployeeSchm: z.ZodSchema = z.object({
    employeeName: z.string().max(50),
    employeeCountry: z.string().max(50),
    employeeState: z.string().max(50),
    employeeCity: z.string().max(50),
    yearsXP: z.coerce.number().
        nonnegative("Solo se permiten números posivos").
        int("Solo números enteros").
        safe(),
    employeePosition: z.string().max(100),
    programmingLanguages: z.coerce.string().
        array().
        max(50),
    technologies: z.coerce.string().max(50)
}).required();

export default interface IModalEmployee
    extends z.infer<typeof ModalEmployeeSchm> {};