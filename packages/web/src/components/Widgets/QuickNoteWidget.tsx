import Input from "../Input";
import Button from "../ui/Button";

export default function QuickNoteWidget() {
  return (
    <div className="flex flex-1 flex-col gap-3 p-6 md:max-w-md bg-zinc-200/50 shadow-md rounded-md">
      <h2 className="text-xl font-bold text-zinc-600">
        Crie uma nota rápida:
      </h2>
      <form className="space-y-2">
        <Input name="title" placeholder="Título" />
        <textarea className="w-full rounded-md p-2 resize-none" placeholder="Conteúdo" />

        <Button type="submit">Criar nota</Button>
      </form>
    </div>
  )
}