import React, { useState } from 'react';
import { risks, monteCarloData } from '../data/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Shield, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

const catStyle = {
  compensable: { bg:'#DEEBFF', color:'#0052CC', label:'Compensable' },
  contractor:  { bg:'#FFEBE6', color:'#DE350B', label:'Contractor Risk' },
  excusable:   { bg:'#F4F5F7', color:'#6B778C', label:'Excusable' },
};

const heatColors = [
  ['#E3FCEF','#FFFAE6','#FFFAE6','#FFEBE6','#FFEBE6'],
  ['#E3FCEF','#FFFAE6','#FFFAE6','#FFEBE6','#FFEBE6'],
  ['#E3FCEF','#E3FCEF','#FFFAE6','#FFFAE6','#FFEBE6'],
  ['#E3FCEF','#E3FCEF','#FFFAE6','#FFFAE6','#FFEBE6'],
  ['#E3FCEF','#E3FCEF','#E3FCEF','#FFFAE6','#FFFAE6'],
];

function HeatCell({ prob, cons, active }) {
  const pi = Math.floor(prob / 20);
  const ci = Math.floor(cons / 20);
  const bg = heatColors[Math.min(4,4-pi)][Math.min(4,ci)];
  return (
    <div className="heat-cell" style={{ background: bg, border: active ? '2px solid #0052CC' : '1px solid #DFE1E6', fontSize:8, color:active?'#0052CC':'transparent' }}>
      {active ? '●' : ''}
    </div>
  );
}

const probLabels = ['0-20%','20-40%','40-60%','60-80%','80-100%'];
const consLabels = ['<$10k','$10-30k','$30-60k','$60-100k','>$100k'];

function McTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:'#fff', border:'1px solid #DFE1E6', borderRadius:6, padding:'8px 12px', fontSize:12, boxShadow:'0 2px 8px rgba(9,30,66,0.15)' }}>
      <div style={{ fontWeight:700, color:'#172B4D' }}>Week {label}</div>
      <div style={{ color:'#6554C0' }}>P({payload[0]?.value}%) = project complete</div>
    </div>
  );
}

export default function RiskRegister() {
  const [selected, setSelected] = useState(null);
  const totalEV = risks.filter(r=>r.status!=='closed').reduce((s,r)=>s+r.ev,0);

  return (
    <div className="page-enter" style={{ padding:'24px', display:'flex', flexDirection:'column', gap:20 }}>

      {/* Summary strip */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
        {[
          { label:'Active Risks', value:risks.filter(r=>r.status!=='closed').length, color:'#DE350B', bg:'#FFEBE6', icon:'🛡️' },
          { label:'Total Expected Value', value:`$${(totalEV/1000).toFixed(0)}k`, color:'#FF8B00', bg:'#FFFAE6', icon:'💰' },
          { label:'Compensable Risks', value:risks.filter(r=>r.category==='compensable').length, color:'#0052CC', bg:'#DEEBFF', icon:'📋' },
          { label:'Float Threshold Alerts', value:2, color:'#FF8B00', bg:'#FFFAE6', icon:'⏱️' },
        ].map(s => (
          <div key={s.label} className="mc-card" style={{ padding:'14px 18px', display:'flex', gap:12, alignItems:'center' }}>
            <div style={{ width:36, height:36, background:s.bg, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>{s.icon}</div>
            <div>
              <div style={{ fontSize:20, fontWeight:800, color:s.color }}>{s.value}</div>
              <div style={{ fontSize:11, color:'#97A0AF', fontWeight:600 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'3fr 2fr', gap:16 }}>

        {/* Risk table */}
        <div className="mc-card">
          <div style={{ padding:'14px 18px', borderBottom:'1px solid #F4F5F7', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div style={{ fontSize:13, fontWeight:700, color:'#172B4D' }}>Risk Register</div>
            <button style={{ padding:'6px 12px', background:'#0052CC', color:'#fff', border:'none', borderRadius:4, fontSize:12, fontWeight:600, cursor:'pointer' }}>
              + Add Risk
            </button>
          </div>
          <table className="mc-table">
            <thead>
              <tr><th>ID</th><th style={{maxWidth:200}}>Description</th><th>Prob</th><th>Consequence</th><th>EV</th><th>Category</th><th>Status</th></tr>
            </thead>
            <tbody>
              {risks.map(r => {
                const cs = catStyle[r.category];
                return (
                  <tr key={r.id} onClick={() => setSelected(selected===r.id?null:r.id)}
                    style={{ cursor:'pointer', background: selected===r.id ? '#F0F5FF' : r.status==='closed' ? '#FAFBFC' : 'transparent' }}>
                    <td style={{ fontWeight:700, color:'#0052CC', fontSize:11 }}>{r.id}</td>
                    <td style={{ maxWidth:220, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', color: r.status==='closed' ? '#97A0AF' : '#172B4D', textDecoration: r.status==='closed' ? 'line-through' : 'none' }}>
                      {r.desc.slice(0,60)}…
                    </td>
                    <td>
                      <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                        <div className="progress-bar" style={{ width:48 }}>
                          <div className="progress-fill" style={{ width:`${r.prob}%`, background: r.prob>60?'#DE350B':r.prob>30?'#FF8B00':'#00875A' }} />
                        </div>
                        <span style={{ fontSize:11, fontWeight:700 }}>{r.prob}%</span>
                      </div>
                    </td>
                    <td style={{ fontSize:12, fontWeight:600 }}>${(r.consequence/1000).toFixed(0)}k</td>
                    <td style={{ fontSize:12, fontWeight:700, color:'#172B4D' }}>${(r.ev/1000).toFixed(0)}k</td>
                    <td><span style={{ ...badgeSt(cs.bg,cs.color), fontSize:10 }}>{cs.label}</span></td>
                    <td>
                      <span style={{
                        fontSize:10, padding:'2px 7px', borderRadius:10, fontWeight:700,
                        background: r.status==='closed'?'#E3FCEF':r.status==='monitoring'?'#EAE6FF':r.status==='active'?'#FFFAE6':'#F4F5F7',
                        color: r.status==='closed'?'#00875A':r.status==='monitoring'?'#6554C0':r.status==='active'?'#FF8B00':'#6B778C',
                        textTransform:'capitalize',
                      }}>{r.status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* Selected detail */}
          {selected && (() => {
            const r = risks.find(x => x.id === selected);
            if (!r) return null;
            const cs = catStyle[r.category];
            return (
              <div style={{ margin:'0 18px 18px', background:'#F8F9FB', border:'1px solid #DFE1E6', borderRadius:6, padding:'14px' }}>
                <div style={{ fontSize:12, fontWeight:700, color:'#172B4D', marginBottom:8 }}>{r.desc}</div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginBottom:10 }}>
                  <div style={{ background:'#fff', borderRadius:4, padding:'8px', border:'1px solid #DFE1E6' }}>
                    <div style={{ fontSize:9, color:'#97A0AF', fontWeight:700, textTransform:'uppercase' }}>Expected Value</div>
                    <div style={{ fontSize:16, fontWeight:800, color:'#FF8B00' }}>${(r.ev/1000).toFixed(1)}k</div>
                  </div>
                  <div style={{ background:'#fff', borderRadius:4, padding:'8px', border:'1px solid #DFE1E6' }}>
                    <div style={{ fontSize:9, color:'#97A0AF', fontWeight:700, textTransform:'uppercase' }}>Float on Linked Activity</div>
                    <div style={{ fontSize:16, fontWeight:800, color: r.activityFloat===0?'#DE350B':r.activityFloat<=2?'#FF8B00':'#00875A' }}>{r.activityFloat}d</div>
                  </div>
                  <div style={{ background: cs.bg, borderRadius:4, padding:'8px', border:`1px solid ${cs.color}44` }}>
                    <div style={{ fontSize:9, color:'#97A0AF', fontWeight:700, textTransform:'uppercase' }}>Category</div>
                    <div style={{ fontSize:13, fontWeight:800, color:cs.color }}>{cs.label}</div>
                  </div>
                </div>
                <div style={{ fontSize:11, color:'#6B778C' }}><b>Response Plan:</b> {r.response}</div>
                {r.category === 'compensable' && r.activityFloat <= 2 && (
                  <div style={{ marginTop:8, background:'#FFEBE6', borderRadius:4, padding:'8px 10px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ fontSize:11, fontWeight:700, color:'#DE350B' }}>⚡ Float ≤ 2d — EOT notice pre-populated and ready to serve</span>
                    <button style={{ background:'#DE350B', color:'#fff', border:'none', borderRadius:4, padding:'4px 10px', fontSize:11, fontWeight:700, cursor:'pointer' }}>
                      Serve Notice
                    </button>
                  </div>
                )}
              </div>
            );
          })()}
        </div>

        {/* Right column */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {/* Heatmap */}
          <div className="mc-card" style={{ padding:'16px 18px' }}>
            <div style={{ fontSize:13, fontWeight:700, color:'#172B4D', marginBottom:12 }}>Risk Heatmap</div>
            <div style={{ display:'flex', gap:12 }}>
              <div>
                <div style={{ fontSize:10, color:'#97A0AF', marginBottom:4, textAlign:'center' }}>Probability →</div>
                <div style={{ display:'grid', gridTemplateColumns:`repeat(5,40px)`, gap:3 }}>
                  {heatColors.map((row, ri) =>
                    row.map((_, ci) => {
                      const matchingRisk = risks.find(r =>
                        Math.floor(r.prob/20) === (4-ri) &&
                        (r.consequence < 10000 ? ci===0 : r.consequence < 30000 ? ci===1 : r.consequence < 60000 ? ci===2 : r.consequence < 100000 ? ci===3 : ci===4)
                      );
                      return <HeatCell key={`${ri}-${ci}`} prob={(4-ri)*20+10} cons={ci*20+10} active={!!matchingRisk} />;
                    })
                  )}
                </div>
              </div>
              <div style={{ fontSize:9, color:'#97A0AF', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
                <span>High</span>
                <span>Prob</span>
                <span>Low</span>
              </div>
            </div>
          </div>

          {/* Monte Carlo */}
          <div className="mc-card" style={{ padding:'16px 18px' }}>
            <div style={{ fontSize:13, fontWeight:700, color:'#172B4D', marginBottom:2 }}>Monte Carlo Simulation</div>
            <div style={{ fontSize:11, color:'#97A0AF', marginBottom:14 }}>10,000 iterations · PERT three-point estimates</div>
            <ResponsiveContainer width="100%" height={140}>
              <AreaChart data={monteCarloData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F4F5F7" />
                <XAxis dataKey="week" tick={{ fontSize:9, fill:'#97A0AF' }} label={{ value:'Completion Week', position:'insideBottom', offset:-2, fontSize:9, fill:'#97A0AF' }} />
                <YAxis tickFormatter={v=>`${v}%`} tick={{ fontSize:9, fill:'#97A0AF' }} />
                <Tooltip formatter={v=>`${v}%`} labelFormatter={l=>`Week ${l}`} />
                <ReferenceLine x={24} stroke="#00875A" strokeDasharray="3 2" label={{ value:'P50 W24', fontSize:8, fill:'#00875A' }} />
                <ReferenceLine x={27} stroke="#FF8B00" strokeDasharray="3 2" label={{ value:'P80 W27', fontSize:8, fill:'#FF8B00' }} />
                <ReferenceLine x={30} stroke="#DE350B" strokeDasharray="3 2" label={{ value:'P90 W30', fontSize:8, fill:'#DE350B' }} />
                <Area type="monotone" dataKey="pct" stroke="#6554C0" fill="#EAE6FF" fillOpacity={0.6} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginTop:12 }}>
              {[['P50','Week 24','Median outcome','#00875A'],['P80','Week 27','Govt contract std.','#FF8B00'],['P90','Week 30','High-risk projects','#DE350B']].map(([p,w,d,c]) => (
                <div key={p} style={{ background:'#F8F9FB', borderRadius:4, padding:'8px', textAlign:'center', border:`1px solid ${c}33` }}>
                  <div style={{ fontSize:10, fontWeight:800, color:c }}>{p}</div>
                  <div style={{ fontSize:13, fontWeight:800, color:'#172B4D' }}>{w}</div>
                  <div style={{ fontSize:9, color:'#97A0AF' }}>{d}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop:10, background:'#EAE6FF', borderRadius:4, padding:'8px 10px' }}>
              <span style={{ fontSize:11, color:'#6554C0', fontWeight:700 }}>
                Programme contingency: P80 − P50 = 3 weeks (evidence-based, not rule-of-thumb)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function badgeSt(bg, color) {
  return { background:bg, color, padding:'2px 8px', borderRadius:10, fontWeight:700, display:'inline-block' };
}
