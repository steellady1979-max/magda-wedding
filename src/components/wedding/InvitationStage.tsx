import { motion } from "motion/react";
import castleBg from "@/assets/castle-bg.jpg";
import curtain from "@/assets/curtain-left.png";
import { Petals } from "./Petals";
import type { Copy, Lang } from "@/lib/copy";

type InvitationStageProps = {
  revealed: boolean;
  t: Copy;
  lang: Lang;
  onLang: (l: Lang) => void;
};

const silk = [0.22, 1, 0.36, 1] as const;

const line = (delay: number) => ({
  initial: { opacity: 0, y: 26, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1.4, delay, ease: silk },
});

export function InvitationStage({ revealed, t, lang, onLang }: InvitationStageProps) {
  const geo = lang === "ka";

  return (
    <div className="absolute inset-0 overflow-hidden bg-background">
      {/* Watercolour château backdrop */}
      <motion.img
        src={castleBg}
        alt="Château de la Couronne"
        width={1024}
        height={1536}
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.18 }}
        animate={{ scale: revealed ? 1 : 1.18 }}
        transition={{ duration: 5, ease: silk }}
      />
      <div className="absolute inset-0 veil-fade" />
      <div className="absolute inset-0 bg-[radial-gradient(110%_70%_at_50%_35%,oklch(1_0_0_/_0.35),transparent_70%)]" />

      <Petals count={20} />

      {/* Parting curtains */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[56%] max-w-[420px]"
        initial={{ x: "0%" }}
        animate={{ x: revealed ? "-48%" : "0%" }}
        transition={{ duration: 3.4, ease: silk }}
      >
        <img
          src={curtain}
          alt=""
          width={768}
          height={1536}
          className="h-full w-full object-cover object-left"
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-[56%] max-w-[420px] -scale-x-100"
        initial={{ x: "0%" }}
        animate={{ x: revealed ? "-48%" : "0%" }}
        transition={{ duration: 3.4, ease: silk }}
      >
        <img
          src={curtain}
          alt=""
          width={768}
          height={1536}
          className="h-full w-full object-cover object-left"
        />
      </motion.div>

      {/* Language switch */}
      <motion.div
        className="absolute right-4 top-4 z-40 flex overflow-hidden rounded-md border border-border/70 bg-porcelain/60 text-[0.6rem] tracking-[0.2em] text-ink backdrop-blur-md sm:right-6 sm:top-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: 1, delay: 2.2 }}
      >
        <button
          type="button"
          onClick={() => onLang("ka")}
          className={`font-geo px-3 py-1.5 transition-colors ${
            geo ? "bg-accent/70" : "text-ink-soft hover:bg-accent/40"
          }`}
        >
          ქარ
        </button>
        <button
          type="button"
          onClick={() => onLang("fr")}
          className={`px-3 py-1.5 uppercase transition-colors ${
            geo ? "text-ink-soft hover:bg-accent/40" : "bg-accent/70"
          }`}
        >
          FR
        </button>
      </motion.div>

      {/* Typography */}
      {revealed && (
        <div className="absolute inset-x-0 top-[10%] z-30 flex flex-col items-center px-6 text-center">
          <motion.p
            {...line(1.4)}
            className={`text-[0.6rem] tracking-[0.3em] text-ink-soft sm:text-[0.72rem] ${
              geo ? "font-geo" : "uppercase tracking-luxe"
            }`}
          >
            {t.weddingOf}
          </motion.p>

          <motion.h1
            {...line(1.8)}
            className="mt-5 flex flex-col items-center leading-[1] text-ink"
          >
            <span className={geo ? "font-geo text-[2.6rem] sm:text-6xl" : "font-script text-[3.4rem] sm:text-7xl md:text-8xl"}>
              {t.bride}
            </span>
            <span className="my-1 font-script text-2xl text-ink-soft sm:text-3xl">&amp;</span>
            <span className={geo ? "font-geo text-[2.6rem] sm:text-6xl" : "font-script text-[3.4rem] sm:text-7xl md:text-8xl"}>
              {t.groom}
            </span>
          </motion.h1>

          <motion.div {...line(2.5)} className="mt-8 flex items-center gap-3 text-ink-soft">
            <span className="h-px w-10 bg-current opacity-40" />
            <span className={`text-[0.7rem] tracking-[0.28em] sm:text-xs ${geo ? "font-geo" : "uppercase tracking-[0.34em]"}`}>
              {t.date}
            </span>
            <span className="h-px w-10 bg-current opacity-40" />
          </motion.div>

          <motion.p
            {...line(2.9)}
            className={`mt-5 max-w-[17rem] whitespace-pre-line text-balance-tight leading-snug text-ink sm:max-w-sm ${
              geo ? "font-geo text-base sm:text-lg" : "font-script text-lg sm:text-xl"
            }`}
          >
            {t.venue}
          </motion.p>

          <motion.div
            {...line(3.4)}
            className={`mt-10 flex flex-col items-center gap-2 text-[0.58rem] tracking-[0.24em] text-ink-soft ${
              geo ? "font-geo" : "uppercase"
            }`}
          >
            <span className="h-8 w-px animate-pulse bg-current opacity-40" />
          </motion.div>
        </div>
      )}
    </div>
  );
}
