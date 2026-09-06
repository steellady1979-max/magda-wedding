import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { EnvelopeIntro } from "@/components/wedding/EnvelopeIntro";
import { InvitationStage } from "@/components/wedding/InvitationStage";
import { SoundToggle } from "@/components/wedding/SoundToggle";
import { Countdown } from "@/components/wedding/Countdown";
import { LocationMap } from "@/components/wedding/LocationMap";
import { Rsvp } from "@/components/wedding/Rsvp";
import chateauAsset from "@/assets/chateau-illustration.png.asset.json";
import { DressCode, Greeting, WhereToStay } from "@/components/wedding/InfoSections";
import { copy, WEDDING_DATE, type Lang } from "@/lib/copy";
import { Petals } from "@/components/wedding/Petals";
import { Reveal } from "@/components/wedding/Reveal";
import cameoAsset from "@/assets/cameo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ლუკასი & მარიამი — 18 ნოემბერი 2026" },
      {
        name: "description",
        content:
          "ლუკასი და მარიამის ქორწილი — 18 ნოემბერი 2026, Château de la Couronne, საფრანგეთი. გახსენით დაბეჭდილი მოსაწვევი.",
      },
      { property: "og:title", content: "ლუკასი & მარიამი — ქორწილის მოსაწვევი" },
      {
        property: "og:description",
        content:
          "18 ნოემბერი 2026 · Château de la Couronne, ნუველ-აკიტენი, საფრანგეთი.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [opened, setOpened] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [gone, setGone] = useState(false);
  const [muted, setMuted] = useState(true);
  const [lang, setLang] = useState<Lang>("ka");

  const t = copy[lang];
  const geo = lang === "ka";

  useEffect(() => {
    if (opened) return;
    const t2 = setTimeout(() => setOpened(true), 5200);
    return () => clearTimeout(t2);
  }, [opened]);

  useEffect(() => {
    if (!opened) return;
    const reveal = setTimeout(() => setRevealed(true), 3200);
    const clear = setTimeout(() => setGone(true), 4200);
    return () => {
      clearTimeout(reveal);
      clearTimeout(clear);
    };
  }, [opened]);

  return (
    <main className="relative w-full bg-background">
      {gone && <Petals count={26} rose fixed />}
      <section className="relative h-[100svh] w-full overflow-hidden">
        <InvitationStage revealed={revealed} t={t} lang={lang} onLang={setLang} />
        <EnvelopeIntro opened={opened} gone={gone} onOpen={() => setOpened(true)} tapLabel={t.tap} geo={geo} />
        <SoundToggle muted={muted} onToggle={() => setMuted((m) => !m)} />
      </section>

      <div className="relative space-y-20 bg-[linear-gradient(180deg,oklch(0.985_0.006_90),oklch(0.96_0.012_240))] py-20 sm:space-y-24 sm:py-24">
        <Reveal>
          <section className="mx-auto w-full max-w-xl px-6">
            <h2
              className={`mb-7 text-center text-[0.62rem] tracking-[0.28em] text-ink-soft ${
                geo ? "font-geo" : "uppercase tracking-luxe"
              }`}
            >
              {t.countdownTitle}
            </h2>
            <Countdown target={WEDDING_DATE} labels={t.countdown} geo={geo} />
          </section>
        </Reveal>

        <Reveal>
          <section className="mx-auto w-full max-w-xl px-6">
            <img
              src={chateauAsset.url}
              alt="Château de la Couronne — watercolour illustration"
              loading="lazy"
              className="mx-auto w-full max-w-md"
            />
          </section>
        </Reveal>

        <Reveal>
          <Greeting t={t} geo={geo} />
        </Reveal>

        <Reveal>
          <DressCode t={t} geo={geo} />
        </Reveal>

        <Reveal>
          <WhereToStay t={t} geo={geo} />
        </Reveal>

        <Reveal>
          <Rsvp t={t} geo={geo} />
        </Reveal>

        <Reveal>
          <LocationMap
            title={t.mapTitle}
            address={t.mapAddress}
            cta={t.mapCta}
            geo={geo}
          />
        </Reveal>

        <Reveal>
          <div className="px-6 text-center">
            <p
              className={`text-lg text-ink-soft ${
                geo ? "font-geo text-base" : "font-script text-xl"
              }`}
            >
              {t.footer}
            </p>
            <img
              src={cameoAsset.url}
              alt=""
              aria-hidden
              loading="lazy"
              className="mx-auto mt-8 w-52 sm:w-64"
            />
          </div>
        </Reveal>

      </div>
    </main>
  );
}
