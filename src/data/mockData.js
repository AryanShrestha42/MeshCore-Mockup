// ─── PORTFOLIO PROJECTS ──────────────────────────────────────────────────────
export const projects = [
  {
    id: 'P001', code: 'MCB-001',
    name: 'Sydney CBD Office Fitout',
    client: 'Harborview Developments',
    type: 'Commercial Fitout',
    value: 4200000, startWeek: 1, totalWeeks: 24, currentWeek: 14,
    pcDate: '14 Nov 2025', ldRate: 4500,
    cpi: 0.882, spi: 0.857,
    eac: 4762000, vac: -562000, adjustedVac: 29000,
    eotCoverage: 72, pendingEOT: 3, pendingVariations: 5,
    forecastVariance: -6,
    rag: 'red',
    pm: 'James Chen', location: 'Sydney NSW',
    percentComplete: 50, baselineComplete: 58,
  },
  {
    id: 'P002', code: 'MCB-002',
    name: 'Melbourne Retail Renovation',
    client: 'Urban Spaces Pty Ltd',
    type: 'Commercial Fitout',
    value: 1850000, startWeek: 1, totalWeeks: 18, currentWeek: 8,
    pcDate: '22 Sep 2025', ldRate: 2500,
    cpi: 1.04, spi: 1.02,
    eac: 1779000, vac: 71000, adjustedVac: 85000,
    eotCoverage: 100, pendingEOT: 1, pendingVariations: 2,
    forecastVariance: 0,
    rag: 'green',
    pm: 'Sarah Mitchell', location: 'Melbourne VIC',
    percentComplete: 45, baselineComplete: 44,
  },
  {
    id: 'P003', code: 'MCB-003',
    name: 'Brisbane Industrial Demolition',
    client: 'Fortitude Valley Holdings',
    type: 'Demolition',
    value: 920000, startWeek: 1, totalWeeks: 12, currentWeek: 5,
    pcDate: '05 Aug 2025', ldRate: 1800,
    cpi: 0.91, spi: 0.88,
    eac: 1011000, vac: -91000, adjustedVac: -42000,
    eotCoverage: 55, pendingEOT: 2, pendingVariations: 4,
    forecastVariance: -2,
    rag: 'amber',
    pm: 'Tom Nguyen', location: 'Brisbane QLD',
    percentComplete: 38, baselineComplete: 43,
  },
  {
    id: 'P004', code: 'MCB-004',
    name: 'Perth Data Centre M&E',
    client: 'Technova Infrastructure',
    type: 'Mechanical & Electrical',
    value: 6800000, startWeek: 1, totalWeeks: 32, currentWeek: 10,
    pcDate: '28 Feb 2026', ldRate: 7500,
    cpi: 0.97, spi: 0.99,
    eac: 7010000, vac: -210000, adjustedVac: 45000,
    eotCoverage: 95, pendingEOT: 1, pendingVariations: 3,
    forecastVariance: -1,
    rag: 'green',
    pm: 'Linda Park', location: 'Perth WA',
    percentComplete: 31, baselineComplete: 31,
  },
  {
    id: 'P005', code: 'MCB-005',
    name: 'Gold Coast Residential Complex',
    client: 'Coastal Living Developments',
    type: 'Residential Construction',
    value: 2400000, startWeek: 1, totalWeeks: 20, currentWeek: 16,
    pcDate: '03 Oct 2025', ldRate: 3200,
    cpi: 0.79, spi: 0.74,
    eac: 3038000, vac: -638000, adjustedVac: -520000,
    eotCoverage: 28, pendingEOT: 0, pendingVariations: 7,
    forecastVariance: -10,
    rag: 'red',
    pm: 'Raj Patel', location: 'Gold Coast QLD',
    percentComplete: 62, baselineComplete: 84,
  },
  {
    id: 'P006', code: 'MCB-006',
    name: 'Adelaide Hospital Upgrade',
    client: 'SA Health Infrastructure',
    type: 'Structural & Civil',
    value: 3600000, startWeek: 1, totalWeeks: 28, currentWeek: 6,
    pcDate: '15 Jan 2026', ldRate: 5000,
    cpi: 1.01, spi: 1.0,
    eac: 3564000, vac: 36000, adjustedVac: 58000,
    eotCoverage: 100, pendingEOT: 0, pendingVariations: 1,
    forecastVariance: 0,
    rag: 'green',
    pm: 'Emma Watson', location: 'Adelaide SA',
    percentComplete: 21, baselineComplete: 21,
  },
  {
    id: 'P007', code: 'MCB-007',
    name: 'Canberra Office Tower Mechanical',
    client: 'Federal Properties Group',
    type: 'Mechanical & Electrical',
    value: 5100000, startWeek: 1, totalWeeks: 26, currentWeek: 18,
    pcDate: '20 Dec 2025', ldRate: 6000,
    cpi: 0.93, spi: 0.89,
    eac: 5484000, vac: -384000, adjustedVac: -210000,
    eotCoverage: 65, pendingEOT: 4, pendingVariations: 6,
    forecastVariance: -4,
    rag: 'amber',
    pm: 'David Kim', location: 'Canberra ACT',
    percentComplete: 67, baselineComplete: 75,
  },
  {
    id: 'P008', code: 'MCB-008',
    name: 'Newcastle Warehouse Fitout',
    client: 'Hunter Valley Logistics',
    type: 'Industrial Fitout',
    value: 780000, startWeek: 1, totalWeeks: 10, currentWeek: 3,
    pcDate: '12 Jul 2025', ldRate: 1200,
    cpi: 1.06, spi: 1.05,
    eac: 736000, vac: 44000, adjustedVac: 52000,
    eotCoverage: 100, pendingEOT: 0, pendingVariations: 0,
    forecastVariance: 1,
    rag: 'green',
    pm: 'Mia Thompson', location: 'Newcastle NSW',
    percentComplete: 30, baselineComplete: 29,
  },
];

// ─── ACTIVE PROJECT DETAIL (P001) ────────────────────────────────────────────
export const activeProject = projects[0];

// ─── WBS ACTIVITIES (for Programme view) ─────────────────────────────────────
export const activities = [
  { id:'A01', code:'1.0', name:'SYDNEY CBD OFFICE FITOUT', type:'summary', start:1, end:24, dur:24, float:0, ff:0, crit:true, pct:50, level:0, resources:[] },
  { id:'A02', code:'1.1', name:'Preliminaries (Site Establishment)', type:'hammock', start:1, end:24, dur:24, float:0, ff:0, crit:true, pct:50, level:1, resources:['Site Foreman','OH&S Officer'] },
  { id:'A03', code:'2.0', name:'DEMOLITION', type:'summary', start:1, end:3, dur:3, float:0, ff:0, crit:true, pct:100, level:0, resources:[] },
  { id:'A04', code:'2.1', name:'Strip-out & Asbestos Removal', type:'task', start:1, end:2, dur:2, float:0, ff:0, crit:true, pct:100, level:1, resources:['Demo Crew ×4'] },
  { id:'A05', code:'2.2', name:'Structural Demolition', type:'task', start:2, end:3, dur:2, float:0, ff:0, crit:true, pct:100, level:1, resources:['Demo Crew ×4','Tower Crane'] },
  { id:'A06', code:'3.0', name:'STRUCTURAL WORKS', type:'summary', start:2, end:7, dur:6, float:0, ff:0, crit:true, pct:100, level:0, resources:[] },
  { id:'A07', code:'3.1', name:'Slab Formwork Level 2', type:'task', start:2, end:4, dur:3, float:0, ff:0, crit:true, pct:100, level:1, resources:['Formwork Carpenters ×6','Tower Crane'] },
  { id:'A08', code:'3.2', name:'Concrete Pour & Cure L2', type:'task', start:4, end:6, dur:3, float:0, ff:0, crit:true, pct:100, level:1, resources:['Concreters ×4'] },
  { id:'A09', code:'3.3', name:'Slab Formwork Level 3', type:'task', start:5, end:7, dur:3, float:0, ff:0, crit:true, pct:100, level:1, resources:['Formwork Carpenters ×6','Tower Crane'] },
  { id:'A10', code:'4.0', name:'SERVICES - FIRST FIX', type:'summary', start:5, end:12, dur:8, float:0, ff:0, crit:true, pct:85, level:0, resources:[] },
  { id:'A11', code:'4.1', name:'Mechanical First Fix (HVAC)', type:'task', start:5, end:10, dur:6, float:2, ff:0, crit:false, pct:90, level:1, resources:['Mech Engineers ×3'] },
  { id:'A12', code:'4.2', name:'Electrical First Fix', type:'task', start:5, end:12, dur:8, float:0, ff:0, crit:true, pct:75, level:1, resources:['Sr Electricians ×4','Electricians ×2'] },
  { id:'A13', code:'4.3', name:'Hydraulic First Fix', type:'task', start:5, end:9, dur:5, float:5, ff:3, crit:false, pct:100, level:1, resources:['Plumbers ×2'] },
  { id:'A14', code:'4.4', name:'Fire Services First Fix', type:'task', start:6, end:10, dur:5, float:3, ff:0, crit:false, pct:85, level:1, resources:['Fire Eng ×2'] },
  { id:'A15', code:'5.0', name:'FRAMING & PARTITIONS', type:'summary', start:8, end:14, dur:7, float:0, ff:0, crit:true, pct:60, level:0, resources:[] },
  { id:'A16', code:'5.1', name:'Steel Stud Framing', type:'task', start:8, end:11, dur:4, float:0, ff:0, crit:true, pct:80, level:1, resources:['Carpenters ×6'] },
  { id:'A17', code:'5.2', name:'Plasterboard Lining', type:'task', start:10, end:14, dur:5, float:0, ff:0, crit:true, pct:40, level:1, resources:['Plasterers ×4'] },
  { id:'A18', code:'6.0', name:'SERVICES - SECOND FIX', type:'summary', start:13, end:19, dur:7, float:0, ff:0, crit:true, pct:20, level:0, resources:[] },
  { id:'A19', code:'6.1', name:'Electrical Second Fix', type:'task', start:13, end:17, dur:5, float:0, ff:0, crit:true, pct:30, level:1, resources:['Sr Electricians ×4'] },
  { id:'A20', code:'6.2', name:'Mechanical Second Fix (HVAC)', type:'task', start:13, end:16, dur:4, float:3, ff:0, crit:false, pct:20, level:1, resources:['Mech Engineers ×2'] },
  { id:'A21', code:'6.3', name:'Hydraulic Second Fix', type:'task', start:12, end:15, dur:4, float:4, ff:2, crit:false, pct:35, level:1, resources:['Plumbers ×2'] },
  { id:'A22', code:'7.0', name:'FINISHES', type:'summary', start:14, end:21, dur:8, float:0, ff:0, crit:true, pct:10, level:0, resources:[] },
  { id:'A23', code:'7.1', name:'Suspended Ceilings', type:'task', start:14, end:17, dur:4, float:0, ff:0, crit:true, pct:15, level:1, resources:['Ceiling Fixers ×4'] },
  { id:'A24', code:'7.2', name:'Painting & Wall Finishes', type:'task', start:16, end:20, dur:5, float:2, ff:2, crit:false, pct:0, level:1, resources:['Painters ×4'] },
  { id:'A25', code:'7.3', name:'Flooring (Carpet & Tiles)', type:'task', start:17, end:21, dur:5, float:0, ff:0, crit:true, pct:0, level:1, resources:['Flooring Crew ×3'] },
  { id:'A26', code:'8.0', name:'JOINERY & FITOUT', type:'summary', start:18, end:22, dur:5, float:0, ff:0, crit:true, pct:0, level:0, resources:[] },
  { id:'A27', code:'8.1', name:'Kitchen & Reception Joinery', type:'task', start:18, end:21, dur:4, float:2, ff:0, crit:false, pct:0, level:1, resources:['Joiners ×3'] },
  { id:'A28', code:'8.2', name:'Bathroom Fitout', type:'task', start:19, end:22, dur:4, float:0, ff:0, crit:true, pct:0, level:1, resources:['Tilers ×2','Plumbers ×1'] },
  { id:'A29', code:'9.0', name:'COMMISSIONING', type:'summary', start:21, end:23, dur:3, float:0, ff:0, crit:true, pct:0, level:0, resources:[] },
  { id:'A30', code:'9.1', name:'M&E Commissioning & Testing', type:'task', start:21, end:22, dur:2, float:0, ff:0, crit:true, pct:0, level:1, resources:['Commissioning Eng'] },
  { id:'A31', code:'9.2', name:'Defects Inspection & Rectification', type:'task', start:22, end:23, dur:2, float:0, ff:0, crit:true, pct:0, level:1, resources:['Site Foreman'] },
  { id:'A32', code:'MS1', name:'Practical Completion', type:'milestone', start:24, end:24, dur:0, float:0, ff:0, crit:true, pct:0, level:0, resources:[] },
];

// ─── EVM DATA (weekly, 24 weeks) ──────────────────────────────────────────────
export const evmData = [
  { week:1,  pv:88000,   ev:90000,   ac:82000   },
  { week:2,  pv:175000,  ev:180000,  ac:165000  },
  { week:3,  pv:290000,  ev:295000,  ac:275000  },
  { week:4,  pv:435000,  ev:440000,  ac:415000  },
  { week:5,  pv:620000,  ev:625000,  ac:600000  },
  { week:6,  pv:810000,  ev:808000,  ac:795000  },
  { week:7,  pv:1020000, ev:1010000, ac:1010000 },
  { week:8,  pv:1230000, ev:1200000, ac:1230000 },
  { week:9,  pv:1450000, ev:1380000, ac:1440000 },
  { week:10, pv:1680000, ev:1540000, ac:1660000 },
  { week:11, pv:1870000, ev:1700000, ac:1880000 },
  { week:12, pv:2040000, ev:1840000, ac:2080000 },
  { week:13, pv:2250000, ev:1980000, ac:2230000 },
  { week:14, pv:2450000, ev:2100000, ac:2380000 }, // TODAY
  // Forecast
  { week:15, pv:2640000, ev:null,    ac:null,    fc:2560000 },
  { week:16, pv:2820000, ev:null,    ac:null,    fc:2755000 },
  { week:17, pv:2990000, ev:null,    ac:null,    fc:2960000 },
  { week:18, pv:3150000, ev:null,    ac:null,    fc:3170000 },
  { week:19, pv:3310000, ev:null,    ac:null,    fc:3385000 },
  { week:20, pv:3460000, ev:null,    ac:null,    fc:3605000 },
  { week:21, pv:3600000, ev:null,    ac:null,    fc:3832000 },
  { week:22, pv:3730000, ev:null,    ac:null,    fc:4064000 },
  { week:23, pv:3880000, ev:null,    ac:null,    fc:4290000 },
  { week:24, pv:4200000, ev:null,    ac:null,    fc:4762000 },
];

// ─── RESOURCE LIBRARY ────────────────────────────────────────────────────────
export const resources = [
  { id:'R01', name:'Senior Electrician', trade:'Electrical', rate:700, available:4, unit:'day', calendar:'5-day' },
  { id:'R02', name:'Electrician Grade 2', trade:'Electrical', rate:580, available:6, unit:'day', calendar:'5-day' },
  { id:'R03', name:'Mechanical Engineer', trade:'Mechanical', rate:750, available:3, unit:'day', calendar:'5-day' },
  { id:'R04', name:'Formwork Carpenter', trade:'Civil', rate:620, available:8, unit:'day', calendar:'6-day' },
  { id:'R05', name:'Site Foreman', trade:'Management', rate:880, available:2, unit:'day', calendar:'5-day' },
  { id:'R06', name:'Plumber Grade 1', trade:'Hydraulic', rate:660, available:4, unit:'day', calendar:'5-day' },
  { id:'R07', name:'Plasterer', trade:'Finishes', rate:590, available:5, unit:'day', calendar:'5-day' },
  { id:'R08', name:'Painter', trade:'Finishes', rate:540, available:6, unit:'day', calendar:'5-day' },
  { id:'R09', name:'Tower Crane', trade:'Plant', rate:2800, available:1, unit:'day', calendar:'6-day' },
  { id:'R10', name:'Concrete Pump', trade:'Plant', rate:1200, available:1, unit:'day', calendar:'7-day' },
];

// ─── RESOURCE HISTOGRAM (weekly demand) ──────────────────────────────────────
export const histogram = [
  { week:'W7',  elec:4, mech:3, civil:6, finishes:0, plant:2, total:15 },
  { week:'W8',  elec:5, mech:2, civil:8, finishes:0, plant:2, total:17 },
  { week:'W9',  elec:6, mech:2, civil:6, finishes:0, plant:1, total:15 },
  { week:'W10', elec:6, mech:3, civil:4, finishes:2, plant:1, total:16 },
  { week:'W11', elec:4, mech:3, civil:4, finishes:4, plant:0, total:15 },
  { week:'W12', elec:4, mech:2, civil:2, finishes:6, plant:0, total:14 },
  { week:'W13', elec:6, mech:1, civil:0, finishes:6, plant:0, total:13 },
  { week:'W14', elec:6, mech:2, civil:0, finishes:5, plant:0, total:13 }, // TODAY
  { week:'W15', elec:7, mech:2, civil:0, finishes:6, plant:0, total:15 },
  { week:'W16', elec:5, mech:3, civil:0, finishes:7, plant:0, total:15 },
  { week:'W17', elec:4, mech:2, civil:0, finishes:8, plant:0, total:14 },
  { week:'W18', elec:2, mech:1, civil:0, finishes:7, plant:0, total:10 },
];

// ─── RISK REGISTER ────────────────────────────────────────────────────────────
export const risks = [
  { id:'R001', desc:'Sustained rainfall >40mm preventing concrete pours (3+ consecutive days)', prob:25, consequence:45000, category:'excusable', ev:11250, linkedActivity:'A08', activityFloat:0, status:'active', response:'Pre-order drainage materials before wet season. Monitor BOM 72hr forecast.' },
  { id:'R002', desc:'Authority approval delay from council for night works permit beyond 14 days', prob:40, consequence:32000, category:'compensable', ev:12800, linkedActivity:'A12', activityFloat:0, status:'active', response:'Pre-submit 3 weeks ahead. Escalate to client rep if delay occurs.' },
  { id:'R003', desc:'Discovery of asbestos-containing materials in existing ceiling tiles', prob:30, consequence:68000, category:'compensable', ev:20400, linkedActivity:'A04', activityFloat:0, status:'closed', response:'Engage licensed removalist on standby. Notify superintendent immediately.' },
  { id:'R004', desc:'Electrical cable tray materials shortage due to supply chain constraints', prob:35, consequence:28000, category:'contractor', ev:9800, linkedActivity:'A12', activityFloat:0, status:'active', response:'Order 8 weeks lead time. Identify two alternative suppliers.' },
  { id:'R005', desc:'Mechanical subcontractor mobilisation delay beyond 3 days from programme', prob:30, consequence:38000, category:'contractor', ev:11400, linkedActivity:'A11', activityFloat:2, status:'active', response:'Weekly check-in with subcontractor from 4 weeks prior. Lock start date in subcontract.' },
  { id:'R006', desc:'Client instruction to change open-plan layout post-framing (scope change)', prob:20, consequence:85000, category:'compensable', ev:17000, linkedActivity:'A17', activityFloat:0, status:'monitoring', response:'Seek written confirmation before commencing. EOT notice ready to serve.' },
];

// ─── FLOAT LOG ────────────────────────────────────────────────────────────────
export const floatLog = [
  { date:'W1',  activity:'Electrical First Fix (A12)', event:'Baseline lock', tf:8, cause:'-' },
  { date:'W5',  activity:'Electrical First Fix (A12)', event:'Scope addition by client (Zone 3)', tf:8, cause:'Client direction' },
  { date:'W7',  activity:'Electrical First Fix (A12)', event:'Late RFI response - 3 days', tf:5, cause:'Compensable' },
  { date:'W9',  activity:'Electrical First Fix (A12)', event:'Material delivery delay', tf:3, cause:'Contractor risk' },
  { date:'W11', activity:'Electrical First Fix (A12)', event:'Additional scope confirmed', tf:1, cause:'Compensable' },
  { date:'W12', activity:'Electrical First Fix (A12)', event:'EOT notice served (2 days)', tf:0, cause:'EOT applied' },
  { date:'W14', activity:'Electrical First Fix (A12)', event:'Current position - CRITICAL', tf:0, cause:'-' },
];

// ─── EOT REGISTER ─────────────────────────────────────────────────────────────
export const eotClaims = [
  { id:'EOT-001', event:'Late RFI response - Zone 2 electrical layout', served:'W7', days:3, status:'pending', value:54000 },
  { id:'EOT-002', event:'Client variation - additional feature walls L3', served:'W10', days:2, status:'approved', value:36000 },
  { id:'EOT-003', event:'Authority approval delay - night works permit', served:'W12', days:4, status:'pending', value:72000 },
];

// ─── VARIATION REGISTER ───────────────────────────────────────────────────────
export const variations = [
  { id:'V001', desc:'Additional data points - L2 server room', raisedW:'W3', status:'approved', value:28500, eot:false },
  { id:'V002', desc:'Client change - open plan to partitioned office L3', raisedW:'W6', status:'approved', value:52000, eot:true },
  { id:'V003', desc:'Upgrade acoustic ceiling tiles - all floors', raisedW:'W8', status:'submitted', value:18200, eot:false },
  { id:'V004', desc:'Addition of feature joinery - reception area', raisedW:'W10', status:'submitted', value:32000, eot:false },
  { id:'V005', desc:'EOT delay damages - compensable events #1 & #3', raisedW:'W13', status:'pending', value:126000, eot:true },
  { id:'V006', desc:'Hydraulic upgrade - accessible bathroom compliance', raisedW:'W14', status:'draft', value:9800, eot:false },
];

// ─── SOPA CLAIMS ──────────────────────────────────────────────────────────────
export const sopaClaims = [
  { id:'PC-001', period:'Month 1 (W1-W4)', submitted:'W5', amount:380000, dueDate:'W7', status:'paid', paidAmount:380000 },
  { id:'PC-002', period:'Month 2 (W5-W8)', submitted:'W9', amount:620000, dueDate:'W11', status:'paid', paidAmount:598000 },
  { id:'PC-003', period:'Month 3 (W9-W12)', submitted:'W13', amount:840000, dueDate:'W15', status:'outstanding', paidAmount:0 },
];

// ─── MONTE CARLO RESULTS ──────────────────────────────────────────────────────
export const monteCarloData = [
  { week:20, pct:5 }, { week:21, pct:12 }, { week:22, pct:22 }, { week:23, pct:35 },
  { week:24, pct:50 }, // P50
  { week:25, pct:65 }, { week:26, pct:75 },
  { week:27, pct:80 }, // P80
  { week:28, pct:87 }, { week:29, pct:93 },
  { week:30, pct:97 }, // P90
  { week:31, pct:99 },
];

// ─── TENDER PIPELINE ──────────────────────────────────────────────────────────
export const tenders = [
  { id:'T001', name:'Parramatta Mixed-Use Development', client:'Western Sydney Developments', value:8200000, type:'Structural & M&E', dueDate:'15 Jul 2025', stage:'pricing', probability:65, margin:12 },
  { id:'T002', name:'Wollongong Hotel Fitout', client:'Coastal Hospitality Group', value:3100000, type:'Commercial Fitout', dueDate:'22 Jul 2025', stage:'review', probability:75, margin:14 },
  { id:'T003', name:'Penrith Logistics Hub', client:'Pacific Distribution Co', value:1850000, type:'Industrial', dueDate:'08 Aug 2025', stage:'submitted', probability:40, margin:11 },
  { id:'T004', name:'North Shore Private Hospital', client:'HealthCorp NSW', value:5600000, type:'Mechanical & Electrical', dueDate:'20 Aug 2025', stage:'received', probability:55, margin:13 },
  { id:'T005', name:'Chatswood Commercial Tower M&E', client:'Apex Property Group', value:4400000, type:'Mechanical & Electrical', dueDate:'02 Sep 2025', stage:'won', probability:100, margin:15 },
];

// ─── DIARY / REPORTING SNAPSHOTS ──────────────────────────────────────────────
export const recentAlerts = [
  { id:'AL001', type:'commercial', severity:'critical', msg:'EOT notice EOT-001 window expires in 3 days — serve immediately', time:'2h ago' },
  { id:'AL002', type:'programme', severity:'warning', msg:'Activity A12 (Electrical First Fix) float dropped to 0 — now CRITICAL', time:'6h ago' },
  { id:'AL003', type:'financial', severity:'warning', msg:'CPI declined for 3 consecutive weeks — 20% rule threshold approaching', time:'1d ago' },
  { id:'AL004', type:'risk', severity:'info', msg:'Risk R002 linked activity float < 5 days — EOT notice pre-populated', time:'1d ago' },
  { id:'AL005', type:'commercial', severity:'info', msg:'PC-003 payment claim $840,000 due for response by W15 (7 days)', time:'2d ago' },
  { id:'AL006', type:'programme', severity:'info', msg:'Near-critical: Activity A23 float = 2 days — monitor closely', time:'2d ago' },
];

export const monthlyReports = [
  { id:'RPT-004', period:'Month 4 (W13-W16)', status:'draft', generatedBy:'System', date:'Auto-draft ready', sha:null },
  { id:'RPT-003', period:'Month 3 (W9-W12)', status:'submitted', generatedBy:'James Chen', date:'01 Jun 2025', sha:'a3f9b2c1d4e5f6a7...' },
  { id:'RPT-002', period:'Month 2 (W5-W8)', status:'submitted', generatedBy:'James Chen', date:'01 May 2025', sha:'b7c8d9e0f1a2b3c4...' },
  { id:'RPT-001', period:'Month 1 (W1-W4)', status:'submitted', generatedBy:'James Chen', date:'01 Apr 2025', sha:'c4d5e6f7a8b9c0d1...' },
];
