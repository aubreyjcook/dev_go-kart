export type RacePackage = {
  id: string;
  name: string;
  duration: string;
  unitAmount: number;
  features: readonly string[];
  popular: boolean;
};

export const racePackages = [
  {
    id: "sprint",
    name: "Sprint",
    duration: "10 minutes",
    unitAmount: 1500,
    features: ["Helmet & briefing", "Live lap timing", "Printed results"],
    popular: false,
  },
  {
    id: "grand-prix",
    name: "Grand Prix",
    duration: "3 × 10 minutes",
    unitAmount: 3500,
    features: ["Everything in Sprint", "Qualifying + race", "Podium photo"],
    popular: true,
  },
  {
    id: "endurance",
    name: "Endurance",
    duration: "30 minutes",
    unitAmount: 5000,
    features: ["Long-run session", "Pit stop practice", "Full lap analysis"],
    popular: false,
  },
] as const satisfies readonly RacePackage[];

export function getRacePackage(id: string) {
  return racePackages.find((racePackage) => racePackage.id === id);
}

export function formatEuros(cents: number) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
