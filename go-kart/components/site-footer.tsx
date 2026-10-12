import Link from "next/link";
import { Logo } from "@/components/logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Prices" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-asphalt">
      <div className="checker-edge h-2 opacity-20" />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 sm:flex-row sm:justify-between">
        <Logo markClassName="h-8 w-8" iconClassName="h-4 w-4" textClassName="" />
        <nav className="flex gap-6 text-sm text-muted-foreground">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-muted-foreground">
          © 2026 Apex Karting. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
