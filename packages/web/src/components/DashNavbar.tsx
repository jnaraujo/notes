"use client";

import { Home, Feather } from "lucide-react";
import cx from "classnames";
import { isOnPath } from "@/helpers/path";

const MENU_LINKS = [
  {
    name: 'Dashboard',
    icon: Home,
    url: '/dashboard',
  },
  {
    name: 'Criar nota',
    icon: Feather,
    url: '/notes/new',
  },
]


export default function () {
  return (
    <nav className="flex h-full flex-col justify-center items-center gap-2">
      {
        MENU_LINKS.map(({ name, url, icon: Icon }) => (
          <a id={name} href={url} className={
            cx("flex w-11/12 items-center justify-center py-2 hover:bg-zinc-700/40 hover:text-purple-500 transition-colors duration-200 rounded-full", {
              "text-purple-500 bg-zinc-700/40": isOnPath(url),
            })
          }>
            <span className="flex items-center justify-center group-hover:justify-start w-3/4">
              <Icon size={27} className="shrink-0" />
              <span className="hidden group-hover:block ml-2 font-medium text-zinc-100 whitespace-nowrap">
                {name}
              </span>
            </span>
          </a>
        ))
      }
    </nav>
  )
}