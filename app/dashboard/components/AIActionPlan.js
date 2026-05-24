"use client";
// app/dashboard/ai-action-plan/page.js  OR  replace AI section in dashboard
// EXRAY AI Action Plan — OpenRouter powered intelligence report
 
import { useState } from "react";
 
const C = {
  bg:        "#04070B",
  s1:        "#070D14",
  s2:        "#0B1420",
  s3:        "#0F1A28",
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
  @keyframes exSpin   { to { transform: rotate(360deg); } }
  @keyframes exFade   { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
  @keyframes exPulse  { 0%,100%{opacity:1} 50%{opacity:0.15} }
  @keyframes exBlink  { 0%,90%,100%{opacity:0.4} 45%{opacity:1} }
  @keyframes scanLine { 0%{transform:translateY(-100%)} 100%{transform:translateY(400px)} }
  .ex-fade { animation: exFade .4s ease forwards; }
  .card { transition: border-color .2s; }
  .card:hover { border-color: rgba(125,211,240,0.16) !important; }
  .sub-b { transition: all .15s; }
  .sub-b:hover:not(:disabled) { background: rgba(125,211,240,0.1) !important; border-color: rgba(125,211,240,0.35) !important; }
  input:focus { outline: none !important; border-color: rgba(125,211,240,0.28) !important; box-shadow: 0 0 0 3px rgba(125,211,240,0.07) !important; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-thumb { background: rgba(125,211,240,0.14); border-radius: 4px; }
`;
 
// ─── HELPERS ──────────────────────────────────────────────────────
const Spin = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" style={{animation:"exSpin .7s linear infinite",flexShrink:0}}>
    <circle cx="12" cy="12" r="10" stroke="rgba(125,211,240,0.2)" strokeWidth="3"/>
    <path fill="#7DD3F0" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
  </svg>
);
 
const severityColor = s => ({Critical:C.red, High:C.amber, Medium:C.cyan}[s]||C.textMid);
const potentialColor = p => ({High:C.green, Medium:C.amber, Low:C.red}[p]||C.textMid);
const statusColor = s => ({danger:C.red, warning:C.amber, opportunity:C.green}[s]||C.textMid);
const statusBg = s => ({danger:"rgba(224,96,85,0.08)", warning:"rgba(245,200,66,0.08)", opportunity:"rgba(61,201,138,0.08)"}[s]||C.s2);
const statusBorder = s => ({danger:"rgba(224,96,85,0.22)", warning:"rgba(245,200,66,0.22)", opportunity:"rgba(61,201,138,0.22)"}[s]||C.border);
 
// Score arc SVG
function ScoreArc({score=0, color=C.cyan, size=120}) {
  const r = size/2 - 10;
  const circ = 2 * Math.PI * r;
  const arc = circ * 0.75; // 270deg arc
  const offset = arc * (1 - score/100);
  return (
    <div style={{position:"relative", width:size, height:size}}>
      <svg width={size} height={size} style={{position:"absolute", inset:0, transform:"rotate(135deg)"}}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.border} strokeWidth={6} strokeDasharray={`${arc} ${circ-arc}`} strokeLinecap="round"/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={6}
          strokeDasharray={`${arc-offset} ${circ-(arc-offset)}`} strokeLinecap="round"
          style={{transition:"stroke-dasharray 1.5s cubic-bezier(.4,0,.2,1)", filter:`drop-shadow(0 0 6px ${color})`}}
        />
      </svg>
      <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        <div style={{fontFamily:C.mono,fontSize:28,fontWeight:700,color:C.textHi,letterSpacing:-1,lineHeight:1}}>{score}</div>
        <div style={{fontSize:9,color:C.muted,letterSpacing:1.5,fontWeight:700,marginTop:2}}>SCORE</div>
      </div>
    </div>
  );
}
 
// Confidence bar
function ConfBar({value=0, color=C.cyan}) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:8}}>
      <div style={{flex:1,height:3,background:C.border,borderRadius:2,overflow:"hidden"}}>
        <div style={{height:"100%",width:value+"%",background:color,borderRadius:2,transition:"width 1s ease",boxShadow:`0 0 6px ${color}`}}/>
      </div>
      <div style={{fontFamily:C.mono,fontSize:10,color:color,fontWeight:600,minWidth:28}}>{value}%</div>
    </div>
  );
}
 
// Section header
function SectionHeader({tag, title, sub}) {
  return (
    <div style={{marginBottom:20}}>
      <div style={{fontSize:8.5,letterSpacing:2.5,color:C.cyanDim,fontWeight:700,marginBottom:8}}>{tag}</div>
      <div style={{fontFamily:C.font,fontWeight:800,fontSize:20,color:C.textHi,letterSpacing:-0.3,marginBottom:sub?6:0}}>{title}</div>
      {sub&&<div style={{fontSize:13,color:C.text,lineHeight:1.6}}>{sub}</div>}
    </div>
  );
}
 
// ─── SCAN ANIMATION ───────────────────────────────────────────────
function ScanningAnimation({steps, currentStep}) {
  return (
    <div style={{
      background:C.s1, border:"1px solid "+C.borderA,
      borderRadius:12, padding:"32px 36px",
      textAlign:"center", marginBottom:20,
    }}>
      {/* Animated scan visual */}
      <div style={{
        width:80, height:80, borderRadius:"50%",
        border:"1px solid "+C.borderA,
        margin:"0 auto 24px",
        position:"relative",
        display:"flex", alignItems:"center", justifyContent:"center",
      }}>
        <div style={{
          position:"absolute", inset:0, borderRadius:"50%",
          border:"2px solid transparent",
          borderTopColor:C.cyan,
          animation:"exSpin 1s linear infinite",
          boxShadow:"0 0 12px "+C.cyan,
        }}/>
        <div style={{width:12,height:12,borderRadius:"50%",background:C.cyan,boxShadow:"0 0 12px 3px "+C.cyan,animation:"exPulse 1.5s infinite"}}/>
      </div>
 
      <div style={{fontSize:9.5,letterSpacing:2.5,color:C.cyan,fontWeight:700,marginBottom:20}}>AI INTELLIGENCE SCAN</div>
 
      <div style={{maxWidth:320,margin:"0 auto"}}>
        {steps.map((step,i)=>(
          <div key={i} style={{
            display:"flex", alignItems:"center", gap:10,
            padding:"8px 0",
            borderBottom:i<steps.length-1?"1px solid "+C.border:"none",
            opacity:i<=currentStep?1:0.2,
            transition:"opacity .4s",
          }}>
            <div style={{
              width:6,height:6,borderRadius:"50%",flexShrink:0,
              background:i<currentStep?C.green:i===currentStep?C.cyan:C.muted,
              boxShadow:i<=currentStep?"0 0 6px "+(i<currentStep?C.green:C.cyan):"none",
              ...(i===currentStep?{animation:"exBlink 1s infinite"}:{}),
            }}/>
            <div style={{fontFamily:C.mono,fontSize:11,color:i<currentStep?C.green:i===currentStep?C.textHi:C.muted,textAlign:"left",flex:1}}>{step}</div>
            {i<currentStep&&<div style={{fontSize:10,color:C.green,fontWeight:700}}>✓</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
 
// ─── MAIN COMPONENT ───────────────────────────────────────────────
export default function AIActionPlan({ shopData, keywordData }) {
  const [shopName, setShopName]   = useState(shopData?.shopName || "");
  const [keyword, setKeyword]     = useState(keywordData?.keyword || "");
  const [loading, setLoading]     = useState(false);
  const [scanStep, setScanStep]   = useState(-1);
  const [report, setReport]       = useState(null);
  const [error, setError]         = useState("");
 
  const scanSteps = [
    "Ingesting shop intelligence data",
    "Analyzing pricing structure",
    "Detecting competitor weaknesses",
    "Mapping market opportunities",
    "Calculating saturation signals",
    "Building strategic action plan",
    "Generating intelligence report",
  ];
 
  const generate = async (e) => {
    e.preventDefault();
    setLoading(true); setError(""); setReport(null); setScanStep(0);
 
    // Animate scan steps
    scanSteps.forEach((_,i) => {
      setTimeout(() => setScanStep(i), i * 800);
    });
 
    try {
      const res = await fetch("/api/ai/action-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shopData, keywordData, shopName, keyword }),
      });
      const json = await res.json();
      if (!res.ok) { setError(json.error || "Failed to generate report"); }
      else { setReport(json); }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false); setScanStep(-1);
    }
  };
 
  return (
    <>
      <style>{G}</style>
      <div style={{fontFamily:C.font,color:C.text,maxWidth:900,margin:"0 auto",padding:"24px 32px"}}>
 
        {/* Page header */}
        <div style={{marginBottom:28}}>
          <div style={{fontSize:8.5,letterSpacing:2.5,color:C.cyanDim,fontWeight:700,marginBottom:8}}>FLAGSHIP FEATURE</div>
          <h1 style={{fontFamily:C.font,fontWeight:800,fontSize:26,color:C.textHi,letterSpacing:-0.4,marginBottom:7}}>AI Action Plan</h1>
          <p style={{fontSize:13.5,color:C.text,lineHeight:1.65,maxWidth:560}}>
            EXRAY's AI strategist analyzes your market data and generates a structured intelligence report — specific, data-driven, actionable.
          </p>
        </div>
 
        {/* Input form */}
        {!report&&!loading&&(
          <form onSubmit={generate} style={{marginBottom:24}}>
            <div style={{background:C.s1,border:"1px solid "+C.border,borderRadius:10,padding:"20px 22px",marginBottom:12}}>
              <div style={{fontSize:9,letterSpacing:2,color:C.cyanDim,fontWeight:700,marginBottom:14}}>INTELLIGENCE INPUTS</div>
 
              {shopData ? (
                <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:C.s2,border:"1px solid "+C.border,borderRadius:7,marginBottom:10}}>
                  <div style={{width:7,height:7,borderRadius:"50%",background:C.green,boxShadow:"0 0 6px "+C.green}}/>
                  <div style={{flex:1}}>
                    <div style={{fontSize:11,color:C.muted,marginBottom:2}}>SHOP DATA LOADED</div>
                    <div style={{fontSize:13,color:C.textHi,fontWeight:600}}>{shopData.shopName}</div>
                  </div>
                  <div style={{fontFamily:C.mono,fontSize:10,color:C.cyan}}>{shopData.totalFound} listings · ${shopData.pricingAnalysis?.average||"?"} avg</div>
                </div>
              ) : (
                <div style={{marginBottom:10}}>
                  <div style={{fontSize:10.5,color:C.muted,marginBottom:7,fontWeight:600}}>SHOP NAME (optional — run Shop Spy first for best results)</div>
                  <input type="text" value={shopName} onChange={e=>setShopName(e.target.value)}
                    placeholder="Enter Etsy shop name…"
                    style={{width:"100%",background:C.bg,border:"1px solid "+C.border,borderRadius:6,padding:"10px 13px",color:C.textHi,fontSize:13.5,fontFamily:C.font}}/>
                </div>
              )}
 
              {keywordData ? (
                <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:C.s2,border:"1px solid "+C.border,borderRadius:7}}>
                  <div style={{width:7,height:7,borderRadius:"50%",background:C.green,boxShadow:"0 0 6px "+C.green}}/>
                  <div style={{flex:1}}>
                    <div style={{fontSize:11,color:C.muted,marginBottom:2}}>KEYWORD DATA LOADED</div>
                    <div style={{fontSize:13,color:C.textHi,fontWeight:600}}>"{keywordData.keyword}"</div>
                  </div>
                  <div style={{fontFamily:C.mono,fontSize:10,color:C.cyan}}>{keywordData.difficultyScore} · ${keywordData.averagePrice||"?"} avg</div>
                </div>
              ) : (
                <div>
                  <div style={{fontSize:10.5,color:C.muted,marginBottom:7,fontWeight:600}}>TARGET KEYWORD (optional — run Keyword Research first for best results)</div>
                  <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)}
                    placeholder="Enter target keyword…"
                    style={{width:"100%",background:C.bg,border:"1px solid "+C.border,borderRadius:6,padding:"10px 13px",color:C.textHi,fontSize:13.5,fontFamily:C.font}}/>
                </div>
              )}
            </div>
 
            {!shopData&&!keywordData&&!shopName&&!keyword&&(
              <div style={{background:"rgba(245,200,66,0.06)",border:"1px solid rgba(245,200,66,0.18)",borderRadius:7,padding:"10px 14px",color:C.amber,fontSize:12.5,marginBottom:12}}>
                💡 Run <strong>Shop Spy</strong> or <strong>Keyword Research</strong> first for data-driven analysis. You can also enter names manually.
              </div>
            )}
 
            <button type="submit" className="sub-b"
              style={{
                width:"100%",padding:"13px",borderRadius:8,
                border:"1px solid "+C.borderA,background:C.cyanFaint,
                color:C.cyan,fontSize:14,fontWeight:700,fontFamily:C.font,
                letterSpacing:0.5,cursor:"pointer",
                display:"flex",alignItems:"center",justifyContent:"center",gap:8,
              }}>
              ✦ Generate AI Action Plan
            </button>
          </form>
        )}
 
        {/* Scan animation */}
        {loading&&<ScanningAnimation steps={scanSteps} currentStep={scanStep}/>}
 
        {/* Error */}
        {error&&<div style={{background:"rgba(224,96,85,0.06)",border:"1px solid rgba(224,96,85,0.2)",borderRadius:8,padding:"12px 16px",color:"#F0A098",fontSize:13,marginBottom:16}}>{error}</div>}
 
        {/* INTELLIGENCE REPORT */}
        {report&&!loading&&(
          <div className="ex-fade">
 
            {/* Regenerate button */}
            <div style={{display:"flex",justifyContent:"flex-end",marginBottom:16}}>
              <button onClick={()=>setReport(null)} className="sub-b"
                style={{padding:"7px 16px",borderRadius:6,border:"1px solid "+C.border,background:"transparent",color:C.muted,fontSize:12,cursor:"pointer",fontFamily:C.font}}>
                ← New Analysis
              </button>
            </div>
 
            {/* ── 1. STRATEGIC SCORE ── */}
            {report.strategicScore&&(
              <div className="card" style={{background:C.s1,border:"1px solid "+C.border,borderRadius:12,padding:"24px 26px",marginBottom:14}}>
                <div style={{fontSize:8.5,letterSpacing:2.5,color:C.cyanDim,fontWeight:700,marginBottom:18}}>STRATEGIC INTELLIGENCE OVERVIEW</div>
                <div style={{display:"flex",alignItems:"center",gap:28,flexWrap:"wrap"}}>
                  <ScoreArc score={report.strategicScore.overall}
                    color={report.strategicScore.overall>=70?C.green:report.strategicScore.overall>=40?C.amber:C.red}
                    size={120}/>
                  <div style={{flex:1,minWidth:200}}>
                    <div style={{fontFamily:C.font,fontWeight:800,fontSize:18,color:C.textHi,lineHeight:1.3,marginBottom:14}}>
                      "{report.strategicScore.headline}"
                    </div>
                    <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
                      {[
                        {label:"Market Position",   val:report.strategicScore.marketPosition},
                        {label:"Growth Potential",  val:report.strategicScore.growthPotential,  color:potentialColor(report.strategicScore.growthPotential)},
                        {label:"Competition",       val:report.strategicScore.competitionDifficulty, color:severityColor(report.strategicScore.competitionDifficulty)},
                        {label:"Saturation",        val:report.strategicScore.saturationLevel,  color:severityColor(report.strategicScore.saturationLevel)},
                      ].map((s,i)=>(
                        <div key={i}>
                          <div style={{fontSize:9,color:C.muted,letterSpacing:1.5,fontWeight:700,marginBottom:3}}>{s.label.toUpperCase()}</div>
                          <div style={{fontSize:12.5,fontWeight:700,color:s.color||C.textMid}}>{s.val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
 
            {/* ── 2. CRITICAL ISSUES ── */}
            {report.criticalIssues?.length>0&&(
              <div style={{marginBottom:14}}>
                <SectionHeader tag="CRITICAL ISSUES" title="What's holding you back." sub="Ranked by strategic impact and severity."/>
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  {report.criticalIssues.map((issue,i)=>(
                    <div key={i} className="card" style={{background:C.s1,border:"1px solid "+C.border,borderRadius:10,padding:"18px 20px"}}>
                      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12,marginBottom:12,flexWrap:"wrap"}}>
                        <div style={{display:"flex",alignItems:"center",gap:10}}>
                          <span style={{
                            fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:99,
                            background:issue.severity==="Critical"?"rgba(224,96,85,0.1)":issue.severity==="High"?"rgba(245,200,66,0.1)":"rgba(125,211,240,0.08)",
                            border:`1px solid ${severityColor(issue.severity)}40`,
                            color:severityColor(issue.severity),
                          }}>{issue.severity}</span>
                          <div style={{fontFamily:C.font,fontWeight:700,fontSize:14,color:C.textHi}}>{issue.title}</div>
                        </div>
                        <div style={{fontSize:9,color:C.muted,letterSpacing:1}}>CONFIDENCE</div>
                      </div>
                      <ConfBar value={issue.confidence} color={severityColor(issue.severity)}/>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:14}}>
                        <div style={{background:C.s2,border:"1px solid "+C.border,borderRadius:7,padding:"10px 12px"}}>
                          <div style={{fontSize:8.5,color:C.muted,letterSpacing:1.5,fontWeight:700,marginBottom:5}}>WHY IT MATTERS</div>
                          <div style={{fontSize:12,color:C.textMid,lineHeight:1.6}}>{issue.whyItMatters}</div>
                        </div>
                        <div style={{background:C.s2,border:"1px solid "+C.border,borderRadius:7,padding:"10px 12px"}}>
                          <div style={{fontSize:8.5,color:C.muted,letterSpacing:1.5,fontWeight:700,marginBottom:5}}>RECOMMENDED ACTION</div>
                          <div style={{fontSize:12,color:C.cyan,lineHeight:1.6,fontWeight:500}}>{issue.action}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
 
            {/* ── 3. GROWTH OPPORTUNITIES ── */}
            {report.growthOpportunities?.length>0&&(
              <div style={{marginBottom:14}}>
                <SectionHeader tag="GROWTH OPPORTUNITIES" title="Where you can win." sub="Highest-probability market opportunities identified."/>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:10}}>
                  {report.growthOpportunities.map((opp,i)=>(
                    <div key={i} className="card" style={{background:C.s1,border:"1px solid "+C.border,borderRadius:10,padding:"18px 18px"}}>
                      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                        <span style={{
                          fontSize:10,fontWeight:700,padding:"3px 9px",borderRadius:99,
                          background:opp.potential==="High"?"rgba(61,201,138,0.1)":opp.potential==="Medium"?"rgba(245,200,66,0.1)":"rgba(224,96,85,0.1)",
                          border:`1px solid ${potentialColor(opp.potential)}40`,
                          color:potentialColor(opp.potential),
                        }}>{opp.potential} Potential</span>
                        <span style={{fontSize:9,color:C.muted,fontFamily:C.mono}}>{opp.timeframe}</span>
                      </div>
                      <div style={{fontFamily:C.font,fontWeight:700,fontSize:13.5,color:C.textHi,marginBottom:8,lineHeight:1.3}}>{opp.title}</div>
                      <div style={{fontSize:12,color:C.text,lineHeight:1.65,marginBottom:10}}>{opp.insight}</div>
                      <ConfBar value={opp.confidence} color={potentialColor(opp.potential)}/>
                      <div style={{marginTop:12,paddingTop:10,borderTop:"1px solid "+C.border}}>
                        <div style={{fontSize:8.5,color:C.muted,letterSpacing:1.5,fontWeight:700,marginBottom:4}}>ACTION</div>
                        <div style={{fontSize:12,color:C.green,fontWeight:500,lineHeight:1.5}}>{opp.action}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
 
            {/* ── 4. PRICING INTELLIGENCE ── */}
            {report.pricingIntelligence&&(
              <div style={{marginBottom:14}}>
                <SectionHeader tag="PRICING INTELLIGENCE" title="Your market pricing position."/>
                <div className="card" style={{background:C.s1,border:"1px solid "+C.border,borderRadius:10,padding:"20px 22px"}}>
                  <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:16,marginBottom:16,flexWrap:"wrap"}}>
                    <div style={{flex:1}}>
                      <div style={{fontFamily:C.font,fontWeight:700,fontSize:15,color:C.textHi,marginBottom:8,lineHeight:1.4}}>{report.pricingIntelligence.assessment}</div>
                      <div style={{fontSize:13,color:C.text,lineHeight:1.65}}>{report.pricingIntelligence.recommendation}</div>
                    </div>
                    <span style={{
                      fontSize:11,fontWeight:700,padding:"5px 14px",borderRadius:6,
                      background:C.cyanFaint,border:"1px solid "+C.borderA,color:C.cyan,
                      letterSpacing:0.5,flexShrink:0,
                    }}>{report.pricingIntelligence.positioning}</span>
                  </div>
                  {report.pricingIntelligence.insights?.length>0&&(
                    <div style={{display:"flex",flexDirection:"column",gap:8}}>
                      {report.pricingIntelligence.insights.map((ins,i)=>(
                        <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"10px 12px",background:C.s2,border:"1px solid "+C.border,borderRadius:7}}>
                          <div style={{width:5,height:5,borderRadius:"50%",background:C.cyan,boxShadow:"0 0 6px "+C.cyan,flexShrink:0,marginTop:4}}/>
                          <div style={{fontSize:13,color:C.textMid,lineHeight:1.6}}>{ins}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
 
            {/* ── 5. KEYWORD STRATEGY ── */}
            {report.keywordStrategy&&(
              <div style={{marginBottom:14}}>
                <SectionHeader tag="KEYWORD STRATEGY" title="Keyword intelligence breakdown."/>
                <div className="card" style={{background:C.s1,border:"1px solid "+C.border,borderRadius:10,padding:"20px 22px"}}>
                  <div style={{fontSize:13.5,color:C.textMid,lineHeight:1.65,marginBottom:16,fontWeight:500}}>{report.keywordStrategy.assessment}</div>
                  {report.keywordStrategy.opportunities?.length>0&&(
                    <div style={{display:"flex",flexDirection:"column",gap:8}}>
                      {report.keywordStrategy.opportunities.map((kw,i)=>(
                        <div key={i} style={{background:C.s2,border:"1px solid "+C.border,borderRadius:8,padding:"13px 14px"}}>
                          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8,flexWrap:"wrap",gap:8}}>
                            <div style={{fontFamily:C.mono,fontSize:12.5,color:C.cyan,fontWeight:600}}>"{kw.keyword}"</div>
                            <div style={{display:"flex",alignItems:"center",gap:8}}>
                              <div style={{fontSize:9,color:C.muted,letterSpacing:1}}>OPPORTUNITY</div>
                              <div style={{fontFamily:C.mono,fontSize:13,fontWeight:700,color:kw.opportunityScore>=70?C.green:kw.opportunityScore>=40?C.amber:C.red}}>{kw.opportunityScore}</div>
                            </div>
                          </div>
                          <div style={{fontSize:12,color:C.text,lineHeight:1.6,marginBottom:8}}>{kw.why}</div>
                          <div style={{fontSize:11.5,color:C.green,fontWeight:600}}>{kw.action}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
 
            {/* ── 6. SATURATION ANALYSIS ── */}
            {report.saturationAnalysis&&(
              <div style={{marginBottom:14}}>
                <SectionHeader tag="SATURATION ANALYSIS" title="Market saturation signals."/>
                <div className="card" style={{background:C.s1,border:"1px solid "+C.border,borderRadius:10,padding:"20px 22px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:16,flexWrap:"wrap"}}>
                    <div style={{textAlign:"center"}}>
                      <div style={{fontFamily:C.mono,fontSize:32,fontWeight:700,
                        color:report.saturationAnalysis.score>=70?C.red:report.saturationAnalysis.score>=40?C.amber:C.green,
                        letterSpacing:-1,lineHeight:1}}>{report.saturationAnalysis.score}</div>
                      <div style={{fontSize:9,color:C.muted,letterSpacing:1.5,fontWeight:700,marginTop:3}}>SAT. INDEX</div>
                    </div>
                    <div style={{flex:1}}>
                      <span style={{
                        fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:99,marginBottom:8,display:"inline-block",
                        background:report.saturationAnalysis.level==="High"?"rgba(224,96,85,0.1)":report.saturationAnalysis.level==="Medium"?"rgba(245,200,66,0.1)":"rgba(61,201,138,0.1)",
                        border:`1px solid ${report.saturationAnalysis.level==="High"?C.red:report.saturationAnalysis.level==="Medium"?C.amber:C.green}40`,
                        color:report.saturationAnalysis.level==="High"?C.red:report.saturationAnalysis.level==="Medium"?C.amber:C.green,
                      }}>{report.saturationAnalysis.level} Saturation</span>
                      <div style={{fontSize:13,color:C.textMid,lineHeight:1.6}}>{report.saturationAnalysis.assessment}</div>
                    </div>
                  </div>
                  {report.saturationAnalysis.signals?.length>0&&(
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:8}}>
                      {report.saturationAnalysis.signals.map((sig,i)=>(
                        <div key={i} style={{
                          background:statusBg(sig.status),
                          border:"1px solid "+statusBorder(sig.status),
                          borderRadius:7,padding:"10px 12px",
                          display:"flex",alignItems:"flex-start",gap:8,
                        }}>
                          <div style={{width:6,height:6,borderRadius:"50%",background:statusColor(sig.status),flexShrink:0,marginTop:4,boxShadow:"0 0 5px "+statusColor(sig.status)}}/>
                          <div style={{fontSize:12,color:C.textMid,lineHeight:1.5}}>{sig.signal}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
 
            {/* ── 7. QUICK WINS ── */}
            {report.quickWins?.length>0&&(
              <div style={{marginBottom:14}}>
                <SectionHeader tag="QUICK WINS" title="Act on these immediately." sub="High-impact actions you can take this week."/>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:10}}>
                  {report.quickWins.map((win,i)=>(
                    <div key={i} className="card" style={{background:C.s1,border:"1px solid "+C.border,borderRadius:10,padding:"16px 18px"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,flexWrap:"wrap",gap:6}}>
                        <div style={{display:"flex",gap:6}}>
                          <span style={{fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:99,background:"rgba(61,201,138,0.08)",border:"1px solid rgba(61,201,138,0.22)",color:C.green}}>{win.impact} Impact</span>
                          <span style={{fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:99,background:C.s2,border:"1px solid "+C.border,color:C.textMid}}>{win.effort} Effort</span>
                        </div>
                        <span style={{fontFamily:C.mono,fontSize:9.5,color:C.muted}}>{win.timeframe}</span>
                      </div>
                      <div style={{fontSize:13.5,color:C.textHi,fontWeight:600,lineHeight:1.4}}>{win.action}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
 
            {/* ── 8. LONG-TERM STRATEGY ── */}
            {report.longTermStrategy?.length>0&&(
              <div style={{marginBottom:14}}>
                <SectionHeader tag="LONG-TERM STRATEGY" title="Consulting-grade strategic moves." sub="Where to take your business over the next 12 months."/>
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  {report.longTermStrategy.map((move,i)=>(
                    <div key={i} className="card" style={{background:C.s1,border:"1px solid "+C.border,borderRadius:10,padding:"16px 20px",display:"flex",alignItems:"flex-start",gap:14}}>
                      <div style={{fontFamily:C.mono,fontSize:11,color:C.muted,flexShrink:0,marginTop:2,minWidth:80}}>{move.timeframe}</div>
                      <div style={{width:1,alignSelf:"stretch",background:C.border,flexShrink:0}}/>
                      <div style={{flex:1}}>
                        <div style={{fontFamily:C.font,fontWeight:700,fontSize:14,color:C.textHi,marginBottom:6}}>{move.move}</div>
                        <div style={{fontSize:12.5,color:C.text,lineHeight:1.65}}>{move.rationale}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
 
            {/* ── 9. ACTION TIMELINE ── */}
            {report.actionTimeline?.length>0&&(
              <div style={{marginBottom:14}}>
                <SectionHeader tag="ACTION TIMELINE" title="Your execution roadmap."/>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:10}}>
                  {report.actionTimeline.map((phase,i)=>(
                    <div key={i} className="card" style={{background:C.s1,border:"1px solid "+C.border,borderRadius:10,padding:"18px 18px"}}>
                      <div style={{fontSize:8.5,letterSpacing:2,color:C.cyanDim,fontWeight:700,marginBottom:5}}>{phase.phase}</div>
                      <div style={{fontFamily:C.mono,fontSize:11,color:C.muted,marginBottom:8}}>{phase.timeframe}</div>
                      <div style={{fontFamily:C.font,fontWeight:700,fontSize:14,color:C.textHi,marginBottom:12}}>{phase.focus}</div>
                      <div style={{display:"flex",flexDirection:"column",gap:7}}>
                        {phase.actions?.map((action,j)=>(
                          <div key={j} style={{display:"flex",alignItems:"flex-start",gap:9}}>
                            <div style={{width:5,height:5,borderRadius:"50%",background:C.cyan,flexShrink:0,marginTop:4,boxShadow:"0 0 5px "+C.cyan}}/>
                            <div style={{fontSize:12,color:C.textMid,lineHeight:1.5}}>{action}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
 
          </div>
        )}
      </div>
    </>
  );
}
 