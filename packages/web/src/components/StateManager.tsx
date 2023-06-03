"use client";
import { User, useUserStore } from "@/stores/user";
import { useEffect } from "react";

interface Props {
  user: User | null;
}
export default function StateManager({ user }: Props) {
  const { setUser } = useUserStore();

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user]);

  return null;
}
