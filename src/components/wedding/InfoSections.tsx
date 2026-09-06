import { useEffect, useRef, useState } from "react";
import fanAsset from "@/assets/lace-fan.png.asset.json";
import type { Copy } from "@/lib/copy";

type Props = { t: Copy; geo: boolean };

export function Greeting({ t, geo }: Props) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const text = t.greeting;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    setCount(0);
  }, [text]);

  useEffect(() => {
    if (!started) return;
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, 42);
    return () => clearInterval(id);
  }, [started, text]);

  const typing = started && count < text.length;

  return (
    <section className="mx-auto w-full max-w-xl px-6 text-center">
      <h2
        className={`text-[0.62rem] tracking-[0.28em] text-ink-soft ${
          geo ? "font-geo" : "uppercase tracking-luxe"
        }`}
      >
        {t.greetingTitle}
      </h2>
      <p
        ref={ref}
        className={`mt-6 text-balance-tight text-lg leading-relaxed text-ink ${
          geo ? "font-geo text-base leading-loose" : "font-script text-2xl"
        }`}
      >
        <span aria-hidden>{text.slice(0, count)}</span>
        {typing && <span className="ml-0.5 animate-pulse text-ink-soft">|</span>}
        <span className="sr-only">{text}</span>
      </p>
    </section>
  );
}

export function DressCode({ t, geo }: Props) {
  return (
    <section className="mx-auto w-full max-w-xl px-6 text-center">
      <img
        src={fanAsset.url}
        alt=""
        aria-hidden
        loading="lazy"
        className="mx-auto mb-2 w-56 sm:w-72"
      />
      <h2 className="text-[0.62rem] uppercase tracking-luxe text-ink-soft">{t.dressTitle}</h2>
      <p
        className={`mt-4 text-2xl text-ink ${geo ? "font-geo text-xl" : "font-script text-3xl"}`}
      >
        {t.dressSubtitle}
      </p>
      <div className="mx-auto mt-6 h-px w-16 bg-ink-soft/30" />
      <p
        className={`mt-6 text-balance-tight leading-relaxed text-ink-soft ${
          geo ? "font-geo text-[0.95rem] leading-loose" : "text-lg"
        }`}
      >
        {t.dressBody}
      </p>

      <p
        className={`mt-9 text-[0.58rem] tracking-[0.24em] text-ink-soft ${
          geo ? "font-geo" : "uppercase"
        }`}
      >
        {t.paletteTitle}
      </p>
      <ul className="mt-5 grid grid-cols-3 gap-4 sm:grid-cols-6">
        {t.palette.map((p) => (
          <li key={p.name} className="flex flex-col items-center gap-2">
            <span
              className="h-10 w-10 rounded-full border border-border/70 shadow-[0_2px_10px_oklch(0_0_0_/_0.08)]"
              style={{ backgroundColor: p.color }}
            />
            <span
              className={`text-[0.6rem] leading-tight text-ink-soft ${geo ? "font-geo" : ""}`}
            >
              {p.name}
            </span>
          </li>
        ))}
      </ul>
      <p className={`mt-4 text-[0.7rem] italic text-ink-soft/80 ${geo ? "font-geo" : ""}`}>
        {t.paletteNote}
      </p>

      <p
        className={`mt-8 text-balance-tight leading-relaxed text-ink-soft ${
          geo ? "font-geo text-[0.95rem] leading-loose" : "text-lg"
        }`}
      >
        {t.dressBody2}
      </p>
    </section>
  );
}

export function WhereToStay({ t, geo }: Props) {
  return (
    <section className="mx-auto w-full max-w-xl px-6">
      <h2
        className={`text-center text-[0.62rem] tracking-[0.28em] text-ink-soft ${
          geo ? "font-geo" : "uppercase tracking-luxe"
        }`}
      >
        {t.stayTitle}
      </h2>
      <ul className="mt-7 space-y-4">
        {t.hotels.map((h) => (
          <li
            key={h.name}
            className="rounded-xl border border-border/60 bg-porcelain/70 px-5 py-5 text-center backdrop-blur-md sm:flex sm:items-center sm:justify-between sm:text-left"
          >
            <div>
              <p className="text-lg text-ink">{h.name}</p>
              <p className={`mt-1 text-xs text-ink-soft ${geo ? "font-geo" : ""}`}>{h.meta}</p>
            </div>
            <a
              href={h.url}
              target="_blank"
              rel="noreferrer"
              className={`mt-4 inline-block rounded-full border border-border/70 px-5 py-2 text-[0.6rem] tracking-[0.22em] text-ink transition-colors hover:bg-accent/60 sm:mt-0 ${
                geo ? "font-geo" : "uppercase"
              }`}
            >
              {t.hotelCta}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
