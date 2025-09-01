'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { NoteTag } from '@/types/note';

export type Draft = {
  title: string;
  content: string;
  tag: NoteTag;
};

export const initialDraft: Draft = {
  title: '',
  content: '',
  tag: 'Todo',
};

type NoteStore = {
  draft: Draft;
  setDraft: (update: Partial<Draft>) => void;
  clearDraft: () => void;
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (update) =>
        set((state) => ({ draft: { ...state.draft, ...update } })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'notehub-draft', // key in localStorage
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
