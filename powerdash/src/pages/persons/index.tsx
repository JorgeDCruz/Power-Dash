import { useState, useEffect } from "react";
import { NextPageWithLayout } from "~/pages/page";
import {
  GeneralLayout,
  Button,
  ModalEmployeeForm,
  CertificationForm,
  Searchbar,
  CardForm,
  CardContainer,
} from "~/components";
import { AddUser } from "~/assets";
import { api } from "~/utils/api";
import { idGenerator } from "~/lib/utils";
import { Employee } from "@prisma/client";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";



interface IEmployee {
  name: string;
}
const result_search_data: IEmployee[] = [];


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  session && session.user.image === undefined && (session.user.image = null);

  return {
    props: {
      user: session?.user,
    },
  };
};


const Persons: NextPageWithLayout = (): JSX.Element => {
  const [topic, setTopic] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [modal_certification, setModal_certification] = useState<boolean>(false);
  const [employeesState, setEmployees] = useState<IEmployee[]>(result_search_data);
  const mutation = api.search.searchData.useMutation();

  useEffect(() => {
    //Hay que cambiar el "any" por el tipo del "onChange"s
    const fetchData = async <onChange,>(): Promise<void> => {
      const data = await mutation.mutateAsync(topic);
      const result_data_size = data.length;
      
      const new_result_search_data: IEmployee[] = [];

      for(let i = 0; i < result_data_size; i++){
        const arrayData: IEmployee = {name: data[i]?.employeeID as string};
        new_result_search_data.push(arrayData);
      }
      setEmployees(new_result_search_data);
    };
    fetchData();
  }, [topic]);

  useEffect(() => {
    console.log(employeesState);
  }, [employeesState]);

  return (
    <div className="h-screen w-full sm:overflow-hidden">
      <ModalEmployeeForm show={modal} className="h-5/6 w-3/4" />
      <CertificationForm show={modal_certification} className="h-5/6 w-3/4"/>
      <Searchbar
        className="mx-auto mt-8"
        searchTopics={["Nombre"]}
        setTopic={setTopic}
      />
      <div className={"my-3 flex items-center justify-center"}>
        <Button
          // after="Agregar Empleado"
          className="mr-5"
          onClick={() => setModal((prev) => !prev)}
        >
          <AddUser
            className="
                        ease h-full w-fit
                        min-w-[50px]
                        fill-[#0f62fe] transition-all duration-200
                        group-hover:fill-[#0043ce]"
          />
        </Button>

        <Button
          // after="Agregar Empleado"
          onClick={() => setModal_certification((prev) => !prev)}
        >
          <AddUser
            className="
                        ease h-full w-fit
                        min-w-[50px]
                        fill-[#0f62fe] transition-all duration-200
                        group-hover:fill-[#0043ce]"
          />
        </Button>

      </div>

      <div
        className="
              flex
                h-full
                w-full items-start"
      >
        <CardContainer>
          <>
            {employeesState.map((employees) => (
              <CardForm
                setEmployees={setEmployees}
                EmployeesState={employeesState}
                key={idGenerator()}
                employee={employees}
                className="
                                    mx-auto my-3
                                    h-1/6 w-11/12"
              />
            ))}
          </>
        </CardContainer>
      </div>
    </div>
  );
};

Persons.getLayout = (page) => (
  <GeneralLayout userName={page.props.user.name}>{page}</GeneralLayout>
);

export default Persons;
