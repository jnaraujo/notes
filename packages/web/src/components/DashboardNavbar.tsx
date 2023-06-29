"use client";

import { Home, LogOut, LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import { User } from "@/@types/user";
import Tooltip from "./ui/Tooltip";

const MENU_LINKS = [
  {
    name: "Dashboard",
    icon: Home,
    url: "/dashboard",
    isOnPath: (path: string) => path === "/dashboard",
  },
];

interface Props {
  user: User;
}

export default function DashboardNavbar({ user }: Props) {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-full flex-col items-center justify-between">
      <div className="w-full p-4 py-8">
        <Link href="/dashboard" className="text-xl font-medium">
          📝 AweNotes
        </Link>
      </div>
      <nav className="flex w-full flex-col items-center justify-center gap-2 justify-self-center overflow-hidden">
        {MENU_LINKS.map(({ name, url, icon: Icon, isOnPath }) => (
          <Item
            key={name}
            name={name}
            Icon={Icon}
            highlight={isOnPath(pathname)}
            url={url}
          />
        ))}
      </nav>
      <div className="flex w-full items-center justify-between p-4 text-zinc-400">
        <span className="text-sm capitalize">{user?.name}</span>
        <Tooltip text="Sair">
          <button type="button" className="hover:text-zinc-300">
            <LogOut size={24} />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}

function Item({
  name,
  Icon,
  highlight,
  url,
}: {
  name: string;
  Icon: LucideIcon;
  highlight: boolean;
  url: string;
}) {
  return (
    <Link
      href={url}
      className={clsx(
        "flex w-11/12 items-center justify-center rounded-md py-2 text-zinc-500 transition-colors duration-200 hover:bg-zinc-700/40 hover:text-zinc-100",
        {
          "bg-zinc-700/40 text-zinc-300": highlight,
        }
      )}
    >
      <span className="flex w-3/4 items-center justify-start">
        <Icon size={27} className="shrink-0" />
        <span className="ml-2 whitespace-nowrap font-medium text-zinc-300">
          {name}
        </span>
      </span>
    </Link>
  );
}
