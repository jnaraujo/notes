"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { extensions } from "./extensions";

interface Props {
  defaultValue?: string;
}
export default function Editor({ defaultValue = "" }: Props) {
  const editor = useEditor({
    extensions: extensions,
    editorProps: {
      attributes: {
        class: "outline-none space-y-2",
      },
    },
    content: defaultValue,
  });

  return (
    <div className="min-h-[600px] overflow-hidden rounded-lg border border-zinc-500 p-4">
      <EditorContent
        className="w-full appearance-none bg-transparent"
        editor={editor}
      />
    </div>
  );
}
