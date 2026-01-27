"use client";

import Image from "next/image";
import { useRef } from "react";
import useScrollProgress from "@/hooks/useScrollProgress";
import InvitationSection from "@/components/InvitationSection";

export default function HeroIntro() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progress = useScrollProgress(sectionRef);
  const titleLift = Math.min(1, progress / 1.0);
  const inviteLift = Math.min(1, Math.max(0, (progress - 0.15) / 0.85));

  const petals = [
    { left: "8%", size: 14, delay: "0s", duration: "9s" },


    
    { left: "18%", size: 10, delay: "1s", duration: "7s" },
    { left: "28%", size: 12, delay: "2s", duration: "8s" },
    { left: "38%", size: 16, delay: "0.5s", duration: "10s" },
    { left: "48%", size: 12, delay: "1.6s", duration: "9s" },
    { left: "58%", size: 14, delay: "2.4s", duration: "8s" },
    { left: "68%", size: 10, delay: "1.2s", duration: "7s" },
    { left: "78%", size: 12, delay: "2.8s", duration: "9s" },
    { left: "88%", size: 16, delay: "0.8s", duration: "10s" },
  ];

  return (
    <section ref={sectionRef} className="relative z-10 h-[150vh] w-full">
      <div className="sticky top-0 h-[95vh] w-full">
        <div className="relative mx-auto h-[95vh] w-full max-w-[420px] px-4">
          <div className="relative h-full overflow-hidden ">
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
                    height: `${petal.size * 1.4}px`,
                    animationDelay: petal.delay,
                    animationDuration: petal.duration,
                  }}
                />
              ))}
            </div>
          </div>
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-end px-6 pb-12 text-center text-white pointer-events-none"
            style={{ transform: `translateY(${-titleLift * 600}px)` }}
          >
            <div className="display hero-text text-[68px] font-semibold leading-[0.88]">
              <div>26</div>
              <div>10</div>
              <div>24</div>
            </div>
            <div className="hero-text mt-4 text-xs uppercase tracking-[0.35em] text-white/90">
              Wedding Invitation
            </div>
          </div>
          <div
            className="absolute inset-x-0 -bottom-1 z-20"
            style={{ transform: `translateY(${(1 - inviteLift) * 45}vh)` }}
          >
            <div className="mx-auto w-full max-w-[420px] px-4">
              <div className="overflow-hidden  border border-neutral-200/70 bg-white/95 shadow-[0_14px_32px_rgba(40,35,30,0.08)]">
                <InvitationSection withDivider={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
