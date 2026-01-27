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
          함께한 모든 순간이 감사했고,
          <br />
          이제 두 사람이 한 길을 걸어가려 합니다.
          <br />
          따뜻한 마음으로 축복해 주세요.
        </Reveal>
        <Reveal
          initialVisible
          className="mt-6 text-base leading-7 text-neutral-600"
        >
          김진호 · 이나연
          <br />
          김건호 · 김어머니의 장남
          <br />
          이주모 · 이수진의 장녀
        </Reveal>
        <Reveal initialVisible className="mt-2">
          <button
            type="button"
            className="ui-rounded h-12 w-32 border border-neutral-200 bg-white text-sm font-medium shadow-sm"
            onClick={() => window.dispatchEvent(new Event("open-contact-modal"))}
          >
            연락하기
          </button>
        </Reveal>
      </SectionCard>
    </section>
  );
}
