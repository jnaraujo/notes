import { AtSign } from "lucide-react";
import Input, { InputProps } from "./Input";
import clsx from "clsx";
import ErrorLabel from "./ErrorLabel";
import { forwardRef } from "react";

const UsernameInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div>
        <div className={
          clsx("flex w-full items-center overflow-hidden rounded-md border border-gray-400 bg-white outline-1 outline-black focus-within:outline", {
            "border-red-500": error,
          })
        }>
          <span className="ml-2 text-lg text-gray-500">
            <AtSign size={18} />
          </span>
          <Input
            type="text"
            placeholder="Ex: johndoe"
            ref={ref}
            maxLength={25}
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