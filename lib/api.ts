import axios from "axios";
import type { Note, NoteTag } from "@/types/note";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "").trim();
const TOKEN = (process.env.NEXT_PUBLIC_NOTEHUB_TOKEN || "").trim();

const client = axios.create({
  baseURL: API_URL,
  headers: TOKEN ? { Authorization: "Bearer " + TOKEN } : undefined,
});

export interface FetchNotesOptions {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag | "All";
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search,
  tag,
}: FetchNotesOptions): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page, perPage };
  if (search) params.search = search;

  // API валидирует tag, и наших "Important" / "Later" там нет.
  // Безопасно передаём только "Todo"; для остальных просто не передаём tag.
  if (tag === "Todo") {
    params.tag = "Todo";
  }

  const { data } = await client.get("/notes", { params });
  return data as FetchNotesResponse;
};

export const fetchNote = async (id: string): Promise<Note> => {
  const { data } = await client.get("/notes/" + id);
  return data as Note;
};

// Алиас для старых импортов
export { fetchNote as fetchNoteById };

export interface CreateNoteDto {
  title: string;
  content: string;
  tag: NoteTag; // UI-тег
}

// Любой не-"Todo" мапим в "Todo", чтобы пройти валидацию API.
const mapUiTagToApi = (
  tag: NoteTag
): "Todo" | "Work" | "Personal" | "Meeting" | "Shopping" => {
  return tag === "Todo" ? "Todo" : "Todo";
};

export const createNote = async (dto: CreateNoteDto): Promise<Note> => {
  const title = (dto.title || "").trim();
  const content = (dto.content || "").trim();
  const apiTag = mapUiTagToApi(dto.tag);

  try {
    const { data } = await client.post(
      "/notes",
      { title, content, tag: apiTag },
      { headers: { "Content-Type": "application/json" } }
    );
    return data as Note;
  } catch (err: any) {
    const msg =
      err?.response?.data?.message || err?.message || "Failed to create note";
    throw new Error(msg);
  }
};

export const deleteNote = async (id: string): Promise<void> => {
  await client.delete("/notes/" + id);
};
