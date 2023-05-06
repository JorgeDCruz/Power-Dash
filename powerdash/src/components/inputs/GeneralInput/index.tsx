import cn from "~/utils/classNames";
import { cva } from "class-variance-authority";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface GeneralInputProps {
  label?: string;
  labelClassName?: string;
  className?: string;
  inputClassName?: string;
  RightIcon?: JSX.Element;
  RightIconAction?: () => void;
  type?: "text" | "password" | "number" | "email";
  onFocus?: () => void;
  onBlur?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder?: string;
}

const GeneralInputStyles = cva(
  [
    "w-full pr-10 outline-none bg-transparent focus:outline-none focus:ring-0 focus:border-transparent border-transparent focus:ring-0 text-sm text-gray-900 font-light",
  ],
  {
    variants: {
      type: {
        text: [],
        password: [],
        number: ["pr-2"],
        email: [],
      },
    },
  }
);

const GeneralInput = ({
  label,
  labelClassName,
  className,
  inputClassName,
  RightIcon,
  RightIconAction,
  type = "text",
  onFocus,
  onBlur,
  onChange,
  value,
  placeholder,
}: GeneralInputProps) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus && onFocus();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur && onBlur();
  };

  const showHidePassword = () => {
    setIsPasswordShown(!isPasswordShown);
    return false;
  };
  return (
    <>
      <label className={cn(`text-xs text-gray-400`, labelClassName)}>
        {label}
      </label>
      <div className={cn(`group`, className)} tabIndex={0}>
        <div className={cn(`relative`)}>
          <input
            type={
              type === "password"
                ? isPasswordShown
                  ? "text"
                  : "password"
                : type
            }
            className={cn(GeneralInputStyles({ type: type }), inputClassName)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
          {type !== "number" && (
            <button
              type={"button"}
              onClick={
                type === "password" ? () => showHidePassword() : RightIconAction
              }
              className={`absolute right-2 top-1/2 -translate-y-1/2 transform`}
            >
              {type === "password" ? (
                isPasswordShown ? (
                  <AiFillEye
                    className={`duration-250 cursor-pointer select-none text-gray-500 transition-all hover:text-gray-600 active:text-gray-700`}
                  />
                ) : (
                  <AiFillEyeInvisible
                    className={`duration-250 cursor-pointer select-none text-gray-500 transition-all hover:text-gray-600 active:text-gray-700`}
                  />
                )
              ) : (
                RightIcon
              )}
            </button>
          )}
        </div>
        <div
          id={`border`}
          className={cn(`duration-250 mt-1 w-full border-b transition-all`, {
            "border-gray-200": !isFocused,
            "border-gray-400": isFocused,
          })}
        />
      </div>
    </>
  );
};

export default GeneralInput;
