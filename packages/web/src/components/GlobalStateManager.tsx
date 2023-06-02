"use client";
import { fetchUser } from "@/lib/user";
import { User, useUserStore } from "@/stores/user";

interface Props {
  user: User | null;
}
export default function GlobalStateManager({ user }: Props) {
  const { setUser } = useUserStore();

  if (user) {
    setUser(user);
  } else {
    fetchUser().then((user) => {
      setUser(user);
    });
  }

  return null;
}