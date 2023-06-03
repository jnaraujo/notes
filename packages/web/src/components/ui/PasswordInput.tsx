"use client";

import { useRef, useState } from "react";
import Input, { InputProps } from "./Input";
import { Eye, EyeOff } from "lucide-react";
import ErrorLabel from "./ErrorLabel";
import clsx from "clsx";

export default function PasswordInput({
  error,
  className,
  ...props
}: InputProps) {
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
    setIsInputEmpty(event.target.value === "");
  }

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between gap-1 overflow-hidden rounded-md border border-gray-400 bg-white outline-1 outline-black focus-within:outline">
        <Input
          className={clsx(
            "border-none bg-transparent p-2 focus:outline-none",
            className
          )}
          onChange={handleInputChange}
          type={showPassword ? "text" : "password"}
          placeholder="***********"
          onFocus={handlePasswordInputFocus}
          {...props}
        />
        <button
          type="button"
          className={clsx("mr-2", {
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
