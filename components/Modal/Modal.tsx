"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

/**
 * Рендерим в существующий <div id="modal-root" /> из app/layout.tsx.
 * Никаких manual removeChild — React сам разрулит размонтирование,
 * что устраняет ошибку в StrictMode.
 */
export default function Modal({ children, onClose }: Props) {
  const [root, setRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof document !== "undefined") {
      setRoot(document.getElementById("modal-root"));
    }
  }, []);

  if (!root) return null;

  return createPortal(
    <div className={css.overlay} onClick={onClose}>
      <div className={css.content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    root
  );
}
