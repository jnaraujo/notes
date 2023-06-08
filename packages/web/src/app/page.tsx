import { cookies } from "next/headers";

export default function Home() {
  const token = cookies().get("token")?.value;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {token}
    </main>
  );
}
