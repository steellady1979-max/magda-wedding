import { motion } from "motion/react";
import envelopeTexture from "@/assets/envelope-texture-cream.jpg";
import waxSeal from "@/assets/wax-seal-bm.png";
import { PhotoFan } from "./PhotoFan";
import lace from "@/assets/lace.png";

type EnvelopeIntroProps = {
  opened: boolean;
  gone: boolean;
  onOpen: () => void;
  tapLabel?: string;
  geo?: boolean;
};

const silk = [0.22, 1, 0.36, 1] as const;

export function EnvelopeIntro({ opened, gone, onOpen, tapLabel, geo }: EnvelopeIntroProps) {
  void tapLabel;
  void geo;
  return (
    <motion.div
      className="absolute inset-0 z-30 flex items-center justify-center overflow-hidden bg-background"
      initial={false}
      animate={{ opacity: gone ? 0 : 1 }}
      style={{ pointerEvents: gone ? "none" : "auto" }}
      transition={{ duration: 1.2, ease: silk }}
    >

      {/* Envelope surface fills the viewport, as in a close-up */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: opened ? 1.14 : 1 }}
        transition={{ duration: 2.4, ease: silk }}
      >
        <img
          src={envelopeTexture}
          alt=""
          aria-hidden
          width={1024}
          height={1536}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_40%,transparent_35%,oklch(0.72_0.04_245_/_0.28)_100%)]" />
      </motion.div>

      {/* Lace trim draped in a V that meets above the seal — tinted to the ink brown */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[25]">
        <div
          className="absolute left-1/2 top-[26%] aspect-[3/1] w-[95%] max-w-[560px] origin-bottom-right -translate-x-full rotate-[30deg] opacity-90"
          style={{
            backgroundColor: "#3b281f",
            maskImage: `url(${lace})`,
            WebkitMaskImage: `url(${lace})`,
            maskSize: "100% 100%",
            WebkitMaskSize: "100% 100%",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 -scale-x-100">
          <div
            className="absolute left-1/2 top-[26%] aspect-[3/1] w-[95%] max-w-[560px] origin-bottom-right -translate-x-full rotate-[30deg] opacity-90"
            style={{
              backgroundColor: "#3b281f",
              maskImage: `url(${lace})`,
              WebkitMaskImage: `url(${lace})`,
              maskSize: "100% 100%",
              WebkitMaskSize: "100% 100%",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          />
        </div>
      </div>




      {/* Envelope flap that lifts open */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-0 z-20 h-[58%] origin-top [transform-style:preserve-3d]"
        style={{ perspective: 1400 }}
        animate={{ rotateX: opened ? -168 : 0 }}
        transition={{ duration: 1.7, delay: opened ? 0.45 : 0, ease: silk }}
      >
        <div
          className="h-full w-full [clip-path:polygon(0_0,100%_0,50%_100%)]"
          style={{
            backgroundImage: `url(${envelopeTexture})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(1.02)",
          }}
        >
          <div className="h-full w-full bg-[linear-gradient(180deg,oklch(1_0_0_/_0.35),oklch(0.78_0.035_245_/_0.25))]" />
        </div>
      </motion.div>

      {/* Inner paper revealed beneath the flap */}
      <motion.div
        aria-hidden
        className="absolute inset-x-[6%] top-[6%] z-10 h-[70%] rounded-sm bg-porcelain paper-glow"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: opened ? -14 : 40, opacity: opened ? 1 : 0 }}
        transition={{ duration: 1.6, delay: opened ? 0.9 : 0, ease: silk }}
      >
        <div className="h-full w-full bg-[linear-gradient(180deg,oklch(1_0_0)_0%,oklch(0.97_0.012_240)_100%)]" />
      </motion.div>

      {/* Wax seal */}
      <motion.button
        type="button"
        onClick={onOpen}
        aria-label="Open the invitation"
        className="group absolute z-40 flex w-[42vw] max-w-[220px] cursor-pointer items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        animate={
          opened
            ? { y: -46, scale: 1.16, opacity: 0, rotate: -8 }
            : { y: 0, scale: 1, opacity: 1, rotate: 0 }
        }
        transition={{ duration: 1.1, ease: silk }}
        whileTap={{ scale: 0.96 }}
      >
        <span className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,oklch(1_0_0_/_0.75),transparent_70%)] blur-xl" />
        <img
          src={waxSeal}
          alt="Wax seal with the initials B and M"
          width={1024}
          height={1024}
          className={`w-full drop-shadow-[var(--shadow-seal)] transition-transform duration-700 ${
            opened ? "" : "animate-seal-breathe"
          }`}
        />
      </motion.button>

      <PhotoFan show={opened} />

      {/* Prompt */}
      <motion.p
        className="absolute bottom-[9%] z-40 text-[0.66rem] uppercase tracking-luxe text-ink-soft"
        animate={{ opacity: opened ? 0 : 1 }}
        transition={{ duration: 0.6 }}
      >
        Tap to open
      </motion.p>
    </motion.div>
  );
}
