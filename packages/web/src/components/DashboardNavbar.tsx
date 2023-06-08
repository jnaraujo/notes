"use client";

import { Home, Feather } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

const MENU_LINKS = [
  {
    name: "Dashboard",
    icon: Home,
    url: "/dashboard",
  },
  {
    name: "Criar nota",
    icon: Feather,
    url: "/notes/new",
  },
];

export default function DashboardNavbar() {
  const pathname = usePathname();

  function isOnPath(path: string) {
    return pathname.startsWith(path);
  }

  return (
    <nav className="flex h-full flex-col items-center justify-center gap-2 overflow-hidden">
      {MENU_LINKS.map(({ name, url, icon: Icon }) => (
        <Link
          key={name}
          href={url}
          className={clsx(
            "flex w-11/12 items-center justify-center rounded-full py-2 text-zinc-500 transition-colors duration-200 hover:bg-zinc-700/40 hover:text-zinc-100",
            {
              "bg-zinc-700/40 text-zinc-300": isOnPath(url),
            }
          )}
        >
          <span className="flex w-3/4 items-center justify-center group-hover:justify-start">
            <Icon size={27} className="shrink-0" />
            <span className="ml-2 hidden whitespace-nowrap font-medium text-zinc-300 group-hover:block">
              {name}
            </span>
          </span>
        </Link>
      ))}
    </nav>
  );
}
