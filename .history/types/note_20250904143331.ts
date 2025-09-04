export type NoteTag = "Important" | "Todo" | "Later";

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}
