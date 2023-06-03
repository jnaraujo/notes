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
        "w-full rounded-md bg-zinc-900 p-2 text-white transition hover:bg-zinc-700 focus:outline-zinc-400",
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
