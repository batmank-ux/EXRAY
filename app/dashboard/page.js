"use client";
// app/dashboard/page.js — EXRAY Dashboard v9
// Mobile-first layout: bottom tab bar on mobile, sidebar on desktop
 
import { useEffect, useState } from "react";
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
  amber:     "#F5C842",
  red:       "#E06055",
  violet:    "#9B7FE0",
  font:      "'DM Sans', system-ui, sans-serif",
  mono:      "'JetBrains Mono', monospace",
};
 
const G = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; }
  body { background: #04070B; margin: 0; -webkit-font-smoothing: antialiased; overflow: hidden; }
  a { text-decoration: none; color: inherit; }
 
  @keyframes exSpin  { to { transform: rotate(360deg); } }
  @keyframes exFade  { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
  @keyframes exPulse { 0%,100%{opacity:1} 50%{opacity:0.15} }
  @keyframes exBlink { 0%,90%,100%{opacity:0.4} 45%{opacity:1} }
  .ex-fade { animation: exFade .4s ease forwards; }
 
  /* Desktop sidebar layout */
  .layout { display: flex; height: 100vh; height: 100dvh; }
  .sidebar { width: 216px; flex-shrink: 0; background: #070D14; border-right: 1px solid rgba(125,211,240,0.09); display: flex; flex-direction: column; height: 100vh; height: 100dvh; overflow-y: auto; }
  .right-col { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
  .top-header { height: 52px; flex-shrink: 0; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; background: #070D14; border-bottom: 1px solid rgba(125,211,240,0.09); }
  .main-content { flex: 1; overflow-y: auto; background: #04070B; }
  .bottom-nav { display: none; }
 
  /* Mobile layout */
  @media (max-width: 680px) {
    body { overflow: hidden; }
    .layout { flex-direction: column; }
    .sidebar { display: none; }
    .right-col { flex: 1; overflow: hidden; display: flex; flex-direction: column; }
    .top-header { height: 52px; padding: 0 16px; }
    .main-content { flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch; padding-bottom: 80px; }
    .bottom-nav {
      display: flex; align-items: center; justify-content: space-around;
      height: 64px; flex-shrink: 0;
      background: #070D14;
      border-top: 1px solid rgba(125,211,240,0.09);
      position: fixed; bottom: 0; left: 0; right: 0;
      padding-bottom: env(safe-area-inset-bottom);
      z-index: 100;
    }
    .mobile-content-pad { padding: 20px 16px; }
  }
 
  /* Interactions */
  .nb { transition: background .15s, border-color .15s, color .15s; cursor: pointer; }
  .nb:hover { background: rgba(125,211,240,0.06) !important; color: #EAF4FA !important; }
  .nb.on { background: rgba(125,211,240,0.1) !important; border-color: rgba(125,211,240,0.24) !important; color: #EAF4FA !important; }
  .sig-card { transition: border-color .2s, transform .18s; }
  .sig-card:hover { border-color: rgba(125,211,240,0.2) !important; }
  .row-h:hover { background: rgba(125,211,240,0.03) !important; }
  .ext-lnk { transition: all .15s; }
  .ext-lnk:hover { border-color: #7DD3F0 !important; color: #7DD3F0 !important; }
  .sub-b { transition: all .15s; }
  .sub-b:hover:not(:disabled) { background: rgba(125,211,240,0.1) !important; border-color: rgba(125,211,240,0.35) !important; }
  .stat-card { transition: border-color .2s, transform .15s; }
  .insight-card { transition: border-color .2s, background .15s; }
  .insight-card:hover { border-color: rgba(125,211,240,0.16) !important; background: rgba(125,211,240,0.025) !important; }
  input:focus { outline: none !important; border-color: rgba(125,211,240,0.28) !important; box-shadow: 0 0 0 3px rgba(125,211,240,0.07) !important; }
  ::-webkit-scrollbar { width: 3px; height: 3px; }
  ::-webkit-scrollbar-thumb { background: rgba(125,211,240,0.14); border-radius: 4px; }
 
  /* Mobile nav tab button */
  .tab-btn { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 8px 20px; background: transparent; border: none; cursor: pointer; transition: all .15s; flex: 1; }
  .tab-btn .tab-label { font-size: 10px; font-weight: 500; color: #3D5668; letter-spacing: 0.3px; font-family: 'DM Sans', sans-serif; }
  .tab-btn.active .tab-label { color: #7DD3F0; }
  .tab-btn.disabled { opacity: 0.3; cursor: not-allowed; }
 
  /* Content area responsive */
  .content-inner { max-width: 900px; margin: 0 auto; padding: 24px 32px; }
  @media (max-width: 680px) { .content-inner { padding: 20px 16px; } }
  @media (max-width: 400px) { .content-inner { padding: 16px 12px; } }
`;
 
// ─── ICONS ────────────────────────────────────────────────────────
const IcoScan = (c="#546A7A",s=15) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7V5a2 2 0 012-2h2"/><path d="M17 3h2a2 2 0 012 2v2"/>
    <path d="M21 17v2a2 2 0 01-2 2h-2"/><path d="M7 21H5a2 2 0 01-2-2v-2"/>
    <line x1="7" y1="12" x2="17" y2="12"/>
  </svg>
);
const IcoKey = (c="#546A7A",s=15) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>
  </svg>
);
const IcoBolt = (c="#546A7A",s=15) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
);
const IcoArr = (c="rgba(125,211,240,0.5)",s=11) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7"/><path d="M7 7h10v10"/>
  </svg>
);
const Spin = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" style={{animation:"exSpin .7s linear infinite",flexShrink:0}}>
    <circle cx="12" cy="12" r="10" stroke="rgba(125,211,240,0.2)" strokeWidth="3"/>
    <path fill="#7DD3F0" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
  </svg>
);
 
// ─── SIGNAL RING ──────────────────────────────────────────────────
function SignalRing({value=0,color="#7DD3F0",size=60,pulse=false}) {
  const r=size/2-5, circ=2*Math.PI*r, off=circ*(1-Math.min(1,value));
  const gid="sr"+Math.round(value*100)+color.replace(/\W/g,"").slice(0,8);
  return (
    <div style={{position:"relative",width:size,height:size,flexShrink:0}}>
      <svg width={size} height={size} style={{position:"absolute",inset:0,opacity:0.12}}>
        <circle cx={size/2} cy={size/2} r={r+2} fill="none" stroke={color} strokeWidth={0.5}/>
      </svg>
      <svg width={size} height={size} style={{position:"absolute",inset:0}}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={1.5} opacity={0.1}/>
      </svg>
      <svg width={size} height={size} style={{position:"absolute",inset:0,transform:"rotate(-90deg)"}}>
        <defs>
          <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.4"/>
            <stop offset="100%" stopColor={color} stopOpacity="1"/>
          </linearGradient>
        </defs>
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke={"url(#"+gid+")"} strokeWidth={2.5} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={off}
          style={{transition:"stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1)",...(pulse?{animation:"exPulse 3s ease-in-out infinite"}:{})}}
        />
      </svg>
      <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div style={{width:7,height:7,borderRadius:"50%",background:color,boxShadow:"0 0 12px 3px "+color,opacity:0.9,...(pulse?{animation:"exBlink 3s ease-in-out infinite"}:{})}}/>
      </div>
    </div>
  );
}
 
// ─── SIGNAL CARD ──────────────────────────────────────────────────
function SignalCard({signal,delay=0}) {
  const [v,setV]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setV(true),delay);return()=>clearTimeout(t);},[delay]);
  if(!v) return <div style={{height:96}}/>;
  return (
    <div className="sig-card ex-fade" style={{background:C.s1,border:"1px solid "+C.border,borderRadius:10,padding:"16px 18px"}}>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12}}>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:8.5,letterSpacing:2.5,color:signal.color,fontWeight:700,marginBottom:8,opacity:0.9}}>{signal.type}</div>
          <div style={{fontSize:13.5,fontWeight:700,color:C.textHi,lineHeight:1.3,marginBottom:6}}>{signal.title}</div>
          <div style={{fontSize:12,color:C.text,lineHeight:1.6}}>{signal.desc}</div>
        </div>
        <SignalRing value={signal.ring} color={signal.color} size={60} pulse={signal.pulse}/>
      </div>
    </div>
  );
}
 
// ─── HELPERS ──────────────────────────────────────────────────────
const stratMeta = s => ({
  "Premium-heavy":  {color:C.cyan,  bg:"rgba(125,211,240,0.08)", border:"rgba(125,211,240,0.22)"},
  "Race to bottom": {color:C.red,   bg:"rgba(224,96,85,0.08)",   border:"rgba(224,96,85,0.24)"},
  "Tight cluster":  {color:C.green, bg:"rgba(61,201,138,0.08)",  border:"rgba(61,201,138,0.24)"},
}[s]||{color:C.textMid,bg:C.s2,border:C.border});
 
const buildSignals = s => ({
  "Premium-heavy":  [
    {type:"PRICING EDGE",       title:"Premium market detected",  desc:"High-end listings dominate. Enter at value, not volume.",        color:C.cyan,  ring:0.82,pulse:false},
    {type:"OPPORTUNITY SIGNAL", title:"Value positioning open",   desc:"Price above median to capture the premium tier.",               color:C.green, ring:0.65,pulse:true},
  ],
  "Race to bottom": [
    {type:"SATURATION RISK",    title:"Price war detected",       desc:"Thin margins. High competition. Proceed with caution.",         color:C.red,   ring:0.88,pulse:true},
    {type:"CAUTION",            title:"Low pricing pressure",     desc:"Avoid unless you have a clear production cost advantage.",      color:C.amber, ring:0.55,pulse:false},
  ],
  "Tight cluster":  [
    {type:"COMPETITION HEAT",   title:"Clustered pricing zone",   desc:"Sellers converge on similar prices. Differentiate on product.", color:C.violet,ring:0.72,pulse:false},
    {type:"DEMAND PULSE",       title:"Stable market demand",     desc:"Consistent pricing signals reliable buyer intent.",             color:C.green, ring:0.60,pulse:true},
  ],
}[s]||[{type:"INTELLIGENCE",title:"Mixed signals detected",desc:"No dominant pricing strategy. Opportunity may exist.",color:C.violet,ring:0.48,pulse:true}]);
 
const diffSignal = d => ({
  Hard:   {type:"SATURATION ALERT",  title:"High competition keyword",  desc:"Strong incumbents. Build reviews before targeting.",     color:C.red,   ring:0.9, pulse:true},
  Medium: {type:"COMPETITION HEAT",  title:"Moderate competition",      desc:"Winnable with strong listing quality and right pricing.", color:C.amber, ring:0.58,pulse:false},
  Easy:   {type:"OPPORTUNITY SIGNAL",title:"Low competition detected",  desc:"Underserved demand. Optimal entry point.",               color:C.green, ring:0.3, pulse:true},
}[d]||null);
 
const buildInsights = (data, type) => {
  const ins = [];
  if(type==="shop") {
    const pa=data.pricingAnalysis;
    if(pa){
      const med=parseFloat(pa.median)||0,avg=parseFloat(pa.average)||0;
      if(avg>med*1.3)      ins.push({icon:"💰",color:C.cyan, title:"Pricing Opportunity",   desc:"Avg price above median. High-end listings pulling market up.",link:"Pricing edge"});
      else if(avg<med*0.9) ins.push({icon:"⚠️",color:C.amber,title:"Race to Bottom Risk",   desc:"Avg price pulled down by low-price sellers.",               link:"Caution advised"});
      else                 ins.push({icon:"📊",color:C.green,title:"Stable Pricing",        desc:"Prices tightly clustered. Consistent buyer willingness.",    link:"Tight cluster"});
      ins.push({icon:"🎯",color:C.violet,title:"Optimal Entry",desc:"Enter between $"+pa.min+" and $"+pa.median+" to test demand.",link:"View pricing"});
    }
    if(data.shopRating&&parseFloat(data.shopRating)>=4.8)
      ins.push({icon:"⭐",color:C.amber,title:"High-Rated Competitor",desc:data.shopRating+" stars. Study their product quality closely.",link:"View listings"});
  }
  if(type==="keyword"){
    const pa=data.pricingAnalysis,diff=data.difficultyScore;
    if(diff==="Easy")      ins.push({icon:"🟢",color:C.green,title:"Entry Opportunity",       desc:"Low competition. Underserved demand detected.",           link:"Opportunity"});
    else if(diff==="Hard") ins.push({icon:"🔴",color:C.red,  title:"High Competition",        desc:"Build reviews first before targeting this keyword.",      link:"Saturation risk"});
    else                   ins.push({icon:"🟡",color:C.amber,title:"Moderate Competition",    desc:"Winnable with strong listing and competitive pricing.",   link:"Medium difficulty"});
    if(pa){
      ins.push({icon:"💡",color:C.cyan,title:"Smart Price Entry",desc:"Enter $"+pa.min+"–$"+pa.median+" to avoid race-to-bottom.",link:"Pricing signal"});
      const sd=pa.strategy==="Premium-heavy"?"Enter at value.":pa.strategy==="Race to bottom"?"Thin margins ahead.":"Differentiate on quality.";
      ins.push({icon:"📈",color:C.violet,title:pa.strategy,desc:sd,link:"Pricing breakdown"});
    }
    if(data.averageRating) ins.push({icon:"⭐",color:C.amber,title:"Review Bar",desc:data.averageRating+" stars avg. Strong reviews needed.",link:"Top listings"});
  }
  return ins.slice(0,4);
};
 
// ─── SCAN BAR ─────────────────────────────────────────────────────
function ScanBar({phases,phase,done}) {
  if(!phase&&!done) return null;
  return (
    <div className="ex-fade" style={{background:"rgba(125,211,240,0.04)",border:"1px solid rgba(125,211,240,0.28)",borderRadius:9,padding:"16px 20px",marginBottom:14}}>
      <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:13}}>
        <div style={{width:7,height:7,borderRadius:"50%",background:C.cyan,boxShadow:"0 0 10px 2px "+C.cyan,animation:"exPulse 1s infinite"}}/>
        <div style={{fontSize:9.5,letterSpacing:2.5,color:C.cyan,fontWeight:700}}>X-RAY SCAN ACTIVE</div>
      </div>
      {phases.map((label,i)=>(
        <div key={i} style={{display:"flex",alignItems:"center",gap:9,marginBottom:i<phases.length-1?9:0,opacity:phase>i?1:0.22,transition:"opacity .3s"}}>
          <div style={{width:5,height:5,borderRadius:"50%",flexShrink:0,background:phase>i?C.cyan:C.muted,...(phase>i?{boxShadow:"0 0 5px "+C.cyan}:{}),...(phase===i+1&&!done?{animation:"exBlink 1s infinite"}:{})}}/>
          <div style={{fontFamily:C.mono,fontSize:11.5,color:phase>i?C.textHi:"rgba(184,205,216,0.3)",fontWeight:phase>i?500:400}}>{label}</div>
          {phase>i+1&&<div style={{marginLeft:"auto",fontSize:10,color:C.green,fontWeight:700}}>✓</div>}
        </div>
      ))}
    </div>
  );
}
 
// ─── PRICING PANEL ────────────────────────────────────────────────
function PricingPanel({analysis}) {
  if(!analysis) return null;
  const sm=stratMeta(analysis.strategy);
  const min=parseFloat(analysis.min)||0,max=parseFloat(analysis.max)||1,med=parseFloat(analysis.median)||0;
  const pct=v=>Math.min(95,Math.max(5,((v-min)/(max-min))*100));
  return (
    <div className="sig-card" style={{background:C.s1,border:"1px solid "+C.border,borderRadius:10,padding:"16px 18px",marginBottom:12}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,flexWrap:"wrap",gap:8}}>
        <div>
          <div style={{fontSize:8.5,letterSpacing:2.5,color:C.cyanDim,fontWeight:700,marginBottom:4}}>PRICING SIGNAL</div>
          <div style={{fontSize:13.5,fontWeight:700,color:C.textHi}}>Market Pricing Structure</div>
        </div>
        <span style={{fontSize:10.5,fontWeight:700,letterSpacing:0.5,padding:"4px 12px",borderRadius:99,background:sm.bg,border:"1px solid "+sm.border,color:sm.color}}>{analysis.strategy||"Mixed"}</span>
      </div>
      <div style={{marginBottom:14}}>
        <div style={{height:3,background:C.border,borderRadius:2,position:"relative",marginBottom:6}}>
          <div style={{position:"absolute",left:0,top:0,height:"100%",width:"100%",borderRadius:2,background:"linear-gradient(90deg,"+C.green+"30,"+C.cyan+"60,"+C.amber+"90)",opacity:0.3}}/>
          <div style={{position:"absolute",top:-5,left:pct(med)+"%",transform:"translateX(-50%)",width:2,height:13,background:C.cyan,borderRadius:1,boxShadow:"0 0 8px 2px "+C.cyan}}/>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:C.muted,fontFamily:C.mono}}>
          <span>${analysis.min}</span>
          <span style={{color:C.cyan,fontWeight:600}}>median ${analysis.median}</span>
          <span>${analysis.max}</span>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginBottom:8}}>
        {[
          {label:"FLOOR",  val:"$"+analysis.min,    color:C.textMid},
          {label:"MEDIAN", val:"$"+analysis.median,  color:C.cyan},
          {label:"AVG",    val:"$"+analysis.average, color:C.textMid},
          {label:"TOP",    val:"$"+analysis.max,     color:C.textHi},
        ].map((p,i)=>(
          <div key={i} style={{background:C.s2,border:"1px solid "+C.border,borderRadius:6,padding:"10px 10px"}}>
            <div style={{fontSize:7.5,letterSpacing:1.5,color:C.muted,fontWeight:700,marginBottom:5}}>{p.label}</div>
            <div style={{fontFamily:C.mono,fontSize:13,fontWeight:700,color:p.color,letterSpacing:-0.3}}>{p.val}</div>
          </div>
        ))}
      </div>
      <div style={{fontSize:10.5,color:C.muted}}>Based on {analysis.dataPoints} listings with visible prices</div>
    </div>
  );
}
 
// ─── LISTINGS PANEL ───────────────────────────────────────────────
function ListingsPanel({listings,keyword}) {
  if(!listings?.length) return null;
  return (
    <div className="sig-card" style={{background:C.s1,border:"1px solid "+C.border,borderRadius:10,overflow:"hidden",marginBottom:12}}>
      <div style={{padding:"12px 18px",borderBottom:"1px solid "+C.border,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div>
          <div style={{fontSize:8.5,letterSpacing:2.5,color:C.cyanDim,fontWeight:700,marginBottom:3}}>TOP LISTINGS</div>
          <div style={{fontSize:13.5,fontWeight:700,color:C.textHi}}>{keyword?`"${keyword}"`:"Top Visible Listings"}</div>
        </div>
        <div style={{fontSize:10.5,color:C.muted,fontFamily:C.mono}}>{listings.length} found</div>
      </div>
      {listings.map((item,i)=>(
        <div key={i} className="row-h" style={{display:"flex",alignItems:"center",gap:10,padding:"11px 18px",borderBottom:i<listings.length-1?"1px solid "+C.border:"none",transition:"background .1s"}}>
          <div style={{width:20,height:20,borderRadius:4,flexShrink:0,background:C.s2,border:"1px solid "+C.border,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:C.mono,fontSize:8.5,color:C.muted,fontWeight:600}}>{String(i+1).padStart(2,"0")}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:12.5,color:C.textMid,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.title}</div>
            <div style={{fontFamily:C.mono,fontSize:11,color:item.price?C.cyan:C.muted,marginTop:2,opacity:item.price?0.85:1}}>{item.price||"—"}</div>
          </div>
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="ext-lnk"
            style={{flexShrink:0,padding:"5px 10px",borderRadius:5,border:"1px solid "+C.border,color:C.textMid,fontSize:11,fontWeight:500,textDecoration:"none",display:"flex",alignItems:"center",gap:4}}>
            View {IcoArr()}
          </a>
        </div>
      ))}
    </div>
  );
}
 
// ─── KEY INSIGHTS ─────────────────────────────────────────────────
function KeyInsights({insights}) {
  if(!insights?.length) return null;
  const cols = insights.length <= 2 ? insights.length : 2;
  return (
    <div style={{background:C.s1,border:"1px solid "+C.border,borderRadius:10,overflow:"hidden",marginBottom:12}}>
      <div style={{padding:"12px 18px",borderBottom:"1px solid "+C.border,display:"flex",alignItems:"center",gap:7}}>
        <span style={{color:C.cyan,fontSize:14}}>✦</span>
        <div style={{fontSize:13,fontWeight:700,color:C.textHi}}>Key Insights</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat("+cols+",1fr)"}}>
        {insights.map((ins,i)=>(
          <div key={i} className="insight-card" style={{
            padding:"16px 18px",
            borderRight:i%cols<cols-1?"1px solid "+C.border:"none",
            borderBottom:i<insights.length-cols?"1px solid "+C.border:"none",
            cursor:"default",
          }}>
            <div style={{fontSize:20,marginBottom:8}}>{ins.icon}</div>
            <div style={{fontSize:12.5,fontWeight:700,color:C.textHi,marginBottom:5,lineHeight:1.3}}>{ins.title}</div>
            <div style={{fontSize:11.5,color:C.text,lineHeight:1.65,marginBottom:10}}>{ins.desc}</div>
            <div style={{fontSize:10.5,color:ins.color,fontWeight:700}}>{ins.link}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
 
// ─── NAV ──────────────────────────────────────────────────────────
const NAV = [
  {id:"shop-spy",         label:"Shop Spy",        ico:IcoScan, on:true},
  {id:"keyword-research", label:"Keyword Research", ico:IcoKey,  on:true},
  {id:"ai-action-plan",   label:"AI Action Plan",  ico:IcoBolt, on:false},
];
 
// ─── ROOT ─────────────────────────────────────────────────────────
export default function Dashboard() {
  const [active,setActive]=useState("shop-spy");
  const [email,setEmail]=useState("");
  const [lo,setLo]=useState(false);
  useEffect(()=>{createClient().auth.getUser().then(({data})=>setEmail(data?.user?.email||""));},[]);
  const logout=async()=>{setLo(true);await createClient().auth.signOut();window.location.href="/";};
  const activeNav=NAV.find(n=>n.id===active);
 
  return (
    <>
      <style>{G}</style>
      <div className="layout">
 
        {/* ── DESKTOP SIDEBAR ── */}
        <aside className="sidebar">
          <div style={{padding:"20px 18px 16px",borderBottom:"1px solid "+C.border}}>
            <Link href="/" style={{textDecoration:"none",display:"block"}}>
              <div style={{fontFamily:C.font,fontWeight:800,fontSize:18,letterSpacing:5,color:C.textHi,lineHeight:1}}>
                <span style={{color:C.cyan}}>EX</span>RAY
              </div>
              <div style={{fontSize:8.5,color:C.muted,letterSpacing:2.5,marginTop:5,fontWeight:700}}>ETSY INTELLIGENCE</div>
            </Link>
          </div>
 
          <div style={{padding:"14px 10px 10px"}}>
            <div style={{fontSize:8,letterSpacing:2.5,color:C.muted,fontWeight:700,padding:"0 8px",marginBottom:9}}>WORKSPACE</div>
            {NAV.map(({id,label,ico,on})=>{
              const isA=active===id;
              return (
                <button key={id} onClick={()=>on&&setActive(id)} disabled={!on}
                  className={"nb"+(isA?" on":"")}
                  style={{display:"flex",alignItems:"center",gap:9,width:"100%",padding:"10px 10px",marginBottom:3,borderRadius:7,border:"1px solid transparent",background:"transparent",color:isA?C.textHi:on?C.textMid:C.muted,fontSize:13,fontWeight:isA?600:400,fontFamily:C.font,textAlign:"left",opacity:on?1:0.35}}>
                  {ico(isA?C.cyan:on?C.cyanDim:C.muted)}
                  <span style={{flex:1}}>{label}</span>
                  {!on&&<span style={{fontSize:7.5,color:C.muted,letterSpacing:1.5,fontWeight:700,background:"rgba(255,255,255,0.05)",padding:"2px 6px",borderRadius:3}}>SOON</span>}
                </button>
              );
            })}
          </div>
 
          <div style={{margin:"8px 10px 10px",background:C.s2,border:"1px solid "+C.border,borderRadius:9,padding:"14px 14px"}}>
            <div style={{fontSize:8,letterSpacing:2.5,color:C.cyanDim,fontWeight:700,marginBottom:12}}>SIGNAL LEGEND</div>
            {[
              {color:C.cyan,  label:"Opportunity"},
              {color:C.green, label:"Pricing Edge"},
              {color:C.amber, label:"Caution"},
              {color:C.red,   label:"Saturation Risk"},
              {color:C.violet,label:"Intelligence"},
            ].map((s,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:9,marginBottom:i<4?9:0}}>
                <div style={{width:9,height:9,borderRadius:"50%",background:s.color,boxShadow:"0 0 8px 2px "+s.color,flexShrink:0}}/>
                <span style={{fontSize:12,color:C.textHi,fontWeight:500}}>{s.label}</span>
              </div>
            ))}
          </div>
 
          <div style={{flex:1}}/>
 
          <div style={{padding:"12px 14px 18px",borderTop:"1px solid "+C.border}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <div style={{width:28,height:28,borderRadius:"50%",flexShrink:0,background:"rgba(125,211,240,0.1)",border:"1px solid "+C.borderA,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:C.cyan,fontFamily:C.mono}}>{email?email[0].toUpperCase():"?"}</div>
              <div style={{fontSize:11.5,color:C.textMid,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1}}>{email}</div>
            </div>
            <button onClick={logout} disabled={lo} className="nb"
              style={{width:"100%",padding:"7px",borderRadius:6,border:"1px solid "+C.border,background:"transparent",color:C.muted,fontSize:11.5,cursor:"pointer",fontFamily:C.font}}>
              {lo?"Signing out…":"Sign out"}
            </button>
          </div>
        </aside>
 
        {/* ── RIGHT ── */}
        <div className="right-col">
 
          {/* TOP HEADER */}
          <header className="top-header">
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              {/* Mobile logo */}
              <Link href="/" style={{textDecoration:"none",display:"none"}} className="mobile-logo">
                <span style={{fontFamily:C.font,fontWeight:800,fontSize:16,letterSpacing:4,color:C.textHi}}>
                  <span style={{color:C.cyan}}>EX</span>RAY
                </span>
              </Link>
              <h1 style={{fontFamily:C.font,fontWeight:700,fontSize:15,color:C.textHi,letterSpacing:-0.2}}>{activeNav?.label}</h1>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:C.green,boxShadow:"0 0 8px 2px "+C.green,animation:"exBlink 3s infinite"}}/>
              <span style={{fontSize:11,color:C.muted,fontFamily:C.mono}}>Live</span>
              {/* Mobile user avatar */}
              <div style={{
                width:26,height:26,borderRadius:"50%",
                background:"rgba(125,211,240,0.1)",border:"1px solid "+C.borderA,
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:10,fontWeight:700,color:C.cyan,fontFamily:C.mono,
                marginLeft:8,cursor:"pointer",
              }} onClick={logout}>
                {email?email[0].toUpperCase():"?"}
              </div>
            </div>
          </header>
 
          {/* MAIN CONTENT */}
          <main className="main-content">
            {active==="shop-spy"&&<ShopSpy/>}
            {active==="keyword-research"&&<KeywordResearch/>}
          </main>
 
          {/* ── MOBILE BOTTOM TAB BAR ── */}
          <nav className="bottom-nav">
            {NAV.map(({id,label,ico,on})=>{
              const isA=active===id;
              return (
                <button key={id}
                  onClick={()=>on&&setActive(id)}
                  className={"tab-btn"+(isA?" active":"")+(on?"":" disabled")}
                  disabled={!on}
                >
                  {ico(isA?C.cyan:C.muted,22)}
                  <span className="tab-label">{id==="keyword-research"?"Keywords":id==="ai-action-plan"?"AI Plan":label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
 
// ─── SHARED ───────────────────────────────────────────────────────
function WSearch({value,onChange,placeholder,loading,label,onSubmit,hint}) {
  return (
    <form onSubmit={onSubmit} style={{marginBottom:16}}>
      <div style={{background:C.s1,border:"1px solid "+C.border,borderRadius:10,padding:"12px 14px"}}>
        {hint&&<div style={{fontSize:10.5,color:C.muted,marginBottom:8,fontWeight:600}}>{hint}</div>}
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <input type="text" value={value} onChange={onChange} placeholder={placeholder} disabled={loading}
            style={{flex:1,minWidth:160,background:C.bg,border:"1px solid "+C.border,borderRadius:6,padding:"10px 13px",color:C.textHi,fontSize:14,fontFamily:C.font,transition:"all .15s"}}/>
          <button type="submit" disabled={loading} className="sub-b"
            style={{padding:"10px 18px",borderRadius:6,border:"1px solid "+C.borderA,background:C.cyanFaint,color:C.cyan,fontSize:13,fontWeight:700,fontFamily:C.font,cursor:loading?"not-allowed":"pointer",display:"flex",alignItems:"center",gap:7,opacity:loading?0.6:1,whiteSpace:"nowrap"}}>
            {loading&&<Spin/>}{loading?label+"ing…":label}
          </button>
        </div>
      </div>
    </form>
  );
}
 
function WErr({msg}){
  return <div style={{background:"rgba(224,96,85,0.06)",border:"1px solid rgba(224,96,85,0.2)",borderRadius:8,padding:"11px 14px",color:"#F0A098",fontSize:13,marginBottom:12}}>{msg}</div>;
}
 
function WEmpty({icon,title,sub}){
  return(
    <div style={{marginTop:12,border:"1px dashed "+C.border,borderRadius:10,padding:"56px 24px",textAlign:"center"}}>
      <div style={{fontSize:24,marginBottom:12,opacity:0.12}}>{icon}</div>
      <div style={{fontSize:14,color:C.textMid,fontWeight:600,marginBottom:5}}>{title}</div>
      <div style={{fontSize:12.5,color:C.muted,lineHeight:1.5}}>{sub}</div>
    </div>
  );
}
 
// ─── SHOP SPY ─────────────────────────────────────────────────────
function ShopSpy() {
  const [shop,setShop]=useState("");
  const [load,setLoad]=useState(false);
  const [data,setData]=useState(null);
  const [err,setErr]=useState("");
  const [phase,setPhase]=useState(0);
 
  const search=async e=>{
    e.preventDefault();if(!shop.trim())return;
    setLoad(true);setErr("");setData(null);setPhase(0);
    [1,2,3].forEach((p,i)=>setTimeout(()=>setPhase(p),(i+1)*500));
    try{
      const res=await fetch("/api/etsy/shop?shopname="+encodeURIComponent(shop));
      const json=await res.json();
      if(!res.ok)setErr(json.error||"Something went wrong");
      else setData(json);
    }catch{setErr("Network error. Please try again.");}
    finally{setLoad(false);setPhase(0);}
  };
 
  const signals=data?.pricingAnalysis?.strategy?buildSignals(data.pricingAnalysis.strategy):[];
  const insights=data?buildInsights(data,"shop"):[];
 
  return(
    <div className="content-inner">
      <p style={{fontSize:13,color:C.text,marginBottom:16,lineHeight:1.6}}>
        Decode any Etsy competitor — pricing strategy, listing intelligence, market position.
      </p>
      <WSearch value={shop} onChange={e=>setShop(e.target.value)}
        placeholder="Shop name or Etsy URL…"
        hint="Enter Etsy shop name or URL"
        loading={load} label="Scan" onSubmit={search}/>
      <ScanBar phases={["Locating shop listings","Extracting pricing data","Building intelligence signals"]} phase={phase} done={!!data}/>
      {err&&<WErr msg={err}/>}
      {data&&!load&&(
        <div className="ex-fade">
          {/* Shop overview */}
          <div className="sig-card" style={{background:C.s1,border:"1px solid "+C.border,borderRadius:10,padding:"18px 20px",marginBottom:12}}>
            <div style={{fontSize:8.5,letterSpacing:2.5,color:C.cyanDim,fontWeight:700,marginBottom:10}}>INTELLIGENCE TARGET</div>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
              <div style={{flex:1,minWidth:140}}>
                <div style={{fontFamily:C.font,fontWeight:800,fontSize:20,color:C.textHi,letterSpacing:-0.3,marginBottom:5}}>{data.shopName}</div>
                <div style={{fontSize:11,color:C.muted,fontFamily:C.mono,marginBottom:12}}>etsy.com/shop/{data.shopName}</div>
                <a href={data.shopUrl} target="_blank" rel="noopener noreferrer" className="ext-lnk"
                  style={{display:"inline-flex",alignItems:"center",gap:5,padding:"6px 13px",border:"1px solid "+C.border,borderRadius:6,color:C.textMid,fontSize:11.5,fontWeight:500,textDecoration:"none"}}>
                  View on Etsy {IcoArr()}
                </a>
              </div>
              <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
                {[
                  {label:"Listings",val:data.totalFound,color:C.cyan},
                  ...(data.shopReviews?[{label:"Reviews",val:data.shopReviews.toLocaleString(),color:C.textHi}]:[]),
                  ...(data.shopRating?[{label:"Rating",val:data.shopRating+"★",color:C.amber}]:[]),
                  ...(data.pricingAnalysis?[{label:"Avg Price",val:"$"+data.pricingAnalysis.average,color:C.textHi}]:[]),
                ].map((s,i)=>(
                  <div key={i} style={{textAlign:"center"}}>
                    <div style={{fontFamily:C.mono,fontSize:20,fontWeight:700,color:s.color,letterSpacing:-0.5,lineHeight:1}}>{s.val}</div>
                    <div style={{fontSize:10,color:C.muted,marginTop:5}}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {signals.length>0&&(
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:10,marginBottom:12}}>
              {signals.map((s,i)=><SignalCard key={i} signal={s} delay={i*100}/>)}
            </div>
          )}
          <PricingPanel analysis={data.pricingAnalysis}/>
          <ListingsPanel listings={Array.isArray(data.listings)?data.listings:[]}/>
          {insights.length>0&&<KeyInsights insights={insights}/>}
        </div>
      )}
      {!data&&!load&&!err&&<WEmpty icon="⬡" title="No shop analyzed yet" sub="Enter a shop name or Etsy URL above to begin"/>}
    </div>
  );
}
 
// ─── KEYWORD RESEARCH ─────────────────────────────────────────────
function KeywordResearch() {
  const [kw,setKw]=useState("");
  const [load,setLoad]=useState(false);
  const [data,setData]=useState(null);
  const [err,setErr]=useState("");
  const [phase,setPhase]=useState(0);
 
  const search=async e=>{
    e.preventDefault();if(!kw.trim())return;
    setLoad(true);setErr("");setData(null);setPhase(0);
    [1,2,3].forEach((p,i)=>setTimeout(()=>setPhase(p),(i+1)*500));
    try{
      const res=await fetch("/api/etsy/keywords?keyword="+encodeURIComponent(kw));
      const json=await res.json();
      if(!res.ok)setErr(json.error||"Something went wrong");
      else setData(json);
    }catch{setErr("Network error. Please try again.");}
    finally{setLoad(false);setPhase(0);}
  };
 
  const pSig=data?.pricingAnalysis?.strategy?buildSignals(data.pricingAnalysis.strategy):[];
  const dSig=data?.difficultyScore?diffSignal(data.difficultyScore):null;
  const allSig=[...(dSig?[dSig]:[]),...pSig].slice(0,3);
  const insights=data?buildInsights(data,"keyword"):[];
 
  return(
    <div className="content-inner">
      <p style={{fontSize:13,color:C.text,marginBottom:16,lineHeight:1.6}}>
        Surface competition density, pricing structure, and difficulty score for any Etsy keyword.
      </p>
      <WSearch value={kw} onChange={e=>setKw(e.target.value)}
        placeholder="e.g. minimalist wall art…"
        hint="Enter a keyword to analyze"
        loading={load} label="Research" onSubmit={search}/>
      <ScanBar phases={["Scanning top listings","Extracting pricing signals","Calculating difficulty score"]} phase={phase} done={!!data}/>
      {err&&<WErr msg={err}/>}
      {data&&!load&&(
        <div className="ex-fade">
          {/* Stat cards — 2x2 on mobile, 4x1 on desktop */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:12}}>
            {[
              {label:"Avg Price",  val:data.averagePrice?"$"+data.averagePrice:"—",  sub:"top results", color:C.textHi},
              {label:"Avg Rating", val:data.averageRating?data.averageRating+"★":"—", sub:"avg score",   color:C.amber},
              {label:"Results",    val:data.totalFound??"—",                          sub:"found",       color:C.textHi},
              {label:"Difficulty", val:data.difficultyScore||"—",                     sub:"to rank",     color:{Hard:C.red,Medium:C.amber,Easy:C.green}[data.difficultyScore]||C.textHi},
            ].map((s,i)=>(
              <div key={i} className="stat-card" style={{background:C.s1,border:"1px solid "+C.border,borderRadius:9,padding:"14px 16px",transition:"border-color .2s,transform .15s"}}>
                <div style={{fontSize:10.5,color:C.text,fontWeight:500,marginBottom:8}}>{s.label}</div>
                <div style={{fontFamily:C.mono,fontSize:22,fontWeight:700,color:s.color,letterSpacing:-0.5,lineHeight:1,marginBottom:4}}>{s.val}</div>
                <div style={{fontSize:10,color:C.muted}}>{s.sub}</div>
              </div>
            ))}
          </div>
          {allSig.length>0&&(
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:10,marginBottom:12}}>
              {allSig.map((s,i)=><SignalCard key={i} signal={s} delay={i*100}/>)}
            </div>
          )}
          <PricingPanel analysis={data.pricingAnalysis}/>
          <ListingsPanel listings={Array.isArray(data.listings)?data.listings:[]} keyword={data.keyword}/>
          {insights.length>0&&<KeyInsights insights={insights}/>}
        </div>
      )}
      {!data&&!load&&!err&&<WEmpty icon="◈" title="No keyword analyzed yet" sub="Enter a keyword above to surface market intelligence"/>}
    </div>
  );
}
 