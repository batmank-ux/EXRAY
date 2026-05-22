"use client";
// app/dashboard/page.js — EXRAY Intelligence Workspace v3
// Philosophy: calm · focused · alive · premium
// Font: Geist Mono (numbers) + Cabinet Grotesk (headings) + DM Sans (body)
 
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
 
// ─── TOKENS ───────────────────────────────────────────────────────
const C = {
  bg:      "#06090D",
  s1:      "#090E14",
  s2:      "#0C1219",
  s3:      "#0F1720",
  s4:      "#121C26",
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
  red:     "#E5635A",
  font:    "'DM Sans', system-ui, sans-serif",
  display: "'DM Sans', system-ui, sans-serif",
  mono:    "'JetBrains Mono', monospace",
};
 
// ─── ICONS ────────────────────────────────────────────────────────
const Ico = {
  scan: (s=16,c=C.text) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/>
      <path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
      <line x1="7" y1="12" x2="17" y2="12"/>
    </svg>
  ),
  key: (s=16,c=C.text) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>
    </svg>
  ),
  bolt: (s=16,c=C.text) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  ),
  arrow: (s=14,c=C.text) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7"/><path d="M7 7h10v10"/>
    </svg>
  ),
};
 
const Spin = () => (
  <svg width={15} height={15} viewBox="0 0 24 24" fill="none"
    style={{animation:"exSpin .7s linear infinite",flexShrink:0}} aria-hidden>
    <circle cx="12" cy="12" r="10" stroke="rgba(125,211,240,0.15)" strokeWidth="3"/>
    <path fill={C.ice} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
  </svg>
);
 
// ─── HELPERS ──────────────────────────────────────────────────────
const fmtP = v => typeof v==="number"&&Number.isFinite(v)
  ? "$"+v.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}) : null;
 
const strategyMeta = s => {
  if(s==="Premium-heavy")  return {color:C.ice,  bg:"rgba(125,211,240,0.07)", border:C.borderA, label:"Premium-heavy"};
  if(s==="Race to bottom") return {color:C.red,  bg:"rgba(229,99,90,0.07)",   border:"rgba(229,99,90,0.2)", label:"Race to bottom"};
  if(s==="Tight cluster")  return {color:C.green,bg:"rgba(61,214,140,0.07)",  border:"rgba(61,214,140,0.2)", label:"Tight cluster"};
  return {color:C.text, bg:C.iceFaint, border:C.border, label:"Mixed"};
};
 
const diffMeta = d => {
  if(d==="Hard")   return {color:C.red,  bg:"rgba(229,99,90,0.07)",  border:"rgba(229,99,90,0.2)"};
  if(d==="Medium") return {color:C.amber,bg:"rgba(245,200,66,0.07)", border:"rgba(245,200,66,0.2)"};
  if(d==="Easy")   return {color:C.green,bg:"rgba(61,214,140,0.07)", border:"rgba(61,214,140,0.2)"};
  return {color:C.text, bg:C.iceFaint, border:C.border};
};
 
// ─── NAV ──────────────────────────────────────────────────────────
const NAV = [
  {id:"shop-spy",         label:"Shop Spy",        icon:k=>Ico.scan(15,k), enabled:true},
  {id:"keyword-research", label:"Keyword Research", icon:k=>Ico.key(15,k),  enabled:true},
  {id:"ai-action-plan",   label:"AI Action Plan",  icon:k=>Ico.bolt(15,k), enabled:false},
];
 
// ─── ROOT ─────────────────────────────────────────────────────────
export default function Dashboard() {
  const [active, setActive]     = useState("shop-spy");
  const [email, setEmail]       = useState("");
  const [loggingOut, setLO]     = useState(false);
 
  useEffect(() => {
    createClient().auth.getUser().then(({data}) => setEmail(data?.user?.email||""));
  }, []);
 
  const logout = async () => {
    setLO(true);
    await createClient().auth.signOut();
    window.location.href = "/";
  };
 
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{background:${C.bg};margin:0}
        @keyframes exSpin{to{transform:rotate(360deg)}}
        @keyframes exFade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes exPulse{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes exSlide{from{opacity:0;transform:translateX(-6px)}to{opacity:1;transform:translateX(0)}}
        @keyframes exBar{from{width:0}to{width:var(--w)}}
        .ex-fade{animation:exFade .35s ease forwards}
        .ex-slide{animation:exSlide .3s ease forwards}
        .nb{transition:background .15s,color .15s,border-color .15s;cursor:pointer}
        .nb:hover{background:rgba(125,211,240,0.05)!important;color:${C.textHi}!important}
        .nb.on{background:rgba(125,211,240,0.07)!important;border-color:${C.borderA}!important;color:${C.textHi}!important}
        .row-item:hover{background:rgba(125,211,240,0.025)!important}
        .ext-link:hover{border-color:${C.ice}!important;color:${C.ice}!important}
        input{transition:border-color .15s,box-shadow .15s}
        input:focus{outline:none!important;border-color:${C.borderA}!important;box-shadow:0 0 0 3px rgba(125,211,240,0.06)!important}
        .submit-btn{transition:all .15s}
        .submit-btn:hover:not(:disabled){background:rgba(125,211,240,0.1)!important;border-color:rgba(125,211,240,0.3)!important}
        .intel-card{transition:border-color .2s,transform .2s}
        .intel-card:hover{border-color:rgba(125,211,240,0.12)!important;transform:translateY(-1px)}
        ::-webkit-scrollbar{width:3px;height:3px}
        ::-webkit-scrollbar-thumb{background:rgba(125,211,240,0.1);border-radius:4px}
      `}</style>
 
      <div style={{display:"flex",height:"100vh",background:C.bg,color:C.text,fontFamily:C.font,overflow:"hidden"}}>
 
        {/* ── SIDEBAR ── */}
        <aside style={{
          width:208,flexShrink:0,
          background:C.s1,
          borderRight:`1px solid ${C.border}`,
          display:"flex",flexDirection:"column",
          height:"100vh",
        }}>
          {/* Logo */}
          <div style={{padding:"22px 18px 18px",borderBottom:`1px solid ${C.border}`}}>
            <Link href="/" style={{textDecoration:"none",display:"block"}}>
              <div style={{fontFamily:C.display,fontWeight:800,fontSize:17,letterSpacing:5,color:C.textHi,lineHeight:1}}>
                <span style={{color:C.ice}}>EX</span>RAY
              </div>
              <div style={{fontSize:9,color:C.muted,letterSpacing:2.5,marginTop:5,fontWeight:600}}>INTELLIGENCE</div>
            </Link>
          </div>
 
          {/* Nav */}
          <nav style={{padding:"14px 10px",flex:1}}>
            <div style={{fontSize:8.5,letterSpacing:2,color:C.muted,fontWeight:700,padding:"0 8px",marginBottom:8}}>WORKSPACE</div>
            {NAV.map(({id,label,icon,enabled})=>{
              const isA = active===id;
              return (
                <button key={id} onClick={()=>enabled&&setActive(id)} disabled={!enabled}
                  className={`nb${isA?" on":""}`}
                  style={{
                    display:"flex",alignItems:"center",gap:9,
                    width:"100%",padding:"9px 10px",marginBottom:2,
                    borderRadius:7,border:`1px solid transparent`,
                    background:"transparent",
                    color:isA?C.textHi:enabled?C.text:C.muted,
                    fontSize:13,fontWeight:isA?500:400,
                    fontFamily:C.font,textAlign:"left",
                    opacity:enabled?1:0.35,
                  }}>
                  {icon(isA?C.ice:enabled?C.iceDim:C.muted)}
                  <span style={{flex:1}}>{label}</span>
                  {!enabled&&<span style={{fontSize:8,color:C.muted,letterSpacing:1.5,fontWeight:700}}>SOON</span>}
                </button>
              );
            })}
          </nav>
 
          {/* User */}
          <div style={{padding:"12px 14px 18px",borderTop:`1px solid ${C.border}`}}>
            <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:12}}>
              <div style={{
                width:26,height:26,borderRadius:"50%",flexShrink:0,
                background:"rgba(125,211,240,0.08)",border:`1px solid ${C.borderA}`,
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:10,fontWeight:700,color:C.ice,fontFamily:C.mono,
              }}>
                {email?email[0].toUpperCase():"?"}
              </div>
              <div style={{fontSize:11,color:C.textMid,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1}}>{email}</div>
            </div>
            <button onClick={logout} disabled={loggingOut} className="nb"
              style={{width:"100%",padding:"7px",borderRadius:6,border:`1px solid ${C.border}`,background:"transparent",color:C.muted,fontSize:11,cursor:"pointer",fontFamily:C.font}}>
              {loggingOut?"Signing out…":"Sign out"}
            </button>
          </div>
        </aside>
 
        {/* ── MAIN ── */}
        <main style={{flex:1,overflowY:"auto",background:C.bg,display:"flex",flexDirection:"column"}}>
          {active==="shop-spy"         && <ShopSpy />}
          {active==="keyword-research" && <KeywordResearch />}
        </main>
      </div>
    </>
  );
}
 
// ─── SHARED ───────────────────────────────────────────────────────
 
function WorkspaceHeader({title,desc,tag}) {
  return (
    <div style={{marginBottom:32}}>
      {tag&&<div style={{fontSize:9,letterSpacing:2.5,color:C.iceDim,fontWeight:700,marginBottom:10}}>{tag}</div>}
      <h1 style={{fontFamily:C.display,fontWeight:800,fontSize:26,color:C.textHi,letterSpacing:-0.5,lineHeight:1.1,marginBottom:8}}>{title}</h1>
      <p style={{fontSize:13.5,color:C.text,lineHeight:1.7}}>{desc}</p>
    </div>
  );
}
 
function SearchInput({value,onChange,placeholder,loading,label,onSubmit}) {
  return (
    <form onSubmit={onSubmit} style={{marginBottom:32}}>
      <div style={{display:"flex",gap:8}}>
        <input type="text" value={value} onChange={onChange} placeholder={placeholder} disabled={loading}
          style={{
            flex:1,background:C.s1,border:`1px solid ${C.border}`,
            borderRadius:7,padding:"11px 15px",
            color:C.textHi,fontSize:13.5,fontFamily:C.font,
          }}
        />
        <button type="submit" disabled={loading} className="submit-btn"
          style={{
            padding:"11px 22px",borderRadius:7,
            border:`1px solid ${C.borderA}`,
            background:C.iceFaint,color:C.ice,
            fontSize:13,fontWeight:600,fontFamily:C.font,
            cursor:loading?"not-allowed":"pointer",
            display:"flex",alignItems:"center",gap:8,
            opacity:loading?0.6:1,whiteSpace:"nowrap",
          }}>
          {loading&&<Spin/>}
          {loading?`${label}ing…`:label}
        </button>
      </div>
    </form>
  );
}
 
function ErrBox({msg}) {
  return (
    <div style={{background:"rgba(229,99,90,0.06)",border:"1px solid rgba(229,99,90,0.18)",borderRadius:8,padding:"12px 16px",color:"#F4A09A",fontSize:13,marginBottom:20,fontFamily:C.font}}>
      {msg}
    </div>
  );
}
 
function EmptyState({icon,title,sub}) {
  return (
    <div style={{marginTop:16,border:`1px dashed ${C.border}`,borderRadius:10,padding:"72px 24px",textAlign:"center"}}>
      <div style={{fontSize:28,marginBottom:14,opacity:0.25}}>{icon}</div>
      <div style={{fontSize:14,color:C.textMid,fontWeight:500,marginBottom:6}}>{title}</div>
      <div style={{fontSize:13,color:C.muted}}>{sub}</div>
    </div>
  );
}
 
// Intelligence badge
function IBadge({label,color,bg,border}) {
  return (
    <span style={{
      display:"inline-flex",alignItems:"center",
      fontSize:10.5,fontWeight:700,letterSpacing:0.4,
      padding:"3px 10px",borderRadius:99,
      background:bg,border:`1px solid ${border}`,color,
    }}>{label}</span>
  );
}
 
// Pricing breakdown panel
function PricingPanel({analysis}) {
  if(!analysis) return null;
  const sm = strategyMeta(analysis.strategy);
  return (
    <div className="intel-card" style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:10,padding:"20px 22px",marginBottom:14}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18}}>
        <div>
          <div style={{fontSize:9,letterSpacing:2,color:C.iceDim,fontWeight:700,marginBottom:6}}>PRICING INTELLIGENCE</div>
          <div style={{fontSize:14,fontWeight:600,color:C.textHi}}>Market Pricing Structure</div>
        </div>
        <IBadge label={sm.label} color={sm.color} bg={sm.bg} border={sm.border}/>
      </div>
 
      {/* Price distribution bar */}
      <div style={{marginBottom:18}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:C.muted,marginBottom:6}}>
          <span>${analysis.min}</span>
          <span style={{color:C.text,fontSize:11}}>Price range</span>
          <span>${analysis.max}</span>
        </div>
        <div style={{height:3,background:C.border,borderRadius:2,position:"relative",overflow:"hidden"}}>
          <div style={{
            position:"absolute",left:0,top:0,height:"100%",
            background:C.ice,opacity:0.4,
            width:"100%",borderRadius:2,
          }}/>
          {/* Median marker */}
          <div style={{
            position:"absolute",top:"-3px",
            left:`${Math.min(90,Math.max(5,(parseFloat(analysis.median)-parseFloat(analysis.min))/(parseFloat(analysis.max)-parseFloat(analysis.min))*100))}%`,
            width:2,height:9,background:C.ice,borderRadius:1,
          }}/>
        </div>
        <div style={{textAlign:"center",marginTop:4,fontSize:9,color:C.iceDim}}>
          median <span style={{fontFamily:C.mono,color:C.ice,fontWeight:700}}>${analysis.median}</span>
        </div>
      </div>
 
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
        {[
          {label:"FLOOR",  val:`$${analysis.min}`,    color:C.textMid,  desc:"Lowest"},
          {label:"MEDIAN", val:`$${analysis.median}`,  color:C.ice,      desc:"Middle"},
          {label:"AVERAGE",val:`$${analysis.average}`, color:C.textMid,  desc:"Mean"},
          {label:"CEILING",val:`$${analysis.max}`,     color:C.textHi,   desc:"Highest"},
        ].map((p,i)=>(
          <div key={i} style={{background:C.s2,border:`1px solid ${C.border}`,borderRadius:7,padding:"12px 13px"}}>
            <div style={{fontSize:8,letterSpacing:2,color:C.muted,fontWeight:700,marginBottom:6}}>{p.label}</div>
            <div style={{fontFamily:C.mono,fontSize:15,fontWeight:700,color:p.color,letterSpacing:-0.3}}>{p.val}</div>
            <div style={{fontSize:10,color:C.muted,marginTop:3}}>{p.desc}</div>
          </div>
        ))}
      </div>
      <div style={{fontSize:10.5,color:C.muted,marginTop:12}}>Based on {analysis.dataPoints} listings with visible prices</div>
    </div>
  );
}
 
// Listings panel
function ListingsPanel({listings,keyword}) {
  if(!listings?.length) return null;
  return (
    <div className="intel-card" style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:10,overflow:"hidden",marginBottom:14}}>
      <div style={{padding:"16px 22px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div>
          <div style={{fontSize:9,letterSpacing:2,color:C.iceDim,fontWeight:700,marginBottom:4}}>LISTING INTELLIGENCE</div>
          <div style={{fontSize:14,fontWeight:600,color:C.textHi}}>Top Listings</div>
        </div>
        {keyword&&<div style={{fontSize:11,color:C.muted,fontFamily:C.mono}}>"{keyword}"</div>}
      </div>
      {listings.map((item,i)=>(
        <div key={i} className="row-item" style={{
          display:"flex",alignItems:"center",gap:14,
          padding:"13px 22px",
          borderBottom:i<listings.length-1?`1px solid ${C.border}`:"none",
          transition:"background .1s",
        }}>
          <div style={{
            width:22,height:22,borderRadius:5,flexShrink:0,
            background:C.s2,border:`1px solid ${C.border}`,
            display:"flex",alignItems:"center",justifyContent:"center",
            fontFamily:C.mono,fontSize:9,color:C.muted,fontWeight:700,
          }}>{String(i+1).padStart(2,"0")}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:13,color:C.textMid,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.title}</div>
            <div style={{fontFamily:C.mono,fontSize:11,color:item.price?C.iceDim:C.muted,marginTop:3,fontWeight:500}}>
              {item.price||"—"}
            </div>
          </div>
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="ext-link"
            style={{
              flexShrink:0,padding:"5px 12px",borderRadius:5,
              border:`1px solid ${C.border}`,color:C.text,
              fontSize:11,fontWeight:500,textDecoration:"none",
              display:"flex",alignItems:"center",gap:5,
              transition:"all .15s",
            }}>
            View {Ico.arrow(10,C.iceDim)}
          </a>
        </div>
      ))}
    </div>
  );
}
 
// ─── SHOP SPY ─────────────────────────────────────────────────────
function ShopSpy() {
  const [shop,setShop]     = useState("");
  const [loading,setLoad]  = useState(false);
  const [data,setData]     = useState(null);
  const [error,setError]   = useState("");
  const [scanPhase,setPhase] = useState(0);
 
  const search = async e => {
    e.preventDefault();
    if(!shop.trim()) return;
    setLoad(true); setError(""); setData(null); setPhase(0);
    // Animate scan phases
    const phases = [1,2,3];
    phases.forEach((p,i)=>setTimeout(()=>setPhase(p),(i+1)*400));
    try {
      const res  = await fetch("/api/etsy/shop?shopname="+encodeURIComponent(shop));
      const json = await res.json();
      if(!res.ok) setError(json.error||"Something went wrong");
      else setData(json);
    } catch { setError("Network error. Please try again."); }
    finally { setLoad(false); setPhase(0); }
  };
 
  return (
    <div style={{maxWidth:820,margin:"0 auto",padding:"40px 44px",width:"100%"}}>
      <WorkspaceHeader
        tag="SHOP INTELLIGENCE"
        title="Shop Spy"
        desc="Enter any Etsy shop name or URL. EXRAY decodes their pricing strategy, top listings, and competitive position."
      />
 
      <SearchInput value={shop} onChange={e=>setShop(e.target.value)}
        placeholder="Shop name or Etsy URL…" loading={loading} label="Scan" onSubmit={search} />
 
      {/* Scan animation */}
      {loading&&(
        <div className="ex-fade" style={{background:C.s1,border:`1px solid ${C.borderA}`,borderRadius:10,padding:"20px 22px",marginBottom:20}}>
          <div style={{fontSize:9,letterSpacing:2,color:C.ice,fontWeight:700,marginBottom:14}}>RUNNING X-RAY SCAN</div>
          {["Fetching shop listings","Extracting pricing data","Generating intelligence"].map((label,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,opacity:scanPhase>i?1:0.2,transition:"opacity .3s"}}>
              <div style={{width:5,height:5,borderRadius:"50%",background:scanPhase>i?C.ice:C.muted,flexShrink:0,
                ...(scanPhase===i+1?{animation:"exPulse 1s infinite"}:{}),
              }}/>
              <div style={{fontFamily:C.mono,fontSize:11,color:scanPhase>i?C.textMid:C.muted}}>{label}</div>
              {scanPhase>i+1&&<div style={{marginLeft:"auto",fontSize:10,color:C.ice}}>✓</div>}
            </div>
          ))}
        </div>
      )}
 
      {error&&<ErrBox msg={error}/>}
 
      {data&&!loading&&(
        <div className="ex-fade" style={{display:"flex",flexDirection:"column",gap:0}}>
 
          {/* Shop overview — intelligence card */}
          <div className="intel-card" style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:10,padding:"22px 24px",marginBottom:14}}>
            <div style={{fontSize:9,letterSpacing:2,color:C.iceDim,fontWeight:700,marginBottom:14}}>SHOP OVERVIEW</div>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:20}}>
              <div>
                <div style={{fontFamily:C.display,fontWeight:800,fontSize:22,color:C.textHi,letterSpacing:-0.3,marginBottom:8}}>{data.shopName}</div>
                <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
                  <div style={{display:"flex",flexDirection:"column",gap:2}}>
                    <div style={{fontFamily:C.mono,fontSize:18,fontWeight:700,color:C.ice,letterSpacing:-0.5}}>{data.totalFound}</div>
                    <div style={{fontSize:10,color:C.muted}}>listings found</div>
                  </div>
                  {data.shopReviews&&(
                    <div style={{display:"flex",flexDirection:"column",gap:2}}>
                      <div style={{fontFamily:C.mono,fontSize:18,fontWeight:700,color:C.textHi,letterSpacing:-0.5}}>{data.shopReviews.toLocaleString()}</div>
                      <div style={{fontSize:10,color:C.muted}}>reviews</div>
                    </div>
                  )}
                  {data.shopRating&&(
                    <div style={{display:"flex",flexDirection:"column",gap:2}}>
                      <div style={{fontFamily:C.mono,fontSize:18,fontWeight:700,color:C.amber,letterSpacing:-0.5}}>{data.shopRating}★</div>
                      <div style={{fontSize:10,color:C.muted}}>rating</div>
                    </div>
                  )}
                </div>
              </div>
              <a href={data.shopUrl} target="_blank" rel="noopener noreferrer" className="ext-link"
                style={{padding:"8px 16px",border:`1px solid ${C.border}`,borderRadius:7,color:C.text,textDecoration:"none",fontSize:12,fontWeight:500,display:"flex",alignItems:"center",gap:6,flexShrink:0,transition:"all .15s"}}>
                Open shop {Ico.arrow(10,C.iceDim)}
              </a>
            </div>
          </div>
 
          <PricingPanel analysis={data.pricingAnalysis}/>
          <ListingsPanel listings={Array.isArray(data.listings)?data.listings:[]}/>
        </div>
      )}
 
      {!data&&!loading&&!error&&(
        <EmptyState icon="⬡" title="No shop scanned yet" sub="Enter a shop name or Etsy URL above to begin"/>
      )}
    </div>
  );
}
 
// ─── KEYWORD RESEARCH ─────────────────────────────────────────────
function KeywordResearch() {
  const [kw,setKw]         = useState("");
  const [loading,setLoad]  = useState(false);
  const [data,setData]     = useState(null);
  const [error,setError]   = useState("");
  const [scanPhase,setPhase] = useState(0);
 
  const search = async e => {
    e.preventDefault();
    if(!kw.trim()) return;
    setLoad(true); setError(""); setData(null); setPhase(0);
    const phases = [1,2,3];
    phases.forEach((p,i)=>setTimeout(()=>setPhase(p),(i+1)*400));
    try {
      const res  = await fetch("/api/etsy/keywords?keyword="+encodeURIComponent(kw));
      const json = await res.json();
      if(!res.ok) setError(json.error||"Something went wrong");
      else setData(json);
    } catch { setError("Network error. Please try again."); }
    finally { setLoad(false); setPhase(0); }
  };
 
  return (
    <div style={{maxWidth:820,margin:"0 auto",padding:"40px 44px",width:"100%"}}>
      <WorkspaceHeader
        tag="KEYWORD INTELLIGENCE"
        title="Keyword Research"
        desc="Search any Etsy keyword. EXRAY returns competition density, pricing structure, and a difficulty score."
      />
 
      <SearchInput value={kw} onChange={e=>setKw(e.target.value)}
        placeholder="Enter a keyword…" loading={loading} label="Research" onSubmit={search}/>
 
      {loading&&(
        <div className="ex-fade" style={{background:C.s1,border:`1px solid ${C.borderA}`,borderRadius:10,padding:"20px 22px",marginBottom:20}}>
          <div style={{fontSize:9,letterSpacing:2,color:C.ice,fontWeight:700,marginBottom:14}}>ANALYZING KEYWORD</div>
          {["Scanning top listings","Extracting pricing signals","Calculating difficulty score"].map((label,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,opacity:scanPhase>i?1:0.2,transition:"opacity .3s"}}>
              <div style={{width:5,height:5,borderRadius:"50%",background:scanPhase>i?C.ice:C.muted,flexShrink:0,...(scanPhase===i+1?{animation:"exPulse 1s infinite"}:{})}}/>
              <div style={{fontFamily:C.mono,fontSize:11,color:scanPhase>i?C.textMid:C.muted}}>{label}</div>
              {scanPhase>i+1&&<div style={{marginLeft:"auto",fontSize:10,color:C.ice}}>✓</div>}
            </div>
          ))}
        </div>
      )}
 
      {error&&<ErrBox msg={error}/>}
 
      {data&&!loading&&(
        <div className="ex-fade" style={{display:"flex",flexDirection:"column",gap:0}}>
 
          {/* Intelligence summary */}
          <div className="intel-card" style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:10,padding:"22px 24px",marginBottom:14}}>
            <div style={{fontSize:9,letterSpacing:2,color:C.iceDim,fontWeight:700,marginBottom:14}}>KEYWORD INTELLIGENCE</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
              {[
                {label:"AVG PRICE",  val:data.averagePrice?`$${data.averagePrice}`:"—", color:C.textHi,  sub:"across top results"},
                {label:"AVG RATING", val:data.averageRating?`${data.averageRating}★`:"—", color:C.amber, sub:"average score"},
                {label:"LISTINGS",   val:data.totalFound??"—", color:C.textHi, sub:"total results"},
                {label:"DIFFICULTY", val:null, isDiff:true, level:data.difficultyScore, sub:"to rank"},
              ].map((s,i)=>(
                <div key={i} style={{background:C.s2,border:`1px solid ${C.border}`,borderRadius:8,padding:"14px 15px"}}>
                  <div style={{fontSize:8.5,letterSpacing:2,color:C.iceDim,fontWeight:700,marginBottom:8}}>{s.label}</div>
                  {s.isDiff
                    ? (() => { const dm=diffMeta(s.level); return s.level
                        ? <IBadge label={s.level} color={dm.color} bg={dm.bg} border={dm.border}/>
                        : <span style={{fontFamily:C.mono,fontSize:20,fontWeight:700,color:C.textHi}}>—</span>;
                      })()
                    : <div style={{fontFamily:C.mono,fontSize:20,fontWeight:700,color:s.color,letterSpacing:-0.5,lineHeight:1}}>{s.val}</div>
                  }
                  <div style={{fontSize:10,color:C.muted,marginTop:4}}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
 
          <PricingPanel analysis={data.pricingAnalysis}/>
          <ListingsPanel listings={Array.isArray(data.listings)?data.listings:[]} keyword={data.keyword}/>
        </div>
      )}
 
      {!data&&!loading&&!error&&(
        <EmptyState icon="◈" title="No keyword analyzed yet" sub="Enter a keyword above to surface market intelligence"/>
      )}
    </div>
  );
}
