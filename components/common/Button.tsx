import { twMerge } from "tailwind-merge";
import { NextIcon } from "./iconComponents/NextArrowIcon";
import { type } from "os";
import { CloseIcon } from "./iconComponents/CloseIcon";

interface IButtonProps {
  id?: string;
  type?: "submit" | "button";
  children?: any;
  className?: string;
  onClick?: (any?) => void;
  disabled?: boolean;
  next?: boolean;
}

export function PrimaryButton({ className, children, next, ...props }: IButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        "relative flex items-center justify-center text-white h-[48px] px-4 font-semibold rounded-[2px]",
        props.disabled ? "bg-forbid cursor-not-allowed" : "bg-primary",
        className
      )}
    >
      {next ? (
        <>
          Next
          <span className="absolute right-3">
            <NextIcon />
          </span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

export function SecondaryButton({ className, children, ...props }: IButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        "relative flex items-center justify-center border-2 border-primary text-primary h-[48px] px-4 font-semibold rounded-[2px]",
        props.disabled ? "bg-forbid cursor-not-allowed" : "bg-white",
        className
      )}
    >
      {children}
    </button>
  );
}

export function RadioButton({ state, disabled = false, label, onClose = null }) {
  return (
    <div
      className={twMerge(
        "relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none px-4 py-2 border text-xs space-x-2",
        state === "checked" && "bg-primary border-primary text-white",
        state === "unchecked" && "border-primary text-primary",
        disabled && "border-forbid text-forbid bg-white"
      )}
    >
      <span>{label}</span>

      {onClose && (
        <span onClick={typeof onClose === "function" ? onClose : () => ({})}>
          <CloseIcon className="h-4 w-4 text-white" color="#ffffff" />
        </span>
      )}
    </div>
  );
}

export function ColorRadioButton({ color, state, disabled = false, onClose = null }) {
  return (
    <div
      className={twMerge(
        `relative p-0.5 h-8 w-8 rounded-full flex items-center justify-center cursor-pointer focus:outline-none border border-black/10 text-xs space-x-2 bg-[${color}]`,
        state === "checked" && " ring-1 ring-offset-1 ring-black/50",
        state === "unchecked" && "",
        disabled && "border-forbid text-forbid bg-white"
      )}
      style={{ backgroundColor: color }}
    >
      {onClose && (
        <span onClick={typeof onClose === "function" ? onClose : () => ({})}>
          <CloseIcon className="h-4 w-4 text-white" color="#ffffff" />
        </span>
      )}
    </div>
  );
}
