"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import SectionCard from "@/components/SectionCard";

const groomContacts = [
  { label: "신랑", name: "김진호", phone: "010-1234-5678" },
  { label: "신랑 아버지", name: "김건호", phone: "010-2222-1111" },
  { label: "신랑 어머니", name: "이미자", phone: "010-3333-4444" },
];

const brideContacts = [
  { label: "신부", name: "이나은", phone: "010-5555-6666" },
  { label: "신부 아버지", name: "이주명", phone: "010-7777-8888" },
  { label: "신부 어머니", name: "유수지", phone: "010-9999-0000" },
];

export default function ContactSection() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener("open-contact-modal", handler as EventListener);
    return () =>
      window.removeEventListener("open-contact-modal", handler as EventListener);
  }, []);

  return (
    <SectionCard className="text-center">
      <Reveal className="serif text-sm tracking-[0.3em] text-neutral-500">
        CONTACT
      </Reveal>
      <Reveal className="mt-3 text-2xl">연락하기</Reveal>
      <Reveal className="mt-6">
        <button
          type="button"
          className="h-12 w-full rounded-full border border-neutral-200 bg-white text-sm font-medium shadow-sm"
          onClick={() => setIsOpen(true)}
        >
          연락하기
        </button>
      </Reveal>

      {isOpen ? (
        <div className="fixed inset-0 z-50 bg-black/50 px-4 py-10">
          <div className="relative mx-auto w-full max-w-[420px] rounded-3xl bg-[#5b4f51] p-6 text-white">
            <button
              type="button"
              className="absolute right-4 top-4 text-lg text-white/70"
              onClick={() => setIsOpen(false)}
              aria-label="연락하기 닫기"
            >
              ✕
            </button>
            <p className="serif text-xs tracking-[0.3em] text-white/70">
              CONTACT
            </p>
            <p className="mt-2 text-xl">연락하기</p>

            <div className="mt-6 text-sm">
              <p className="text-xs text-white/60">신랑측 GROOM</p>
              <div className="mt-3 space-y-3 border-t border-white/20 pt-3">
                {groomContacts.map((person) => (
                  <div
                    key={person.phone}
                    className="flex items-center justify-between text-sm"
                  >
                    <p className="text-white/70">{person.label}</p>
                    <p className="font-medium text-white">{person.name}</p>
                    <div className="flex gap-2 text-white/70">
                      <span>☎</span>
                      <span>✉</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 text-sm">
              <p className="text-xs text-white/60">신부측 BRIDE</p>
              <div className="mt-3 space-y-3 border-t border-white/20 pt-3">
                {brideContacts.map((person) => (
                  <div
                    key={person.phone}
                    className="flex items-center justify-between text-sm"
                  >
                    <p className="text-white/70">{person.label}</p>
                    <p className="font-medium text-white">{person.name}</p>
                    <div className="flex gap-2 text-white/70">
                      <span>☎</span>
                      <span>✉</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </SectionCard>
  );
}
