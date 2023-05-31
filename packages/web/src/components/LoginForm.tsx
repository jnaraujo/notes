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
          <label htmlFor="email" className="text-lg">Email:</label>
          <Input type="email" id="email" placeholder="Ex: john@example.com" tabIndex={1} />
        </div>
        <div className="flex flex-col gap-2" ref={passwordInputRef}>
          <label htmlFor="password" className="text-lg">Senha:</label>
          <div className="flex items-center justify-between border border-gray-400 rounded-md w-full overflow-hidden gap-1 outline-black outline-1 focus-within:outline">
            <Input className="focus:outline-none border-none p-2" type={showPassword ? "text" : "password"} id="password" placeholder="***********" tabIndex={2} onFocus={handlePasswordInputFocus} />
            <button className="mr-1" tabIndex={-1}>
              {
                showPassword
                  ? <Eye size={24} onClick={handleShowPassword} />
                  : <EyeOff size={24} onClick={handleShowPassword} />
              }
            </button>
          </div>

          <a className="text-purple-700 text-right font-medium hover:text-purple-500 transition" href="#" tabIndex={4}>
            Esqueceu a senha?
          </a>
        </div>
      </div>

      <button className="w-full bg-zinc-900 text-white rounded-md p-2 hover:bg-zinc-700 transition focus:outline-zinc-400" tabIndex={3}>
        Login
      </button>
    </form>
  )
}