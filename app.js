/* ForeFlight Dispatch — AAR Mission Planner · BAVOC-I-3768 v1 · Vanilla JS */

// ── Mock Flight List data (matches ForeFlight Dispatch screenshots) ────────
const FLIGHTS = [
  { etd:'Apr 24, 15:34Z / 10:34 CDT', ac:'XXDEMO1 (GL5T) / FFLDEMO',  dep:'KFLD', dest:'KAVP', alt:'',     released:'Not Released', pic:'N/A', createdBy:'Scheduling', status:'Not Filed', tracking:'', tag:'US' },
  { etd:'Apr 24, 14:35Z / 08:35 MDT', ac:'XXDEMO1 (FA7X) / FFLDEMO',  dep:'KBFF', dest:'KNIP', alt:'',     released:'Not Released', pic:'N/A', createdBy:'Scheduling', status:'Not Filed', tracking:'', tag:'US' },
  { etd:'Apr 24, 14:09Z / 15:09 BST', ac:'XXDEMO1 (CL60) / FFLDEMO',  dep:'EGPO', dest:'EGGW', alt:'',     released:'Not Released', pic:'N/A', createdBy:'Scheduling', status:'Not Filed', tracking:'', tag:'EU' },
  { etd:'Apr 24, 10:06Z / 06:06 EDT', ac:'XXDEMO2 (GL5T) / FFLDEMO',  dep:'KNBC', dest:'KSFO', alt:'',     released:'Not Released', pic:'N/A', createdBy:'Scheduling', status:'Not Filed', tracking:'', tag:'US' },
  { etd:'Apr 24, 09:12Z / 11:12 CEST',ac:'XXDEMO3 (GLF4) / FFLDEMO',  dep:'LFPN', dest:'EDDG', alt:'',     released:'Not Released', pic:'N/A', createdBy:'Scheduling', status:'Not Filed', tracking:'', tag:'EU' },
  { etd:'Apr 24, 08:50Z / 10:50 CEST',ac:'XXDEMO1 (GL5T) / FFLDEMO',  dep:'LFPM', dest:'LDZA', alt:'',     released:'Not Released', pic:'N/A', createdBy:'Scheduling', status:'Not Filed', tracking:'', tag:'EU' },
  { etd:'Apr 24, 08:33Z / 04:33 EDT', ac:'XXDEMO1 (CL60) / FFLDEMO',  dep:'KFQD', dest:'KGQQ', alt:'',     released:'Not Released', pic:'N/A', createdBy:'Scheduling', status:'Not Filed', tracking:'', tag:'US' },
  { etd:'Apr 24, 06:34Z / 08:34 CEST',ac:'XXDEMO1 (FA7X) / FFLDEMO',  dep:'LFLA', dest:'EDDB', alt:'',     released:'Not Released', pic:'N/A', createdBy:'Scheduling', status:'Not Filed', tracking:'', tag:'EU' },
  { etd:'Apr 24, 05:30Z / 06:30 BST', ac:'XXDEMO3 (GLF4) / FFLDEMO',  dep:'EGLF', dest:'EGLJ', alt:'',     released:'Not Released', pic:'N/A', createdBy:'Scheduling', status:'Not Filed', tracking:'', tag:'EU' },
  { etd:'Apr 24, 04:45Z / 00:45 EDT', ac:'XXDEMO2 (FA7X) / FFLDEMO',  dep:'KACY', dest:'KCNM', alt:'',     released:'Not Released', pic:'N/A', createdBy:'Scheduling', status:'Not Filed', tracking:'', tag:'US' },
  { etd:'Apr 24, 04:19Z / 06:19 CEST',ac:'XXDEMO2 (H25B) / FFLDEMO',  dep:'LDZA', dest:'LRTR', alt:'',     released:'Not Released', pic:'N/A', createdBy:'Scheduling', status:'Not Filed', tracking:'', tag:'EU' },
  { etd:'Apr 24, 03:54Z / 05:54 CEST',ac:'CL650A (CL60) / FFLDEMO',   dep:'LIRN', dest:'LHBP', alt:'',     released:'Not Released', pic:'N/A', createdBy:'Scheduling', status:'Not Filed', tracking:'', tag:'EU' },
  { etd:'Apr 24, 03:51Z / 04:51 BST', ac:'CL650A (CL60) / FFLDEMO',   dep:'EGLJ', dest:'EGHH', alt:'',     released:'Not Released', pic:'N/A', createdBy:'Scheduling', status:'Not Filed', tracking:'', tag:'EU' },
  { etd:'Apr 24, 01:49Z / Apr 23, 19:49 MDT', ac:'CL650A (CL60) / FFLDEMO', dep:'KGNB', dest:'KLHV', alt:'', released:'Not Released', pic:'N/A', createdBy:'Scheduling', status:'Not Filed', tracking:'', tag:'US' },
  { etd:'Apr 24, 01:07Z / 02:07 BST', ac:'CL650A (CL60) / FFLDEMO',   dep:'EGPA', dest:'LFSB', alt:'',     released:'Not Released', pic:'N/A', createdBy:'Scheduling', status:'Not Filed', tracking:'', tag:'EU' },
  { etd:'Apr 24, 00:57Z / Apr 23, 18:57 MDT', ac:'XXDEMO1 (FA7X) / FFLDEMO', dep:'KALM', dest:'KMIB', alt:'', released:'Not Released', pic:'N/A', createdBy:'Scheduling', status:'Not Filed', tracking:'', tag:'US' },
  { etd:'Apr 24, 00:46Z / Apr 23, 19:46 CDT', ac:'XXDEMO2 (H25B) / FFLDEMO', dep:'KGZS', dest:'KCVS', alt:'', released:'Not Released', pic:'N/A', createdBy:'Scheduling', status:'Not Filed', tracking:'', tag:'US' },
  { etd:'Apr 24, 00:00Z / Apr 23, 20:00 EDT', ac:'CL650A (CL60) / FFLDEMO',  dep:'KFGU', dest:'KLEM', alt:'', released:'Not Released', pic:'N/A', createdBy:'Scheduling', status:'Not Filed', tracking:'', tag:'US' },
  { etd:'Apr 23, 23:42Z / Apr 24, 00:42 BST', ac:'XXDEMO3 (GLF4) / FFLDEMO', dep:'EGPH', dest:'BIRK', alt:'LIFR', released:'Not Released', pic:'N/A', createdBy:'Scheduling', status:'Not Filed', tracking:'', tag:'EU' },
  { etd:'Apr 23, 23:26Z / 16:26 PDT',  ac:'XXDEMO3 (GLF4) / FFLDEMO',  dep:'KPRB', dest:'KTKI', alt:'',     released:'Not Released', pic:'N/A', createdBy:'Scheduling', status:'Not Filed', tracking:'', tag:'US' },
  { etd:'Apr 23, 23:22Z / 18:22 CDT',  ac:'XXDEMO1 (FA7X) / FFLDEMO',  dep:'KHCO', dest:'KFAM', alt:'',     released:'Not Released', pic:'N/A', createdBy:'Scheduling', status:'Not Filed', tracking:'', tag:'US' },
  { etd:'Apr 23, 22:05Z / Apr 24, 00:05 CEST',ac:'XXDEMO2 (H25B) / FFLDEMO', dep:'EDNY', dest:'EGPH', alt:'LIFR', released:'Not Released', pic:'N/A', createdBy:'Scheduling', status:'Not Filed', tracking:'', tag:'EU' },
  { etd:'Apr 23, 21:17Z / Apr 24, 00:17 EEST',ac:'XXDEMO2 (H25B) / FFLDEMO', dep:'LGSA', dest:'EGTK', alt:'',     released:'Not Released', pic:'N/A', createdBy:'Scheduling', status:'Not Filed', tracking:'', tag:'EU' },
];

const MISSIONS = [
  {
    id: 'noble41',
    name: 'NOBLE 41',
    meta: 'Oceanic crossing · KC-135R · 4× F-35A',
    tanker: { callsign: 'NOBLE 41-T', type: 'KC-135R', route: 'EDDB → EGLL', dep: '0800Z', fuel_available: 120000 },
    arEvents: [
      {
        num: 1,
        primary:     { track: 'AR-5',  point: '52°N 010°E', alt: 'FL250', speed: '270 KIAS', offload_each: 14000, window: '0945–1015Z' },
        contingency: { track: 'AR-5C', point: '51°N 009°E', alt: 'FL230', speed: '260 KIAS', offload_each: 12000, window: '0950–1020Z', divert: 'ETNH' }
      },
      {
        num: 2,
        primary:     { track: 'AR-7',  point: '55°N 020°W', alt: 'FL240', speed: '270 KIAS', offload_each: 14000, window: '1120–1150Z' },
        contingency: { track: 'AR-7C', point: '54°N 018°W', alt: 'FL240', speed: '265 KIAS', offload_each: 12000, window: '1125–1155Z', divert: 'BIKF' }
      }
    ],
    receivers: [
      { callsign: 'NOBLE 41-1', type: 'F-35A', foa: 6800,  target: 14000, seq: 4 },
      { callsign: 'NOBLE 41-2', type: 'F-35A', foa: 7100,  target: 14000, seq: 3 },
      { callsign: 'NOBLE 41-3', type: 'F-35A', foa: 6600,  target: 14000, seq: 2 },
      { callsign: 'NOBLE 41-4', type: 'F-35A', foa: 6200,  target: 14000, seq: 1 },
    ]
  },
  {
    id: 'viper11',
    name: 'VIPER 11',
    meta: 'Overland training · KC-46A · 2× F-16C',
    tanker: { callsign: 'SHELL 21', type: 'KC-46A', route: 'EHEH → EHEH', dep: '1300Z', fuel_available: 80000 },
    arEvents: [
      {
        num: 1,
        primary:     { track: 'AR-2', point: '53°N 005°E', alt: 'FL180', speed: '265 KIAS', offload_each: 7000, window: '1400–1430Z' },
        contingency: { track: 'AR-2', point: '53°N 005°E', alt: 'FL180', speed: '265 KIAS', offload_each: 6000, window: '1400–1430Z', divert: null }
      }
    ],
    receivers: [
      { callsign: 'VIPER 11-1', type: 'F-16C', foa: 5800, target: 7000, seq: 1 },
      { callsign: 'VIPER 11-2', type: 'F-16C', foa: 5400, target: 7000, seq: 2 },
    ]
  },
  {
    id: 'coronethawk',
    name: 'CORONET HAWK',
    meta: 'Deployment ferry · 2× KC-135R · 8× F-35A',
    tanker: { callsign: 'HAWK 01-T', type: 'KC-135R', route: 'KLSV → EGVN', dep: '0500Z', fuel_available: 150000 },
    arEvents: [
      {
        num: 1,
        primary:     { track: 'AR-11', point: '47°N 040°W', alt: 'FL260', speed: '270 KIAS', offload_each: 14000, window: '0820–0900Z' },
        contingency: { track: 'AR-11C', point: '46°N 038°W', alt: 'FL240', speed: '265 KIAS', offload_each: 12000, window: '0825–0905Z', divert: 'CYQX' }
      }
    ],
    receivers: [
      { callsign: 'HAWK 11-1', type: 'F-35A', foa: 6100, target: 14000, seq: 1 },
      { callsign: 'HAWK 11-2', type: 'F-35A', foa: 6400, target: 14000, seq: 2 },
      { callsign: 'HAWK 11-3', type: 'F-35A', foa: 7200, target: 14000, seq: 3 },
      { callsign: 'HAWK 11-4', type: 'F-35A', foa: 6800, target: 14000, seq: 4 },
    ]
  }
];

let activeMissionId = null;
let activeCoa = 'primary';
let activeTab = 'plan';
let activePage = 'flights'; // 'flights' | 'missions' | etc.

function el(id) { return document.getElementById(id); }
function fuelPct(foa, target) { return Math.min(100, Math.round((foa / target) * 100)); }
function fmt(n) { return n.toLocaleString(); }

// ── Render Flight List ─────────────────────────────────────────────────────

function renderFlightList() {
  const tbody = el('flights-tbody');
  tbody.innerHTML = FLIGHTS.map(f => {
    const altCell = f.alt
      ? `<span class="ff-cell-mono">${f.dest}</span> <span class="ff-cell-orange">${f.alt}</span>`
      : `<span class="ff-cell-mono">${f.dest}</span>`;
    return `
      <tr>
        <td class="ff-cell-mono">${f.etd}</td>
        <td>${f.ac}</td>
        <td class="ff-cell-mono">${f.dep}</td>
        <td>${altCell}</td>
        <td class="ff-cell-mono"></td>
        <td class="ff-cell-strong">${f.released}</td>
        <td>${f.pic}</td>
        <td>${f.createdBy}</td>
        <td class="ff-cell-strong">${f.status}</td>
        <td>${f.tracking}</td>
        <td>${f.tag ? `<span class="ff-tag">${f.tag}</span>` : ''}</td>
        <td class="ff-actions-cell">
          <span class="ff-action-link">Edit</span>
          <span class="ff-action-more">More ▾</span>
        </td>
      </tr>
    `;
  }).join('');
}

// ── Page navigation ────────────────────────────────────────────────────────

function showPage(page) {
  activePage = page;

  document.querySelectorAll('.ff-header-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.page === page);
  });
  // Sync left nav (Dispatch is the parent for both flights & missions)
  document.querySelectorAll('.ff-nav-item[data-page]').forEach(n => {
    n.classList.toggle('active', n.dataset.page === 'flights' && (page === 'flights' || page === 'missions'));
  });

  document.querySelectorAll('.ff-page').forEach(p => p.classList.add('hidden'));
  el(`page-${page}`).classList.remove('hidden');

  // Hide "New flight" button on non-flights pages
  el('btn-new-flight').style.display = (page === 'flights') ? '' : 'none';

  if (page === 'missions' && !activeMissionId) {
    activeMissionId = MISSIONS[0].id;
    renderAll();
  }
}

// ── Mission planner (existing) ─────────────────────────────────────────────

function renderSidebar() {
  const list = el('mission-list');
  list.innerHTML = MISSIONS.map(m => `
    <div class="mission-item ${m.id === activeMissionId ? 'active' : ''}" data-id="${m.id}">
      <div class="mission-item-name">${m.name}</div>
      <div class="mission-item-meta">${m.meta}</div>
    </div>
  `).join('');

  list.querySelectorAll('.mission-item').forEach(item => {
    item.addEventListener('click', () => {
      activeMissionId = item.dataset.id;
      activeCoa = 'primary';
      activeTab = 'plan';
      renderAll();
    });
  });
}

function renderMissionDetail() {
  const mission = MISSIONS.find(m => m.id === activeMissionId);

  if (!mission) {
    el('no-mission-selected').classList.remove('hidden');
    el('mission-detail').classList.add('hidden');
    return;
  }

  el('no-mission-selected').classList.add('hidden');
  el('mission-detail').classList.remove('hidden');

  el('mission-name').textContent = mission.name;
  el('mission-meta').textContent = mission.meta;

  document.querySelectorAll('.coa-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.coa === activeCoa);
  });
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === activeTab);
  });
  el('tab-plan').classList.toggle('hidden', activeTab !== 'plan');
  el('tab-briefing').classList.toggle('hidden', activeTab !== 'briefing');

  if (activeTab === 'plan') {
    renderTanker(mission);
    renderAREvents(mission);
    renderReceivers(mission);
  } else {
    renderBriefing(mission);
  }
}

function renderTanker(mission) {
  const t = mission.tanker;
  el('tanker-row').innerHTML = `
    <div class="aircraft-card">
      <span class="aircraft-badge">${t.type}</span>
      <div class="field-group"><span class="field-label">Callsign</span><span class="field-value">${t.callsign}</span></div>
      <div class="field-group"><span class="field-label">Route</span><span class="field-value mono">${t.route}</span></div>
      <div class="field-group"><span class="field-label">Departure</span><span class="field-value mono">${t.dep}</span></div>
      <div class="field-group"><span class="field-label">Available Offload</span><span class="field-value mono">${fmt(t.fuel_available)} lbs</span></div>
    </div>
  `;
}

function renderAREvents(mission) {
  const container = el('ar-events');
  container.innerHTML = mission.arEvents.map((evt, i) => {
    const data = activeCoa === 'primary' ? evt.primary : evt.contingency;
    const isContingency = activeCoa === 'contingency';
    const openClass = i === 0 ? 'open' : '';
    const divRow = (isContingency && data.divert)
      ? `<div class="field-group"><span class="field-label">Divert Airport</span><span class="field-value mono" style="color:var(--ff-warn)">${data.divert}</span></div>`
      : '';
    return `
      <div class="ar-event" data-evt="${i}">
        <div class="ar-event-header" onclick="toggleAREvent(${i})">
          <span class="ar-event-num ${isContingency ? 'contingency' : ''}">AR${evt.num}</span>
          <span class="ar-event-title">AR Event ${evt.num} — Track ${data.track}</span>
          <span class="ar-event-summary">${data.point} · ${data.alt} · ${data.window}</span>
          <span class="ar-chevron ${openClass}" id="chevron-${i}">▶</span>
        </div>
        <div class="ar-event-body ${openClass}" id="ar-body-${i}">
          <div class="field-group"><span class="field-label">AR Track</span><span class="field-value mono">${data.track}</span></div>
          <div class="field-group"><span class="field-label">Contact Point</span><span class="field-value mono">${data.point}</span></div>
          <div class="field-group"><span class="field-label">Altitude</span><span class="field-value mono">${data.alt}</span></div>
          <div class="field-group"><span class="field-label">AR Speed</span><span class="field-value mono">${data.speed}</span></div>
          <div class="field-group"><span class="field-label">Offload per Receiver</span><span class="field-value mono">${fmt(data.offload_each)} lbs</span></div>
          <div class="field-group"><span class="field-label">Window</span><span class="field-value mono">${data.window}</span></div>
          ${divRow}
        </div>
      </div>
    `;
  }).join('');
}

window.toggleAREvent = function(i) {
  el(`ar-body-${i}`).classList.toggle('open');
  el(`chevron-${i}`).classList.toggle('open');
};

function renderReceivers(mission) {
  const container = el('receivers-list');
  const sorted = [...mission.receivers].sort((a, b) => a.seq - b.seq);

  const rows = sorted.map(r => {
    const pct = fuelPct(r.foa, r.target);
    const isLow = pct < 55;
    return `
      <tr>
        <td><span class="seq-badge">${r.seq}</span></td>
        <td>${r.callsign}</td>
        <td>${r.type}</td>
        <td>
          <div class="fuel-bar-wrap">
            <div class="fuel-bar-bg"><div class="fuel-bar-fill ${isLow ? 'low' : ''}" style="width:${pct}%"></div></div>
            <span style="font-family:var(--font-mono);font-size:11px;white-space:nowrap">${fmt(r.foa)} lbs</span>
          </div>
        </td>
        <td style="font-family:var(--font-mono)">${fmt(r.target)} lbs</td>
      </tr>
    `;
  }).join('');

  container.innerHTML = `
    <table class="receivers-table">
      <thead>
        <tr><th>Seq</th><th>Callsign</th><th>Type</th><th>Fuel on Arrival (est)</th><th>Target Onload</th></tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="add-receiver-row" id="add-receiver-form" style="display:none">
      <div class="form-field"><label>Callsign</label><input type="text" id="new-callsign" placeholder="e.g. NOBLE 41-5"></div>
      <div class="form-field"><label>Aircraft Type</label><select id="new-type"><option>F-35A</option><option>F-35B</option><option>F-16C</option><option>F-15E</option><option>C-17</option><option>Other</option></select></div>
      <div class="form-field"><label>Target Onload (lbs)</label><input type="number" id="new-onload" placeholder="14000"></div>
      <button class="btn-accent" onclick="addReceiver()">Add</button>
    </div>
  `;
}

window.addReceiver = function() {
  const mission = MISSIONS.find(m => m.id === activeMissionId);
  if (!mission) return;
  const callsign = el('new-callsign').value.trim() || 'NEW-R';
  const type = el('new-type').value;
  const onload = parseInt(el('new-onload').value) || 14000;
  const seq = mission.receivers.length + 1;
  mission.receivers.push({ callsign, type, foa: Math.round(onload * 0.45), target: onload, seq });
  el('add-receiver-form').style.display = 'none';
  renderReceivers(mission);
  el('btn-add-receiver').style.display = '';
};

function renderBriefing(mission) {
  const isContingency = activeCoa === 'contingency';
  const label = isContingency ? 'CONTINGENCY' : 'PRIMARY';
  const badgeClass = isContingency ? 'contingency' : 'primary';
  const t = mission.tanker;
  const sorted = [...mission.receivers].sort((a, b) => a.seq - b.seq);
  const totalOffload = mission.arEvents.reduce((sum, evt) => {
    const d = isContingency ? evt.contingency : evt.primary;
    return sum + d.offload_each * mission.receivers.length;
  }, 0);

  const evtLines = mission.arEvents.map(evt => {
    const d = isContingency ? evt.contingency : evt.primary;
    const divLine = (isContingency && d.divert) ? `\n  DIVERT IF NO-CONTACT: ${d.divert}` : '';
    return `AR EVENT ${evt.num}
  Track:       ${d.track}
  Contact Pt:  ${d.point}
  Altitude:    ${d.alt}
  Speed:       ${d.speed}
  Window:      ${d.window}
  Offload ea:  ${fmt(d.offload_each)} lbs${divLine}`;
  }).join('\n\n');

  const seqLines = sorted.map(r =>
    `  [${r.seq}] ${r.callsign.padEnd(14)} ${r.type.padEnd(6)}  FOA: ${fmt(r.foa).padStart(7)} lbs  Target: ${fmt(r.target)} lbs`
  ).join('\n');

  el('briefing-content').innerHTML = `
    <div class="briefing-coa-badge ${badgeClass}">${label} COURSE OF ACTION</div>
    <pre>MISSION: ${mission.name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TANKER
  ${t.type.padEnd(10)} ${t.callsign}
  Route:   ${t.route}
  Dep:     ${t.dep}
  Avail:   ${fmt(t.fuel_available)} lbs offload capacity

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${evtLines}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REFUELING SEQUENCE (weakest fuel first)
${seqLines}

Total offload required: ${fmt(totalOffload)} lbs
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[PROTOTYPE — for discovery validation only]</pre>
  `;
}

function renderAll() {
  renderSidebar();
  renderMissionDetail();
}

// ── Wire up events ─────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  renderFlightList();

  // Top header tab navigation
  document.querySelectorAll('.ff-header-tab').forEach(tab => {
    tab.addEventListener('click', () => showPage(tab.dataset.page));
  });

  // Left nav: Dispatch sends back to Flights
  document.querySelectorAll('.ff-nav-item[data-page="flights"]').forEach(n => {
    n.addEventListener('click', () => showPage('flights'));
  });

  // New mission
  el('btn-new-mission').addEventListener('click', () => {
    alert('In production, this opens a "New Mission" setup form.\n\nFor this prototype, select an existing mission from the list to explore the planning interface.');
  });

  // New flight
  el('btn-new-flight').addEventListener('click', () => {
    alert('In production, this opens the New Flight form.');
  });

  // CoA + planner tabs (delegated)
  document.addEventListener('click', e => {
    if (e.target.classList.contains('coa-btn')) {
      activeCoa = e.target.dataset.coa;
      renderMissionDetail();
    }
    if (e.target.classList.contains('tab-btn')) {
      activeTab = e.target.dataset.tab;
      renderMissionDetail();
    }
  });

  // Add receiver
  el('btn-add-receiver').addEventListener('click', () => {
    el('add-receiver-form').style.display = 'grid';
    el('btn-add-receiver').style.display = 'none';
  });

  // Initial state
  activeMissionId = MISSIONS[0].id;
  renderAll();
  showPage('flights');
});
