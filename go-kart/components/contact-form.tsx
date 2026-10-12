"use client";

import { useState } from "react";

const fieldClassName =
  "w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-racing";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p className="mt-6 font-semibold text-racing">
        Thanks! We&apos;ll get back to you soon. 🏁
      </p>
    );
  }

  return (
    <form
      className="mt-6 space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <input
        required
        placeholder="Your name"
        aria-label="Your name"
        className={fieldClassName}
      />
      <input
        required
        type="email"
        placeholder="Email"
        aria-label="Email"
        className={fieldClassName}
      />
      <input
        placeholder="Phone (optional)"
        aria-label="Phone (optional)"
        className={fieldClassName}
      />
      <textarea
        required
        rows={5}
        placeholder="Tell us about your visit — date, group size, occasion…"
        aria-label="Tell us about your visit — date, group size, occasion…"
        className={fieldClassName}
      />
      <button
        type="submit"
        className="w-full rounded-md bg-racing py-3 font-bold uppercase tracking-wide text-racing-foreground transition-transform hover:scale-[1.02]"
      >
        Send message
      </button>
    </form>
  );
}
