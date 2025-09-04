"use server";

import { createNote } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { NoteTag } from "@/types/note";

export async function createNoteAction(formData: FormData) {
  const dto = {
    title: String(formData.get("title") ?? ""),
    content: String(formData.get("content") ?? ""),
    tag: (formData.get("tag") as NoteTag) ?? "Todo",
  };

  try {
    await createNote(dto);
  } catch (err: any) {
    const status = err?.response?.status ?? err?.status;
    if (status === 429) {
      // слишком много запросов
      throw new Error("Слишком много запросов. Попробуй ещё раз чуть позже.");
    }
    if (status === 400) {
      // на всякий случай подсказка по тегам
      throw new Error("API принимает только теги 'Todo' или 'Important'.");
    }
    // пробрасываем остальные
    throw err;
  }

  revalidatePath("/notes/filter/All");
  redirect("/notes/filter/All");
}
