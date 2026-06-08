import React, { useState } from 'react';
import { tenders } from '../data/mockData';
import { CheckCircle, Clock, TrendingUp, DollarSign, Award } from 'lucide-react';

const stages = [
  { id:'received', label:'Received', color:'#6B778C', bg:'#F4F5F7' },
  { id:'pricing',  label:'Pricing',  color:'#0052CC', bg:'#DEEBFF' },
  { id:'review',   label:'Review',   color:'#FF8B00', bg:'#FFFAE6' },
  { id:'submitted',label:'Submitted',color:'#6554C0', bg:'#EAE6FF' },
  { id:'won',      label:'Won',      color:'#00875A', bg:'#E3FCEF' },
];

const risks_t = [
  { desc:'Contaminated soil discovery', prob:15, ev:12750 },
  { desc:'Authority approval delay', prob:40, ev:12800 },
  { desc:'Subcontractor availability', prob:30, ev:11400 },
];

const totalEV = risks_t.reduce((s, r) => s + r.ev, 0);

const wbsActivities = [
  { code:'2.1', name:'Demolition & Asbestos Removal', scope:'480 m²', rate:'18 m²/crew/day', crew:4, dur:6.7, cost:28560, labour:22400 },
  { code:'4.1', name:'Mechanical First Fix (HVAC)', scope:'120 FCUs', rate:'6 FCU/mech/day', crew:3, dur:6.7, cost:52500, labour:45000 },
  { code:'4.2', name:'Electrical First Fix', scope:'600 m conduit', rate:'20 m/elec/day', crew:3, dur:10, cost:42000, labour:25200 },
  { code:'5.1', name:'Steel Stud Framing', scope:'850 m²', rate:'40 m²/carp/day', crew:4, dur:5.3, cost:32400, labour:26400 },
  { code:'7.1', name:'Ceilings (Suspended)', scope:'720 m²', rate:'35 m²/crew/day', crew:4, dur:5.1, cost:24480, labour:18000 },
];

export default function Tendering() {
  const [selected, setSelected] = useState(tenders[0]);
  const [awarded, setAwarded] = useState(false);
  const [awarding, setAwarding] = useState(false);

  const fmt = v => `$${(v/1000000).toFixed(2)}M`;
  const fmtK = v => `$${(v/1000).toFixed(0)}k`;

  const handleAward = () => {
    setAwarding(true);
    setTimeout(() => { setAwarding(false); setAwarded(true); }, 2000);
  };

  const wonTender = selected?.stage === 'won';

  return (
    <div className="page-enter" style={{ padding:'24px', display:'flex', flexDirection:'column', gap:20 }}>

      {/* Pipeline (Kanban) */}
      <div className="mc-card" style={{ padding:'16px 18px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
          <div>
            <div style={{ fontSize:13, fontWeight:700, color:'#172B4D' }}>Tender Pipeline</div>
            <div style={{ fontSize:11, color:'#97A0AF' }}>Total pipeline value: {fmt(tenders.reduce((s,t)=>s+t.value,0))}</div>
          </div>
          <button style={{ padding:'6px 12px', background:'#0052CC', color:'#fff', border:'none', borderRadius:4, fontSize:12, fontWeight:600, cursor:'pointer' }}>
            + New Tender
          </button>
        </div>
        <div style={{ display:'flex', gap:12, overflowX:'auto', paddingBottom:4 }}>
          {stages.map(stage => {
            const stageTenders = tenders.filter(t => t.stage === stage.id);
            return (
              <div key={stage.id} style={{ flex:'0 0 200px', background:'#F8F9FB', borderRadius:6, padding:'10px', border:'1px solid #DFE1E6' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
                  <span style={{ fontSize:11, fontWeight:700, color:stage.color, background:stage.bg, padding:'2px 8px', borderRadius:10 }}>
                    {stage.label}
                  </span>
                  <span style={{ fontSize:11, fontWeight:700, color:'#97A0AF' }}>{stageTenders.length}</span>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  {stageTenders.map(t => (
                    <div key={t.id}
                      onClick={() => { setSelected(t); setAwarded(false); }}
                      style={{
                        background:'#fff', borderRadius:4, padding:'10px 12px',
                        border: selected?.id===t.id ? '2px solid #0052CC' : '1px solid #DFE1E6',
                        cursor:'pointer', boxShadow:'0 1px 3px rgba(9,30,66,0.08)',
                        transition:'border 0.1s',
                      }}>
                      <div style={{ fontSize:12, fontWeight:700, color:'#172B4D', marginBottom:4, lineHeight:1.3 }}>{t.name}</div>
                      <div style={{ fontSize:11, color:'#6B778C', marginBottom:4 }}>{t.client}</div>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                        <span style={{ fontSize:13, fontWeight:800, color:'#0052CC' }}>{fmt(t.value)}</span>
                        <span style={{ fontSize:10, background:'#E3FCEF', color:'#00875A', padding:'2px 6px', borderRadius:10, fontWeight:700 }}>{t.probability}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selected && (
        <div style={{ display:'grid', gridTemplateColumns:'3fr 2fr', gap:16 }}>

          {/* Tender detail + WBS */}
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {/* Header */}
            <div className="mc-card" style={{ padding:'16px 18px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
                <div>
                  <div style={{ fontSize:16, fontWeight:800, color:'#172B4D', marginBottom:4 }}>{selected.name}</div>
                  <div style={{ fontSize:12, color:'#6B778C' }}>{selected.client} · {selected.type}</div>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontSize:22, fontWeight:800, color:'#0052CC' }}>{fmt(selected.value)}</div>
                  <div style={{ fontSize:11, color:'#97A0AF' }}>Contract value</div>
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10 }}>
                {[
                  { label:'Tender Due', value:selected.dueDate },
                  { label:'Win Probability', value:`${selected.probability}%` },
                  { label:'Target Margin', value:`${selected.margin}%` },
                  { label:'Expected Margin', value:`${fmtK(selected.value * selected.margin/100)}` },
                ].map(s => (
                  <div key={s.label} style={{ background:'#F8F9FB', borderRadius:4, padding:'10px', border:'1px solid #DFE1E6' }}>
                    <div style={{ fontSize:9, color:'#97A0AF', fontWeight:700, textTransform:'uppercase', marginBottom:4 }}>{s.label}</div>
                    <div style={{ fontSize:14, fontWeight:800, color:'#172B4D' }}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shared WBS + Resource-driven pricing */}
            <div className="mc-card">
              <div style={{ padding:'14px 18px', borderBottom:'1px solid #F4F5F7' }}>
                <div style={{ fontSize:13, fontWeight:700, color:'#172B4D' }}>Shared WBS — One Source: Programme + Price</div>
                <div style={{ fontSize:11, color:'#97A0AF' }}>
                  Duration = Scope ÷ Rate ÷ Crew · Both programme and cost derived from same quantities
                </div>
              </div>
              <div style={{ overflowX:'auto' }}>
                <table className="mc-table">
                  <thead>
                    <tr><th>WBS</th><th>Activity</th><th>Scope</th><th>Rate</th><th>Crew</th><th>Duration</th><th>Labour Cost</th><th>Total Cost</th></tr>
                  </thead>
                  <tbody>
                    {wbsActivities.map(a => (
                      <tr key={a.code}>
                        <td style={{ fontWeight:700, color:'#0052CC', fontSize:11 }}>{a.code}</td>
                        <td style={{ fontSize:12, fontWeight:600 }}>{a.name}</td>
                        <td style={{ fontSize:11, color:'#6B778C' }}>{a.scope}</td>
                        <td style={{ fontSize:11, color:'#6B778C' }}>{a.rate}</td>
                        <td style={{ fontSize:12, fontWeight:700, textAlign:'center' }}>{a.crew}</td>
                        <td style={{ fontWeight:700, color:'#0052CC' }}>{a.dur.toFixed(1)}d</td>
                        <td style={{ fontSize:12, fontWeight:700 }}>{fmtK(a.labour)}</td>
                        <td style={{ fontSize:13, fontWeight:800, color:'#172B4D' }}>{fmtK(a.cost)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={7} style={{ fontSize:12, fontWeight:700, color:'#6B778C', padding:'10px 12px' }}>WBS Total (selected activities)</td>
                      <td style={{ fontSize:14, fontWeight:800, color:'#0052CC', padding:'10px 12px' }}>{fmtK(wbsActivities.reduce((s,a)=>s+a.cost,0))}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          {/* Right column — Risk + Monte Carlo + Award */}
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>

            {/* Risk register → price */}
            <div className="mc-card" style={{ padding:'16px 18px' }}>
              <div style={{ fontSize:13, fontWeight:700, color:'#172B4D', marginBottom:4 }}>Risk Register → Price</div>
              <div style={{ fontSize:11, color:'#97A0AF', marginBottom:14 }}>Expected value method — not rule-of-thumb percentage</div>
              {risks_t.map((r, i) => (
                <div key={i} style={{ padding:'8px 0', borderBottom:'1px solid #F4F5F7' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
                    <span style={{ fontSize:11, color:'#172B4D', fontWeight:600 }}>{r.desc}</span>
                    <span style={{ fontSize:12, fontWeight:800, color:'#FF8B00' }}>{fmtK(r.ev)}</span>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div className="progress-bar" style={{ flex:1 }}>
                      <div className="progress-fill" style={{ width:`${r.prob}%`, background: r.prob>50?'#DE350B':r.prob>30?'#FF8B00':'#00875A' }} />
                    </div>
                    <span style={{ fontSize:10, color:'#97A0AF' }}>{r.prob}% probability</span>
                  </div>
                </div>
              ))}
              <div style={{ marginTop:12, display:'flex', justifyContent:'space-between', padding:'10px 12px', background:'#FFFAE6', borderRadius:4 }}>
                <span style={{ fontSize:12, fontWeight:700, color:'#172B4D' }}>Evidence-based risk margin</span>
                <span style={{ fontSize:15, fontWeight:800, color:'#FF8B00' }}>{fmtK(totalEV)}</span>
              </div>
              <div style={{ marginTop:8, background:'#F4F5F7', borderRadius:4, padding:'8px 12px', fontSize:11, color:'#6B778C' }}>
                Rule-of-thumb 5% = {fmtK(selected.value * 0.05)} — vs evidence-based {fmtK(totalEV)}.
                Using expected value is <b>more competitive on low-risk tenders</b>.
              </div>
            </div>

            {/* Monte Carlo P80 */}
            <div className="mc-card" style={{ padding:'16px 18px' }}>
              <div style={{ fontSize:13, fontWeight:700, color:'#172B4D', marginBottom:4 }}>Monte Carlo — Submit at P80</div>
              <div style={{ fontSize:11, color:'#97A0AF', marginBottom:14 }}>Tender programme based on P80, not deterministic CPM date</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8 }}>
                {[
                  { label:'P50 (median)', val:'Week 22', color:'#00875A', note:'50% probability' },
                  { label:'P80 (submit)', val:'Week 25', color:'#0052CC', note:'80% probability ★', hl:true },
                  { label:'P90 (reserve)', val:'Week 27', color:'#FF8B00', note:'90% probability' },
                ].map(p => (
                  <div key={p.label} style={{
                    background: p.hl ? '#DEEBFF' : '#F8F9FB',
                    border: `1px solid ${p.color}${p.hl?'':'33'}`,
                    borderRadius:6, padding:'10px', textAlign:'center',
                  }}>
                    <div style={{ fontSize:9, fontWeight:700, color:p.color, marginBottom:4 }}>{p.label}</div>
                    <div style={{ fontSize:16, fontWeight:800, color:'#172B4D' }}>{p.val}</div>
                    <div style={{ fontSize:9, color:'#97A0AF' }}>{p.note}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:10, background:'#EAE6FF', borderRadius:4, padding:'8px 10px', fontSize:11, color:'#6554C0', fontWeight:700 }}>
                Programme contingency: P80 − P50 = 3 weeks (statistically backed)
              </div>
            </div>

            {/* Award button */}
            <div className="mc-card" style={{ padding:'16px 18px', border: wonTender ? '2px solid #00875A' : '1px solid #DFE1E6' }}>
              <div style={{ fontSize:13, fontWeight:700, color:'#172B4D', marginBottom:4 }}>
                {wonTender ? '🏆 Project Won — Transition to Active' : 'Award Tender → Active Project'}
              </div>
              <div style={{ fontSize:11, color:'#97A0AF', marginBottom:14 }}>
                Single action: Tender WBS becomes Project WBS. Programme locked as PMB. Commercial systems activate instantly.
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:6, marginBottom:14 }}>
                {[
                  'WBS status: Tender → Active Project',
                  'Programme locked as PMB (timestamped)',
                  'Risk register promoted to project',
                  'EVM activated from PMB',
                  'Variation / EOT / SOPA trackers live',
                  'Project appears on portfolio dashboard',
                ].map((step, i) => (
                  <div key={i} style={{ display:'flex', gap:8, alignItems:'center' }}>
                    <div style={{ width:20, height:20, borderRadius:'50%', background: awarded ? '#E3FCEF' : '#F4F5F7', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      {awarded ? <CheckCircle size={12} color="#00875A" /> : <span style={{ fontSize:9, fontWeight:700, color:'#97A0AF' }}>{i+1}</span>}
                    </div>
                    <span style={{ fontSize:11, color: awarded ? '#00875A' : '#6B778C', fontWeight: awarded ? 600 : 400 }}>{step}</span>
                  </div>
                ))}
              </div>
              {awarded ? (
                <div style={{ background:'#E3FCEF', border:'1px solid #00875A44', borderRadius:4, padding:'12px', textAlign:'center' }}>
                  <CheckCircle size={20} color="#00875A" style={{ marginBottom:4 }} />
                  <div style={{ fontSize:13, fontWeight:800, color:'#00875A' }}>Project Created Successfully</div>
                  <div style={{ fontSize:11, color:'#6B778C', marginTop:4 }}>
                    Commercial tracking active from today. First diary entry can be submitted now.
                  </div>
                </div>
              ) : (
                <button onClick={handleAward} disabled={awarding} style={{
                  width:'100%', padding:'12px', background: awarding ? '#97A0AF' : '#00875A',
                  color:'#fff', border:'none', borderRadius:4, fontSize:13, fontWeight:800, cursor: awarding ? 'default' : 'pointer',
                  display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                  transition:'background 0.2s',
                }}>
                  {awarding ? (
                    <>⏳ Activating project…</>
                  ) : (
                    <><Award size={16} /> Award & Create Project</>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
