"use client";
import { useRouter } from "next/navigation";
import Input from "../ui/Input";
import PasswordInput from "../PasswordInput";
import Cookie from "js-cookie";
import { FormEvent, useState } from "react";
import { login } from "./helper";
import Button from "../ui/Button";

export default function () {
  const Router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const data = new FormData(event.currentTarget);

    try {
      const token = await login(data);

      Cookie.set("token", token, {
        expires: 30, // 30 days
        path: "/",
      });
      Router.push("/dashboard");
    } catch (error) {
      setError("Usuário ou senha incorretos.");
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-lg">
            Email:
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Ex: john@example.com"
            tabIndex={1}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-lg">
            Senha:
          </label>
          <PasswordInput id="password" name="password" required tabIndex={2} />

          <a
            className="text-right font-medium text-purple-700 transition hover:text-purple-500"
            href="#"
            tabIndex={4}
          >
            Esqueceu a senha?
          </a>
        </div>
      </div>

      {/* error */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" tabIndex={3}>
        Login
      </Button>
    </form>
  );
}
