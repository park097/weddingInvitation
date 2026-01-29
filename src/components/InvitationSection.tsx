"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import SectionCard from "@/components/SectionCard";

type Contact = {
  label: string;
  name: string;
  phone: string;
};

const groomContacts: Contact[] = [
  { label: "신랑", name: "이충기", phone: "010-1234-5678" },
  { label: "신랑 아버지", name: "이건호", phone: "010-2222-1111" },
  { label: "신랑 어머니", name: "이어머니", phone: "010-3333-4444" },
];

const brideContacts: Contact[] = [
  { label: "신부", name: "주은화", phone: "010-5555-6666" },
  { label: "신부 아버지", name: "주주모", phone: "010-7777-8888" },
  { label: "신부 어머니", name: "주수진", phone: "010-9999-0000" },
];

type InvitationSectionProps = {
  withDivider?: boolean;
};

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
    <path
      fill="currentColor"
      d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1 .33 2.1.5 3.2.5a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.8 21 3 13.2 3 3a1 1 0 0 1 1-1h3.55a1 1 0 0 1 1 1c0 1.1.17 2.2.5 3.2a1 1 0 0 1-.25 1z"
    />
  </svg>
);


export default function InvitationSection({
  withDivider = true,
}: InvitationSectionProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section className="pt-10">
      <SectionCard className="text-center">
        <Reveal className="text-xs tracking-[0.3em] text-neutral-500">
          INVITATION
        </Reveal>
        <Reveal className="mt-2 text-xl font-semibold text-[#b57b5c]">
          소중한 분들을 초대합니다
        </Reveal>

        <Reveal className="mt-6 text-sm leading-7 text-neutral-600">
          함께한 모든 순간이 감사했고
          <br />
          이제 두 사람이 한 길을 걸어가려 합니다.
          <br />
          따뜻한 마음으로 축복해 주세요.
        </Reveal>

        <Reveal className="mt-8">
          <div className="ui-rounded relative mx-auto w-full max-w-[320px] overflow-hidden">
            <Image
              src="/img/img4.jpg"
              alt="Wedding portrait"
              width={640}
              height={300}
              className="h-[300px] w-full object-cover"
            />
          </div>
        </Reveal>

        <Reveal className="mt-6 text-sm leading-7 text-neutral-600">
          김건호 · 김어머니의 장남
          <br />
          이주모 · 이수진의 장녀
        </Reveal>

        <Reveal className="mt-3">
          <button
            type="button"
            className="ui-rounded inline-flex h-12 w-40 items-center justify-center gap-2 border border-neutral-200 bg-white px-6 font-medium"
            onClick={() => setIsContactOpen(true)}
          >
            <PhoneIcon />
            연락하기
          </button>
        </Reveal>

        {isContactOpen ? (
          <div className="fixed inset-0 z-50 bg-black/50 px-4 py-10" role="dialog" aria-modal="true">
            <div className="ui-rounded relative mx-auto w-full max-w-[420px] translate-y-230 bg-[#5b4f51] p-6 text-white shadow-xl">
              <button
                type="button"
                className="absolute right-4 top-4 text-lg text-white/70"
                onClick={() => setIsContactOpen(false)}
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
                      <a  href={`tel:${person.phone}`}
                        className="ui-rounded bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20 inline-flex items-center justify-center"
                        aria-label={`${person.name}에게 전화`}>
                      <PhoneIcon />
                      </a>
                      <a href={`sms:${person.phone}`}
                        className="ui-rounded bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20 inline-flex items-center justify-center"
                        aria-label={`${person.name}에게 문자`}>
                        ✉
                      </a>
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
                      <a
                        href={`tel:${person.phone}`}
                        className="ui-rounded bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20 inline-flex items-center justify-center"
                        aria-label={`${person.name}에게 전화`}
                      >
                      <PhoneIcon />
                      </a>
                      <a
                        href={`sms:${person.phone}`}
                        className="ui-rounded bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20 inline-flex items-center justify-center"
                        aria-label={`${person.name}에게 문자`}
                      >
                        ✉
                      </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </SectionCard>
    </section>
  );
}
