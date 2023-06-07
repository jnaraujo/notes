import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
}
export default function Button({ children, className, isLoading, loadingText, ...props }: ButtonProps) {
  loadingText = loadingText || "Carregando...";

  return (
    <button
      disabled={isLoading}
      className={clsx(
        "w-full rounded-md bg-transparent border border-zinc-500 p-2 text-white transition-all duration-300 focus:border-zinc-400 focus:outline-none hover:border-zinc-400 hover:bg-gradient-to-tr from-zinc-900 to-zinc-950",
        {
          "opacity-50 cursor-not-allowed": isLoading,
        },
        className
      )}
      {...props}
    >
      {
        isLoading ? loadingText : children
      }
    </button>
  );
}
