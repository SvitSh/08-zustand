import css from "./NotesFilterLayout.module.css";

export default function NotesFilterLayout({
  children,
  sidebar,
  // Next передаёт сюда параллельный слот @modal, но мы его не выводим.
  // Переименовываем в _modal, чтобы не было warning'а об неиспользуемой переменной.
  modal: _modal,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  modal: React.ReactNode; // важно: объявлен, но не используется
}) {
  return (
    <div className={css.layout}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <section className={css.content}>{children}</section>
    </div>
  );
}
