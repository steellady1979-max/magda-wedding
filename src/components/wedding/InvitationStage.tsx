import { motion } from "motion/react";
import castleBg from "@/assets/castle-bg.jpg";
import curtain from "@/assets/curtain-left.png";
import { Petals } from "./Petals";

type InvitationStageProps = {
  revealed: boolean;
};

const silk = [0.22, 1, 0.36, 1] as const;

const line = (delay: number) => ({
  initial: { opacity: 0, y: 26, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1.4, delay, ease: silk },
});

export function InvitationStage({ revealed }: InvitationStageProps) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-background">
      {/* Watercolour château backdrop */}
      <motion.img
        src={castleBg}
        alt="Watercolour painting of Château de la Couronne with a flower-lined avenue"
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
      <motion.img
        src={curtain}
        alt=""
        aria-hidden
        width={768}
        height={1536}
        className="pointer-events-none absolute inset-y-0 left-0 h-full w-[62%] max-w-[520px] object-cover object-left"
        initial={{ x: "0%" }}
        animate={{ x: revealed ? "-34%" : "0%" }}
        transition={{ duration: 3.2, ease: silk }}
      />
      <motion.img
        src={curtain}
        alt=""
        aria-hidden
        width={768}
        height={1536}
        className="pointer-events-none absolute inset-y-0 right-0 h-full w-[62%] max-w-[520px] -scale-x-100 object-cover object-left"
        initial={{ x: "0%" }}
        animate={{ x: revealed ? "34%" : "0%" }}
        transition={{ duration: 3.2, ease: silk }}
      />

      {/* Language switch */}
      <motion.div
        className="absolute right-4 top-4 z-40 flex overflow-hidden rounded-md border border-border/70 bg-porcelain/60 text-[0.6rem] uppercase tracking-[0.2em] text-ink backdrop-blur-md sm:right-6 sm:top-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: 1, delay: 2.2 }}
      >
        <button type="button" className="bg-accent/70 px-3 py-1.5">
          EN
        </button>
        <button type="button" className="px-3 py-1.5 text-ink-soft transition-colors hover:bg-accent/40">
          FR
        </button>
      </motion.div>

      {/* Typography */}
      {revealed && (
        <div className="absolute inset-x-0 top-[10%] z-30 flex flex-col items-center px-6 text-center">
          <motion.p
            {...line(1.4)}
            className="text-[0.6rem] uppercase tracking-luxe text-ink-soft sm:text-[0.72rem]"
          >
            The Wedding of
          </motion.p>

          <motion.h1
            {...line(1.8)}
            className="mt-5 flex flex-col items-center leading-[0.92] text-ink"
          >
            <span className="font-script text-[3.4rem] sm:text-7xl md:text-8xl">Lucia</span>
            <span className="my-1 font-script text-2xl text-ink-soft sm:text-3xl">&amp;</span>
            <span className="font-script text-[3.4rem] sm:text-7xl md:text-8xl">Matteo</span>
          </motion.h1>

          <motion.div
            {...line(2.5)}
            className="mt-8 flex items-center gap-3 text-ink-soft"
          >
            <span className="h-px w-10 bg-current opacity-40" />
            <span className="text-[0.7rem] uppercase tracking-[0.34em] sm:text-xs">
              27 July 2027
            </span>
            <span className="h-px w-10 bg-current opacity-40" />
          </motion.div>

          <motion.p
            {...line(2.9)}
            className="mt-5 max-w-[16rem] text-balance-tight font-script text-lg leading-snug text-ink sm:max-w-sm sm:text-xl"
          >
            Château de la Couronne,
            <br />
            Nouvelle-Aquitaine, France
          </motion.p>
        </div>
      )}
    </div>
  );
}
