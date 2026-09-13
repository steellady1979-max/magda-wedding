import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Landing } from "@/components/wedding/Landing";
import { event } from "@/lib/event";
import { EnvelopeIntro } from "@/components/wedding/EnvelopeIntro";
import { BackgroundMusic } from "@/components/wedding/BackgroundMusic";

function RevealVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    void v.play().catch(() => {});
  }, []);
  return (
    <motion.div
      className="absolute inset-0 z-[50] overflow-hidden bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="metadata"
        poster="/media/hero-reveal-poster.jpg"
        aria-hidden
        className="h-full w-full object-cover"
      >
        <source src="/media/hero-reveal.webm" type="video/webm" />
        <source src="/media/hero-reveal.mp4" type="video/mp4" />
      </video>
    </motion.div>
  );
}


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${event.names} — ${event.date}` },
      {
        name: "description",
        content: event.invitation,
      },
      { property: "og:title", content: `${event.names} — ქორწილის მოსაწვევი` },
      {
        property: "og:description",
        content: "გახსენით მოსაწვევი კონვერტი და იხილეთ ჩვენი ფოტოები.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (opened) return;
    const t = setTimeout(() => setOpened(true), 5200);
    return () => clearTimeout(t);
  }, [opened]);

  return (
    <main className="bg-white">
      <BackgroundMusic />
      <div className="relative h-[100svh] w-full overflow-hidden">

        <EnvelopeIntro opened={opened} gone={opened} onOpen={() => setOpened(true)} />
        {opened && <RevealVideo />}
      </div>
      {opened && <Landing />}
    </main>
  );
}
