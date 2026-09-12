import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import heroReveal from "@/assets/hero-reveal.mp4.asset.json";

const silk = [0.22, 1, 0.36, 1] as const;

type Frame = {
  video: string;
  /** card shape, mirroring the reference collage */
  aspect: string;
  width: string;
  x: string;
  y: number;
  rotate: number;
  delay: number;
  z: number;
  floatPx: number;
  floatDur: string;
  floatDelay: string;
};

/** Single centered portrait video revealed when the envelope opens. */
const frames: Frame[] = [
  {
    video: heroReveal.url,
    aspect: "aspect-[9/16]",
    width: "w-[58vw] max-w-[280px]",
    x: "0%",
    y: 0,
    rotate: 0,
    delay: 0.6,
    z: 20,
    floatPx: 4,
    floatDur: "9s",
    floatDelay: "0s",
  },
];


type PhotoFanProps = { show: boolean };

export function PhotoFan({ show }: PhotoFanProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  // Pause media + card float while the hero is off-screen.
  useEffect(() => {
    const el = hostRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? true),
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const active = show && inView;

  return (
    <div
      ref={hostRef}
      className="pointer-events-none absolute inset-0 z-[45] flex items-center justify-center"
    >
      {frames.map((f, i) => (
        <motion.div
          key={i}
          className={`absolute ${f.width}`}
          style={{ zIndex: f.z }}
          initial={{ y: 90, x: "0%", opacity: 0, scale: 0.35, rotate: 0 }}
          animate={
            show
              ? { y: f.y, x: f.x, opacity: 1, scale: 1, rotate: f.rotate }
              : { y: 90, x: "0%", opacity: 0, scale: 0.35, rotate: 0 }
          }
          transition={{ duration: 1.8, delay: show ? f.delay : 0, ease: silk }}
        >
          {/* inner wrapper carries only the float transform, so rotation above is preserved */}
          <div
            className="animate-card-float"
            style={{
              // @ts-expect-error custom property
              "--float": `${f.floatPx}px`,
              animationDuration: f.floatDur,
              animationDelay: f.floatDelay,
              animationPlayState: active ? "running" : "paused",
            }}
          >
            <div className="relative overflow-hidden rounded-[2px] border border-porcelain/80 bg-porcelain p-[5px] shadow-[0_18px_45px_-18px_oklch(0.45_0.04_250_/_0.5)]">
              <div className={`relative overflow-hidden ${f.aspect}`}>
                <CinemagraphVideo src={f.video} playing={active} />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function CinemagraphVideo({ src, playing }: { src: string; playing: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !playing) {
      v.pause();
      return;
    }
    void v.play().catch(() => {});
  }, [playing]);

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
