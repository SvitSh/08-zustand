// app/layout.tsx
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteHub",
  description:
    "A simple and efficient application for managing personal notes.",
  openGraph: {
    title: "NoteHub",
    description:
      "A simple and efficient application for managing personal notes.",
    url: "https://notehub.app",
    images: ["/notehub-og-meta.jpg"],
    type: "website",
  },
};

export default function RootLayout({
  children,
  modal, // ⬅️ добавили слот для модалки
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
          {modal}
          {}
          <Footer />
          {}
          <div id="modal-root" />
        </TanStackProvider>
      </body>
    </html>
  );
}
