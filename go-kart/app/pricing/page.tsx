import type { Metadata } from "next";
import Link from "next/link";
import { BookSession } from "@/components/book-session";
import { CheckIcon } from "@/components/icons";
import { formatEuros, racePackages } from "@/lib/packages";

export const metadata: Metadata = {
  title: "Prices & Packages",
  description:
    "Simple prices, no hidden fees. All sessions include a helmet and safety briefing.",
};

const groups = [
  {
    name: "Birthday Party",
    price: "From €25 / person",
    text: "Race session, reserved party area and medals for the winners. Min. 6 drivers.",
  },
  {
    name: "Corporate & Groups",
    price: "From €40 / person",
    text: "Private track hire, team races and trophies. Perfect for team building.",
  },
];

export default function PricingPage() {
  return (
    <div className="speed-lines">
      <section className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-sm font-bold uppercase tracking-widest text-racing">
          Prices & packages
        </p>
        <h1 className="mt-3 text-5xl font-black uppercase">Pick your race</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Simple prices, no hidden fees. All sessions include a helmet and
          safety briefing. Card payments are handled by Stripe.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {racePackages.map((session) => (
            <div
              key={session.id}
              className={`relative flex flex-col rounded-lg border p-8 ${
                session.popular
                  ? "border-racing bg-card"
                  : "border-border bg-card/60"
              }`}
            >
              {session.popular ? (
                <span className="absolute -top-3 left-8 rounded-sm bg-racing px-2 py-1 text-xs font-bold uppercase text-racing-foreground">
                  Most popular
                </span>
              ) : null}
              <h3 className="text-xl font-bold uppercase">{session.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {session.duration}
              </p>
              <div className="mt-6 font-display text-5xl font-black">
                {formatEuros(session.unitAmount)}
              </div>
              <ul className="mt-6 space-y-3">
                {session.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <CheckIcon className="h-4 w-4 shrink-0 text-racing" />
                    {feature}
                  </li>
                ))}
              </ul>
              <BookSession packageId={session.id} />
            </div>
          ))}
        </div>

        <h2 className="mt-24 text-3xl font-black uppercase">Groups & parties</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {groups.map((group) => (
            <div
              key={group.name}
              className="rounded-lg border border-border bg-card p-8"
            >
              <h3 className="text-xl font-bold uppercase">{group.name}</h3>
              <p className="mt-1 font-semibold text-racing">{group.price}</p>
              <p className="mt-4 text-sm text-muted-foreground">{group.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-block rounded-md bg-racing px-6 py-3 font-bold uppercase tracking-wide text-racing-foreground transition-transform hover:scale-105"
          >
            Enquire about a booking
          </Link>
        </div>
      </section>
    </div>
  );
}
