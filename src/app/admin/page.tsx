import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { GalleryAdmin } from "@/components/GalleryAdmin";
import { isAuthenticated } from "@/lib/auth";
import { getGalleryForAdmin } from "@/lib/gallery";
import { isBlobConfigured } from "@/lib/store";

export const metadata: Metadata = {
  title: "Gallery admin — Kiser Studio",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  // Must gate here, not only in the layout: layouts and pages render
  // concurrently, so a layout-only guard still lets this page's payload be
  // serialised into the redirect response.
  if (!(await isAuthenticated())) redirect("/login");

  return (
    <GalleryAdmin items={await getGalleryForAdmin()} blobReady={isBlobConfigured()} />
  );
}
