export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-neutral-950 font-sans text-neutral-100">
      {/* Ambient background */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-15%,rgba(139,92,246,0.28),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_100%_50%,rgba(45,212,191,0.08),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:100%_48px] opacity-[0.35]"
        aria-hidden
      />

      <header className="relative z-20 border-b border-white/10 bg-neutral-950/70 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <a
            href="/"
            className="flex shrink-0 items-center gap-2.5 rounded-lg outline-none ring-violet-400/40 transition hover:opacity-90 focus-visible:ring-2"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-violet-600/30">
              SX
            </span>
            <span className="text-lg font-semibold tracking-tight text-white sm:text-xl">
              ShopXray
            </span>
          </a>
          <a
            href="#get-started"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:border-white/25 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 sm:px-5 sm:text-[0.9375rem]"
          >
            Get Started
          </a>
        </nav>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center px-4 pb-20 pt-14 sm:px-6 sm:pb-28 sm:pt-20 lg:pt-28">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-neutral-300 backdrop-blur-sm sm:text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
            Competitor intelligence for Etsy sellers
          </p>

          <h1 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-[1.12] lg:text-[3.25rem] lg:leading-[1.08]">
            See Exactly What Makes Your Etsy Competitors{" "}
            <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-emerald-300 bg-clip-text text-transparent">
              Successful
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-neutral-400 sm:text-lg sm:leading-relaxed">
            Spy on any Etsy shop, find winning keywords, and get your AI action
            plan in 30 seconds
          </p>

          <div id="get-started" className="mt-10 flex w-full flex-col items-center gap-3 sm:mt-12">
            <a
              href="#get-started"
              className="inline-flex w-full max-w-sm items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-violet-900/40 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 sm:w-auto sm:max-w-none sm:px-10 sm:py-4 sm:text-lg"
            >
              Start Spying For Free
            </a>
            <p className="text-sm text-neutral-500">No credit card required</p>
          </div>
        </div>
      </main>
    </div>
  );
}
