"use client";

import { useRef, useState } from "react";

export default function AudioControl() {
  const contextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainRef = useRef<GainNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const start = async () => {
    if (!contextRef.current) {
      const context = new AudioContext();
      const gain = context.createGain();
      gain.gain.value = 0.03;
      gain.connect(context.destination);

      const osc1 = context.createOscillator();
      const osc2 = context.createOscillator();
      osc1.type = "sine";
      osc2.type = "triangle";
      osc1.frequency.value = 220;
      osc2.frequency.value = 330;
      osc1.connect(gain);
      osc2.connect(gain);
      osc1.start();
      osc2.start();

      contextRef.current = context;
      oscillatorsRef.current = [osc1, osc2];
      gainRef.current = gain;
    }

    if (contextRef.current?.state === "suspended") {
      await contextRef.current.resume();
    }

    setIsPlaying(true);
  };

  const stop = async () => {
    if (contextRef.current) {
      oscillatorsRef.current.forEach((osc) => osc.stop());
      oscillatorsRef.current = [];
      await contextRef.current.close();
      contextRef.current = null;
      gainRef.current = null;
    }

    setIsPlaying(false);
  };

  return (
    <button
      type="button"
      onClick={isPlaying ? stop : start}
      className="fixed right-4 top-4 z-50 rounded-full border border-white/60 bg-white/80 px-4 py-2 text-xs font-medium text-neutral-700 shadow-md backdrop-blur"
      aria-pressed={isPlaying}
    >
      {isPlaying ? "음악 끄기" : "배경음악 재생"}
    </button>
  );
}
