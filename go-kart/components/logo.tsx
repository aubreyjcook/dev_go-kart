import Link from "next/link";
import { FlagIcon } from "@/components/icons";

type LogoProps = {
  markClassName?: string;
  iconClassName?: string;
  textClassName?: string;
};

export function Logo({
  markClassName = "h-9 w-9",
  iconClassName = "h-5 w-5",
  textClassName = "text-lg",
}: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span
        className={`flex items-center justify-center rounded-md bg-racing text-racing-foreground ${markClassName}`}
      >
        <FlagIcon className={iconClassName} />
      </span>
      <span
        className={`font-display font-black uppercase tracking-wider ${textClassName}`}
      >
        Apex<span className="text-racing">Karting</span>
      </span>
    </Link>
  );
}
