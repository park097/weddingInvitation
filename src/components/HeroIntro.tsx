"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroIntro() {
  const [isIntroVisible, setIsIntroVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsIntroVisible(true), 80);
    return () => window.clearTimeout(timer);
  }, []);

  // Smaller, round white particles.
  const petals = [
    { left: "6%", size: 6, delay: "0s", duration: "9s" },
    { left: "16%", size: 5, delay: "1.2s", duration: "8s" },
    { left: "26%", size: 7, delay: "2.1s", duration: "10s" },
    { left: "36%", size: 6, delay: "0.8s", duration: "9s" },
    { left: "46%", size: 5, delay: "1.7s", duration: "8s" },
    { left: "56%", size: 7, delay: "2.6s", duration: "11s" },
    { left: "66%", size: 6, delay: "1.4s", duration: "9s" },
    { left: "76%", size: 5, delay: "2.9s", duration: "10s" },
    { left: "86%", size: 7, delay: "0.6s", duration: "9s" },
  ];

  const introVisibilityClass = isIntroVisible
    ? "opacity-100 translate-y-0 scale-100"
    : "opacity-0 translate-y-4 scale-[0.985]";

  return (
    <section className="relative z-10 w-full">
      <div className="relative mx-auto h-[95vh] w-full max-w-[420px] px-4">
        <div
          className={`relative h-full overflow-hidden ui-rounded transition-all duration-1000 ease-out ${introVisibilityClass}`}
        >
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero-1.svg"
              alt="Wedding portrait"
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="pointer-events-none absolute inset-0 z-10">
            {petals.map((petal, index) => (
              <span
                key={`${petal.left}-${index}`}
                className="petal"
                style={{
                  left: petal.left,
                  width: `${petal.size}px`,
                  height: `${petal.size}px`,
                  animationDelay: petal.delay,
                  animationDuration: petal.duration,
                }}
              />
            ))}
          </div>

          <div className="absolute inset-0 z-20 flex flex-col items-center justify-end px-6 pb-12 text-center text-white pointer-events-none">
            <div className="display hero-text text-[68px] font-semibold leading-[0.88]">
              <div>26</div>
              <div>10</div>
              <div>24</div>
            </div>
            <div className="hero-text mt-4 text-xs uppercase tracking-[0.35em] text-white/90">
              Wedding Invitation
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
