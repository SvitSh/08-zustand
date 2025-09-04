import type { Metadata } from "next";
import css from "./NotFound.module.css";

export const metadata: Metadata = {
  title: "404 — Страница не найдена | NoteHub",
  description: "Такой страницы не существует.",
  openGraph: {
    title: "404 — Страница не найдена | NoteHub",
    description: "Такой страницы не существует.",
    url: "/not-found",
    images: ["/notehub-og-meta.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

export default function NotFound() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>404 - Страница не найдена</h1>
        <p>Извините, страница, которую вы ищете, не существует.</p>
      </div>
    </main>
  );
}
