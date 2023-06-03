"use client";

import { Home, Feather } from "lucide-react";
import cx from "classnames";
import { isOnPath } from "@/helpers/path";

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

export default function () {
  return (
    <nav className="flex h-full flex-col items-center justify-center gap-2">
      {MENU_LINKS.map(({ name, url, icon: Icon }) => (
        <a
          key={name}
          href={url}
          className={cx(
            "flex w-11/12 items-center justify-center rounded-full py-2 transition-colors duration-200 hover:bg-zinc-700/40 hover:text-purple-500",
            {
              "bg-zinc-700/40 text-purple-500": isOnPath(url),
            }
          )}
        >
          <span className="flex w-3/4 items-center justify-center group-hover:justify-start">
            <Icon size={27} className="shrink-0" />
            <span className="ml-2 hidden whitespace-nowrap font-medium text-zinc-100 group-hover:block">
              {name}
            </span>
          </span>
        </a>
      ))}
    </nav>
  );
}
