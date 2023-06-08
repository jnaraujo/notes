import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  asChild?: boolean;
}
export default function Button({
  children,
  className,
  isLoading,
  asChild,
  loadingText = "Carregando...",
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";
  return (
    <Component
      disabled={isLoading}
      className={clsx(
        "flex h-10 items-center justify-center rounded-md bg-zinc-50 from-zinc-300 to-zinc-50 p-2 font-bold text-zinc-900 hover:bg-gradient-to-tr",
        {
          "cursor-not-allowed opacity-50": isLoading,
        },
        className
      )}
      {...props}
    >
      {isLoading ? loadingText : children}
    </Component>
  );
}
