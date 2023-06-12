import { type FC, useRef, useEffect, useState } from "react";
import { Button, Input, FormErrorMessage } from "~/components";
import { Label } from "~/components/labels/label";
import { CloseIcon, BeeIcon } from "~/assets";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type IModalEmployee } from "~/schemas";
import { cn, idGenerator } from "~/lib/utils";
import { Transition } from "@headlessui/react";
import { CertificationSchema } from "~/schemas/CertificationFormSchema";

interface CertificationFormProps {
  show: boolean;
  className?: string;
}

type InputNames = `${number}` | `${number}.${string}`;

const fieldNames: string[] = [
  "certificationID",
  "certificationName",
  "certificationProvider",
  "certificationStatus",
  "certificationType",
  "expirationDate",
  "marketCertification",
];

const placeholders: string[] = [
  "ID del empleado",
  "Nombre de la certificación",
  "Proveedor de la certificación",
  "Estado de la certificación",
  "Tipo de certificación",
  "Fecha de expiración",
  "Certificación del mercado",
];

const labels: string[] = [
  "ID del empleado",
  "Nombre de la certificación",
  "Proveedor de la certificación",
  "Estado de la certificación",
  "Tipo de certificación",
  "Fecha de expiración",
  "Certificación del mercado",
];

const CertificationForm: FC<CertificationFormProps> = ({
  show,
  className,
}): JSX.Element => {
  const [active, setActive] = useState<boolean>(show);
  const ref = useRef<HTMLDialogElement>(null);

  const { handleSubmit, reset, control } = useForm<IModalEmployee>({
    resolver: zodResolver(CertificationSchema),
    mode: "all",
    shouldFocusError: true,
    defaultValues: {
      certificationID: "",
      certificationName: "",
      certificationProvider: "",
      certificationStatus: false,
      certificationType: 0,
      expirationDate: "",
      certificationMarket: false,
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
    <Transition
      show={active}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className={cn([
        className,
        `
                 w-full
                backdrop:bg-gradient-to-tr
                backdrop:from-ibm-blue-20
                backdrop:to-ibm-cyan-60
                backdrop:opacity-50
                backdrop:brightness-125`,
      ])}
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
    </Transition>
  );
};

export default CertificationForm;
