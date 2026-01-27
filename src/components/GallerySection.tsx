"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import SectionCard from "@/components/SectionCard";

const baseImages = [
  { src: "/gallery-1.svg", alt: "Wedding portrait 1" },
  { src: "/gallery-2.svg", alt: "Wedding portrait 2" },
  { src: "/gallery-3.svg", alt: "Wedding portrait 3" },
  { src: "/gallery-4.svg", alt: "Wedding portrait 4" },
  { src: "/gallery-5.svg", alt: "Wedding portrait 5" },
  { src: "/gallery-6.svg", alt: "Wedding portrait 6" },
];

export default function GallerySection() {
  const galleryImages = useMemo(
    () =>
      Array.from({ length: 15 }, (_, index) => {
        const item = baseImages[index % baseImages.length];
        return { ...item, id: `${item.src}-${index}` };
      }),
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollToIndex = (index: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const width = scroller.clientWidth;
    scroller.scrollTo({ left: width * index, behavior: "smooth" });
  };

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const handleScroll = () => {
      const width = scroller.clientWidth;
      if (width === 0) return;
      const index = Math.round(scroller.scrollLeft / width);
      setActiveIndex(Math.min(Math.max(index, 0), galleryImages.length - 1));
    };

    scroller.addEventListener("scroll", handleScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", handleScroll);
  }, [galleryImages.length]);

  return (
    <SectionCard className="text-center">
      <Reveal className="serif text-xs tracking-[0.3em] text-neutral-500">
        GALLERY
      </Reveal>
      <Reveal className="mt-2 text-xl text-neutral-800">웨딩 갤러리</Reveal>

      <Reveal className="mt-6">
        <div className="relative -mx-6">
          <div
            ref={scrollerRef}
            className="hide-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth bg-neutral-100"
          >
            {galleryImages.map((item) => (
              <div key={item.id} className="relative aspect-[4/5] w-full flex-none snap-center">
                <Image src={item.src} alt={item.alt} fill className="object-cover" />
              </div>
            ))}
          </div>

          <button
            type="button"
            className="absolute left-1 top-1/2 -translate-y-1/2 bg-transparent px-2 py-1 text-4xl text-white"
            onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))}
            aria-label="이전 사진"
          >
            ‹
          </button>
          <button
            type="button"
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-transparent px-2 py-1 text-4xl text-white"
            onClick={() => scrollToIndex(Math.min(activeIndex + 1, galleryImages.length - 1))}
            aria-label="다음 사진"
          >
            ›
          </button>
        </div>
      </Reveal>

      <Reveal className="mt-4">
        <div className="-mx-6 grid grid-cols-5 gap-2 px-6">
          {galleryImages.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToIndex(index)}
              className={`ui-rounded relative h-14 w-full overflow-hidden border ${
                index === activeIndex ? "border-neutral-500" : "border-neutral-200"
              }`}
              aria-label={`갤러리 이미지 ${index + 1}`}
            >
              <Image src={item.src} alt={item.alt} fill className="object-cover" />
            </button>
          ))}
        </div>
      </Reveal>
    </SectionCard>
  );
}
