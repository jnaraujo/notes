import Input from "../Input";
import Button from "../ui/Button";

export default function QuickNoteWidget() {
  return (
    <div className="flex flex-1 flex-col gap-3 rounded-md bg-zinc-200/50 p-6 shadow-md md:max-w-md">
      <h2 className="text-xl font-bold text-zinc-600">Crie uma nota rápida:</h2>
      <form className="space-y-2">
        <Input name="title" placeholder="Título" />
        <textarea
          className="w-full resize-none rounded-md p-2"
          placeholder="Conteúdo"
        />

        <Button type="submit">Criar nota</Button>
      </form>
    </div>
  );
}
