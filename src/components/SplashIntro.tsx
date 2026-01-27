"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Phase = 1 | 2 | 3;

export default function SplashIntro() {
  const [phase, setPhase] = useState<Phase>(1);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Lock scroll while the splash is visible.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const phase2Timer = window.setTimeout(() => setPhase(2), 900);
    const phase3Timer = window.setTimeout(() => setPhase(3), 1900);
    const hideTimer = window.setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = previousOverflow;
    }, 2700);

    return () => {
      window.clearTimeout(phase2Timer);
      window.clearTimeout(phase3Timer);
      window.clearTimeout(hideTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!isVisible) return null;

  const containerClass =
    phase === 3 ? "opacity-0 scale-[1.02]" : "opacity-100 scale-100";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#f7f2ee]">
      <div
        className={`relative h-full w-full max-w-[420px] overflow-hidden transition-all duration-700 ease-out ${containerClass}`}
      >
        <div
          className={`absolute inset-0 transition-all duration-1000 ease-out ${
            phase === 1 ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <Image
            src="/hero-1.svg"
            alt="Intro photo 1"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div
          className={`absolute inset-0 transition-all duration-1000 ease-out ${
            phase === 2 ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <Image
            src="/flower-photo.svg"
            alt="Intro photo 2"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#f7f2ee] via-transparent to-transparent" />
      </div>
    </div>
  );
}
