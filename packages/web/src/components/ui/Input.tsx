import clsx from "clsx";
import ErrorLabel from "./ErrorLabel";
import { forwardRef } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={clsx(
            "w-full rounded-md border border-zinc-500 bg-transparent p-2 text-sm text-zinc-300 focus:border-zinc-400 focus:outline-none h-10",
            {
              "border-red-500": error,
            },
            className
          )}
          {...props}
        />
        {error && <ErrorLabel className="mt-1" error={error} />}
      </div>
    );
  }
);

export default Input;
