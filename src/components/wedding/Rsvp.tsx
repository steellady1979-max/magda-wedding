import { useState } from "react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import roses from "@/assets/white-roses.png";
import type { Copy } from "@/lib/copy";

type Props = { t: Copy; geo: boolean };

export function Rsvp({ t, geo }: Props) {
  const [name, setName] = useState("");
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);
  const [error, setError] = useState(false);
  const [sent, setSent] = useState<"yes" | "no" | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !answer) {
      setError(true);
      return;
    }
    setError(false);
    setSent(answer);
    if (answer === "yes") {
      confetti({
        particleCount: 120,
        spread: 95,
        startVelocity: 38,
        scalar: 0.85,
        origin: { x: 0.5, y: 0.7 },
        colors: ["#efe0c6", "#e8cfcb", "#c3d1e0", "#c2cdb9", "#f6eee3"],
      });
    }
  };

  return (
    <section className="mx-auto w-full max-w-xl px-6 text-center">
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-porcelain/70 px-6 pb-10 pt-8 backdrop-blur-md sm:px-10">
        <img
          src={roses}
          alt=""
          aria-hidden
          loading="lazy"
          width={1024}
          height={1024}
          className="pointer-events-none relative mx-auto -mt-2 mb-4 w-44 sm:w-52"
        />
        <img
          src={roses}
          alt=""
          aria-hidden
          loading="lazy"
          width={1024}
          height={1024}
          className="pointer-events-none absolute -bottom-20 -right-14 w-36 rotate-12 opacity-25 sm:w-44"
        />

        <div className="relative">
          <h2
            className={`text-[0.62rem] tracking-[0.28em] text-ink-soft ${
              geo ? "font-geo" : "uppercase tracking-luxe"
            }`}
          >
            {t.rsvpTitle}
          </h2>
          <p
            className={`mt-5 text-ink ${geo ? "font-geo text-xl" : "font-script text-3xl"}`}
          >
            {t.rsvpQuestion}
          </p>
          <div className="mx-auto mt-6 h-px w-16 bg-ink-soft/30" />

          {sent ? (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`mt-8 leading-relaxed text-ink ${
                geo ? "font-geo text-base leading-loose" : "text-lg"
              }`}
            >
              {sent === "yes" ? t.rsvpThanksYes : t.rsvpThanksNo}
            </motion.p>
          ) : (
            <form onSubmit={submit} className="mt-8 space-y-6">
              <label className="block text-left">
                <span
                  className={`text-[0.58rem] tracking-[0.22em] text-ink-soft ${
                    geo ? "font-geo" : "uppercase"
                  }`}
                >
                  {t.rsvpNameLabel}
                </span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value.slice(0, 80))}
                  maxLength={80}
                  className={`mt-2 w-full rounded-lg border border-border/70 bg-porcelain/80 px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink-soft/50 focus:border-ink-soft/60 ${
                    geo ? "font-geo" : ""
                  }`}
                />
              </label>

              <div className="flex justify-center gap-3">
                {(["yes", "no"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setAnswer(v)}
                    className={`min-w-[7rem] rounded-full border px-6 py-3 text-[0.62rem] tracking-[0.22em] transition-colors ${
                      geo ? "font-geo" : "uppercase"
                    } ${
                      answer === v
                        ? "border-ink-soft/60 bg-accent/70 text-ink"
                        : "border-border/70 text-ink-soft hover:bg-accent/40"
                    }`}
                  >
                    {v === "yes" ? t.rsvpYes : t.rsvpNo}
                  </button>
                ))}
              </div>

              {error && (
                <p className={`text-xs text-ink-soft ${geo ? "font-geo" : ""}`}>
                  {t.rsvpNameError}
                </p>
              )}

              <button
                type="submit"
                className={`w-full rounded-full border border-ink-soft/40 bg-accent/50 px-6 py-3 text-[0.62rem] tracking-[0.26em] text-ink transition-colors hover:bg-accent/80 ${
                  geo ? "font-geo" : "uppercase"
                }`}
              >
                {t.rsvpSend}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
