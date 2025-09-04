import type { Metadata } from "next";
import css from "./NoteDetails.module.css";
import NoteDetails from "./NoteDetails.client";
import { fetchNote } from "@/lib/api";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    const note = await fetchNote(id);
    const title = `${note.title} — NoteHub`;
    const description =
      note.content.length > 140
        ? note.content.slice(0, 137) + "…"
        : note.content;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `/notes/${id}`,
        images: [
          { url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" },
        ],
      },
    };
  } catch {
    return {
      title: "Note not found — NoteHub",
      description: "The requested note does not exist.",
      openGraph: {
        title: "Note not found — NoteHub",
        description: "The requested note does not exist.",
        url: `/notes/${id}`,
        images: [
          { url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" },
        ],
      },
    };
  }
}

export default async function NotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <NoteDetails />
      </div>
    </main>
  );
}
