import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
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
    images: ["/notehub-og-meta.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
  // Next передаёт сюда параллельный слот @modal; принимаем, но не используем напрямую
  modal: _modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className={roboto.className}>
        <TanStackProvider>
          <Header />
          {children}
          <Footer />
        </TanStackProvider>

        {/* Контейнер для параллельного слота, чтобы успокоить TS и Next */}
        <div id="modal-root" style={{ display: "contents" }}>
          {_modal}
        </div>
      </body>
    </html>
  );
}
