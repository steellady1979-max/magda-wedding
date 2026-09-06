import { useEffect, useState } from "react";

type CountdownProps = {
  target: string;
  labels: { days: string; hours: string; minutes: string; seconds: string };
  geo?: boolean;
};

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  };
}

export function Countdown({ target, labels, geo }: CountdownProps) {
  const targetMs = new Date(target).getTime();
  const [time, setTime] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setTime(diff(targetMs));
    const id = setInterval(() => setTime(diff(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);


  const cells = [
    [time?.days ?? 0, labels.days],
    [time?.hours ?? 0, labels.hours],
    [time?.minutes ?? 0, labels.minutes],
    [time?.seconds ?? 0, labels.seconds],
  ] as const;


  return (
    <div className="flex items-stretch justify-center gap-2 sm:gap-4">
      {cells.map(([value, label]) => (
        <div
          key={label}
          className="min-w-[4.4rem] rounded-lg border border-border/60 bg-porcelain/70 px-3 py-3 backdrop-blur-md sm:min-w-[5.6rem] sm:px-5 sm:py-4"
        >
          <div className="font-script text-3xl leading-none text-ink sm:text-4xl">
            {String(value).padStart(2, "0")}
          </div>
          <div
            className={`mt-2 text-[0.55rem] tracking-[0.24em] text-ink-soft sm:text-[0.62rem] ${
              geo ? "font-geo" : "uppercase"
            }`}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
