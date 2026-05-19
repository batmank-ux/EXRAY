"use client";
 
// app/dashboard/page.js — EXRAY Dashboard v2
// Theme: #080C10 bg · #7DD3F0 ice accent · JetBrains Mono numbers · Syne headings
 
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
 
// ─── TOKENS ───────────────────────────────────────────────────────
const ICE      = "#7DD3F0";
const ICE_DIM  = "rgba(125,211,240,0.65)";
const BG       = "#080C10";
const SURFACE  = "#0C1118";
const CARD     = "#0F161F";
const BORDER   = "rgba(125,211,240,0.09)";
const BORDER_A = "rgba(125,211,240,0.22)";
const TEXT     = "#CBD5E1";
const TEXT_HI  = "#F0F9FF";
const MUTED    = "#3D5166";
const MONO     = "'JetBrains Mono', 'Fira Mono', monospace";
const DISPLAY  = "'Syne', sans-serif";
const BODY     = "'DM Sans', 'Inter', sans-serif";
 
// ─── ICONS ────────────────────────────────────────────────────────
const IconSearch = ({ size = 18, color = MUTED }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);
const IconKey = ({ size = 18, color = MUTED }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="7.5" cy="15.5" r="5.5" /><path d="m21 2-9.6 9.6" /><path d="m15.5 7.5 3 3L22 7l-3-3" />
  </svg>
);
const IconBolt = ({ size = 18, color = MUTED }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);
const Spinner = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" style={{ animation: "spin .8s linear infinite", flexShrink: 0 }} aria-hidden>
    <circle cx="12" cy="12" r="10" stroke="rgba(125,211,240,0.2)" strokeWidth="4" />
    <path fill={ICE} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);
 
// ─── BADGES ───────────────────────────────────────────────────────
const badge = (bg, border, color, text) => (
  <span style={{ background: bg, border: `1px solid ${border}`, color, padding: "4px 12px", borderRadius: 99, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, fontFamily: BODY }}>
    {text}
  </span>
);
 
const DifficultyBadge = ({ level }) => {
  const v = String(level || "");
  if (v === "Hard")   return badge("rgba(239,68,68,0.10)",  "rgba(239,68,68,0.25)",  "#FCA5A5", "Hard");
  if (v === "Medium") return badge("rgba(245,158,11,0.10)", "rgba(245,158,11,0.25)", "#FCD34D", "Medium");
  if (v === "Easy")   return badge("rgba(34,197,94,0.10)",  "rgba(34,197,94,0.25)",  "#86EFAC", "Easy");
  return <span style={{ color: MUTED, fontFamily: BODY, fontSize: 13 }}>--</span>;
};
 
const StrategyBadge = ({ strategy }) => {
  const v = String(strategy || "");
  if (v === "Premium-heavy")  return badge("rgba(125,211,240,0.08)", BORDER_A,                   ICE,       "Premium-heavy");
  if (v === "Race to bottom") return badge("rgba(239,68,68,0.08)",   "rgba(239,68,68,0.22)",    "#FCA5A5", "Race to bottom");
  if (v === "Tight cluster")  return badge("rgba(34,197,94,0.08)",   "rgba(34,197,94,0.22)",    "#86EFAC", "Tight cluster");
  return badge("rgba(255,255,255,0.04)", BORDER, MUTED, "Mixed");
};
 
// ─── HELPERS ──────────────────────────────────────────────────────
const fmtPrice = (v) => typeof v === "number" && Number.isFinite(v)
  ? "$" + v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  : null;
 
// ─── NAV ──────────────────────────────────────────────────────────
const NAV = [
  { id: "shop-spy",         label: "Shop Spy",        Icon: IconSearch, on: true  },
  { id: "keyword-research", label: "Keyword Research", Icon: IconKey,    on: true  },
  { id: "ai-action-plan",   label: "AI Action Plan",  Icon: IconBolt,   on: false },
];
 
// ─── ROOT ─────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [active, setActive]         = useState("shop-spy");
  const [email, setEmail]           = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
 
  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => setEmail(data?.user?.email || ""));
  }, []);
 
  const logout = async () => {
    setLoggingOut(true);
    await createClient().auth.signOut();
    window.location.href = "/";
  };
 
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${BG}; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .nb { transition: background .15s, color .15s, border-color .15s; }
        .nb:hover { background: rgba(125,211,240,0.05) !important; color: ${TEXT_HI} !important; }
        .nb.on { background: rgba(125,211,240,0.08) !important; color: ${TEXT_HI} !important; border-color: ${BORDER_A} !important; }
        .row:hover { background: rgba(125,211,240,0.025) !important; }
        .lnk:hover { background: rgba(125,211,240,0.12) !important; border-color: ${ICE} !important; }
        .sub-btn:hover { background: rgba(125,211,240,0.10) !important; }
        input { transition: border-color .15s, box-shadow .15s; }
        input:focus { outline: none !important; border-color: ${BORDER_A} !important; box-shadow: 0 0 0 3px rgba(125,211,240,0.07) !important; }
        ::-webkit-scrollbar { width: 3px; } 
        ::-webkit-scrollbar-thumb { background: rgba(125,211,240,0.12); border-radius: 4px; }
      `}</style>
 
      <div style={{ display: "flex", height: "100vh", background: BG, color: TEXT, fontFamily: BODY, fontSize: 14, overflow: "hidden" }}>
 
        {/* SIDEBAR */}
        <aside style={{ width: 216, flexShrink: 0, background: SURFACE, borderRight: `1px solid ${BORDER}`, display: "flex", flexDirection: "column", height: "100vh" }}>
 
          {/* Logo */}
          <div style={{ padding: "22px 20px 18px", borderBottom: `1px solid ${BORDER}` }}>
            <Link href="/" style={{ textDecoration: "none", display: "block" }}>
              <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 19, letterSpacing: 5, color: TEXT_HI, lineHeight: 1 }}>
                <span style={{ color: ICE }}>EX</span>RAY
              </div>
              <div style={{ fontFamily: BODY, fontSize: 9, color: MUTED, letterSpacing: 2.5, marginTop: 5, fontWeight: 600 }}>
                ETSY INTELLIGENCE
              </div>
            </Link>
          </div>
 
          {/* Nav items */}
          <nav style={{ padding: "14px 10px", flex: 1 }}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: MUTED, fontWeight: 700, padding: "0 10px", marginBottom: 8 }}>TOOLS</div>
            {NAV.map(({ id, label, Icon, on }) => {
              const isActive = active === id;
              return (
                <button
                  key={id}
                  onClick={() => on && setActive(id)}
                  disabled={!on}
                  className={`nb${isActive ? " on" : ""}`}
                  style={{
                    display: "flex", alignItems: "center", gap: 9,
                    width: "100%", padding: "9px 10px", marginBottom: 2,
                    borderRadius: 7, border: `1px solid transparent`,
                    background: "transparent",
                    color: isActive ? TEXT_HI : on ? TEXT : MUTED,
                    cursor: on ? "pointer" : "not-allowed",
                    textAlign: "left", fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                    fontFamily: BODY,
                    opacity: on ? 1 : 0.4,
                  }}
                >
                  <Icon size={15} color={isActive ? ICE : on ? ICE_DIM : MUTED} />
                  <span style={{ flex: 1 }}>{label}</span>
                  {!on && (
                    <span style={{ fontSize: 8, background: "rgba(255,255,255,0.05)", color: MUTED, padding: "2px 7px", borderRadius: 4, letterSpacing: 1.5, fontWeight: 700 }}>
                      SOON
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
 
          {/* User footer */}
          <div style={{ padding: "14px 14px 18px", borderTop: `1px solid ${BORDER}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(125,211,240,0.12)", border: `1px solid ${BORDER_A}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: ICE, flexShrink: 0, fontFamily: DISPLAY }}>
                {email ? email[0].toUpperCase() : "?"}
              </div>
              <div style={{ fontSize: 11, color: TEXT, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
                {email}
              </div>
            </div>
            <button
              onClick={logout}
              disabled={loggingOut}
              className="sub-btn"
              style={{ width: "100%", padding: "7px", borderRadius: 6, border: `1px solid ${BORDER}`, background: "transparent", color: MUTED, fontSize: 11, cursor: "pointer", fontFamily: BODY, letterSpacing: 0.5 }}
            >
              {loggingOut ? "Logging out…" : "Log out"}
            </button>
          </div>
        </aside>
 
        {/* MAIN */}
        <main style={{ flex: 1, overflowY: "auto", padding: "44px 52px" }}>
          {active === "shop-spy"         && <ShopSpy />}
          {active === "keyword-research" && <KeywordResearch />}
        </main>
      </div>
    </>
  );
}
 
// ─── SHARED COMPONENTS ────────────────────────────────────────────
 
function PageHeader({ title, desc }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <h1 style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 30, color: TEXT_HI, letterSpacing: -0.5, lineHeight: 1.1 }}>
        {title}
      </h1>
      <p style={{ fontFamily: BODY, color: "#4A6478", fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>
        {desc}
      </p>
    </div>
  );
}
 
function SearchForm({ value, onChange, placeholder, loading, btnLabel, onSubmit }) {
  return (
    <form onSubmit={onSubmit} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "18px 20px", marginBottom: 28 }}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={loading}
        style={{
          width: "100%", display: "block",
          background: BG, border: `1px solid ${BORDER}`,
          borderRadius: 7, padding: "11px 15px",
          color: TEXT_HI, fontSize: 14, fontFamily: BODY,
          marginBottom: 11,
        }}
      />
      <button
        type="submit"
        disabled={loading}
        className="nb"
        style={{
          width: "100%", padding: "11px",
          borderRadius: 7, border: `1px solid ${BORDER_A}`,
          background: "rgba(125,211,240,0.08)",
          color: ICE, fontSize: 13, fontWeight: 700,
          fontFamily: DISPLAY, letterSpacing: 2,
          cursor: loading ? "not-allowed" : "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? <><Spinner />{btnLabel}ING…</> : btnLabel}
      </button>
    </form>
  );
}
 
function ErrorBox({ msg }) {
  return (
    <div style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.18)", borderRadius: 8, padding: "13px 16px", color: "#FCA5A5", fontSize: 13, marginBottom: 20, fontFamily: BODY }}>
      {msg}
    </div>
  );
}
 
function EmptyState({ icon, text }) {
  return (
    <div style={{ marginTop: 28, border: `1px dashed ${BORDER}`, borderRadius: 10, padding: "72px 24px", textAlign: "center" }}>
      <div style={{ fontSize: 32, marginBottom: 14 }}>{icon}</div>
      <div style={{ color: MUTED, fontSize: 14, fontFamily: BODY }}>{text}</div>
    </div>
  );
}
 
function StatCard({ label, value, valueColor, children }) {
  return (
    <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 9, padding: "18px 20px" }}>
      <div style={{ fontFamily: BODY, fontSize: 10, letterSpacing: 2.5, color: ICE_DIM, fontWeight: 700, marginBottom: 12, opacity: 0.8 }}>
        {label}
      </div>
      {children || (
        <div style={{ fontFamily: MONO, fontSize: 24, fontWeight: 700, color: valueColor || TEXT_HI, letterSpacing: -0.5, lineHeight: 1 }}>
          {value}
        </div>
      )}
    </div>
  );
}
 
function PricingSection({ analysis }) {
  if (!analysis) return null;
  return (
    <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "20px 24px", marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 14, color: TEXT_HI }}>Pricing Strategy</div>
        <StrategyBadge strategy={analysis.strategy} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
        {[
          { label: "LOWEST",  val: `$${analysis.min}`,     color: TEXT     },
          { label: "MEDIAN",  val: `$${analysis.median}`,  color: ICE      },
          { label: "AVERAGE", val: `$${analysis.average}`, color: TEXT     },
          { label: "HIGHEST", val: `$${analysis.max}`,     color: TEXT_HI  },
        ].map(({ label, val, color }) => (
          <div key={label} style={{ background: BG, border: `1px solid ${BORDER}`, borderRadius: 7, padding: "14px 16px" }}>
            <div style={{ fontFamily: BODY, fontSize: 9, letterSpacing: 2.5, color: MUTED, fontWeight: 700, marginBottom: 8 }}>{label}</div>
            <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 700, color, letterSpacing: -0.3, lineHeight: 1 }}>{val}</div>
          </div>
        ))}
      </div>
      <div style={{ fontFamily: BODY, fontSize: 11, color: MUTED, marginTop: 12 }}>
        Based on {analysis.dataPoints} listings with visible prices
      </div>
    </div>
  );
}
 
function ListingsSection({ listings, keyword }) {
  if (!listings.length) return null;
  return (
    <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 10, overflow: "hidden" }}>
      <div style={{ padding: "16px 24px", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 14, color: TEXT_HI }}>Top Listings</div>
        <div style={{ fontFamily: BODY, fontSize: 11, color: MUTED, marginTop: 3 }}>
          {keyword ? `Top results for "${keyword}" on Etsy` : "Most visible listings from this shop"}
        </div>
      </div>
      {listings.map((item, i) => (
        <div
          key={i}
          className="row"
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: 16, padding: "13px 24px",
            borderBottom: i < listings.length - 1 ? `1px solid ${BORDER}` : "none",
            transition: "background .12s",
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: BODY, color: TEXT, fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {item.title}
            </div>
            <div style={{ fontFamily: MONO, fontSize: 12, marginTop: 4, color: item.price ? ICE_DIM : MUTED, fontWeight: 500 }}>
              {item.price || "—"}
            </div>
          </div>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="lnk"
            style={{
              flexShrink: 0, padding: "5px 14px",
              borderRadius: 6, border: `1px solid ${BORDER_A}`,
              color: ICE, fontSize: 11, fontWeight: 600,
              textDecoration: "none", background: "transparent",
              letterSpacing: 0.5, fontFamily: BODY,
              transition: "all .15s",
            }}
          >
            View →
          </a>
        </div>
      ))}
    </div>
  );
}
 
// ─── SHOP SPY ─────────────────────────────────────────────────────
function ShopSpy() {
  const [shop, setShop]     = useState("");
  const [loading, setLoad]  = useState(false);
  const [data, setData]     = useState(null);
  const [error, setError]   = useState("");
 
  const search = async (e) => {
    e.preventDefault();
    if (!shop.trim()) return;
    setLoad(true); setError(""); setData(null);
    try {
      const res  = await fetch("/api/etsy/shop?shopname=" + encodeURIComponent(shop));
      const json = await res.json();
      if (!res.ok) setError(json.error || "Something went wrong");
      else setData(json);
    } catch { setError("Network error. Please try again."); }
    finally { setLoad(false); }
  };
 
  return (
    <div style={{ maxWidth: 840, margin: "0 auto" }}>
      <PageHeader title="Shop Spy" desc="Analyze any Etsy shop. Surface pricing, listings, and competitor insights." />
      <SearchForm value={shop} onChange={e => setShop(e.target.value)} placeholder="Shop name or Etsy URL…" loading={loading} btnLabel="SPY NOW" onSubmit={search} />
      {error && <ErrorBox msg={error} />}
      {data && !loading && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Overview card */}
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <div>
              <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 22, color: TEXT_HI, letterSpacing: -0.3 }}>{data.shopName}</div>
              <div style={{ fontFamily: BODY, color: MUTED, fontSize: 13, marginTop: 5, display: "flex", gap: 14, flexWrap: "wrap" }}>
                <span><span style={{ fontFamily: MONO, color: TEXT, fontWeight: 600 }}>{data.totalFound}</span> listings</span>
                {data.shopReviews && <span><span style={{ fontFamily: MONO, color: TEXT, fontWeight: 600 }}>{data.shopReviews.toLocaleString()}</span> reviews</span>}
                {data.shopRating  && <span><span style={{ fontFamily: MONO, color: "#FCD34D", fontWeight: 600 }}>{data.shopRating}★</span></span>}
              </div>
            </div>
            <a href={data.shopUrl} target="_blank" rel="noopener noreferrer" className="lnk"
              style={{ padding: "8px 18px", border: `1px solid ${BORDER_A}`, borderRadius: 7, color: ICE, textDecoration: "none", fontSize: 12, fontWeight: 600, flexShrink: 0, fontFamily: BODY, letterSpacing: 0.5, transition: "all .15s" }}>
              View on Etsy →
            </a>
          </div>
          <PricingSection analysis={data.pricingAnalysis} />
          <ListingsSection listings={Array.isArray(data.listings) ? data.listings : []} />
        </div>
      )}
      {!data && !loading && !error && <EmptyState icon="🔍" text="Enter a shop name or URL above to see competitor insights" />}
    </div>
  );
}
 
// ─── KEYWORD RESEARCH ─────────────────────────────────────────────
function KeywordResearch() {
  const [kw, setKw]         = useState("");
  const [loading, setLoad]  = useState(false);
  const [data, setData]     = useState(null);
  const [error, setError]   = useState("");
 
  const search = async (e) => {
    e.preventDefault();
    if (!kw.trim()) return;
    setLoad(true); setError(""); setData(null);
    try {
      const res  = await fetch("/api/etsy/keywords?keyword=" + encodeURIComponent(kw));
      const json = await res.json();
      if (!res.ok) setError(json.error || "Something went wrong");
      else setData(json);
    } catch { setError("Network error. Please try again."); }
    finally { setLoad(false); }
  };
 
  return (
    <div style={{ maxWidth: 840, margin: "0 auto" }}>
      <PageHeader title="Keyword Research" desc="Discover competition level, pricing strategy, and difficulty for any Etsy keyword." />
      <SearchForm value={kw} onChange={e => setKw(e.target.value)} placeholder="Enter a keyword (e.g. minimalist wall art)…" loading={loading} btnLabel="RESEARCH" onSubmit={search} />
      {error && <ErrorBox msg={error} />}
      {data && !loading && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Stat row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
            <StatCard label="AVG PRICE"      value={data.averagePrice ? `$${data.averagePrice}` : "—"} />
            <StatCard label="AVG RATING"     value={data.averageRating ? `${data.averageRating}★` : "—"} valueColor="#FCD34D" />
            <StatCard label="TOTAL LISTINGS" value={data.totalFound ?? "—"} />
            <StatCard label="DIFFICULTY">
              <div style={{ marginTop: 2 }}><DifficultyBadge level={data.difficultyScore} /></div>
            </StatCard>
          </div>
          <PricingSection analysis={data.pricingAnalysis} />
          <ListingsSection listings={Array.isArray(data.listings) ? data.listings : []} keyword={data.keyword} />
        </div>
      )}
      {!data && !loading && !error && <EmptyState icon="📊" text="Enter a keyword above to see market data" />}
    </div>
  );
}