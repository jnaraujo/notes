"use client";
import { useUserStore } from "@/stores/user";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function GlobalStateManager() {
  const { setUser } = useUserStore();

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API}/users/me`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      }).then(async (response) => {

        if (response.ok) {
          const user = await response.json();
          setUser(user);
          return
        } else {
          Cookies.remove("token");
        }
      })
    }
  })

  return null;
}