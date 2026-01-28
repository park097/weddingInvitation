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
  { label: "신랑", name: "김진호", phone: "010-1234-5678" },
  { label: "신랑 아버지", name: "김건호", phone: "010-2222-1111" },
  { label: "신랑 어머니", name: "김어머니", phone: "010-3333-4444" },
];

const brideContacts: Contact[] = [
  { label: "신부", name: "이나연", phone: "010-5555-6666" },
  { label: "신부 아버지", name: "이주모", phone: "010-7777-8888" },
  { label: "신부 어머니", name: "이수진", phone: "010-9999-0000" },
];

type InvitationSectionProps = {
  withDivider?: boolean;
};

export default function InvitationSection({
  withDivider = true,
}: InvitationSectionProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleSms = (phone: string) => {
    window.location.href = `sms:${phone}`;
  };

  return (
    <section className="pt-10">
      <SectionCard className="text-center">
        <Reveal initialVisible className="text-xs tracking-[0.3em] text-neutral-500">
          INVITATION
        </Reveal>
        <Reveal initialVisible className="mt-2 text-xl font-semibold text-[#b57b5c]">
          소중한 분들을 초대합니다
        </Reveal>

        <Reveal
          initialVisible
          className="mt-6 text-sm leading-7 text-neutral-600"
        >
          저희 두 사람의 작은 만남이
          <br />
          사랑의 결실을 이루어
          <br />
          소중한 결혼식을 올리게 되었습니다.
          <br />
          <br />
          평생 서로 귀하게 여기며
          <br />
          첫 마음 그대로 존중하고 배려하며 살겠습니다.
          <br />
          <br />
          오로지 믿음과 사랑을 약속하는 날
          <br />
          오셔서 축복해 주시면 더없는 기쁨으로
          <br />
          간직하겠습니다.
        </Reveal>

        <Reveal className="mt-8">
          <div className="ui-rounded relative mx-auto w-full max-w-[320px] overflow-hidden">
            <Image
              src="/gallery-1.svg"
              alt="Wedding portrait"
              width={640}
              height={300}
              className="h-[300px] w-full object-cover"
            />
          </div>
        </Reveal>

        <Reveal
          initialVisible
          className="mt-6 text-sm leading-7 text-neutral-600"
        >
          김건호 · 김어머니의 아들 김진호
          <br />
          이주모 · 이수진의 딸 이나연
        </Reveal>

        <Reveal initialVisible className="mt-3">
          <button
            type="button"
            className="ui-rounded h-12 w-40 border border-neutral-200 bg-white px-6 font-medium"
            onClick={() => setIsContactOpen(true)}
            >
            <span className="mr-2 text-black" aria-hidden="true">☏</span>
            연락하기
          </button>
        </Reveal>

        {isContactOpen ? (
          <div className="fixed inset-0 z-50 bg-black/50 px-4 py-10" role="dialog" aria-modal="true">
            <div className="ui-rounded relative mx-auto w-full max-w-[420px] bg-[#5b4f51] p-6 text-white shadow-xl">
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
                        ☎
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
                        ☎
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
