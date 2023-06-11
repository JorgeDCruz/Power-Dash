import { useState, useEffect } from "react";
import { NextPageWithLayout } from "~/pages/page";
import { 
    GeneralLayout,
    Button,
    ModalEmployeeForm,
    Searchbar,
    CardForm,
    CardContainer
} from "~/components";
import { AddUser } from "~/assets";
import { api } from "~/utils/api";
import { idGenerator } from "~/lib/utils";
import { Employee } from "@prisma/client";

interface IEmployee {
    name: string;
}
const test: IEmployee[] = [
    {name: "El PEPE"},
    {name: "ETESETCH"},
    {name: "TILIN"},
    {name: "Vicente Javier Viera Guízar"},
    {name: "5"},
    {name: "6"}
];

const Persons: NextPageWithLayout = (): JSX.Element => {
    const [topic, setTopic] = useState<string>("");
    const [modal, setModal] = useState<boolean>(false);

    const mutation = api.search.searchData.useMutation();

    useEffect(() => {
        //Hay que cambiar el "any" por el tipo del "onChange"s
        const fetchData = async <onChange,>(): Promise<void> => {
            console.log(topic)
            const data = await mutation.mutateAsync(topic);
            console.log("Data: ", data[0]?.employeeID);
        };
        fetchData();
    }, [topic]);

    return (
        <div className="w-full h-screen sm:overflow-hidden">
            <ModalEmployeeForm
                show={modal}
                className="w-3/4 h-5/6"
            />
            <Searchbar
                className="mx-auto mt-8"
                searchTopics={["AWAaaaaaaaa", "OWO", "UWU", "7U7", "UNU", "T_T", ":3", "EWE"]}
                setTopic={setTopic}
            />
            <Button
                after="Agregar Empleado"
                onClick={() => setModal(prev => !prev)}
                className="
                    w-fit h-10
                    bg-[#f2f4f8]
                    text-[#0f62fe]
                    transition-all duration-200 ease
                    group
                    hover:after:text-[#0043ce]
                    hover:bg-[#dde1e6]
                    hover:shadow-md
                    sm:w-[30%]
                    sm:after:content-[attr(after)] after:w-fit after:text-xm after:font-medium
                    after:line-clamp-1 after:text-clip"
            >
                <AddUser
                    className="
                        w-fit h-full min-w-[50px]
                        fill-[#0f62fe]
                        transition-all duration-200 ease
                        group-hover:fill-[#0043ce]"
                />
            </Button>
            <div className="
                w-full h-full
                mt-8
                flex items-start"
            >
                <CardContainer>
                    <>
                        {test.map(employee => (
                            <CardForm
                                key={idGenerator()}
                                employee={employee}
                                className="
                                    w-11/12 h-1/6
                                    mx-auto my-3"
                            />
                        ))}
                    </>
                </CardContainer>
            </div>
        </div>
    );
}

Persons.getLayout = (page) => (
  <GeneralLayout userName={`Jorge Plasencia`}>{page}</GeneralLayout>
);

export default Persons;
