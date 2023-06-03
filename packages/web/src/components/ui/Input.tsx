import clsx from "clsx";
import { AlertCircle } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
      {error && (
        <span className="mt-1 flex items-center gap-1 text-red-500">
          <AlertCircle size={16} /> Email invalido!
        </span>
      )}
    </div>
  );
}
