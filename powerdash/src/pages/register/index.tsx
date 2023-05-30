import { NextPage } from "next";
import { FormEventHandler, FormHTMLAttributes, useState } from "react";
import { useRouter } from "next/router";
import Div100vh from "react-div-100vh";
import { api } from "~/utils/api";
import { Button, Input } from "~/components";
import Label from "~/components/labels";

const Index: NextPage = (): JSX.Element => {
  const router = useRouter();
  //Creamos variables para obtener los datos del form
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    name: "",
  });

  const mutation = api.auth.signUp.useMutation();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    mutation.mutate(userInfo);
    console.log("Llegue aqui!");
    router.push("/login");
  };

  return (
    <Div100vh className="flex items-center justify-center bg-gradient-to-r from-sky-400 to-blue-500">
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col items-center justify-center rounded-md bg-white p-10 shadow-xl`}
      >
        <h1 className={`mb-5 text-lg font-semibold leading-5 text-gray-900`}>
          Crea tu cuenta
        </h1>
        <div className={`flex flex-col space-y-2`}>
          <div className={"flex flex-col space-y-1"}>
            <Label htmlFor={"name"}>Nombre</Label>
            <Input
              id={"name"}
              value={userInfo.name}
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, name: target.value })
              }
              type="text"
              placeholder="Jonh Dou"
            />
          </div>
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
          Crear cuenta
        </Button>
        <Button variant={"link"} onClick={() => router.push("/login")}>
          Iniciar sesión
        </Button>
      </form>
    </Div100vh>
  );
};

export default Index;
