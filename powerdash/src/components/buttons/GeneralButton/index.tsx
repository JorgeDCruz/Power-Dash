import cn from "~/utils/classNames";
import { cva } from "class-variance-authority";

interface GeneralButtonProps {
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  style?: "primary" | "secondary" | "tertiary" | "ghost";
  id?: string;
  icon?: React.ReactNode;
}

const GeneralButtonStyles = cva(
  [
    "rounded-md",
    "shadow",
    "transition-all",
    "duration-200",
    "flex",
    "items-center",
    "justify-center",
    "gap-2",
  ],
  {
    variants: {
      intent: {
        primary: [
          "bg-blue-500",
          "text-white",
          "hover:bg-blue-600",
          "active:bg-blue-700",
        ],
        secondary: [
          "bg-gray-200",
          "border-none",
          "hover:bg-gray-300",
          "active:bg-[#b6bfca]",
        ],
        tertiary: [
          "text-blue-500",
          "hover:text-blue-700",
          "shadow-none",
          "active:text-blue-900",
        ],
        ghost: [
          "border-2",
          "border-blue-500",
          "text-blue-500",
          "hover:bg-blue-50",
          "active:bg-blue-100",
        ],
      },
      size: {
        small: ["text-sm", "py-1", "px-2"],
        medium: ["text-base", "py-2", "px-4"],
        large: ["text-lg", "py-3", "px-6"],
      },
      animation: {
        true: ["hover:scale-110"],
      },
      disabled: {
        true: [
          "bg-gray-400",
          "opacity-50",
          "cursor-not-allowed",
          "pointer-events-none",
          "select-none",
          "border-none",
          "text-black",
        ],
      },
    },
    compoundVariants: [
      {
        intent: "tertiary",
        disabled: true,
        class: ["bg-transparent"],
      },
    ],
    defaultVariants: {
      intent: "primary",
      size: "medium",
      animation: false,
    },
  }
);
const GeneralButton = ({
  children,
  className,
  onClick,
  disabled,
  size = "medium",
  type,
  id,
  animated = false,
  icon,
  style = "primary",
}: GeneralButtonProps) => {
  return (
    <div className={`${disabled && "cursor-not-allowed"}`}>
      <button
        className={cn(
          GeneralButtonStyles({
            intent: style,
            size: size,
            animation: animated,
            disabled: disabled,
          }),
          className
        )}
        onClick={onClick}
        disabled={disabled}
        type={type}
        id={id}
      >
        {icon}
        {children}
      </button>
    </div>
  );
};

export default GeneralButton;
