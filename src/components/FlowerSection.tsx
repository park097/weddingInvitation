"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import SectionCard from "@/components/SectionCard";

declare global {
  interface Window {
    Kakao?: {
      isInitialized: () => boolean;
      init: (key: string) => void;
      Link: {
        sendDefault: (options: Record<string, unknown>) => void;
      };
    };
  }
}

const KAKAO_SDK_SRC = "https://developers.kakao.com/sdk/js/kakao.min.js";

export default function FlowerSection() {
  const [isSdkReady, setIsSdkReady] = useState(false);

  const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.location.href;
  }, []);

  useEffect(() => {
    if (!kakaoKey) return;

    if (window.Kakao?.isInitialized()) {
      setIsSdkReady(true);
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${KAKAO_SDK_SRC}"]`
    );

    const onReady = () => {
      try {
        if (!window.Kakao?.isInitialized()) {
          window.Kakao?.init(kakaoKey);
        }
        setIsSdkReady(true);
      } catch (error) {
        setIsSdkReady(false);
      }
    };

    if (existing) {
      existing.addEventListener("load", onReady);
      if (window.Kakao) onReady();
      return () => existing.removeEventListener("load", onReady);
    }

    const script = document.createElement("script");
    script.src = KAKAO_SDK_SRC;
    script.async = true;
    script.onload = onReady;
    document.head.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, [kakaoKey]);

  const handleKakaoShare = useCallback(() => {
    const url = shareUrl || (typeof window !== "undefined" ? window.location.href : "");

    if (!kakaoKey || !isSdkReady || !window.Kakao) {
      window.alert("카카오톡 공유 설정이 필요합니다. 관리자에게 문의해주세요.");
      return;
    }

    try {
      window.Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: "청첩장 링크",
          description: "소중한 날에 초대합니다.",
          imageUrl: `${window.location.origin}/flower-photo.svg`,
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
        buttons: [
          {
            title: "청첩장 보기",
            link: {
              mobileWebUrl: url,
              webUrl: url,
            },
          },
        ],
      });
    } catch (error) {
      window.alert("카카오톡 공유를 열지 못했습니다. 잠시 후 다시 시도해주세요.");
    }
  }, [isSdkReady, kakaoKey, shareUrl]);

  return (
    <SectionCard className="p-0">
      <Reveal className="p-0">
        <div className="relative -mx-6 h-[88vh] w-[calc(100%+3rem)] overflow-hidden">
          <Image
            src="/flower-photo.svg"
            alt="Wedding photo"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/85 via-white/35 to-transparent" />

          <div className="absolute bottom-28 left-6 right-6 text-left text-sm font-medium text-white drop-shadow-[0_6px_12px_rgba(0,0,0,0.35)]">
            함께하려다, 세상이 다 겨울이어도
            <br />
            우리 사랑은 봄처럼 따뜻하고
            <br />
            간혹, 먹구름 뜰겨도 견딥니다.
            <br />
            이수동, 사랑가
          </div>

          <button
            type="button"
            onClick={handleKakaoShare}
            className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap text-sm font-medium text-[#3a332f] no-underline"
          >
            <span className="ui-rounded inline-flex h-6 w-6 items-center justify-center bg-[#FEE500] text-[11px] font-bold text-black">
              K
            </span>
            카카오톡으로 초대장 보내기
          </button>
        </div>
      </Reveal>
    </SectionCard>
  );
}
