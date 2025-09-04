import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  // Важно: берём домен из .env.local
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "NoteHub — быстрые заметки",
    template: "%s | NoteHub",
  },
  description: "Создавай, фильтруй и просматривай заметки.",
  openGraph: {
    title: "NoteHub — быстрые заметки",
    description: "Создавай, фильтруй и просматривай заметки.",
    url: "/",
    images: ["/notehub-og-meta.jpg"], // лежит в /public
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>{children}</body>
    </html>
  );
}
