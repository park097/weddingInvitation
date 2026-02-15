"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import SectionCard from "@/components/SectionCard";

export default function GallerySection() {
  const galleryImages = useMemo(
    () =>
      Array.from({ length: 29 }, (_, index) => ({
        src: `/img/gall/img${index + 1}.jpg`,
        alt: `Wedding portrait ${index + 1}`,
        id: `img-${index + 1}`,
      })),
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
    <SectionCard className="text-center mt-2">
      <Reveal className="serif text-xs tracking-[0.3em] text-neutral-500">
        GALLERY
      </Reveal>
      <Reveal className="mt-2 text-xl text-[#b57b5c]">웨딩 갤러리</Reveal>

      <Reveal className="mt-6">
        <div className="relative -mx-6">
          <div
            ref={scrollerRef}
            className="hide-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth bg-neutral-100 touch-pan-x"
            onContextMenu={(event) => event.preventDefault()}
          >
            {galleryImages.map((item, index) => (
              <div
                key={item.id}
                className={`relative w-full flex-none snap-center ${
                  index === 9
                    ? "h-[100vh] min-h-[280px] max-h-[460px]"
                    : "h-[64vh] min-h-[320px] max-h-[560px]"
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  priority={index === 0}
                  unoptimized
                  sizes="(max-width: 420px) 100vw, 420px"
                  draggable={false}
                  onDragStart={(event) => event.preventDefault()}
                  className={
                    index === 9
                      ? "object-contain object-[50%_62%] bg-neutral-100 select-none pointer-events-none"
                      : "object-cover select-none pointer-events-none"
                  }
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            className="absolute left-1 top-1/2 -translate-y-1/2 bg-transparent px-2 py-1 text-3xl text-white/70 hover:text-white/90 transition"
            onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))}
            aria-label="이전 사진"
          >
            ‹
          </button>
          <button
            type="button"
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-transparent px-2 py-1 text-3xl text-white/70 hover:text-white/90 transition"
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
              <Image
                src={item.src}
                alt={item.alt}
                fill
                unoptimized
                sizes="(max-width: 420px) 20vw, 84px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </Reveal>
    </SectionCard>
  );
}

