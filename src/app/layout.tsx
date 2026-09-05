import type { Metadata } from "next";
import { Archivo, Montserrat } from "next/font/google";
import "./globals.css";

/* Stand-in for Neue Haas Grotesk, which is a licensed face. Swap once
   licensing is settled — see the note in the draft summary. */
const primary = Archivo({
  variable: "--ff-primary",
  subsets: ["latin"],
});

const secondary = Montserrat({
  variable: "--ff-secondary",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kiser Studio — Charcoal Artwork by Logan Kiser",
  description:
    "Art builds a brighter perspective. Original charcoal drawings by Logan Kiser — realistic artwork, expansive possibilities.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${primary.variable} ${secondary.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-charcoal text-chalk">{children}</body>
    </html>
  );
}
