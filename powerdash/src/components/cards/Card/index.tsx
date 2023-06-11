import * as React from "react";
import type { FC, PropsWithChildren } from "react";
import { EditIcon, DeleteIcon } from "~/assets";
import { cn } from "@/lib/utils";

interface CardContainerProps {
    className?: string;
}

interface IEmployee {
    name: string;
}

interface CardProps {
    className: string;
    employee: IEmployee;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, employee: {name}, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "rounded-lg border bg-card text-card-foreground shadow-sm",
                "border-2 border-ibm-coolGray-60",
                "text-lg font-medium text-ibm-coolGray-90 text-opacity-100",
                "flex flex-wrap justify-between",
                "overflow-clip",
                "transition-all duration-200 ease-in",
                `hover:bg-ibm-magenta-40
                hover:text-ibm-coolGray hover:underline
                hover:cursor-pointer
                hover:scale-105 hover:shadow-sm`,
                className
                )}
            {...props}
        >
            <p 
                className="
                    w-fit h-full
                    ml-3
                    flex items-center"
            >{name}
            </p>
            <div
                className="
                    w-1/4 h-full
                    flex items-center justify-evenly"
            >
                <EditIcon
                    className="
                        w-8 h-full
                        hover:fill-ibm-blue-70"
                />
                <DeleteIcon
                    className="
                        w-8 h-full
                        hover:fill-ibm-magenta-90"/>
            </div>
        </div>
    )
)
Card.displayName = "Card"

const CardContainer: FC<PropsWithChildren<CardContainerProps>> = ({className, children}): JSX.Element => {
    return(
        <div
            className={cn([className, `
                w-3/4 h-3/4
                mx-auto
                bg-gradient-to-br from-ibm-purple-60 to-ibm-cyan-50
                opacity-50 brightness-150
                border-t-2 border-b-2 border-t-ibm-coolGray-60 border-b-ibm-coolGray-30
                rounded-xl
                overflow-auto
                before:content-['']
                before:absolute before:inset-0 before:-z-10
                before:bg-ibm-purple-50 before:opacity-40`])
            }
        >
            {children}
        </div>
    );
}

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(" flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardContainer, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
