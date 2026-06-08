import React from 'react';
import {
  LayoutDashboard, FolderKanban, Network, TrendingUp,
  Users, ShieldAlert, FileBarChart2, ClipboardList,
  ChevronRight, Bell, Settings, HelpCircle, Activity,
} from 'lucide-react';

const nav = [
  { group: 'OVERVIEW' },
  { id: 'portfolio',      label: 'Portfolio',          icon: LayoutDashboard },
  { id: 'project',        label: 'Project Overview',   icon: FolderKanban },
  { group: 'PROGRAMME' },
  { id: 'programme',      label: 'Programme / Gantt',  icon: Network },
  { id: 'float',          label: 'Float Analysis',     icon: Activity },
  { group: 'COMMERCIAL' },
  { id: 'evm',            label: 'Earned Value (EVM)', icon: TrendingUp },
  { id: 'resources',      label: 'Resource Management',icon: Users },
  { id: 'risk',           label: 'Risk Register',      icon: ShieldAlert },
  { group: 'ADMIN' },
  { id: 'reporting',      label: 'Reporting',          icon: FileBarChart2 },
  { id: 'tendering',      label: 'Tendering',          icon: ClipboardList },
];

export default function Sidebar({ active, onNav, alertCount = 3 }) {
  return (
    <div style={{
      width: 220,
      minWidth: 220,
      background: '#0A1628',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'fixed',
      left: 0, top: 0,
      zIndex: 50,
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 16px 12px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, background: '#0052CC', borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 15, letterSpacing: '-0.01em' }}>MeshCore</div>
            <div style={{ color: '#6B8DB5', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>PM Platform</div>
          </div>
        </div>
      </div>

      {/* Project selector */}
      <div style={{ padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{
          background: 'rgba(255,255,255,0.06)', borderRadius: 6, padding: '8px 10px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer',
        }}>
          <div>
            <div style={{ color: '#fff', fontSize: 11, fontWeight: 600, lineHeight: 1.3 }}>Sydney CBD Fitout</div>
            <div style={{ color: '#6B8DB5', fontSize: 10 }}>MCB-001 · Active</div>
          </div>
          <ChevronRight size={14} color="#6B8DB5" />
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '8px 8px', overflowY: 'auto' }}>
        {nav.map((item, i) => {
          if (item.group) return (
            <div key={i} style={{
              fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#3D5470', padding: '12px 4px 4px', marginTop: i > 0 ? 4 : 0,
            }}>{item.group}</div>
          );
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <div
              key={item.id}
              className={`nav-item${isActive ? ' active' : ''}`}
              onClick={() => onNav(item.id)}
            >
              <Icon size={15} />
              <span>{item.label}</span>
            </div>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ padding: '10px 8px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 4 }}>
        <button style={{ flex:1, background:'none', border:'none', cursor:'pointer', color:'#6B8DB5', display:'flex', alignItems:'center', justifyContent:'center', padding:'6px', borderRadius:4 }}
          title="Alerts">
          <div style={{ position:'relative' }}>
            <Bell size={16} />
            {alertCount > 0 && (
              <span style={{ position:'absolute', top:-6, right:-6, background:'#DE350B', color:'#fff', borderRadius:8, fontSize:9, fontWeight:700, minWidth:14, height:14, display:'flex', alignItems:'center', justifyContent:'center', padding:'0 3px' }}>
                {alertCount}
              </span>
            )}
          </div>
        </button>
        <button style={{ flex:1, background:'none', border:'none', cursor:'pointer', color:'#6B8DB5', display:'flex', alignItems:'center', justifyContent:'center', padding:'6px', borderRadius:4 }} title="Settings">
          <Settings size={16} />
        </button>
        <button style={{ flex:1, background:'none', border:'none', cursor:'pointer', color:'#6B8DB5', display:'flex', alignItems:'center', justifyContent:'center', padding:'6px', borderRadius:4 }} title="Help">
          <HelpCircle size={16} />
        </button>
      </div>
    </div>
  );
}
