import { Github } from "lucide-react";

export default function Login() {
  return (
    <main className="flex  h-screen items-center justify-center ">
      <div className="flex flex-col gap-6 w-72">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-zinc-800 w-64">Faça login para continuar</h1>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-lg">Email:</label>
              <input type="email" id="email" className="border border-gray-400 rounded-md p-2" placeholder="Ex: john@example.com" tabIndex={1} />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-lg">Senha:</label>
              <input type="password" id="password" className="border border-gray-400 rounded-md p-2" placeholder="***********" tabIndex={2} />

              <a className="text-purple-700 text-right font-medium hover:text-purple-500 transition" href="#" tabIndex={4}>
                Esqueceu a senha?
              </a>
            </div>
          </div>

          <button className="bg-zinc-900 text-white rounded-md p-2 hover:bg-zinc-700 transition focus:outline-zinc-400" tabIndex={3}>
            Login
          </button>

        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-center items-center">
            <div className="border-t border-gray-300 flex-1" />
            <p className="mx-3 text-center text-zinc-400">Ou faça login com</p>
            <div className="border-t border-gray-300 flex-1" />
          </div>

          <div className="flex flex-row gap-4 justify-center">
            <button className="text-zinc-500 p-2 rounded-md border-2 border-zinc-200 hover:bg-zinc-200 transition focus:outline-zinc-800">
              <Github size={24} />
            </button>
          </div>
        </div>

        <div>
          <p className="text-center">
            Não tem uma conta?
            <a className="text-purple-700 font-medium hover:text-purple-500 transition" href="#"> Crie uma agora!</a>
          </p>
        </div>
      </div>
    </main>
  )
}