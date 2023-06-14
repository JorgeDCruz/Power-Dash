import { signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/router";
import Div100vh from "react-div-100vh";
import { GeneralLayout } from "~/components";
import { NextPageWithLayout } from "~/pages/page";
import { Button } from "~/components/buttons";
import { Input } from "~/components/inputs/Input";
import { Card } from "~/components/cards/Card";
import Label from "~/components/labels";

const Login: NextPageWithLayout = (): JSX.Element => {
  //Creamos variables para obtener los datos del form
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const router = useRouter();
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
      <Card>
        <form
          onSubmit={handleSubmit}
          className={`flex flex-col items-center justify-center p-10`}
        >
          <h1 className={`mb-5 text-lg font-semibold leading-5 text-gray-900`}>
            Inicia sesión con tu cuenta de IBM
          </h1>
          <div className={`flex flex-col space-y-2`}>
            <div className={"flex flex-col space-y-1"}>
              <Label htmlFor={"email"}>Correo</Label>
              <Input
                id={"email"}
                value={userInfo.email}
                onChange={({ target }) =>
                  setUserInfo({ ...userInfo, email: target.value })
                }
                type="email"
                placeholder="email@gmail.com"
              />
            </div>

            <div className={"flex flex-col space-y-1"}>
              <Label htmlFor={"password"}>Contraseña</Label>
              <Input
                id={"password"}
                value={userInfo.password}
                onChange={({ target }) =>
                  setUserInfo({ ...userInfo, password: target.value })
                }
                type="password"
                placeholder="********"
              />
            </div>
          </div>
          <Button className={`mb-2 mt-4`} type={`submit`}>
            Iniciar sesión
          </Button>
          <Button onClick={() => router.push("/register") } type={"button"} variant={"link"} className="text-gray-950">
            Registrate
          </Button>
        </form>
      </Card>
    </Div100vh>
  );
};

export default Login;
