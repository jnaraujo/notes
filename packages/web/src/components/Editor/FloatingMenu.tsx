import * as Popover from "@radix-ui/react-popover";
import { isNodeSelection, posToDOMRect } from "@tiptap/core";
import type { Editor } from "@tiptap/react";
import {
  Bold,
  Heading,
  Heading2,
  List,
  MessageSquare,
  Type,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export default function FloatingMenu({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentIndex(0);
  }, [open]);

  useEffect(() => {
    if (open) {
      const items = contentRef.current?.querySelectorAll("button");
      if (items) {
        items[currentIndex]?.focus();
      }
    }
  }, [currentIndex, open]);

  const handleIndexChange = useCallback((type: "next" | "prev") => {
    const BUTTONS_COUNT =
      contentRef.current?.querySelectorAll("button").length || 0;

    setCurrentIndex((prev) => {
      if (type === "next") {
        if (prev < BUTTONS_COUNT - 1) {
          return prev + 1;
        }
        return prev;
      } else {
        if (prev > 0) {
          return prev - 1;
        }
        return prev;
      }
    });
  }, []);

  useEffect(() => {
    function handle(event: KeyboardEvent) {
      switch (event.code) {
        case "Tab":
          event.preventDefault();
          setOpen((prev) => !prev);
          break;
        case "Enter":
          const items = contentRef.current?.querySelectorAll("button");
          if (items) {
            items[currentIndex]?.click();
          }
          setOpen(false);
          break;
        case "ArrowDown":
          handleIndexChange("next");
          break;
        case "ArrowUp":
          handleIndexChange("prev");
          break;
      }
    }
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [currentIndex, handleIndexChange]);

  function handleClose() {
    setOpen(false);
  }

  console.log(getPosition(editor).getBoundingClientRect().top);

  return (
    <Popover.Root open={open} defaultOpen={false}>
      <Popover.Anchor asChild>
        <div
          className="fixed z-10"
          style={{
            top: getPosition(editor).getBoundingClientRect().top,
            left: getPosition(editor).getBoundingClientRect().left,
          }}
        />
      </Popover.Anchor>
      <Popover.Portal>
        <Popover.Content
          align="center"
          sideOffset={25}
          side="bottom"
          onEscapeKeyDown={handleClose}
          onPointerDownOutside={handleClose}
        >
          <div
            className="flex w-48 flex-col gap-2 rounded-md border border-zinc-600 bg-zinc-950 p-2 shadow-md"
            ref={contentRef}
          >
            <Item
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 1 }).run();
              }}
            >
              <Heading size={20} />
              Título
            </Item>
            <Item
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 2 }).run();
              }}
            >
              <Heading2 size={20} />
              Subtítulo
            </Item>
            <Item
              onClick={() => {
                editor.chain().focus().setParagraph().run();
              }}
            >
              <Type size={20} />
              Parágrafo
            </Item>
            <Item
              onClick={() => {
                editor.chain().focus().toggleBold().run();
              }}
            >
              <Bold size={20} />
              Bold
            </Item>
            <Item
              onClick={() => {
                editor.chain().focus().toggleBulletList().run();
              }}
            >
              <List size={20} />
              Lista
            </Item>
            <Item
              onClick={() => {
                editor.chain().focus().toggleBlockquote().run();
              }}
            >
              <MessageSquare size={20} />
              Citação
            </Item>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function Item({ onClick, children }: any) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-4 rounded-sm px-2 py-2 text-sm text-zinc-100 hover:bg-zinc-800 hover:text-zinc-50"
    >
      {children}
    </button>
  );
}

function getPosition(editor: Editor) {
  const { ranges } = editor.state.selection;

  const from = Math.min(...ranges.map((range) => range.$from.pos));
  const to = Math.max(...ranges.map((range) => range.$to.pos));

  return {
    getBoundingClientRect: () => {
      if (isNodeSelection(editor.state.selection)) {
        const node = editor.view.nodeDOM(from) as HTMLElement;

        if (node) {
          return node.getBoundingClientRect();
        }
      }

      return posToDOMRect(editor.view, from, to);
    },
  };
}
