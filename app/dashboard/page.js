"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

function IconMagnifyingGlass({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function IconKey({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6" />
      <path d="m15.5 7.5 3 3L22 7l-3-3" />
    </svg>
  );
}

function IconBolt({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function IconGear({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function Spinner({ className }) {
  return (
    <svg className={"animate-spin " + (className || "")} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}

function formatPrice(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return "$" + value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function CompetitionBadge({ level }) {
  const value = String(level || "");
  if (value === "High") {
    return <span className="inline-flex rounded-full bg-red-500/15 px-3 py-1 text-xs font-medium text-red-300 ring-1 ring-red-500/35">High</span>;
  }
  if (value === "Medium") {
    return <span className="inline-flex rounded-full bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-300 ring-1 ring-amber-500/35">Medium</span>;
  }
  if (value === "Low") {
    return <span className="inline-flex rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300 ring-1 ring-emerald-500/35">Low</span>;
  }
  return <span className="text-neutral-500">--</span>;
}

const NAV_ITEMS = [
  { id: "shop-spy", label: "Shop Spy", Icon: IconMagnifyingGlass, enabled: true },
  { id: "keyword-research", label: "Keyword Research", Icon: IconKey, enabled: true },
  { id: "ai-action-plan", label: "AI Action Plan", Icon: IconBolt, enabled: false },
  { id: "settings", label: "Settings", Icon: IconGear, enabled: false },
];

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState("shop-spy");
  const [userEmail, setUserEmail] = useState("");
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserEmail(data?.user?.email || "");
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    setLogoutLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-neutral-950 font-sans text-neutral-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-15%,rgba(139,92,246,0.28),transparent_55%)]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_100%_50%,rgba(217,70,239,0.10),transparent_50%)]" aria-hidden />

      <div className="relative z-10 flex min-h-screen w-full flex-col lg:flex-row">
        <aside className="border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r flex flex-col">
          <div className="flex items-center justify-between gap-3 px-4 py-4 lg:flex-col lg:items-stretch lg:gap-4 lg:px-4 lg:py-6">
            <Link href="/" className="flex shrink-0 items-center gap-2.5 rounded-lg outline-none transition hover:opacity-90">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-violet-600/30">SX</span>
              <span className="text-lg font-semibold tracking-tight text-white">ShopXray</span>
            </Link>
            <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm text-neutral-300 hover:bg-white/10 transition" aria-label="Menu">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-white/10 px-4 py-3 bg-neutral-950/95">
              <p className="text-xs text-neutral-400 mb-2 truncate">{userEmail}</p>
              <button onClick={handleLogout} disabled={logoutLoading} className="w-full px-4 py-2 text-sm bg-white/5 hover:bg-white/10 rounded-lg transition disabled:opacity-50 text-neutral-200">
                {logoutLoading ? "Logging out..." : "Log out"}
              </button>
            </div>
          )}

          <nav className="flex gap-1 overflow-x-auto px-2 pb-3 lg:flex-col lg:gap-1 lg:px-3 lg:pb-6 lg:flex-1" aria-label="Dashboard tools" style={{ scrollbarWidth: "none" }}>
            {NAV_ITEMS.map(({ id, label, Icon, enabled }) => {
              const isActive = activeNav === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => enabled && setActiveNav(id)}
                  disabled={!enabled}
                  className={"flex min-w-max shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition lg:w-full " + (isActive ? "bg-white/10 text-white ring-1 ring-white/10" : enabled ? "text-neutral-400 hover:bg-white/5 hover:text-neutral-200" : "text-neutral-600 cursor-not-allowed")}
                >
                  <Icon className="h-5 w-5 shrink-0 text-violet-400/90" />
                  <span className="whitespace-nowrap">{label}</span>
                  {!enabled && <span className="ml-auto text-[10px] bg-neutral-800 px-2 py-0.5 rounded">Soon</span>}
                </button>
              );
            })}
          </nav>

          <div className="hidden lg:block p-4 border-t border-white/10">
            <p className="text-xs text-neutral-500 mb-2 truncate">{userEmail}</p>
            <button onClick={handleLogout} disabled={logoutLoading} className="w-full px-4 py-2 text-sm bg-white/5 hover:bg-white/10 rounded-lg transition disabled:opacity-50 text-neutral-200">
              {logoutLoading ? "Logging out..." : "Log out"}
            </button>
          </div>
        </aside>

        <main className="relative flex flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
          {activeNav === "shop-spy" && <ShopSpy />}
          {activeNav === "keyword-research" && <KeywordResearch />}
        </main>
      </div>
    </div>
  );
}

function ShopSpy() {
  const [shopName, setShopName] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!shopName.trim()) return;
    setLoading(true);
    setError("");
    setData(null);
    try {
      const res = await fetch("/api/etsy/shop?shopname=" + encodeURIComponent(shopName));
      const json = await res.json();
      if (!res.ok) setError(json.error || "Something went wrong");
      else setData(json);
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Shop Spy</h1>
        <p className="mt-2 text-sm text-neutral-400 sm:text-base">Analyze any Etsy shop and surface real competitor insights.</p>
      </div>

      <form onSubmit={handleSearch} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-xl shadow-black/20 backdrop-blur-sm sm:p-6">
        <input
          type="text"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          placeholder="Paste Etsy shop URL or enter shop name..."
          disabled={loading}
          className="w-full rounded-xl border border-white/10 bg-neutral-950/80 px-4 py-3.5 text-base text-neutral-100 placeholder:text-neutral-500 outline-none transition focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/30 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-900/35 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 sm:py-4 sm:text-lg"
        >
          {loading ? (<><Spinner className="h-5 w-5 text-white" />Spying...</>) : "Spy Now"}
        </button>
      </form>

      {error && !loading && (
        <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-950/40 px-4 py-4 text-sm text-red-200" role="alert">{error}</div>
      )}

      {data && !loading && <ShopResults data={data} />}

      {!data && !loading && !error && (
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-12 text-center sm:py-16">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
            <IconMagnifyingGlass className="h-7 w-7 text-neutral-500" />
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-neutral-500 sm:text-base">Enter a shop name or URL above to see competitor insights</p>
        </div>
      )}
    </div>
  );
}

function ShopResults({ data }) {
  const listings = Array.isArray(data.listings) ? data.listings : [];

  return (
    <div className="mt-6 space-y-5">
      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-lg shadow-black/20 backdrop-blur-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">{data.shopName}</h2>
            <p className="mt-1 text-sm text-neutral-400">
              <span className="font-medium text-neutral-200">{data.totalFound}</span> listings found
              {data.shopReviews ? (<><span> &middot; </span><span className="font-medium text-neutral-200">{data.shopReviews.toLocaleString()}</span><span> shop reviews</span></>) : null}
              {data.shopRating ? (<><span> &middot; </span><span className="font-medium text-amber-400">{data.shopRating} stars</span></>) : null}
            </p>
          </div>
          <a href={data.shopUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-xl bg-white/5 hover:bg-white/10 px-4 py-2.5 text-sm font-medium text-neutral-200 transition text-center border border-white/10">
            View Shop on Etsy
          </a>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.03] shadow-xl shadow-black/20 backdrop-blur-sm overflow-hidden">
        <div className="border-b border-white/10 px-5 py-4">
          <h3 className="text-base font-semibold text-white">Top Listings</h3>
          <p className="text-xs text-neutral-500 mt-1">Most visible products from this shop based on search popularity</p>
        </div>
        <ul className="divide-y divide-white/5">
          {listings.map((item, idx) => (
            <li key={idx} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between hover:bg-white/[0.02] transition">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-100 line-clamp-2">{item.title}</p>
                <p className="mt-1 text-xs text-neutral-400">
                  {item.price ? <span className="font-medium text-neutral-200">{item.price}</span> : <span className="text-neutral-600">Price not available</span>}
                </p>
              </div>
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 px-3 py-1.5 text-xs font-medium text-violet-300 transition text-center">
                View on Etsy
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function KeywordResearch() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    setLoading(true);
    setError("");
    setData(null);
    try {
      const res = await fetch("/api/etsy/keywords?keyword=" + encodeURIComponent(keyword));
      const json = await res.json();
      if (!res.ok) setError(json.error || "Something went wrong");
      else setData(json);
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Keyword Research</h1>
        <p className="mt-2 text-sm text-neutral-400 sm:text-base">Discover competition and pricing trends for any Etsy keyword.</p>
      </div>

      <form onSubmit={handleSearch} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-xl shadow-black/20 backdrop-blur-sm sm:p-6">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter a keyword (e.g. minimalist wall art)"
          disabled={loading}
          className="w-full rounded-xl border border-white/10 bg-neutral-950/80 px-4 py-3.5 text-base text-neutral-100 placeholder:text-neutral-500 outline-none transition focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/30 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-900/35 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 sm:py-4 sm:text-lg"
        >
          {loading ? (<><Spinner className="h-5 w-5 text-white" />Researching...</>) : "Research"}
        </button>
      </form>

      {error && !loading && (
        <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-950/40 px-4 py-4 text-sm text-red-200" role="alert">{error}</div>
      )}

      {data && !loading && <KeywordResults data={data} />}

      {!data && !loading && !error && (
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-12 text-center sm:py-16">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
            <IconKey className="h-7 w-7 text-neutral-500" />
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-neutral-500 sm:text-base">Enter a keyword above to see market data</p>
        </div>
      )}
    </div>
  );
}

function KeywordResults({ data }) {
  const listings = Array.isArray(data.listings) ? data.listings : [];

  return (
    <div className="mt-6 space-y-5">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
          <p className="text-xs uppercase tracking-wider text-neutral-500">Average Price</p>
          <p className="mt-2 text-xl sm:text-2xl font-bold text-white">{data.averagePrice ? "$" + data.averagePrice : "--"}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
          <p className="text-xs uppercase tracking-wider text-neutral-500">Average Rating</p>
          <p className="mt-2 text-xl sm:text-2xl font-bold text-amber-400">{data.averageRating ? data.averageRating + " stars" : "--"}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
          <p className="text-xs uppercase tracking-wider text-neutral-500">Total Listings</p>
          <p className="mt-2 text-xl sm:text-2xl font-bold text-white">{data.totalFound}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
          <p className="text-xs uppercase tracking-wider text-neutral-500">Competition</p>
          <div className="mt-2"><CompetitionBadge level={data.competitionLevel} /></div>
        </div>
      </div>

      <section className="rounded-2xl border border-white/10 bg-white/[0.03] shadow-xl shadow-black/20 backdrop-blur-sm overflow-hidden">
        <div className="border-b border-white/10 px-5 py-4">
          <h3 className="text-base font-semibold text-white">Top Listings</h3>
          <p className="text-xs text-neutral-500 mt-1">Top ranking products for &quot;{data.keyword}&quot; on Etsy</p>
        </div>
        <ul className="divide-y divide-white/5">
          {listings.map((item, idx) => (
            <li key={idx} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between hover:bg-white/[0.02] transition">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-100 line-clamp-2">{item.title}</p>
                <p className="mt-1 text-xs text-neutral-400">
                  {formatPrice(item.price) ? <span className="font-medium text-neutral-200">{formatPrice(item.price)}</span> : <span className="text-neutral-600">Price not available</span>}
                </p>
              </div>
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 px-3 py-1.5 text-xs font-medium text-violet-300 transition text-center">
                View on Etsy
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}