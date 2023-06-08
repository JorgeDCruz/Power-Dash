import * as z from "zod";

const ModalEmployeeSchm: z.ZodSchema = z.object({
    employeeName: z.string().max(50).nonempty("Este Campo es Obligatorio"),
    employeeCountry: z.string().max(50).nonempty("Este Campo es Obligatorio"),
    employeeState: z.string().max(50).nonempty("Este Campo es Obligatorio"),
    employeeCity: z.string().max(50).nonempty("Este Campo es Obligatorio"),
    yearsXP: z.coerce.number().
        nonnegative("Solo se permiten números posivos").
        int("Solo números enteros").
        safe(),
    employeePosition: z.string().max(100).nonempty("Este Campo es Obligatorio"),
    programmingLanguages: z.coerce.string().
        array().
        max(50).
        nonempty("Este Campo es Obligatorio"),
    technologies: z.coerce.string().max(50).nonempty("Este Campo es Obligatorio")
}).required();

export default interface IModalEmployee
    extends z.infer<typeof ModalEmployeeSchm> {};
export {ModalEmployeeSchm as EmployeeSchema};