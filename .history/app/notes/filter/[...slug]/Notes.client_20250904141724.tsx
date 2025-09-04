"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
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
  /** из SSR-страницы передаём 'All' или конкретный тег */
  tag: NoteTag | "All";
};

export default function NotesClient({ tag }: Props) {
  const pathname = usePathname();
  const sp = useSearchParams();

  // очистка драфта после успешного создания (?created=1)
  const clearDraft = useNoteStore((s) => s.clearDraft);
  useEffect(() => {
    if (sp?.get("created") === "1") clearDraft();
  }, [sp, clearDraft]);

  // Поиск с дебаунсом
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 400);

  // Локальная пагинация (страницу не пишем в URL)
  const [page, setPage] = useState(1);

  // Приводим тег к типу API: undefined = все
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
    // v5: вместо keepPreviousData: true — placeholderData: keepPreviousData
    placeholderData: keepPreviousData,
  });

  const pageCount = data?.totalPages ?? 1;

  return (
    <div className={css.wrapper}>
      <header className={css.header}>
        {/* ✅ SearchBox ждёт onSearch, не onChange */}
        <SearchBox value={search} onSearch={setSearch} />
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

      {/* ✅ NoteList ждёт props.notes */}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

      {/* ✅ Pagination: currentPage/pageCount/onPageChange */}
      {pageCount > 1 && (
        <Pagination
          currentPage={page}
          pageCount={pageCount}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}
    </div>
  );
}
