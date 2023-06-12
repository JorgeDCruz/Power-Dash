import * as z from "zod";

const CertificationFormSchema: z.ZodSchema = z
  .object({
    certificationID: z.string().max(50).nonempty("Este Campo es Obligatorio"),
    certificationName: z.string().max(50).nonempty("Este Campo es Obligatorio"),
    certificationProvider: z.coerce
      .string()
      .max(50)
      .nonempty("Este Campo es Obligatorio"),
    certificationStatus: z.coerce
      .boolean(),
    certificationType: z.coerce
      .string()
      .max(50)
      .nonempty("Este Campo es Obligatorio"),

    expirationDate: z.string().max(100).nonempty("Este Campo es Obligatorio"),
    certificationMarket: z.coerce
      .string()
      .max(50)
      .nonempty("Este Campo es Obligatorio"),
  })
  .required();

type ICertificataionSchema = z.infer<typeof CertificationFormSchema>;

export default ICertificataionSchema;
export { CertificationFormSchema as CertificationSchema };
