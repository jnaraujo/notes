"use client";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import PasswordInput from "../ui/PasswordInput";
import { useRouter } from "next/navigation";
import UsernameInput from "../ui/UsernameInput";
import { useState } from "react";
import ErrorLabel from "../ui/ErrorLabel";
import Cookies from "js-cookie";
import { errorToMessage, signup } from "./helper";
import Label from "../ui/Label";
import clsx from "clsx";
export interface FormValues {
  name: string;
  username: string;
  email: string;
  password: string;
}

export default function () {
  const Router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>();

  async function onSubmit(data: FormValues) {
    setLoading(true);   

    try {
      const token = await signup(data);

      Cookies.set("token", token);
      Router.push("/dashboard");
    } catch (error: any) {
      const message = errorToMessage(error);

      if (message.field) {
        setError(message.field as any, {
          type: "manual",
          message: message.message,
        });
      } else {
        setFormError(message.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Label htmlFor="name">Nome completo:</Label>
          <Input
            type="text"
            id="name"
            placeholder="Ex: João da Silva"
            tabIndex={1}
            required
            {...register("name")}
            error={errors.name?.message}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="username">Nome de usuário:</Label>
          <UsernameInput
            id="username"
            tabIndex={2}
            required
            placeholder="Ex: joao.silva"
            {...register("username")}
            error={errors.username?.message}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            id="email"
            placeholder="Ex: joao@exemplo.com"
            tabIndex={3}
            required
            {...register("email")}
            error={errors.email?.message}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="password">Senha:</Label>
          <PasswordInput
            id="password"
            minLength={8}
            required
            {...register("password")}
            error={errors.password?.message}
            tabIndex={4}
          />
        </div>
      </div>

      {formError && <ErrorLabel className="mt-1" error={formError} />}

      <Button
        type="submit"
        tabIndex={5}
        disabled={loading}
        className={clsx({
          "cursor-wait disabled:bg-zinc-500": loading,
        })}
      >
        {loading ? "Carregando..." : "Criar sua conta"}
      </Button>
    </form>
  );
}
