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
    console.log(data)
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
            // Crear nuevo usuario
            // TODO: implementando
            // const hashPass = helpers.encryptPassword(input.password)
            // const hashUser = {
            //     name: string,
            //     email: string,
            //     password: string
            // } 
            // hashUser.name = input.name
            const newUser = await createUSer(input);
            return newUser;
        }),
});
