import { useState, useEffect } from "react";
import { Searchbar } from "~/components";
import { NextPageWithLayout } from "~/pages/page";
import { GeneralLayout, Button, ModalEmployeeForm } from "~/components";
import { AddUser } from "~/assets";
import { api } from "~/utils/api";

const Persons: NextPageWithLayout = (): JSX.Element => {
    const [topic, setTopic] = useState<string>("");
    const [modal, setModal] = useState<boolean>(false);

    const mutation = api.search.searchData.useMutation();

    useEffect(() => {
      //Hay que cambiar el "any" por el tipo del "onChange"
      const fetchData = async <onChange,>(): Promise<void> => {
        const data = mutation.mutate(topic);
        console.log("Data: ", data);
      };
      fetchData();
    }, [topic]);

      return (
          <div>
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
          </div>
        );
}

Persons.getLayout = (page) => (
  <GeneralLayout userName={`Jorge Plasencia`}>{page}</GeneralLayout>
);

export default Persons;
