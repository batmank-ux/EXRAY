'use client'
// app/page.js — EXRAY Landing Page
// Theme: Near-black #080C10 + Ice Blue #7DD3F0
// Font: Syne (display) + DM Sans (body) — add to layout.js (see bottom of file)

import Link from 'next/link'
import { useState, useEffect } from 'react'

// ─── THEME CONSTANTS ───────────────────────────────────────────
const ICE   = '#7DD3F0'
const BG    = '#080C10'
const CARD  = '#0D1219'
const BORDER = 'rgba(125, 211, 240, 0.10)'
const BORDER_HOVER = 'rgba(125, 211, 240, 0.28)'
const MUTED = '#4A5568'
const TEXT  = '#E2E8F0'

// ─── INLINE STYLES ─────────────────────────────────────────────
const S = {
  page: {
    background: BG,
    color: TEXT,
    minHeight: '100vh',
    fontFamily: "'DM Sans', sans-serif",
    overflowX: 'hidden',
  },

  // NAV
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 48px',
    height: 64,
    borderBottom: `1px solid ${BORDER}`,
    position: 'sticky',
    top: 0,
    background: BG,
    zIndex: 100,
  },
  logo: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: 22,
    letterSpacing: 4,
    color: '#fff',
    textDecoration: 'none',
  },
  logoAccent: { color: ICE },
  navLinks: { display: 'flex', alignItems: 'center', gap: 32 },
  navLink: {
    color: MUTED,
    textDecoration: 'none',
    fontSize: 14,
    letterSpacing: 0.5,
    transition: 'color 0.2s',
  },
  navCta: {
    background: ICE,
    color: BG,
    padding: '8px 20px',
    borderRadius: 6,
    textDecoration: 'none',
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: 0.5,
    fontFamily: "'Syne', sans-serif",
  },

  // HERO
  hero: {
    maxWidth: 900,
    margin: '0 auto',
    padding: '120px 48px 100px',
    textAlign: 'center',
  },
  eyebrow: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    border: `1px solid ${BORDER}`,
    borderRadius: 4,
    padding: '5px 14px',
    fontSize: 11,
    letterSpacing: 2,
    color: ICE,
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    marginBottom: 36,
  },
  h1: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: 'clamp(38px, 6vw, 72px)',
    lineHeight: 1.08,
    color: '#fff',
    letterSpacing: -1,
    margin: '0 0 28px',
  },
  h1Accent: { color: ICE },
  subtext: {
    fontSize: 18,
    color: MUTED,
    lineHeight: 1.7,
    maxWidth: 560,
    margin: '0 auto 52px',
  },
  heroActions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    flexWrap: 'wrap',
  },
  primaryBtn: {
    background: ICE,
    color: BG,
    padding: '14px 32px',
    borderRadius: 6,
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 700,
    fontFamily: "'Syne', sans-serif",
    letterSpacing: 1,
    display: 'inline-block',
  },
  secondaryBtn: {
    border: `1px solid ${BORDER_HOVER}`,
    color: ICE,
    padding: '14px 32px',
    borderRadius: 6,
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 500,
    display: 'inline-block',
    background: 'transparent',
  },
  hint: { color: MUTED, fontSize: 12, marginTop: 20 },

  // STATS ROW
  statsRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 0,
    borderTop: `1px solid ${BORDER}`,
    borderBottom: `1px solid ${BORDER}`,
    margin: '0 48px',
  },
  statItem: {
    flex: 1,
    maxWidth: 220,
    padding: '36px 24px',
    textAlign: 'center',
    borderRight: `1px solid ${BORDER}`,
  },
  statNum: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 36,
    fontWeight: 800,
    color: ICE,
    letterSpacing: -1,
    display: 'block',
  },
  statLabel: { color: MUTED, fontSize: 13, marginTop: 4 },

  // FEATURES
  section: { padding: '100px 48px', maxWidth: 1100, margin: '0 auto' },
  sectionLabel: {
    fontSize: 11,
    letterSpacing: 3,
    color: ICE,
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    marginBottom: 16,
  },
  sectionH2: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: 'clamp(28px, 4vw, 48px)',
    color: '#fff',
    letterSpacing: -0.5,
    margin: '0 0 60px',
    maxWidth: 600,
  },

  // FEATURE CARDS
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 1,
    border: `1px solid ${BORDER}`,
    borderRadius: 12,
    overflow: 'hidden',
  },
  featureCard: {
    background: CARD,
    padding: '40px 36px',
    borderRight: `1px solid ${BORDER}`,
    borderBottom: `1px solid ${BORDER}`,
  },
  featureIcon: {
    width: 40,
    height: 40,
    border: `1px solid ${BORDER_HOVER}`,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    fontSize: 18,
  },
  featureTitle: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: 18,
    color: '#fff',
    marginBottom: 12,
  },
  featureDesc: { color: MUTED, fontSize: 14, lineHeight: 1.7 },
  featureTag: {
    display: 'inline-block',
    marginTop: 16,
    fontSize: 11,
    letterSpacing: 1.5,
    color: ICE,
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
  },

  // HOW IT WORKS
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 48,
  },
  stepNum: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 48,
    fontWeight: 800,
    color: BORDER_HOVER,
    lineHeight: 1,
    marginBottom: 16,
  },
  stepTitle: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  stepDesc: { color: MUTED, fontSize: 14, lineHeight: 1.7 },

  // COMPARE TABLE
  compareWrap: { overflowX: 'auto', marginTop: 48 },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: 14,
  },
  th: {
    padding: '14px 24px',
    textAlign: 'left',
    borderBottom: `1px solid ${BORDER}`,
    color: MUTED,
    fontSize: 12,
    letterSpacing: 1,
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
  },
  thAccent: {
    padding: '14px 24px',
    textAlign: 'center',
    borderBottom: `1px solid ${BORDER}`,
    color: ICE,
    fontSize: 12,
    letterSpacing: 1,
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    background: 'rgba(125, 211, 240, 0.04)',
    borderLeft: `1px solid ${BORDER}`,
    borderRight: `1px solid ${BORDER}`,
  },
  td: {
    padding: '16px 24px',
    borderBottom: `1px solid ${BORDER}`,
    color: MUTED,
    fontSize: 13,
  },
  tdAccent: {
    padding: '16px 24px',
    borderBottom: `1px solid ${BORDER}`,
    textAlign: 'center',
    background: 'rgba(125, 211, 240, 0.04)',
    borderLeft: `1px solid ${BORDER}`,
    borderRight: `1px solid ${BORDER}`,
    color: ICE,
    fontWeight: 600,
  },

  // CTA SECTION
  ctaSection: {
    margin: '0 48px 100px',
    border: `1px solid ${BORDER}`,
    borderRadius: 12,
    padding: '80px 48px',
    textAlign: 'center',
    background: CARD,
  },
  ctaH2: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: 'clamp(28px, 4vw, 52px)',
    color: '#fff',
    letterSpacing: -1,
    margin: '0 0 20px',
  },
  ctaSub: { color: MUTED, fontSize: 16, marginBottom: 40 },

  // FOOTER
  footer: {
    borderTop: `1px solid ${BORDER}`,
    padding: '32px 48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerLogo: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: 16,
    letterSpacing: 3,
    color: '#fff',
  },
  footerText: { color: MUTED, fontSize: 12 },
}

// ─── FEATURE DATA ───────────────────────────────────────────────
const features = [
  {
    icon: '🔍',
    title: 'Shop Spy',
    desc: 'Enter any Etsy shop name or URL. Get their top listings, pricing breakdown, and strategy — in seconds.',
    tag: 'INSTANT INTEL',
  },
  {
    icon: '📊',
    title: 'Keyword Research',
    desc: 'Find keywords your competitors rank for. See difficulty scores, avg prices, and competition levels before you list.',
    tag: 'DIFFICULTY SCORE',
  },
  {
    icon: '💰',
    title: 'Pricing Strategy',
    desc: 'Know if a niche is Premium-heavy, Race to the bottom, or Tight cluster. Price with confidence, not guesswork.',
    tag: 'HONEST DATA',
  },
]

const compare = [
  { feature: 'Shop competitor spy',   exray: '✓', erank: '✓', marma: '✓' },
  { feature: 'Keyword difficulty score', exray: '✓', erank: '✗', marma: '✗' },
  { feature: 'Pricing strategy analysis', exray: '✓', erank: '✗', marma: '✗' },
  { feature: 'Honest data (no fake metrics)', exray: '✓', erank: '✗', marma: '✗' },
  { feature: 'No bloat UI',           exray: '✓', erank: '✗', marma: '✗' },
  { feature: 'Price',                 exray: 'Free / $12', erank: '$10/mo', marma: '$19/mo' },
]

// ─── COMPONENT ──────────────────────────────────────────────────
export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div style={S.page}>

      {/* NAV */}
      <nav style={S.nav}>
        <a href="/" style={S.logo}>
          <span style={S.logoAccent}>EX</span>RAY
        </a>
        <div style={S.navLinks}>
          <a href="#features" style={S.navLink}>Features</a>
          <a href="#compare"  style={S.navLink}>Compare</a>
          <a href="#pricing"  style={S.navLink}>Pricing</a>
          <Link href="/login"    style={S.navLink}>Log in</Link>
          <Link href="/signup"   style={S.navCta}>Get Started</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={S.hero}>
        <div style={S.eyebrow}>
          <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: ICE }} />
          ETSY COMPETITOR INTELLIGENCE
        </div>
        <h1 style={S.h1}>
          X-ray every<br />
          <span style={S.h1Accent}>Etsy shop</span><br />
          in seconds.
        </h1>
        <p style={S.subtext}>
          Spy on any competitor. Decode their pricing. Find keywords they rank for.
          Stop guessing — start selling.
        </p>
        <div style={S.heroActions}>
          <Link href="/signup" style={S.primaryBtn}>START FOR FREE →</Link>
          <Link href="/login"  style={S.secondaryBtn}>Log in</Link>
        </div>
        <p style={S.hint}>No credit card required</p>
      </section>

      {/* STATS */}
      <div style={S.statsRow}>
        {[
          { num: '10s',  label: 'Time to first insight' },
          { num: '$0',   label: 'To get started' },
          { num: '100%', label: 'Honest data, no fluff' },
          { num: '3',    label: 'Competitors beaten on price' },
        ].map((s, i) => (
          <div key={i} style={{ ...S.statItem, borderRight: i < 3 ? `1px solid ${BORDER}` : 'none' }}>
            <span style={S.statNum}>{s.num}</span>
            <span style={S.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* FEATURES */}
      <section style={S.section} id="features">
        <div style={S.sectionLabel}>WHAT EXRAY DOES</div>
        <h2 style={S.sectionH2}>
          Everything you need.<br />Nothing you don't.
        </h2>
        <div style={S.featureGrid}>
          {features.map((f, i) => (
            <div key={i} style={{
              ...S.featureCard,
              borderRight: i < features.length - 1 ? `1px solid ${BORDER}` : 'none',
            }}>
              <div style={S.featureIcon}>{f.icon}</div>
              <div style={S.featureTitle}>{f.title}</div>
              <p style={S.featureDesc}>{f.desc}</p>
              <div style={S.featureTag}>{f.tag}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ ...S.section, borderTop: `1px solid ${BORDER}` }}>
        <div style={S.sectionLabel}>HOW IT WORKS</div>
        <h2 style={S.sectionH2}>Three steps.<br />Real answers.</h2>
        <div style={S.stepsGrid}>
          {[
            { n: '01', title: 'Enter a shop or keyword', desc: 'Type any Etsy shop name, URL, or keyword you want to research.' },
            { n: '02', title: 'EXRAY scans it',          desc: 'We pull live data — listings, prices, ratings, competition — and process it instantly.' },
            { n: '03', title: 'You get the edge',        desc: 'See exactly what works, what to price, and which keywords to target. Then go list.' },
          ].map((s, i) => (
            <div key={i}>
              <div style={S.stepNum}>{s.n}</div>
              <div style={S.stepTitle}>{s.title}</div>
              <p style={S.stepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARE */}
      <section style={{ ...S.section, borderTop: `1px solid ${BORDER}` }} id="compare">
        <div style={S.sectionLabel}>VS COMPETITORS</div>
        <h2 style={S.sectionH2}>Why sellers switch<br />to EXRAY.</h2>
        <div style={S.compareWrap}>
          <table style={S.table}>
            <thead>
              <tr>
                <th style={S.th}>Feature</th>
                <th style={S.thAccent}>EXRAY</th>
                <th style={S.th}>eRank</th>
                <th style={S.th}>Marmalead</th>
              </tr>
            </thead>
            <tbody>
              {compare.map((row, i) => (
                <tr key={i}>
                  <td style={S.td}>{row.feature}</td>
                  <td style={S.tdAccent}>{row.exray}</td>
                  <td style={S.td}>{row.erank}</td>
                  <td style={S.td}>{row.marma}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ ...S.section, borderTop: `1px solid ${BORDER}` }} id="pricing">
        <div style={S.sectionLabel}>PRICING</div>
        <h2 style={S.sectionH2}>Simple.<br />No tricks.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 700 }}>
          {/* Free */}
          <div style={{ ...S.featureCard, borderRadius: 10, border: `1px solid ${BORDER}` }}>
            <div style={{ ...S.featureTitle, fontSize: 22 }}>Free</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 40, fontWeight: 800, color: '#fff', margin: '12px 0' }}>
              $0
            </div>
            <p style={{ ...S.featureDesc, marginBottom: 24 }}>5 searches per day. No card needed.</p>
            {['Shop Spy', 'Keyword Research', 'Pricing Strategy', 'Difficulty Score'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ color: ICE, fontWeight: 700 }}>✓</span>
                <span style={{ color: MUTED, fontSize: 13 }}>{f}</span>
              </div>
            ))}
            <Link href="/signup" style={{ ...S.secondaryBtn, display: 'block', textAlign: 'center', marginTop: 28 }}>
              Get Started
            </Link>
          </div>

          {/* Pro */}
          <div style={{ ...S.featureCard, borderRadius: 10, border: `1px solid ${ICE}` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              <div style={{ ...S.featureTitle, fontSize: 22 }}>Pro</div>
              <span style={{ background: ICE, color: BG, fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 4, letterSpacing: 1, fontFamily: "'Syne', sans-serif" }}>
                POPULAR
              </span>
            </div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 40, fontWeight: 800, color: ICE, margin: '12px 0' }}>
              $12<span style={{ fontSize: 16, color: MUTED, fontWeight: 400 }}>/mo</span>
            </div>
            <p style={{ ...S.featureDesc, marginBottom: 24 }}>Unlimited searches. Full access.</p>
            {['Unlimited searches', 'Priority data', 'All free features', 'Early access to new tools'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ color: ICE, fontWeight: 700 }}>✓</span>
                <span style={{ color: MUTED, fontSize: 13 }}>{f}</span>
              </div>
            ))}
            <Link href="/signup" style={{ ...S.primaryBtn, display: 'block', textAlign: 'center', marginTop: 28 }}>
              Start Pro →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div style={S.ctaSection}>
        <h2 style={S.ctaH2}>
          Stop flying blind<br />on Etsy.
        </h2>
        <p style={S.ctaSub}>Join sellers who research before they list.</p>
        <Link href="/signup" style={S.primaryBtn}>
          START FOR FREE →
        </Link>
        <p style={{ ...S.hint, marginTop: 20 }}>No credit card · 5 free searches daily · Cancel anytime</p>
      </div>

      {/* FOOTER */}
      <footer style={S.footer}>
        <div style={S.footerLogo}>
          <span style={{ color: ICE }}>EX</span>RAY
        </div>
        <div style={S.footerText}>© 2025 EXRAY. Built for Etsy sellers.</div>
        <div style={{ display: 'flex', gap: 24 }}>
          <a href="#" style={{ ...S.navLink, fontSize: 12 }}>Privacy</a>
          <a href="#" style={{ ...S.navLink, fontSize: 12 }}>Terms</a>
        </div>
      </footer>

    </div>
  )
}

/*
─────────────────────────────────────────────
  SETUP INSTRUCTIONS
─────────────────────────────────────────────

1. PASTE THIS FILE → app/page.js (replace entire file)

2. ADD FONTS → app/layout.js
   Replace your current font import with:

   import { Syne, DM_Sans } from 'next/font/google'

   const syne = Syne({
     subsets: ['latin'],
     weight: ['400', '600', '700', '800'],
     variable: '--font-syne',
   })
   const dmSans = DM_Sans({
     subsets: ['latin'],
     weight: ['400', '500', '600'],
     variable: '--font-dm-sans',
   })

   Then in your <body> tag:
   className={`${syne.variable} ${dmSans.variable}`}

3. UPDATE METADATA → app/layout.js
   export const metadata = {
     title: 'EXRAY — Etsy Competitor Intelligence',
     description: 'X-ray any Etsy shop. Spy on competitors, find keywords, decode pricing — in seconds.',
   }

4. TAILWIND (optional) — all styles are inline so
   Tailwind not required for this page.
   But keep tailwind for dashboard/auth pages.

5. git add . && git commit -m "feat: EXRAY landing page ice theme"
   git push
─────────────────────────────────────────────
*/
