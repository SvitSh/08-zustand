"use client";

import { useEffect } from "react";
import css from "./NoteForm.module.css";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { createNoteAction } from "@/app/notes/action/create/actions";
import { useNoteStore } from "@/lib/store/noteStore";
import type { NoteTag } from "@/types/note";

type ActionState =
  | { ok: true; noteId: string }
  | { ok: false; error: string | null };

const initialState: ActionState = { ok: false, error: null };

export default function NoteForm() {
  const { draft, setDraft, clearDraft } = useNoteStore((s) => ({
    draft: s.draft,
    setDraft: s.setDraft,
    clearDraft: s.clearDraft,
  }));

  const router = useRouter();
  const params = useSearchParams();
  const backTo = params.get("from") ?? "/notes/filter/All";

  const queryClient = useQueryClient();
  const [state, formAction] = useFormState(createNoteAction, initialState);

  useEffect(() => {
    if (state?.ok) {
      // Инвалидуем все запросы, начинающиеся с 'notes'
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.push(backTo);
    }
  }, [state, queryClient, clearDraft, router, backTo]);

  return (
    <form action={formAction} className={css.form}>
      <div className={css.field}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          required
          value={draft.title}
          onChange={(e) => setDraft({ title: e.target.value })}
        />
      </div>

      <div className={css.field}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          required
          value={draft.content}
          onChange={(e) => setDraft({ content: e.target.value })}
        />
      </div>

      <div className={css.field}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          value={draft.tag}
          onChange={(e) => setDraft({ tag: e.target.value as NoteTag })}
        >
          <option value="Todo">Todo</option>
          <option value="Important">Important</option>
          <option value="Later">Later</option>
        </select>
      </div>

      {!state.ok && state.error && <p className={css.error}>{state.error}</p>}

      <FormButtons onCancel={() => router.back()} />
    </form>
  );
}

function FormButtons({ onCancel }: { onCancel: () => void }) {
  const { pending } = useFormStatus();
  return (
    <div className={css.actions}>
      <button type="submit" className={css.submit} disabled={pending}>
        {pending ? "Creating..." : "Create"}
      </button>
      <button
        type="button"
        className={css.cancel}
        onClick={onCancel}
        disabled={pending}
      >
        Cancel
      </button>
    </div>
  );
}
