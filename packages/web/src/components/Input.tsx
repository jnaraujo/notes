
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export default function ({
  className,
  ...props
}: InputProps) {
  return <input className={"flex-1 border border-gray-400 rounded-md p-2 outline-black outline-1 " + className} {...props} />
}