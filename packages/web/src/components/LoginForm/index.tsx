"use client";
import { useRouter } from "next/navigation";
import Input from "../ui/Input";
import PasswordInput from "../ui/PasswordInput";
import Cookie from "js-cookie";
import { FormEvent, useState } from "react";
import { login } from "./helper";
import Button from "../ui/Button";
import Label from "../ui/Label";
import clsx from "clsx";

export default function () {
  const Router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Label htmlFor="email">E-mail:</Label>
          <Input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Ex: joao@exemplo.com"
            tabIndex={1}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="password">Senha:</Label>
          <PasswordInput id="password" name="password" required tabIndex={2} />

          <a
            className="text-right text-sm font-medium text-purple-700 transition hover:text-purple-500"
            href="#"
            tabIndex={4}
          >
            Esqueceu a senha?
          </a>
        </div>
      </div>

      {/* error */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button
        type="submit"
        tabIndex={3}
        disabled={loading}
        className={clsx({
          "cursor-wait disabled:bg-zinc-500": loading,
        })}
      >
        {loading ? "Carregando..." : "Login"}
      </Button>
    </form>
  );
}
