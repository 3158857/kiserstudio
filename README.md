This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Admin access

`/admin` manages the gallery and is gated by a single password. Two
environment variables are required; with either unset the gate **fails
closed** and nobody can sign in.

| Variable | Purpose |
| --- | --- |
| `ADMIN_PASSWORD_HASH` | scrypt hash of the admin password |
| `AUTH_SECRET` | HMAC key signing the session cookie |

Generate both locally — the password itself is never stored:

```bash
node scripts/hash-password.mjs "your-password-here"
```

Paste the output into Vercel → Settings → Environment Variables (all
environments), and into `.env.local` for local development. `.env*` is
gitignored; never commit these values.

The hash is colon-separated on purpose: dotenv expands `$`, which silently
corrupts a `$`-separated hash when it is read from a `.env` file.

Sessions last 12 hours in an httpOnly, SameSite=Lax cookie, `Secure` in
production. Failed sign-ins are throttled to 8 per 10 minutes per IP —
per server instance, so it slows guessing rather than truly rate-limiting.
