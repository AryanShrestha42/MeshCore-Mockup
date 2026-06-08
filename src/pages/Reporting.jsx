import React, { useState } from 'react';
import { recentAlerts, monthlyReports } from '../data/mockData';
import { FileText, Bell, Lock, CheckCircle, AlertTriangle, Clock, FileCheck } from 'lucide-react';

const alertTypes = {
  programme:  { color:'#0052CC', bg:'#DEEBFF', icon:'📊', label:'Programme' },
  financial:  { color:'#00875A', bg:'#E3FCEF', icon:'💰', label:'Financial' },
  commercial: { color:'#FF8B00', bg:'#FFFAE6', icon:'⚖️', label:'Commercial' },
  risk:       { color:'#DE350B', bg:'#FFEBE6', icon:'🛡️', label:'Risk' },
};

const severityStyle = {
  critical: { color:'#DE350B', bg:'#FFEBE6', label:'Critical' },
  warning:  { color:'#FF8B00', bg:'#FFFAE6', label:'Warning' },
  info:     { color:'#0052CC', bg:'#DEEBFF', label:'Info' },
};

const reportSections = [
  { label:'1. Executive Summary', auto:true },
  { label:'2. Programme Status (SPI, Gantt excerpt)', auto:true },
  { label:'3. Financial Status (CPI, EVM metrics)', auto:true },
  { label:'4. Variations & EOT Summary', auto:true },
  { label:'5. Risk Register Update', auto:true },
  { label:'6. Lookahead (next 30 days)', auto:false, note:'PM authors narrative' },
  { label:'7. Supporting Attachments', auto:true },
];

export default function Reporting() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const filteredAlerts = activeFilter === 'all' ? recentAlerts : recentAlerts.filter(a => a.type === activeFilter);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 1500);
  };

  return (
    <div className="page-enter" style={{ padding:'24px', display:'flex', flexDirection:'column', gap:20 }}>

      {/* Alert Centre */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
        <div className="mc-card">
          <div style={{ padding:'14px 18px', borderBottom:'1px solid #F4F5F7', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <Bell size={15} color="#0052CC" />
              <span style={{ fontSize:13, fontWeight:700, color:'#172B4D' }}>Alert Centre</span>
              <span style={{ background:'#FFEBE6', color:'#DE350B', padding:'2px 8px', borderRadius:10, fontSize:11, fontWeight:700 }}>
                {recentAlerts.filter(a=>a.severity!=='info').length} active
              </span>
            </div>
            <div style={{ display:'flex', gap:5 }}>
              {['all','programme','financial','commercial','risk'].map(f => {
                const t = f !== 'all' ? alertTypes[f] : null;
                return (
                  <button key={f} onClick={() => setActiveFilter(f)} style={{
                    padding:'3px 9px', borderRadius:4, border:'1px solid #DFE1E6', cursor:'pointer', fontSize:11, fontWeight:600,
                    background: activeFilter===f ? (t?t.color:'#0052CC') : '#fff',
                    color: activeFilter===f ? '#fff' : '#6B778C',
                  }}>
                    {f==='all' ? 'All' : t?.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div style={{ padding:'14px 18px', display:'flex', flexDirection:'column', gap:8, maxHeight:340, overflowY:'auto' }}>
            {filteredAlerts.map(alert => {
              const at = alertTypes[alert.type];
              const sv = severityStyle[alert.severity];
              return (
                <div key={alert.id} style={{
                  border:`1px solid ${sv.color}33`,
                  borderLeft:`3px solid ${sv.color}`,
                  borderRadius:4, padding:'10px 12px',
                  background: alert.severity === 'critical' ? '#FFFAFA' : '#fff',
                }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:8 }}>
                    <div style={{ display:'flex', gap:8, alignItems:'flex-start' }}>
                      <span style={{ fontSize:14, marginTop:1 }}>{at?.icon}</span>
                      <div>
                        <div style={{ fontSize:11, fontWeight:700, color:'#6B778C', marginBottom:3 }}>
                          <span style={{ background:at?.bg, color:at?.color, padding:'1px 6px', borderRadius:8, marginRight:6 }}>{at?.label}</span>
                          <span style={{ background:sv.bg, color:sv.color, padding:'1px 6px', borderRadius:8 }}>{sv.label}</span>
                        </div>
                        <div style={{ fontSize:12, color:'#172B4D', lineHeight:1.4 }}>{alert.msg}</div>
                      </div>
                    </div>
                    <span style={{ fontSize:10, color:'#C1C7D0', whiteSpace:'nowrap', flexShrink:0 }}>{alert.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Report Generator */}
        <div className="mc-card">
          <div style={{ padding:'14px 18px', borderBottom:'1px solid #F4F5F7', display:'flex', alignItems:'center', gap:8 }}>
            <FileText size={15} color="#0052CC" />
            <span style={{ fontSize:13, fontWeight:700, color:'#172B4D' }}>Monthly Report Generator</span>
            <span style={{ background:'#E3FCEF', color:'#00875A', padding:'2px 8px', borderRadius:10, fontSize:11, fontWeight:700 }}>30 min</span>
          </div>
          <div style={{ padding:'16px 18px' }}>
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:11, fontWeight:700, color:'#6B778C', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:10 }}>
                Report Sections — Month 4 (W13–W16)
              </div>
              {reportSections.map((s, i) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom:'1px solid #F4F5F7' }}>
                  <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                    {s.auto
                      ? <CheckCircle size={13} color="#00875A" />
                      : <Clock size={13} color="#FF8B00" />
                    }
                    <span style={{ fontSize:12, color:'#172B4D' }}>{s.label}</span>
                    {s.note && <span style={{ fontSize:10, color:'#97A0AF' }}>({s.note})</span>}
                  </div>
                  <span style={{
                    fontSize:10, padding:'2px 7px', borderRadius:10, fontWeight:700,
                    background: s.auto ? '#E3FCEF' : '#FFFAE6',
                    color: s.auto ? '#00875A' : '#FF8B00',
                  }}>
                    {s.auto ? 'Auto-generated' : 'Manual input'}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ background:'#F0F5FF', borderRadius:4, padding:'10px 12px', marginBottom:14, fontSize:11, color:'#0052CC' }}>
              6 of 7 sections generated automatically from live diary data. Only the narrative section requires PM input.
            </div>
            <button onClick={handleGenerate} disabled={generating} style={{
              width:'100%', padding:'10px', background: generating ? '#97A0AF' : '#0052CC',
              color:'#fff', border:'none', borderRadius:4, fontSize:13, fontWeight:700, cursor: generating ? 'default' : 'pointer',
              display:'flex', alignItems:'center', justifyContent:'center', gap:8, transition:'background 0.2s',
            }}>
              {generating ? '⏳ Generating report…' : generated ? '✓ Report Generated' : '⚡ Generate Month 4 Report'}
            </button>
            {generated && (
              <div style={{ marginTop:10, background:'#E3FCEF', borderRadius:4, padding:'8px 12px', display:'flex', gap:8, alignItems:'center' }}>
                <Lock size={12} color="#00875A" />
                <span style={{ fontSize:11, color:'#00875A', fontWeight:700 }}>SHA-256 hash generated · Report timestamped · Added to archive</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SHA-256 Report Archive */}
      <div className="mc-card">
        <div style={{ padding:'14px 18px', borderBottom:'1px solid #F4F5F7', display:'flex', alignItems:'center', gap:8 }}>
          <Lock size={15} color="#6554C0" />
          <span style={{ fontSize:13, fontWeight:700, color:'#172B4D' }}>SHA-256 Evidence Archive</span>
          <span style={{ fontSize:11, color:'#97A0AF', marginLeft:4 }}>Cryptographic proof reports were not modified after submission</span>
        </div>
        <table className="mc-table">
          <thead>
            <tr><th>Report</th><th>Period</th><th>Generated</th><th>Status</th><th>SHA-256 Hash</th><th>Verified</th></tr>
          </thead>
          <tbody>
            {monthlyReports.map(r => (
              <tr key={r.id}>
                <td style={{ fontWeight:700, color:'#0052CC' }}>{r.id}</td>
                <td style={{ fontSize:12 }}>{r.period}</td>
                <td style={{ fontSize:12, color:'#6B778C' }}>{r.date}</td>
                <td>
                  <span style={{
                    fontSize:11, padding:'2px 8px', borderRadius:10, fontWeight:700,
                    background: r.status==='submitted'?'#E3FCEF':r.status==='draft'?'#FFFAE6':'#F4F5F7',
                    color: r.status==='submitted'?'#00875A':r.status==='draft'?'#FF8B00':'#6B778C',
                    textTransform:'capitalize',
                  }}>{r.status}</span>
                </td>
                <td style={{ fontSize:11, fontFamily:'monospace', color: r.sha ? '#6554C0' : '#97A0AF' }}>
                  {r.sha || (generated && r.id==='RPT-004' ? 'd2f8a1c4b9e3f7a2…' : '—')}
                </td>
                <td>
                  {r.sha ? (
                    <div style={{ display:'flex', alignItems:'center', gap:4, color:'#00875A' }}>
                      <CheckCircle size={13} />
                      <span style={{ fontSize:11, fontWeight:600 }}>Verified</span>
                    </div>
                  ) : r.status==='draft' ? (
                    <span style={{ fontSize:11, color:'#97A0AF' }}>Pending</span>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding:'14px 18px', background:'#F8F9FB', borderTop:'1px solid #F4F5F7', fontSize:11, color:'#6B778C' }}>
          <Lock size={12} style={{ marginRight:6, verticalAlign:'middle' }} />
          All submitted reports are cryptographically sealed. Hash stored separately — report content changes invalidate verification.
          Adjudicators can confirm reports were not modified post-submission.
        </div>
      </div>

      {/* Superintendent Portal preview */}
      <div className="mc-card">
        <div style={{ padding:'14px 18px', borderBottom:'1px solid #F4F5F7', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <div style={{ fontSize:13, fontWeight:700, color:'#172B4D' }}>Superintendent Portal — Access Control</div>
            <div style={{ fontSize:11, color:'#97A0AF' }}>Contractor controls exactly what the superintendent can see</div>
          </div>
          <button style={{ padding:'6px 12px', background:'#F4F5F7', color:'#6B778C', border:'1px solid #DFE1E6', borderRadius:4, fontSize:12, fontWeight:600, cursor:'pointer' }}>
            Configure Access
          </button>
        </div>
        <div style={{ padding:'16px 18px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
          <div>
            <div style={{ fontSize:11, fontWeight:700, color:'#00875A', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:8 }}>✓ Superintendent CAN See</div>
            {['Programme Gantt with completion percentages','SPI and CPI (summary only, no trend data)','Diary entry dates (frequency confirmation)','Milestone completion status','Monthly reports (once submitted)'].map(i => (
              <div key={i} style={{ display:'flex', gap:8, alignItems:'center', padding:'5px 0', borderBottom:'1px solid #F4F5F7' }}>
                <CheckCircle size={12} color="#00875A" />
                <span style={{ fontSize:12, color:'#172B4D' }}>{i}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize:11, fontWeight:700, color:'#DE350B', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:8 }}>✗ Superintendent CANNOT See</div>
            {['EAC, ETC, VAC — the financial forecast','Pending EOT claim values or strategy','Variation register claim amounts or strategy','Risk register commercial analysis','Cost report margin or financial position'].map(i => (
              <div key={i} style={{ display:'flex', gap:8, alignItems:'center', padding:'5px 0', borderBottom:'1px solid #F4F5F7' }}>
                <div style={{ width:12, height:12, background:'#FFEBE6', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <span style={{ fontSize:8, color:'#DE350B', fontWeight:800 }}>✕</span>
                </div>
                <span style={{ fontSize:12, color:'#172B4D' }}>{i}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
