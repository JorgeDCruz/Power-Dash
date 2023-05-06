import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import * as process from "process";
import { PrismaClient } from "@prisma/client";

const prismaDB = new PrismaClient();

/**
 * Module augmentation for `next-login` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

export const authOptions: NextAuthOptions = {
  //Especificamos la estrategía que utilizaremos para guardar los datos de la sesión
  session: {
    strategy: "jwt",
  },
  //Especificamos los proovedores que utilizaremos
  providers: [
    CredentialsProvider({
      id: "credential-login",
      name: "IBM Account",
      type: "credentials",
      //Las credenciales serán las siguientes:
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "johnDoe@test.com",
        },
        password: { label: "Password", type: "password" },
      },
      //La función para autorizar un usuario es la siguiente
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const existingUser = await prismaDB.user.findUnique({ where: { email } });
        console.log("hola")
        console.log(existingUser)
        //Ahora mismo no es posible checar a la base de datos, pero aquí debería de ejecutarse la lógica, la cual es la siguiente:
        if (email !== "A01634536@tec.mx" && password !== "123") {
          return null;
        }
        return { id: "1", name: "Jorge Cruz", email: "A01634536@tec.mx" };
      },
    }),
  ],
  callbacks: {
    //Definimos el callback de un jwt para que cada vez que se cree un jwt guarde el id del usuario así como sus datos a través de una cookie
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),

  //Especificamos que ciertas funciones nos llevarán a ciertas vistas
  pages: {
    //Cuando se ejecute la función por defecto de signIn que ofrece Next-auth se redirigirá a la vista creada por nosotros
    signIn: "/auth/signin",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
