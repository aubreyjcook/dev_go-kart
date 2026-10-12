import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  GaugeIcon,
  ShieldCheckIcon,
  TimerIcon,
  UsersIcon,
} from "@/components/icons";

const features = [
  {
    icon: GaugeIcon,
    title: "Fast karts",
    text: "Well-maintained, powerful karts tuned for grip and thrills.",
  },
  {
    icon: TimerIcon,
    title: "Live lap timing",
    text: "Every lap timed to the hundredth. Beat your mates, top the board.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Safety first",
    text: "Helmets, briefings and trained marshals at every session.",
  },
  {
    icon: UsersIcon,
    title: "Groups & parties",
    text: "Birthdays, team outings and stag dos — we'll set up a race.",
  },
];

const stats = [
  ["800m", "Track length"],
  ["14", "Corners"],
  ["8+", "Min. age"],
];

export default function HomePage() {
  return (
    <>
      <section className="relative isolate flex min-h-[88vh] items-end overflow-hidden">
        <Image
          src="/hero-track.jpg"
          alt="Go-karts racing on the Apex Karting track"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="mx-auto w-full max-w-6xl px-4 pb-20">
          <span className="inline-block rounded-sm bg-racing px-3 py-1 text-xs font-bold uppercase tracking-widest text-racing-foreground">
            Now open
          </span>
          <h1 className="mt-5 max-w-3xl text-5xl font-black uppercase leading-[0.95] tracking-tight text-balance sm:text-7xl">
            Lights out.
            <br />
            <span className="text-racing">Full throttle.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Your new local go-kart track. Grab a helmet, hit the apex and chase
            the fastest lap of the day.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-md bg-racing px-6 py-3 font-bold uppercase tracking-wide text-racing-foreground transition-transform hover:scale-105"
            >
              See prices
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background/40 px-6 py-3 font-bold uppercase tracking-wide backdrop-blur transition-colors hover:bg-secondary"
            >
              Find the track
            </Link>
          </div>
        </div>
      </section>

      <section className="speed-lines border-y border-border">
        <div className="mx-auto grid max-w-6xl gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="bg-background p-8">
              <feature.icon className="h-8 w-8 text-racing" />
              <h3 className="mt-4 text-xl font-bold uppercase">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 md:grid-cols-2">
        <Image
          src="/kart-closeup.jpg"
          alt="A racing kart in the pit garage"
          width={1024}
          height={1024}
          className="aspect-square w-full rounded-lg object-cover"
        />
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-racing">
            About the track
          </p>
          <h2 className="mt-3 text-4xl font-black uppercase leading-tight">
            Built for racers. Fun for everyone.
          </h2>
          <p className="mt-5 text-muted-foreground">
            Whether it&apos;s your first time behind the wheel or you&apos;re
            chasing tenths, our track has tight hairpins, a flat-out straight
            and plenty of overtaking spots. Sessions start with a quick safety
            briefing, then it&apos;s green flag.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-8">
            {stats.map(([value, label]) => (
              <div key={label}>
                <div className="font-display text-3xl font-black text-racing">
                  {value}
                </div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-racing">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-14 text-center sm:flex-row sm:text-left">
          <h2 className="text-3xl font-black uppercase text-racing-foreground">
            Ready to race?
          </h2>
          <Link
            href="/contact"
            className="rounded-md bg-background px-6 py-3 font-bold uppercase tracking-wide text-foreground transition-transform hover:scale-105"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
