import cx from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cx(
        "w-full rounded-md bg-zinc-900 p-2 text-white transition hover:bg-zinc-700 focus:outline-zinc-400",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
