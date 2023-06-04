"use client";
import Input from "../ui/Input";
import Button from "../ui/Button";
import TextAreaInput from "../ui/TextAreaInput";
import Cookies from "js-cookie";
import { useState } from "react";
import ErrorLabel from "../ui/ErrorLabel";
import { useQuery } from "@tanstack/react-query";

export default function QuickNoteWidget() {
  const { refetch } = useQuery({
    queryKey: ["latest-notes"],
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(data),
    });

    setLoading(false);

    if (!response.ok) {
      setError("Ocorreu um erro ao criar a nota.");
      return;
    }

    setSuccess("Nota criada com sucesso!");
    refetch();
  }
  return (
    <div className="flex w-full h-fit flex-col gap-3 rounded-md bg-zinc-200/50 p-6 shadow-md md:max-w-md">
      <h2 className="text-xl font-bold text-zinc-600">Crie uma nota rápida:</h2>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <Input
          required
          minLength={1}
          name="title"
          placeholder="Título"
          className="text-sm placeholder:text-sm"
        />
        <TextAreaInput
          required
          minLength={1}
          name="content"
          placeholder="Ex: Hoje eu fiz..."
          className="h-32 text-sm placeholder:text-sm"
        />

        <input name="isPublic" type="hidden" value="false" />

        {error && <ErrorLabel error={error} />}

        {success && <p className="text-green-500 font-semibold text-sm">{success}</p>}

        <Button isLoading={loading} type="submit">
          Criar nota privada
        </Button>
      </form>
    </div>
  );
}
