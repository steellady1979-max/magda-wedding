import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { EnvelopeIntro } from "@/components/wedding/EnvelopeIntro";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ლუკასი & მარიამი — 18 ნოემბერი 2026" },
      {
        name: "description",
        content:
          "ლუკასი და მარიამის ქორწილის მოსაწვევი — გახსენით დაბეჭდილი კონვერტი.",
      },
      { property: "og:title", content: "ლუკასი & მარიამი — ქორწილის მოსაწვევი" },
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
    <main className="relative h-[100svh] w-full overflow-hidden bg-white">
      <EnvelopeIntro
        opened={opened}
        gone={gone}
        onOpen={() => setOpened(true)}
      />
    </main>
  );
}
