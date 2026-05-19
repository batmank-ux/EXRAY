"use client";
 
// app/login/page.js — EXRAY Login
// Theme: #080C10 bg · #7DD3F0 ice · Syne + DM Sans + JetBrains Mono
 
import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
 
const ICE     = "#7DD3F0";
const BG      = "#080C10";
const SURFACE = "#0C1118";
const BORDER  = "rgba(125,211,240,0.09)";
const BORDER_A= "rgba(125,211,240,0.22)";
const TEXT    = "#CBD5E1";
const TEXT_HI = "#F0F9FF";
const MUTED   = "#3D5166";
const DISPLAY = "'Syne', sans-serif";
const BODY    = "'DM Sans', 'Inter', sans-serif";
 
const inputStyle = {
  width: "100%", display: "block",
  background: BG, border: `1px solid ${BORDER}`,
  borderRadius: 8, padding: "11px 14px",
  color: TEXT_HI, fontSize: 14, fontFamily: BODY,
  outline: "none", transition: "border-color .15s, box-shadow .15s",
  marginTop: 6,
};
 
export default function LoginPage() {
  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [loading, setLoading]           = useState(false);
  const [googleLoading, setGoogleLoad]  = useState(false);
  const [error, setError]               = useState("");
 
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    const { error } = await createClient().auth.signInWithPassword({ email, password });
    if (error) { setError(error.message); setLoading(false); return; }
    window.location.href = "/dashboard";
  };
 
  const handleGoogle = async () => {
    setGoogleLoad(true); setError("");
    const { error } = await createClient().auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/auth/callback" },
    });
    if (error) { setError(error.message); setGoogleLoad(false); }
  };
 
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${BG}; }
        input:focus { border-color: ${BORDER_A} !important; box-shadow: 0 0 0 3px rgba(125,211,240,0.07) !important; }
        .g-btn:hover { background: rgba(255,255,255,0.92) !important; }
        .sub-btn:hover { background: rgba(125,211,240,0.13) !important; border-color: ${ICE} !important; }
        .ghost-btn:hover { color: ${ICE} !important; }
      `}</style>
 
      <div style={{ minHeight: "100vh", background: BG, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px", fontFamily: BODY }}>
        <div style={{ width: "100%", maxWidth: 400 }}>
 
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <Link href="/" style={{ textDecoration: "none", display: "inline-block" }}>
              <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 26, letterSpacing: 5, color: TEXT_HI, lineHeight: 1 }}>
                <span style={{ color: ICE }}>EX</span>RAY
              </div>
              <div style={{ fontSize: 10, color: MUTED, letterSpacing: 2.5, marginTop: 5, fontWeight: 600 }}>
                ETSY INTELLIGENCE
              </div>
            </Link>
          </div>
 
          {/* Card */}
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "32px 28px" }}>
 
            <h1 style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 22, color: TEXT_HI, letterSpacing: -0.3, marginBottom: 6 }}>
              Welcome back
            </h1>
            <p style={{ color: MUTED, fontSize: 13, marginBottom: 24, fontFamily: BODY }}>
              Log in to your EXRAY account
            </p>
 
            {/* Google */}
            <button
              type="button"
              onClick={handleGoogle}
              disabled={googleLoading || loading}
              className="g-btn"
              style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                padding: "11px", borderRadius: 8, border: "none",
                background: "#fff", color: "#1a1a1a",
                fontSize: 13, fontWeight: 600, fontFamily: BODY,
                cursor: googleLoading || loading ? "not-allowed" : "pointer",
                opacity: googleLoading || loading ? 0.6 : 1,
                transition: "background .15s", marginBottom: 20,
              }}
            >
              <svg width={18} height={18} viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {googleLoading ? "Connecting…" : "Continue with Google"}
            </button>
 
            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ flex: 1, height: 1, background: BORDER }} />
              <span style={{ color: MUTED, fontSize: 11, letterSpacing: 1, fontWeight: 600 }}>OR</span>
              <div style={{ flex: 1, height: 1, background: BORDER }} />
            </div>
 
            {/* Form */}
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 11, letterSpacing: 1.5, color: TEXT, fontWeight: 700, fontFamily: BODY }}>EMAIL</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" style={inputStyle} />
              </div>
              <div style={{ marginBottom: 8 }}>
                <label style={{ fontSize: 11, letterSpacing: 1.5, color: TEXT, fontWeight: 700, fontFamily: BODY }}>PASSWORD</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" style={inputStyle} />
              </div>
 
              <div style={{ textAlign: "right", marginBottom: 20 }}>
                <Link href="/forgot-password" className="ghost-btn"
                  style={{ fontSize: 12, color: MUTED, textDecoration: "none", transition: "color .15s" }}>
                  Forgot password?
                </Link>
              </div>
 
              {error && (
                <div style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.18)", borderRadius: 7, padding: "11px 14px", color: "#FCA5A5", fontSize: 13, marginBottom: 16, fontFamily: BODY }}>
                  {error}
                </div>
              )}
 
              <button
                type="submit"
                disabled={loading || googleLoading}
                className="sub-btn"
                style={{
                  width: "100%", padding: "12px",
                  borderRadius: 8, border: `1px solid ${BORDER_A}`,
                  background: "rgba(125,211,240,0.08)",
                  color: ICE, fontSize: 13, fontWeight: 700,
                  fontFamily: DISPLAY, letterSpacing: 2,
                  cursor: loading || googleLoading ? "not-allowed" : "pointer",
                  opacity: loading || googleLoading ? 0.6 : 1,
                  transition: "all .15s",
                }}
              >
                {loading ? "LOGGING IN…" : "LOG IN"}
              </button>
            </form>
 
            <p style={{ textAlign: "center", fontSize: 13, color: MUTED, marginTop: 22, fontFamily: BODY }}>
              Don't have an account?{" "}
              <Link href="/signup" style={{ color: ICE, textDecoration: "none", fontWeight: 600 }}>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}