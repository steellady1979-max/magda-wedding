import type { Copy } from "@/lib/copy";

type Props = { t: Copy; geo: boolean };

export function Greeting({ t, geo }: Props) {
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
        className={`mt-6 text-balance-tight text-lg leading-relaxed text-ink ${
          geo ? "font-geo text-base leading-loose" : "font-script text-2xl"
        }`}
      >
        {t.greeting}
      </p>
    </section>
  );
}

export function DressCode({ t, geo }: Props) {
  return (
    <section className="mx-auto w-full max-w-xl px-6 text-center">
      <h2
        className={`text-[0.62rem] uppercase tracking-luxe text-ink-soft`}
      >
        {t.dressTitle}
      </h2>
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
        className={`mt-4 text-balance-tight leading-relaxed text-ink-soft ${
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
