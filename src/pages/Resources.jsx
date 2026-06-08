import React, { useState } from 'react';
import { resources, histogram } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend, Cell } from 'recharts';
import { AlertTriangle, CheckCircle, Users } from 'lucide-react';

const COLORS = { elec:'#0052CC', mech:'#00875A', civil:'#FF8B00', finishes:'#6554C0', plant:'#97A0AF' };
const AVAIL =  { elec:6, mech:3, civil:8, finishes:5, plant:1 };

function ConflictBadge({ type }) {
  const map = {
    over: { bg:'#FFEBE6', color:'#DE350B', label:'Overallocation' },
    zone: { bg:'#FFFAE6', color:'#FF8B00', label:'Zone Conflict' },
    ok:   { bg:'#E3FCEF', color:'#00875A', label:'No Conflict' },
  };
  const s = map[type];
  return <span style={{ background:s.bg, color:s.color, padding:'2px 8px', borderRadius:10, fontSize:11, fontWeight:700 }}>{s.label}</span>;
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:'#fff', border:'1px solid #DFE1E6', borderRadius:6, padding:'10px 14px', boxShadow:'0 2px 8px rgba(9,30,66,0.15)', fontSize:12 }}>
      <div style={{ fontWeight:700, color:'#172B4D', marginBottom:6 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display:'flex', justifyContent:'space-between', gap:16, marginBottom:3 }}>
          <span style={{ color:p.fill, fontWeight:600 }}>{p.name}:</span>
          <span style={{ fontWeight:700 }}>{p.value} crew</span>
        </div>
      ))}
      <div style={{ borderTop:'1px solid #F4F5F7', marginTop:6, paddingTop:6, fontWeight:700, color:'#172B4D' }}>
        Total: {payload.reduce((s,p)=>s+(p.value||0),0)} crew
      </div>
    </div>
  );
};

const conflicts = [
  { week:'W8', trade:'Formwork Carpenters', demand:8, available:8, type:'ok', resolution:'At capacity — no slack' },
  { week:'W14', trade:'Senior Electricians', demand:7, available:6, type:'over', resolution:'1 overallocation → delay A19 by 1d using float, or hire temp' },
  { week:'W15', trade:'Senior Electricians', demand:7, available:6, type:'over', resolution:'Resolved by delaying A23 (float 2d available)' },
  { week:'W10', trade:'Painters + Flooring', demand:null, available:null, type:'zone', resolution:'Zone 2 conflict weeks 10-12 — sequence Flooring after Painting' },
];

export default function Resources() {
  const [view, setView] = useState('histogram');
  const [filter, setFilter] = useState('all');

  const overweeks = histogram.filter(w =>
    w.elec > AVAIL.elec || w.mech > AVAIL.mech || w.civil > AVAIL.civil || w.finishes > AVAIL.finishes
  );

  return (
    <div className="page-enter" style={{ padding:'24px', display:'flex', flexDirection:'column', gap:20 }}>

      {/* Header strip */}
      <div style={{ display:'flex', gap:12 }}>
        {[
          { label:'Resources Library', value:resources.length, color:'#0052CC', bg:'#DEEBFF', icon:'👥' },
          { label:'Overallocations', value:overweeks.length, color:'#DE350B', bg:'#FFEBE6', icon:'⚠️' },
          { label:'Zone Conflicts', value:1, color:'#FF8B00', bg:'#FFFAE6', icon:'🔶' },
          { label:'Peak Crew Demand', value:'17', sub:'Week 8', color:'#253858', bg:'#F4F5F7', icon:'📈' },
        ].map(s => (
          <div key={s.label} className="mc-card" style={{ padding:'14px 18px', display:'flex', gap:12, alignItems:'center', flex:1 }}>
            <div style={{ width:36, height:36, background:s.bg, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>{s.icon}</div>
            <div>
              <div style={{ fontSize:22, fontWeight:800, color:s.color }}>{s.value}</div>
              <div style={{ fontSize:11, color:'#97A0AF', fontWeight:600 }}>{s.label}</div>
              {s.sub && <div style={{ fontSize:10, color:'#C1C7D0' }}>{s.sub}</div>}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:16 }}>

        {/* Histogram */}
        <div className="mc-card" style={{ padding:'16px 18px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:'#172B4D' }}>Resource Demand Histogram</div>
              <div style={{ fontSize:11, color:'#97A0AF' }}>Crew demand by trade per week · Stacked view</div>
            </div>
            <div style={{ display:'flex', gap:6 }}>
              {['all','elec','mech','civil'].map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{
                  padding:'4px 10px', borderRadius:4, border:'1px solid #DFE1E6', cursor:'pointer', fontSize:11, fontWeight:600,
                  background: filter===f ? '#0052CC' : '#fff', color: filter===f ? '#fff' : '#6B778C',
                }}>
                  {f === 'all' ? 'All Trades' : f === 'elec' ? 'Electrical' : f === 'mech' ? 'Mechanical' : 'Civil'}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={histogram} barSize={22}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F4F5F7" />
              <XAxis dataKey="week" tick={{ fontSize:10, fill:'#97A0AF' }} />
              <YAxis tick={{ fontSize:10, fill:'#97A0AF' }} label={{ value:'Crew', angle:-90, position:'insideLeft', fontSize:10, fill:'#97A0AF' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconSize={10} iconType="square" wrapperStyle={{ fontSize:11 }} />
              {(filter==='all'||filter==='elec') && <Bar dataKey="elec" name="Electrical" stackId="a" fill={COLORS.elec} radius={[0,0,0,0]} />}
              {(filter==='all'||filter==='mech') && <Bar dataKey="mech" name="Mechanical" stackId="a" fill={COLORS.mech} />}
              {(filter==='all'||filter==='civil') && <Bar dataKey="civil" name="Civil" stackId="a" fill={COLORS.civil} />}
              {filter==='all' && <Bar dataKey="finishes" name="Finishes" stackId="a" fill={COLORS.finishes} />}
              {filter==='all' && <Bar dataKey="plant" name="Plant" stackId="a" fill={COLORS.plant} radius={[3,3,0,0]} />}
              <ReferenceLine y={14} stroke="#DE350B" strokeDasharray="4 2" label={{ value:'Max capacity (14)', fontSize:9, fill:'#DE350B', position:'top' }} />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ background:'#FFEBE6', borderRadius:4, padding:'8px 12px', marginTop:10 }}>
            <span style={{ fontSize:11, fontWeight:700, color:'#DE350B' }}>
              ⚠ W14–W15: Senior Electricians overallocated by 1. Resolution: delay A19 using 3d float available. No programme impact.
            </span>
          </div>
        </div>

        {/* Conflict list */}
        <div className="mc-card">
          <div style={{ padding:'14px 18px', borderBottom:'1px solid #F4F5F7', fontSize:13, fontWeight:700, color:'#172B4D' }}>
            Conflict Register
          </div>
          <div style={{ padding:'14px 18px', display:'flex', flexDirection:'column', gap:10 }}>
            {conflicts.map((c, i) => (
              <div key={i} style={{ border:'1px solid #DFE1E6', borderRadius:6, padding:'10px 12px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                  <span style={{ fontSize:12, fontWeight:700, color:'#172B4D' }}>{c.week} · {c.trade}</span>
                  <ConflictBadge type={c.type} />
                </div>
                {c.demand && (
                  <div style={{ display:'flex', gap:10, marginBottom:6 }}>
                    <span style={{ fontSize:11, color:'#6B778C' }}>Demand: <b>{c.demand}</b></span>
                    <span style={{ fontSize:11, color:'#6B778C' }}>Available: <b>{c.available}</b></span>
                  </div>
                )}
                <div style={{ fontSize:11, color:'#6B778C', borderTop:'1px solid #F4F5F7', paddingTop:6 }}>
                  <b>Resolution:</b> {c.resolution}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resource Library */}
      <div className="mc-card">
        <div style={{ padding:'14px 18px', borderBottom:'1px solid #F4F5F7', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <div style={{ fontSize:13, fontWeight:700, color:'#172B4D' }}>Resource Library</div>
            <div style={{ fontSize:11, color:'#97A0AF' }}>Company-level cost database · Rate precedence: Individual &gt; Role &gt; Benchmark</div>
          </div>
          <button style={{ padding:'6px 12px', background:'#0052CC', color:'#fff', border:'none', borderRadius:4, fontSize:12, fontWeight:600, cursor:'pointer' }}>
            + Add Resource
          </button>
        </div>
        <table className="mc-table">
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Trade</th><th>Rate ($/day)</th>
              <th>Available</th><th>Calendar</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {resources.map(r => (
              <tr key={r.id}>
                <td style={{ fontWeight:700, color:'#0052CC', fontSize:11 }}>{r.id}</td>
                <td style={{ fontWeight:600, color:'#172B4D' }}>{r.name}</td>
                <td>
                  <span style={{ padding:'2px 8px', borderRadius:10, fontSize:11, fontWeight:700,
                    background: r.trade==='Electrical'?'#DEEBFF':r.trade==='Mechanical'?'#E3FCEF':r.trade==='Plant'?'#F4F5F7':'#EAE6FF',
                    color: r.trade==='Electrical'?'#0052CC':r.trade==='Mechanical'?'#00875A':r.trade==='Plant'?'#6B778C':'#6554C0',
                  }}>{r.trade}</span>
                </td>
                <td style={{ fontWeight:700, color:'#172B4D', fontSize:13 }}>${r.rate.toLocaleString()}</td>
                <td style={{ fontWeight:700, color: r.available < 3 ? '#FF8B00' : '#172B4D' }}>{r.available}</td>
                <td style={{ fontSize:11, color:'#6B778C' }}>{r.calendar}</td>
                <td><span style={{ background:'#E3FCEF', color:'#00875A', padding:'2px 8px', borderRadius:10, fontSize:11, fontWeight:700 }}>Active</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
