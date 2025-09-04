import type { Metadata } from "next";
import NotesClient from "./Notes.client";
import type { NoteTag } from "@/types/note";

function normalizeTag(raw: string | undefined): "All" | NoteTag {
  if (raw === "Todo" || raw === "Important") return raw;
  if (raw === "All" || raw === undefined) return "All";
  return "All";
}

export async function generateMetadata({
  params,
}: {
  params: { slug?: string[] };
}): Promise<Metadata> {
  const raw = params.slug?.[0];
  const tag = normalizeTag(raw);

  const title = tag === "All" ? "Все заметки — NoteHub" : `Заметки — ${tag}`;
  const description =
    tag === "All" ? "Список всех заметок" : `Список заметок с тегом ${tag}`;
  const url = `/notes/filter/${encodeURIComponent(tag)}`;

  return {
    title,
    description,
    openGraph: { title, description, url, images: ["/notehub-og-meta.jpg"] },
    twitter: { card: "summary_large_image" },
  };
}

export default function NotesFilterPage({
  params,
}: {
  params: { slug?: string[] };
}) {
  const tag = normalizeTag(params.slug?.[0]);
  return <NotesClient tag={tag} />;
}
