import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { FeaturedWork } from "@/components/FeaturedWork";

export default function Home() {
  return (
    <>
      <div className="grain wash relative">
        <SiteHeader />
        <Hero />
      </div>
      <FeaturedWork />
    </>
  );
}
