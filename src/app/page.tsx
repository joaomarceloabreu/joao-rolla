import HeroSection from "@/components/Hero/HeroSection";
import MusicSection from "@/components/Music/MusicSection";
import GallerySection from "@/components/Gallery/GallerySection";
import ShopSectionShopify from "@/components/Shop/ShopSectionShopifyDynamic";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MusicSection />
      <GallerySection />
      <ShopSectionShopify />
    </>
  );
}
