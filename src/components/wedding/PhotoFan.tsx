import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import hero1 from "@/assets/hero-1.mp4.asset.json";
import hero2 from "@/assets/hero-2.mp4.asset.json";
import hero3 from "@/assets/hero-3.mp4.asset.json";

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

/** Horizontal row: left card overlaps center, center overlaps right.
 *  Center card is vertically centred, sides sit level with it. */
const frames: Frame[] = [
  {
    video: hero2.url,
    aspect: "aspect-[5/4]",
    width: "w-[33vw] max-w-[162px]",
    x: "-92%",
    y: -30,
    rotate: -1.5,
    delay: 0.3,
    z: 30,
    floatPx: 5,
    floatDur: "9s",
    floatDelay: "0s",
  },
  {
    video: hero3.url,
    aspect: "aspect-[5/4]",
    width: "w-[33vw] max-w-[162px]",
    x: "92%",
    y: -30,
    rotate: 1.5,
    delay: 1.2,
    z: 10,
    floatPx: 4.5,
    floatDur: "10s",
    floatDelay: "-3.2s",
  },
  {
    // the boy gazing at the girl — always the prominent center card
    video: hero1.url,
    aspect: "aspect-[4/5]",
    width: "w-[32vw] max-w-[158px]",
    x: "0%",
    y: -30,
    rotate: 0,
    delay: 2.1,
    z: 20,
    floatPx: 3,
    floatDur: "8s",
    floatDelay: "-1.6s",
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
