import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
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

export type BackgroundMusicHandle = {
  play: () => void;
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
export const BackgroundMusic = forwardRef<BackgroundMusicHandle>(function BackgroundMusic(_, ref) {
  const holder = useRef<HTMLDivElement>(null);
  const player = useRef<YTPlayer | null>(null);
  const ready = useRef(false);
  const [on, setOn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void loadApi().then(() => {
      if (cancelled || player.current || !holder.current || !window.YT?.Player) return;
      player.current = new window.YT.Player(holder.current, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 0,
          loop: 1,
          playlist: VIDEO_ID,
          controls: 0,
          playsinline: 1,
          disablekb: 1,
          modestbranding: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (e: { target: YTPlayer }) => {
            ready.current = true;
            e.target.setVolume(70);
            e.target.mute();
          },
          onStateChange: (e: { data: number }) => {
            if (e.data === 1) {
              setOn(true);
              setError(null);
            } else if (e.data === 0) {
              player.current?.playVideo();
            } else if (e.data === 2) {
              setOn(false);
            }
          },
          onError: () => {
            setOn(false);
            setError("მუსიკა ვერ ჩაიტვირთა — სცადეთ ხელახლა");
          },
        },
      });
    }).catch(() => setError("მუსიკა ვერ ჩაიტვირთა — სცადეთ ხელახლა"));
    return () => {
      cancelled = true;
    };
  }, []);

  const start = useCallback(() => {
    const current = player.current;
    if (!current || !ready.current) {
      setError("მუსიკა ჯერ იტვირთება — შეეხეთ ღილაკს ხელახლა");
      return;
    }
    setError(null);
    current.setVolume(70);
    current.unMute();
    current.playVideo();
  }, []);

  useImperativeHandle(ref, () => ({ play: start }), [start]);

  const toggle = () => {
    if (on) {
      player.current?.pauseVideo();
      setOn(false);
    } else {
      start();
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
      {error && <p className="music-error" role="status">{error}</p>}
    </>
  );
});
