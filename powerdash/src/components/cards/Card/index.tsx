import * as React from "react";
import type { Dispatch, FC, PropsWithChildren, SetStateAction } from "react";
import { EditIcon, DeleteIcon } from "~/assets";
import { cn } from "@/lib/utils";

interface CardContainerProps {
  className?: string;
}

interface IEmployee {
  name: string;
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className: string;
  employee: IEmployee;
  EmployeesState: IEmployee[];
  setEmployees: Dispatch<SetStateAction<IEmployee[]>>;
}

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  )
);

const CardForm = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, employee: { name }, setEmployees, EmployeesState, ...props },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        "border-2 border-ibm-coolGray-60",
        "text-lg font-medium text-ibm-coolGray-90 text-opacity-100",
        "flex flex-wrap justify-between",
        "overflow-clip",
        "transition-all duration-200 ease-in",
        `hover:scale-105
                hover:cursor-pointer hover:bg-ibm-magenta-40
                hover:text-ibm-coolGray
                hover:underline hover:shadow-sm`,
        className
      )}
      {...props}
    >
      <p
        className="
                    ml-3 flex
                    h-full
                    w-fit items-center"
      >
        {name}
      </p>
      <div
        className="
                    flex h-full
                    w-1/4 items-center justify-evenly"
      >
        <EditIcon
          className="
                        h-full w-8
                        hover:fill-ibm-blue-70"
        />
        <button
          onClick={() => {
            setEmployees(
              EmployeesState.filter((employee) => employee.name !== name)
            );
          }}
        >
          <DeleteIcon
            className="
                        h-full w-8
                        hover:fill-ibm-magenta-90"
          />
        </button>
      </div>
    </div>
  )
);
CardForm.displayName = "CardForm";
Card.displayName = "Card";

const CardContainer: FC<PropsWithChildren<CardContainerProps>> = ({
  className,
  children,
}): JSX.Element => {
  return (
    <div
      className={cn([
        className,
        `
                mx-auto h-3/4
                w-3/4
                overflow-auto rounded-xl border-b-2
                border-t-2 border-b-ibm-coolGray-30
                border-t-ibm-coolGray-60 bg-gradient-to-br from-ibm-purple-60 to-ibm-cyan-50
                opacity-50
                brightness-150
                before:absolute
                before:inset-0 before:-z-10 before:bg-ibm-purple-50
                before:opacity-40 before:content-['']`,
      ])}
    >
      {children}
    </div>
  );
};

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

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
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(" flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardForm,
  CardContainer,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
