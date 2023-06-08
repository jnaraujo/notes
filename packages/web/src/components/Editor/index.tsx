"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { extensions } from "./extensions";

export default function Editor() {
  const editor = useEditor({
    extensions: extensions,
    editorProps: {
      attributes: {
        class: "outline-none space-y-2",
      },
    },
    content: `
      <h1>Exemplo de h1</h1>
      <h2>Exemplo de h2</h2>
      <h3>Exemplo de h3</h3>
      <p>Exemplo de parágrafo</p>

      <ul>
        <li>Exemplo de lista ul</li>
        <li>Exemplo de lista ul</li>
      </ul>

      <ol>
        <li>Exemplo de lista li</li>
        <li>Exemplo de lista li</li>
      </ol>

      <blockquote>Exemplo de citação</blockquote>

      <p>Exemplo de link: <a href="#">Google</a></p>

      <p>Exemplo de imagem: <img src="https://picsum.photos/200/300" alt="Imagem de exemplo" /></p>

      <p>Exemplo de código:</p>
      <code>console.log("Hello world!")</code>

    `,
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
