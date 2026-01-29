import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionCard from "@/components/SectionCard";

const Dot = ({ color }: { color: string }) => (
  <span
    className="mt-[2px] inline-block h-2.5 w-2.5 shrink-0 rounded-full"
    style={{ backgroundColor: color }}
    aria-hidden="true"
  />
);

export default function MapSection() {
  const venueAddress = "서울 강남구 테헤란로 757";
  const kakaoMapUrl = `https://map.kakao.com/link/search/${encodeURIComponent(venueAddress)}`;
  const naverMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(venueAddress)}`;
  const tmapUrl = `https://apis.openapi.sk.com/tmap/app/search?name=${encodeURIComponent(venueAddress)}`;

  return (
    <SectionCard className="text-center">
      <Reveal className="serif text-sm tracking-[0.3em] text-neutral-500">
        LOCATION
      </Reveal>
      <Reveal className="mt-3 text-lg font-medium text-neutral-800">
        채플웨딩홀 컨벤션, 3층
      </Reveal>
      <Reveal className="mt-1 text-sm text-neutral-500">
        {venueAddress}
      </Reveal>
      <Reveal className="mt-2 text-sm text-neutral-500">Tel. 02-421-1121</Reveal>

      <Reveal className="mt-5 ui-rounded overflow-hidden border border-neutral-200/70">
        <Image
          src="/map.svg"
          alt="Map preview"
          width={800}
          height={520}
          className="h-auto w-full"
        />
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
              className="ui-rounded inline-flex h-11 items-center justify-center gap-2 border border-neutral-200 bg-white text-s font-medium text-neutral-700"
            >
              <Image src="/icon/naver.png" alt="네이버지도" width={24} height={24} />
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
              className="ui-rounded inline-flex h-11 items-center justify-center gap-3 border border-neutral-200 bg-white text-s font-medium text-neutral-700"
            >
              <Image src="/icon/kakaomap.png" alt="카카오내비" width={22} height={22} />
              카카오내비
            </a>
          </div>
        </div>

        <section className="mt-6 border-t border-dashed border-neutral-200 pt-5">
          <p className="font-semibold text-neutral-800">지하철</p>
          <div className="mt-3 space-y-2">
            <p className="flex items-start gap-2">
              <Dot color="#6b7d3a" />
              <span>7호선 강남구청역 3-1번 출구</span>
            </p>
            <p className="flex items-start gap-2">
              <Dot color="#d4a11e" />
              <span>분당선 강남구청역 3-1번 출구</span>
            </p>
          </div>
          <p className="mt-3 text-xs text-neutral-500">좌측 방향 570m 도보 후 좌측 건물</p>
        </section>

        <section className="mt-6 border-t border-dashed border-neutral-200 pt-5">
          <p className="font-semibold text-neutral-800">셔틀버스</p>
          <p className="mt-3 text-neutral-700">
            강남구청역 <span className="text-[#6b7d3a]">(7호선)</span>,
            <span className="text-[#d4a11e]"> (분당선)</span> 3번 출구 앞
          </p>
        </section>

        <section className="mt-6 border-t border-dashed border-neutral-200 pt-5">
          <p className="font-semibold text-neutral-800">버스</p>
          <div className="mt-3 space-y-2">
            <p className="flex items-start gap-2">
              <Dot color="#1f4ba5" />
              <span>간선버스: 301, 342, 472</span>
            </p>
            <p className="flex items-start gap-2">
              <Dot color="#2d8a4f" />
              <span>지선버스: 3011, 4312</span>
            </p>
          </div>
        </section>
      </Reveal>
    </SectionCard>
  );
}
