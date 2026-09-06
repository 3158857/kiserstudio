"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/app/actions/auth";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    {},
  );

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form action={formAction} className="w-full max-w-sm">
        <h1 className="text-xl font-extrabold uppercase tracking-tight">
          Gallery admin
        </h1>
        <p className="font-secondary mt-2 text-sm opacity-60">
          Sign in to manage the gallery.
        </p>

        <label className="mt-8 block">
          <span className="tracked text-[0.6rem] uppercase opacity-70">
            Password
          </span>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            required
            autoFocus
            className="font-secondary mt-2 w-full border border-rule-dark bg-transparent px-3 py-2.5 text-sm outline-none focus:border-chalk/60"
          />
        </label>

        {state.error && (
          <p className="font-secondary mt-4 text-sm text-accent" role="alert">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="tracked mt-6 w-full border border-chalk/40 px-5 py-3 text-[0.62rem] uppercase transition-colors hover:border-chalk disabled:opacity-40"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
