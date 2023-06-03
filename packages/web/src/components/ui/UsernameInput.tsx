import { AtSign } from "lucide-react";
import Input, { InputProps } from "./Input";
import clsx from "clsx";
import ErrorLabel from "./ErrorLabel";

export default function UsernameInput({ className, error }: InputProps) {
  return (
    <div>
      <div className="flex w-full items-center overflow-hidden rounded-md border border-gray-400 bg-white outline-1 outline-black focus-within:outline">
        <span className="ml-2 text-lg text-gray-500">
          <AtSign size={18} />
        </span>
        <Input
          type="text"
          className={clsx("border-none p-2 focus:outline-none", className)}
          placeholder="Ex: johndoe"
          maxLength={25}
        />
      </div>
      {error && <ErrorLabel className="mt-1" error={error} />}
    </div>
  );
}
