import { useEffect, useState } from "react";

const VIDEO_ID = "-Ai3nowbLU8";

/**
 * Plays the Jansug Kakhidze "Mukhambazi" track from YouTube.
 * Mobile browsers block sound until a user gesture, so playback starts on the
 * first tap/click/keypress anywhere on the page, and can be toggled off.
 */
export function BackgroundMusic() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (on) return;
    const start = () => setOn(true);
    const opts = { once: true, passive: true } as const;
    window.addEventListener("pointerdown", start, opts);
    window.addEventListener("touchstart", start, opts);
    window.addEventListener("keydown", start, { once: true });
    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("touchstart", start);
      window.removeEventListener("keydown", start);
    };
  }, [on]);

  return (
    <>
      {on && (
        <iframe
          title="ფონური მუსიკა"
          src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&loop=1&playlist=${VIDEO_ID}&controls=0&playsinline=1`}
          allow="autoplay; encrypted-media"
          className="pointer-events-none fixed left-0 top-0 h-px w-px opacity-0"
        />
      )}
      <button
        type="button"
        onClick={() => setOn((v) => !v)}
        aria-label={on ? "მუსიკის გამორთვა" : "მუსიკის ჩართვა"}
        className="fixed right-4 top-4 z-[60] flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 text-base text-foreground backdrop-blur"
      >
        {on ? "♪" : "♪̸"}
      </button>
    </>
  );
}
