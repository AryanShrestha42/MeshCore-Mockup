import React from 'react';
import { Search, Plus, ChevronRight } from 'lucide-react';

const pageLabels = {
  portfolio:   { title: 'Portfolio', sub: 'All active projects' },
  project:     { title: 'Project Overview', sub: 'Sydney CBD Office Fitout · MCB-001' },
  programme:   { title: 'Programme / Gantt', sub: 'CPM Schedule · Baseline vs Current · Data Date: W14' },
  float:       { title: 'Float Analysis', sub: 'Total Float · Free Float · Near-Critical Monitoring' },
  evm:         { title: 'Earned Value Management', sub: 'PV · EV · AC · SPI · CPI · EAC · VAC' },
  resources:   { title: 'Resource Management', sub: 'Histogram · Conflicts · Resource Library' },
  risk:        { title: 'Risk Register', sub: 'Monte Carlo · PERT · Float Monitoring' },
  reporting:   { title: 'Reporting & Dashboards', sub: 'Monthly Reports · SHA-256 Archive · Alert Centre' },
  tendering:   { title: 'Tendering', sub: 'Tender Pipeline · WBS Pricing · Award' },
};

export default function Topbar({ page, onNav }) {
  const info = pageLabels[page] || pageLabels.portfolio;

  return (
    <div style={{
      background: '#fff',
      borderBottom: '1px solid #DFE1E6',
      padding: '0 24px',
      height: 52,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      position: 'sticky', top: 0, zIndex: 40,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ color: '#0052CC', fontSize: 13, fontWeight: 600, cursor: 'pointer' }} onClick={() => onNav('portfolio')}>MeshCore</span>
        <ChevronRight size={14} color="#97A0AF" />
        <span style={{ color: '#172B4D', fontSize: 14, fontWeight: 600 }}>{info.title}</span>
        <span style={{ color: '#97A0AF', fontSize: 13 }}>·</span>
        <span style={{ color: '#6B778C', fontSize: 12 }}>{info.sub}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: '#F4F5F7', borderRadius: 4, padding: '5px 10px',
          border: '1px solid #DFE1E6',
        }}>
          <Search size={13} color="#97A0AF" />
          <input placeholder="Search activities, risks, claims..." style={{
            border: 'none', background: 'none', outline: 'none',
            fontSize: 13, color: '#172B4D', width: 220,
          }} />
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 5,
          background: '#0052CC', color: '#fff', border: 'none', borderRadius: 4,
          padding: '6px 12px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
        }}>
          <Plus size={14} />
          New
        </button>
        <div style={{
          width: 28, height: 28, borderRadius: '50%', background: '#0052CC',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer',
        }}>JC</div>
      </div>
    </div>
  );
}
