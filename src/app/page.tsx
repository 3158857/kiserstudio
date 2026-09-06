import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { FeaturedWork } from "@/components/FeaturedWork";
import { getVisibleGallery } from "@/lib/gallery";
import { About } from "@/components/About";

// Rendered per request rather than ISR-cached. With a 300s window the CDN
// served stale-while-revalidate, so the first refresh after publishing showed
// the old gallery and only a second or third showed the change. The page's
// only dynamic input is a small JSON manifest, so the cost is one Blob read
// per view — worth it at this traffic for edits that appear immediately.
export const dynamic = "force-dynamic";

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
