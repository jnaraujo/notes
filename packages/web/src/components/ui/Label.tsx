import clsx from "clsx";
import type { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}
export default function Label({ children, className, ...props }: LabelProps) {
  return (
    <label
      className={clsx("text-sm font-medium text-zinc-300", className)}
      {...props}
    >
      {children}
    </label>
  );
}
