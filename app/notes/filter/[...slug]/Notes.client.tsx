'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import Link from 'next/link';
import css from './NotesPage.module.css';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import { fetchNotes, type FetchNotesResponse } from '@/lib/api';
import type { NoteTag } from '@/types/note';

const PER_PAGE = 12;

type Props = {
  tag?: NoteTag | 'All';
};

export default function NotesClient({ tag = 'All' }: Props) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(search, 500);

  const effectiveTag: NoteTag | undefined = tag === 'All' ? undefined : (tag as NoteTag);

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', page, PER_PAGE, debouncedSearch, tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        search: debouncedSearch,
        tag: effectiveTag,
      }),
    keepPreviousData: true,
  });

  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.wrapper}>
      <header className={css.header}>
        <SearchBox value={search} onChange={setSearch} />
        <Link className={css.btn} href="/notes/action/create">
          Create note +
        </Link>
      </header>

      {isLoading && <p>Loading, please wait...</p>}
      {isError && <p>Could not fetch the list of notes.</p>}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
