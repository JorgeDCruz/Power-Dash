import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string(),
});

async function createUSer(data: typeof userSchema) {
    const user = await prisma.user.create({
        data,
    });
    //console.log(user)
    return user;
}

export const authRouter = createTRPCRouter({
    signUp: publicProcedure
        .input(userSchema)
        .query(async ({ input }) => {
            const { email, password, name } = input;
            // Verificar si el usuario ya existe en la base de datos
            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) {
                throw new Error('El correo electrónico ya está registrado');
            }
            // Crear nuevo usuario
            
            const newUser = await createUSer({ email, password, name });
            return newUser;
        }),
});


// export const authenticationRouter = createTRPCRouter({
//     hello: publicProcedure
//         .input(z.object({ text: z.string() }))
//         .query(({ input }) => {
//     return {
//         greeting: `Hello ${input.text}`,
//     };
//     postUser: publicProcedure.query(({ ctx }) => {
//         return ctx.prisma.user.findMany();
//     }),
    
// })


// getSecretMessage: protectedProcedure.query(() => {
//     return "you can now see this secret message!";
//     }),
// });
