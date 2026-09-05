import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { FeaturedWork } from "@/components/FeaturedWork";
import { About } from "@/components/About";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <Hero />
      <FeaturedWork />
      <About />
      {/* Terminates the page with the accent, now that the footer is gone */}
      <div className="h-1.5 w-full bg-accent" role="presentation" />
    </>
  );
}
