"use client";

import { useSearchParams, usePathname } from "next/navigation";
import css from "./NoteForm.module.css";
import type { NoteTag } from "@/types/note";
import { useNoteStore } from "@/lib/store/noteStore";
import { createNoteAction } from "@/app/notes/action/create/actions";

const TAGS: NoteTag[] = ["Important", "Todo", "Later"];

export default function NoteForm() {
  const params = useSearchParams();
  const pathname = usePathname();
  const from = params.get("from") || pathname || "/notes/filter/All";

  const draft = useNoteStore((s) => s.draft);
  const setDraft = useNoteStore((s) => s.setDraft);

  return (
    <form className={css.form}>
      <input type="hidden" name="from" value={from} />
      <label className={css.label}>
        <span>Title</span>
        <input
          className={css.input}
          name="title"
          value={draft.title}
          onChange={(e) => setDraft({ title: e.target.value })}
          placeholder="Enter title"
        />
      </label>

      <label className={css.label}>
        <span>Content</span>
        <textarea
          className={css.textarea}
          name="content"
          value={draft.content}
          onChange={(e) => setDraft({ content: e.target.value })}
          placeholder="Write your note..."
          rows={8}
        />
      </label>

      <label className={css.label}>
        <span>Tag</span>
        <select
          className={css.select}
          name="tag"
          value={draft.tag}
          onChange={(e) => setDraft({ tag: e.target.value as NoteTag })}
        >
          {TAGS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <div className={css.actions}>
        <button className={css.primary} formAction={createNoteAction}>
          Save
        </button>
        <button
          className={css.secondary}
          type="button"
          onClick={() => {
            if (typeof window !== "undefined") window.history.back();
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
