import clsx from "clsx";
import { forwardRef } from "react";

interface CheckBoxInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
}

const CheckBoxInput = forwardRef<HTMLInputElement, CheckBoxInputProps>(
  ({ className, ...props }, ref) => {
    return <input type="checkbox" ref={ref} className={clsx(
      "rounded-md border border-gray-400 p-2 text-sm outline-1 outline-black",
      className
    )} {...props} />;
  }
);

export default CheckBoxInput;
