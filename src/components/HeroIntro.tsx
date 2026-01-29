"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroIntro() {
  const [isIntroVisible, setIsIntroVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsIntroVisible(true), 80);
    return () => window.clearTimeout(timer);
  }, []);

  const introVisibilityClass = isIntroVisible
    ? "opacity-100 translate-y-0 scale-100"
    : "opacity-0 translate-y-4 scale-[0.985]";

  return (
    <section className="relative z-10 w-full">
      <div className="relative mx-auto h-[95vh] w-full max-w-[420px] px-4">
        <div
          className={`relative h-full overflow-hidden bg-[var(--card)] transition-all duration-1000 ease-out ${introVisibilityClass}`}
        >
          <div className="absolute inset-0 z-0">
            <Image
              src="/img/img3.jpg"
              alt="Wedding portrait"
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="pointer-events-none absolute inset-0 z-10">
            {[
              { left: "6%", size: 6, delay: "0s", duration: "9s" },
              { left: "16%", size: 5, delay: "1.2s", duration: "8s" },
              { left: "26%", size: 7, delay: "2.1s", duration: "10s" },
              { left: "36%", size: 6, delay: "0.8s", duration: "9s" },
              { left: "46%", size: 5, delay: "1.7s", duration: "8s" },
              { left: "56%", size: 7, delay: "2.6s", duration: "11s" },
              { left: "66%", size: 6, delay: "1.4s", duration: "9s" },
              { left: "76%", size: 5, delay: "2.9s", duration: "10s" },
              { left: "86%", size: 7, delay: "0.6s", duration: "9s" },
            ].map((petal, index) => (
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


          <div className="absolute inset-x-0 top-0 z-20 bg-[var(--card)] py-6 text-center font-sans">
            <div className="text-2xl text-[#b57b5c]tracking-[0.08em] ">2026 / 04 / 28</div>
            <div className="mt-1 text-xs tracking-[0.2em] text-[#4a3f38]">SATURDAY</div>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-20 bg-[var(--card)] py-5 text-center font-sans">
            <div className="text-lg tracking-[0.2em]">이충기 · 주은화</div>
            <div className="mt-4 text-l tracking-[0.1em] text-[#4a3f38] opacity-70">
              2026년 10월 24일 토요일 오후 2시
            </div>

            <div className="mt-0 text-l tracking-[0.1em] text-[#4a3f38] opacity-60">
              채플웨딩홀 컨벤션, 3층
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
