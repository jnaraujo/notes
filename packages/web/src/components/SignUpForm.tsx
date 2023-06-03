"use client";
import Input from "./Input";
import { AtSign } from "lucide-react";
import Button from "./ui/Button";
import PasswordInput from "./PasswordInput";

export default function () {
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

          <div className="flex w-full items-center justify-between overflow-hidden rounded-md border border-gray-400 bg-white outline-1 outline-black focus-within:outline">
            <span className="ml-2 text-lg text-gray-500">
              <AtSign size={18} />
            </span>
            <Input
              type="text"
              id="username"
              className="border-none p-2 focus:outline-none"
              placeholder="Ex: johndoe"
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

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-lg">
            Senha:
          </label>
          <PasswordInput id="password" name="password" required tabIndex={2} />
        </div>
      </div>

      <Button type="submit" tabIndex={5}>
        Criar sua conta!
      </Button>
    </form>
  );
}
