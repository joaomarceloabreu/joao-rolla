import HeroSection from "@/components/Hero/HeroSectionCompatible";
import MusicSection from "@/components/Music/MusicSection";
import EventSection from "@/components/Event/EventSection";
import ShopSectionShopify from "@/components/Shop/ShopSectionShopifyDynamic";
import GallerySectionMobile from "@/components/Gallery/GallerySectionMobile";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MusicSection />
      <EventSection />
      <ShopSectionShopify />
      <GallerySectionMobile />
    </>
  );
}
