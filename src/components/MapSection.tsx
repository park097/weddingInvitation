import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionCard from "@/components/SectionCard";

export default function MapSection() {
  return (
    <SectionCard className="text-center">
      <Reveal className="serif text-sm tracking-[0.3em] text-neutral-500">
        LOCATION
      </Reveal>
      <Reveal className="mt-3 text-lg">더채플앳청담 커티지홀, 3층</Reveal>
      <Reveal className="mt-1 text-sm text-neutral-500">
        서울 강남구 선릉로 757
      </Reveal>
      <Reveal className="mt-2 text-sm text-neutral-500">Tel. 02-421-1121</Reveal>
      <Reveal className="mt-5 overflow-hidden rounded-2xl border border-neutral-200/70">
        <Image
          src="/map.svg"
          alt="Map preview"
          width={800}
          height={520}
          className="h-auto w-full"
        />
      </Reveal>
      <Reveal className="mt-5">
        <button className="h-12 w-full rounded-full border border-neutral-200 bg-white text-sm font-medium shadow-sm">
          약도 이미지 보기
        </button>
      </Reveal>
      <Reveal className="mt-6 text-left text-sm text-neutral-600">
        <p className="font-medium text-neutral-700">지하철</p>
        <p className="mt-2">7호선 강남구청역 3-1번 출구</p>
        <p className="mt-1">분당선 강남구청역 3-1번 출구</p>
        <p className="mt-3 font-medium text-neutral-700">버스</p>
        <p className="mt-2">간선: 301, 342, 472</p>
        <p className="mt-1">지선: 3011, 4312</p>
      </Reveal>
    </SectionCard>
  );
}
