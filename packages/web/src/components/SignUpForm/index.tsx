"use client";
import Input from "../ui/Input";
import useDebounce from "@/helpers/debounce";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import PasswordInput from "../ui/PasswordInput";
import { useRouter } from "next/navigation";
import UsernameInput from "../ui/UsernameInput";
import { useEffect, useState } from "react";
import ErrorLabel from "../ui/ErrorLabel";
import Cookies from "js-cookie";
import { signup } from "./helper";

export interface FormValues {
  name: string;
  username: string;
  email: string;
  password: string;
}

export default function () {
  const Router = useRouter();
  const [formError, setFormError] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<FormValues>();

  async function onSubmit(data: FormValues) {
    try {
      const response = await signup(data);

      Cookies.set("token", await response.text());
      Router.push("/dashboard");
    } catch (error: any) {
      if(error?.code === "EMAIL_ALREADY_IN_USE") {
        setError("email", {
          type: "manual",
          message: "Esse email já está em uso.",
        });
      }

      if(error?.code === "USERNAME_ALREADY_IN_USE") {
        setError("username", {
          type: "manual",
          message: "Esse nome de usuário já está em uso.",
        });
      }

      setFormError("Ocorreu um erro ao criar sua conta.");
    }
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
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
            required
            {...register("name")}
            error={errors.name?.message}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-lg">
            Nome de usuário:
          </label>
          <UsernameInput
            id="username"
            tabIndex={2}
            required
            {...register("username")}
            error={errors.username?.message}
          />
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
            required
            {...register("email")}
            error={errors.email?.message}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-lg">
            Senha:
          </label>
          <PasswordInput
            id="password"
            required
            {...register("password")}
            tabIndex={4}
            error={errors.password?.message}
            minLength={8}
          />
        </div>
      </div>

      {formError && (
        <ErrorLabel className="mt-1" error={formError} />
      )}

      <Button type="submit" tabIndex={5}>
        Criar sua conta!
      </Button>
    </form>
  );
}
