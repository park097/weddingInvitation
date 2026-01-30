"use client";

import { useEffect, useState } from "react";

type MainEntranceProps = {
  children: React.ReactNode;
};

const ANIMATION_DURATION_MS = 1200;
const ANIMATION_DELAY_MS = 150;

export default function MainEntrance({ children }: MainEntranceProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    const handleSplashEnd = () => {
      window.setTimeout(() => setIsVisible(true), ANIMATION_DELAY_MS);
      window.setTimeout(
        () => setIsInteractive(true),
        ANIMATION_DELAY_MS + ANIMATION_DURATION_MS
      );
    };

    window.addEventListener("splash-ended", handleSplashEnd);

    return () => {
      window.removeEventListener("splash-ended", handleSplashEnd);
    };
  }, []);

  return (
    <div
      className={`main-entrance ${isVisible ? "main-entrance--visible" : ""} ${
        isInteractive ? "main-entrance--interactive" : ""
      }`}
    >
      {children}
    </div>
  );
}
