import { type FC, useRef, useEffect, useState } from "react";
import { Button, Input, FormErrorMessage } from "~/components";
import { Label } from "~/components/labels/label";
import { CloseIcon, BeeIcon } from "~/assets";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type IModalEmployee, EmployeeSchema } from "~/schemas";
import { cn, idGenerator } from "~/lib/utils";

interface ModalEmployeeFormProps {
  show: boolean;
  className?: string;
}

type InputNames = `${number}` | `${number}.${string}`;

const fieldNames: string[] = [
  "employeeName",
  "employeeCountry",
  "employeeState",
  "employeeCity",
  "yearsXP",
  "employeePosition",
  "programmingLanguages",
  "technologies",
];

const placeholders: string[] = [
  "Nombre del empleado",
  "País de residencia del empleado",
  "Estado de residencia del empleado",
  "Ciudad de residencia del empleado",
  "Años de experiencia",
  "Puesto del empleado",
  "Lenguajes de programación",
  "Tecnologías que maneja el empleado",
];

const labels: string[] = [
  "Nombre",
  "País",
  "Estado",
  "Ciudad",
  "Años de Experiencia",
  "Puesto",
  "Lenguajes",
  "Technologías",
];

const ModalEmployeeForm: FC<ModalEmployeeFormProps> = ({
  show,
  className,
}): JSX.Element => {
  const [active, setActive] = useState<boolean>(false);
  const ref = useRef<HTMLDialogElement>(null);

  const { handleSubmit, reset, control } = useForm<IModalEmployee>({
    resolver: zodResolver(EmployeeSchema),
    mode: "all",
    shouldFocusError: true,
    defaultValues: {
      employeeName: "",
      employeeCountry: "",
      employeeState: "",
      employeeCity: "",
      yearsXP: 0,
      employeePosition: "",
      programmingLanguages: "",
      technologies: "",
    },
  });

  const onSubmit: SubmitHandler<IModalEmployee> = (
    data: IModalEmployee
  ): void => {
    console.log(data);
    const languajes: string[] = data.programmingLanguages.split(
      /[,;:\.\-_\s]/
    ) as string[];

    console.log(data.programmingLanguages);
    setActive((prev) => !prev);
    reset();

    return;
  };

  useEffect(() => {
    setActive((prev) => !prev);
  }, [show]);

  useEffect(() => {
    const setActiveModal = (): void => {
      if (active) {
        ref.current?.showModal();
      } else {
        ref.current?.close();
      }
    };
    setActiveModal();
  }, [active]);

  return (
    <dialog
      className={cn([
        className,
        `
                backdrop:bg-gradient-to-tr
                backdrop:from-ibm-blue-20
                backdrop:to-ibm-cyan-60
                backdrop:opacity-50
                backdrop:brightness-125`,
      ])}
      ref={ref}
    >
      <div
        className="
                    flex h-fit
                    w-auto justify-between"
      >
        <BeeIcon
          className="
                        h-12 w-fit"
        />
        <Button
          className="
                        ease group
                        h-12
                        w-14 bg-ibm-coolGray-10 transition duration-300
                        delay-75
                        hover:bg-ibm-coolGray-20
                        hover:shadow-md"
          onClick={() => {
            setActive((prev) => !prev);
            reset();
          }}
        >
          <CloseIcon
            className="
                            ease
                            w-10
                            fill-ibm-blue-60 transition duration-300 delay-75
                            group-hover:scale-110
                            group-hover:fill-ibm-blue-70"
          />
        </Button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
                    mt-5 h-fit
                    w-full"
      >
        {fieldNames.map((fieldName, index) => {
          return (
            <Controller
              key={idGenerator()}
              control={control}
              name={fieldName as InputNames}
              render={({ field, fieldState: { error } }) => {
                return (
                  <>
                    <Label
                      htmlFor={labels[index]}
                      className={`
                                                mx-2
                                                ${
                                                  error &&
                                                  `text-ibm-magenta-50 after:content-['*']`
                                                }`}
                    >
                      {labels[index]}
                    </Label>
                    <Input
                      id={labels[index]}
                      {...field}
                      placeholder={placeholders[index]}
                      className={`
                                                mb-3 mt-1
                                                ${
                                                  error &&
                                                  `border-2 border-ibm-magenta-50 outline-ibm-magenta-60`
                                                }
                                                placeholder:${
                                                  error
                                                    ? `text-ibm-magenta-40`
                                                    : `text-ibm-coolGray-50`
                                                }
                                                placeholder:font-thin`}
                    />
                    {error && (
                      <FormErrorMessage
                        background
                        bgColor="gray"
                        style="start"
                        size="bg"
                      >
                        {error.message as string}
                      </FormErrorMessage>
                    )}
                  </>
                );
              }}
            />
          );
        })}
        <div
          className="
                        flex h-fit
                        w-full justify-end"
        >
          <Input
            type="submit"
            className="
                            hover:gb-gradient-to-l my-3
                            h-12
                            w-1/4 cursor-pointer justify-center
                            bg-gradient-to-r from-ibm-blue-40 to-ibm-purple-60
                            text-lg
                            font-thin text-ibm-cyan-10 transition duration-200
                            delay-75
                            ease-in
                            hover:-translate-y-1
                            hover:scale-105
                            hover:from-ibm-blue-30 hover:to-ibm-purple-50 hover:text-ibm-cyan-70"
          />
        </div>
      </form>
    </dialog>
  );
};

export default ModalEmployeeForm;
