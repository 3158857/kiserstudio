import type { Metadata } from "next";
import { GalleryAdmin } from "@/components/GalleryAdmin";
import { getGallery } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery admin — Kiser Studio",
  // Not a security control, just keeps it out of search results. Real access
  // control arrives with uploads.
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <GalleryAdmin items={getGallery()} />;
}
