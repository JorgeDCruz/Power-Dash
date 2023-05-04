import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/router";
import Div100vh from "react-div-100vh";
import { GeneralButton, GeneralInput } from "~/components";

const Index: NextPage = (): JSX.Element => {
  const router = useRouter();
  //Creamos variables para obtener los datos del form
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  //Mandaremos los datos del form através de un handler
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    //Le mandamos los datos a la función
    const res = await signIn("credential-login", {
      email: userInfo.email,
      password: userInfo.password,
      //callbackUrl funciona para especificar a dónde se debe de dirigir una vez que se complete el login
      //En este caso específico será "localhost:3000"
      callbackUrl: `${window.location.origin}/`,
    });

    console.log(res);
  };

  return (
    <Div100vh className="flex items-center justify-center bg-gradient-to-r from-sky-400 to-blue-500">
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col items-center justify-center rounded-md bg-white p-10 shadow-xl`}
      >
        <h1 className={`mb-5 text-lg font-semibold leading-5 text-gray-900`}>
          Inicia sesión con tu cuenta de IBM
        </h1>
        <div className={`flex flex-col space-y-2`}>
          <GeneralInput
            value={userInfo.email}
            onChange={({ target }) =>
              setUserInfo({ ...userInfo, email: target.value })
            }
            type="email"
            placeholder="email@gmail.com"
          />
          <GeneralInput
            value={userInfo.password}
            onChange={({ target }) =>
              setUserInfo({ ...userInfo, password: target.value })
            }
            type="password"
            placeholder="********"
          />
        </div>

        <GeneralButton className={`mt-4`} type={`submit`}>
          Iniciar sesión
        </GeneralButton>
      </form>
    </Div100vh>
  );
};

export default Index;
