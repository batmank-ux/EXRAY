"use client";
// app/signup/page.js — EXRAY Signup v3
// Split-screen · Premium intelligence platform · Matches landing + dashboard
 
import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
 
const C = {
  bg:      "#06090D",
  s1:      "#090E14",
  s2:      "#0C1219",
  s3:      "#0F1720",
  ice:     "#7DD3F0",
  iceDim:  "rgba(125,211,240,0.4)",
  iceFaint:"rgba(125,211,240,0.055)",
  border:  "rgba(255,255,255,0.05)",
  borderA: "rgba(125,211,240,0.14)",
  text:    "#6B8090",
  textMid: "#9AAEBB",
  textHi:  "#E0ECF4",
  muted:   "#243040",
  green:   "#3DD68C",
  amber:   "#F5C842",
  font:    "'DM Sans', system-ui, sans-serif",
  mono:    "'JetBrains Mono', monospace",
};
 
const inputStyle = {
  width:"100%", display:"block",
  background:C.s2, border:`1px solid ${C.border}`,
  borderRadius:7, padding:"11px 14px",
  color:C.textHi, fontSize:14, fontFamily:C.font,
  outline:"none", transition:"border-color .15s, box-shadow .15s",
};
 
// Intelligence stats shown on left panel
const stats = [
  { num:"10s",   label:"Time to first insight" },
  { num:"$0",    label:"To get started" },
  { num:"100%",  label:"Live Etsy data" },
];
 
// What EXRAY does — left panel bullets
const capabilities = [
  { icon:"→", text:"Decode competitor pricing strategies" },
  { icon:"→", text:"Surface keyword difficulty before you list" },
  { icon:"→", text:"Identify niche saturation signals" },
  { icon:"→", text:"Find market gaps your competitors miss" },
];
 
export default function SignupPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [gLoading, setGLoading] = useState(false);
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
    setGLoading(true); setError("");
    const { error } = await createClient().auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/auth/callback" },
    });
    if (error) { setError(error.message); setGLoading(false); }
  };
 
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{background:${C.bg};margin:0}
        a{text-decoration:none;color:inherit}
        @keyframes exFade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        @keyframes exSlide{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}
        @keyframes exSpin{to{transform:rotate(360deg)}}
        .ex-fade{animation:exFade .4s ease forwards}
        .ex-slide{animation:exSlide .5s ease forwards}
        .g-btn:hover{background:rgba(255,255,255,0.88)!important}
        .sub-btn:hover:not(:disabled){background:rgba(125,211,240,0.1)!important;border-color:rgba(125,211,240,0.3)!important}
        .ghost-link:hover{color:${C.ice}!important}
        input:focus{border-color:${C.borderA}!important;box-shadow:0 0 0 3px rgba(125,211,240,0.06)!important}
        @media(max-width:768px){.split-left{display:none!important}.split-right{width:100%!important;max-width:100%!important;padding:32px 24px!important}}
      `}</style>
 
      <div style={{display:"flex",minHeight:"100vh",background:C.bg,fontFamily:C.font}}>
 
        {/* ── LEFT — Intelligence pitch ── */}
        <div className="split-left" style={{
          flex:1, background:C.s1,
          borderRight:`1px solid ${C.border}`,
          padding:"48px 52px",
          display:"flex", flexDirection:"column",
          justifyContent:"space-between",
          position:"relative", overflow:"hidden",
        }}>
          <div style={{
            position:"absolute", inset:0, pointerEvents:"none",
            background:`
              radial-gradient(ellipse at 20% 20%, rgba(125,211,240,0.03) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 80%, rgba(125,211,240,0.02) 0%, transparent 50%)
            `,
          }}/>
 
          {/* Logo */}
          <div className="ex-slide" style={{position:"relative"}}>
            <Link href="/">
              <div style={{fontFamily:C.font,fontWeight:800,fontSize:18,letterSpacing:5,color:C.textHi}}>
                <span style={{color:C.ice}}>EX</span>RAY
              </div>
              <div style={{fontSize:9,color:C.muted,letterSpacing:2.5,marginTop:4,fontWeight:600}}>INTELLIGENCE</div>
            </Link>
          </div>
 
          {/* Main pitch */}
          <div className="ex-fade" style={{position:"relative"}}>
            <div style={{fontSize:10,letterSpacing:3,color:C.iceDim,fontWeight:700,marginBottom:16}}>WHAT YOU'RE ABOUT TO ACCESS</div>
            <h2 style={{fontFamily:C.font,fontWeight:800,fontSize:34,color:C.textHi,letterSpacing:-1,lineHeight:1.1,marginBottom:16,maxWidth:360}}>
              Stop guessing.<br/>Start reading the market.
            </h2>
            <p style={{fontSize:14.5,color:C.text,lineHeight:1.8,maxWidth:360,marginBottom:36}}>
              EXRAY gives you the intelligence layer that serious Etsy sellers use to research before they list — not after they fail.
            </p>
 
            {/* Capabilities */}
            <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:36}}>
              {capabilities.map((cap,i)=>(
                <div key={i} style={{display:"flex",alignItems:"flex-start",gap:12}}>
                  <span style={{color:C.ice,fontWeight:700,fontSize:13,flexShrink:0,marginTop:1}}>→</span>
                  <span style={{fontSize:14,color:C.textMid,lineHeight:1.6}}>{cap.text}</span>
                </div>
              ))}
            </div>
 
            {/* Stats row */}
            <div style={{
              background:C.s2, border:`1px solid ${C.border}`,
              borderRadius:9, padding:"16px 18px",
              display:"grid", gridTemplateColumns:"repeat(3,1fr)",
              gap:0,
            }}>
              {stats.map((s,i)=>(
                <div key={i} style={{
                  padding:"0 16px",
                  borderRight:i<2?`1px solid ${C.border}`:"none",
                  textAlign:"center",
                }}>
                  <div style={{fontFamily:C.mono,fontSize:20,fontWeight:700,color:C.ice,letterSpacing:-0.5,lineHeight:1,marginBottom:4}}>{s.num}</div>
                  <div style={{fontSize:10.5,color:C.muted}}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
 
          {/* Bottom note */}
          <div style={{position:"relative"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
              <div style={{width:5,height:5,borderRadius:"50%",background:C.green,flexShrink:0}}/>
              <span style={{fontSize:11,color:C.muted}}>No credit card required</span>
            </div>
            <div style={{fontSize:11,color:C.muted}}>5 free searches daily · Cancel anytime</div>
          </div>
        </div>
 
        {/* ── RIGHT — Signup form ── */}
        <div className="split-right" style={{
          width:420, flexShrink:0,
          display:"flex", alignItems:"center", justifyContent:"center",
          padding:"48px 44px",
          background:C.bg,
        }}>
          <div className="ex-fade" style={{width:"100%",maxWidth:360}}>
 
            <div style={{marginBottom:32}}>
              <div style={{fontSize:9.5,letterSpacing:2.5,color:C.iceDim,fontWeight:700,marginBottom:10}}>CREATE YOUR ACCOUNT</div>
              <h1 style={{fontFamily:C.font,fontWeight:800,fontSize:24,color:C.textHi,letterSpacing:-0.5,lineHeight:1.15,marginBottom:8}}>
                Access your competitor intelligence.
              </h1>
              <p style={{fontSize:13.5,color:C.text,lineHeight:1.7}}>Free to start · No card required.</p>
            </div>
 
            {/* Google */}
            <button type="button" onClick={handleGoogle} disabled={gLoading||loading} className="g-btn"
              style={{
                width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:10,
                padding:"11px",borderRadius:7,border:"none",
                background:"#fff",color:"#1a1a1a",
                fontSize:13.5,fontWeight:600,fontFamily:C.font,
                cursor:gLoading||loading?"not-allowed":"pointer",
                opacity:gLoading||loading?0.6:1,
                transition:"background .15s",marginBottom:20,
              }}>
              <svg width={17} height={17} viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {gLoading ? "Connecting…" : "Continue with Google"}
            </button>
 
            {/* Divider */}
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
              <div style={{flex:1,height:1,background:C.border}}/>
              <span style={{fontSize:10.5,color:C.muted,fontWeight:600,letterSpacing:1}}>OR</span>
              <div style={{flex:1,height:1,background:C.border}}/>
            </div>
 
            {/* Form */}
            <form onSubmit={handleSignup}>
              <div style={{marginBottom:14}}>
                <label style={{display:"block",fontSize:11,letterSpacing:1.5,color:C.textMid,fontWeight:700,marginBottom:7}}>EMAIL</label>
                <input
                  type="email" value={email} onChange={e=>setEmail(e.target.value)} required
                  placeholder="you@example.com"
                  onFocus={()=>setFocused("email")} onBlur={()=>setFocused("")}
                  style={{...inputStyle,borderColor:focused==="email"?C.borderA:C.border}}
                />
              </div>
 
              <div style={{marginBottom:22}}>
                <label style={{display:"block",fontSize:11,letterSpacing:1.5,color:C.textMid,fontWeight:700,marginBottom:7}}>PASSWORD</label>
                <input
                  type="password" value={password} onChange={e=>setPassword(e.target.value)} required minLength={6}
                  placeholder="At least 6 characters"
                  onFocus={()=>setFocused("password")} onBlur={()=>setFocused("")}
                  style={{...inputStyle,borderColor:focused==="password"?C.borderA:C.border}}
                />
              </div>
 
              {error&&(
                <div style={{background:"rgba(229,99,90,0.06)",border:"1px solid rgba(229,99,90,0.18)",borderRadius:7,padding:"11px 14px",color:"#F4A09A",fontSize:13,marginBottom:16,fontFamily:C.font}}>
                  {error}
                </div>
              )}
 
              <button type="submit" disabled={loading||gLoading} className="sub-btn"
                style={{
                  width:"100%",padding:"12px",borderRadius:7,
                  border:`1px solid ${C.borderA}`,
                  background:C.iceFaint,color:C.ice,
                  fontSize:13.5,fontWeight:600,fontFamily:C.font,
                  letterSpacing:0.5,cursor:loading||gLoading?"not-allowed":"pointer",
                  opacity:loading||gLoading?0.6:1,
                  display:"flex",alignItems:"center",justifyContent:"center",gap:8,
                  transition:"all .15s",
                }}>
                {loading&&(
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" style={{animation:"exSpin .7s linear infinite"}}>
                    <circle cx="12" cy="12" r="10" stroke="rgba(125,211,240,0.2)" strokeWidth="3"/>
                    <path fill={C.ice} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                )}
                {loading?"Creating account…":"Create account"}
              </button>
            </form>
 
            {/* Perks row */}
            <div style={{display:"flex",justifyContent:"center",gap:20,marginTop:20,flexWrap:"wrap"}}>
              {["5 free searches/day","No credit card","Cancel anytime"].map(t=>(
                <span key={t} style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:C.muted}}>
                  <span style={{color:C.ice,fontWeight:700}}>✓</span> {t}
                </span>
              ))}
            </div>
 
            <p style={{textAlign:"center",fontSize:13,color:C.muted,marginTop:20}}>
              Already have an account?{" "}
              <Link href="/login" className="ghost-link" style={{color:C.iceDim,fontWeight:600,transition:"color .15s"}}>
                Log in →
              </Link>
            </p>
 
          </div>
        </div>
      </div>
    </>
  );
}
