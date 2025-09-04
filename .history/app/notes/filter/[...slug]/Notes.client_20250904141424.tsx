"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import css from "./NotesPage.module.css";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";

import { fetchNotes, type FetchNotesResponse } from "@/lib/api";
import { useNoteStore } from "@/lib/store/noteStore";
import type { NoteTag } from "@/types/note";

const PER_PAGE = 12;

type Props = {
  params: { slug?: string[] };
  searchParams?: { q?: string; page?: string };
};

export default function NotesClient({ params, searchParams }: Props) {
  // ✅ Хуки строго внутри компонента
  const pathname = usePathname();
  const sp = useSearchParams();

  // очистка драфта после успешного создания (?created=1)
  const clearDraft = useNoteStore((s) => s.clearDraft);
  useEffect(() => {
    if (sp?.get("created") === "1") clearDraft();
  }, [sp, clearDraft]);

  const tagFromUrl = params?.slug?.[0] ?? "All";
  const tag: NoteTag | "All" = (tagFromUrl as any) || "All";

  const initialSearch = searchParams?.q ?? "";
  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch] = useDebounce(search, 400);

  const page = Math.max(1, Number(searchParams?.page ?? "1"));
  const effectiveTag: NoteTag | undefined =
    tag === "All" ? undefined : (tag as NoteTag);

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", page, PER_PAGE, debouncedSearch, tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        search: debouncedSearch,
        tag: effectiveTag,
      }),
    keepPreviousData: true,
  });

  const totalPages = data ? Math.max(1, Math.ceil(data.total / PER_PAGE)) : 1;

  return (
    <div className={css.wrapper}>
      <header className={css.header}>
        <SearchBox value={search} onChange={setSearch} />
        {/* Передаём from, чтобы по Save вернуться обратно */}
        <Link
          className={css.btn}
          href={`/notes/action/create?from=${encodeURIComponent(
            pathname || "/notes/filter/All"
          )}`}
        >
          Create note +
        </Link>
      </header>

      {isLoading && <p>Loading, please wait...</p>}
      {isError && <p>Could not fetch the list of notes.</p>}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

      {data && data.notes.length > 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          basePath={`/notes/filter/${tag}`}
          q={debouncedSearch}
        />
      )}
    </div>
  );
}
