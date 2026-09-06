import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { FeaturedWork } from "@/components/FeaturedWork";
import { getVisibleGallery } from "@/lib/gallery";
import { About } from "@/components/About";

// Rebuilt on demand when the admin publishes; this is the safety net.
export const revalidate = 300;

export default async function Home() {
  const gallery = await getVisibleGallery();

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
