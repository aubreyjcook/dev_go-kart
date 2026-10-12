import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import {
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Location & Contact",
  description:
    "Find Apex Karting, check opening hours, and send a message about your visit.",
};

const hours = [
  ["Mon – Thu", "14:00 – 22:00"],
  ["Friday", "12:00 – 23:00"],
  ["Saturday", "10:00 – 23:00"],
  ["Sunday", "10:00 – 20:00"],
];

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <p className="text-sm font-bold uppercase tracking-widest text-racing">
        Location & contact
      </p>
      <h1 className="mt-3 text-5xl font-black uppercase">Find the track</h1>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div className="space-y-8">
          <div className="overflow-hidden rounded-lg border border-border">
            <iframe
              title="Map to Apex Karting"
              src="https://www.openstreetmap.org/export/embed.html?bbox=27.50%2C53.88%2C27.60%2C53.93&layer=mapnik"
              className="h-72 w-full grayscale invert"
              loading="lazy"
            />
          </div>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <MapPinIcon className="h-5 w-5 shrink-0 text-racing" />
              123 Speedway Road, Your City
            </li>
            <li className="flex gap-3">
              <PhoneIcon className="h-5 w-5 shrink-0 text-racing" />
              +00 000 000 000
            </li>
            <li className="flex gap-3">
              <MailIcon className="h-5 w-5 shrink-0 text-racing" />
              hello@apexkarting.com
            </li>
          </ul>
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold uppercase">
              <ClockIcon className="h-5 w-5 text-racing" />
              Opening hours
            </h2>
            <dl className="mt-4 space-y-2 text-sm">
              {hours.map(([day, time]) => (
                <div
                  key={day}
                  className="flex justify-between border-b border-border pb-2 last:border-0"
                >
                  <dt className="text-muted-foreground">{day}</dt>
                  <dd className="font-semibold">{time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-8">
          <h2 className="text-2xl font-black uppercase">Send us a message</h2>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
