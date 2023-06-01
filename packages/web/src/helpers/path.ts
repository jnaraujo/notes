import { usePathname } from "next/navigation";

export function isOnPath(path: string) {
  const pathname = usePathname();
  return pathname === path;
}
