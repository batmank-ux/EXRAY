"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function IconMagnifyingGlass({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function IconKey({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6" />
      <path d="m15.5 7.5 3 3L22 7l-3-3" />
    </svg>
  );
}

function IconBolt({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function IconGear({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function Spinner({ className }) {
  return (
    <svg
      className={`animate-spin ${className ?? ""}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

function StarRow({ rating }) {
  const r = Number(rating);
  if (!Number.isFinite(r)) {
    return <span className="text-neutral-500">—</span>;
  }
  const clamped = Math.min(5, Math.max(0, r));
  return (
    <div
      className="flex flex-wrap items-center gap-1"
      aria-label={`${clamped.toFixed(1)} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`h-4 w-4 shrink-0 ${clamped >= i - 0.25 ? "text-amber-400" : "text-neutral-700"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-0.5 tabular-nums text-xs text-neutral-400">
        {clamped.toFixed(1)}
      </span>
    </div>
  );
}

function ReviewBadge({ reviews }) {
  if (typeof reviews !== "number" || !Number.isFinite(reviews)) {
    return <span className="text-neutral-600">—</span>;
  }
  if (reviews > 1000) {
    return (
      <span className="inline-flex rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/35">
        Best Seller
      </span>
    );
  }
  if (reviews < 100) {
    return (
      <span className="inline-flex rounded-full bg-neutral-600/25 px-2.5 py-0.5 text-xs font-medium text-neutral-400 ring-1 ring-white/10">
        New
      </span>
    );
  }
  return <span className="text-neutral-600">—</span>;
}

function formatReviewCount(reviews) {
  if (typeof reviews !== "number" || !Number.isFinite(reviews)) return "—";
  return reviews.toLocaleString();
}

function formatPrice(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function CompetitionBadge({ level }) {
  const value = String(level ?? "");
  if (value === "High") {
    return (
      <span className="inline-flex rounded-full bg-red-500/15 px-2.5 py-1 text-xs font-medium text-red-300 ring-1 ring-red-500/35">
        High
      </span>
    );
  }
  if (value === "Medium") {
    return (
      <span className="inline-flex rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-medium text-amber-300 ring-1 ring-amber-500/35">
        Medium
      </span>
    );
  }
  if (value === "Low") {
    return (
      <span className="inline-flex rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-300 ring-1 ring-emerald-500/35">
        Low
      </span>
    );
  }
  return <span className="text-neutral-500">—</span>;
}

/** Etsy shop slug from pasted URL, or trimmed query */
function extractShopQuery(raw) {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  try {
    if (/https?:\/\//i.test(trimmed)) {
      const u = new URL(trimmed);
      const m = u.pathname.match(/\/shop\/([^/?#]+)/i);
      if (m) return decodeURIComponent(m[1]);
    }
  } catch {
    /* ignore invalid URL */
  }
  return trimmed;
}

const NAV_ITEMS = [
  { id: "shop-spy", label: "Shop Spy", Icon: IconMagnifyingGlass },
  { id: "keyword-research", label: "Keyword Research", Icon: IconKey },
  { id: "ai-action-plan", label: "AI Action Plan", Icon: IconBolt },
  { id: "settings", label: "Settings", Icon: IconGear },
];

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [activeNav, setActiveNav] = useState("shop-spy");
  const [shopInput, setShopInput] = useState("");
  const [fetchRequest, setFetchRequest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shopData, setShopData] = useState(null);
  const [keywordInput, setKeywordInput] = useState("");
  const [keywordFetchRequest, setKeywordFetchRequest] = useState(null);
  const [keywordLoading, setKeywordLoading] = useState(false);
  const [keywordError, setKeywordError] = useState(null);
  const [keywordData, setKeywordData] = useState(null);

  useEffect(() => {
    const supabase = createClient();

    function syncUser(user) {
      setUserEmail(user?.email ?? "");
    }

    supabase.auth.getUser().then(({ data: { user } }) => {
      syncUser(user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      syncUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!fetchRequest) return undefined;

    const shop = fetchRequest.shop;
    const controller = new AbortController();
    let cancelled = false;

    setLoading(true);
    setError(null);
    setShopData(null);

    async function load() {
      try {
        const res = await fetch(
          `/api/etsy/shop?shopname=${encodeURIComponent(shop)}`,
          { signal: controller.signal }
        );
        const json = await res.json().catch(() => ({}));
        if (cancelled) return;

        if (!res.ok) {
          if (res.status === 404) {
            setError(
              "Shop not found. Try another shop name or check the spelling."
            );
          } else {
            setError(
              typeof json.error === "string"
                ? json.error
                : "Could not load shop data. Please try again."
            );
          }
          setShopData(null);
          return;
        }

        setShopData(json);
        setError(null);
      } catch (e) {
        if (cancelled || e?.name === "AbortError") return;
        setError("Network error. Check your connection and try again.");
        setShopData(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [fetchRequest]);

  useEffect(() => {
    if (!keywordFetchRequest) return undefined;

    const keyword = keywordFetchRequest.keyword;
    const controller = new AbortController();
    let cancelled = false;

    setKeywordLoading(true);
    setKeywordError(null);
    setKeywordData(null);

    async function loadKeywordResearch() {
      try {
        const res = await fetch(
          `/api/etsy/keywords?keyword=${encodeURIComponent(keyword)}`,
          { signal: controller.signal }
        );
        const json = await res.json().catch(() => ({}));
        if (cancelled) return;

        if (!res.ok) {
          setKeywordError(
            typeof json.error === "string"
              ? json.error
              : "Could not load keyword research. Please try again."
          );
          setKeywordData(null);
          return;
        }

        setKeywordData(json);
        setKeywordError(null);
      } catch (e) {
        if (cancelled || e?.name === "AbortError") return;
        setKeywordError("Network error. Check your connection and try again.");
        setKeywordData(null);
      } finally {
        if (!cancelled) setKeywordLoading(false);
      }
    }

    loadKeywordResearch();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [keywordFetchRequest]);

  function handleSpyNow() {
    const query = extractShopQuery(shopInput);
    if (!query) {
      setError("Enter an Etsy shop name or paste a shop URL.");
      setShopData(null);
      return;
    }
    setError(null);
    setFetchRequest({ shop: query, id: Date.now() });
  }

  async function handleLogout() {
    setLogoutLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    setLogoutLoading(false);
    router.refresh();
    router.replace("/");
  }

  function handleKeywordResearch() {
    const keyword = keywordInput.trim();
    if (!keyword) {
      setKeywordError("Enter a keyword to research.");
      setKeywordData(null);
      return;
    }
    setKeywordError(null);
    setKeywordFetchRequest({ keyword, id: Date.now() });
  }

  const listings = Array.isArray(shopData?.listings) ? shopData.listings : [];
  const keywordListings = Array.isArray(keywordData?.top_listings)
    ? keywordData.top_listings
    : [];
  const showEmptyHint =
    !loading && !error && !shopData && fetchRequest === null;

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-neutral-950 font-sans text-neutral-100">
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

      <div className="relative z-10 flex min-h-screen w-full flex-col lg:flex-row">
        <aside className="flex flex-col border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl lg:min-h-screen lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between gap-3 px-4 py-4 lg:flex-col lg:items-stretch lg:gap-4 lg:px-4 lg:py-6">
            <a
              href="/"
              className="flex shrink-0 items-center gap-2.5 rounded-lg outline-none ring-violet-400/40 transition hover:opacity-90 focus-visible:ring-2"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-violet-600/30">
                SX
              </span>
              <span className="text-lg font-semibold tracking-tight text-white">
                ShopXray
              </span>
            </a>
          </div>

          <nav
            className="flex flex-1 gap-1 overflow-x-auto px-2 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] lg:flex-col lg:gap-1 lg:overflow-y-auto lg:px-3 lg:pb-4 [&::-webkit-scrollbar]:hidden"
            aria-label="Dashboard tools"
          >
            {NAV_ITEMS.map(({ id, label, Icon }) => {
              const isActive = activeNav === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveNav(id)}
                  className={`flex min-w-[max-content] shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 lg:min-w-0 lg:w-full ${
                    isActive
                      ? "bg-white/10 text-white shadow-inner shadow-black/20 ring-1 ring-white/10"
                      : "text-neutral-400 hover:bg-white/5 hover:text-neutral-200"
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0 text-violet-400/90" />
                  <span className="whitespace-nowrap pr-1">{label}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-auto border-t border-white/10 px-3 py-4 lg:px-4">
            <p
              className="truncate text-xs text-neutral-400"
              title={userEmail || undefined}
            >
              {userEmail || "—"}
            </p>
            <button
              type="button"
              onClick={handleLogout}
              disabled={logoutLoading}
              className="mt-3 flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm font-medium text-neutral-200 transition hover:border-white/20 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {logoutLoading ? "Signing out…" : "Log out"}
            </button>
          </div>
        </aside>

        <main className="relative flex flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
          {activeNav === "shop-spy" ? (
            <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col">
              <div className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Shop Spy
                </h1>
                <p className="mt-2 text-sm text-neutral-400 sm:text-base">
                  Analyze any Etsy shop and surface competitor insights.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-xl shadow-black/20 backdrop-blur-sm sm:p-8">
                <label htmlFor="shop-query" className="sr-only">
                  Etsy shop URL or shop name
                </label>
                <input
                  id="shop-query"
                  type="text"
                  name="shop-query"
                  value={shopInput}
                  onChange={(e) => setShopInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSpyNow();
                  }}
                  placeholder="Paste Etsy shop URL or enter shop name…"
                  autoComplete="off"
                  disabled={loading}
                  className="w-full rounded-xl border border-white/10 bg-neutral-950/80 px-4 py-3.5 text-base text-neutral-100 placeholder:text-neutral-500 outline-none ring-violet-400/0 transition focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/30 disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={handleSpyNow}
                  disabled={loading}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-violet-900/35 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 disabled:cursor-not-allowed disabled:opacity-60 sm:mt-5 sm:py-4 sm:text-lg"
                >
                  {loading ? (
                    <>
                      <Spinner className="h-5 w-5 text-white" />
                      Spying…
                    </>
                  ) : (
                    "Spy Now"
                  )}
                </button>
              </div>

              {loading && (
                <div
                  className="mt-8 flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-14"
                  aria-live="polite"
                >
                  <Spinner className="h-10 w-10 text-violet-400" />
                  <p className="text-sm text-neutral-400">
                    Fetching competitor insights…
                  </p>
                </div>
              )}

              {error && !loading && (
                <div
                  className="mt-8 rounded-2xl border border-red-500/30 bg-red-950/40 px-4 py-4 text-sm text-red-200 ring-1 ring-red-500/20 sm:px-5"
                  role="alert"
                >
                  {error}
                </div>
              )}

              {shopData && !loading && (
                <div className="mt-8 space-y-6">
                  <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-lg shadow-black/20 backdrop-blur-sm sm:p-8">
                    <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                      {shopData.shopName ?? "Shop"}
                    </h2>
                    <p className="mt-2 text-sm text-neutral-400 sm:text-base">
                      Total listings found:{" "}
                      <span className="font-semibold text-neutral-200">
                        {listings.length}
                      </span>
                    </p>
                  </section>

                  <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-xl shadow-black/20 backdrop-blur-sm">
                    <div className="border-b border-white/10 px-4 py-4 sm:px-6">
                      <h3 className="text-lg font-semibold text-white">
                        Products
                      </h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[640px] text-left text-sm">
                        <thead>
                          <tr className="border-b border-white/10 bg-neutral-950/50 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                            <th className="px-4 py-3 sm:px-6">
                              Product Title
                            </th>
                            <th className="px-4 py-3 sm:px-6">Price</th>
                            <th className="px-4 py-3 sm:px-6">Rating</th>
                            <th className="px-4 py-3 sm:px-6">Reviews</th>
                            <th className="px-4 py-3 sm:px-6">Badge</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {listings.length === 0 ? (
                            <tr>
                              <td
                                colSpan={5}
                                className="px-4 py-10 text-center text-neutral-500 sm:px-6"
                              >
                                No listings returned for this search.
                              </td>
                            </tr>
                          ) : (
                            listings.map((item, idx) => (
                              <tr
                                key={`${item.title}-${idx}`}
                                className="bg-transparent transition hover:bg-white/[0.03]"
                              >
                                <td className="max-w-xs px-4 py-3.5 font-medium text-neutral-100 sm:max-w-md sm:px-6">
                                  <span className="line-clamp-2">
                                    {item.title}
                                  </span>
                                </td>
                                <td className="whitespace-nowrap px-4 py-3.5 text-neutral-300 sm:px-6">
                                  {item.price ?? "—"}
                                </td>
                                <td className="px-4 py-3.5 sm:px-6">
                                  <StarRow rating={item.rating} />
                                </td>
                                <td className="whitespace-nowrap px-4 py-3.5 tabular-nums text-neutral-300 sm:px-6">
                                  {formatReviewCount(item.reviews)}
                                </td>
                                <td className="px-4 py-3.5 sm:px-6">
                                  <ReviewBadge reviews={item.reviews} />
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </section>
                </div>
              )}

              {showEmptyHint && (
                <div className="mt-10 flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-16 text-center sm:py-20">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                    <IconMagnifyingGlass className="h-7 w-7 text-neutral-500" />
                  </div>
                  <p className="max-w-xs text-pretty text-sm leading-relaxed text-neutral-500 sm:text-base">
                    Enter a shop URL above to see competitor insights
                  </p>
                </div>
              )}
            </div>
          ) : activeNav === "keyword-research" ? (
            <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col">
              <div className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Keyword Research
                </h1>
                <p className="mt-2 text-sm text-neutral-400 sm:text-base">
                  Analyze Etsy keyword competition and listing performance.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-xl shadow-black/20 backdrop-blur-sm sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <label htmlFor="keyword-query" className="sr-only">
                    Keyword
                  </label>
                  <input
                    id="keyword-query"
                    type="text"
                    name="keyword-query"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleKeywordResearch();
                    }}
                    placeholder="Enter keyword..."
                    autoComplete="off"
                    disabled={keywordLoading}
                    className="w-full rounded-xl border border-white/10 bg-neutral-950/80 px-4 py-3 text-base text-neutral-100 placeholder:text-neutral-500 outline-none ring-violet-400/0 transition focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/30 disabled:opacity-60"
                  />
                  <button
                    type="button"
                    onClick={handleKeywordResearch}
                    disabled={keywordLoading}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/35 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {keywordLoading ? (
                      <>
                        <Spinner className="h-4 w-4 text-white" />
                        Researching...
                      </>
                    ) : (
                      "Research"
                    )}
                  </button>
                </div>
              </div>

              {keywordLoading && (
                <div
                  className="mt-6 flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-14"
                  aria-live="polite"
                >
                  <Spinner className="h-10 w-10 text-violet-400" />
                  <p className="text-sm text-neutral-400">
                    Running keyword research...
                  </p>
                </div>
              )}

              {keywordError && !keywordLoading && (
                <div
                  className="mt-6 rounded-2xl border border-red-500/30 bg-red-950/40 px-4 py-4 text-sm text-red-200 ring-1 ring-red-500/20 sm:px-5"
                  role="alert"
                >
                  {keywordError}
                </div>
              )}

              {keywordData && !keywordLoading && (
                <div className="mt-6 space-y-6">
                  <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-lg shadow-black/20 backdrop-blur-sm sm:p-8">
                    <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                      Overview
                    </h2>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="rounded-xl border border-white/10 bg-neutral-950/60 p-4">
                        <p className="text-xs uppercase tracking-wider text-neutral-500">
                          Average Price
                        </p>
                        <p className="mt-2 text-xl font-semibold text-neutral-100">
                          {formatPrice(keywordData.average_price)}
                        </p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-neutral-950/60 p-4">
                        <p className="text-xs uppercase tracking-wider text-neutral-500">
                          Average Rating
                        </p>
                        <p className="mt-2 text-xl font-semibold text-neutral-100">
                          {typeof keywordData.average_rating === "number"
                            ? keywordData.average_rating.toFixed(2)
                            : "—"}
                        </p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-neutral-950/60 p-4">
                        <p className="text-xs uppercase tracking-wider text-neutral-500">
                          Total Reviews
                        </p>
                        <p className="mt-2 text-xl font-semibold text-neutral-100">
                          {formatReviewCount(keywordData.total_reviews)}
                        </p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-neutral-950/60 p-4">
                        <p className="text-xs uppercase tracking-wider text-neutral-500">
                          Competition Level
                        </p>
                        <div className="mt-2">
                          <CompetitionBadge
                            level={keywordData.competition_level}
                          />
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-xl shadow-black/20 backdrop-blur-sm">
                    <div className="border-b border-white/10 px-4 py-4 sm:px-6">
                      <h3 className="text-lg font-semibold text-white">
                        Top Listings
                      </h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[680px] text-left text-sm">
                        <thead>
                          <tr className="border-b border-white/10 bg-neutral-950/50 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                            <th className="px-4 py-3 sm:px-6">Title</th>
                            <th className="px-4 py-3 sm:px-6">Price</th>
                            <th className="px-4 py-3 sm:px-6">Rating</th>
                            <th className="px-4 py-3 sm:px-6">Reviews</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {keywordListings.length === 0 ? (
                            <tr>
                              <td
                                colSpan={4}
                                className="px-4 py-10 text-center text-neutral-500 sm:px-6"
                              >
                                No Etsy listings found in top results.
                              </td>
                            </tr>
                          ) : (
                            keywordListings.map((item, idx) => (
                              <tr
                                key={`${item.title ?? "listing"}-${idx}`}
                                className="bg-transparent transition hover:bg-white/[0.03]"
                              >
                                <td className="max-w-xs px-4 py-3.5 font-medium text-neutral-100 sm:max-w-md sm:px-6">
                                  <span className="line-clamp-2">
                                    {item.title ?? "Untitled listing"}
                                  </span>
                                </td>
                                <td className="whitespace-nowrap px-4 py-3.5 text-neutral-300 sm:px-6">
                                  {formatPrice(item.extracted_price)}
                                </td>
                                <td className="px-4 py-3.5 sm:px-6">
                                  <StarRow rating={item.rating} />
                                </td>
                                <td className="whitespace-nowrap px-4 py-3.5 tabular-nums text-neutral-300 sm:px-6">
                                  {formatReviewCount(item.reviews)}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </section>
                </div>
              )}
            </div>
          ) : (
            <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-4 py-16 text-center">
              <p className="text-lg font-medium text-neutral-300">
                {NAV_ITEMS.find((n) => n.id === activeNav)?.label}
              </p>
              <p className="mt-2 max-w-md text-sm text-neutral-500">
                This tool will open here soon.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
