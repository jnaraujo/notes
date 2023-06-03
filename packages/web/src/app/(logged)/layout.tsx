import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get("token")?.value;
  const isAuthenticated = token;

  if (!isAuthenticated) {
    redirect("/auth/login");
  }

  return <>{children}</>;
}
