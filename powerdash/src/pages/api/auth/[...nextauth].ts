import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
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

        //Ahora mismo no es posible checar a la base de datos, pero aquí debería de ejecutarse la lógica, la cual es la siguiente:
        /*
                1.- Checamos que el email que nos pasaron exista en la base de datos
                2.- Guardamos la contraseña obtenida de la base de datos
                3.- Utilizamos la función de "matchPassword" que tiene helpers para verificar que ambas contraseñas coinciden
                4.- Si lo hacen regresamos un objeto con la información de la base de datos
                5.- Si no regresamos null
                */
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

  //Especificamos que ciertas funciones nos llevarán a ciertas vistas
  pages: {
    //Cuando se ejecute la función por defecto de signIn que ofrece Next-login se redirigirá a la vista creada por nosotros
    signIn: "/login/login",
  },
};

export default NextAuth(authOptions);
