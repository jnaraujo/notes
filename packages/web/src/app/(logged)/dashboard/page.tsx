"use client"

import { useUserStore } from "@/stores/user";
import { useEffect } from "react";

export default async function Dashboard() {
  const { user } = useUserStore();

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <h2 className="text-lg">
      Bem-vindo {user?.name}!
    </h2>
  )
}