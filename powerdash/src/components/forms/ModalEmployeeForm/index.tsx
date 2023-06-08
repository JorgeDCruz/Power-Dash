import { FC, useRef, useEffect, useState } from "react";
import { Button, Input, FormErrorMessage} from "~/components";
import { Label } from "~/components/labels/label"
import { CloseIcon } from "~/assets";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { IModalEmployee, EmployeeSchema } from "~/schemas";

interface ModalEmployeeFormProps {
    show: boolean;
    className?: string;
};

type InputNames = `${number}` | `${number}.${string}`;

const fieldNames: string[] = [
    "employeeName",
    "employeeCountry",
    "employeeState",
    "employeeCity",
    "yearsXP",
    "employeePosition",
    "programmingLanguages",
    "technologies"
];

const placeholders: string[] = [
    "Nombre del empleado",
    "País de residencia del empleado",
    "Estado de residencia del empleado",
    "Ciudad de residencia del empleado",
    "Años de experiencia",
    "Puesto del empleado",
    "Lenguajes de programación",
    "Tecnologías que maneja el empleado"
];

const labels: string[] = [
    "Nombre",
    "País",
    "Estado",
    "Ciudad",
    "Años de Experiencia",
    "Puesto",
    "Lenguajes",
    "Technologías"
];

const ModalEmployeeForm: FC<ModalEmployeeFormProps> = ({show, className}): JSX.Element => {
    const [active, setActive] = useState<boolean>(false);
    const ref = useRef<HTMLDialogElement>(null);

    const { handleSubmit, reset, control} = useForm<IModalEmployee>({
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
            programmingLanguages: [""],
            technologies: ""
        }
    });

    const idGenerator = (): string => Date.now().toString(36) + Math.random().toString(36);

    const onSubmit: SubmitHandler<IModalEmployee> = (data: IModalEmployee): void => {
        console.log(data)
        const validationResults = EmployeeSchema.safeParse(data);
        console.log(validationResults)
        if(!validationResults.success){
            console.log("ENTRO")
            console.log(validationResults.error.name)
        }
    };

    useEffect(() => {
            setActive(prev => !prev);
        }, [show]);

    useEffect(() => {
        const setActiveModal = (): void => {
            if(active){
                ref.current?.showModal();
            }else{
                ref.current?.close();
            }
        }
        setActiveModal();
    }, [active]);

    return(
        <dialog
            className={className}
            ref={ref}
        >
            <div
                className="
                    w-auto h-fit
                    flex justify-end"
            >
                <Button
                    className="
                        w-14 h-12
                        bg-ibm-coolGray-10
                        transition duration-300 delay-75 ease
                        group
                        hover:bg-ibm-coolGray-20
                        hover:shadow-md"
                    onClick={() => {setActive(prev => !prev);reset();}}
                >
                    <CloseIcon
                        className="
                            w-10
                            fill-ibm-blue-60
                            transition duration-300 delay-75 ease
                            group-hover:fill-ibm-blue-70
                            group-hover:scale-110"
                    />
                </Button>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="
                    w-full h-fit
                    mt-5"
            >
                {fieldNames.map((fieldName, index) => {
                    return(
                        <Controller
                            key={idGenerator()}
                            control={control}
                            name={fieldName as InputNames}
                            render={({field, fieldState: {error}}) => {
                                return(
                                    <>
                                        <Label
                                            htmlFor={labels[index]}
                                            className={`
                                                mx-2
                                                ${(error && `text-ibm-magenta-50 after:content-['*']`)}`
                                            }
                                        >{labels[index]}
                                        </Label>
                                        <Input
                                            id={labels[index]}
                                            {...field}
                                            placeholder={placeholders[index]}
                                            className={`
                                                mb-3 mt-1
                                                ${(error && `border-2 border-ibm-magenta-50 outline-ibm-magenta-60`)}
                                                placeholder:${error? `text-ibm-magenta-40` : `text-ibm-coolGray-50`}
                                                placeholder:font-thin`
                                            }
                                        />
                                        {error && 
                                            <FormErrorMessage
                                                background
                                                bgColor="gray"
                                                style="start"
                                                size="bg"
                                            >
                                                {error.message as string}
                                            </FormErrorMessage>
                                        }
                                    </>
                                );
                            }}
                        />
                    );
                })}
                <input type="submit" className="cursor-pointer"/>
            </form>
        </dialog>
    );
}

export default ModalEmployeeForm;