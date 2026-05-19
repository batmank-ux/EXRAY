"use client";
 
// app/dashboard/page.js — EXRAY Dashboard
// Theme: #080C10 background · #7DD3F0 ice blue accent · solid colors only
 
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
 
// ─── THEME ────────────────────────────────────────────────────────
const ICE    = "#7DD3F0";
const BG     = "#080C10";
const CARD   = "#0D1219";
const CARD2  = "#0F151E";
const BORDER = "rgba(125,211,240,0.10)";
const BORDER_H = "rgba(125,211,240,0.25)";
const MUTED  = "#4A5568";
const TEXT   = "#E2E8F0";
 
// ─── ICONS ────────────────────────────────────────────────────────
function IconSearch({ size = 20, color = MUTED }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  );
}
function IconKey({ size = 20, color = MUTED }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="7.5" cy="15.5" r="5.5" /><path d="m21 2-9.6 9.6" /><path d="m15.5 7.5 3 3L22 7l-3-3" />
    </svg>
  );
}
function IconBolt({ size = 20, color = MUTED }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}
function IconMenu({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={TEXT} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
function Spinner() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" style={{ animation: "spin 0.8s linear infinite" }} aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
      <path fill={BG} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
 
// ─── BADGES ───────────────────────────────────────────────────────
function DifficultyBadge({ level }) {
  const v = String(level || "");
  const styles = {
    Hard:   { bg: "rgba(239,68,68,0.12)",   border: "rgba(239,68,68,0.3)",   color: "#FCA5A5" },
    Medium: { bg: "rgba(245,158,11,0.12)",  border: "rgba(245,158,11,0.3)",  color: "#FCD34D" },
    Easy:   { bg: "rgba(16,185,129,0.12)",  border: "rgba(16,185,129,0.3)",  color: "#6EE7B7" },
  };
  const s = styles[v];
  if (!s) return <span style={{ color: MUTED }}>--</span>;
  return (
    <span style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color, padding: "3px 12px", borderRadius: 99, fontSize: 12, fontWeight: 700 }}>
      {v}
    </span>
  );
}
 
function StrategyBadge({ strategy }) {
  const v = String(strategy || "");
  const map = {
    "Premium-heavy": { bg: "rgba(125,211,240,0.12)", border: BORDER_H, color: ICE },
    "Race to bottom": { bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.3)", color: "#FCA5A5" },
    "Tight cluster": { bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)", color: "#6EE7B7" },
  };
  const s = map[v] || { bg: "rgba(255,255,255,0.06)", border: BORDER, color: MUTED };
  return (
    <span style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color, padding: "3px 12px", borderRadius: 99, fontSize: 12, fontWeight: 600 }}>
      {v || "Mixed"}
    </span>
  );
}
 
// ─── HELPERS ──────────────────────────────────────────────────────
function formatPrice(v) {
  if (typeof v !== "number" || !Number.isFinite(v)) return null;
  return "$" + v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
 
// ─── NAV CONFIG ───────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "shop-spy",         label: "Shop Spy",        Icon: IconSearch, enabled: true },
  { id: "keyword-research", label: "Keyword Research", Icon: IconKey,    enabled: true },
  { id: "ai-action-plan",   label: "AI Action Plan",  Icon: IconBolt,   enabled: false },
];
 
// ─── MAIN DASHBOARD ───────────────────────────────────────────────
export default function DashboardPage() {
  const [activeNav, setActiveNav]       = useState("shop-spy");
  const [userEmail, setUserEmail]       = useState("");
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUserEmail(data?.user?.email || ""));
  }, []);
 
  const handleLogout = async () => {
    setLogoutLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };
 
  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        body { margin: 0; }
        .nav-btn:hover { background: rgba(125,211,240,0.06) !important; color: ${TEXT} !important; }
        .nav-btn-active { background: rgba(125,211,240,0.10) !important; color: #fff !important; }
        .logout-btn:hover { background: rgba(125,211,240,0.08) !important; }
        .etsy-link:hover { background: rgba(125,211,240,0.15) !important; }
        .list-item:hover { background: rgba(125,211,240,0.03) !important; }
        input:focus { outline: none; border-color: ${BORDER_H} !important; box-shadow: 0 0 0 3px rgba(125,211,240,0.08) !important; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(125,211,240,0.15); border-radius: 4px; }
      `}</style>
 
      <div style={{ display: "flex", minHeight: "100vh", background: BG, color: TEXT, fontFamily: "'DM Sans', 'Segoe UI', sans-serif", fontSize: 14 }}>
 
        {/* ── SIDEBAR ── */}
        <aside style={{
          width: 220,
          flexShrink: 0,
          background: CARD,
          borderRight: `1px solid ${BORDER}`,
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
        }}>
          {/* Logo */}
          <div style={{ padding: "24px 20px 20px", borderBottom: `1px solid ${BORDER}` }}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: 4, color: "#fff" }}>
                <span style={{ color: ICE }}>EX</span>RAY
              </div>
              <div style={{ fontSize: 10, color: MUTED, letterSpacing: 1.5, marginTop: 4 }}>ETSY INTELLIGENCE</div>
            </Link>
          </div>
 
          {/* Nav */}
          <nav style={{ padding: "16px 12px", flex: 1 }}>
            {NAV_ITEMS.map(({ id, label, Icon, enabled }) => {
              const isActive = activeNav === id;
              return (
                <button
                  key={id}
                  onClick={() => enabled && setActiveNav(id)}
                  disabled={!enabled}
                  className={isActive ? "nav-btn nav-btn-active" : "nav-btn"}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    width: "100%",
                    padding: "10px 12px",
                    marginBottom: 4,
                    borderRadius: 8,
                    border: isActive ? `1px solid ${BORDER_H}` : "1px solid transparent",
                    background: "transparent",
                    color: isActive ? "#fff" : enabled ? MUTED : "rgba(74,85,104,0.4)",
                    cursor: enabled ? "pointer" : "not-allowed",
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                    transition: "all 0.15s",
                  }}
                >
                  <Icon size={16} color={isActive ? ICE : enabled ? MUTED : "rgba(74,85,104,0.4)"} />
                  <span style={{ flex: 1 }}>{label}</span>
                  {!enabled && (
                    <span style={{ fontSize: 9, background: "rgba(255,255,255,0.06)", color: MUTED, padding: "2px 6px", borderRadius: 4, letterSpacing: 1 }}>
                      SOON
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
 
          {/* User */}
          <div style={{ padding: "16px 16px 20px", borderTop: `1px solid ${BORDER}` }}>
            <div style={{ fontSize: 11, color: MUTED, marginBottom: 10, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {userEmail}
            </div>
            <button
              onClick={handleLogout}
              disabled={logoutLoading}
              className="logout-btn"
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: 7,
                border: `1px solid ${BORDER}`,
                background: "transparent",
                color: MUTED,
                fontSize: 12,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {logoutLoading ? "Logging out..." : "Log out"}
            </button>
          </div>
        </aside>
 
        {/* ── MAIN ── */}
        <main style={{ flex: 1, overflowY: "auto", padding: "40px 48px" }}>
          {activeNav === "shop-spy"         && <ShopSpy />}
          {activeNav === "keyword-research" && <KeywordResearch />}
        </main>
      </div>
    </>
  );
}
 
// ─── SHARED UI ────────────────────────────────────────────────────
function PageHeader({ title, desc }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, color: "#fff", margin: 0, letterSpacing: -0.5 }}>
        {title}
      </h1>
      <p style={{ color: MUTED, fontSize: 14, marginTop: 6, marginBottom: 0 }}>{desc}</p>
    </div>
  );
}
 
function SearchBox({ value, onChange, placeholder, loading, label }) {
  return (
    <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 20, marginBottom: 24 }}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={loading}
        style={{
          width: "100%",
          background: BG,
          border: `1px solid ${BORDER}`,
          borderRadius: 7,
          padding: "12px 16px",
          color: TEXT,
          fontSize: 14,
          marginBottom: 12,
          display: "block",
          transition: "all 0.15s",
        }}
      />
      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: 7,
          border: "none",
          background: loading ? "rgba(125,211,240,0.3)" : ICE,
          color: BG,
          fontSize: 14,
          fontWeight: 700,
          fontFamily: "'Syne', sans-serif",
          letterSpacing: 1,
          cursor: loading ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          transition: "all 0.15s",
        }}
      >
        {loading ? <><Spinner />{label}ing...</> : label}
      </button>
    </div>
  );
}
 
function EmptyState({ icon, text }) {
  return (
    <div style={{
      marginTop: 32,
      border: `1px dashed ${BORDER}`,
      borderRadius: 10,
      padding: "64px 24px",
      textAlign: "center",
      color: MUTED,
      fontSize: 14,
    }}>
      <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
      {text}
    </div>
  );
}
 
function ErrorBox({ msg }) {
  return (
    <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8, padding: "14px 16px", color: "#FCA5A5", fontSize: 13, marginBottom: 20 }}>
      {msg}
    </div>
  );
}
 
function StatCard({ label, value, valueColor }) {
  return (
    <div style={{ background: CARD2, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "16px 18px" }}>
      <div style={{ fontSize: 10, letterSpacing: 2, color: MUTED, fontWeight: 700, marginBottom: 8 }}>{label.toUpperCase()}</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: valueColor || "#fff", fontFamily: "'Syne', sans-serif" }}>{value}</div>
    </div>
  );
}
 
function PricingSection({ analysis }) {
  if (!analysis) return null;
  return (
    <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "20px 24px", marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ fontWeight: 600, color: "#fff", fontSize: 14 }}>Pricing Strategy</div>
        <StrategyBadge strategy={analysis.strategy} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
        {[
          { label: "Lowest",  val: `$${analysis.min}`,    color: TEXT },
          { label: "Median",  val: `$${analysis.median}`, color: ICE },
          { label: "Average", val: `$${analysis.average}`,color: TEXT },
          { label: "Highest", val: `$${analysis.max}`,    color: TEXT },
        ].map(({ label, val, color }) => (
          <div key={label} style={{ background: BG, border: `1px solid ${BORDER}`, borderRadius: 7, padding: "12px 14px" }}>
            <div style={{ fontSize: 10, letterSpacing: 2, color: MUTED, fontWeight: 700, marginBottom: 6 }}>{label.toUpperCase()}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color, fontFamily: "'Syne', sans-serif" }}>{val}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 11, color: MUTED, marginTop: 10 }}>Based on {analysis.dataPoints} listings with visible prices</div>
    </div>
  );
}
 
function ListingsSection({ listings, keyword }) {
  return (
    <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, overflow: "hidden" }}>
      <div style={{ padding: "16px 24px", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ fontWeight: 600, color: "#fff", fontSize: 14 }}>Top Listings</div>
        <div style={{ fontSize: 11, color: MUTED, marginTop: 3 }}>
          {keyword ? `Top results for "${keyword}" on Etsy` : "Most visible listings from this shop"}
        </div>
      </div>
      {listings.map((item, idx) => (
        <div
          key={idx}
          className="list-item"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            padding: "14px 24px",
            borderBottom: idx < listings.length - 1 ? `1px solid ${BORDER}` : "none",
            transition: "background 0.15s",
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: TEXT, fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {item.title}
            </div>
            <div style={{ color: item.price ? TEXT : MUTED, fontSize: 12, marginTop: 4, fontWeight: item.price ? 600 : 400 }}>
              {item.price || "Price not available"}
            </div>
          </div>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="etsy-link"
            style={{
              flexShrink: 0,
              padding: "6px 14px",
              borderRadius: 6,
              border: `1px solid ${BORDER_H}`,
              color: ICE,
              fontSize: 11,
              fontWeight: 600,
              textDecoration: "none",
              background: "transparent",
              letterSpacing: 0.5,
              transition: "all 0.15s",
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
  const [shopName, setShopName] = useState("");
  const [loading, setLoading]   = useState(false);
  const [data, setData]         = useState(null);
  const [error, setError]       = useState("");
 
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!shopName.trim()) return;
    setLoading(true); setError(""); setData(null);
    try {
      const res  = await fetch("/api/etsy/shop?shopname=" + encodeURIComponent(shopName));
      const json = await res.json();
      if (!res.ok) setError(json.error || "Something went wrong");
      else setData(json);
    } catch { setError("Network error. Please try again."); }
    finally { setLoading(false); }
  };
 
  return (
    <div style={{ maxWidth: 860, margin: "0 auto" }}>
      <PageHeader title="Shop Spy" desc="Analyze any Etsy shop and surface real competitor insights." />
      <form onSubmit={handleSearch}>
        <SearchBox
          value={shopName}
          onChange={e => setShopName(e.target.value)}
          placeholder="Paste Etsy shop URL or enter shop name..."
          loading={loading}
          label="Spy Now"
        />
      </form>
      {error && <ErrorBox msg={error} />}
      {data && !loading && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Shop Overview */}
          <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22, color: "#fff" }}>{data.shopName}</div>
              <div style={{ color: MUTED, fontSize: 13, marginTop: 4 }}>
                <span style={{ color: TEXT, fontWeight: 600 }}>{data.totalFound}</span> listings found
                {data.shopReviews && <> · <span style={{ color: TEXT, fontWeight: 600 }}>{data.shopReviews.toLocaleString()}</span> reviews</>}
                {data.shopRating  && <> · <span style={{ color: "#FCD34D", fontWeight: 600 }}>{data.shopRating}★</span></>}
              </div>
            </div>
            <a
              href={data.shopUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="etsy-link"
              style={{ padding: "8px 18px", border: `1px solid ${BORDER_H}`, borderRadius: 7, color: ICE, textDecoration: "none", fontSize: 13, fontWeight: 600, flexShrink: 0, transition: "all 0.15s" }}
            >
              View on Etsy →
            </a>
          </div>
          <PricingSection analysis={data.pricingAnalysis} />
          <ListingsSection listings={Array.isArray(data.listings) ? data.listings : []} />
        </div>
      )}
      {!data && !loading && !error && (
        <EmptyState icon="🔍" text="Enter a shop name or URL above to see competitor insights" />
      )}
    </div>
  );
}
 
// ─── KEYWORD RESEARCH ─────────────────────────────────────────────
function KeywordResearch() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData]       = useState(null);
  const [error, setError]     = useState("");
 
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    setLoading(true); setError(""); setData(null);
    try {
      const res  = await fetch("/api/etsy/keywords?keyword=" + encodeURIComponent(keyword));
      const json = await res.json();
      if (!res.ok) setError(json.error || "Something went wrong");
      else setData(json);
    } catch { setError("Network error. Please try again."); }
    finally { setLoading(false); }
  };
 
  return (
    <div style={{ maxWidth: 860, margin: "0 auto" }}>
      <PageHeader title="Keyword Research" desc="Discover competition, pricing, and difficulty for any Etsy keyword." />
      <form onSubmit={handleSearch}>
        <SearchBox
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          placeholder="Enter a keyword (e.g. minimalist wall art)"
          loading={loading}
          label="Research"
        />
      </form>
      {error && <ErrorBox msg={error} />}
      {data && !loading && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Stat Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            <StatCard label="Avg Price"      value={data.averagePrice ? `$${data.averagePrice}` : "--"} />
            <StatCard label="Avg Rating"     value={data.averageRating ? `${data.averageRating}★` : "--"} valueColor="#FCD34D" />
            <StatCard label="Total Listings" value={data.totalFound} />
            <div style={{ background: CARD2, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "16px 18px" }}>
              <div style={{ fontSize: 10, letterSpacing: 2, color: MUTED, fontWeight: 700, marginBottom: 8 }}>DIFFICULTY</div>
              <DifficultyBadge level={data.difficultyScore} />
            </div>
          </div>
          <PricingSection analysis={data.pricingAnalysis} />
          <ListingsSection listings={Array.isArray(data.listings) ? data.listings : []} keyword={data.keyword} />
        </div>
      )}
      {!data && !loading && !error && (
        <EmptyState icon="📊" text="Enter a keyword above to see market data" />
      )}
    </div>
  );
}