"use client";

import css from "./NoteForm.module.css";
import { useFormState } from "react-dom";
import {
  createNoteAction,
  type CreateState,
} from "@/app/notes/action/create/actions";
import type { NoteTag } from "@/types/note";

const TAGS: NoteTag[] = ["Todo", "Important", "Later"];

export default function NoteForm() {
  const [state, formAction] = useFormState<CreateState, FormData>(
    createNoteAction,
    undefined
  );

  return (
    <form className={css.form} action={formAction}>
      <label className={css.label}>
        <span>Title</span>
        <input name="title" required className={css.input} />
      </label>

      <label className={css.label}>
        <span>Content</span>
        <textarea name="content" required rows={5} className={css.textarea} />
      </label>

      <label className={css.label}>
        <span>Tag</span>
        <select name="tag" defaultValue="Todo" className={css.select}>
          {TAGS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      {state?.error && <p className={css.error}>{state.error}</p>}

      <div className={css.actions}>
        <button type="submit" className={css.submit}>
          Create
        </button>
        <button
          type="button"
          className={css.cancel}
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
