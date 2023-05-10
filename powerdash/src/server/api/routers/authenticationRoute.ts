import { string, z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { PrismaClient } from "@prisma/client";
import { object } from "prop-types";
import helpers from "~/utils/middleware/helpers";

const prisma = new PrismaClient();

// const userSchema = z.object({
//     email: z.string().email(),
//     password: z.string().min(8),
//     name: z.string(),
// });

type User = {
    email: string,
    password: string,
    name: string
}

async function createUSer(data: any) {
    //console.log("Data: ", typeof data)
    const validatedData = data
    //validatedData.password = "TestPassword"
    const hashPass = await helpers.encryptPassword(validatedData.password);
    validatedData.password = hashPass;

    const user = await prisma.user.create({
        data,
    });
    console.log(user)
    return user;
}

export const authRouter = createTRPCRouter({
    signUp: publicProcedure
        .input(z.object({
            email: z.string().email(),
            password: z.string().min(8),
            name: z.string(),
        }))
        .mutation(async (req) => {
            const { input } = req;
            // Verificar si el usuario ya existe en la base de datos
            const userEmail = input.email
            const existingUser = await prisma.user.findUnique({ where: { email: userEmail } });
            if (existingUser) {
                throw new Error('El correo electrónico ya está registrado');
            }
            
            
            const newUser = await createUSer(input);
            return newUser;
        }),
});
