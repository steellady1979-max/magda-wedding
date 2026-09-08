import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Landing } from "@/components/wedding/Landing";
import { event } from "@/lib/event";
import { EnvelopeIntro } from "@/components/wedding/EnvelopeIntro";
import { BackgroundMusic } from "@/components/wedding/BackgroundMusic";


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

        <EnvelopeIntro opened={opened} gone={false} onOpen={() => setOpened(true)} />
      </div>
      {opened && <Landing />}
    </main>
  );
}
