import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/LoginForm";
import { isAuthenticated } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Sign in — Kiser Studio",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  if (await isAuthenticated()) redirect("/admin");
  return <LoginForm />;
}
