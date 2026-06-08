import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Portfolio from './pages/Portfolio';
import ProjectOverview from './pages/ProjectOverview';
import Programme from './pages/Programme';
import FloatAnalysis from './pages/FloatAnalysis';
import EVM from './pages/EVM';
import Resources from './pages/Resources';
import RiskRegister from './pages/RiskRegister';
import Reporting from './pages/Reporting';
import Tendering from './pages/Tendering';

function Page({ page, onNav }) {
  switch (page) {
    case 'portfolio':   return <Portfolio onProjectSelect={() => onNav('project')} />;
    case 'project':     return <ProjectOverview onNav={onNav} />;
    case 'programme':   return <Programme />;
    case 'float':       return <FloatAnalysis />;
    case 'evm':         return <EVM />;
    case 'resources':   return <Resources />;
    case 'risk':        return <RiskRegister />;
    case 'reporting':   return <Reporting />;
    case 'tendering':   return <Tendering />;
    default:            return <Portfolio onProjectSelect={() => onNav('project')} />;
  }
}

export default function App() {
  const [page, setPage] = useState('portfolio');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F4F5F7' }}>
      <Sidebar active={page} onNav={setPage} alertCount={3} />
      <div style={{ marginLeft: 220, flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Topbar page={page} onNav={setPage} />
        <main style={{ flex: 1, overflowY: 'auto' }}>
          <Page page={page} onNav={setPage} key={page} />
        </main>
      </div>
    </div>
  );
}
