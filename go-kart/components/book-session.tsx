"use client";

import { useActionState } from "react";
import { startCheckout } from "@/app/pricing/actions";

export function BookSession({ packageId }: { packageId: string }) {
  const [state, formAction, pending] = useActionState(startCheckout, null);

  return (
    <form action={formAction} className="mt-8">
      <input type="hidden" name="packageId" value={packageId} />
      <label className="flex items-center justify-between text-sm text-muted-foreground">
        Drivers
        <input
          name="quantity"
          type="number"
          min={1}
          max={20}
          defaultValue={1}
          required
          aria-label="Number of drivers"
          disabled={pending}
          className="w-16 rounded-md border border-input bg-background px-2 py-1 text-center text-foreground outline-none focus:border-racing"
        />
      </label>
      {state?.error ? (
        <p className="mt-3 text-sm text-racing" role="alert">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-4 w-full rounded-md bg-racing px-6 py-3 font-bold uppercase tracking-wide text-racing-foreground transition-transform hover:scale-105 disabled:cursor-wait disabled:opacity-70 disabled:hover:scale-100"
      >
        {pending ? "Redirecting" : "Book now"}
      </button>
    </form>
  );
}
