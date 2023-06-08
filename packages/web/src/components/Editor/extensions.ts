import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
import { mergeAttributes } from "@tiptap/core";
import Image from "@tiptap/extension-image";
import FloatingMenu from "@tiptap/extension-floating-menu";

type Levels = 1 | 2 | 3;
const classes: Record<Levels, string> = {
  1: "text-3xl font-bold",
  2: "text-2xl font-bold",
  3: "text-xl font-bold",
};

export const extensions = [
  StarterKit.configure({
    history: {
      depth: 25,
    },
    paragraph: {
      HTMLAttributes: {
        class: "text-lg font-medium text-zinc-300",
      },
    },
    code: {
      HTMLAttributes: {
        class:
          "block font-mono text-sm text-zinc-300 bg-zinc-800 p-2 rounded-md w-full",
      },
    },
  }),
  FloatingMenu.configure({}),
  Image.configure({
    inline: true,
    HTMLAttributes: {
      class: "rounded-md max-h-[300px]",
    },
  }),
  Heading.configure({
    levels: [1, 2, 3],
  }).extend({
    renderHTML({ node, HTMLAttributes }) {
      const hasLevel = this.options.levels.includes(node.attrs.level);
      const level: Levels = hasLevel
        ? node.attrs.level
        : this.options.levels[0];

      return [
        `h${level}`,
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          class: `${classes[level]}`,
        }),
        0,
      ];
    },
  }),
  Placeholder.configure({
    placeholder: "Escreva uma nota...",
    emptyNodeClass:
      "first:before:text-zinc-600 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none first:before:h-0",
  }),
];
