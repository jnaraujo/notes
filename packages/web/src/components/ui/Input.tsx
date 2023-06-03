import clsx from "clsx";
import ErrorLabel from "./ErrorLabel";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export default function ({ className, error, ...props }: InputProps) {
  return (
    <div className="flex flex-1 flex-col">
      <input
        className={clsx(
          "w-full rounded-md border border-gray-400 p-2 text-sm outline-1 outline-black",
          className
        )}
        {...props}
      />
      {error && <ErrorLabel error={error} />}
    </div>
  );
}
