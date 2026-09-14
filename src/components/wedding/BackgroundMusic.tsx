import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

const AUDIO_URL = "/media/mukhambazi.mp3";

export type BackgroundMusicHandle = {
  play: () => void;
};

export const BackgroundMusic = forwardRef<BackgroundMusicHandle>(function BackgroundMusic(_, ref) {
  const audio = useRef<HTMLAudioElement>(null);
  const [on, setOn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const play = useCallback(() => {
    const current = audio.current;
    if (!current) return;

    current.muted = false;
    current.volume = 0.7;
    setError(null);

    const playback = current.play();
    if (playback) {
      void playback.catch(() => {
        setOn(false);
        setError("მუსიკა ვერ ჩაირთო — შეეხეთ ღილაკს ხელახლა");
      });
    }
  }, []);

  useImperativeHandle(ref, () => ({ play }), [play]);

  // Try to start on load; browsers that block it get a one-time gesture fallback.
  useEffect(() => {
    const current = audio.current;
    if (!current) return;

    const attempt = current.play();
    if (!attempt) return;

    void attempt.catch(() => {
      const start = () => {
        play();
        remove();
      };
      const remove = () => {
        ["pointerdown", "touchstart", "keydown", "scroll"].forEach((e) =>
          window.removeEventListener(e, start),
        );
      };
      ["pointerdown", "touchstart", "keydown", "scroll"].forEach((e) =>
        window.addEventListener(e, start, { once: true, passive: true }),
      );
      return remove;
    });
  }, [play]);

  const toggle = () => {
    const current = audio.current;
    if (!current) return;

    if (!current.paused) {
      current.pause();
    } else {
      play();
    }
  };

  return (
    <>
      <audio
        ref={audio}
        src={AUDIO_URL}
        loop
        autoPlay
        playsInline
        preload="auto"
        onPlay={() => {
          setOn(true);
          setError(null);
        }}
        onPause={() => setOn(false)}
        onError={() => {
          setOn(false);
          setError("მუსიკა ვერ ჩაიტვირთა — შეეხეთ ღილაკს ხელახლა");
        }}
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={toggle}
        aria-label={on ? "მუსიკის გამორთვა" : "მუსიკის ჩართვა"}
        aria-pressed={on}
        className="music-toggle"
      >
        {on ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
      </Button>
      {error && <p className="music-error" role="status">{error}</p>}
    </>
  );
});
