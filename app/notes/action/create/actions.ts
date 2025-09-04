"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createNote } from "@/lib/api";

/**
 * Server action: creates a note via backend API and redirects back.
 * Expects fields: title, content, tag, from (optional).
 */
export async function createNoteAction(formData: FormData) {
  const title = String(formData.get("title") ?? "");
  const content = String(formData.get("content") ?? "");
  const tag = String(formData.get("tag") ?? "Todo");
  const backTo = String(formData.get("from") ?? "/notes/filter/All");

  await createNote({ title, content, tag: tag as any });

  // Revalidate notes pages and redirect with a query flag to clear draft client-side
  revalidatePath("/notes", "layout");
  const url = new URL(backTo, "https://local.host"); // base won't be used
  url.searchParams.set("created", "1");
  redirect(url.pathname + "?" + url.searchParams.toString());
}
