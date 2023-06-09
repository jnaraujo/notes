import { longDateFormat } from "@/helpers/date";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import Modal from "./ui/Modal";
import { useState } from "react";
import { deleteNote } from "@/lib/notes";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";

interface NoteProps {
  title: string;
  createdAt: Date;
  id: string;
}

export default function Note({ title, createdAt, id }: NoteProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { refetch } = useQuery({
    queryKey: ["latest-notes"],
  });

  function onDelete() {
    setOpen(true);
  }

  async function onConfirm() {
    setIsDeleting(true);
    deleteNote(Cookies.get("token") as string, id)
      .then(() => {
        refetch();
      })
      .finally(() => {
        setOpen(false);
        setIsDeleting(false);
      });
  }

  return (
    <>
      <div className="group flex h-20 w-full cursor-pointer items-center justify-between rounded-md border border-zinc-500 px-4 shadow shadow-transparent transition-all duration-300 hover:border-zinc-200 hover:shadow-zinc-400">
        <Link href={`/dashboard/notes/${id}`} className="flex-1">
          <h3 className="line-clamp-2 font-semibold text-zinc-200 transition-colors">
            {title}
          </h3>
          <p className="line-clamp-3 text-sm text-zinc-400">
            {longDateFormat(createdAt)}
          </p>
        </Link>
        <div className="flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <Trash2
            onClick={onDelete}
            className="transition-duration-300 text-red-700 transition-colors hover:text-red-700/80"
          />
        </div>
      </div>
      {open && (
        <Modal
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          onConfirm={onConfirm}
          title="Tem certeza que deseja excluir essa nota?"
          description="Essa ação não pode ser desfeita."
          primaryButtonText={isDeleting ? "Excluindo..." : "Sim, excluir nota"}
          secondaryButtonText="Cancelar"
          type="danger"
          primaryButtonDisabled={isDeleting}
          secondaryButtonDisabled={isDeleting}
        />
      )}
    </>
  );
}
