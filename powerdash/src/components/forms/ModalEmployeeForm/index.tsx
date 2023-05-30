import { FC, useRef, useEffect, useState, Fragment } from "react";
import { Button } from "~/components";
import { CloseIcon } from "~/assets";
import { IModalEmployee } from "~/schemas";

interface ModalEmployeeFormProps {
    show: boolean;
    className?: string;
}

const ModalEmployeeForm: FC<ModalEmployeeFormProps> = ({show, className}): JSX.Element => {
    const [active, setActive] = useState<boolean>(false);
    const ref = useRef<HTMLDialogElement>(null);

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
        <>
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
            </dialog>
        </>
    );
}

export default ModalEmployeeForm;