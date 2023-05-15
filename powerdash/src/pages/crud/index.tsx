import { signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/router";
import Div100vh from "react-div-100vh";
import { GeneralButton, GeneralInput, GeneralLayout } from "~/components";
import { NextPageWithLayout } from "~/pages/page";
import { number } from "zod";
import { crudRouter } from "~/server/api/routers/crudRoute";

const Crud: NextPageWithLayout = (): JSX.Element => {
    const [ crudInfo, setCrudInfo] = useState({
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
    })

    // const mutation = crudRouter.addEmployee()

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        // mutation
        // console.log("Llegue aqui!")
        // router.push("/login")
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
            value={crudInfo.employeeID}
            onChange={({target}) => setCrudInfo({...crudInfo, employeeID:target.value})}
            type="text"
            placeholder="id"
          />
          <input
            value={crudInfo.employeeName}
            onChange={({target}) => setCrudInfo({...crudInfo, employeeName:target.value})}
            type="text"
            placeholder="name"
          />
          <input
            value={crudInfo.employeeCountry}
            onChange={({target}) => setCrudInfo({...crudInfo, employeeCountry:target.value})}
            type="text"
            placeholder="country"
          />
          <input
            value={crudInfo.employeeState}
            onChange={({target}) => setCrudInfo({...crudInfo, employeeState:target.value})}
            type="text"
            placeholder="state"
          />
          <input
            value={crudInfo.employeeCity}
            onChange={({target}) => setCrudInfo({...crudInfo, employeeCity:target.value})}
            type="text"
            placeholder="city"
          />
          <input
            value={crudInfo.yearsXP}
            onChange={({target}) => setCrudInfo({...crudInfo, yearsXP:parseInt(target.value)})}
            type="number"
            placeholder="years XP"
          />
          <input
            value={crudInfo.employeePosition}
            onChange={({target}) => setCrudInfo({...crudInfo, employeePosition:target.value})}
            type="text"
            placeholder="position"
          />
          <input
            value={crudInfo.employeeArea}
            onChange={({target}) => setCrudInfo({...crudInfo, employeeArea:target.value})}
            type="text"
            placeholder="area"
          />
          <input
            type="text"
            placeholder="languages"
          />
          <input
            type="text"
            placeholder="technologies"
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
    </Div100vh>
  );
};



// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default Crud;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
