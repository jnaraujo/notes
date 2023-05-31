import LoginForm from "@/components/LoginForm";
import { Github } from "lucide-react";

export default function Login() {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="flex w-full flex-col gap-6 p-4 md:w-96">
        <div className="flex flex-col gap-4">
          <h1 className="w-64 text-2xl font-bold text-zinc-800">
            Faça login para continuar 👋
          </h1>
          <LoginForm />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center">
            <div className="flex-1 border-t border-gray-300" />
            <p className="mx-3 text-center text-zinc-400">Ou faça login com</p>
            <div className="flex-1 border-t border-gray-300" />
          </div>

          <div className="flex flex-row justify-center gap-4">
            <button className="rounded-md border-2 border-zinc-200 p-2 text-zinc-500 transition hover:bg-zinc-200 focus:outline-zinc-800">
              <Github size={24} />
            </button>
          </div>
        </div>

        <p className="text-center">
          Não tem uma conta?
          <a
            className="font-medium text-purple-700 transition hover:text-purple-500"
            href="#"
          >
            {" "}
            Crie uma agora!
          </a>
        </p>
      </div>
    </main>
  );
}
