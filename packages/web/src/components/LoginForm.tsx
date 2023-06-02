"use client";
import { useRef, useState } from "react";
import Input from "./Input";
import { Eye, EyeOff } from "lucide-react";

export default function () {
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handlePasswordInputFocus() {
    passwordInputRef.current?.focus();
  }

  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-lg">
            Email:
          </label>
          <Input
            type="email"
            id="email"
            placeholder="Ex: john@example.com"
            tabIndex={1}
          />
        </div>
        <div className="flex flex-col gap-2" ref={passwordInputRef}>
          <label htmlFor="password" className="text-lg">
            Senha:
          </label>
          <div className="flex w-full items-center justify-between gap-1 overflow-hidden rounded-md border border-gray-400 outline-1 outline-black focus-within:outline bg-white">
            <Input
              className="border-none p-2 focus:outline-none bg-transparent"
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="***********"
              tabIndex={2}
              onFocus={handlePasswordInputFocus}
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

          <a
            className="text-right font-medium text-purple-700 transition hover:text-purple-500"
            href="#"
            tabIndex={4}
          >
            Esqueceu a senha?
          </a>
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-zinc-900 p-2 text-white transition hover:bg-zinc-700 focus:outline-zinc-400"
        tabIndex={3}
      >
        Login
      </button>
    </form>
  );
}
