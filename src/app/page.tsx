import HeroSection from "@/components/Hero/HeroSectionCompatible";
import MusicSection from "@/components/Music/MusicSection";
import GallerySectionSimple from "@/components/Gallery/GallerySectionSimple";
import ShopSectionShopify from "@/components/Shop/ShopSectionShopifyDynamic";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MusicSection />
      <GallerySectionSimple />
      <ShopSectionShopify />
    </>
  );
}
