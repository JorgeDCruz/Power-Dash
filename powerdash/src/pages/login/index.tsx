import { signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import { GeneralButton, GeneralInput, GeneralLayout } from "~/components";
import { NextPageWithLayout } from "~/pages/page";

const Login: NextPageWithLayout = (): JSX.Element => {
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
    <div className="flex items-center justify-center bg-gradient-to-r from-sky-400 to-blue-500">
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

        <GeneralButton
          className={`mt-4`}
          type={`submit`}
          animated
          style={`ghost`}
        >
          Iniciar sesión
        </GeneralButton>
      </form>
    </div>
  );
};

Login.getLayout = (page) => (
  <GeneralLayout
    userImage={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
    userJob={`Software Engineer`}
    userName={`Jorge Plasencia`}
  >
    {page}
  </GeneralLayout>
);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default Login;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
