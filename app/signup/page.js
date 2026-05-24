"use client";
// app/signup/page.js — EXRAY Signup v4
// True centered layout · Mobile-first · Premium intelligence platform
 
import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
 
const C = {
  bg:        "#04070B",
  s1:        "#070D14",
  s2:        "#0B1420",
  cyan:      "#7DD3F0",
  cyanDim:   "rgba(125,211,240,0.55)",
  cyanFaint: "rgba(125,211,240,0.08)",
  border:    "rgba(125,211,240,0.09)",
  borderA:   "rgba(125,211,240,0.22)",
  text:      "#8BAABB",
  textMid:   "#B8CDD8",
  textHi:    "#EAF4FA",
  muted:     "#3D5668",
  green:     "#3DC98A",
  font:      "'DM Sans', system-ui, sans-serif",
  mono:      "'JetBrains Mono', monospace",
};
 
export default function SignupPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [gLoad, setGLoad]       = useState(false);
  const [error, setError]       = useState("");
  const [focused, setFocused]   = useState("");
 
  const handleSignup = async e => {
    e.preventDefault();
    setLoading(true); setError("");
    const { error } = await createClient().auth.signUp({ email, password });
    if (error) { setError(error.message); setLoading(false); return; }
    window.location.href = "/dashboard";
  };
 
  const handleGoogle = async () => {
    setGLoad(true); setError("");
    const { error } = await createClient().auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/auth/callback" },
    });
    if (error) { setError(error.message); setGLoad(false); }
  };
 
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=JetBrains+Mono:wght@500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; }
        body { background: ${C.bg}; font-family: ${C.font}; -webkit-font-smoothing: antialiased; }
        a { text-decoration: none; color: inherit; }
        @keyframes exSpin { to { transform: rotate(360deg); } }
        @keyframes exFade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .page {
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          background: ${C.bg};
          position: relative;
          overflow: hidden;
        }
        .page::before {
          content: '';
          position: fixed;
          top: -20%;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 400px;
          background: radial-gradient(ellipse, rgba(125,211,240,0.04) 0%, transparent 70%);
          pointer-events: none;
        }
        .card {
          width: 100%;
          max-width: 440px;
          background: ${C.s1};
          border: 1px solid ${C.border};
          border-radius: 14px;
          padding: 40px 36px;
          position: relative;
          animation: exFade .4s ease forwards;
        }
        @media (max-width: 480px) {
          .card { padding: 32px 24px; border-radius: 12px; }
        }
        @media (max-width: 360px) {
          .card { padding: 28px 18px; }
        }
        .logo-wrap { text-align: center; margin-bottom: 32px; }
        .logo { font-family: ${C.font}; font-weight: 800; font-size: 22px; letter-spacing: 5px; color: ${C.textHi}; }
        .logo span { color: ${C.cyan}; }
        .logo-sub { font-size: 9px; color: ${C.muted}; letter-spacing: 2.5px; margin-top: 5px; font-weight: 700; }
        .head { margin-bottom: 28px; }
        .head-tag { font-size: 9px; letter-spacing: 2.5px; color: ${C.cyanDim}; font-weight: 700; margin-bottom: 10px; }
        .head-h1 { font-size: 22px; font-weight: 800; color: ${C.textHi}; letter-spacing: -0.4px; line-height: 1.15; margin-bottom: 7px; }
        .head-sub { font-size: 13.5px; color: ${C.text}; line-height: 1.6; }
        .g-btn {
          width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px;
          padding: 11px; border-radius: 8px; border: none;
          background: #fff; color: #1a1a1a;
          font-size: 13.5px; font-weight: 600; font-family: ${C.font};
          cursor: pointer; transition: background .15s; margin-bottom: 20px;
        }
        .g-btn:hover { background: rgba(255,255,255,0.88); }
        .g-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .divider { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
        .divider-line { flex: 1; height: 1px; background: ${C.border}; }
        .divider-text { font-size: 10.5px; color: ${C.muted}; font-weight: 600; letter-spacing: 1px; }
        .field { margin-bottom: 14px; }
        .field label { display: block; font-size: 11px; letter-spacing: 1.5px; color: ${C.textMid}; font-weight: 700; margin-bottom: 7px; }
        .field input {
          width: 100%; background: ${C.s2}; border: 1px solid ${C.border};
          border-radius: 7px; padding: 11px 14px;
          color: ${C.textHi}; font-size: 14px; font-family: ${C.font};
          outline: none; transition: border-color .15s, box-shadow .15s;
          -webkit-appearance: none;
        }
        .field input:focus { border-color: ${C.borderA}; box-shadow: 0 0 0 3px rgba(125,211,240,0.07); }
        .field input.active { border-color: ${C.borderA}; }
        .sub-btn {
          width: 100%; padding: 12px; border-radius: 7px;
          border: 1px solid ${C.borderA}; background: ${C.cyanFaint};
          color: ${C.cyan}; font-size: 13.5px; font-weight: 700;
          font-family: ${C.font}; letter-spacing: 0.5px;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: all .15s;
        }
        .sub-btn:hover:not(:disabled) { background: rgba(125,211,240,0.13); border-color: rgba(125,211,240,0.35); }
        .sub-btn:disabled { opacity: 0.55; cursor: not-allowed; }
        .err-box {
          background: rgba(224,96,85,0.07); border: 1px solid rgba(224,96,85,0.22);
          border-radius: 7px; padding: 11px 14px; color: #F0A098;
          font-size: 13px; margin-bottom: 14px;
        }
        .perks {
          display: flex; justify-content: center;
          gap: 16px; flex-wrap: wrap;
          margin-top: 18px;
        }
        .perk { display: flex; align-items: center; gap: 5px; font-size: 11px; color: ${C.muted}; }
        .perk-dot { color: ${C.cyan}; font-weight: 700; font-size: 12px; }
        .footer-link { text-align: center; font-size: 13px; color: ${C.muted}; margin-top: 20px; }
        .footer-link a { color: ${C.cyanDim}; font-weight: 600; transition: color .15s; }
        .footer-link a:hover { color: ${C.cyan}; }
        .spinner { width: 14px; height: 14px; flex-shrink: 0; animation: exSpin .7s linear infinite; }
      `}</style>
 
      <div className="page">
        <div className="card">
 
          {/* Logo */}
          <div className="logo-wrap">
            <Link href="/">
              <div className="logo"><span>EX</span>RAY</div>
              <div className="logo-sub">ETSY INTELLIGENCE</div>
            </Link>
          </div>
 
          {/* Heading */}
          <div className="head">
            <div className="head-tag">CREATE YOUR ACCOUNT</div>
            <h1 className="head-h1">Access your competitor intelligence.</h1>
            <p className="head-sub">Stop guessing. Start reading the market.</p>
          </div>
 
          {/* Google */}
          <button className="g-btn" onClick={handleGoogle} disabled={gLoad || loading}>
            <svg width={17} height={17} viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {gLoad ? "Connecting…" : "Continue with Google"}
          </button>
 
          {/* Divider */}
          <div className="divider">
            <div className="divider-line"/>
            <span className="divider-text">OR</span>
            <div className="divider-line"/>
          </div>
 
          {/* Form */}
          <form onSubmit={handleSignup}>
            <div className="field">
              <label>EMAIL</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required
                placeholder="you@example.com"
                className={focused==="email"?"active":""}
                onFocus={()=>setFocused("email")} onBlur={()=>setFocused("")}
              />
            </div>
            <div className="field" style={{marginBottom:22}}>
              <label>PASSWORD</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required minLength={6}
                placeholder="At least 6 characters"
                className={focused==="pass"?"active":""}
                onFocus={()=>setFocused("pass")} onBlur={()=>setFocused("")}
              />
            </div>
            {error && <div className="err-box">{error}</div>}
            <button type="submit" className="sub-btn" disabled={loading || gLoad}>
              {loading && (
                <svg className="spinner" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="rgba(125,211,240,0.2)" strokeWidth="3"/>
                  <path fill="#7DD3F0" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
              )}
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>
 
          {/* Perks */}
          <div className="perks">
            {["5 free searches/day","No credit card","Cancel anytime"].map(t=>(
              <div key={t} className="perk">
                <span className="perk-dot">✓</span> {t}
              </div>
            ))}
          </div>
 
          <div className="footer-link">
            Already have an account?{" "}
            <Link href="/login">Log in →</Link>
          </div>
        </div>
      </div>
    </>
  );
}
 