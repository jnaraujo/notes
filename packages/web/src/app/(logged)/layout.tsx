import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = cookies().has("token");

  if (!isAuthenticated) {
    redirect("/login");
  }

  return <>{children}</>;
}
