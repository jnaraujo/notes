import Editor from "@/components/Editor";

export default function New() {
  return (
    <div>
      <form action="" className="space-y-2">
        <input
          type="text"
          className="h-10 bg-transparent text-2xl font-bold text-zinc-300 placeholder-zinc-600 outline-none"
          placeholder="Era uma vez..."
        />
        <Editor />
      </form>
    </div>
  );
}
