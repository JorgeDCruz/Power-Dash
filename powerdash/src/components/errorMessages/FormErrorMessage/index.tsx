import { FC } from "react";
import { cva } from "class-variance-authority";
import { cn } from "~/lib/utils";

interface FormErrorMessageProps {
    children: string;
    className?: string;
    style?: "start" | "center" | "end";
    size?: "sm" | "md" | "bg";
    bgColor?: "none" | "white" | "gray";
    background?: boolean;
}

const errorMessage = cva([`
    w-full h-10
    text-ibm-magenta-50 font-thin
    flex
    align-center
    after:content-['*']`
], {
    variants: {
        intent: {
            start: [
                "justify-start",
                "pl-5"
            ],
            center: [
                "justify-center",
                "py-2"
            ],
            end: [
                "justify-end",
                "pr-2"
            ]
        },
        size: {
            sm: [
                "w-1/3",
                "h-8"
            ],
            md: [
                "w-2/3",
                "h-10"
            ],
            bg: [
                "w-full",
                "h-12"
            ]
        },
        background: {
            true: [
                "rounded-md"
            ]
        },
        bgColor: {
            none: [
                "bg-transparent"
            ],
            white: [
                "bg-white"
            ],
            gray: [
                "bg-ibm-coolGray-10"
            ]
        }
    },
    defaultVariants: {
        intent: "start",
        size: "bg",
        background: false,
        bgColor: "none"
    }
});

const FormErrorMessage: FC<FormErrorMessageProps> = ({
    className,
    children,
    style,
    size,
    bgColor,
    background
}): JSX.Element => {
    return(
        <div className={cn([className, errorMessage({
            intent: style,
            size: size,
            bgColor: bgColor,
            background: background
        })])}>
            <p>{children}</p>
        </div>
    );
}

export default FormErrorMessage;