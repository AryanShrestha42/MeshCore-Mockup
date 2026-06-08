import React, { useState } from 'react';
import { activities, floatLog } from '../data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { AlertTriangle, TrendingDown, CheckCircle, Clock } from 'lucide-react';

const floatTrend = [
  { week:'W1', tf:8 }, { week:'W2', tf:8 }, { week:'W3', tf:8 },
  { week:'W4', tf:8 }, { week:'W5', tf:8 }, { week:'W6', tf:8 },
  { week:'W7', tf:5 }, { week:'W8', tf:5 }, { week:'W9', tf:3 },
  { week:'W10', tf:3 }, { week:'W11', tf:1 }, { week:'W12', tf:0 },
  { week:'W13', tf:0 }, { week:'W14', tf:0 },
];

function FloatBadge({ float }) {
  if (float === 0) return <span style={{ background:'#FFEBE6', color:'#DE350B', padding:'2px 8px', borderRadius:10, fontSize:11, fontWeight:700 }}>CRITICAL</span>;
  if (float <= 2) return <span style={{ background:'#FFFAE6', color:'#FF8B00', padding:'2px 8px', borderRadius:10, fontSize:11, fontWeight:700 }}>{float}d ⚠️</span>;
  if (float <= 5) return <span style={{ background:'#FFF0B3', color:'#FF8B00', padding:'2px 8px', borderRadius:10, fontSize:11, fontWeight:600 }}>{float}d near-crit</span>;
  return <span style={{ background:'#E3FCEF', color:'#00875A', padding:'2px 8px', borderRadius:10, fontSize:11, fontWeight:600 }}>{float}d</span>;
}

function AlertCard({ type, msg, activity, float }) {
  const styles = {
    critical: { bg:'#FFEBE6', border:'#DE350B', icon:'🚨', color:'#DE350B' },
    warning:  { bg:'#FFFAE6', border:'#FF8B00', icon:'⚠️', color:'#FF8B00' },
    info:     { bg:'#DEEBFF', border:'#0052CC', icon:'ℹ️', color:'#0052CC' },
  };
  const s = styles[type];
  return (
    <div style={{ background:s.bg, border:`1px solid ${s.border}44`, borderLeft:`3px solid ${s.border}`, borderRadius:4, padding:'10px 12px', marginBottom:8 }}>
      <div style={{ display:'flex', alignItems:'flex-start', gap:8 }}>
        <span>{s.icon}</span>
        <div>
          <div style={{ fontSize:12, fontWeight:700, color:s.color }}>{msg}</div>
          {activity && <div style={{ fontSize:11, color:'#6B778C', marginTop:2 }}>{activity} · TF: {float}d</div>}
        </div>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const val = payload[0]?.value;
  const color = val === 0 ? '#DE350B' : val <= 2 ? '#FF8B00' : '#00875A';
  return (
    <div style={{ background:'#fff', border:'1px solid #DFE1E6', borderRadius:4, padding:'8px 12px', boxShadow:'0 2px 8px rgba(9,30,66,0.15)' }}>
      <div style={{ fontSize:11, color:'#6B778C', marginBottom:4 }}>{label}</div>
      <div style={{ fontSize:14, fontWeight:700, color }}>TF: {val} days</div>
    </div>
  );
};

export default function FloatAnalysis() {
  const [selected, setSelected] = useState('A12');
  const taskActivities = activities.filter(a => a.type === 'task');
  const sel = taskActivities.find(a => a.id === selected);

  return (
    <div className="page-enter" style={{ padding:'24px', display:'flex', gap:20 }}>
      {/* Left: activity table */}
      <div style={{ flex:'0 0 52%' }}>
        <div className="mc-card" style={{ marginBottom:16 }}>
          <div style={{ padding:'14px 18px', borderBottom:'1px solid #F4F5F7', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontSize:13, fontWeight:700, color:'#172B4D' }}>Float Register — All Activities</span>
            <div style={{ display:'flex', gap:6, fontSize:11 }}>
              {[['CRITICAL','#FFEBE6','#DE350B'], ['Near-crit','#FFFAE6','#FF8B00'], ['Safe','#E3FCEF','#00875A']].map(([l,bg,c]) => (
                <span key={l} style={{ background:bg, color:c, padding:'2px 7px', borderRadius:10, fontWeight:700 }}>{l}</span>
              ))}
            </div>
          </div>
          <div style={{ overflowX:'auto' }}>
            <table className="mc-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Activity</th>
                  <th>TF</th>
                  <th>FF</th>
                  <th>Status</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {taskActivities.map(a => (
                  <tr key={a.id} style={{ cursor:'pointer', background: selected===a.id ? '#F0F5FF' : 'transparent' }}
                    onClick={() => setSelected(a.id)}>
                    <td style={{ fontWeight:700, color:'#0052CC', fontSize:11 }}>{a.code}</td>
                    <td style={{ fontWeight: a.crit ? 600 : 400, color: a.crit ? '#DE350B' : '#172B4D', maxWidth:200, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                      {a.name}
                    </td>
                    <td><FloatBadge float={a.float} /></td>
                    <td style={{ fontSize:12, fontWeight:600, color: a.ff===0?'#6B778C':'#172B4D' }}>{a.ff}d</td>
                    <td>
                      {a.float === 0
                        ? <span style={{ color:'#DE350B', fontSize:11, fontWeight:700 }}>● Critical</span>
                        : a.float <= 2
                        ? <span style={{ color:'#FF8B00', fontSize:11, fontWeight:700 }}>▼ Near-crit</span>
                        : <span style={{ color:'#00875A', fontSize:11, fontWeight:700 }}>✓ Safe</span>
                      }
                    </td>
                    <td style={{ fontSize:11, color: a.float < 3 ? '#DE350B' : '#97A0AF' }}>
                      {a.float < 3 ? '↓ Declining' : a.float <= 5 ? '→ Stable' : '↑ Healthy'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right: detail pane */}
      <div style={{ flex:'0 0 46%', display:'flex', flexDirection:'column', gap:16 }}>

        {/* Alerts */}
        <div className="mc-card" style={{ padding:'14px 18px' }}>
          <div style={{ fontSize:13, fontWeight:700, color:'#172B4D', marginBottom:12 }}>Float Threshold Alerts</div>
          <AlertCard type="critical" msg="Activity A12 (Electrical First Fix) — Float at ZERO. Critical path." activity="A12 Electrical First Fix" float={0} />
          <AlertCard type="warning" msg="Activity A23 (Suspended Ceilings) — Float = 2 days. One delay away from critical." activity="A23 Suspended Ceilings" float={2} />
          <AlertCard type="info" msg="Activity A11 (Mech First Fix) — Float = 2 days. Compensable risk R005 linked." activity="A11 Mech First Fix" float={2} />
        </div>

        {/* Float trend chart */}
        {sel && (
          <div className="mc-card" style={{ padding:'14px 18px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
              <div>
                <div style={{ fontSize:13, fontWeight:700, color:'#172B4D' }}>Float Trend: {sel.name}</div>
                <div style={{ fontSize:11, color:'#97A0AF' }}>Total Float history — W1 to Data Date</div>
              </div>
              <FloatBadge float={sel.float} />
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={floatTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F4F5F7" />
                <XAxis dataKey="week" tick={{ fontSize:10, fill:'#97A0AF' }} />
                <YAxis domain={[0,10]} tick={{ fontSize:10, fill:'#97A0AF' }} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={5} stroke="#FF8B00" strokeDasharray="4 2" label={{ value:'Near-crit (5d)', fontSize:9, fill:'#FF8B00' }} />
                <ReferenceLine y={0} stroke="#DE350B" strokeWidth={2} />
                <Line type="monotone" dataKey="tf" stroke="#0052CC" strokeWidth={2.5} dot={{ r:3, fill:'#0052CC' }}
                  activeDot={{ r:5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Float log */}
        <div className="mc-card">
          <div style={{ padding:'14px 18px', borderBottom:'1px solid #F4F5F7', fontSize:13, fontWeight:700, color:'#172B4D' }}>
            Float Log — A12 Electrical First Fix
          </div>
          <table className="mc-table">
            <thead>
              <tr><th>Week</th><th>Event</th><th>TF</th><th>Cause</th></tr>
            </thead>
            <tbody>
              {floatLog.map((entry, i) => (
                <tr key={i}>
                  <td style={{ fontWeight:700, color:'#0052CC' }}>{entry.date}</td>
                  <td>{entry.event}</td>
                  <td>
                    <span style={{ fontWeight:700, color: entry.tf===0?'#DE350B':entry.tf<=3?'#FF8B00':'#00875A' }}>
                      {entry.tf}d
                    </span>
                  </td>
                  <td>
                    <span style={{
                      fontSize:10, padding:'2px 7px', borderRadius:10, fontWeight:700,
                      background: entry.cause==='Compensable'?'#DEEBFF':entry.cause==='Contractor risk'?'#FFEBE6':entry.cause==='EOT applied'?'#E3FCEF':'#F4F5F7',
                      color: entry.cause==='Compensable'?'#0052CC':entry.cause==='Contractor risk'?'#DE350B':entry.cause==='EOT applied'?'#00875A':'#6B778C',
                    }}>{entry.cause}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
