import type { Metadata } from "next";
import { Anton, Inter, Great_Vibes, Playfair_Display } from "next/font/google";
import "./globals.css";

const display = Anton({
  variable: "--ff-display",
  subsets: ["latin"],
  weight: "400",
});

const sans = Inter({
  variable: "--ff-sans",
  subsets: ["latin"],
});

const script = Great_Vibes({
  variable: "--ff-script",
  subsets: ["latin"],
  weight: "400",
});

const serif = Playfair_Display({
  variable: "--ff-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kiser Studio — Charcoal Work by Logan Kiser",
  description:
    "Same subject. Different perspective. Original charcoal drawings by Logan Kiser.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${script.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg text-ink">{children}</body>
    </html>
  );
}
