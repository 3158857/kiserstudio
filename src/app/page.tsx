import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { FeaturedWork } from "@/components/FeaturedWork";
import { QuoteBand } from "@/components/QuoteBand";
import { About } from "@/components/About";
import { SignatureBand } from "@/components/SignatureBand";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-x-0 top-0 z-30">
          <SiteHeader />
        </div>
        <Hero />
      </div>
      <FeaturedWork />
      <QuoteBand />
      <About />
      <SignatureBand />
      <SiteFooter />
    </>
  );
}
