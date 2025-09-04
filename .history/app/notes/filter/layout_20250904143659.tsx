import type { ReactNode } from "react";
import css from "./NotesFilterLayout.module.css";

type Props = {
  children: ReactNode;
  sidebar: ReactNode; // параллельный слот @sidebar
  modal: ReactNode; // параллельный слот @modal (не рендерим в этом layout)
};

export default function NotesFilterLayout({
  children,
  sidebar,
  modal: _modal,
}: Props) {
  return (
    <div className={css.layout}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <section className={css.content}>{children}</section>
    </div>
  );
}
