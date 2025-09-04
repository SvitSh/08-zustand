"use server";

import { createNote } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { NoteTag } from "@/types/note";

export type CreateState = { error?: string } | undefined;

export async function createNoteAction(
  _prevState: CreateState,
  formData: FormData
): Promise<CreateState> {
  const title = String(formData.get("title") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const tag = String(formData.get("tag") || "Todo") as NoteTag;

  if (!title || !content) {
    return { error: "Заполни заголовок и текст заметки." };
  }

  try {
    await createNote({ title, content, tag });
  } catch (e: any) {
    return { error: e?.message || "Не удалось создать заметку" };
  }

  revalidatePath("/notes/filter");
  redirect("/notes/filter/" + (tag === "Important" ? "Important" : "Todo"));
}
