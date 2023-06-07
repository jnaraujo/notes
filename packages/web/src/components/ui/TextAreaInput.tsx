import clsx from "clsx";
import { forwardRef } from "react";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={clsx(
          "w-full rounded-md border border-zinc-500 bg-transparent p-2 text-sm text-zinc-300 focus:border-zinc-400 focus:outline-none",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

export default TextAreaInput;
