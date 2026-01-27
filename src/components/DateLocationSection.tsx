"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import SectionCard from "@/components/SectionCard";

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const targetDate = new Date("2026-10-24T14:00:00+09:00");

const getCountdown = (): Countdown => {
  const diff = Math.max(0, targetDate.getTime() - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
};

export default function DateLocationSection() {
  const [countdown, setCountdown] = useState<Countdown>(getCountdown());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SectionCard className="text-center">
      <Reveal className="serif text-sm tracking-[0.3em] text-neutral-500">
        DATE
      </Reveal>
      <Reveal className="mt-3 text-2xl">2026.10.24</Reveal>
      <Reveal className="mt-1 text-sm text-neutral-500">토요일 오후 2시</Reveal>
      <Reveal className="mt-6 grid grid-cols-4 gap-2 text-sm">
        {[
          { label: "DAYS", value: countdown.days },
          { label: "HOUR", value: countdown.hours },
          { label: "MIN", value: countdown.minutes },
          { label: "SEC", value: countdown.seconds },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-neutral-200/70 bg-white py-3"
          >
            <p className="text-[10px] tracking-[0.2em] text-neutral-400">
              {item.label}
            </p>
            <p className="mt-1 text-lg font-semibold text-neutral-700">
              {String(item.value).padStart(2, "0")}
            </p>
          </div>
        ))}
      </Reveal>
      <Reveal className="mt-5 text-sm text-neutral-500">
        진호, 나은의 결혼식이 {countdown.days}일 남았습니다.
      </Reveal>
    </SectionCard>
  );
}
