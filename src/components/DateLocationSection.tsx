"use client";

import { useEffect, useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import SectionCard from "@/components/SectionCard";

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const targetDate = new Date("2026-04-26T12:30:00+09:00");

const getCountdown = (): Countdown => {
  const diff = Math.max(0, targetDate.getTime() - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
};

const INITIAL_COUNTDOWN: Countdown = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

const CALENDAR_YEAR = 2026;
const CALENDAR_MONTH_INDEX = 3; 

export default function DateLocationSection() {
  const [countdown, setCountdown] = useState<Countdown>(INITIAL_COUNTDOWN);

  useEffect(() => {
    setCountdown(getCountdown());

    const interval = setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const calendarCells = useMemo(() => {
    const firstDay = new Date(CALENDAR_YEAR, CALENDAR_MONTH_INDEX, 1).getDay();
    const daysInMonth = new Date(CALENDAR_YEAR, CALENDAR_MONTH_INDEX + 1, 0).getDate();
    const cells: Array<number | null> = Array.from({ length: firstDay }, () => null);
    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push(day);
    }
    return cells;
  }, []);

  const timeParts = [
    { label: "DAYS", value: countdown.days },
    { label: "HOUR", value: countdown.hours },
    { label: "MIN", value: countdown.minutes },
    { label: "SEC", value: countdown.seconds },
  ];

  return (
    <SectionCard className="text-center mt-3">
      <Reveal className="text-2xl font-semibold text-neutral-700">2026.04.26</Reveal>
      <Reveal className="mt-1 text-sm text-neutral-500">일요일 오후 12시30분</Reveal>

      <Reveal className="mt-6">
        <div className="mx-auto h-px w-full max-w-[280px] bg-neutral-200/70" />
        <div className="mt-4 grid grid-cols-7 gap-y-3 text-sm">
          {["일", "월", "화", "수", "목", "금", "토"].map((label, index) => (
            <div
              key={label}
              className={`text-xs font-medium ${index === 0 ? "text-[#d28b8b]" : "text-neutral-500"}`}
            >
              {label}
            </div>
          ))}
          {calendarCells.map((day, index) => {
            if (!day) return <div key={`empty-${index}`} />;
            const isTarget = day === 26;
            return (
              <div
                key={day}
                className={`mx-auto flex h-8 w-8 items-center justify-center text-sm ${
                  isTarget
                    ? "rounded-full bg-[#f2a7a7] text-white"
                    : "text-neutral-600"
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>
        <div className="mt-6 mx-auto h-px w-full max-w-[280px] bg-neutral-200/70" />
      </Reveal>

      <Reveal className="mt-5">
        <div className="mx-auto grid w-full max-w-[280px] grid-cols-4 text-[10px] uppercase tracking-[0.22em] text-neutral-400">
          {timeParts.map((item) => (
            <div key={item.label}>{item.label}</div>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-center gap-2 text-lg font-semibold text-neutral-700">
          <span>{String(countdown.days).padStart(2, "0")}</span>
          <span className="text-neutral-300">:</span>
          <span>{String(countdown.hours).padStart(2, "0")}</span>
          <span className="text-neutral-300">:</span>
          <span>{String(countdown.minutes).padStart(2, "0")}</span>
          <span className="text-neutral-300">:</span>
          <span>{String(countdown.seconds).padStart(2, "0")}</span>
        </div>
      </Reveal>

      <Reveal className="mt-4 text-sm text-neutral-500">
        충기, 은화의 결혼식이 {countdown.days}일 남았습니다.
      </Reveal>
    </SectionCard>
  );
}
