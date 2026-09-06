import { Volume2, VolumeX } from "lucide-react";

type SoundToggleProps = {
  muted: boolean;
  onToggle: () => void;
};

export function SoundToggle({ muted, onToggle }: SoundToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={muted ? "Unmute music" : "Mute music"}
      aria-pressed={!muted}
      className="group fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-border/70 bg-porcelain/70 text-ink shadow-[var(--shadow-seal)] backdrop-blur-md transition-all duration-500 hover:scale-105 hover:bg-porcelain focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:bottom-8 sm:right-8"
    >
      {muted ? (
        <VolumeX className="h-5 w-5 opacity-80" strokeWidth={1.4} />
      ) : (
        <Volume2 className="h-5 w-5 opacity-80" strokeWidth={1.4} />
      )}
    </button>
  );
}
