import React, { useState } from 'react';
import { projects } from '../data/mockData';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, Clock, DollarSign, ChevronRight, Filter } from 'lucide-react';

const RAG = {
  green: { bg: '#E3FCEF', border: '#00875A', dot: '#00875A', label: 'On Track' },
  amber: { bg: '#FFFAE6', border: '#FF8B00', dot: '#FF8B00', label: 'At Risk' },
  red:   { bg: '#FFEBE6', border: '#DE350B', dot: '#DE350B', label: 'Critical' },
};

function MetricPill({ label, value, trend }) {
  const isGood = trend === 'up' ? value >= 1 : value >= 0;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#97A0AF' }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: isGood ? '#00875A' : '#DE350B' }}>
          {typeof value === 'number' && value < 10 ? value.toFixed(3) : value}
        </span>
      </div>
    </div>
  );
}

function ProjectCard({ project, onClick }) {
  const rag = RAG[project.rag];
  const fmtM = v => `$${(Math.abs(v)/1000000).toFixed(2)}M`;

  return (
    <div
      onClick={() => onClick(project)}
      style={{
        background: '#fff', borderRadius: 6,
        border: `1px solid ${rag.border}22`,
        boxShadow: '0 1px 3px rgba(9,30,66,0.1)',
        padding: 0, cursor: 'pointer', overflow: 'hidden',
        transition: 'box-shadow 0.15s, transform 0.1s',
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow='0 4px 12px rgba(9,30,66,0.18)'; e.currentTarget.style.transform='translateY(-1px)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow='0 1px 3px rgba(9,30,66,0.1)'; e.currentTarget.style.transform='none'; }}
    >
      {/* Top color bar */}
      <div style={{ height: 3, background: rag.dot }} />

      <div style={{ padding: '14px 16px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#172B4D', lineHeight: 1.3 }}>{project.name}</div>
            <div style={{ fontSize: 11, color: '#97A0AF', marginTop: 2 }}>{project.code} · {project.type}</div>
          </div>
          <span style={{ ...badgeStyle(project.rag), fontSize: 10, padding: '2px 7px' }}>
            {rag.label}
          </span>
        </div>

        {/* Client + PM */}
        <div style={{ fontSize: 11, color: '#6B778C', marginBottom: 12 }}>
          {project.client} · PM: {project.pm}
        </div>

        {/* Metrics grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
          <MetricPill label="CPI" value={project.cpi} trend="up" />
          <MetricPill label="SPI" value={project.spi} trend="up" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#97A0AF' }}>Forecast</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: project.forecastVariance < 0 ? '#DE350B' : '#00875A' }}>
              {project.forecastVariance === 0 ? 'On time' : `${Math.abs(project.forecastVariance)}w ${project.forecastVariance < 0 ? 'late' : 'early'}`}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#97A0AF' }}>EOT Cov.</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: project.eotCoverage >= 80 ? '#00875A' : project.eotCoverage >= 50 ? '#FF8B00' : '#DE350B' }}>
              {project.eotCoverage}%
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 10, color: '#97A0AF' }}>Progress</span>
            <span style={{ fontSize: 10, color: '#97A0AF' }}>{project.percentComplete}% actual / {project.baselineComplete}% planned</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${project.baselineComplete}%`, background: '#DEEBFF' }} />
          </div>
          <div className="progress-bar" style={{ marginTop: 2 }}>
            <div className="progress-fill" style={{ width: `${project.percentComplete}%`, background: project.spi >= 1 ? '#00875A' : '#0052CC' }} />
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1px solid #F4F5F7' }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <span style={{ fontSize: 11, color: '#6B778C' }}>W{project.currentWeek}/{project.totalWeeks}</span>
            <span style={{ fontSize: 11, color: '#6B778C' }}>{fmtM(project.value)}</span>
            <span style={{ fontSize: 11, color: '#6B778C' }}>{project.location}</span>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {project.pendingEOT > 0 && (
              <span style={{ fontSize: 10, background: '#FFEBE6', color: '#DE350B', padding: '2px 6px', borderRadius: 10, fontWeight: 600 }}>
                {project.pendingEOT} EOT
              </span>
            )}
            {project.pendingVariations > 0 && (
              <span style={{ fontSize: 10, background: '#DEEBFF', color: '#0052CC', padding: '2px 6px', borderRadius: 10, fontWeight: 600 }}>
                {project.pendingVariations} Var
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function badgeStyle(rag) {
  const map = {
    green: { background: '#E3FCEF', color: '#00875A' },
    amber: { background: '#FFFAE6', color: '#FF8B00' },
    red:   { background: '#FFEBE6', color: '#DE350B' },
  };
  return { ...map[rag], fontWeight: 700, borderRadius: 12, display: 'inline-block' };
}

export default function Portfolio({ onProjectSelect }) {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? projects : projects.filter(p => p.rag === filter);

  const summary = {
    total: projects.length,
    green: projects.filter(p => p.rag === 'green').length,
    amber: projects.filter(p => p.rag === 'amber').length,
    red: projects.filter(p => p.rag === 'red').length,
    totalValue: projects.reduce((s, p) => s + p.value, 0),
  };

  return (
    <div className="page-enter" style={{ padding: '24px' }}>
      {/* Summary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Active Projects', value: summary.total, icon: '📋', color: '#0052CC', bg: '#DEEBFF' },
          { label: 'On Track', value: summary.green, icon: '✅', color: '#00875A', bg: '#E3FCEF' },
          { label: 'At Risk', value: summary.amber, icon: '⚠️', color: '#FF8B00', bg: '#FFFAE6' },
          { label: 'Critical', value: summary.red, icon: '🔴', color: '#DE350B', bg: '#FFEBE6' },
          { label: 'Portfolio Value', value: `$${(summary.totalValue/1000000).toFixed(1)}M`, icon: '💰', color: '#6554C0', bg: '#EAE6FF' },
        ].map(s => (
          <div key={s.label} className="mc-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, background: s.bg, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
              {s.icon}
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#97A0AF', fontWeight: 600 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter toolbar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 18, alignItems: 'center' }}>
        <Filter size={14} color="#97A0AF" />
        {['all','green','amber','red'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '5px 12px', borderRadius: 16, border: 'none', cursor: 'pointer',
            fontSize: 12, fontWeight: 600,
            background: filter === f ? (f === 'all' ? '#0052CC' : f === 'green' ? '#00875A' : f === 'amber' ? '#FF8B00' : '#DE350B') : '#F4F5F7',
            color: filter === f ? '#fff' : '#6B778C',
            transition: 'all 0.15s',
          }}>
            {f === 'all' ? `All (${summary.total})` : f === 'green' ? `On Track (${summary.green})` : f === 'amber' ? `At Risk (${summary.amber})` : `Critical (${summary.red})`}
          </button>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 12, color: '#97A0AF' }}>
          Sorted by commercial risk · Data Date: W14
        </div>
      </div>

      {/* Project grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {filtered.map(p => (
          <ProjectCard key={p.id} project={p} onClick={onProjectSelect} />
        ))}
      </div>
    </div>
  );
}
