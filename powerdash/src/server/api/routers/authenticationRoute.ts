import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { PrismaClient } from "@prisma/client";
import { object } from "prop-types";

const prisma = new PrismaClient();

const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string(),
});

async function createUSer(data: any) {
    console.log(data)
    const user = await prisma.user.create({
        data,
    });
    //console.log(user)
    //return user;
}

export const authRouter = createTRPCRouter({
    signUp: publicProcedure
        .input(z.object({
            email: z.string().email(),
            password: z.string().min(8),
            name: z.string(),
        }))
        .query(async ({ ctx, input }) => {
            const { email, password, name } = input;
            // Verificar si el usuario ya existe en la base de datos
            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) {
                throw new Error('El correo electrónico ya está registrado');
            }
            // Crear nuevo usuario
            const newUser = await createUSer(input);
            return newUser;
        }),
});
