export function SignatureBand() {
  return (
    <section className="grid sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <div className="grain relative flex items-center justify-center bg-paper px-10 py-16 text-charcoal">
        <span
          className="signature relative z-10 w-full max-w-sm"
          role="img"
          aria-label="Logan Kiser's signature"
        />
      </div>

      <div className="flex flex-col justify-between gap-10 bg-accent px-8 py-12 text-chalk sm:px-10">
        <p className="tracked text-[0.62rem] uppercase leading-[2.3]">
          Draw.
          <br />
          Explore.
          <br />
          Create.
          <br />
          What&apos;s next.
        </p>
        <div>
          <p className="text-xl font-extrabold tracking-[0.14em]">KISER</p>
          <p className="tracked-wide mt-1 text-[0.58rem]">STUDIO</p>
          <p className="tracked mt-7 text-[0.55rem] uppercase opacity-80">
            kiserstudio.com
          </p>
        </div>
      </div>
    </section>
  );
}
