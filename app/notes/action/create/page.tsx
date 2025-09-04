import type { Metadata } from "next";
import css from "./CreateNote.module.css";
import ClientOnly from "@/components/ClientOnly/ClientOnly";
import NoteForm from "@/components/NoteForm/NoteForm";

export const metadata: Metadata = {
  title: "Create note — NoteHub",
  description: "Create a new note with autosave draft.",
  openGraph: {
    title: "Create note — NoteHub",
    description: "Create a new note with autosave draft.",
    url: "/notes/action/create",
    images: [
      { url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <ClientOnly>
          <NoteForm />
        </ClientOnly>
      </div>
    </main>
  );
}
