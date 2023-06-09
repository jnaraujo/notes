import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";

export const extensions = [
  StarterKit.configure({
    history: {
      depth: 25,
    },
  }),
  Image.configure({
    inline: true,
  }),
  Heading.configure({
    levels: [1, 2, 3],
  }),
  Placeholder.configure({
    placeholder: "Escreva uma nota...",
    emptyNodeClass:
      "first:before:text-zinc-600 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none first:before:h-0",
  }),
];
