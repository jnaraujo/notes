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
    <form className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-lg">
            Nome completo:
          </label>
          <Input
            type="text"
            id="name"
            placeholder="Ex: John Doe"
            tabIndex={1}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-lg">
            Nome de usuário:
          </label>

          <div className="flex w-full items-center justify-between overflow-hidden rounded-md border border-gray-400 outline-1 outline-black focus-within:outline">
            <span className="text-gray-500 ml-2 text-lg">@</span>
            <Input
              type="text"
              id="username"
              className="border-none p-2 focus:outline-none"
              placeholder="Ex: @johndoe"
              maxLength={20}
              tabIndex={2}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-lg">
            Email:
          </label>
          <Input
            type="email"
            id="email"
            placeholder="Ex: john@example.com"
            tabIndex={3}
          />
        </div>

        <div className="flex flex-col gap-2" ref={passwordInputRef}>
          <label htmlFor="password" className="text-lg">
            Senha:
          </label>
          <div className="flex w-full items-center justify-between gap-1 overflow-hidden rounded-md border border-gray-400 outline-1 outline-black focus-within:outline">
            <Input
              className="border-none p-2 focus:outline-none"
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="***********"
              tabIndex={4}
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
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-zinc-900 p-2 text-white transition hover:bg-zinc-700 focus:outline-zinc-400"
        tabIndex={5}
      >
        Criar sua conta!
      </button>
    </form>
  );
}
