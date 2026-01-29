"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const IMAGE_1 = "/img/img1.jpg";
const IMAGE_2 = "/img/img2.jpg";

const MAX_WAIT_MS = 7000;
const PHOTO_1_DURATION_MS = 2000;
const PHOTO_2_DURATION_MS = 2000;

export default function SplashIntro() {
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState<1 | 2>(1);
  const [typedCount, setTypedCount] = useState(0);
  const [img1Ready, setImg1Ready] = useState(false);
  const [img2Ready, setImg2Ready] = useState(false);
  const hasCompletedRef = useRef(false);

  const text1 = "우리의 가장 빛나는 날";
  const text2 = "소중한 분들을 초대합니다";

  const typedText = useMemo(() => text2.slice(0, typedCount), [text2, typedCount]);

  // Safety: don't wait forever if the image never loads.
  useEffect(() => {
    if (img1Ready) return;
    const fallback = window.setTimeout(() => setImg1Ready(true), MAX_WAIT_MS);
    return () => window.clearTimeout(fallback);
  }, [img1Ready]);

  useEffect(() => {
    if (img2Ready) return;
    const fallback = window.setTimeout(() => setImg2Ready(true), MAX_WAIT_MS);
    return () => window.clearTimeout(fallback);
  }, [img2Ready]);

  useEffect(() => {
    if (!isVisible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || !img1Ready) return;

    const timer = window.setTimeout(() => setPhase(2), PHOTO_1_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [isVisible, img1Ready]);

  useEffect(() => {
    if (!isVisible || phase !== 2 || !img2Ready) return;

    setTypedCount(0);
    let current = 0;
    const interval = window.setInterval(() => {
      current += 1;
      setTypedCount(current);
      if (current >= text2.length) {
        window.clearInterval(interval);
      }
    }, 120);

    const endTimer = window.setTimeout(() => {
      endSplash();
    }, PHOTO_2_DURATION_MS);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(endTimer);
    };
  }, [isVisible, phase, img2Ready, text2.length]);

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
            onLoadingComplete={() => setImg1Ready(true)}
          />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="px-6">
              <p
                className={`text-[20px] font-medium text-[#F7F2E8] drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)] splash-text-delayed ${
                  img1Ready ? "" : "opacity-0"
                }`}
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
            onLoadingComplete={() => setImg2Ready(true)}
          />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="px-6">
              <p
                className={`text-[20px] font-medium text-[#F7F2E8] drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)] splash-text-soft ${
                  img2Ready ? "" : "opacity-0"
                }`}
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
