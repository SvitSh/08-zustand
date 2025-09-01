'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import css from './NoteForm.module.css';
import { createNote } from '@/lib/api';
import type { NoteTag } from '@/types/note';
import { useNoteStore, initialDraft } from '@/lib/store/noteStore';

const TAGS: NoteTag[] = ['Important', 'Todo', 'Later'];

export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target as { name: string; value: string };
    if (name === 'title' || name === 'content' || name === 'tag') {
      setDraft({ [name]: value } as any);
    }
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await createNote({
        title: draft.title.trim(),
        content: draft.content.trim(),
        tag: draft.tag,
      });
      clearDraft();
      router.back();
    } catch (err: any) {
      setError('Failed to create note.');
      setIsSubmitting(false);
    }
  }

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.field}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={draft.title}
          onChange={handleChange}
          placeholder="Enter a note title"
          required
        />
      </div>

      <div className={css.field}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={6}
          value={draft.content}
          onChange={handleChange}
          placeholder="Write your note..."
          required
        />
      </div>

      <div className={css.field}>
        <label htmlFor="tag">Tag</label>
        <select id="tag" name="tag" value={draft.tag} onChange={handleChange}>
          {TAGS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {error && <p className={css.error}>{error}</p>}

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelBtn}
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitBtn} disabled={isSubmitting}>
          {isSubmitting ? 'Creating…' : 'Create note'}
        </button>
      </div>
    </form>
  );
}
