import { AtSign } from "lucide-react";
import Input, { InputProps } from "./Input";
import clsx from "clsx";
import ErrorLabel from "./ErrorLabel";
import { forwardRef } from "react";

const UsernameInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div>
        <div
          className={clsx(
            "relative flex w-full items-center justify-between gap-1 overflow-hidden rounded-md border border-zinc-500 focus-within:border-zinc-400 focus-within:outline-none",
            {
              "border-red-500": error,
            }
          )}
        >
          <span className="ml-2 text-lg text-gray-500">
            <AtSign size={18} />
          </span>
          <Input
            type="text"
            ref={ref}
            maxLength={25}
            min={3}
            className={clsx("border-none p-2 focus:outline-none", className)}
            {...props}
          />
        </div>
        {error && <ErrorLabel className="mt-1" error={error} />}
      </div>
    );
  }
);

export default UsernameInput;
