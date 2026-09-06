import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import couple from "@/assets/couple.jpg";

type ScratchRevealProps = {
  title: string;
  hint: string;
  caption: string;
  geo?: boolean;
};

export function ScratchReveal({ title, hint, caption, geo }: ScratchRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const drawing = useRef(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const paint = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      g.addColorStop(0, "#e7dccb");
      g.addColorStop(0.4, "#f6f1e7");
      g.addColorStop(0.65, "#d9cbb4");
      g.addColorStop(1, "#efe7d8");
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    paint();
    window.addEventListener("resize", paint);
    return () => window.removeEventListener("resize", paint);
  }, []);

  const celebrate = () => {
    if (done) return;
    setDone(true);
    const wrap = wrapRef.current;
    const rect = wrap?.getBoundingClientRect();
    const origin = rect
      ? {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        }
      : { x: 0.5, y: 0.5 };
    confetti({
      particleCount: 140,
      spread: 90,
      startVelocity: 42,
      scalar: 0.9,
      origin,
      colors: ["#e8d9c3", "#f6eee3", "#c9d7e6", "#d9c7d4", "#cbd8c6"],
    });
    setTimeout(
      () =>
        confetti({
          particleCount: 80,
          spread: 120,
          startVelocity: 28,
          scalar: 0.7,
          origin,
          colors: ["#f2e6d4", "#cfdce9", "#e3d3dd"],
        }),
      380,
    );
  };

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || done) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, Math.max(canvas.width, canvas.height) * 0.055, 0, Math.PI * 2);
    ctx.fill();

    // Measure cleared area every so often
    if (Math.random() < 0.16) {
      const step = 12;
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let clear = 0;
      let total = 0;
      for (let i = 3; i < data.length; i += 4 * step) {
        total++;
        if (data[i] === 0) clear++;
      }
      if (total && clear / total > 0.45) celebrate();
    }
  };

  return (
    <section className="mx-auto w-full max-w-xl px-6 text-center">
      <h2
        className={`text-[0.62rem] tracking-[0.28em] text-ink-soft ${
          geo ? "font-geo" : "uppercase tracking-luxe"
        }`}
      >
        {title}
      </h2>

      <div
        ref={wrapRef}
        className="relative mx-auto mt-6 aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border/60 shadow-[var(--shadow-envelope)]"
      >
        <img
          src={couple}
          alt={caption}
          loading="lazy"
          width={1024}
          height={1280}
          className="h-full w-full object-cover"
        />
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 h-full w-full cursor-crosshair touch-none transition-opacity duration-1000 ${
            done ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          onPointerDown={(e) => {
            drawing.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            scratchAt(e.clientX, e.clientY);
          }}
          onPointerMove={(e) => {
            if (drawing.current) scratchAt(e.clientX, e.clientY);
          }}
          onPointerUp={() => {
            drawing.current = false;
          }}
          onPointerLeave={() => {
            drawing.current = false;
          }}
        />
      </div>

      <p
        className={`mt-5 text-sm text-ink-soft transition-opacity duration-700 ${
          geo ? "font-geo" : ""
        }`}
      >
        {done ? caption : hint}
      </p>
    </section>
  );
}
