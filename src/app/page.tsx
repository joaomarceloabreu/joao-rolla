import HeroSection from "@/components/Hero/HeroSectionCompatible";
import MusicSection from "@/components/Music/MusicSection";
import GallerySectionMobile from "@/components/Gallery/GallerySectionMobile";
import ShopSectionShopify from "@/components/Shop/ShopSectionShopifyDynamic";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MusicSection />
      <GallerySectionMobile />
      <ShopSectionShopify />
    </>
  );
}
