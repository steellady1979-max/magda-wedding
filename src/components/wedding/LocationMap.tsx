type LocationMapProps = {
  title: string;
  address: string;
  cta: string;
  geo?: boolean;
};

const EMBED =
  "https://www.openstreetmap.org/export/embed.html?bbox=0.4174%2C45.6089%2C0.4974%2C45.6489&layer=mapnik&marker=45.6289%2C0.4574";
const LINK = "https://www.openstreetmap.org/?mlat=45.6289&mlon=0.4574#map=14/45.6289/0.4574";

export function LocationMap({ title, address, cta, geo }: LocationMapProps) {
  return (
    <div className="mx-auto w-full max-w-xl">
      <h2
        className={`text-center text-[0.62rem] tracking-[0.3em] text-ink-soft ${
          geo ? "font-geo" : "uppercase tracking-luxe"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-4 text-center text-lg leading-snug text-ink ${
          geo ? "font-geo" : "font-script text-xl"
        }`}
      >
        {address}
      </p>
      <div className="mt-6 overflow-hidden rounded-xl border border-border/60 shadow-[var(--shadow-envelope)]">
        <iframe
          title={title}
          src={EMBED}
          loading="lazy"
          className="h-64 w-full sm:h-80"
        />
      </div>
      <div className="mt-5 flex justify-center">
        <a
          href={LINK}
          target="_blank"
          rel="noreferrer"
          className={`rounded-full border border-border/70 bg-porcelain/70 px-6 py-2.5 text-[0.62rem] tracking-[0.24em] text-ink backdrop-blur-md transition-colors hover:bg-accent/60 ${
            geo ? "font-geo" : "uppercase"
          }`}
        >
          {cta}
        </a>
      </div>
    </div>
  );
}
