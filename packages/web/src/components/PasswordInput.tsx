"use client";

import { useRef, useState } from "react";
import Input from "./Input";
import { Eye, EyeOff } from "lucide-react";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function (props: Props) {
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handlePasswordInputFocus() {
    passwordInputRef.current?.focus();
  }

  return <div className="flex w-full items-center justify-between gap-1 overflow-hidden rounded-md border border-gray-400 outline-1 outline-black focus-within:outline bg-white">
    <Input
      className="border-none p-2 focus:outline-none bg-transparent"
      type={showPassword ? "text" : "password"}
      placeholder="***********"
      onFocus={handlePasswordInputFocus}
      {...props}
    />
    <button
      type="button"
      className="mr-2"
      tabIndex={-1}
      onClick={handleShowPassword}
    >
      {showPassword ? <Eye size={24} /> : <EyeOff size={24} />}
    </button>
  </div>
}