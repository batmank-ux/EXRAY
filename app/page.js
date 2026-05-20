'use client'
// app/page.js — EXRAY Landing Page v3
// Premium Intelligence Platform — Linear + Stripe + Bloomberg aesthetic
// Ice #7DD3F0 · #080C10 bg · Inter only · Solid surfaces · No glow
 
import Link from 'next/link'
import { useState, useEffect } from 'react'
 
// ─── TOKENS ───────────────────────────────────────────────────────
const T = {
  ice:      '#7DD3F0',
  iceDim:   'rgba(125,211,240,0.5)',
  iceFaint: 'rgba(125,211,240,0.07)',
  iceSubtle:'rgba(125,211,240,0.04)',
  bg:       '#080C10',
  s1:       '#0B1017',
  s2:       '#0E141C',
  s3:       '#111A24',
  s4:       '#141E28',
  border:   'rgba(255,255,255,0.06)',
  borderA:  'rgba(125,211,240,0.18)',
  text:     '#8899A6',
  textMid:  '#B0BEC5',
  textHi:   '#E8F0F5',
  muted:    '#2D3F4E',
  green:    '#4ADE80',
  amber:    '#FCD34D',
  red:      '#F87171',
  font:     "'Inter', system-ui, sans-serif",
  mono:     "'JetBrains Mono', 'Fira Mono', monospace",
}
 
// ─── DATA ─────────────────────────────────────────────────────────
const compareRows = [
  { feature: 'Shop competitor spy',      exray: '✓', erank: '✓',  marma: '✓'  },
  { feature: 'Keyword difficulty score', exray: '✓', erank: '✗',  marma: '✗'  },
  { feature: 'Pricing strategy analysis',exray: '✓', erank: '✗',  marma: '✗'  },
  { feature: 'No data padding',          exray: '✓', erank: '–',  marma: '–'  },
  { feature: 'Beginner friendly UI',     exray: '✓', erank: '–',  marma: '–'  },
  { feature: 'Price',                    exray: 'Free / $12', erank: '$10/mo', marma: '$19/mo' },
]
 
const mockListings = [
  { shop: 'CaitlynMinimalist', title: '14k Gold Initial Necklace — Dainty Personalized', price: '$48.00', sales: '124k', rating: '4.9', badge: 'Premium-heavy', badgeColor: T.ice, badgeBg: T.iceFaint, badgeBorder: T.borderA },
  { shop: 'MignonandMignon',   title: 'Custom Birthstone Ring · Sterling Silver',        price: '$32.50', sales: '89k',  rating: '4.8', badge: null },
  { shop: 'LunaAndSol',        title: 'Personalized Name Necklace · Gold Fill',          price: '$54.00', sales: '67k',  rating: '5.0', badge: null },
  { shop: 'TheHexadFactory',   title: 'Dainty Stacking Ring Set · Minimalist',           price: '$28.00', sales: '43k',  rating: '4.7', badge: 'Tight cluster', badgeColor: T.green, badgeBg: 'rgba(74,222,128,0.07)', badgeBorder: 'rgba(74,222,128,0.2)' },
]
 
const pricingCards = [
  { label: 'LOWEST',  val: '$25.50', color: T.textMid },
  { label: 'MEDIAN',  val: '$881.40', color: T.ice },
  { label: 'AVERAGE', val: '$2,217', color: T.textMid },
  { label: 'HIGHEST', val: '$5,594', color: T.textHi },
]
 
// ─── MAIN ─────────────────────────────────────────────────────────
export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
 
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;1,14..32,400&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${T.bg}; color: ${T.text}; font-family: ${T.font}; -webkit-font-smoothing: antialiased; line-height: 1.6; }
        a { text-decoration: none; color: inherit; }
        ::selection { background: rgba(125,211,240,0.15); color: ${T.textHi}; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: rgba(125,211,240,0.12); border-radius: 4px; }
 
        .nav-a { font-size: 13.5px; color: ${T.text}; transition: color .15s; font-weight: 450; }
        .nav-a:hover { color: ${T.textHi}; }
 
        .btn-ice {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 9px 22px; border-radius: 6px;
          border: 1px solid ${T.borderA};
          background: ${T.iceFaint};
          color: ${T.ice}; font-size: 13.5px; font-weight: 500;
          transition: background .15s, border-color .15s;
          cursor: pointer; font-family: ${T.font};
          letter-spacing: 0.1px;
        }
        .btn-ice:hover { background: rgba(125,211,240,0.12); border-color: rgba(125,211,240,0.35); }
 
        .btn-outline {
          display: inline-flex; align-items: center;
          padding: 9px 20px; border-radius: 6px;
          border: 1px solid ${T.border};
          color: ${T.text}; font-size: 13.5px; font-weight: 450;
          transition: border-color .15s, color .15s;
          cursor: pointer; font-family: ${T.font};
        }
        .btn-outline:hover { border-color: rgba(255,255,255,0.12); color: ${T.textHi}; }
 
        .surface { background: ${T.s1}; border: 1px solid ${T.border}; border-radius: 10px; }
        .surface-2 { background: ${T.s2}; border: 1px solid ${T.border}; border-radius: 8px; }
 
        .feat-item { border-top: 1px solid ${T.border}; padding: 28px 0; transition: border-color .2s; }
        .feat-item:hover { border-color: rgba(255,255,255,0.1); }
 
        .listing-row { display: flex; align-items: center; gap: 16px; padding: 13px 20px; border-bottom: 1px solid ${T.border}; transition: background .1s; }
        .listing-row:hover { background: rgba(255,255,255,0.015); }
        .listing-row:last-child { border-bottom: none; }
 
        .compare-tr td { transition: background .1s; }
        .compare-tr:hover td { background: rgba(255,255,255,0.015) !important; }
 
        .price-plan { background: ${T.s1}; border: 1px solid ${T.border}; border-radius: 12px; padding: 32px 28px; transition: border-color .2s; }
        .price-plan:hover { border-color: rgba(255,255,255,0.1); }
        .price-plan.featured { border-color: ${T.borderA}; }
 
        .stat-item { padding: 36px 32px; border-right: 1px solid ${T.border}; }
        .stat-item:last-child { border-right: none; }
 
        @media (max-width: 800px) {
          .hero-title { font-size: 38px !important; letter-spacing: -1px !important; }
          .nav-links-wrap { display: none !important; }
          .feat-two-col { grid-template-columns: 1fr !important; }
          .price-two-col { grid-template-columns: 1fr !important; }
          .stat-row-4 { grid-template-columns: repeat(2,1fr) !important; }
          .stat-item { border-right: none !important; border-bottom: 1px solid ${T.border}; }
          .wrap { padding-left: 20px !important; padding-right: 20px !important; }
          .mock-pricing-grid { grid-template-columns: repeat(2,1fr) !important; }
          .mock-listings-table { display: none; }
        }
      `}</style>
 
      <div style={{ background: T.bg }}>
 
        {/* NAV */}
        <nav style={{
          position: 'sticky', top: 0, zIndex: 100,
          height: 58,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 48px',
          background: scrolled ? 'rgba(8,12,16,0.92)' : 'transparent',
          borderBottom: `1px solid ${scrolled ? T.border : 'transparent'}`,
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          transition: 'background .25s, border-color .25s',
        }}>
          <a href="/" style={{ fontWeight: 800, fontSize: 17, letterSpacing: 5, color: T.textHi }}>
            <span style={{ color: T.ice }}>EX</span>RAY
          </a>
          <div className="nav-links-wrap" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            <a href="#product"  className="nav-a">Product</a>
            <a href="#compare"  className="nav-a">Compare</a>
            <a href="#pricing"  className="nav-a">Pricing</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Link href="/login"  className="nav-a" style={{ marginRight: 4 }}>Log in</Link>
            <Link href="/signup" className="btn-ice" style={{ padding: '7px 18px', fontSize: 13 }}>Get started</Link>
          </div>
        </nav>
 
        {/* HERO */}
        <section className="wrap" style={{ maxWidth: 1100, margin: '0 auto', padding: '96px 48px 80px' }}>
 
          {/* Label */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 36 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: T.ice, display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontSize: 11, letterSpacing: 2.5, color: T.iceDim, fontWeight: 600 }}>ETSY COMPETITOR INTELLIGENCE</span>
          </div>
 
          {/* Headline */}
          <h1 className="hero-title" style={{
            fontWeight: 800, fontSize: 60,
            lineHeight: 1.05, letterSpacing: -2,
            color: T.textHi, maxWidth: 680,
            marginBottom: 24,
          }}>
            Know exactly what<br />
            makes Etsy shops<br />
            <span style={{ color: T.ice }}>succeed.</span>
          </h1>
 
          <p style={{ fontSize: 16, color: T.text, lineHeight: 1.8, maxWidth: 480, marginBottom: 44 }}>
            EXRAY pulls live Etsy data — pricing strategies, keyword difficulty, and competitor listings — so you stop guessing and start selling.
          </p>
 
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
            <Link href="/signup" className="btn-ice" style={{ padding: '11px 28px', fontSize: 14, fontWeight: 600 }}>
              Start for free →
            </Link>
            <Link href="/login" className="btn-outline" style={{ padding: '11px 24px', fontSize: 14 }}>
              Log in
            </Link>
          </div>
          <p style={{ fontSize: 12, color: T.muted, letterSpacing: 0.3 }}>No credit card · 5 free searches daily</p>
        </section>
 
        {/* PRODUCT PREVIEW */}
        <section className="wrap" id="product" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px 96px' }}>
 
          {/* Main dashboard mockup */}
          <div style={{
            background: T.s1, border: `1px solid ${T.border}`,
            borderRadius: 12, overflow: 'hidden',
            boxShadow: '0 32px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03)',
          }}>
 
            {/* Browser chrome */}
            <div style={{ background: T.s3, borderBottom: `1px solid ${T.border}`, padding: '11px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.08)', 'rgba(255,255,255,0.08)'].map((c, i) => (
                  <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
                ))}
              </div>
              <div style={{ flex: 1, maxWidth: 280, height: 22, background: T.s4, borderRadius: 4, marginLeft: 8, display: 'flex', alignItems: 'center', paddingLeft: 10 }}>
                <span style={{ fontSize: 10, color: T.muted, fontFamily: T.mono }}>exray.vercel.app/dashboard</span>
              </div>
            </div>
 
            <div style={{ display: 'flex', height: 420 }}>
 
              {/* Sidebar */}
              <div style={{ width: 180, background: T.s2, borderRight: `1px solid ${T.border}`, padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0 }}>
                <div style={{ fontWeight: 800, fontSize: 14, letterSpacing: 4, color: T.textHi, padding: '4px 10px', marginBottom: 16 }}>
                  <span style={{ color: T.ice }}>EX</span>RAY
                </div>
                {[
                  { label: 'Shop Spy', active: false },
                  { label: 'Keyword Research', active: true },
                  { label: 'AI Action Plan', active: false, soon: true },
                ].map((item, i) => (
                  <div key={i} style={{
                    padding: '8px 10px', borderRadius: 6, fontSize: 12, fontWeight: item.active ? 600 : 400,
                    background: item.active ? T.iceFaint : 'transparent',
                    border: `1px solid ${item.active ? T.borderA : 'transparent'}`,
                    color: item.active ? T.ice : item.soon ? T.muted : T.text,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    {item.label}
                    {item.soon && <span style={{ fontSize: 8, color: T.muted, letterSpacing: 1 }}>SOON</span>}
                  </div>
                ))}
              </div>
 
              {/* Main content */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', background: T.bg }}>
 
                {/* Header */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontWeight: 700, fontSize: 18, color: T.textHi, letterSpacing: -0.3 }}>Keyword Research</div>
                  <div style={{ fontSize: 12, color: T.muted, marginTop: 3 }}>Results for "minimalist gold ring"</div>
                </div>
 
                {/* Stat cards */}
                <div className="mock-pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 16 }}>
                  {[
                    { label: 'AVG PRICE', val: '$2,217', color: T.textHi },
                    { label: 'AVG RATING', val: '4.9★', color: T.amber },
                    { label: 'LISTINGS', val: '10', color: T.textHi },
                    { label: 'DIFFICULTY', val: 'Medium', color: T.amber, badge: true },
                  ].map((s, i) => (
                    <div key={i} style={{ background: T.s2, border: `1px solid ${T.border}`, borderRadius: 7, padding: '12px 14px' }}>
                      <div style={{ fontSize: 8, letterSpacing: 2, color: T.iceDim, fontWeight: 700, marginBottom: 7 }}>{s.label}</div>
                      {s.badge
                        ? <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, padding: '2px 8px', borderRadius: 99, background: 'rgba(252,211,77,0.1)', border: '1px solid rgba(252,211,77,0.2)', color: T.amber }}>{s.val}</span>
                        : <div style={{ fontFamily: T.mono, fontSize: 16, fontWeight: 700, color: s.color, letterSpacing: -0.5 }}>{s.val}</div>
                      }
                    </div>
                  ))}
                </div>
 
                {/* Pricing strategy */}
                <div style={{ background: T.s2, border: `1px solid ${T.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: T.textHi }}>Pricing Strategy</div>
                    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, padding: '2px 9px', borderRadius: 99, background: T.iceFaint, border: `1px solid ${T.borderA}`, color: T.ice }}>Premium-heavy</span>
                  </div>
                  <div className="mock-pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
                    {pricingCards.map((p, i) => (
                      <div key={i} style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: 6, padding: '10px 12px' }}>
                        <div style={{ fontSize: 8, letterSpacing: 2, color: T.muted, fontWeight: 700, marginBottom: 6 }}>{p.label}</div>
                        <div style={{ fontFamily: T.mono, fontSize: 13, fontWeight: 700, color: p.color }}>{p.val}</div>
                      </div>
                    ))}
                  </div>
                </div>
 
                {/* Listings table */}
                <div className="mock-listings-table" style={{ background: T.s2, border: `1px solid ${T.border}`, borderRadius: 8, overflow: 'hidden' }}>
                  <div style={{ padding: '11px 18px', borderBottom: `1px solid ${T.border}`, fontSize: 12, fontWeight: 600, color: T.textHi }}>Top Listings</div>
                  {mockListings.slice(0,3).map((l, i) => (
                    <div key={i} className="listing-row">
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 11, color: T.textMid, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.title}</div>
                        <div style={{ fontFamily: T.mono, fontSize: 10, color: T.iceDim, marginTop: 2 }}>{l.price}</div>
                      </div>
                      {l.badge
                        ? <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 99, background: l.badgeBg, border: `1px solid ${l.badgeBorder}`, color: l.badgeColor, flexShrink: 0 }}>{l.badge}</span>
                        : <span style={{ fontSize: 9, color: T.muted, border: `1px solid ${T.border}`, borderRadius: 5, padding: '2px 8px', flexShrink: 0 }}>View →</span>
                      }
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
 
        {/* STATS */}
        <section style={{ borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
          <div className="stat-row-4 wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', maxWidth: 1100, margin: '0 auto', padding: '0 48px' }}>
            {[
              { num: '10s',  label: 'Time to first insight' },
              { num: '$0',   label: 'To get started' },
              { num: '3×',   label: 'Cheaper than Marmalead' },
              { num: '100%', label: 'Live listing data' },
            ].map((s, i) => (
              <div key={i} className="stat-item" style={{ padding: '40px 32px', borderRight: i < 3 ? `1px solid ${T.border}` : 'none' }}>
                <div style={{ fontFamily: T.mono, fontSize: 34, fontWeight: 700, color: T.ice, letterSpacing: -1, lineHeight: 1, marginBottom: 8 }}>{s.num}</div>
                <div style={{ fontSize: 13, color: T.muted }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>
 
        {/* FEATURES — Editorial layout */}
        <section className="wrap" style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 48px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 72, gap: 48, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: 3, color: T.iceDim, fontWeight: 600, marginBottom: 16 }}>CAPABILITIES</div>
              <h2 style={{ fontWeight: 800, fontSize: 38, color: T.textHi, letterSpacing: -1, lineHeight: 1.1, maxWidth: 380 }}>
                Built for sellers who research before they list.
              </h2>
            </div>
            <p style={{ fontSize: 15, color: T.text, lineHeight: 1.8, maxWidth: 360, paddingTop: 40 }}>
              Every feature in EXRAY is designed around one goal — giving you real data before you invest time and money in a product.
            </p>
          </div>
 
          {/* Feature list — editorial, not grid */}
          <div>
            {[
              {
                num: '01',
                title: 'Shop Spy',
                sub: 'Competitive intelligence, instantly.',
                desc: 'Enter any Etsy shop name or URL. EXRAY fetches their top listings, price distribution, and decodes their overall pricing strategy — in seconds.',
                detail: ['Min · Median · Average · Max breakdown', 'Strategy badge: Premium-heavy / Race to bottom / Tight cluster', 'Direct links to every listing'],
              },
              {
                num: '02',
                title: 'Keyword Research',
                sub: 'Know the competition before you compete.',
                desc: 'Search any keyword. See average pricing across top listings, competition density, and a proprietary difficulty score — Easy, Medium, or Hard.',
                detail: ['Difficulty score — unique to EXRAY', 'Average price across top 10 results', 'Competition level assessment'],
              },
              {
                num: '03',
                title: 'Pricing Strategy Analysis',
                sub: 'Decode the niche. Price with confidence.',
                desc: 'EXRAY classifies every niche into a pricing strategy. Know whether you\'re entering a premium market, a race to the bottom, or a tight pricing cluster.',
                detail: ['Automated strategy classification', 'Statistical pricing distribution', 'Based on live listing data'],
              },
            ].map((f, i) => (
              <div key={i} className="feat-item" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, paddingTop: 36, paddingBottom: 36 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                    <span style={{ fontFamily: T.mono, fontSize: 11, color: T.muted, fontWeight: 600 }}>{f.num}</span>
                    <span style={{ width: 1, height: 14, background: T.border, display: 'inline-block' }} />
                    <span style={{ fontSize: 11, letterSpacing: 2, color: T.iceDim, fontWeight: 600 }}>{f.title.toUpperCase()}</span>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: 22, color: T.textHi, letterSpacing: -0.4, lineHeight: 1.25, marginBottom: 14 }}>{f.sub}</h3>
                  <p style={{ fontSize: 15, color: T.text, lineHeight: 1.8 }}>{f.desc}</p>
                </div>
                <div style={{ paddingTop: 8 }}>
                  <div style={{ background: T.s1, border: `1px solid ${T.border}`, borderRadius: 8, padding: '20px 22px' }}>
                    {f.detail.map((d, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0', borderBottom: j < f.detail.length - 1 ? `1px solid ${T.border}` : 'none' }}>
                        <span style={{ color: T.ice, fontWeight: 700, fontSize: 12, marginTop: 1, flexShrink: 0 }}>✓</span>
                        <span style={{ fontSize: 13.5, color: T.textMid, lineHeight: 1.5 }}>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
 
        {/* COMPARE */}
        <section className="wrap" id="compare" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px 100px', borderTop: `1px solid ${T.border}` }}>
          <div style={{ paddingTop: 100, marginBottom: 64 }}>
            <div style={{ fontSize: 11, letterSpacing: 3, color: T.iceDim, fontWeight: 600, marginBottom: 16 }}>COMPARISON</div>
            <h2 style={{ fontWeight: 800, fontSize: 38, color: T.textHi, letterSpacing: -1, lineHeight: 1.1 }}>
              Why sellers switch<br />to EXRAY.
            </h2>
          </div>
 
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ padding: '12px 20px', textAlign: 'left', borderBottom: `1px solid ${T.border}`, fontSize: 11, letterSpacing: 2, color: T.muted, fontWeight: 600 }}>Feature</th>
                <th style={{ padding: '12px 20px', textAlign: 'center', borderBottom: `1px solid ${T.border}`, fontSize: 11, letterSpacing: 2, color: T.ice, fontWeight: 700, background: T.iceFaint, borderLeft: `1px solid ${T.border}`, borderRight: `1px solid ${T.border}` }}>EXRAY</th>
                <th style={{ padding: '12px 20px', textAlign: 'center', borderBottom: `1px solid ${T.border}`, fontSize: 11, letterSpacing: 2, color: T.muted, fontWeight: 600 }}>eRank</th>
                <th style={{ padding: '12px 20px', textAlign: 'center', borderBottom: `1px solid ${T.border}`, fontSize: 11, letterSpacing: 2, color: T.muted, fontWeight: 600 }}>Marmalead</th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map((r, i) => (
                <tr key={i} className="compare-tr">
                  <td style={{ padding: '14px 20px', borderBottom: `1px solid ${T.border}`, color: T.textMid, fontSize: 14 }}>{r.feature}</td>
                  <td style={{ padding: '14px 20px', borderBottom: `1px solid ${T.border}`, textAlign: 'center', background: T.iceFaint, borderLeft: `1px solid ${T.border}`, borderRight: `1px solid ${T.border}`, color: r.exray === '✓' ? T.ice : T.textHi, fontWeight: r.exray === '✓' ? 700 : 500 }}>{r.exray}</td>
                  <td style={{ padding: '14px 20px', borderBottom: `1px solid ${T.border}`, textAlign: 'center', color: r.erank === '✓' ? T.green : T.muted }}>{r.erank}</td>
                  <td style={{ padding: '14px 20px', borderBottom: `1px solid ${T.border}`, textAlign: 'center', color: r.marma === '✓' ? T.green : T.muted }}>{r.marma}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ fontSize: 11, color: T.muted, marginTop: 14, letterSpacing: 0.3 }}>
            * Feature comparison based on publicly available plans as of 2025.
          </p>
        </section>
 
        {/* PRICING */}
        <section className="wrap" id="pricing" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px 100px', borderTop: `1px solid ${T.border}` }}>
          <div style={{ paddingTop: 100, marginBottom: 64 }}>
            <div style={{ fontSize: 11, letterSpacing: 3, color: T.iceDim, fontWeight: 600, marginBottom: 16 }}>PRICING</div>
            <h2 style={{ fontWeight: 800, fontSize: 38, color: T.textHi, letterSpacing: -1, lineHeight: 1.1 }}>
              Simple pricing.<br />No surprises.
            </h2>
          </div>
 
          <div className="price-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 680 }}>
            <div className="price-plan">
              <div style={{ fontSize: 13, fontWeight: 500, color: T.textMid, marginBottom: 24 }}>Free</div>
              <div style={{ fontFamily: T.mono, fontSize: 40, fontWeight: 700, color: T.textHi, letterSpacing: -1.5, lineHeight: 1, marginBottom: 6 }}>$0</div>
              <div style={{ fontSize: 13, color: T.muted, marginBottom: 28, paddingBottom: 24, borderBottom: `1px solid ${T.border}` }}>5 searches per day.</div>
              {['Shop Spy', 'Keyword Research', 'Pricing Strategy', 'Difficulty Score'].map(f => (
                <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ color: T.ice, fontWeight: 600, fontSize: 12 }}>✓</span>
                  <span style={{ fontSize: 14, color: T.text }}>{f}</span>
                </div>
              ))}
              <Link href="/signup" className="btn-outline" style={{ display: 'block', textAlign: 'center', marginTop: 28, padding: '10px' }}>
                Get started
              </Link>
            </div>
 
            <div className="price-plan featured">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: T.textMid }}>Pro</div>
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, padding: '3px 10px', borderRadius: 99, background: T.iceFaint, border: `1px solid ${T.borderA}`, color: T.ice }}>POPULAR</span>
              </div>
              <div style={{ fontFamily: T.mono, fontSize: 40, fontWeight: 700, color: T.ice, letterSpacing: -1.5, lineHeight: 1, marginBottom: 6 }}>
                $12<span style={{ fontSize: 15, color: T.muted, fontWeight: 400, letterSpacing: 0 }}>/mo</span>
              </div>
              <div style={{ fontSize: 13, color: T.muted, marginBottom: 28, paddingBottom: 24, borderBottom: `1px solid ${T.border}` }}>Unlimited searches.</div>
              {['Unlimited searches', 'Priority data', 'All free features', 'Early access to new tools'].map(f => (
                <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ color: T.ice, fontWeight: 600, fontSize: 12 }}>✓</span>
                  <span style={{ fontSize: 14, color: T.text }}>{f}</span>
                </div>
              ))}
              <Link href="/signup" className="btn-ice" style={{ display: 'block', textAlign: 'center', marginTop: 28, padding: '10px' }}>
                Start Pro →
              </Link>
            </div>
          </div>
        </section>
 
        {/* CTA */}
        <section className="wrap" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px 100px' }}>
          <div style={{ background: T.s1, border: `1px solid ${T.border}`, borderRadius: 12, padding: '80px 64px', textAlign: 'center' }}>
            <div style={{ fontSize: 11, letterSpacing: 3, color: T.iceDim, fontWeight: 600, marginBottom: 24 }}>GET STARTED TODAY</div>
            <h2 style={{ fontWeight: 800, fontSize: 46, color: T.textHi, letterSpacing: -1.5, lineHeight: 1.08, marginBottom: 20, maxWidth: 560, margin: '0 auto 20px' }}>
              Stop guessing.<br />Start knowing.
            </h2>
            <p style={{ fontSize: 16, color: T.text, marginBottom: 40, maxWidth: 380, margin: '0 auto 40px' }}>
              Join Etsy sellers who research before they list.
            </p>
            <Link href="/signup" className="btn-ice" style={{ padding: '12px 32px', fontSize: 14, fontWeight: 600 }}>
              Start for free →
            </Link>
            <p style={{ fontSize: 12, color: T.muted, marginTop: 18 }}>
              No credit card · 5 free searches daily · Cancel anytime
            </p>
          </div>
        </section>
 
        {/* FOOTER */}
        <footer className="wrap" style={{ borderTop: `1px solid ${T.border}`, padding: '28px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 800, fontSize: 14, letterSpacing: 5, color: T.textHi }}>
            <span style={{ color: T.ice }}>EX</span>RAY
          </div>
          <div style={{ fontSize: 12, color: T.muted }}>© 2025 EXRAY. Built for Etsy sellers.</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#" className="nav-a" style={{ fontSize: 12 }}>Privacy</a>
            <a href="#" className="nav-a" style={{ fontSize: 12 }}>Terms</a>
          </div>
        </footer>
 
      </div>
    </>
  )
}
 