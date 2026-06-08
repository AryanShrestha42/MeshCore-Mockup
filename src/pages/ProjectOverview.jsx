import React from 'react';
import { activeProject, eotClaims, variations, risks, sopaClaims } from '../data/mockData';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, DollarSign, FileText, Shield } from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const fmtK = v => v >= 1000000 ? `$${(v/1000000).toFixed(2)}M` : `$${(v/1000).toFixed(0)}k`;
const fmtSign = v => v >= 0 ? `+${fmtK(v)}` : `−${fmtK(Math.abs(v))}`;

function Gauge({ value, max = 1, good = true, label, sub }) {
  const pct = Math.min(value / max, 1);
  const r = 42, cx = 52, cy = 52;
  const circ = 2 * Math.PI * r;
  const dash = pct * circ * 0.75;
  const gap = circ * 0.75 - dash;
  const color = value >= 0.95 ? '#00875A' : value >= 0.85 ? '#FF8B00' : '#DE350B';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <svg width={104} height={72} viewBox="0 0 104 80">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#F4F5F7" strokeWidth={10}
          strokeDasharray={`${circ * 0.75} ${circ * 0.25}`}
          strokeDashoffset={circ * 0.125}
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={10}
          strokeDasharray={`${dash} ${gap + circ * 0.25}`}
          strokeDashoffset={circ * 0.125}
          strokeLinecap="round"
          className="gauge-ring"
        />
        <text x={cx} y={cy + 6} textAnchor="middle" fontSize={18} fontWeight={800} fill={color}>{value.toFixed(3)}</text>
      </svg>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#172B4D' }}>{label}</div>
        <div style={{ fontSize: 11, color: '#97A0AF' }}>{sub}</div>
      </div>
    </div>
  );
}

function PanelCard({ title, icon: Icon, color, children }) {
  return (
    <div className="mc-card" style={{ overflow: 'visible' }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid #F4F5F7', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 28, height: 28, background: `${color}18`, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={14} color={color} />
        </div>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#172B4D' }}>{title}</span>
      </div>
      <div style={{ padding: '16px 18px' }}>{children}</div>
    </div>
  );
}

function Stat({ label, value, color, sub }) {
  return (
    <div style={{ padding: '10px 0', borderBottom: '1px solid #F4F5F7' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: 12, color: '#6B778C' }}>{label}</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: color || '#172B4D' }}>{value}</span>
      </div>
      {sub && <div style={{ fontSize: 11, color: '#97A0AF', marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

const eacData = [
  { method: 'M1 (CPI)', value: 4762000, color: '#DE350B' },
  { method: 'M2 (1-time)', value: 4580000, color: '#FF8B00' },
  { method: 'M3 (Worst)', value: 5104000, color: '#DE350B' },
  { method: 'BAC', value: 4200000, color: '#0052CC' },
];

export default function ProjectOverview({ onNav }) {
  const p = activeProject;
  const tcpi = (4200000 - 2100000) / (4200000 - 2380000);

  return (
    <div className="page-enter" style={{ padding: '24px' }}>
      {/* Project header */}
      <div className="mc-card" style={{ padding: '18px 24px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <h1 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#172B4D' }}>{p.name}</h1>
            <span style={{ background: '#FFEBE6', color: '#DE350B', padding: '3px 10px', borderRadius: 12, fontSize: 11, fontWeight: 700 }}>● CRITICAL</span>
          </div>
          <div style={{ display: 'flex', gap: 20, fontSize: 12, color: '#6B778C' }}>
            <span>{p.code}</span>
            <span>Client: {p.client}</span>
            <span>PM: James Chen</span>
            <span>PC: {p.pcDate}</span>
            <span>LD: ${p.ldRate.toLocaleString()}/day</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#0052CC' }}>{fmtK(p.value)}</div>
            <div style={{ fontSize: 10, color: '#97A0AF', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Contract Value</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#DE350B' }}>W{p.currentWeek}/{p.totalWeeks}</div>
            <div style={{ fontSize: 10, color: '#97A0AF', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Current Week</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#FF8B00' }}>50%</div>
            <div style={{ fontSize: 10, color: '#97A0AF', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Complete</div>
          </div>
        </div>
      </div>

      {/* 4-panel grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

        {/* Panel 1 – Programme */}
        <PanelCard title="Programme" icon={TrendingUp} color="#0052CC">
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginBottom: 16 }}>
            <Gauge value={p.spi} label="SPI" sub="Schedule efficiency" />
            <div style={{ width: 1, background: '#F4F5F7' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'center' }}>
              <Stat label="TEAC" value="30.0 weeks" color="#DE350B" sub="vs 24w planned" />
              <Stat label="Forecast Overrun" value="6 weeks" color="#DE350B" />
              <Stat label="LD Exposure" value={`$${(6*5*p.ldRate).toLocaleString()}`} color="#DE350B" sub="6w × 5d × $4,500/d" />
              <Stat label="Critical Activities" value="14 of 31" />
              <Stat label="Near-Critical (≤5d)" value="3 activities" color="#FF8B00" />
            </div>
          </div>
          <div style={{ background: '#F4F5F7', borderRadius: 4, padding: '10px 12px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#6B778C', marginBottom: 6 }}>DELAY REGISTER SUMMARY</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[['Compensable','#0052CC','#DEEBFF',9], ['Contractor','#DE350B','#FFEBE6',4], ['Excusable','#6B778C','#F4F5F7',2]].map(([l,c,bg,n]) => (
                <div key={l} style={{ flex:1, background:bg, borderRadius:4, padding:'6px 8px', textAlign:'center' }}>
                  <div style={{ fontSize:16, fontWeight:800, color:c }}>{n}d</div>
                  <div style={{ fontSize:9, color:'#97A0AF', fontWeight:600 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </PanelCard>

        {/* Panel 2 – Financial */}
        <PanelCard title="Financial (EVM)" icon={DollarSign} color="#00875A">
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginBottom: 16 }}>
            <Gauge value={p.cpi} label="CPI" sub="Cost efficiency" />
            <div style={{ width: 1, background: '#F4F5F7' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'center' }}>
              <Stat label="EAC (Method 1)" value={fmtK(4762000)} color="#DE350B" sub="BAC ÷ CPI — default" />
              <Stat label="EAC (Method 2)" value={fmtK(4580000)} color="#FF8B00" sub="Optimistic — needs doc" />
              <Stat label="EAC (Method 3)" value={fmtK(5104000)} color="#DE350B" sub="CPI×SPI worst case" />
              <Stat label="Gross VAC" value={fmtSign(-562000)} color="#DE350B" />
              <Stat label="Adjusted VAC" value={fmtSign(29000)} color="#00875A" sub="Incl. pending EOT+Vars" />
            </div>
          </div>
          <div style={{ background: '#FFEBE6', borderRadius: 4, padding: '8px 12px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#DE350B' }}>
              TCPI = {tcpi.toFixed(3)} &nbsp;·&nbsp; CPI Gap = {(tcpi - p.cpi).toFixed(3)} efficiency points
            </div>
            <div style={{ fontSize: 11, color: '#6B778C', marginTop: 2 }}>Recovery to budget is statistically unlikely without pursuing EOT claims</div>
          </div>
        </PanelCard>

        {/* Panel 3 – Commercial */}
        <PanelCard title="Commercial" icon={FileText} color="#FF8B00">
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#6B778C', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>EOT Claims</div>
            {eotClaims.map(e => (
              <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid #F4F5F7' }}>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#0052CC', marginRight: 8 }}>{e.id}</span>
                  <span style={{ fontSize: 12, color: '#172B4D' }}>{e.event}</span>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: 12, fontWeight: 700 }}>{e.days}d</span>
                  <span style={{
                    fontSize: 10, padding: '2px 7px', borderRadius: 10, fontWeight: 700,
                    background: e.status === 'approved' ? '#E3FCEF' : '#FFFAE6',
                    color: e.status === 'approved' ? '#00875A' : '#FF8B00',
                  }}>{e.status}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#172B4D' }}>{fmtK(e.value)}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div style={{ background: '#FFFAE6', borderRadius: 4, padding: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#FF8B00' }}>{fmtK(variations.filter(v=>v.status!=='draft').reduce((s,v)=>s+v.value,0))}</div>
              <div style={{ fontSize: 10, color: '#97A0AF', fontWeight: 700, textTransform: 'uppercase' }}>Active Variations</div>
              <div style={{ fontSize: 11, color: '#6B778C' }}>{variations.filter(v=>v.status!=='draft').length} claims</div>
            </div>
            <div style={{ background: '#DEEBFF', borderRadius: 4, padding: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#0052CC' }}>{fmtK(sopaClaims[2].amount)}</div>
              <div style={{ fontSize: 10, color: '#97A0AF', fontWeight: 700, textTransform: 'uppercase' }}>SOPA Claim PC-003</div>
              <div style={{ fontSize: 11, color: '#DE350B', fontWeight: 700 }}>Due W15 · 7 days</div>
            </div>
          </div>
        </PanelCard>

        {/* Panel 4 – Risk */}
        <PanelCard title="Risk" icon={Shield} color="#6554C0">
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#6B778C', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Top Risks by Expected Value</div>
            {risks.filter(r=>r.status!=='closed').slice(0,4).map(r => (
              <div key={r.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'6px 0', borderBottom:'1px solid #F4F5F7' }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:11, color:'#172B4D', lineHeight:1.3 }}>{r.desc.slice(0,60)}…</div>
                  <div style={{ display:'flex', gap:6, marginTop:2 }}>
                    <span style={{ fontSize:10, color:'#97A0AF' }}>P: {r.prob}%</span>
                    <span style={{ fontSize:10, color:'#97A0AF' }}>·</span>
                    <span style={{ fontSize:10, color:r.category==='compensable'?'#0052CC':r.category==='contractor'?'#DE350B':'#6B778C', fontWeight:700, textTransform:'capitalize' }}>{r.category}</span>
                  </div>
                </div>
                <span style={{ fontSize:12, fontWeight:700, color:'#172B4D', marginLeft:12 }}>{fmtK(r.ev)}</span>
              </div>
            ))}
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8 }}>
            {[['P50','Week 24','#00875A'],['P80','Week 27','#FF8B00'],['P90','Week 30','#DE350B']].map(([p,w,c]) => (
              <div key={p} style={{ background:'#F4F5F7', borderRadius:4, padding:'8px', textAlign:'center' }}>
                <div style={{ fontSize:9, fontWeight:700, color:'#97A0AF', letterSpacing:'0.06em' }}>{p}</div>
                <div style={{ fontSize:14, fontWeight:800, color:c }}>{w}</div>
              </div>
            ))}
          </div>
        </PanelCard>
      </div>
    </div>
  );
}
