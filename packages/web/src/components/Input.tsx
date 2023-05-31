interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function ({ className, ...props }: InputProps) {
  return (
    <input
      className={
        "flex-1 rounded-md border border-gray-400 p-2 outline-1 outline-black " +
        className
      }
      {...props}
    />
  );
}
