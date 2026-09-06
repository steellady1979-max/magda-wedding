import { motion } from "motion/react";
import photo1 from "@/assets/couple-1.jpeg.asset.json";
import photo2 from "@/assets/couple-2.jpeg.asset.json";
import photo3 from "@/assets/couple-3.jpeg.asset.json";

const silk = [0.22, 1, 0.36, 1] as const;

type Frame = {
  url: string;
  rotate: number;
  x: string;
  scale: number;
  delay: number;
  z: number;
  /** vertical share of the image treated as sky/sea/hair, gently animated */
  band: string;
};

const frames: Frame[] = [
  { url: photo1.url, rotate: -9, x: "-52%", scale: 0.82, delay: 0.15, z: 10, band: "62%" },
  { url: photo2.url, rotate: 9, x: "52%", scale: 0.82, delay: 0.3, z: 10, band: "62%" },
  { url: photo3.url, rotate: 0, x: "0%", scale: 1, delay: 0.5, z: 20, band: "58%" },
];

type PhotoFanProps = { show: boolean };

export function PhotoFan({ show }: PhotoFanProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-[45] flex items-center justify-center">
      {frames.map((f, i) => (
        <motion.div
          key={i}
          className="absolute w-[46vw] max-w-[220px]"
          style={{ zIndex: f.z }}
          initial={{ y: 90, x: "0%", opacity: 0, scale: 0.35, rotate: 0 }}
          animate={
            show
              ? { y: -10, x: f.x, opacity: 1, scale: f.scale, rotate: f.rotate }
              : { y: 90, x: "0%", opacity: 0, scale: 0.35, rotate: 0 }
          }
          transition={{ duration: 1.8, delay: show ? f.delay : 0, ease: silk }}
        >
          <div className="relative overflow-hidden rounded-[2px] border border-porcelain/80 bg-porcelain p-[6px] shadow-[0_18px_45px_-18px_oklch(0.45_0.04_250_/_0.5)]">
            <div className="relative aspect-[3/4] overflow-hidden">
              {/* static base photo */}
              <img
                src={f.url}
                alt="Couple by the sea"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* sea band: only the water drifts */}
              <div
                className="absolute inset-x-0 top-0 overflow-hidden [mask-image:linear-gradient(180deg,black_70%,transparent)]"
                style={{ height: f.band }}
                aria-hidden
              >
                <img
                  src={f.url}
                  alt=""
                  loading="lazy"
                  className="animate-sea absolute left-0 top-0 w-full origin-top object-cover"
                  style={{ height: `calc(100% / ${parseFloat(f.band) / 100})` }}
                />
              </div>
              {/* hair: gentle wind sway over the flowing hair only */}
              <div
                className="absolute inset-0 overflow-hidden [mask-image:radial-gradient(42%_34%_at_66%_52%,black_35%,transparent_80%)]"
                aria-hidden
              >
                <img
                  src={f.url}
                  alt=""
                  loading="lazy"
                  className="animate-hair absolute inset-0 h-full w-full origin-center object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_20%,transparent_55%,oklch(0.72_0.04_245_/_0.12)_100%)]" />

            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
