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
    redirect("/login");
  }

  try {    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    
  
    if (!response.ok) {
      redirect("/login");
    }
  
  } catch (error) {
    redirect("/login");
  }

  return <>{children}</>;
}
