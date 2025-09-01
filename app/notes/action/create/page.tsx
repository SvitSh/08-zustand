import css from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';

export const metadata = {
  title: 'Create note — NoteHub',
  description: 'Create a new note in NoteHub',
  openGraph: {
    title: 'Create note — NoteHub',
    description: 'Create a new note in NoteHub',
    url: 'https://notehub.app/notes/action/create',
    images: ['/notehub-og-meta.jpg'],
    type: 'website',
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
