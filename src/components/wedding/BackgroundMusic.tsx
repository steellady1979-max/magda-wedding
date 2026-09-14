import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

const AUDIO_URL = "/media/mukhambazi.mp3";
export type BackgroundMusicHandle = { play: () => void };

export const BackgroundMusic = forwardRef<BackgroundMusicHandle>(function BackgroundMusic(_, ref) {
  const audio = useRef<HTMLAudioElement>(null);
  const [on, setOn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const enabled = useRef(true);
  const request = useRef(0);

  const play = useCallback(() => {
    const current = audio.current;
    if (!current || !enabled.current || !current.paused) return;
    const attempt = ++request.current;
    current.muted = false;
    current.volume = 0.7;
    setError(null);
    const playback = current.play();
    if (playback) {
      void playback.catch((reason: unknown) => {
        if (attempt !== request.current || !enabled.current) return;
        setOn(false);
        // Blocked autoplay is expected; the next real gesture retries it.
        if (reason instanceof DOMException && reason.name === "NotAllowedError") return;
        setError("მუსიკა ვერ ჩაირთო — შეეხეთ ღილაკს ხელახლა");
      });
    }
  }, []);

  useImperativeHandle(ref, () => ({ play }), [play]);

  // Register before autoplay so an early tap cannot be missed. Safari needs
  // play() directly inside touchend/click, rather than a delayed callback.
  useEffect(() => {
    const current = audio.current;
    if (!current) return;
    const events = ["click", "touchend", "keydown"] as const;
    const start = (event: Event) => {
      if (event.target instanceof Element && event.target.closest("[data-music-toggle]")) return;
      if (event instanceof KeyboardEvent && (event.key === "Escape" || event.ctrlKey || event.metaKey || event.altKey)) return;
      play();
    };
    const remove = () => {
      events.forEach((event) => window.removeEventListener(event, start, true));
    };
    events.forEach((event) => window.addEventListener(event, start, { capture: true, passive: true }));
    current.addEventListener("playing", remove);
    play();
    return () => {
      remove();
      current.removeEventListener("playing", remove);
      ++request.current;
    };
  }, [play]);

  const toggle = () => {
    const current = audio.current;
    if (!current) return;
    if (!current.paused) {
      enabled.current = false;
      ++request.current;
      current.pause();
    } else {
      enabled.current = true;
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
        onPlaying={() => { setOn(true); setError(null); }}
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
        data-music-toggle
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
