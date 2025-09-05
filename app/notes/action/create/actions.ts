"use server";

import { createNote } from "@/lib/api";
import type { NoteTag } from "@/types/note";

type ActionState =
  | { ok: true; noteId: string }
  | { ok: false; error: string | null };

export async function createNoteAction(
  _prevState: ActionState | undefined,
  formData: FormData
): Promise<ActionState> {
  const title = String(formData.get("title") || "");
  const content = String(formData.get("content") || "");
  const tag = (formData.get("tag") as NoteTag) || "Todo";

  try {
    const note = await createNote({ title, content, tag });
    return { ok: true, noteId: note.id };
  } catch (err: any) {
    const msg =
      err?.response?.data?.message || err?.message || "Failed to create note";
    return { ok: false, error: msg };
  }
}
