"use client";

import Reveal from "@/components/Reveal";
import SectionCard from "@/components/SectionCard";

type InvitationSectionProps = {
  withDivider?: boolean;
};

export default function InvitationSection({
  withDivider = true,
}: InvitationSectionProps) {
  return (
    <section className="pt-8">
      <SectionCard className="text-center">
        <Reveal initialVisible className="serif text-4xl">
          결혼합니다
        </Reveal>
        <Reveal
          initialVisible
          className="mt-2 text-sm tracking-[0.2em] text-neutral-500"
        >
          2026.10.24
        </Reveal>
        <Reveal
          initialVisible
          className="mt-6 text-base leading-7 text-neutral-600"
        >
          소중한 분들을 초대합니다.
          <br />
          저희 두 사람의 작은 만남이 사랑의 결실을 이루어
          <br />
          소중한 결혼식을 올리게 되었습니다.
          <br />
          평생 서로 귀하게 여기며 첫 마음 그대로 존중하고 배려하며
          살아가겠습니다.
        </Reveal>
        <Reveal
          initialVisible
          className="mt-6 text-base leading-7 text-neutral-600"
        >
          김진호 · 이미자 의 아들 김진호
          <br />
          이주명 · 유수지 의 딸 이나은
        </Reveal>
        <Reveal initialVisible className="mt-2">
          <button
            type="button"
            className="h-12 w-30 rounded-xl border border-neutral-200 bg-white text-sm font-medium shadow-sm"
            onClick={() => window.dispatchEvent(new Event("open-contact-modal"))}
          >
           ☏ 연락하기
          </button>
        </Reveal>
      </SectionCard>
    </section>
  );
}
