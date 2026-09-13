import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

const VIDEO_ID = "-Ai3nowbLU8";

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  setVolume: (v: number) => void;
};

declare global {
  interface Window {
    YT?: {
      Player: new (el: HTMLElement, opts: Record<string, unknown>) => YTPlayer;
      loaded?: number;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

function loadApi(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();
  return new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    if (!document.getElementById("yt-iframe-api")) {
      const s = document.createElement("script");
      s.id = "yt-iframe-api";
      s.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(s);
    }
  });
}

/**
 * Background music (Jansug Kakhidze — "Mukhambazi") via the YouTube IFrame API.
 *
 * Mobile browsers (and Chrome on desktop) refuse to start audible playback
 * inside an iframe unless play() is called from a real user gesture in that
 * same frame's parent. A bare <iframe autoplay=1> is therefore silently
 * blocked in production, which is why nothing was audible on the live site.
 * Here we create a real player and call unMute()+playVideo() directly in the
 * first pointer/keydown handler, which browsers accept everywhere.
 */
export function BackgroundMusic() {
  const holder = useRef<HTMLDivElement>(null);
  const player = useRef<YTPlayer | null>(null);
  const [on, setOn] = useState(false);

  const ensurePlayer = useCallback(async () => {
    if (player.current) return player.current;
    await loadApi();
    if (!holder.current || !window.YT?.Player) return null;
    player.current = new window.YT.Player(holder.current, {
      videoId: VIDEO_ID,
      playerVars: {
        autoplay: 1,
        loop: 1,
        playlist: VIDEO_ID,
        controls: 0,
        playsinline: 1,
        disablekb: 1,
        modestbranding: 1,
      },
      events: {
        onReady: (e: { target: YTPlayer }) => {
          e.target.setVolume(70);
          e.target.unMute();
          e.target.playVideo();
        },
        onStateChange: (e: { data: number }) => {
          if (e.data === 0) player.current?.playVideo();
        },
      },
    });
    return player.current;
  }, []);

  const start = useCallback(async () => {
    const p = await ensurePlayer();
    p?.unMute();
    p?.playVideo();
    setOn(true);
  }, [ensurePlayer]);

  // First interaction anywhere on the page starts audible playback.
  useEffect(() => {
    if (on) return;
    const handler = () => void start();
    const opts = { once: true, passive: true } as const;
    window.addEventListener("pointerdown", handler, opts);
    window.addEventListener("touchend", handler, opts);
    window.addEventListener("keydown", handler, { once: true });
    return () => {
      window.removeEventListener("pointerdown", handler);
      window.removeEventListener("touchend", handler);
      window.removeEventListener("keydown", handler);
    };
  }, [on, start]);

  const toggle = () => {
    if (on) {
      player.current?.pauseVideo();
      setOn(false);
    } else {
      void start();
    }
  };

  return (
    <>
      <div aria-hidden="true" className="music-frame">
        <div ref={holder} />
      </div>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={toggle}
        aria-label={on ? "მუსიკის გამორთვა" : "მუსიკის ჩართვა"}
        className="music-toggle"
      >
        {on ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
      </Button>
    </>
  );
}
