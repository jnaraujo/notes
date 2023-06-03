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
            "w-full rounded-md border border-gray-400 p-2 text-sm outline-1 outline-black",
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
