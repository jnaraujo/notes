import { cookies } from "next/headers";

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
};

export async function fetchUser(): Promise<User | null> {
  const token = cookies().get("token")?.value;

  if (!token) {
    return null;
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const user = await response.json();

  return user;
}
