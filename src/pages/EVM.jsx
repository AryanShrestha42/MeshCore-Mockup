import React, { useState } from 'react';
import { evmData } from '../data/mockData';
import {
  ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, BarChart, Bar, Legend, Cell
} from 'recharts';

const fmt = v => `$${(v/1000000).toFixed(2)}M`;
const fmtSign = v => v >= 0 ? `+$${(v/1000).toFixed(0)}k` : `-$${(Math.abs(v)/1000).toFixed(0)}k`;

const BAC   = 4200000;
const PV14  = 2450000;
const EV14  = 2100000;
const AC14  = 2380000;
const CPI   = EV14 / AC14;
const SPI   = EV14 / PV14;
const SV    = EV14 - PV14;
const CV    = EV14 - AC14;
const TCPI  = (BAC - EV14) / (BAC - AC14);
const EAC1  = BAC / CPI;
const EAC2  = AC14 + (BAC - EV14);
const EAC3  = AC14 + (BAC - EV14) / (CPI * SPI);
const ETC   = EAC1 - AC14;
const VAC   = BAC - EAC1;
const AVAC  = VAC + 126000 + 150000;

function MetricTile({ label, value, sub, color, size = 'md', highlight }) {
  const sizes = { sm: { v: 15, l: 9 }, md: { v: 20, l: 11 }, lg: { v: 28, l: 11 } };
  const s = sizes[size];
  return (
    <div style={{
      background: highlight ? `${color}10` : '#fff',
      border: `1px solid ${highlight ? color + '44' : '#DFE1E6'}`,
      borderRadius: 6, padding: '12px 14px',
    }}>
      <div style={{ fontSize: s.l, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#97A0AF', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: s.v, fontWeight: 800, color: color || '#172B4D' }}>{value}</div>
      {sub && <div style={{ fontSize: 10, color: '#97A0AF', marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:'#fff', border:'1px solid #DFE1E6', borderRadius:6, padding:'10px 14px', boxShadow:'0 4px 12px rgba(9,30,66,0.15)', fontSize:12 }}>
      <div style={{ fontWeight:700, color:'#172B4D', marginBottom:6 }}>Week {label}</div>
      {payload.map((p, i) => p.value && (
        <div key={i} style={{ display:'flex', gap:8, alignItems:'center', marginBottom:3 }}>
          <div style={{ width:10, height:3, background:p.color, borderRadius:2 }} />
          <span style={{ color:'#6B778C' }}>{p.name}:</span>
          <span style={{ fontWeight:700, color:'#172B4D' }}>{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

const eacComparison = [
  { name:'BAC', value:4200000, color:'#0052CC' },
  { name:'EAC M1\n(default)', value:EAC1, color:'#DE350B' },
  { name:'EAC M2\n(1-time)', value:EAC2, color:'#FF8B00' },
  { name:'EAC M3\n(worst)', value:EAC3, color:'#AE2A19' },
];

const spiCpiQuad = [
  { quad:'SPI↑ CPI↑', label:'Ahead + Under budget', color:'#00875A', bg:'#E3FCEF', desc:'Best position. Verify scope not deferred.' },
  { quad:'SPI↓ CPI↑', label:'Behind + Under budget', color:'#0052CC', bg:'#DEEBFF', desc:'Check delay register for unnoticed compensable events.' },
  { quad:'SPI↑ CPI↓', label:'Ahead + Over budget', color:'#FF8B00', bg:'#FFFAE6', desc:'Investigate if acceleration was client-instructed.' },
  { quad:'SPI↓ CPI↓', label:'Behind + Over budget', color:'#DE350B', bg:'#FFEBE6', desc:'⚠️ CURRENT POSITION — EOT coverage check immediately.' },
];

export default function EVM() {
  return (
    <div className="page-enter" style={{ padding:'24px', display:'flex', flexDirection:'column', gap:20 }}>

      {/* Top metric tiles */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(8,1fr)', gap:10 }}>
        <MetricTile label="PV" value={fmt(PV14)} sub="Planned by W14" color="#6B778C" />
        <MetricTile label="EV" value={fmt(EV14)} sub="Budget earned" color="#0052CC" />
        <MetricTile label="AC" value={fmt(AC14)} sub="Actually spent" color="#253858" />
        <MetricTile label="SV" value={fmtSign(SV)} sub="EV − PV" color={SV>=0?'#00875A':'#DE350B'} highlight />
        <MetricTile label="CV" value={fmtSign(CV)} sub="EV − AC" color={CV>=0?'#00875A':'#DE350B'} highlight />
        <MetricTile label="SPI" value={SPI.toFixed(3)} sub="EV ÷ PV" color={SPI>=0.95?'#00875A':SPI>=0.85?'#FF8B00':'#DE350B'} highlight />
        <MetricTile label="CPI" value={CPI.toFixed(3)} sub="EV ÷ AC" color={CPI>=0.95?'#00875A':CPI>=0.85?'#FF8B00':'#DE350B'} highlight />
        <MetricTile label="TCPI" value={TCPI.toFixed(3)} sub="Required CPI" color={TCPI>1.1?'#DE350B':TCPI>1.0?'#FF8B00':'#00875A'} highlight />
      </div>

      {/* S-curves + EAC breakdown */}
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:16 }}>

        {/* S-Curves */}
        <div className="mc-card" style={{ padding:'16px 18px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:'#172B4D' }}>S-Curves — PV / AC / Forecast</div>
              <div style={{ fontSize:11, color:'#97A0AF' }}>BAC: {fmt(BAC)} · 24-week programme</div>
            </div>
            <div style={{ display:'flex', gap:12, fontSize:11 }}>
              {[['PV (Planned)','#0052CC'],['AC (Actual)','#FF8B00'],['Forecast','#DE350B']].map(([l,c]) => (
                <div key={l} style={{ display:'flex', alignItems:'center', gap:4 }}>
                  <div style={{ width:16, height:3, background:c, borderRadius:2 }} />
                  <span style={{ color:'#6B778C' }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={evmData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F4F5F7" />
              <XAxis dataKey="week" tick={{ fontSize:10, fill:'#97A0AF' }} label={{ value:'Week', position:'insideBottom', offset:-2, fontSize:10, fill:'#97A0AF' }} />
              <YAxis tickFormatter={v => `$${(v/1000000).toFixed(1)}M`} tick={{ fontSize:10, fill:'#97A0AF' }} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine x={14} stroke="#FF8B00" strokeDasharray="4 2" label={{ value:'Today W14', fill:'#FF8B00', fontSize:9 }} />
              <Area type="monotone" dataKey="pv" name="PV" stroke="#0052CC" fill="#DEEBFF" fillOpacity={0.3} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="ac" name="AC (Actual)" stroke="#FF8B00" strokeWidth={2.5} dot={false} connectNulls={false} />
              <Line type="monotone" dataKey="fc" name="Forecast" stroke="#DE350B" strokeWidth={2} dot={false} strokeDasharray="5 3" connectNulls />
            </ComposedChart>
          </ResponsiveContainer>
          <div style={{ background:'#FFEBE6', borderRadius:4, padding:'8px 12px', marginTop:10 }}>
            <span style={{ fontSize:11, fontWeight:700, color:'#DE350B' }}>
              Hockey-stick detected: Forecast curve assumes ${(121500/1000).toFixed(0)}k/week vs actual $
              {(106250/1000).toFixed(0)}k/week (+14%). Recovery plan required.
            </span>
          </div>
        </div>

        {/* EAC comparison */}
        <div className="mc-card" style={{ padding:'16px 18px' }}>
          <div style={{ fontSize:13, fontWeight:700, color:'#172B4D', marginBottom:4 }}>EAC — Three Methods</div>
          <div style={{ fontSize:11, color:'#97A0AF', marginBottom:14 }}>Method 1 is the default (CPI continues)</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={eacComparison} layout="vertical" barSize={18}>
              <XAxis type="number" tickFormatter={v=>`$${(v/1000000).toFixed(1)}M`} tick={{fontSize:9,fill:'#97A0AF'}} />
              <YAxis type="category" dataKey="name" tick={{fontSize:9,fill:'#6B778C'}} width={65} />
              <Tooltip formatter={v => fmt(v)} />
              <Bar dataKey="value" radius={[0,3,3,0]}>
                {eacComparison.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display:'flex', flexDirection:'column', gap:6, marginTop:14 }}>
            <Stat label="ETC (Estimate to Complete)" value={fmt(ETC)} color="#172B4D" />
            <Stat label="Gross VAC" value={fmtSign(VAC)} color={VAC<0?'#DE350B':'#00875A'} />
            <Stat label="Adjusted VAC (incl. EOT + Vars)" value={fmtSign(AVAC)} color={AVAC<0?'#DE350B':'#00875A'} bold />
            <div style={{ background:'#E3FCEF', borderRadius:4, padding:'6px 10px', marginTop:4 }}>
              <span style={{ fontSize:11, color:'#00875A', fontWeight:700 }}>Adjusted VAC is positive once $276k of pending claims are pursued</span>
            </div>
          </div>
        </div>
      </div>

      {/* SPI/CPI quadrant + TCPI */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
        <div className="mc-card" style={{ padding:'16px 18px' }}>
          <div style={{ fontSize:13, fontWeight:700, color:'#172B4D', marginBottom:14 }}>SPI/CPI — Four Combinations</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            {spiCpiQuad.map(q => (
              <div key={q.quad} style={{ background:q.bg, border:`1px solid ${q.color}30`, borderRadius:6, padding:'12px', position:'relative' }}>
                {q.quad === 'SPI↓ CPI↓' && (
                  <div style={{ position:'absolute', top:8, right:8, background:'#DE350B', color:'#fff', fontSize:9, fontWeight:700, padding:'2px 6px', borderRadius:10 }}>CURRENT</div>
                )}
                <div style={{ fontSize:13, fontWeight:800, color:q.color, marginBottom:4 }}>{q.quad}</div>
                <div style={{ fontSize:11, fontWeight:600, color:'#172B4D', marginBottom:4 }}>{q.label}</div>
                <div style={{ fontSize:10, color:'#6B778C' }}>{q.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mc-card" style={{ padding:'16px 18px' }}>
          <div style={{ fontSize:13, fontWeight:700, color:'#172B4D', marginBottom:4 }}>TCPI — Reality Check</div>
          <div style={{ fontSize:11, color:'#97A0AF', marginBottom:16 }}>To-Complete Performance Index = required future CPI</div>
          <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:16 }}>
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:11, color:'#97A0AF', marginBottom:4 }}>Current CPI</div>
              <div style={{ fontSize:32, fontWeight:800, color:'#DE350B' }}>{CPI.toFixed(3)}</div>
              <div style={{ fontSize:11, color:'#6B778C' }}>Actual performance</div>
            </div>
            <div style={{ flex:1, display:'flex', alignItems:'center', gap:4 }}>
              <div style={{ flex:1, height:2, background:'#DFE1E6' }} />
              <div style={{ fontSize:18, color:'#97A0AF' }}>→</div>
              <div style={{ flex:1, height:2, background:'#DE350B' }} />
            </div>
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:11, color:'#97A0AF', marginBottom:4 }}>Required TCPI</div>
              <div style={{ fontSize:32, fontWeight:800, color:'#DE350B' }}>{TCPI.toFixed(3)}</div>
              <div style={{ fontSize:11, color:'#6B778C' }}>To finish on budget</div>
            </div>
          </div>
          <div style={{ background:'#FFEBE6', borderRadius:4, padding:'10px 14px' }}>
            <div style={{ fontSize:12, fontWeight:700, color:'#DE350B', marginBottom:4 }}>Gap: {(TCPI - CPI).toFixed(3)} efficiency points</div>
            <div style={{ fontSize:11, color:'#6B778C' }}>
              Required TCPI ({TCPI.toFixed(3)}) exceeds current CPI ({CPI.toFixed(3)}) by {((TCPI/CPI-1)*100).toFixed(0)}%.
              Recovery to BAC is statistically unlikely. Pursue adjusted VAC via EOT and variation claims.
            </div>
          </div>
          <div style={{ marginTop:14 }}>
            <div style={{ fontSize:11, fontWeight:700, color:'#6B778C', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:8 }}>20% Rule Check</div>
            <div style={{ background:'#E3FCEF', border:'1px solid #00875A44', borderRadius:4, padding:'8px 12px' }}>
              <span style={{ fontSize:11, color:'#00875A', fontWeight:700 }}>✓ CPI at 20% completion was 1.06 (healthy). Current deterioration started W7.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, color, bold }) {
  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'7px 0', borderBottom:'1px solid #F4F5F7' }}>
      <span style={{ fontSize:12, color:'#6B778C' }}>{label}</span>
      <span style={{ fontSize:13, fontWeight: bold ? 800 : 700, color: color || '#172B4D' }}>{value}</span>
    </div>
  );
}
