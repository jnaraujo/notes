import clsx from "clsx";
import { forwardRef } from "react";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={clsx(
          "w-full rounded-md border border-gray-400 p-2 text-sm outline-1 outline-black resize-none",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

export default TextAreaInput;
