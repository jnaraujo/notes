import { cookies } from "next/headers";
import decode from "jwt-decode";

interface User {
  sub: string;
  name: string;
  avatarUrl: string;
}

export function getUser(): User | null {
  const token = cookies().get("token")?.value;

  if (!token) {
    return null;
  }

  const user: User = decode(token);

  return user;
}
