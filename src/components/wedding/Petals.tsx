import { useMemo } from "react";

type PetalsProps = {
  count?: number;
  className?: string;
};

const PALETTE = [
  "oklch(0.93 0.03 20 / 0.9)",
  "oklch(0.96 0.015 90 / 0.9)",
  "oklch(0.92 0.035 240 / 0.85)",
  "oklch(0.97 0.02 40 / 0.9)",
];

export function Petals({ count = 18, className = "" }: PetalsProps) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const seed = (i * 9301 + 49297) % 233280;
        const r = seed / 233280;
        const r2 = ((i * 4931 + 7919) % 1000) / 1000;
        return {
          left: `${(r * 100).toFixed(2)}%`,
          size: 8 + r2 * 12,
          duration: `${11 + r * 12}s`,
          delay: `${-(r2 * 18).toFixed(2)}s`,
          drift: `${(r2 - 0.5) * 220}px`,
          spin: `${180 + r * 520}deg`,
          color: PALETTE[i % PALETTE.length],
          opacity: 0.35 + r2 * 0.45,
        };
      }),
    [count],
  );

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {petals.map((p, i) => (
        <span
          key={i}
          className="animate-petal absolute top-0 block"
          style={
            {
              left: p.left,
              width: p.size,
              height: p.size * 0.72,
              background: p.color,
              opacity: p.opacity,
              borderRadius: "60% 40% 55% 45% / 65% 55% 45% 35%",
              filter: "blur(0.3px)",
              animationDuration: p.duration,
              animationDelay: p.delay,
              "--drift": p.drift,
              "--spin": p.spin,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
