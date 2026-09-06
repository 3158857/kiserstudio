import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { GalleryAdmin } from "@/components/GalleryAdmin";
import { isAuthenticated } from "@/lib/auth";
import { getGallery } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery admin — Kiser Studio",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  // Must gate here, not only in the layout: layouts and pages render
  // concurrently, so a layout-only guard still lets this page's RSC payload
  // (every filename, caption and visibility flag) be serialised into the
  // redirect response. Awaiting the check first means getGallery() never runs
  // for an unauthenticated request.
  if (!(await isAuthenticated())) redirect("/login");

  return <GalleryAdmin items={getGallery()} />;
}
