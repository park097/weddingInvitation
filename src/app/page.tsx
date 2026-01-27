import HeroIntro from "@/components/HeroIntro";
import GallerySection from "@/components/GallerySection";
import DateLocationSection from "@/components/DateLocationSection";
import MapSection from "@/components/MapSection";
import GuestbookSection from "@/components/GuestbookSection";
import AccountSection from "@/components/AccountSection";
import ContactSection from "@/components/ContactSection";
import FlowerSection from "@/components/FlowerSection";
import AudioControl from "@/components/AudioControl";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <main className="text-neutral-800">
      <AudioControl />
      <HeroIntro />
      <div className="relative z-10 mx-auto -mt-0 w-full max-w-[420px] px-4 pb-20">
        <div className="overflow-hidden border border-neutral-200/70 bg-white/95 shadow-[0_14px_32px_rgba(40,35,30,0.08)]">
          <GallerySection />
          <DateLocationSection />
          <MapSection />
          <GuestbookSection />
          <AccountSection />
          <FlowerSection />
        </div>
        <Reveal>
          <footer className="mt-10 text-center text-xs text-neutral-400 ">
            Copyright © 2026 wedding invitation
          </footer>
        </Reveal>
      </div>
    </main>
  );
}
