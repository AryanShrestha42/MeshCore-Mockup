import React, { useState } from 'react';
import { activities } from '../data/mockData';
import { ChevronDown, ChevronRight, Filter, ZoomIn, ZoomOut, Calendar } from 'lucide-react';

const TOTAL_WEEKS = 24;
const DATA_DATE = 14;

const typeColors = {
  critical: '#DE350B',
  near:     '#FF8B00',
  normal:   '#0052CC',
  summary:  '#253858',
  hammock:  '#6554C0',
  milestone:'#172B4D',
};

function GanttBar({ activity, totalWeeks }) {
  if (activity.type === 'milestone') {
    const left = ((activity.start - 1) / totalWeeks) * 100;
    return (
      <div style={{ position:'absolute', left:`${left}%`, top:7, transform:'translateX(-50%)' }}>
        <div style={{ width:12, height:12, background:'#172B4D', transform:'rotate(45deg)', border:'2px solid #fff' }} />
      </div>
    );
  }
  const left = ((activity.start - 1) / totalWeeks) * 100;
  const width = (activity.dur / totalWeeks) * 100;
  const floatWidth = (activity.float / totalWeeks) * 100;
  const isCrit = activity.crit;
  const isSummary = activity.type === 'summary' || activity.type === 'hammock';
  const barH = isSummary ? 8 : 18;
  const barTop = isSummary ? 11 : 7;
  const color = isSummary ? typeColors.summary : isCrit ? typeColors.critical : activity.float <= 2 ? typeColors.near : typeColors.normal;

  return (
    <>
      <div style={{
        position:'absolute', left:`${left}%`, width:`${width}%`,
        height:barH, top:barTop, background:color, borderRadius:isSummary?1:3,
        display:'flex', alignItems:'center', paddingLeft:4,
        overflow:'hidden', cursor:'pointer',
      }}>
        {!isSummary && width > 6 && (
          <span style={{ fontSize:9, color:'#fff', fontWeight:700, whiteSpace:'nowrap' }}>
            {activity.pct}%
          </span>
        )}
        {/* Actual progress overlay */}
        {!isSummary && (
          <div style={{
            position:'absolute', left:0, top:0, height:'100%',
            width:`${activity.pct}%`, background:'rgba(0,0,0,0.2)', borderRadius:3,
          }} />
        )}
      </div>
      {/* Float bar */}
      {activity.float > 0 && !isCrit && (
        <div style={{
          position:'absolute', left:`${left + width}%`, width:`${floatWidth}%`,
          height:18, top:7, background: activity.float <= 2 ? '#FF8B00' : '#DEEBFF',
          borderRadius:3, opacity:0.5, border:`1px dashed ${activity.float <= 2 ? '#FF8B00' : '#0052CC'}`,
        }} />
      )}
    </>
  );
}

export default function Programme() {
  const [collapsed, setCollapsed] = useState({});
  const [showBaseline, setShowBaseline] = useState(true);
  const [filterCrit, setFilterCrit] = useState(false);
  const weeks = Array.from({length: TOTAL_WEEKS}, (_, i) => i + 1);

  const toggleCollapse = (id) => setCollapsed(p => ({ ...p, [id]: !p[id] }));

  const visible = activities.filter(a => {
    if (filterCrit && !a.crit && a.float > 0) return false;
    return true;
  });

  const ROW_H = 32;

  return (
    <div className="page-enter" style={{ padding:'24px', height:'calc(100vh - 100px)', display:'flex', flexDirection:'column' }}>
      {/* Toolbar */}
      <div className="mc-card" style={{ padding:'10px 16px', marginBottom:16, display:'flex', alignItems:'center', gap:12 }}>
        <div style={{ display:'flex', gap:6 }}>
          {[
            { label:'All Activities', active:!filterCrit, onClick:()=>setFilterCrit(false) },
            { label:'Critical Path Only', active:filterCrit, onClick:()=>setFilterCrit(true) },
          ].map(b => (
            <button key={b.label} onClick={b.onClick} style={{
              padding:'5px 12px', borderRadius:4, border:'1px solid #DFE1E6', cursor:'pointer', fontSize:12, fontWeight:600,
              background: b.active ? '#0052CC' : '#fff', color: b.active ? '#fff' : '#6B778C', transition:'all 0.15s',
            }}>{b.label}</button>
          ))}
        </div>
        <div style={{ width:1, height:20, background:'#DFE1E6' }} />
        <label style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'#6B778C', cursor:'pointer' }}>
          <input type="checkbox" checked={showBaseline} onChange={e => setShowBaseline(e.target.checked)} />
          Show Baseline
        </label>
        <div style={{ marginLeft:'auto', display:'flex', gap:16, fontSize:11 }}>
          {[
            { color:'#DE350B', label:'Critical' },
            { color:'#FF8B00', label:'Near-Critical (≤2d float)' },
            { color:'#0052CC', label:'Non-Critical' },
            { color:'#DEEBFF', label:'Float buffer', border:'1px dashed #0052CC' },
            { color:'#172B4D', label:'Milestone ◆' },
          ].map(l => (
            <div key={l.label} style={{ display:'flex', alignItems:'center', gap:4 }}>
              <div style={{ width:14, height:8, background:l.color, borderRadius:2, border:l.border||'none' }} />
              <span style={{ color:'#6B778C' }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Gantt layout */}
      <div className="mc-card" style={{ flex:1, display:'flex', overflow:'hidden' }}>
        {/* Left: WBS column */}
        <div style={{ width:280, minWidth:280, borderRight:'1px solid #DFE1E6', overflow:'hidden', display:'flex', flexDirection:'column' }}>
          {/* Header */}
          <div style={{ height:48, background:'#F4F5F7', borderBottom:'1px solid #DFE1E6', display:'flex', alignItems:'center', padding:'0 12px', gap:8 }}>
            <Calendar size={13} color="#6B778C" />
            <span style={{ fontSize:11, fontWeight:700, color:'#6B778C', textTransform:'uppercase', letterSpacing:'0.06em' }}>Activity</span>
          </div>
          {/* Activity labels */}
          <div style={{ overflowY:'auto', flex:1 }}>
            {visible.map(a => (
              <div key={a.id} style={{
                height:ROW_H, display:'flex', alignItems:'center',
                paddingLeft: 8 + a.level * 12,
                paddingRight:8,
                borderBottom:'1px solid #F4F5F7',
                background: a.crit ? 'rgba(222,53,11,0.03)' : 'transparent',
              }}>
                <div style={{ display:'flex', alignItems:'center', gap:4, overflow:'hidden' }}>
                  {(a.type === 'summary') && (
                    <div onClick={() => toggleCollapse(a.id)} style={{ cursor:'pointer', color:'#97A0AF', flexShrink:0 }}>
                      {collapsed[a.id] ? <ChevronRight size={12}/> : <ChevronDown size={12}/>}
                    </div>
                  )}
                  <span style={{
                    fontSize: a.type==='summary' ? 11 : 12,
                    fontWeight: a.type==='summary' ? 700 : a.crit ? 600 : 400,
                    color: a.type==='summary' ? '#253858' : a.type==='milestone' ? '#172B4D' : a.crit ? '#DE350B' : '#172B4D',
                    whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis',
                  }}>
                    {a.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Gantt chart */}
        <div style={{ flex:1, overflow:'auto', display:'flex', flexDirection:'column' }}>
          {/* Week headers */}
          <div style={{ height:48, background:'#F4F5F7', borderBottom:'1px solid #DFE1E6', display:'flex', position:'sticky', top:0, zIndex:10 }}>
            {weeks.map(w => (
              <div key={w} style={{
                flex:1, minWidth:28, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                borderRight:'1px solid #DFE1E6', position:'relative',
                background: w === DATA_DATE ? '#FFF0B3' : w <= DATA_DATE ? '#FAFBFC' : '#fff',
              }}>
                <span style={{ fontSize:9, fontWeight:w===DATA_DATE?800:600, color: w===DATA_DATE?'#FF8B00':w<=DATA_DATE?'#97A0AF':'#6B778C', letterSpacing:'0.02em' }}>W{w}</span>
                {w === DATA_DATE && (
                  <div style={{ position:'absolute', bottom:0, width:2, height:6, background:'#FF8B00' }} />
                )}
              </div>
            ))}
          </div>

          {/* Activity rows */}
          <div style={{ position:'relative' }}>
            {/* Data date line */}
            <div style={{
              position:'absolute', top:0, bottom:0, zIndex:5, pointerEvents:'none',
              left:`${((DATA_DATE - 0.5) / TOTAL_WEEKS) * 100}%`,
              borderLeft:'2px dashed #FF8B00', opacity:0.6,
            }} />

            {visible.map(a => (
              <div key={a.id} style={{
                height:ROW_H, borderBottom:'1px solid #F4F5F7', position:'relative',
                display:'flex', alignItems:'center',
                background: a.crit ? 'rgba(222,53,11,0.02)' : 'transparent',
              }}
              className="gantt-row"
              >
                {/* Week grid lines */}
                {weeks.map(w => (
                  <div key={w} style={{
                    position:'absolute', top:0, bottom:0,
                    left:`${((w-1)/TOTAL_WEEKS)*100}%`, width:`${100/TOTAL_WEEKS}%`,
                    background: w === DATA_DATE ? 'rgba(255,152,0,0.04)' : w % 4 === 0 ? 'rgba(9,30,66,0.01)' : 'transparent',
                    borderRight:'1px solid rgba(9,30,66,0.04)',
                  }} />
                ))}
                {/* Gantt bar */}
                <GanttBar activity={a} totalWeeks={TOTAL_WEEKS} />
                {/* Baseline bar (offset below) */}
                {showBaseline && a.type !== 'milestone' && (
                  <div style={{
                    position:'absolute',
                    left:`${((a.start-1)/TOTAL_WEEKS)*100}%`,
                    width:`${(a.dur/TOTAL_WEEKS)*100}%`,
                    height:3, top:24,
                    background:'rgba(9,30,66,0.15)', borderRadius:2,
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right stats column */}
        <div style={{ width:80, minWidth:80, borderLeft:'1px solid #DFE1E6', overflow:'hidden', flexDirection:'column', display:'flex' }}>
          <div style={{ height:48, background:'#F4F5F7', borderBottom:'1px solid #DFE1E6', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontSize:9, fontWeight:700, color:'#6B778C', textTransform:'uppercase', letterSpacing:'0.06em' }}>TF</span>
          </div>
          {visible.map(a => (
            <div key={a.id} style={{ height:ROW_H, borderBottom:'1px solid #F4F5F7', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span style={{
                fontSize:12, fontWeight:700,
                color: a.float === 0 ? '#DE350B' : a.float <= 2 ? '#FF8B00' : '#00875A',
              }}>
                {a.type === 'milestone' ? '●' : a.float === 0 ? '0d' : `${a.float}d`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
