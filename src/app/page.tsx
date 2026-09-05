export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="w-full max-w-xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] opacity-50">
          Coming soon
        </p>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl">
          Kiser Studio
        </h1>
        <p className="mt-6 text-lg leading-relaxed opacity-70">
          A new site is in the works. Check back shortly.
        </p>
        <hr className="my-10 border-current opacity-10" />
        <p className="font-mono text-xs opacity-40">
          Deployment pipeline verified — GitHub → Vercel
        </p>
      </div>
    </main>
  );
}
