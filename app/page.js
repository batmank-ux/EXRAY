'use client'
// app/page.js — EXRAY Landing Page v2
// Premium SaaS redesign — Linear + Stripe + Vercel aesthetic
// Ice blue #7DD3F0 · Near-black #080C10 · Solid colors only
 
import Link from 'next/link'
import { useState, useEffect } from 'react'
 
// ─── TOKENS ───────────────────────────────────────────────────────
const T = {
  ice:      '#7DD3F0',
  iceDim:   'rgba(125,211,240,0.55)',
  iceFaint: 'rgba(125,211,240,0.08)',
  bg:       '#080C10',
  s1:       '#0C1118',
  s2:       '#0F161F',
  s3:       '#111920',
  border:   'rgba(125,211,240,0.08)',
  borderA:  'rgba(125,211,240,0.20)',
  text:     '#94A3B8',
  textHi:   '#F1F5F9',
  muted:    '#334155',
  font:     "'Inter', 'DM Sans', system-ui, sans-serif",
  mono:     "'JetBrains Mono', monospace",
}
 
// ─── COMPARE DATA ─────────────────────────────────────────────────
const compareRows = [
  { feature: 'Shop competitor spy',     exray: '✓', erank: '✓',  marma: '✓'  },
  { feature: 'Keyword difficulty score',exray: '✓', erank: '✗',  marma: '✗'  },
  { feature: 'Pricing strategy analysis',exray:'✓', erank: '✗',  marma: '✗'  },
  { feature: 'No data padding',         exray: '✓', erank: '–',  marma: '–'  },
  { feature: 'Beginner friendly UI',    exray: '✓', erank: '–',  marma: '–'  },
  { feature: 'Price',                   exray: 'Free / $12', erank: '$10/mo', marma: '$19/mo' },
]
 
const features = [
  {
    label: 'SHOP SPY',
    title: 'See inside any Etsy shop.',
    desc: 'Enter any shop name or URL. Get their top listings, pricing range, and strategy — pulled live in seconds.',
    detail: 'Min · Median · Average · Max pricing breakdown',
  },
  {
    label: 'KEYWORD RESEARCH',
    title: 'Know before you list.',
    desc: 'Search any keyword. See competition level, average pricing, and a difficulty score — Easy, Medium, or Hard.',
    detail: 'Difficulty score unique to EXRAY',
  },
  {
    label: 'PRICING STRATEGY',
    title: 'Decode the niche.',
    desc: 'We tell you if a niche is Premium-heavy, Race to bottom, or Tight cluster — so you price with confidence.',
    detail: 'Strategy badge + data points',
  },
]
 
const steps = [
  { n: '01', title: 'Enter a shop or keyword', desc: 'Type any Etsy shop name, URL, or keyword you want to research.' },
  { n: '02', title: 'EXRAY scans it live',     desc: 'We pull real listing data — prices, ratings, competition — and process it instantly.' },
  { n: '03', title: 'You get the edge',        desc: 'See what works, what to price, which keywords to target. Then go list with confidence.' },
]
 
// ─── COMPONENT ────────────────────────────────────────────────────
export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
 
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
 
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${T.bg}; color: ${T.text}; font-family: ${T.font}; -webkit-font-smoothing: antialiased; }
        a { text-decoration: none; color: inherit; }
        ::selection { background: rgba(125,211,240,0.2); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(125,211,240,0.15); border-radius: 4px; }
 
        .nav-link { color: ${T.muted}; font-size: 14px; transition: color .2s; }
        .nav-link:hover { color: ${T.textHi}; }
 
        .btn-primary { 
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 28px; border-radius: 6px;
          border: 1px solid ${T.borderA};
          background: ${T.iceFaint};
          color: ${T.ice}; font-size: 14px; font-weight: 600;
          letter-spacing: 0.3px;
          transition: background .2s, border-color .2s;
          cursor: pointer;
        }
        .btn-primary:hover { background: rgba(125,211,240,0.13); border-color: ${T.ice}; }
 
        .btn-ghost {
          display: inline-flex; align-items: center;
          padding: 11px 24px; border-radius: 6px;
          border: 1px solid ${T.border};
          color: ${T.text}; font-size: 14px; font-weight: 500;
          transition: border-color .2s, color .2s;
          cursor: pointer;
        }
        .btn-ghost:hover { border-color: ${T.borderA}; color: ${T.textHi}; }
 
        .feat-card {
          background: ${T.s1}; border: 1px solid ${T.border};
          border-radius: 12px; padding: 36px 32px;
          transition: border-color .2s, transform .2s;
        }
        .feat-card:hover { border-color: ${T.borderA}; transform: translateY(-2px); }
 
        .step-card {
          padding: 32px 0;
          border-top: 1px solid ${T.border};
          transition: border-color .2s;
        }
        .step-card:hover { border-color: ${T.borderA}; }
 
        .compare-row:hover td { background: rgba(125,211,240,0.02); }
 
        .price-card {
          background: ${T.s1}; border: 1px solid ${T.border};
          border-radius: 12px; padding: 36px 32px;
          transition: border-color .2s;
        }
        .price-card:hover { border-color: ${T.borderA}; }
        .price-card.pro { border-color: rgba(125,211,240,0.22); }
 
        .mock-card {
          background: ${T.s2}; border: 1px solid ${T.border};
          border-radius: 10px; overflow: hidden;
        }
        .mock-row { 
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 18px; border-bottom: 1px solid ${T.border};
          font-size: 13px;
        }
        .mock-badge {
          font-size: 10px; font-weight: 700; letter-spacing: 1px;
          padding: 3px 10px; border-radius: 99px;
        }
 
        @media (max-width: 768px) {
          .feat-grid { grid-template-columns: 1fr !important; }
          .step-grid { grid-template-columns: 1fr !important; }
          .price-grid { grid-template-columns: 1fr !important; }
          .stat-row { grid-template-columns: repeat(2,1fr) !important; }
          .hero-h1 { font-size: 40px !important; }
          .nav-links { display: none !important; }
          .section { padding: 64px 24px !important; }
        }
      `}</style>
 
      <div style={{ background: T.bg, minHeight: '100vh' }}>
 
        {/* ── NAV ───────────────────────────────────────── */}
        <nav style={{
          position: 'sticky', top: 0, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 48px', height: 60,
          background: scrolled ? 'rgba(8,12,16,0.95)' : T.bg,
          borderBottom: `1px solid ${scrolled ? T.border : 'transparent'}`,
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          transition: 'all .3s',
        }}>
          <a href="/" style={{ fontFamily: T.font, fontWeight: 800, fontSize: 18, letterSpacing: 4, color: T.textHi }}>
            <span style={{ color: T.ice }}>EX</span>RAY
          </a>
          <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <a href="#features" className="nav-link">Features</a>
            <a href="#how"      className="nav-link">How it works</a>
            <a href="#compare"  className="nav-link">Compare</a>
            <a href="#pricing"  className="nav-link">Pricing</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/login"  className="nav-link" style={{ fontSize: 14 }}>Log in</Link>
            <Link href="/signup" className="btn-primary" style={{ padding: '8px 20px', fontSize: 13 }}>Get Started</Link>
          </div>
        </nav>
 
        {/* ── HERO ──────────────────────────────────────── */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '120px 48px 100px', textAlign: 'center' }}>
 
          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            border: `1px solid ${T.border}`, borderRadius: 4,
            padding: '5px 16px', fontSize: 11, letterSpacing: 2.5,
            color: T.iceDim, fontWeight: 600, marginBottom: 40,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: T.ice, display: 'inline-block' }} />
            ETSY COMPETITOR INTELLIGENCE
          </div>
 
          {/* H1 */}
          <h1 className="hero-h1" style={{
            fontFamily: T.font, fontWeight: 800,
            fontSize: 64, lineHeight: 1.06,
            letterSpacing: -2, color: T.textHi,
            margin: '0 0 24px',
          }}>
            X-ray every Etsy<br />
            <span style={{ color: T.ice }}>competitor</span> in seconds.
          </h1>
 
          <p style={{
            fontSize: 17, color: T.text, lineHeight: 1.75,
            maxWidth: 520, margin: '0 auto 52px',
          }}>
            Spy on any Etsy shop. Decode their pricing strategy.
            Find keywords they rank for. Stop guessing — start selling.
          </p>
 
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/signup" className="btn-primary" style={{ fontSize: 14, padding: '12px 32px' }}>
              Start for free →
            </Link>
            <Link href="/login" className="btn-ghost" style={{ fontSize: 14, padding: '12px 28px' }}>
              Log in
            </Link>
          </div>
          <p style={{ fontSize: 12, color: T.muted, marginTop: 20, letterSpacing: 0.5 }}>
            No credit card required · 5 free searches daily
          </p>
        </section>
 
        {/* ── PRODUCT MOCKUP ────────────────────────────── */}
        <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 48px 100px' }}>
          <div className="mock-card" style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.5)' }}>
            {/* Mock nav bar */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '14px 20px', borderBottom: `1px solid ${T.border}`,
              background: T.s3,
            }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: T.border }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: T.border }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: T.border }} />
              <div style={{ flex: 1, height: 24, background: T.border, borderRadius: 4, marginLeft: 12, maxWidth: 300 }} />
            </div>
            {/* Mock content */}
            <div style={{ padding: '24px 20px', background: T.s2 }}>
              {/* Stat cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 16 }}>
                {[
                  { label: 'AVG PRICE', val: '$2,217', color: T.textHi },
                  { label: 'AVG RATING', val: '4.9★', color: '#FCD34D' },
                  { label: 'LISTINGS', val: '10', color: T.textHi },
                  { label: 'DIFFICULTY', val: 'Medium', color: '#FCD34D', badge: true },
                ].map((s, i) => (
                  <div key={i} style={{ background: T.s3, border: `1px solid ${T.border}`, borderRadius: 8, padding: '14px 16px' }}>
                    <div style={{ fontSize: 9, letterSpacing: 2, color: T.iceDim, fontWeight: 700, marginBottom: 8 }}>{s.label}</div>
                    {s.badge
                      ? <span className="mock-badge" style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)', color: '#FCD34D' }}>{s.val}</span>
                      : <div style={{ fontFamily: T.mono, fontSize: 20, fontWeight: 700, color: s.color, letterSpacing: -0.5 }}>{s.val}</div>
                    }
                  </div>
                ))}
              </div>
              {/* Mock listings */}
              <div style={{ background: T.s3, border: `1px solid ${T.border}`, borderRadius: 8, overflow: 'hidden' }}>
                <div style={{ padding: '12px 18px', borderBottom: `1px solid ${T.border}` }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: T.textHi }}>Top Listings</div>
                </div>
                {[
                  { title: 'Minimalist Gold Ring · 14k Dainty', price: '$48.00', tag: 'Premium-heavy' },
                  { title: 'Personalized Name Necklace Sterling', price: '$32.50', tag: null },
                  { title: 'Custom Birthstone Ring Set', price: '$125.00', tag: null },
                ].map((r, i) => (
                  <div key={i} className="mock-row" style={{ borderBottom: i < 2 ? `1px solid ${T.border}` : 'none' }}>
                    <div>
                      <div style={{ fontSize: 12, color: T.text, marginBottom: 3 }}>{r.title}</div>
                      <div style={{ fontFamily: T.mono, fontSize: 11, color: T.iceDim, fontWeight: 600 }}>{r.price}</div>
                    </div>
                    {r.tag
                      ? <span className="mock-badge" style={{ background: 'rgba(125,211,240,0.08)', border: `1px solid ${T.borderA}`, color: T.ice }}>{r.tag}</span>
                      : <span style={{ fontSize: 11, color: T.muted, border: `1px solid ${T.border}`, borderRadius: 6, padding: '3px 10px' }}>View →</span>
                    }
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
 
        {/* ── STAT ROW ──────────────────────────────────── */}
        <section style={{ borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
          <div className="stat-row" style={{
            display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
            maxWidth: 1100, margin: '0 auto', padding: '0 48px',
          }}>
            {[
              { num: '10s',  label: 'Time to first insight' },
              { num: '$0',   label: 'To get started' },
              { num: '3×',   label: 'Cheaper than Marmalead' },
              { num: '100%', label: 'Real listing data' },
            ].map((s, i) => (
              <div key={i} style={{
                padding: '40px 24px', textAlign: 'center',
                borderRight: i < 3 ? `1px solid ${T.border}` : 'none',
              }}>
                <div style={{ fontFamily: T.mono, fontSize: 36, fontWeight: 700, color: T.ice, letterSpacing: -1, lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: 13, color: T.muted, marginTop: 8, letterSpacing: 0.3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>
 
        {/* ── FEATURES ──────────────────────────────────── */}
        <section className="section" id="features" style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 48px' }}>
          <div style={{ marginBottom: 64 }}>
            <div style={{ fontSize: 11, letterSpacing: 3, color: T.iceDim, fontWeight: 700, marginBottom: 16 }}>WHAT EXRAY DOES</div>
            <h2 style={{ fontFamily: T.font, fontWeight: 800, fontSize: 40, color: T.textHi, letterSpacing: -1, lineHeight: 1.1, maxWidth: 500 }}>
              Everything you need.<br />Nothing you don't.
            </h2>
          </div>
 
          <div className="feat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {features.map((f, i) => (
              <div key={i} className="feat-card">
                <div style={{ fontSize: 10, letterSpacing: 2.5, color: T.iceDim, fontWeight: 700, marginBottom: 20 }}>{f.label}</div>
                <h3 style={{ fontFamily: T.font, fontWeight: 700, fontSize: 20, color: T.textHi, letterSpacing: -0.3, marginBottom: 14, lineHeight: 1.3 }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: 15, color: T.text, lineHeight: 1.75, marginBottom: 24 }}>{f.desc}</p>
                <div style={{ fontSize: 12, color: T.iceDim, fontWeight: 600, paddingTop: 16, borderTop: `1px solid ${T.border}`, letterSpacing: 0.3 }}>
                  {f.detail}
                </div>
              </div>
            ))}
          </div>
        </section>
 
        {/* ── HOW IT WORKS ──────────────────────────────── */}
        <section className="section" id="how" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px 100px', borderTop: `1px solid ${T.border}` }}>
          <div style={{ paddingTop: 100, marginBottom: 64 }}>
            <div style={{ fontSize: 11, letterSpacing: 3, color: T.iceDim, fontWeight: 700, marginBottom: 16 }}>HOW IT WORKS</div>
            <h2 style={{ fontFamily: T.font, fontWeight: 800, fontSize: 40, color: T.textHi, letterSpacing: -1, lineHeight: 1.1 }}>
              Three steps.<br />Real answers.
            </h2>
          </div>
          <div className="step-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0 }}>
            {steps.map((s, i) => (
              <div key={i} className="step-card" style={{ paddingRight: i < 2 ? 40 : 0 }}>
                <div style={{ fontFamily: T.mono, fontSize: 11, fontWeight: 700, color: T.muted, letterSpacing: 2, marginBottom: 20 }}>{s.n}</div>
                <h3 style={{ fontFamily: T.font, fontWeight: 700, fontSize: 20, color: T.textHi, letterSpacing: -0.3, marginBottom: 14 }}>{s.title}</h3>
                <p style={{ fontSize: 15, color: T.text, lineHeight: 1.75 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>
 
        {/* ── COMPARE ───────────────────────────────────── */}
        <section className="section" id="compare" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px 100px', borderTop: `1px solid ${T.border}` }}>
          <div style={{ paddingTop: 100, marginBottom: 64 }}>
            <div style={{ fontSize: 11, letterSpacing: 3, color: T.iceDim, fontWeight: 700, marginBottom: 16 }}>VS COMPETITORS</div>
            <h2 style={{ fontFamily: T.font, fontWeight: 800, fontSize: 40, color: T.textHi, letterSpacing: -1, lineHeight: 1.1 }}>
              Why sellers switch<br />to EXRAY.
            </h2>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ padding: '14px 20px', textAlign: 'left', borderBottom: `1px solid ${T.border}`, fontSize: 11, letterSpacing: 2, color: T.muted, fontWeight: 700 }}>Feature</th>
                <th style={{ padding: '14px 20px', textAlign: 'center', borderBottom: `1px solid ${T.border}`, fontSize: 11, letterSpacing: 2, color: T.ice, fontWeight: 700, background: T.iceFaint, borderLeft: `1px solid ${T.border}`, borderRight: `1px solid ${T.border}` }}>EXRAY</th>
                <th style={{ padding: '14px 20px', textAlign: 'center', borderBottom: `1px solid ${T.border}`, fontSize: 11, letterSpacing: 2, color: T.muted, fontWeight: 700 }}>eRank</th>
                <th style={{ padding: '14px 20px', textAlign: 'center', borderBottom: `1px solid ${T.border}`, fontSize: 11, letterSpacing: 2, color: T.muted, fontWeight: 700 }}>Marmalead</th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map((r, i) => (
                <tr key={i} className="compare-row">
                  <td style={{ padding: '15px 20px', borderBottom: `1px solid ${T.border}`, color: T.text, fontSize: 14 }}>{r.feature}</td>
                  <td style={{ padding: '15px 20px', borderBottom: `1px solid ${T.border}`, textAlign: 'center', background: T.iceFaint, borderLeft: `1px solid ${T.border}`, borderRight: `1px solid ${T.border}`, color: r.exray === '✓' ? T.ice : T.textHi, fontWeight: r.exray === '✓' ? 700 : 500, fontSize: 14 }}>{r.exray}</td>
                  <td style={{ padding: '15px 20px', borderBottom: `1px solid ${T.border}`, textAlign: 'center', color: r.erank === '✓' ? '#86EFAC' : T.muted, fontSize: 14 }}>{r.erank}</td>
                  <td style={{ padding: '15px 20px', borderBottom: `1px solid ${T.border}`, textAlign: 'center', color: r.marma === '✓' ? '#86EFAC' : T.muted, fontSize: 14 }}>{r.marma}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ fontSize: 11, color: T.muted, marginTop: 16, letterSpacing: 0.3 }}>
            * Feature comparison based on publicly available plans as of 2025.
          </p>
        </section>
 
        {/* ── PRICING ───────────────────────────────────── */}
        <section className="section" id="pricing" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px 100px', borderTop: `1px solid ${T.border}` }}>
          <div style={{ paddingTop: 100, marginBottom: 64 }}>
            <div style={{ fontSize: 11, letterSpacing: 3, color: T.iceDim, fontWeight: 700, marginBottom: 16 }}>PRICING</div>
            <h2 style={{ fontFamily: T.font, fontWeight: 800, fontSize: 40, color: T.textHi, letterSpacing: -1, lineHeight: 1.1 }}>
              Simple.<br />No tricks.
            </h2>
          </div>
          <div className="price-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 700 }}>
            {/* Free */}
            <div className="price-card">
              <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 20 }}>Free</div>
              <div style={{ fontFamily: T.mono, fontSize: 42, fontWeight: 700, color: T.textHi, letterSpacing: -2, lineHeight: 1, marginBottom: 8 }}>$0</div>
              <div style={{ fontSize: 13, color: T.muted, marginBottom: 28 }}>5 searches per day. No card needed.</div>
              {['Shop Spy', 'Keyword Research', 'Pricing Strategy', 'Difficulty Score'].map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span style={{ color: T.ice, fontWeight: 700, fontSize: 13 }}>✓</span>
                  <span style={{ fontSize: 14, color: T.text }}>{f}</span>
                </div>
              ))}
              <Link href="/signup" className="btn-ghost" style={{ display: 'block', textAlign: 'center', marginTop: 28, padding: '11px' }}>
                Get started
              </Link>
            </div>
            {/* Pro */}
            <div className="price-card pro">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>Pro</div>
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, padding: '3px 10px', borderRadius: 99, background: T.iceFaint, border: `1px solid ${T.borderA}`, color: T.ice }}>POPULAR</span>
              </div>
              <div style={{ fontFamily: T.mono, fontSize: 42, fontWeight: 700, color: T.ice, letterSpacing: -2, lineHeight: 1, marginBottom: 8 }}>
                $12<span style={{ fontSize: 16, color: T.muted, fontWeight: 500 }}>/mo</span>
              </div>
              <div style={{ fontSize: 13, color: T.muted, marginBottom: 28 }}>Unlimited searches. Full access.</div>
              {['Unlimited searches', 'Priority data', 'All free features', 'Early access to new tools'].map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span style={{ color: T.ice, fontWeight: 700, fontSize: 13 }}>✓</span>
                  <span style={{ fontSize: 14, color: T.text }}>{f}</span>
                </div>
              ))}
              <Link href="/signup" className="btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: 28, padding: '11px' }}>
                Start Pro →
              </Link>
            </div>
          </div>
        </section>
 
        {/* ── CTA ───────────────────────────────────────── */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px 100px' }}>
          <div style={{
            background: T.s1, border: `1px solid ${T.border}`,
            borderRadius: 12, padding: '80px 64px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 11, letterSpacing: 3, color: T.iceDim, fontWeight: 700, marginBottom: 20 }}>GET STARTED</div>
            <h2 style={{ fontFamily: T.font, fontWeight: 800, fontSize: 48, color: T.textHi, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 20 }}>
              Stop flying blind<br />on Etsy.
            </h2>
            <p style={{ fontSize: 16, color: T.text, marginBottom: 40, maxWidth: 400, margin: '0 auto 40px' }}>
              Join sellers who research before they list.
            </p>
            <Link href="/signup" className="btn-primary" style={{ fontSize: 14, padding: '13px 36px' }}>
              Start for free →
            </Link>
            <p style={{ fontSize: 12, color: T.muted, marginTop: 20, letterSpacing: 0.3 }}>
              No credit card · 5 free searches daily · Cancel anytime
            </p>
          </div>
        </section>
 
        {/* ── FOOTER ────────────────────────────────────── */}
        <footer style={{
          borderTop: `1px solid ${T.border}`,
          padding: '32px 48px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          maxWidth: '100%',
        }}>
          <div style={{ fontFamily: T.font, fontWeight: 800, fontSize: 15, letterSpacing: 4, color: T.textHi }}>
            <span style={{ color: T.ice }}>EX</span>RAY
          </div>
          <div style={{ fontSize: 12, color: T.muted }}>© 2025 EXRAY. Built for Etsy sellers.</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#" className="nav-link" style={{ fontSize: 12 }}>Privacy</a>
            <a href="#" className="nav-link" style={{ fontSize: 12 }}>Terms</a>
          </div>
        </footer>
 
      </div>
    </>
  )
}
 