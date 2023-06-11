import { signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/router";
import Div100vh from "react-div-100vh";
import { Button, GeneralLayout } from "~/components";
import { NextPageWithLayout } from "~/pages/page";
import { api } from "~/utils/api";

const Crud: NextPageWithLayout = (): JSX.Element => {
  const [crudInfo, setCrudInfo] = useState({
    employeeID: "",
    employeeName: "",
    employeeCountry: "",
    employeeState: "",
    employeeCity: "",
    yearsXP: 0,
    employeePosition: "",
    employeeArea: "",
    // programmingLanguages: "",
    // technologies: "",
  });

  const [updateInfo, setNewInfo] = useState<{
    employeeID: string;
    attributeName: string;
    newValue: string;
  }>({
    employeeID: "",
    attributeName: "",
    newValue: "",
  });

  const mutCreate = api.CRUDrouter.addEmployee.useMutation();
  const { data } = api.CRUDrouter.readEmployee.useQuery("");
  const mutDelete = api.CRUDrouter.deleteEmployee.useMutation();
  const mutUpdate = api.CRUDrouter.updateEmployee.useMutation();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    // mutCreate.mutate(crudInfo)
    // mutDelete.mutate("3214123IBM")
    // console.log(data)
    // console.log("Llegue aqui!")
    // router.push("/login")
    // console.log(crudInfo)
    // mutUpdate.mutate(crudInfo)
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
          <input
            value={updateInfo.employeeID}
            onChange={({ target }) =>
              setNewInfo({ ...updateInfo, employeeID: target.value })
            }
            type="text"
            placeholder="id"
          />
          <input
            value={updateInfo.newValue}
            onChange={({ target }) =>
              setNewInfo({ ...updateInfo, newValue: target.value })
            }
            type="text"
            placeholder="name"
          />
          <input
            value={updateInfo.attributeName}
            onChange={({ target }) =>
              setNewInfo({ ...updateInfo, attributeName: target.value })
            }
            type="text"
            placeholder="attribute"
          />
          <input
            value={crudInfo.employeeState}
            onChange={({ target }) =>
              setCrudInfo({ ...crudInfo, employeeState: target.value })
            }
            type="text"
            placeholder="state"
          />
          <input
            value={crudInfo.employeeCity}
            onChange={({ target }) =>
              setCrudInfo({ ...crudInfo, employeeCity: target.value })
            }
            type="text"
            placeholder="city"
          />
          <input
            value={crudInfo.yearsXP}
            onChange={({ target }) =>
              setCrudInfo({ ...crudInfo, yearsXP: parseInt(target.value) })
            }
            type="number"
            placeholder="years XP"
          />
          <input
            value={crudInfo.employeePosition}
            onChange={({ target }) =>
              setCrudInfo({ ...crudInfo, employeePosition: target.value })
            }
            type="text"
            placeholder="position"
          />
          <input
            value={crudInfo.employeeArea}
            onChange={({ target }) =>
              setCrudInfo({ ...crudInfo, employeeArea: target.value })
            }
            type="text"
            placeholder="area"
          />
          <input type="text" placeholder="languages" />
          <input type="text" placeholder="technologies" />
        </div>

        <Button
          className={`mt-4`}
          type={`submit`}
          variant={`ghost`}
        >
          Iniciar sesión
        </Button>
      </form>
    </Div100vh>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default Crud;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
