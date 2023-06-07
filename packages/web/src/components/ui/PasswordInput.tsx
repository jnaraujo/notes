"use client";

import { forwardRef, useRef, useState } from "react";
import Input, { InputProps } from "./Input";
import { Eye, EyeOff } from "lucide-react";
import ErrorLabel from "./ErrorLabel";
import clsx from "clsx";

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, onChange, ...props }, ref) => {
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isInputEmpty, setIsInputEmpty] = useState(true);

    function handleShowPassword() {
      setShowPassword(!showPassword);
    }

    function handlePasswordInputFocus() {
      passwordInputRef.current?.focus();
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
      onChange?.(event);
      setIsInputEmpty(event.target.value === "");
    }

    return (
      <div className="w-full">
        <div
          className={clsx(
            "flex w-full items-center justify-between gap-1 overflow-hidden rounded-md border border-zinc-500 focus-within:border-zinc-400 focus-within:outline-none",
            {
              "border-red-500": error,
            }
          )}
        >
          <Input
            className={clsx(
              "border-none bg-transparent p-2 focus:outline-none",
              className
            )}
            type={showPassword ? "text" : "password"}
            placeholder="***********"
            ref={ref}
            {...props}
            onFocus={handlePasswordInputFocus}
            onChange={handleInputChange}
          />
          <button
            type="button"
            className={clsx("mr-2 text-zinc-300", {
              hidden: isInputEmpty,
            })}
            tabIndex={-1}
            onClick={handleShowPassword}
          >
            {showPassword ? <Eye size={24} /> : <EyeOff size={24} />}
          </button>
        </div>
        {error && <ErrorLabel className="mt-1" error={error} />}
      </div>
    );
  }
);

export default PasswordInput;
