"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import SectionCard from "@/components/SectionCard";

type Contact = {
  label: string;
  name: string;
  phone: string;
};

const groomContacts: Contact[] = [
  { label: "신랑", name: "김진호", phone: "010-1234-5678" },
  { label: "신랑 아버지", name: "김건호", phone: "010-2222-1111" },
  { label: "신랑 어머니", name: "김어머니", phone: "010-3333-4444" },
];

const brideContacts: Contact[] = [
  { label: "신부", name: "이나연", phone: "010-5555-6666" },
  { label: "신부 아버지", name: "이주모", phone: "010-7777-8888" },
  { label: "신부 어머니", name: "이수진", phone: "010-9999-0000" },
];

export default function ContactSection() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener("open-contact-modal", handler);
    return () => window.removeEventListener("open-contact-modal", handler);
  }, []);

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleSms = (phone: string) => {
    window.location.href = `sms:${phone}`;
  };

  return (
    <SectionCard className="text-center">
      <Reveal className="serif text-sm tracking-[0.3em] text-neutral-500">
        CONTACT
      </Reveal>
      <Reveal className="mt-3 text-2xl">연락하기</Reveal>
      <Reveal className="mt-6">
        <button
          type="button"
          className="ui-rounded h-12 w-full border border-neutral-200 bg-white text-sm font-medium shadow-sm"
          onClick={() => setIsOpen(true)}
        >
          연락하기
        </button>
      </Reveal>

      {isOpen ? (
        <div className="fixed inset-0 z-50 bg-black/50 px-4 py-10" role="dialog" aria-modal="true">
          <div className="ui-rounded relative mx-auto w-full max-w-[420px] bg-[#5b4f51] p-6 text-white shadow-xl">
            <button
              type="button"
              className="absolute right-4 top-4 text-lg text-white/70"
              onClick={() => setIsOpen(false)}
              aria-label="연락하기 닫기"
            >
              ×
            </button>

            <p className="serif text-xs tracking-[0.3em] text-white/70">CONTACT</p>
            <p className="mt-2 text-xl">연락하기</p>

            <div className="mt-6 text-sm">
              <p className="text-xs text-white/60">신랑측 GROOM</p>
              <div className="mt-3 space-y-3 border-t border-white/20 pt-3">
                {groomContacts.map((person) => (
                  <div key={person.phone} className="flex items-center justify-between gap-3 text-sm">
                    <div className="min-w-0">
                      <p className="text-white/70">{person.label}</p>
                      <p className="truncate font-medium text-white">{person.name}</p>
                      <p className="text-xs text-white/60">{person.phone}</p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        className="ui-rounded bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20"
                        onClick={() => handleCall(person.phone)}
                        aria-label={`${person.name}에게 전화`}
                      >
                        전화
                      </button>
                      <button
                        type="button"
                        className="ui-rounded bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20"
                        onClick={() => handleSms(person.phone)}
                        aria-label={`${person.name}에게 문자`}
                      >
                        문자
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 text-sm">
              <p className="text-xs text-white/60">신부측 BRIDE</p>
              <div className="mt-3 space-y-3 border-t border-white/20 pt-3">
                {brideContacts.map((person) => (
                  <div key={person.phone} className="flex items-center justify-between gap-3 text-sm">
                    <div className="min-w-0">
                      <p className="text-white/70">{person.label}</p>
                      <p className="truncate font-medium text-white">{person.name}</p>
                      <p className="text-xs text-white/60">{person.phone}</p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        className="ui-rounded bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20"
                        onClick={() => handleCall(person.phone)}
                        aria-label={`${person.name}에게 전화`}
                      >
                        전화
                      </button>
                      <button
                        type="button"
                        className="ui-rounded bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20"
                        onClick={() => handleSms(person.phone)}
                        aria-label={`${person.name}에게 문자`}
                      >
                        문자
                      </button>
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
