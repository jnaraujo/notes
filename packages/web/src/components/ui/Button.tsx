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
        "w-full rounded-md bg-zinc-50 p-2 text-zinc-900 font-bold hover:bg-gradient-to-tr from-zinc-300 to-zinc-50",
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
