import HeroIntro from "@/components/HeroIntro";
import InvitationSection from "@/components/InvitationSection";
import GallerySection from "@/components/GallerySection";
import DateLocationSection from "@/components/DateLocationSection";
import MapSection from "@/components/MapSection";
import GuestbookSection from "@/components/GuestbookSection";
import AccountSection from "@/components/AccountSection";
import ContactSection from "@/components/ContactSection";
import FlowerSection from "@/components/FlowerSection";
import AudioControl from "@/components/AudioControl";
import Reveal from "@/components/Reveal";
import SplashIntro from "@/components/SplashIntro";

export default function Home() {
  return (
    <main className="text-neutral-800">
      <SplashIntro />
      <AudioControl />

      <HeroIntro />

      <div className="relative z-20 mx-auto -mt-16 w-full max-w-[420px] px-4 pb-20">
        <div className="ui-surface">
          <div className="ui-surface-flat">
            <InvitationSection withDivider={false} />
          </div>
          <GallerySection />
          <DateLocationSection />
          <MapSection />
          <GuestbookSection />
          <AccountSection />
          <ContactSection />
          <FlowerSection />
        </div>
        <Reveal>
          <footer className="mt-10 text-center text-xs text-neutral-400">
            Copyright 2026 wedding invitation
          </footer>
        </Reveal>
      </div>
    </main>
  );
}
