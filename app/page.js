'use client'
// app/page.js — EXRAY v5 — Final Production Build
 
import Link from 'next/link'
import { useState, useEffect } from 'react'
 
const T = {
  ice:      '#7DD3F0',
  iceDim:   'rgba(125,211,240,0.45)',
  iceFaint: 'rgba(125,211,240,0.06)',
  bg:       '#060A0E',
  s1:       '#0A0F16',
  s2:       '#0D1420',
  s3:       '#101820',
  s4:       '#131C26',
  border:   'rgba(255,255,255,0.055)',
  borderA:  'rgba(125,211,240,0.16)',
  text:     '#7A8FA0',
  textMid:  '#A8BCCB',
  textHi:   '#E4EEF5',
  muted:    '#2A3A4A',
  green:    '#4ADE80',
  amber:    '#FCD34D',
  red:      '#F87171',
  font:     "'Inter', system-ui, sans-serif",
  mono:     "'JetBrains Mono', monospace",
}
 
const compareRows = [
  { feature: 'Shop competitor spy',       exray: '✓', erank: '✓', marma: '✓'        },
  { feature: 'Keyword difficulty score',  exray: '✓', erank: '✗', marma: '✗'        },
  { feature: 'Pricing strategy analysis', exray: '✓', erank: '✗', marma: '✗'        },
  { feature: 'No data padding',           exray: '✓', erank: '–', marma: '–'        },
  { feature: 'Beginner friendly UI',      exray: '✓', erank: '–', marma: '–'        },
  { feature: 'Price',                     exray: 'Free / $12', erank: '$10/mo', marma: '$19/mo' },
]
 
export default function LandingPage() {
  const [scrolled, setScrolled]   = useState(false)
  const [scanStep, setScanStep]   = useState(0)
  const [scanning, setScanning]   = useState(false)
  const [scanDone, setScanDone]   = useState(false)
 
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
 
  const runScan = () => {
    if (scanning || scanDone) return
    setScanning(true)
    setScanStep(0)
    ;[1, 2, 3, 4].forEach((s, i) =>
      setTimeout(() => {
        setScanStep(s)
        if (i === 3) { setScanning(false); setScanDone(true) }
      }, (i + 1) * 700)
    )
  }
 
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{background:${T.bg};color:${T.text};font-family:${T.font};-webkit-font-smoothing:antialiased}
        a{text-decoration:none;color:inherit}
        ::selection{background:rgba(125,211,240,0.12);color:${T.textHi}}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:rgba(125,211,240,0.1);border-radius:4px}
 
        .na{font-size:13px;color:${T.text};transition:color .15s;font-weight:400}
        .na:hover{color:${T.textHi}}
 
        .bi{display:inline-flex;align-items:center;gap:6px;padding:9px 22px;border-radius:6px;border:1px solid ${T.borderA};background:${T.iceFaint};color:${T.ice};font-size:13px;font-weight:500;transition:all .15s;cursor:pointer;font-family:${T.font}}
        .bi:hover{background:rgba(125,211,240,0.11);border-color:rgba(125,211,240,0.3)}
 
        .bo{display:inline-flex;align-items:center;padding:9px 20px;border-radius:6px;border:1px solid ${T.border};color:${T.text};font-size:13px;font-weight:400;transition:all .15s;cursor:pointer;font-family:${T.font}}
        .bo:hover{border-color:rgba(255,255,255,0.1);color:${T.textHi}}
 
        .lr{display:flex;align-items:center;gap:12px;padding:9px 14px;border-bottom:1px solid ${T.border};transition:background .1s}
        .lr:hover{background:rgba(255,255,255,0.012)}
        .lr:last-child{border-bottom:none}
 
        .fi{border-top:1px solid ${T.border};padding:36px 0}
 
        .cr td{transition:background .1s}
        .cr:hover td{background:rgba(255,255,255,0.012)!important}
 
        .pp{background:${T.s1};border:1px solid ${T.border};border-radius:12px;padding:32px 28px;transition:border-color .2s}
        .pp:hover{border-color:rgba(255,255,255,0.09)}
        .pp.ft{border-color:${T.borderA}}
 
        .ic{background:${T.s1};border:1px solid ${T.border};border-radius:10px;transition:border-color .2s}
        .ic:hover{border-color:rgba(255,255,255,0.09)}
 
        .scan-btn{width:100%;padding:11px;border-radius:6px;border:1px solid ${T.borderA};background:${T.iceFaint};color:${T.ice};font-size:13px;font-weight:600;cursor:pointer;font-family:${T.font};letter-spacing:0.5px;transition:all .15s}
        .scan-btn:hover{background:rgba(125,211,240,0.1)}
        .scan-btn:disabled{opacity:0.4;cursor:not-allowed}
 
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        .fade-in{animation:fadeIn .4s ease forwards}
 
        @media(max-width:820px){
          .ht{font-size:36px!important;letter-spacing:-1px!important}
          .nl{display:none!important}
          .hg{grid-template-columns:1fr!important}
          .tg{grid-template-columns:1fr!important}
          .sg{grid-template-columns:repeat(2,1fr)!important}
          .fg{grid-template-columns:1fr!important;gap:24px!important}
          .ig{grid-template-columns:1fr!important}
          .w{padding-left:20px!important;padding-right:20px!important}
          .si{border-right:none!important;border-bottom:1px solid ${T.border}}
          .sb{border-left:none!important;padding-left:0!important;margin-top:20px}
          .mock-hide{display:none!important}
        }
      `}</style>
 
      <div style={{background:T.bg}}>
 
        {/* ── NAV ── */}
        <nav style={{
          position:'sticky',top:0,zIndex:100,height:56,
          display:'flex',alignItems:'center',justifyContent:'space-between',
          padding:'0 48px',
          background:scrolled?'rgba(6,10,14,0.94)':'transparent',
          borderBottom:`1px solid ${scrolled?T.border:'transparent'}`,
          backdropFilter:scrolled?'blur(20px)':'none',
          transition:'all .25s',
        }}>
          <a href="/" style={{fontWeight:800,fontSize:16,letterSpacing:5,color:T.textHi}}>
            <span style={{color:T.ice}}>EX</span>RAY
          </a>
          <div className="nl" style={{display:'flex',alignItems:'center',gap:28}}>
            <a href="#intelligence" className="na">Intelligence</a>
            <a href="#compare"      className="na">Compare</a>
            <a href="#pricing"      className="na">Pricing</a>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <Link href="/login"  className="na" style={{marginRight:4}}>Log in</Link>
            <Link href="/signup" className="bi" style={{padding:'7px 16px',fontSize:12.5}}>Get started</Link>
          </div>
        </nav>
 
        {/* ── HERO ── */}
        <section className="w" style={{maxWidth:1100,margin:'0 auto',padding:'88px 48px 72px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:8,marginBottom:32}}>
            <span style={{width:5,height:5,borderRadius:'50%',background:T.ice,display:'inline-block'}}/>
            <span style={{fontSize:10.5,letterSpacing:2.5,color:T.iceDim,fontWeight:600}}>ETSY COMPETITOR INTELLIGENCE</span>
          </div>
 
          <div className="hg" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:64,alignItems:'start'}}>
            <div>
              <h1 className="ht" style={{fontWeight:800,fontSize:54,lineHeight:1.06,letterSpacing:-2,color:T.textHi,marginBottom:22}}>
                Know exactly<br/>why Etsy shops<br/><span style={{color:T.ice}}>win.</span>
              </h1>
              <p style={{fontSize:15.5,color:T.text,lineHeight:1.82,marginBottom:36,maxWidth:400}}>
                EXRAY decodes competitor pricing strategies, keyword difficulty, and listing intelligence — so you make data-driven decisions before you invest a single dollar.
              </p>
              <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:14}}>
                <Link href="/signup" className="bi" style={{padding:'11px 26px',fontSize:13.5,fontWeight:600}}>Start for free →</Link>
                <Link href="/login"  className="bo" style={{padding:'11px 22px',fontSize:13.5}}>Log in</Link>
              </div>
              <p style={{fontSize:11.5,color:T.muted,letterSpacing:0.3}}>No credit card · 5 free searches daily</p>
              <div style={{marginTop:40,paddingTop:28,borderTop:`1px solid ${T.border}`,display:'flex',gap:28,flexWrap:'wrap'}}>
                {[{num:'10s',label:'Time to insight'},{num:'$0',label:'To start'},{num:'100%',label:'Live data'}].map((s,i)=>(
                  <div key={i}>
                    <div style={{fontFamily:T.mono,fontSize:20,fontWeight:700,color:T.ice,letterSpacing:-0.5,lineHeight:1}}>{s.num}</div>
                    <div style={{fontSize:11,color:T.muted,marginTop:4}}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
 
            {/* Hero dashboard mockup */}
            <div style={{background:T.s1,border:`1px solid ${T.border}`,borderRadius:12,overflow:'hidden',boxShadow:'0 24px 60px rgba(0,0,0,0.55)'}}>
              <div style={{background:T.s3,borderBottom:`1px solid ${T.border}`,padding:'9px 14px',display:'flex',alignItems:'center',gap:6}}>
                {[0,1,2].map(i=><div key={i} style={{width:8,height:8,borderRadius:'50%',background:'rgba(255,255,255,0.07)'}}/>)}
                <div style={{fontFamily:T.mono,fontSize:9,color:T.muted,marginLeft:8}}>exray.app/dashboard · Keyword Research</div>
              </div>
              <div style={{padding:'14px'}}>
                <div style={{display:'flex',gap:6,marginBottom:12}}>
                  <div style={{flex:1,background:T.bg,border:`1px solid ${T.border}`,borderRadius:5,padding:'6px 10px',fontSize:10,color:T.textMid,fontFamily:T.mono}}>minimalist gold ring</div>
                  <div style={{background:T.iceFaint,border:`1px solid ${T.borderA}`,borderRadius:5,padding:'6px 12px',fontSize:10,color:T.ice,fontWeight:600}}>Search</div>
                </div>
                <div className="sg" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:6,marginBottom:10}}>
                  {[
                    {label:'AVG PRICE',val:'$2,217',color:T.textHi},
                    {label:'AVG RATING',val:'4.9★',color:T.amber},
                    {label:'RESULTS',val:'10',color:T.textHi},
                    {label:'DIFFICULTY',val:'Medium',badge:true},
                  ].map((s,i)=>(
                    <div key={i} style={{background:T.s2,border:`1px solid ${T.border}`,borderRadius:5,padding:'9px 10px'}}>
                      <div style={{fontSize:7,letterSpacing:2,color:T.iceDim,fontWeight:700,marginBottom:5}}>{s.label}</div>
                      {s.badge
                        ?<span style={{fontSize:8,fontWeight:700,padding:'2px 6px',borderRadius:99,background:'rgba(252,211,77,0.09)',border:'1px solid rgba(252,211,77,0.2)',color:T.amber}}>Medium</span>
                        :<div style={{fontFamily:T.mono,fontSize:13,fontWeight:700,color:s.color,letterSpacing:-0.5}}>{s.val}</div>
                      }
                    </div>
                  ))}
                </div>
                <div style={{background:T.s2,border:`1px solid ${T.border}`,borderRadius:6,padding:'10px 12px',marginBottom:8}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
                    <div style={{fontSize:9,fontWeight:600,color:T.textHi}}>Pricing Strategy</div>
                    <span style={{fontSize:7,fontWeight:700,letterSpacing:1,padding:'2px 7px',borderRadius:99,background:T.iceFaint,border:`1px solid ${T.borderA}`,color:T.ice}}>Premium-heavy</span>
                  </div>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:5}}>
                    {[{l:'LOW',v:'$25.50',c:T.textMid},{l:'MED',v:'$881',c:T.ice},{l:'AVG',v:'$2,217',c:T.textMid},{l:'HIGH',v:'$5,594',c:T.textHi}].map((p,i)=>(
                      <div key={i} style={{background:T.bg,border:`1px solid ${T.border}`,borderRadius:4,padding:'7px 8px'}}>
                        <div style={{fontSize:6,letterSpacing:1.5,color:T.muted,marginBottom:3}}>{p.l}</div>
                        <div style={{fontFamily:T.mono,fontSize:10,fontWeight:700,color:p.c}}>{p.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{background:T.s2,border:`1px solid ${T.border}`,borderRadius:6,overflow:'hidden'}}>
                  <div style={{padding:'8px 12px',borderBottom:`1px solid ${T.border}`,fontSize:9,fontWeight:600,color:T.textHi}}>Top Listings</div>
                  {[
                    {title:'14k Gold Initial Necklace — Dainty Personalized',shop:'CaitlynMinimalist',price:'$48.00',tag:'Premium-heavy',tc:T.ice,tb:T.iceFaint,tbo:T.borderA},
                    {title:'Custom Birthstone Ring · Sterling Silver',shop:'MignonandMignon',price:'$32.50',tag:null},
                    {title:'Personalized Name Necklace · Gold Fill',shop:'LunaAndSol',price:'$54.00',tag:null},
                  ].map((l,i)=>(
                    <div key={i} className="lr">
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:10,color:T.textMid,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{l.title}</div>
                        <div style={{fontSize:8,color:T.muted,marginTop:2}}>{l.shop} · <span style={{fontFamily:T.mono,color:T.iceDim}}>{l.price}</span></div>
                      </div>
                      {l.tag
                        ?<span style={{fontSize:7,fontWeight:700,padding:'2px 6px',borderRadius:99,background:l.tb,border:`1px solid ${l.tbo}`,color:l.tc,flexShrink:0}}>{l.tag}</span>
                        :<span style={{fontSize:7,color:T.muted,border:`1px solid ${T.border}`,borderRadius:3,padding:'2px 6px',flexShrink:0}}>View →</span>
                      }
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
 
        {/* ── SIGNATURE: X-RAY SCAN ── */}
        <section className="w" id="intelligence" style={{maxWidth:1100,margin:'0 auto',padding:'0 48px 96px',borderTop:`1px solid ${T.border}`}}>
          <div style={{paddingTop:80,marginBottom:56}}>
            <div style={{fontSize:10.5,letterSpacing:3,color:T.iceDim,fontWeight:600,marginBottom:14}}>SIGNATURE INTELLIGENCE</div>
            <h2 style={{fontWeight:800,fontSize:40,color:T.textHi,letterSpacing:-1.2,lineHeight:1.1,marginBottom:16,maxWidth:540}}>
              Watch EXRAY decode a niche in real time.
            </h2>
            <p style={{fontSize:15,color:T.text,lineHeight:1.8,maxWidth:480}}>
              This is what happens when you search "minimalist ring" — EXRAY surfaces what took successful sellers months to figure out manually.
            </p>
          </div>
 
          <div className="hg" style={{display:'grid',gridTemplateColumns:'300px 1fr',gap:16}}>
            <div style={{background:T.s1,border:`1px solid ${T.border}`,borderRadius:10,padding:'20px',display:'flex',flexDirection:'column',gap:10}}>
              <div style={{fontSize:9,letterSpacing:2,color:T.iceDim,fontWeight:700,marginBottom:4}}>INTELLIGENCE SCAN</div>
              <div style={{background:T.bg,border:`1px solid ${T.border}`,borderRadius:6,padding:'9px 12px'}}>
                <div style={{fontSize:8,color:T.muted,marginBottom:3}}>TARGET KEYWORD</div>
                <div style={{fontFamily:T.mono,fontSize:12,color:T.textHi,fontWeight:600}}>minimalist ring</div>
              </div>
              <div style={{background:T.bg,border:`1px solid ${T.border}`,borderRadius:6,padding:'9px 12px'}}>
                <div style={{fontSize:8,color:T.muted,marginBottom:3}}>SCAN DEPTH</div>
                <div style={{fontFamily:T.mono,fontSize:12,color:T.textHi,fontWeight:600}}>Top 10 listings</div>
              </div>
              <button onClick={runScan} disabled={scanning} className="scan-btn" style={{marginTop:4}}>
                {scanning?'● SCANNING...' : scanDone?'✓ SCAN COMPLETE' : '→ RUN X-RAY SCAN'}
              </button>
              <div style={{display:'flex',flexDirection:'column',gap:7,marginTop:4}}>
                {[
                  {step:1,label:'Fetching live listings'},
                  {step:2,label:'Extracting pricing data'},
                  {step:3,label:'Analyzing competition'},
                  {step:4,label:'Generating intelligence'},
                ].map(s=>(
                  <div key={s.step} style={{display:'flex',alignItems:'center',gap:8,opacity:scanStep>=s.step?1:0.22,transition:'opacity .3s'}}>
                    <div style={{width:5,height:5,borderRadius:'50%',background:scanStep>=s.step?T.ice:T.muted,flexShrink:0,...(scanStep===s.step&&scanning?{animation:'pulse 1s infinite'}:{})}}/>
                    <div style={{fontFamily:T.mono,fontSize:9.5,color:scanStep>=s.step?T.textMid:T.muted}}>{s.label}</div>
                    {scanStep>s.step&&<div style={{marginLeft:'auto',fontSize:9,color:T.ice}}>✓</div>}
                  </div>
                ))}
              </div>
            </div>
 
            <div style={{background:T.s1,border:`1px solid ${T.border}`,borderRadius:10,overflow:'hidden',minHeight:320}}>
              {!scanDone&&!scanning&&(
                <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%',flexDirection:'column',gap:12,minHeight:320}}>
                  <div style={{fontSize:28,opacity:0.1}}>⬡</div>
                  <div style={{fontSize:12.5,color:T.muted}}>Run a scan to see intelligence results</div>
                </div>
              )}
              {(scanning||scanDone)&&(
                <div style={{padding:'20px'}}>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10,marginBottom:10}}>
                    {[
                      {label:'NICHE SATURATION',val:'High',color:T.red,sub:'Competitive space',visible:1},
                      {label:'OPPORTUNITY SCORE',val:'6.4/10',color:T.amber,sub:'Medium opportunity',visible:1},
                      {label:'PRICING WINDOW',val:'$28–$95',color:T.ice,sub:'Optimal entry range',visible:2},
                      {label:'STRATEGY',val:'Premium-heavy',color:T.ice,sub:'High-end dominates',visible:2},
                    ].map((c,i)=>(
                      <div key={i} style={{background:T.s2,border:`1px solid ${T.border}`,borderRadius:7,padding:'12px 14px',opacity:scanStep>=c.visible?1:0.12,transition:'opacity .4s'}}>
                        <div style={{fontSize:7.5,letterSpacing:2,color:T.iceDim,fontWeight:700,marginBottom:6}}>{c.label}</div>
                        <div style={{fontFamily:T.mono,fontSize:16,fontWeight:700,color:c.color,letterSpacing:-0.3,marginBottom:2}}>{c.val}</div>
                        <div style={{fontSize:10,color:T.muted}}>{c.sub}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{background:T.s2,border:`1px solid ${T.border}`,borderRadius:7,padding:'12px 14px',marginBottom:10,opacity:scanStep>=3?1:0.12,transition:'opacity .4s'}}>
                    <div style={{fontSize:8,letterSpacing:2,color:T.iceDim,fontWeight:700,marginBottom:9}}>COMPETITION BREAKDOWN</div>
                    {[
                      {kw:'minimalist gold ring',  diff:'Hard',   dc:T.red},
                      {kw:'dainty ring silver',    diff:'Medium', dc:T.amber},
                      {kw:'stacking ring set',     diff:'Medium', dc:T.amber},
                      {kw:'thin band ring custom', diff:'Easy',   dc:T.green},
                    ].map((k,i)=>(
                      <div key={i} style={{display:'flex',alignItems:'center',gap:8,padding:'6px 0',borderBottom:i<3?`1px solid ${T.border}`:'none'}}>
                        <div style={{fontFamily:T.mono,fontSize:10,color:T.textMid,flex:1}}>{k.kw}</div>
                        <span style={{fontSize:8,fontWeight:700,padding:'2px 7px',borderRadius:99,background:'rgba(0,0,0,0.3)',color:k.dc}}>{k.diff}</span>
                      </div>
                    ))}
                  </div>
                  {scanDone&&(
                    <div className="fade-in" style={{background:'rgba(125,211,240,0.04)',border:`1px solid ${T.borderA}`,borderRadius:7,padding:'14px'}}>
                      <div style={{fontSize:8,letterSpacing:2,color:T.ice,fontWeight:700,marginBottom:8}}>EXRAY RECOMMENDATION</div>
                      <p style={{fontSize:12,color:T.textMid,lineHeight:1.75}}>
                        Enter with <span style={{color:T.textHi,fontWeight:600}}>"thin band ring custom"</span> — Easy difficulty, medium volume. Price at <span style={{color:T.ice,fontWeight:600}}>$38–$62</span> to avoid the race-to-bottom cluster. Avoid "minimalist gold ring" until you have 50+ reviews.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
 
        {/* ── FEATURES — editorial ── */}
        <section className="w" style={{maxWidth:1100,margin:'0 auto',padding:'0 48px 96px',borderTop:`1px solid ${T.border}`}}>
          <div style={{paddingTop:80,display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:64,gap:48,flexWrap:'wrap'}}>
            <div>
              <div style={{fontSize:10.5,letterSpacing:3,color:T.iceDim,fontWeight:600,marginBottom:14}}>CAPABILITIES</div>
              <h2 style={{fontWeight:800,fontSize:38,color:T.textHi,letterSpacing:-1.2,lineHeight:1.1,maxWidth:380}}>
                Built for sellers who research before they list.
              </h2>
            </div>
            <p style={{fontSize:15,color:T.text,lineHeight:1.82,maxWidth:360,paddingTop:36}}>
              Every feature in EXRAY answers a question serious sellers ask before investing in a new product line.
            </p>
          </div>
          {[
            {num:'01',label:'SHOP SPY',title:'See the full picture of any competitor.',desc:'Enter any Etsy shop name or URL. EXRAY returns their top listings, complete pricing distribution, and decodes their strategy — Premium-heavy, Race to bottom, or Tight cluster.',detail:['Min · Median · Average · Max breakdown','Strategy classification badge','Direct links to every listing','Works on any public Etsy shop']},
            {num:'02',label:'KEYWORD RESEARCH',title:'Know the battlefield before you enter.',desc:"Search any keyword. See average pricing across top results, competition density, and a difficulty score. Stop listing into keywords you can't win.",detail:['Easy / Medium / Hard difficulty score','Average price across top 10 results','Competition level assessment','Pricing strategy of the keyword niche']},
            {num:'03',label:'PRICING STRATEGY',title:"Decode the niche. Price with confidence.",desc:"EXRAY automatically classifies every niche. Know whether you're entering a premium market, a race to the bottom, or a tight pricing cluster — before you list.",detail:['Automated strategy classification','Statistical pricing distribution','Based on live listing data','Min / Median / Average / Max breakdown']},
          ].map((f,i)=>(
            <div key={i} className="fi fg" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:64}}>
              <div>
                <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:18}}>
                  <span style={{fontFamily:T.mono,fontSize:10,color:T.muted,fontWeight:600}}>{f.num}</span>
                  <span style={{width:1,height:12,background:T.border,display:'inline-block'}}/>
                  <span style={{fontSize:10,letterSpacing:2.5,color:T.iceDim,fontWeight:600}}>{f.label}</span>
                </div>
                <h3 style={{fontWeight:700,fontSize:21,color:T.textHi,letterSpacing:-0.4,lineHeight:1.25,marginBottom:14}}>{f.title}</h3>
                <p style={{fontSize:14.5,color:T.text,lineHeight:1.82}}>{f.desc}</p>
              </div>
              <div style={{paddingTop:4}}>
                <div style={{background:T.s1,border:`1px solid ${T.border}`,borderRadius:8,overflow:'hidden'}}>
                  {f.detail.map((d,j)=>(
                    <div key={j} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 18px',borderBottom:j<f.detail.length-1?`1px solid ${T.border}`:'none'}}>
                      <span style={{color:T.ice,fontWeight:700,fontSize:11,flexShrink:0}}>✓</span>
                      <span style={{fontSize:13.5,color:T.textMid,lineHeight:1.5}}>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>
 
        {/* ── MARKET REALITY — insight cards (NO fake testimonials) ── */}
        <section className="w" style={{maxWidth:1100,margin:'0 auto',padding:'0 48px 96px',borderTop:`1px solid ${T.border}`}}>
          <div style={{paddingTop:80,marginBottom:64}}>
            <div style={{fontSize:10.5,letterSpacing:3,color:T.iceDim,fontWeight:600,marginBottom:14}}>MARKET REALITY</div>
            <div className="hg" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:64,alignItems:'end'}}>
              <h2 style={{fontWeight:800,fontSize:38,color:T.textHi,letterSpacing:-1.2,lineHeight:1.1}}>
                Why most Etsy<br/>research fails.
              </h2>
              <p style={{fontSize:15,color:T.text,lineHeight:1.82,paddingBottom:4}}>
                Most tools give you data. Very few give you intelligence. There is a significant difference between knowing a keyword exists and knowing whether you can actually win it.
              </p>
            </div>
          </div>
 
          {/* Large dominant card */}
          <div className="ic hg" style={{padding:'36px 40px',marginBottom:14,display:'grid',gridTemplateColumns:'1fr 1fr',gap:48}}>
            <div>
              <div style={{fontSize:9,letterSpacing:2.5,color:T.iceDim,fontWeight:700,marginBottom:18}}>INSIGHT 01</div>
              <h3 style={{fontWeight:700,fontSize:22,color:T.textHi,letterSpacing:-0.4,lineHeight:1.2,marginBottom:16}}>
                High search volume does not mean opportunity.
              </h3>
              <p style={{fontSize:14,color:T.text,lineHeight:1.82}}>
                A keyword with 50,000 monthly searches dominated by shops with 10,000+ reviews is not an opportunity. It is a trap. Volume without context is noise.
              </p>
            </div>
            <div className="sb" style={{borderLeft:`1px solid ${T.border}`,paddingLeft:48}}>
              <div style={{fontSize:12,fontWeight:600,color:T.textMid,marginBottom:16}}>What actually determines opportunity:</div>
              {[
                {label:'Competition density',    desc:'How many strong listings already own this keyword'},
                {label:'Pricing pressure',       desc:'Whether the niche competes on price or value'},
                {label:'Listing quality ceiling',desc:'How hard it is to out-rank the top results'},
                {label:'Market gap detection',   desc:'Where demand exists but supply is weak'},
              ].map((item,i)=>(
                <div key={i} style={{display:'flex',gap:12,alignItems:'flex-start',padding:'10px 0',borderBottom:i<3?`1px solid ${T.border}`:'none'}}>
                  <span style={{color:T.ice,fontWeight:700,fontSize:12,marginTop:1,flexShrink:0}}>→</span>
                  <div>
                    <div style={{fontSize:13,fontWeight:600,color:T.textHi,marginBottom:2}}>{item.label}</div>
                    <div style={{fontSize:12,color:T.muted,lineHeight:1.6}}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
 
          {/* Two medium cards */}
          <div className="tg" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
            <div className="ic" style={{padding:'28px 32px'}}>
              <div style={{fontSize:9,letterSpacing:2.5,color:T.iceDim,fontWeight:700,marginBottom:16}}>INSIGHT 02</div>
              <h3 style={{fontWeight:700,fontSize:19,color:T.textHi,letterSpacing:-0.3,lineHeight:1.25,marginBottom:14}}>
                Most sellers spend months in the wrong niche.
              </h3>
              <p style={{fontSize:13.5,color:T.text,lineHeight:1.8,marginBottom:20}}>
                The average Etsy seller tests a niche for 3–6 months before realizing it was unwinnable from day one. The signals were always there — hidden in competitor pricing and listing data.
              </p>
              <div style={{borderTop:`1px solid ${T.border}`,paddingTop:16}}>
                <div style={{fontSize:13,color:T.textMid,lineHeight:1.7}}>
                  <span style={{color:T.ice,fontWeight:600}}>EXRAY identifies</span> niche saturation, pricing clusters, and competition density before you invest time, money, or inventory.
                </div>
              </div>
            </div>
            <div className="ic" style={{padding:'28px 32px'}}>
              <div style={{fontSize:9,letterSpacing:2.5,color:T.iceDim,fontWeight:700,marginBottom:16}}>INSIGHT 03</div>
              <h3 style={{fontWeight:700,fontSize:19,color:T.textHi,letterSpacing:-0.3,lineHeight:1.25,marginBottom:14}}>
                Pricing is not a number. It is a strategic position.
              </h3>
              <p style={{fontSize:13.5,color:T.text,lineHeight:1.8,marginBottom:20}}>
                Sellers who price by instinct lose to sellers who price by data. Every niche has a pricing structure — knowing which one you are entering changes everything.
              </p>
              <div style={{borderTop:`1px solid ${T.border}`,paddingTop:16,display:'flex',flexDirection:'column',gap:8}}>
                {[
                  {s:'Premium-heavy', c:T.ice,   d:'High-end listings dominate. Enter at value.'},
                  {s:'Race to bottom',c:T.red,   d:'Price war. Thin margins. Avoid unless scaled.'},
                  {s:'Tight cluster', c:T.green, d:'Everyone prices similarly. Differentiate on product.'},
                ].map((x,i)=>(
                  <div key={i} style={{display:'flex',gap:8,alignItems:'flex-start'}}>
                    <span style={{fontSize:10,fontWeight:700,color:x.c,flexShrink:0,marginTop:1}}>{x.s}</span>
                    <span style={{fontSize:11,color:T.muted,lineHeight:1.5}}>— {x.d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
 
          {/* Bottom editorial statement */}
          <div className="ic hg" style={{padding:'28px 40px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:48,alignItems:'center'}}>
            <div>
              <div style={{fontSize:9,letterSpacing:2.5,color:T.iceDim,fontWeight:700,marginBottom:14}}>INSIGHT 04</div>
              <h3 style={{fontWeight:700,fontSize:19,color:T.textHi,letterSpacing:-0.3,lineHeight:1.25}}>
                The difference between data and intelligence is knowing what to do next.
              </h3>
            </div>
            <div className="sb" style={{borderLeft:`1px solid ${T.border}`,paddingLeft:48}}>
              <p style={{fontSize:14,color:T.text,lineHeight:1.82}}>
                eRank and Marmalead give you keyword data. EXRAY tells you whether the keyword is worth targeting, what to price if you enter, and which competitors have exploitable weaknesses. That is the difference between a research tool and an intelligence platform.
              </p>
            </div>
          </div>
        </section>
 
        {/* ── COMPARE ── */}
        <section className="w" id="compare" style={{maxWidth:1100,margin:'0 auto',padding:'0 48px 96px',borderTop:`1px solid ${T.border}`}}>
          <div style={{paddingTop:80,marginBottom:56}}>
            <div style={{fontSize:10.5,letterSpacing:3,color:T.iceDim,fontWeight:600,marginBottom:14}}>VS COMPETITORS</div>
            <h2 style={{fontWeight:800,fontSize:38,color:T.textHi,letterSpacing:-1.2,lineHeight:1.1}}>
              Why sellers switch<br/>to EXRAY.
            </h2>
          </div>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:13.5}}>
            <thead>
              <tr>
                <th style={{padding:'12px 20px',textAlign:'left',borderBottom:`1px solid ${T.border}`,fontSize:10,letterSpacing:2,color:T.muted,fontWeight:600}}>Feature</th>
                <th style={{padding:'12px 20px',textAlign:'center',borderBottom:`1px solid ${T.border}`,fontSize:10,letterSpacing:2,color:T.ice,fontWeight:700,background:T.iceFaint,borderLeft:`1px solid ${T.border}`,borderRight:`1px solid ${T.border}`}}>EXRAY</th>
                <th style={{padding:'12px 20px',textAlign:'center',borderBottom:`1px solid ${T.border}`,fontSize:10,letterSpacing:2,color:T.muted,fontWeight:600}}>eRank</th>
                <th style={{padding:'12px 20px',textAlign:'center',borderBottom:`1px solid ${T.border}`,fontSize:10,letterSpacing:2,color:T.muted,fontWeight:600}}>Marmalead</th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map((r,i)=>(
                <tr key={i} className="cr">
                  <td style={{padding:'13px 20px',borderBottom:`1px solid ${T.border}`,color:T.textMid}}>{r.feature}</td>
                  <td style={{padding:'13px 20px',borderBottom:`1px solid ${T.border}`,textAlign:'center',background:T.iceFaint,borderLeft:`1px solid ${T.border}`,borderRight:`1px solid ${T.border}`,color:r.exray==='✓'?T.ice:T.textHi,fontWeight:r.exray==='✓'?700:500}}>{r.exray}</td>
                  <td style={{padding:'13px 20px',borderBottom:`1px solid ${T.border}`,textAlign:'center',color:r.erank==='✓'?T.green:T.muted}}>{r.erank}</td>
                  <td style={{padding:'13px 20px',borderBottom:`1px solid ${T.border}`,textAlign:'center',color:r.marma==='✓'?T.green:T.muted}}>{r.marma}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{fontSize:11,color:T.muted,marginTop:14}}>* Feature comparison based on publicly available plans as of 2025.</p>
        </section>
 
        {/* ── PRICING ── */}
        <section className="w" id="pricing" style={{maxWidth:1100,margin:'0 auto',padding:'0 48px 96px',borderTop:`1px solid ${T.border}`}}>
          <div style={{paddingTop:80,marginBottom:56}}>
            <div style={{fontSize:10.5,letterSpacing:3,color:T.iceDim,fontWeight:600,marginBottom:14}}>PRICING</div>
            <h2 style={{fontWeight:800,fontSize:38,color:T.textHi,letterSpacing:-1.2,lineHeight:1.1}}>Simple.<br/>No surprises.</h2>
          </div>
          <div className="tg" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,maxWidth:640}}>
            <div className="pp">
              <div style={{fontSize:13,color:T.textMid,marginBottom:24}}>Free</div>
              <div style={{fontFamily:T.mono,fontSize:38,fontWeight:700,color:T.textHi,letterSpacing:-1.5,lineHeight:1,marginBottom:6}}>$0</div>
              <div style={{fontSize:12.5,color:T.muted,marginBottom:24,paddingBottom:20,borderBottom:`1px solid ${T.border}`}}>5 searches per day. No card.</div>
              {['Shop Spy','Keyword Research','Pricing Strategy','Difficulty Score'].map(f=>(
                <div key={f} style={{display:'flex',gap:10,alignItems:'center',marginBottom:9}}>
                  <span style={{color:T.ice,fontWeight:600,fontSize:12}}>✓</span>
                  <span style={{fontSize:13.5,color:T.text}}>{f}</span>
                </div>
              ))}
              <Link href="/signup" className="bo" style={{display:'block',textAlign:'center',marginTop:24,padding:'10px'}}>Get started</Link>
            </div>
            <div className="pp ft">
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24}}>
                <div style={{fontSize:13,color:T.textMid}}>Pro</div>
                <span style={{fontSize:8.5,fontWeight:700,letterSpacing:1.5,padding:'3px 9px',borderRadius:99,background:T.iceFaint,border:`1px solid ${T.borderA}`,color:T.ice}}>POPULAR</span>
              </div>
              <div style={{fontFamily:T.mono,fontSize:38,fontWeight:700,color:T.ice,letterSpacing:-1.5,lineHeight:1,marginBottom:6}}>
                $12<span style={{fontSize:14,color:T.muted,fontWeight:400,letterSpacing:0}}>/mo</span>
              </div>
              <div style={{fontSize:12.5,color:T.muted,marginBottom:24,paddingBottom:20,borderBottom:`1px solid ${T.border}`}}>Unlimited searches.</div>
              {['Unlimited searches','Priority data','All free features','Early access'].map(f=>(
                <div key={f} style={{display:'flex',gap:10,alignItems:'center',marginBottom:9}}>
                  <span style={{color:T.ice,fontWeight:600,fontSize:12}}>✓</span>
                  <span style={{fontSize:13.5,color:T.text}}>{f}</span>
                </div>
              ))}
              <Link href="/signup" className="bi" style={{display:'block',textAlign:'center',marginTop:24,padding:'10px'}}>Start Pro →</Link>
            </div>
          </div>
        </section>
 
        {/* ── CTA ── */}
        <section className="w" style={{maxWidth:1100,margin:'0 auto',padding:'0 48px 96px'}}>
          <div style={{background:T.s1,border:`1px solid ${T.border}`,borderRadius:12,padding:'80px 64px',textAlign:'center'}}>
            <div style={{fontSize:10.5,letterSpacing:3,color:T.iceDim,fontWeight:600,marginBottom:20}}>START TODAY</div>
            <h2 style={{fontWeight:800,fontSize:44,color:T.textHi,letterSpacing:-1.5,lineHeight:1.08,maxWidth:480,margin:'0 auto 18px'}}>
              Stop guessing.<br/>Start knowing.
            </h2>
            <p style={{fontSize:15,color:T.text,maxWidth:360,margin:'0 auto 36px',lineHeight:1.75}}>
              Join Etsy sellers who research before they list.
            </p>
            <Link href="/signup" className="bi" style={{padding:'12px 30px',fontSize:14,fontWeight:600}}>Start for free →</Link>
            <p style={{fontSize:11.5,color:T.muted,marginTop:16}}>No credit card · 5 free searches daily · Cancel anytime</p>
          </div>
        </section>
 
        {/* ── FOOTER ── */}
        <footer className="w" style={{borderTop:`1px solid ${T.border}`,padding:'26px 48px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{fontWeight:800,fontSize:13,letterSpacing:5,color:T.textHi}}><span style={{color:T.ice}}>EX</span>RAY</div>
          <div style={{fontSize:12,color:T.muted}}>© 2025 EXRAY. Built for Etsy sellers.</div>
          <div style={{display:'flex',gap:22}}>
            <a href="#" className="na" style={{fontSize:12}}>Privacy</a>
            <a href="#" className="na" style={{fontSize:12}}>Terms</a>
          </div>
        </footer>
 
      </div>
    </>
  )
}
 