import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Olá!</h1>
      <Link href="/login" className="text-blue-500">
        Faça login
      </Link>
      <Link href="/signup" className="text-blue-500">
        Crie uma conta
      </Link>
    </main>
  );
}
