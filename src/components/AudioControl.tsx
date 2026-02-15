"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const AUDIO_SRC = "/audio/MP_Dream.mp3";

export default function AudioControl() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const start = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      // Autoplay can be blocked; user interaction required.
      setIsPlaying(false);
    }
  }, []);

  useEffect(() => {
    const handleSplashEnd = () => {
      start();
    };

    window.addEventListener("splash-ended", handleSplashEnd);
    return () => {
      window.removeEventListener("splash-ended", handleSplashEnd);
    };
  }, [start]);

  useEffect(() => {
    const handleUserGesture = () => {
      start();
    };

    window.addEventListener("click", handleUserGesture, { once: true });
    window.addEventListener("touchstart", handleUserGesture, { once: true, passive: true });
    window.addEventListener("keydown", handleUserGesture, { once: true });
    window.addEventListener("wheel", handleUserGesture, { once: true, passive: true });

    return () => {
      window.removeEventListener("click", handleUserGesture);
      window.removeEventListener("touchstart", handleUserGesture);
      window.removeEventListener("keydown", handleUserGesture);
      window.removeEventListener("wheel", handleUserGesture);
    };
  }, [start]);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
  }, []);

  return (
    <button
      type="button"
      onClick={isPlaying ? stop : start}
      className="ui-rounded fixed right-4 top-4 z-50 border border-white/60 bg-white/80 px-4 py-2 text-xs font-medium text-neutral-700 shadow-md backdrop-blur"
      aria-pressed={isPlaying}
    >
      {isPlaying ? "음악 끄기" : "배경음악 재생"}
    </button>
  );
}
