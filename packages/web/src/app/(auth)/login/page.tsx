import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export const metadata = {
  title: "Faça login para continuar - AweNotes",
  description: "Faça login para continuar no AweNotes.",
};

export default function Login() {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="flex w-full flex-col gap-6 p-4 md:w-96">
        <div className="flex flex-col gap-4">
          <h1 className="w-64 text-2xl font-bold text-zinc-200">
            Faça login para continuar 👋
          </h1>
          <LoginForm />
        </div>

        <p className="text-center text-sm">
          Não tem uma conta?
          <Link
            className="font-medium text-purple-500 transition hover:text-purple-600"
            href="/signup"
          >
            {" "}
            Crie uma agora!
          </Link>
        </p>
      </div>
    </main>
  );
}
