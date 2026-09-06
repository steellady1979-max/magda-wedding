import { useMemo } from "react";

type PetalsProps = {
  count?: number;
  className?: string;
  /** soft pink rain for the whole page */
  rose?: boolean;
  fixed?: boolean;
};

const PALETTE = [
  "oklch(0.93 0.03 20 / 0.9)",
  "oklch(0.96 0.015 90 / 0.9)",
  "oklch(0.92 0.035 240 / 0.85)",
  "oklch(0.97 0.02 40 / 0.9)",
];

const ROSE_PALETTE = [
  "oklch(0.93 0.045 18 / 0.85)",
  "oklch(0.95 0.03 12 / 0.8)",
  "oklch(0.9 0.055 22 / 0.8)",
  "oklch(0.96 0.022 30 / 0.85)",
];

export function Petals({ count = 18, className = "", rose = false, fixed = false }: PetalsProps) {
  const colors = rose ? ROSE_PALETTE : PALETTE;

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
          color: colors[i % colors.length],
          opacity: (rose ? 0.22 : 0.35) + r2 * (rose ? 0.3 : 0.45),
        };
      }),
    [count, colors, rose],
  );

  return (
    <div
      aria-hidden
      className={`pointer-events-none inset-0 overflow-hidden ${
        fixed ? "fixed z-30" : "absolute"
      } ${className}`}
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
