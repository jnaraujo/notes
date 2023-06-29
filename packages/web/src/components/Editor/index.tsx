"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { extensions } from "./extensions";
import { Loader2 } from "lucide-react";
import FloatingMenu from "./FloatingMenu";
import style from "@/styles/note.module.css";

interface Props {
  defaultValue?: string;
  onUpdate?: (html: string) => void;
}
export default function Editor({ defaultValue = "", onUpdate }: Props) {
  const editor = useEditor({
    extensions: extensions,
    editorProps: {
      attributes: {
        class: "outline-none space-y-2",
      },
    },
    onUpdate: ({ editor }) => {
      onUpdate?.(editor.getHTML());
    },
    content: defaultValue,
  });

  return (
    <div className="overflow-hidden rounded-lg">
      {!editor && (
        <div className="flex h-40 flex-col items-center justify-center gap-2 text-zinc-600">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}
      {editor && <FloatingMenu editor={editor} />}
      <EditorContent
        className={`w-full appearance-none bg-transparent ${style.content}`}
        editor={editor}
      />
    </div>
  );
}
