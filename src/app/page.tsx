import HeroIntro from "@/components/HeroIntro";
import InvitationSection from "@/components/InvitationSection";
import GallerySection from "@/components/GallerySection";
import DateLocationSection from "@/components/DateLocationSection";
import MapSection from "@/components/MapSection";
import GuestbookSection from "@/components/GuestbookSection";
import AccountSection from "@/components/AccountSection";
import FlowerSection from "@/components/FlowerSection";
import AudioControl from "@/components/AudioControl";
import Reveal from "@/components/Reveal";
import SplashIntro from "@/components/SplashIntro";
import MainEntrance from "@/components/MainEntrance";

export default function Home() {
  return (
    <main className="text-neutral-800">
      <SplashIntro />
      <MainEntrance>
        <AudioControl />

        <HeroIntro />

      <div className="relative z-20 mx-auto mt-0 w-full max-w-[420px] px-4 pb-0">
          <div className="ui-surface -mt-px" style={{ borderTop: "0" }}>
            <div className="ui-surface-flat">
              <InvitationSection withDivider={false} />
            </div>
            <GallerySection />
            <DateLocationSection />
            <MapSection />
            <GuestbookSection />
            <AccountSection />
            <FlowerSection />
          </div>
        </div>
      </MainEntrance>
    </main>
  );
}
