"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionCard from "@/components/SectionCard";

type KakaoLatLng = { __kakaoLatLng: true };

type KakaoMap = {
  setCenter: (coords: KakaoLatLng) => void;
};

type KakaoGeocoderResult = {
  x: string;
  y: string;
};

type KakaoMaps = {
  load: (callback: () => void) => void;
  Map: new (container: HTMLElement, options: { center: KakaoLatLng; level: number }) => KakaoMap;
  LatLng: new (lat: number, lng: number) => KakaoLatLng;
  Marker: new (options: { map: KakaoMap; position: KakaoLatLng }) => void;
  services: {
    Geocoder: new () => {
      addressSearch: (
        address: string,
        callback: (result: KakaoGeocoderResult[], status: string) => void
      ) => void;
    };
    Status: { OK: string };
  };
};

type KakaoGlobal = {
  maps: KakaoMaps;
};

const Dot = ({ color }: { color: string }) => (
  <span
    className="mt-[2px] inline-block h-2.5 w-2.5 shrink-0 rounded-full"
    style={{ backgroundColor: color }}
    aria-hidden="true"
  />
);

export default function MapSection() {
  const venueName = "마렌지9";
  const venueAddress = "서울 중구 을지로 264 9층 9001호";
  const kakaoMapUrl = `https://map.kakao.com/link/search/${encodeURIComponent(venueAddress)}`;
  const naverMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(venueAddress)}`;

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<KakaoMap | null>(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;
    if (!key || !mapRef.current || mapInstanceRef.current) {
      return;
    }

    const initMap = () => {
      const kakao = (window as Window & { kakao?: KakaoGlobal }).kakao;
      if (!kakao?.maps || !mapRef.current || mapInstanceRef.current) {
        return;
      }

      kakao.maps.load(() => {
        if (!mapRef.current || mapInstanceRef.current) {
          return;
        }

        const map = new kakao.maps.Map(mapRef.current, {
          center: new kakao.maps.LatLng(37.5665, 126.9780),
          level: 3,
        });

        mapInstanceRef.current = map;
        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch(venueAddress, (result: KakaoGeocoderResult[], status: string) => {
          if (status === kakao.maps.services.Status.OK && result[0]) {
            const coords = new kakao.maps.LatLng(Number(result[0].y), Number(result[0].x));
            map.setCenter(coords);
            new kakao.maps.Marker({ map, position: coords });
          }
        });
      });
    };

    const existingScript = document.getElementById("kakao-map-sdk");
    if (existingScript) {
      const existingKakao = (window as Window & { kakao?: KakaoGlobal }).kakao;
      if (existingKakao?.maps) {
        initMap();
      } else {
        existingScript.addEventListener("load", initMap, { once: true });
      }
      return;
    }

    const script = document.createElement("script");
    script.id = "kakao-map-sdk";
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false&libraries=services`;
    script.async = true;
    script.addEventListener("load", initMap);
    document.head.appendChild(script);
  }, [venueAddress]);

  return (
    <SectionCard className="text-center">
      <Reveal className="serif text-sm tracking-[0.3em] text-neutral-500">
        LOCATION
      </Reveal>
      <Reveal className="mt-3 text-xl font-medium text-[#b57b5c]">
        {venueName}
      </Reveal>
      <Reveal className="mt-1 text-sm text-neutral-500">
        {venueAddress}
      </Reveal>

      <Reveal className="mt-5 ui-rounded overflow-hidden border border-neutral-200/70">
        <div
          ref={mapRef}
          className="h-[260px] w-full bg-neutral-100 sm:h-[320px]"
          aria-label="카카오맵 위치"
        />
      </Reveal>

      <Reveal className="mt-5">
        <button
          type="button"
          className="ui-rounded inline-flex h-12 w-full items-center justify-center gap-2 border border-neutral-200 bg-white text-sm font-medium text-neutral-700"
          onClick={() => setIsMapModalOpen(true)}
        >
          <span className="flex h-4 w-4 items-center justify-center" aria-hidden="true">
            <Image src="/icon/mapIcon.png" alt="" width={16} height={16} />
          </span>
          약도 이미지 보기
        </button>
      </Reveal>

      <Reveal className="mt-6 text-left text-sm text-neutral-600">
        <div className="border-t border-dashed border-neutral-200 pt-5">
          <p className="font-semibold text-neutral-800">네비게이션</p>
          <p className="mt-2 text-xs text-neutral-500">
            원하시는 앱을 선택하시면 길안내가 시작됩니다.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <a
              href={naverMapUrl}
              target="_blank"
              rel="noreferrer"
              className="ui-rounded inline-flex h-11 items-center justify-center gap-2 border border-neutral-200 bg-white text-xs font-medium text-neutral-700"
            >
              <Image src="/icon/naver.png" alt="네이버지도" width={22} height={22} />
              네이버지도
            </a>
            {/* <a
              href={tmapUrl}
              target="_blank"
              rel="noreferrer"
              className="ui-rounded inline-flex h-11 items-center justify-center gap-2 border border-neutral-200 bg-white text-xs font-medium text-neutral-700"
            >
              <Image src="/icon/tmap.jpeg" alt="티맵" width={22} height={22} />
              티맵
            </a> */}
            <a
              href={kakaoMapUrl}
              target="_blank"
              rel="noreferrer"
              className="ui-rounded inline-flex h-11 items-center justify-center gap-3 border border-neutral-200 bg-white text-xs font-medium text-neutral-700"
            >
              <Image src="/icon/kakaomap.png" alt="카카오내비" width={22} height={22} />
              카카오네비
            </a>
          </div>
        </div>

        <section className="mt-6 border-t border-dashed border-neutral-200 pt-5">
          <p className="font-semibold text-neutral-800">지하철</p>
          <div className="mt-3 space-y-2">
            <p className="flex items-start gap-2">
              <Dot color="#00A84D" />
              <span>2호선 동대문역사문화공원역 11번 출구에서 91m</span>
            </p>
            <p className="flex items-start gap-2">
              <Dot color="#00A5DE" />
              <span>4호선 동대문역사문화공원역 11,12번 출구</span>
            </p>
            <p className="flex items-start gap-2">
              <Dot color="#8E4EC6" />
              <span>5호선 동대문역사문화공원역</span>
            </p>
          </div>
          <p className="mt-3 text-xs text-neutral-500">
            마렌지9건물(롯데던던) 지하2층 출입구와 직접 연결
          </p>
        </section>

        <section className="mt-6 border-t border-dashed border-neutral-200 pt-5">
          <p className="font-semibold text-neutral-800">버스</p>
          <div className="mt-3 space-y-2">
            <p className="flex items-start gap-2">
              <Dot color="#1f4ba5" />
              <span>간선버스: 100, 105, 144, 301, 420</span>
            </p>
            <p className="flex items-start gap-2">
              <Dot color="#2d8a4f" />
              <span>지선버스: 7212</span>
            </p>
            <p className="flex items-start gap-2">
              <Dot color="#e26b20" />
              <span>공항버스: 6702</span>
            </p>
          </div>
        </section>

        <section className="mt-6 border-t border-dashed border-neutral-200 pt-5">
          <p className="font-semibold text-neutral-800">주차</p>
          <p className="mt-2 text-neutral-700">200대 이상 주차 가능</p>
        </section>
      </Reveal>

      {isMapModalOpen ? (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 px-4 pb-4 sm:items-center sm:pb-0"
          role="dialog"
          aria-modal="true"
        >
          <div className="ui-rounded w-full max-w-[520px] max-h-[85vh] overflow-y-auto bg-white p-4 shadow-2xl translate-y-[55px] sm:translate-y-[280px]">
            <div className="flex items-center">
              <button
                type="button"
                className="ui-rounded ml-auto px-2 py-1 text-sm text-neutral-500"
                onClick={() => setIsMapModalOpen(false)}
              >
                닫기
              </button>
            </div>
            <div className="mt-3 overflow-hidden ui-rounded border  border-neutral-200/70">
              <Image
                src="/img/map.jpg"
                alt="약도 이미지"
                width={1000}
                height={1400}
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      ) : null}
    </SectionCard>
  );
}
