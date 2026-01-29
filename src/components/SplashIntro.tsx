"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const IMAGE_1 = "/img/img1.jpg";
const IMAGE_2 = "/img/img2.jpg";

export default function SplashIntro() {
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState<1 | 2>(1);
  const [typedCount, setTypedCount] = useState(0);
  const hasCompletedRef = useRef(false);

  const text1 = "우리의 가장 빛나는 날";
  const text2 = "소중한 분들을 초대합니다";

  const typedText = useMemo(() => text2.slice(0, typedCount), [text2, typedCount]);

  useEffect(() => {
    if (!isVisible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const switchTimer = window.setTimeout(() => setPhase(2), 2200);
    const endTimer = window.setTimeout(() => {
      endSplash();
      document.body.style.overflow = previousOverflow;
    }, 5200);

    return () => {
      window.clearTimeout(switchTimer);
      window.clearTimeout(endTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || phase !== 2) return;

    setTypedCount(0);
    let current = 0;
    const interval = window.setInterval(() => {
      current += 1;
      setTypedCount(current);
      if (current >= text2.length) {
        window.clearInterval(interval);
      }
    }, 120);

    return () => window.clearInterval(interval);
  }, [isVisible, phase, text2.length]);

  useEffect(() => {
    if (!isVisible) return;

    const handleInteract = () => endSplash();
    window.addEventListener("scroll", handleInteract, { passive: true });
    window.addEventListener("touchstart", handleInteract, { passive: true });
    window.addEventListener("click", handleInteract);

    return () => {
      window.removeEventListener("scroll", handleInteract);
      window.removeEventListener("touchstart", handleInteract);
      window.removeEventListener("click", handleInteract);
    };
  }, [isVisible]);

  const endSplash = () => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    setIsVisible(false);
    window.dispatchEvent(new Event("splash-ended"));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#F5F5F3]">
      <div className="relative mx-auto h-full w-full max-w-[320px]">
        <div
          className={`absolute inset-0 transition-opacity duration-600 ${
            phase === 1 ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={IMAGE_1}
            alt="Splash image 1"
            fill
            priority
            unoptimized
            className="object-cover splash-photo-1"
          />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="px-6">
              <p
                className="text-[20px] font-medium text-[#F7F2E8] drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)] splash-text-delayed"
                style={{ fontFamily: "var(--font-maru-buri)" }}
              >
                {text1}
              </p>
            </div>
          </div>
        </div>
        <div
          className={`absolute inset-0 transition-opacity duration-600 ${
            phase === 2 ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={IMAGE_2}
            alt="Splash image 2"
            fill
            priority
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="px-6">
              <p
                className="text-[20px] font-medium text-[#F7F2E8] drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)] splash-text-soft"
                style={{ fontFamily: "var(--font-maru-buri)" }}
              >
                {typedText}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
