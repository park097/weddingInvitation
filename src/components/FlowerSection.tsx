"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import SectionCard from "@/components/SectionCard";

export default function FlowerSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SectionCard className="text-center">
      {/* <Reveal>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex w-full items-center justify-between rounded-2xl border border-neutral-200/70 bg-white px-4 py-4 text-left shadow-sm"
        >
          <div>
            <p className="text-sm font-medium text-neutral-800">
              축하 화환 보내기
            </p>
            <p className="mt-1 text-xs text-neutral-500">
              축하하는 마음을 전해보세요.
            </p>
          </div>
          <span className="text-xl">💐</span>
        </button>
      </Reveal> */}

      <Reveal className="mt-6 overflow-hidden rounded-3xl border border-neutral-200/70">
        <div className="relative aspect-[3/4] w-full">
          <Image
            src="/flower-photo.svg"
            alt="Wedding photo"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-left text-sm text-white">
            장담하건대, 세상이 다 겨울이어도
            <br />
            우리 사랑은 늘 봄처럼 따뜻하고
            <br />
            간혹, 여름처럼 뜨거울 겁니다.
            <br />
            이수동, 사랑가
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-4">
        <button className="h-12 w-full rounded-full border border-neutral-200 bg-white text-sm font-medium shadow-sm">
          카카오톡으로 초대장 보내기
        </button>
      </Reveal>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-[420px] rounded-3xl bg-white p-6">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <p className="text-sm font-medium">축하 화환 보내기</p>
              <button
                type="button"
                className="text-lg text-neutral-500"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="mt-5 space-y-3 text-sm text-neutral-600">
              <p>신랑, 신부의 결혼을 축하해주세요.</p>
              <p>예식일에 맞춰 화환을 배송드립니다.</p>
              <div className="space-y-2 text-xs text-neutral-500">
                <p>신랑 김진호 & 신부 이나은</p>
                <p>2026년 10월 24일 토요일 오후 2시</p>
                <p>더채플앳청담 커티지홀, 3층</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="h-12 rounded-xl bg-neutral-900 text-sm font-medium text-white">
                축하 화환 보내기
              </button>
              <button
                type="button"
                className="h-12 rounded-xl border border-neutral-200 text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </SectionCard>
  );
}
