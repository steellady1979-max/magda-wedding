import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { EnvelopeIntro } from "@/components/wedding/EnvelopeIntro";
import { InvitationStage } from "@/components/wedding/InvitationStage";
import { SoundToggle } from "@/components/wedding/SoundToggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lucia & Matteo — 27 July 2027, Château de la Couronne" },
      {
        name: "description",
        content:
          "The wedding of Lucia & Matteo, 27 July 2027 at Château de la Couronne, Nouvelle-Aquitaine, France. Open the sealed invitation.",
      },
      { property: "og:title", content: "The Wedding of Lucia & Matteo" },
      {
        property: "og:description",
        content:
          "27 July 2027 · Château de la Couronne, Nouvelle-Aquitaine, France. Open the sealed invitation.",
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
  const [muted, setMuted] = useState(true);

  // Gentle automatic opening if the guest doesn't tap
  useEffect(() => {
    if (opened) return;
    const t = setTimeout(() => setOpened(true), 5200);
    return () => clearTimeout(t);
  }, [opened]);

  useEffect(() => {
    if (!opened) return;
    const t = setTimeout(() => setRevealed(true), 1900);
    return () => clearTimeout(t);
  }, [opened]);

  return (
    <main className="relative h-[100svh] w-full overflow-hidden bg-background">
      <InvitationStage revealed={revealed} />
      <EnvelopeIntro opened={opened} onOpen={() => setOpened(true)} />
      <SoundToggle muted={muted} onToggle={() => setMuted((m) => !m)} />
    </main>
  );
}
