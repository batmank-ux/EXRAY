"use client";
// app/dashboard/page.js — EXRAY Intelligence Workspace v4
// Philosophy: elegant restraint · signals not widgets · quietly alive
 
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
 
// ─── DESIGN TOKENS ────────────────────────────────────────────────
const C = {
  bg:       "#05080C",
  s1:       "#080D12",
  s2:       "#0B1118",
  s3:       "#0E151E",
  s4:       "#111A24",
  // Semantic signal colors
  cyan:     "#5BC8E8",   // opportunity
  cyanDim:  "rgba(91,200,232,0.35)",
  cyanFaint:"rgba(91,200,232,0.06)",
  amber:    "#E8A838",   // caution
  amberDim: "rgba(232,168,56,0.35)",
  red:      "#D95F52",   // saturation risk
  redDim:   "rgba(217,95,82,0.35)",
  green:    "#3DC98A",   // pricing advantage
  greenDim: "rgba(61,201,138,0.35)",
  violet:   "#8B6FD4",   // intelligence
  violetDim:"rgba(139,111,212,0.35)",
  // Neutral
  border:   "rgba(255,255,255,0.04)",
  borderA:  "rgba(91,200,232,0.12)",
  text:     "#546A7A",
  textMid:  "#8BA0AE",
  textHi:   "#D8EAF2",
  muted:    "#1E2E3A",
  font:     "'DM Sans', system-ui, sans-serif",
  mono:     "'JetBrains Mono', monospace",
};
 
// ─── GLOBAL STYLES ────────────────────────────────────────────────
const GLOBAL = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{background:${C.bg};margin:0;-webkit-font-smoothing:antialiased}
  a{text-decoration:none;color:inherit}
 
  @keyframes exSpin   { to { transform: rotate(360deg); } }
  @keyframes exFade   { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  @keyframes exSlide  { from{opacity:0;transform:translateX(-6px)} to{opacity:1;transform:translateX(0)} }
  @keyframes exPulse  { 0%,100%{opacity:1} 50%{opacity:0.25} }
  @keyframes exGlow   { 0%,100%{box-shadow:0 0 0 0 transparent} 50%{box-shadow:0 0 12px 2px rgba(91,200,232,0.08)} }
  @keyframes exSweep  { from{stroke-dashoffset:283} to{stroke-dashoffset:0} }
  @keyframes exRing   { from{stroke-dashoffset:var(--full)} to{stroke-dashoffset:var(--offset)} }
  @keyframes exRotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes exBlink  { 0%,90%,100%{opacity:0.4} 45%{opacity:1} }
  @keyframes exSlideR { from{opacity:0;transform:translateX(8px)} to{opacity:1;transform:translateX(0)} }
 
  .ex-fade   { animation: exFade  .4s ease forwards; }
  .ex-slide  { animation: exSlide .4s ease forwards; }
  .ex-slr    { animation: exSlideR .4s ease forwards; }
 
  .nb { transition: background .15s, border-color .15s, color .15s; cursor:pointer; }
  .nb:hover { background: rgba(91,200,232,0.04) !important; color: ${C.textHi} !important; }
  .nb.on    { background: rgba(91,200,232,0.06) !important; border-color: ${C.borderA} !important; color: ${C.textHi} !important; }
 
  .sig-card { transition: border-color .25s, transform .2s; }
  .sig-card:hover { border-color: rgba(91,200,232,0.1) !important; transform: translateY(-1px); }
 
  .row-h:hover { background: rgba(91,200,232,0.02) !important; }
 
  .ext-lnk { transition: border-color .15s, color .15s; }
  .ext-lnk:hover { border-color: ${C.cyan} !important; color: ${C.cyan} !important; }
 
  .sub-b { transition: all .15s; }
  .sub-b:hover:not(:disabled) { background: rgba(91,200,232,0.09) !important; border-color: rgba(91,200,232,0.28) !important; }
 
  input:focus { outline:none!important; border-color:${C.borderA}!important; box-shadow: 0 0 0 3px rgba(91,200,232,0.05)!important; }
 
  ::-webkit-scrollbar { width:3px; height:3px; }
  ::-webkit-scrollbar-thumb { background:rgba(91,200,232,0.08); border-radius:4px; }
`;
 
// ─── ICONS ────────────────────────────────────────────────────────
const I = {
  scan: (c=C.text,s=15) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 012-2h2"/><path d="M17 3h2a2 2 0 012 2v2"/><path d="M21 17v2a2 2 0 01-2 2h-2"/><path d="M7 21H5a2 2 0 01-2-2v-2"/><line x1="7" y1="12" x2="17" y2="12"/></svg>,
  key:  (c=C.text,s=15) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>,
  bolt: (c=C.text,s=15) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  arr:  (c=C.cyanDim,s=11) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>,
};
 
const Spin = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" style={{animation:"exSpin .7s linear infinite",flexShrink:0}}>
    <circle cx="12" cy="12" r="10" stroke="rgba(91,200,232,0.15)" strokeWidth="3"/>
    <path fill={C.cyan} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
  </svg>
);
 
// ─── SIGNAL RING ──────────────────────────────────────────────────
// The signature EXRAY UI element — thin animated ring
function SignalRing({value=0, color=C.cyan, size=64, label="", sublabel="", pulse=false}) {
  const r = (size/2) - 5;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - Math.min(1, value));
  const id = `ring-${color.replace(/[^a-z0-9]/gi,"")}`;
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
      <div style={{position:"relative",width:size,height:size}}>
        {/* Outer ambient */}
        <svg width={size} height={size} style={{position:"absolute",inset:0,opacity:0.12}}>
          <circle cx={size/2} cy={size/2} r={r+3} fill="none" stroke={color} strokeWidth={0.5}/>
        </svg>
        {/* Track */}
        <svg width={size} height={size} style={{position:"absolute",inset:0}}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={1} opacity={0.08}/>
        </svg>
        {/* Value arc */}
        <svg width={size} height={size} style={{position:"absolute",inset:0,transform:"rotate(-90deg)"}}>
          <defs>
            <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color} stopOpacity="0.6"/>
              <stop offset="100%" stopColor={color} stopOpacity="1"/>
            </linearGradient>
          </defs>
          <circle
            cx={size/2} cy={size/2} r={r}
            fill="none" stroke={`url(#${id})`} strokeWidth={1.5}
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{
              transition:"stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)",
              ...(pulse?{animation:"exPulse 3s ease-in-out infinite"}:{}),
            }}
          />
        </svg>
        {/* Center dot */}
        <div style={{
          position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",
        }}>
          <div style={{
            width:5,height:5,borderRadius:"50%",background:color,
            boxShadow:`0 0 6px 1px ${color}`,
            opacity:0.8,
            ...(pulse?{animation:"exBlink 3s ease-in-out infinite"}:{}),
          }}/>
        </div>
      </div>
      {label&&<div style={{fontFamily:C.mono,fontSize:11,fontWeight:600,color:color,letterSpacing:0.3}}>{label}</div>}
      {sublabel&&<div style={{fontSize:10,color:C.muted,letterSpacing:0.5,textAlign:"center"}}>{sublabel}</div>}
    </div>
  );
}
 
// ─── INTELLIGENCE SIGNAL CARD ──────────────────────────────────────
function SignalCard({signal, delay=0}) {
  const [visible, setVisible] = useState(false);
  useEffect(()=>{
    const t = setTimeout(()=>setVisible(true), delay);
    return ()=>clearTimeout(t);
  },[delay]);
 
  if(!visible) return <div style={{height:120}}/>;
 
  return (
    <div className="sig-card ex-fade" style={{
      background:C.s1,border:`1px solid ${C.border}`,borderRadius:10,
      padding:"18px 20px",
      animationDelay:`${delay}ms`,
    }}>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12}}>
        <div style={{flex:1}}>
          <div style={{fontSize:8.5,letterSpacing:2.5,color:signal.color,fontWeight:700,opacity:0.7,marginBottom:8}}>{signal.type}</div>
          <div style={{fontSize:14,fontWeight:600,color:C.textHi,lineHeight:1.3,marginBottom:6}}>{signal.title}</div>
          <div style={{fontSize:12,color:C.text,lineHeight:1.6}}>{signal.desc}</div>
        </div>
        <SignalRing value={signal.ring} color={signal.color} size={52} pulse={signal.pulse}/>
      </div>
    </div>
  );
}
 
// ─── PRICING INTEL PANEL ──────────────────────────────────────────
function PricingPanel({analysis}) {
  if(!analysis) return null;
  const sm = {
    "Premium-heavy":  {color:C.cyan,  bg:"rgba(91,200,232,0.05)",  border:"rgba(91,200,232,0.14)"},
    "Race to bottom": {color:C.red,   bg:"rgba(217,95,82,0.05)",   border:"rgba(217,95,82,0.18)"},
    "Tight cluster":  {color:C.green, bg:"rgba(61,201,138,0.05)",  border:"rgba(61,201,138,0.14)"},
  }[analysis.strategy] || {color:C.text,bg:C.s2,border:C.border};
 
  const min = parseFloat(analysis.min)||0;
  const max = parseFloat(analysis.max)||1;
  const med = parseFloat(analysis.median)||0;
  const pct = (v) => Math.min(95,Math.max(5,((v-min)/(max-min))*100));
 
  return (
    <div className="sig-card" style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:10,padding:"20px 22px",marginBottom:12}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
        <div>
          <div style={{fontSize:8.5,letterSpacing:2.5,color:C.cyanDim,fontWeight:700,marginBottom:6}}>PRICING SIGNAL</div>
          <div style={{fontSize:14,fontWeight:600,color:C.textHi}}>Market Pricing Structure</div>
        </div>
        <span style={{
          fontSize:10,fontWeight:700,letterSpacing:0.5,
          padding:"4px 11px",borderRadius:99,
          background:sm.bg,border:`1px solid ${sm.border}`,color:sm.color,
        }}>{analysis.strategy||"Mixed"}</span>
      </div>
 
      {/* Price spectrum */}
      <div style={{marginBottom:20}}>
        <div style={{height:2,background:C.border,borderRadius:2,position:"relative",marginBottom:6}}>
          <div style={{position:"absolute",left:0,top:0,height:"100%",width:"100%",background:`linear-gradient(90deg,${C.green}30,${C.cyan}60,${C.amber}90)`,borderRadius:2,opacity:0.25}}/>
          <div style={{
            position:"absolute",top:-4,
            left:`${pct(med)}%`,
            transform:"translateX(-50%)",
            width:2,height:10,
            background:C.cyan,borderRadius:1,
            boxShadow:`0 0 6px ${C.cyan}`,
          }}/>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:9.5,color:C.muted,fontFamily:C.mono}}>
          <span>${analysis.min}</span>
          <span style={{color:C.cyanDim}}>median ${analysis.median}</span>
          <span>${analysis.max}</span>
        </div>
      </div>
 
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
        {[
          {label:"FLOOR",   val:`$${analysis.min}`,     color:C.textMid},
          {label:"MEDIAN",  val:`$${analysis.median}`,   color:C.cyan},
          {label:"AVERAGE", val:`$${analysis.average}`,  color:C.textMid},
          {label:"CEILING", val:`$${analysis.max}`,      color:C.textHi},
        ].map((p,i)=>(
          <div key={i} style={{background:C.s2,border:`1px solid ${C.border}`,borderRadius:7,padding:"11px 12px"}}>
            <div style={{fontSize:7.5,letterSpacing:2,color:C.muted,fontWeight:700,marginBottom:5}}>{p.label}</div>
            <div style={{fontFamily:C.mono,fontSize:14,fontWeight:700,color:p.color,letterSpacing:-0.3}}>{p.val}</div>
          </div>
        ))}
      </div>
      <div style={{fontSize:10,color:C.muted,marginTop:10}}>
        Based on {analysis.dataPoints} listings with visible prices
      </div>
    </div>
  );
}
 
// ─── LISTINGS PANEL ───────────────────────────────────────────────
function ListingsPanel({listings, keyword}) {
  if(!listings?.length) return null;
  return (
    <div className="sig-card" style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:10,overflow:"hidden",marginBottom:12}}>
      <div style={{padding:"15px 22px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div>
          <div style={{fontSize:8.5,letterSpacing:2.5,color:C.cyanDim,fontWeight:700,marginBottom:4}}>LISTING INTELLIGENCE</div>
          <div style={{fontSize:14,fontWeight:600,color:C.textHi}}>Top Results</div>
        </div>
        {keyword&&<div style={{fontFamily:C.mono,fontSize:10,color:C.muted}}>"{keyword}"</div>}
      </div>
      {listings.map((item,i)=>(
        <div key={i} className="row-h" style={{
          display:"flex",alignItems:"center",gap:12,
          padding:"12px 22px",
          borderBottom:i<listings.length-1?`1px solid ${C.border}`:"none",
          transition:"background .1s",
        }}>
          <div style={{
            width:20,height:20,borderRadius:4,flexShrink:0,
            background:C.s2,border:`1px solid ${C.border}`,
            display:"flex",alignItems:"center",justifyContent:"center",
            fontFamily:C.mono,fontSize:8.5,color:C.muted,fontWeight:600,
          }}>{String(i+1).padStart(2,"0")}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:13,color:C.textMid,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.title}</div>
            <div style={{fontFamily:C.mono,fontSize:10.5,color:item.price?C.cyanDim:C.muted,marginTop:2}}>{item.price||"—"}</div>
          </div>
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="ext-lnk"
            style={{flexShrink:0,padding:"4px 11px",borderRadius:5,border:`1px solid ${C.border}`,color:C.text,fontSize:11,fontWeight:500,textDecoration:"none",display:"flex",alignItems:"center",gap:4,transition:"all .15s"}}>
            View {I.arr()}
          </a>
        </div>
      ))}
    </div>
  );
}
 
// ─── SCAN ANIMATION ───────────────────────────────────────────────
function ScanAnimation({phases, active, done}) {
  if(!active&&!done) return null;
  return (
    <div className="ex-fade" style={{background:C.s1,border:`1px solid ${C.borderA}`,borderRadius:10,padding:"18px 22px",marginBottom:16}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
        <div style={{width:6,height:6,borderRadius:"50%",background:C.cyan,animation:"exPulse 1s ease-in-out infinite"}}/>
        <div style={{fontSize:8.5,letterSpacing:2.5,color:C.cyan,fontWeight:700}}>X-RAY SCAN ACTIVE</div>
      </div>
      {phases.map((label,i)=>(
        <div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:9,opacity:active>i?1:0.15,transition:"opacity .35s"}}>
          <div style={{width:4,height:4,borderRadius:"50%",flexShrink:0,
            background:active>i?C.cyan:C.muted,
            ...(active===i+1&&!done?{animation:"exBlink 1s infinite"}:{}),
          }}/>
          <div style={{fontFamily:C.mono,fontSize:10.5,color:active>i?C.textMid:C.muted}}>{label}</div>
          {active>i+1&&<div style={{marginLeft:"auto",fontSize:9,color:C.cyan}}>✓</div>}
        </div>
      ))}
    </div>
  );
}
 
// ─── NAV CONFIG ───────────────────────────────────────────────────
const NAV = [
  {id:"shop-spy",         label:"Shop Spy",        ico:(c)=>I.scan(c), on:true},
  {id:"keyword-research", label:"Keyword Research", ico:(c)=>I.key(c),  on:true},
  {id:"ai-action-plan",   label:"AI Action Plan",  ico:(c)=>I.bolt(c), on:false},
];
 
// ─── STRATEGY → SIGNALS ───────────────────────────────────────────
const buildSignals = (strategy, difficultyScore, averageRating) => {
  const signals = [];
  if(strategy==="Premium-heavy") {
    signals.push({type:"PRICING EDGE",title:"Premium market detected",desc:"High-end listings dominate. Enter at value, not volume.",color:C.cyan,ring:0.82,pulse:false});
    signals.push({type:"OPPORTUNITY SIGNAL",title:"Value positioning available",desc:"Price above median to capture premium positioning.",color:C.green,ring:0.65,pulse:true});
  } else if(strategy==="Race to bottom") {
    signals.push({type:"SATURATION RISK",title:"Price war detected",desc:"Thin margins. High competition. Proceed with caution.",color:C.red,ring:0.88,pulse:true});
    signals.push({type:"CAUTION",title:"Low pricing pressure",desc:"Avoid unless you have production cost advantage.",color:C.amber,ring:0.55,pulse:false});
  } else if(strategy==="Tight cluster") {
    signals.push({type:"COMPETITION HEAT",title:"Clustered pricing zone",desc:"Sellers converge on similar prices. Differentiate on product quality.",color:C.violet,ring:0.72,pulse:false});
    signals.push({type:"DEMAND PULSE",title:"Stable market demand",desc:"Consistent pricing suggests reliable buyer intent.",color:C.green,ring:0.60,pulse:true});
  } else {
    signals.push({type:"INTELLIGENCE",title:"Mixed signals detected",desc:"Market shows no dominant pricing strategy. Opportunity exists.",color:C.violet,ring:0.48,pulse:true});
  }
  return signals;
};
 
const diffSignal = (level) => {
  if(level==="Hard")   return {type:"SATURATION ALERT",title:"High competition keyword",desc:"Strong incumbents present. Differentiation required.",color:C.red,ring:0.9,pulse:true};
  if(level==="Medium") return {type:"COMPETITION HEAT",title:"Moderate competition",desc:"Winnable with strong listing quality and pricing strategy.",color:C.amber,ring:0.58,pulse:false};
  if(level==="Easy")   return {type:"OPPORTUNITY SIGNAL",title:"Low competition detected",desc:"Underserved demand. Optimal entry point identified.",color:C.green,ring:0.32,pulse:true};
  return null;
};
 
// ─── ROOT ─────────────────────────────────────────────────────────
export default function Dashboard() {
  const [active,setActive] = useState("shop-spy");
  const [email,setEmail]   = useState("");
  const [lo,setLo]         = useState(false);
 
  useEffect(()=>{
    createClient().auth.getUser().then(({data})=>setEmail(data?.user?.email||""));
  },[]);
 
  const logout = async()=>{
    setLo(true);
    await createClient().auth.signOut();
    window.location.href="/";
  };
 
  return (
    <>
      <style>{GLOBAL}</style>
      <div style={{display:"flex",height:"100vh",background:C.bg,color:C.text,fontFamily:C.font,overflow:"hidden"}}>
 
        {/* SIDEBAR */}
        <aside style={{width:200,flexShrink:0,background:C.s1,borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",height:"100vh"}}>
          <div style={{padding:"20px 16px 16px",borderBottom:`1px solid ${C.border}`}}>
            <Link href="/" style={{textDecoration:"none",display:"block"}}>
              <div style={{fontFamily:C.font,fontWeight:800,fontSize:16,letterSpacing:5,color:C.textHi,lineHeight:1}}>
                <span style={{color:C.cyan}}>EX</span>RAY
              </div>
              <div style={{fontSize:8.5,color:C.muted,letterSpacing:2.5,marginTop:4,fontWeight:700}}>INTELLIGENCE</div>
            </Link>
          </div>
 
          <nav style={{padding:"12px 9px",flex:1}}>
            <div style={{fontSize:8,letterSpacing:2.5,color:C.muted,fontWeight:700,padding:"0 8px",marginBottom:8}}>WORKSPACE</div>
            {NAV.map(({id,label,ico,on})=>{
              const isA=active===id;
              return (
                <button key={id} onClick={()=>on&&setActive(id)} disabled={!on}
                  className={`nb${isA?" on":""}`}
                  style={{
                    display:"flex",alignItems:"center",gap:9,
                    width:"100%",padding:"8px 10px",marginBottom:2,
                    borderRadius:6,border:"1px solid transparent",
                    background:"transparent",
                    color:isA?C.textHi:on?C.text:C.muted,
                    fontSize:12.5,fontWeight:isA?500:400,fontFamily:C.font,
                    textAlign:"left",opacity:on?1:0.3,
                  }}>
                  {ico(isA?C.cyan:on?`rgba(91,200,232,0.3)`:C.muted)}
                  <span style={{flex:1}}>{label}</span>
                  {!on&&<span style={{fontSize:7.5,color:C.muted,letterSpacing:1.5,fontWeight:700}}>SOON</span>}
                </button>
              );
            })}
          </nav>
 
          <div style={{padding:"12px 12px 16px",borderTop:`1px solid ${C.border}`}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <div style={{
                width:24,height:24,borderRadius:"50%",flexShrink:0,
                background:C.cyanFaint,border:`1px solid ${C.borderA}`,
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:9.5,fontWeight:700,color:C.cyan,fontFamily:C.mono,
              }}>{email?email[0].toUpperCase():"?"}</div>
              <div style={{fontSize:10.5,color:C.textMid,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1}}>{email}</div>
            </div>
            <button onClick={logout} disabled={lo} className="nb"
              style={{width:"100%",padding:"6px",borderRadius:5,border:`1px solid ${C.border}`,background:"transparent",color:C.muted,fontSize:10.5,cursor:"pointer",fontFamily:C.font}}>
              {lo?"Signing out…":"Sign out"}
            </button>
          </div>
        </aside>
 
        {/* MAIN */}
        <main style={{flex:1,overflowY:"auto",background:C.bg}}>
          {active==="shop-spy"         && <ShopSpy/>}
          {active==="keyword-research" && <KeywordResearch/>}
        </main>
      </div>
    </>
  );
}
 
// ─── SHARED HEADER ────────────────────────────────────────────────
function WHeader({tag,title,desc}) {
  return (
    <div style={{marginBottom:28}}>
      {tag&&<div style={{fontSize:8.5,letterSpacing:2.5,color:C.cyanDim,fontWeight:700,marginBottom:8}}>{tag}</div>}
      <h1 style={{fontFamily:C.font,fontWeight:800,fontSize:24,color:C.textHi,letterSpacing:-0.4,lineHeight:1.1,marginBottom:6}}>{title}</h1>
      <p style={{fontSize:13,color:C.text,lineHeight:1.7}}>{desc}</p>
    </div>
  );
}
 
function WSearch({value,onChange,placeholder,loading,label,onSubmit}) {
  return (
    <form onSubmit={onSubmit} style={{marginBottom:24}}>
      <div style={{display:"flex",gap:8}}>
        <input type="text" value={value} onChange={onChange} placeholder={placeholder} disabled={loading}
          style={{flex:1,background:C.s1,border:`1px solid ${C.border}`,borderRadius:6,padding:"10px 14px",color:C.textHi,fontSize:13.5,fontFamily:C.font,transition:"border-color .15s,box-shadow .15s"}}
        />
        <button type="submit" disabled={loading} className="sub-b"
          style={{padding:"10px 20px",borderRadius:6,border:`1px solid ${C.borderA}`,background:C.cyanFaint,color:C.cyan,fontSize:13,fontWeight:600,fontFamily:C.font,cursor:loading?"not-allowed":"pointer",display:"flex",alignItems:"center",gap:7,opacity:loading?0.6:1,whiteSpace:"nowrap"}}>
          {loading&&<Spin/>}{loading?`${label}ing…`:label}
        </button>
      </div>
    </form>
  );
}
 
function WErr({msg}) {
  return <div style={{background:"rgba(217,95,82,0.05)",border:"1px solid rgba(217,95,82,0.16)",borderRadius:7,padding:"11px 16px",color:"#E89A94",fontSize:12.5,marginBottom:16}}>{msg}</div>;
}
 
function WEmpty({icon,title,sub}) {
  return (
    <div style={{marginTop:12,border:`1px dashed ${C.border}`,borderRadius:10,padding:"64px 24px",textAlign:"center"}}>
      <div style={{fontSize:24,marginBottom:12,opacity:0.15}}>{icon}</div>
      <div style={{fontSize:13.5,color:C.textMid,fontWeight:500,marginBottom:5}}>{title}</div>
      <div style={{fontSize:12,color:C.muted}}>{sub}</div>
    </div>
  );
}
 
// ─── SHOP SPY ─────────────────────────────────────────────────────
function ShopSpy() {
  const [shop,setShop]   = useState("");
  const [load,setLoad]   = useState(false);
  const [data,setData]   = useState(null);
  const [err,setErr]     = useState("");
  const [phase,setPhase] = useState(0);
 
  const search = async e => {
    e.preventDefault();
    if(!shop.trim()) return;
    setLoad(true); setErr(""); setData(null); setPhase(0);
    [1,2,3].forEach((p,i)=>setTimeout(()=>setPhase(p),(i+1)*500));
    try {
      const res=await fetch("/api/etsy/shop?shopname="+encodeURIComponent(shop));
      const json=await res.json();
      if(!res.ok) setErr(json.error||"Something went wrong");
      else setData(json);
    } catch{ setErr("Network error. Please try again."); }
    finally{ setLoad(false); setPhase(0); }
  };
 
  const signals = data?.pricingAnalysis?.strategy ? buildSignals(data.pricingAnalysis.strategy) : [];
 
  return (
    <div style={{maxWidth:800,margin:"0 auto",padding:"36px 40px",width:"100%"}}>
      <WHeader tag="SHOP INTELLIGENCE" title="Shop Spy" desc="Decode any Etsy competitor — pricing strategy, listing intelligence, market position."/>
      <WSearch value={shop} onChange={e=>setShop(e.target.value)} placeholder="Shop name or Etsy URL…" loading={load} label="Scan" onSubmit={search}/>
 
      <ScanAnimation phases={["Locating shop listings","Extracting pricing data","Building intelligence signals"]} active={phase} done={!!data}/>
 
      {err&&<WErr msg={err}/>}
 
      {data&&!load&&(
        <div className="ex-fade">
          {/* Shop header */}
          <div className="sig-card" style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:10,padding:"20px 22px",marginBottom:12}}>
            <div style={{fontSize:8.5,letterSpacing:2.5,color:C.cyanDim,fontWeight:700,marginBottom:12}}>INTELLIGENCE TARGET</div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:16}}>
              <div>
                <div style={{fontFamily:C.font,fontWeight:800,fontSize:20,color:C.textHi,letterSpacing:-0.3,marginBottom:8}}>{data.shopName}</div>
                <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
                  {[
                    {v:data.totalFound,l:"listings",c:C.cyan},
                    ...(data.shopReviews?[{v:data.shopReviews?.toLocaleString(),l:"reviews",c:C.textHi}]:[]),
                    ...(data.shopRating?[{v:`${data.shopRating}★`,l:"rating",c:C.amber}]:[]),
                  ].map((s,i)=>(
                    <div key={i}>
                      <div style={{fontFamily:C.mono,fontSize:17,fontWeight:700,color:s.c,letterSpacing:-0.5,lineHeight:1}}>{s.v}</div>
                      <div style={{fontSize:9.5,color:C.muted,marginTop:3}}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <a href={data.shopUrl} target="_blank" rel="noopener noreferrer" className="ext-lnk"
                style={{padding:"7px 14px",border:`1px solid ${C.border}`,borderRadius:6,color:C.text,textDecoration:"none",fontSize:11.5,fontWeight:500,display:"flex",alignItems:"center",gap:5,flexShrink:0,transition:"all .15s"}}>
                Open {I.arr()}
              </a>
            </div>
          </div>
 
          {/* Signal rings row */}
          {signals.length>0&&(
            <div style={{display:"grid",gridTemplateColumns:`repeat(${signals.length},1fr)`,gap:10,marginBottom:12}}>
              {signals.map((s,i)=><SignalCard key={i} signal={s} delay={i*80}/>)}
            </div>
          )}
 
          <PricingPanel analysis={data.pricingAnalysis}/>
          <ListingsPanel listings={Array.isArray(data.listings)?data.listings:[]}/>
        </div>
      )}
 
      {!data&&!load&&!err&&<WEmpty icon="⬡" title="No shop scanned yet" sub="Enter a shop name or Etsy URL to begin"/>}
    </div>
  );
}
 
// ─── KEYWORD RESEARCH ─────────────────────────────────────────────
function KeywordResearch() {
  const [kw,setKw]       = useState("");
  const [load,setLoad]   = useState(false);
  const [data,setData]   = useState(null);
  const [err,setErr]     = useState("");
  const [phase,setPhase] = useState(0);
 
  const search = async e => {
    e.preventDefault();
    if(!kw.trim()) return;
    setLoad(true); setErr(""); setData(null); setPhase(0);
    [1,2,3].forEach((p,i)=>setTimeout(()=>setPhase(p),(i+1)*500));
    try {
      const res=await fetch("/api/etsy/keywords?keyword="+encodeURIComponent(kw));
      const json=await res.json();
      if(!res.ok) setErr(json.error||"Something went wrong");
      else setData(json);
    } catch{ setErr("Network error. Please try again."); }
    finally{ setLoad(false); setPhase(0); }
  };
 
  const pricingSignals = data?.pricingAnalysis?.strategy ? buildSignals(data.pricingAnalysis.strategy) : [];
  const dSig = data?.difficultyScore ? diffSignal(data.difficultyScore) : null;
  const allSignals = [...(dSig?[dSig]:[]),...pricingSignals].slice(0,3);
 
  return (
    <div style={{maxWidth:800,margin:"0 auto",padding:"36px 40px",width:"100%"}}>
      <WHeader tag="KEYWORD INTELLIGENCE" title="Keyword Research" desc="Surface competition density, pricing structure, and difficulty score for any Etsy keyword."/>
      <WSearch value={kw} onChange={e=>setKw(e.target.value)} placeholder="Enter a keyword…" loading={load} label="Research" onSubmit={search}/>
 
      <ScanAnimation phases={["Scanning top listings","Extracting pricing signals","Calculating difficulty score"]} active={phase} done={!!data}/>
 
      {err&&<WErr msg={err}/>}
 
      {data&&!load&&(
        <div className="ex-fade">
          {/* Stat overview */}
          <div className="sig-card" style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:10,padding:"20px 22px",marginBottom:12}}>
            <div style={{fontSize:8.5,letterSpacing:2.5,color:C.cyanDim,fontWeight:700,marginBottom:14}}>KEYWORD OVERVIEW</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
              {[
                {label:"AVG PRICE",  val:data.averagePrice?`$${data.averagePrice}`:"—", color:C.textHi},
                {label:"AVG RATING", val:data.averageRating?`${data.averageRating}★`:"—", color:C.amber},
                {label:"RESULTS",    val:data.totalFound??"—", color:C.textHi},
                {label:"DIFFICULTY", val:data.difficultyScore||"—",
                  color:{Hard:C.red,Medium:C.amber,Easy:C.green}[data.difficultyScore]||C.textHi},
              ].map((s,i)=>(
                <div key={i} style={{background:C.s2,border:`1px solid ${C.border}`,borderRadius:7,padding:"13px 14px"}}>
                  <div style={{fontSize:7.5,letterSpacing:2,color:C.muted,fontWeight:700,marginBottom:7}}>{s.label}</div>
                  <div style={{fontFamily:C.mono,fontSize:18,fontWeight:700,color:s.color,letterSpacing:-0.5,lineHeight:1}}>{s.val}</div>
                </div>
              ))}
            </div>
          </div>
 
          {/* Intelligence signals */}
          {allSignals.length>0&&(
            <div style={{display:"grid",gridTemplateColumns:`repeat(${allSignals.length},1fr)`,gap:10,marginBottom:12}}>
              {allSignals.map((s,i)=><SignalCard key={i} signal={s} delay={i*80}/>)}
            </div>
          )}
 
          <PricingPanel analysis={data.pricingAnalysis}/>
          <ListingsPanel listings={Array.isArray(data.listings)?data.listings:[]} keyword={data.keyword}/>
        </div>
      )}
 
      {!data&&!load&&!err&&<WEmpty icon="◈" title="No keyword analyzed yet" sub="Enter a keyword to surface market intelligence"/>}
    </div>
  );
}
