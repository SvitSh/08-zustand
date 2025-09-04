import css from "./NotFound.module.css";

export const metadata = {
  title: "404 — Page not found | NoteHub",
  description: "Sorry, the page you are looking for does not exist.",
  openGraph: {
    title: "404 — Page not found | NoteHub",
    description: "Sorry, the page you are looking for does not exist.",
    url: "https://notehub.app/404",
    images: ["/notehub-og-meta.jpg"],
    type: "website",
  },
};

export default function NotFound() {
  return (
    <main>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </main>
  );
}
