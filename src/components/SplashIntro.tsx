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

  const phase1TextClass =
    phase === 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2";
  const phase2TextClass =
    phase === 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2";
  const bottomTextClass = phase === 3 ? "opacity-0" : "opacity-100";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#f7f2ee]">
      <div
        className={`relative h-full w-full max-w-[460px] overflow-hidden transition-all duration-700 ease-out ${containerClass}`}
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

        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-end px-6 pb-12 text-center text-white">
          <div className="relative w-full min-h-[120px]">
            <div
              className={`absolute inset-0 flex items-end justify-center transition-all duration-700 ease-out ${phase1TextClass}`}
            >
              <div className="display text-[56px] font-semibold leading-[0.92] tracking-[0.02em] hero-text">
                <div>LOVE OF</div>
                <div>LIFE</div>
              </div>
            </div>
            <div
              className={`absolute inset-0 flex items-end justify-center transition-all duration-700 ease-out ${phase2TextClass}`}
            >
              <div className="display text-[40px] font-semibold leading-[1] tracking-[0.08em] hero-text">
                EUNHWA & CHUNGKI
              </div>
            </div>
          </div>
          <div className={`hero-text display mt-4 text-xs uppercase tracking-[0.35em] text-white/90 transition-opacity duration-700 ${bottomTextClass}`}>
            Wedding Invitation
          </div>
        </div>
      </div>
    </div>
  );
}
