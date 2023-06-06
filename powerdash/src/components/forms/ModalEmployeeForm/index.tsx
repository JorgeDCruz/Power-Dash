import { FC, useRef, useEffect, useState } from "react";
import { Button, Input } from "~/components";
import { CloseIcon } from "~/assets";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { IModalEmployee, EmployeeSchema } from "~/schemas";

interface ModalEmployeeFormProps {
    show: boolean;
    className?: string;
};

type InputNames = `${number}` | `${number}.${string}`;

const ModalEmployeeForm: FC<ModalEmployeeFormProps> = ({show, className}): JSX.Element => {
    const [active, setActive] = useState<boolean>(false);
    const ref = useRef<HTMLDialogElement>(null);

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

    const { handleSubmit, reset, setError, control, formState: {errors} } = useForm<IModalEmployee>({
        resolver: zodResolver(EmployeeSchema),
        mode: "all",
        defaultValues: EmployeeSchema.parse({
            employeeName: "MLG",
            employeeCountry: "",
            employeeState: "",
            employeeCity: "",
            yearsXP: 0,
            employeePosition: "",
            programmingLanguages: ["dx"],
            technologies: ""
        })
    });

    const idGenerator = (): string => Date.now().toString(36) + Math.random().toString(36);

    const onSubmit: SubmitHandler<IModalEmployee> = (data: IModalEmployee) => {
        console.log(data)
         const validationResults = EmployeeSchema.safeParse(data);
         if(!validationResults.success){
            validationResults.error.flatten()
         }
    };

    useEffect(() => {
            setActive(prev => !prev);
        }, [show]);

    useEffect(() => {
        const setActiveModal = () => {
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
                        bg-[#f2f4f8]
                        transition duration-300 delay-75 ease
                        group
                        hover:bg-[#dde1e6]
                        hover:shadow-md"
                    onClick={() => setActive(prev => !prev)}
                >
                    <CloseIcon
                        className="
                            w-10
                            fill-[#0f62fe]
                            transition duration-300 delay-75 ease
                            group-hover:scale-105
                            group-hover:fill-[#0043ce]
                            gorup-hover:scale-110"
                    />
                </Button>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                {fieldNames.map(fieldName => {
                    return(
                        <Controller
                            key={idGenerator()}
                            control={control}
                            name={fieldName as InputNames}
                            render={({field}) => {
                                return(
                                    <input 
                                        {...field}
                                        className="block border-2 border-black"
                                    />
                                );
                            }}
                        />
                    );
                })}
                <input type="submit"/>
            </form>
        </dialog>
    );
}

export default ModalEmployeeForm;