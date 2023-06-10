import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";

import styles from "./style.module.css";

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
    placeholder: "Pressione 'Tab' para abrir o menu de comandos...",
    emptyNodeClass: styles.emptyNodeClass,
  }),
];