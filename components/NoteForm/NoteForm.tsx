'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import css from './NoteForm.module.css';
import type { NoteTag } from '@/types/note';
import { createNoteAction } from '@/app/notes/action/create/actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={css.submit}>
      {pending ? 'Creating…' : 'Create'}
    </button>
  );
}

const TAGS: NoteTag[] = ['Important', 'Todo', 'Later'];

export default function NoteForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState<NoteTag>('Todo');

  return (
    <form className={css.form} action={createNoteAction}>
      <label className={css.label}>
        Title
        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={css.input}
        />
      </label>

      <label className={css.label}>
        Content
        <textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={css.textarea}
        />
      </label>

      <label className={css.label}>
        Tag
        <select
          name="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value as NoteTag)}
          className={css.select}
        >
          {TAGS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <div className={css.actions}>
        <SubmitButton />
        <button
          type="button"
          onClick={() => {
            if (typeof window !== 'undefined') window.history.back();
          }}
          className={css.cancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
