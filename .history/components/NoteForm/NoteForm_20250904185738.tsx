"use client";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Creating…" : "Create"}
    </button>
  );
}

// ...
<form action={createNoteAction}>
  {/* поля формы */}
  <SubmitButton />
  <button
    type="button"
    onClick={() => {
      if (typeof window !== "undefined") window.history.back();
    }}
  >
    Cancel
  </button>
</form>;
