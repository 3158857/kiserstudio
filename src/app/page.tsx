import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { FeaturedWork } from "@/components/FeaturedWork";
import { getVisibleGallery } from "@/lib/gallery";
import { About } from "@/components/About";

export default function Home() {
  const gallery = getVisibleGallery();

  return (
    <>
      <SiteHeader />
      <Hero />
      <FeaturedWork items={gallery} />
      <About />
      {/* Terminates the page with the accent, now that the footer is gone */}
      <div className="h-1.5 w-full bg-accent" role="presentation" />
    </>
  );
}
