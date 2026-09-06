"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE,
  createSessionToken,
  throttle,
  verifyPassword,
} from "@/lib/auth";

export type LoginState = { error?: string };

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const secret = process.env.AUTH_SECRET;
  const stored = process.env.ADMIN_PASSWORD_HASH;
  if (!secret || !stored) {
    return { error: "Admin access is not configured on this deployment." };
  }

  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const { allowed, retryInMs } = throttle(ip);
  if (!allowed) {
    const mins = Math.ceil(retryInMs / 60000);
    return { error: `Too many attempts. Try again in ${mins} minute(s).` };
  }

  const password = formData.get("password");
  if (typeof password !== "string" || !verifyPassword(password, stored)) {
    return { error: "Incorrect password." };
  }

  (await cookies()).set(SESSION_COOKIE, createSessionToken(secret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/login");
}
