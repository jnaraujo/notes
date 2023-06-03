import clsx from "clsx";
import { AlertCircle } from "lucide-react";

interface ErrorLabel extends React.InputHTMLAttributes<HTMLSpanElement> {
  error: string;
}

export default function ErrorLabel({ error, className, ...props }: ErrorLabel) {
  return (
    <span
      className={clsx("flex flex-1 items-center gap-1 text-red-500", className)}
      {...props}
    >
      <AlertCircle size={16} /> {error}
    </span>
  );
}
