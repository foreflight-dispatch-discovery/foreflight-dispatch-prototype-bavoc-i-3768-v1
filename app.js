/* ForeFlight Dispatch — AAR Mission Planner · BAVOC-I-3768 v1 · Vanilla JS */

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
let activeCoa = 'primary'; // 'primary' | 'contingency'
let activeTab = 'plan';    // 'plan' | 'briefing'
let currentView = 'flights'; // 'flights' | 'missions'

// ── Helpers ────────────────────────────────────────────────────────────────

function el(id) { return document.getElementById(id); }

function fuelPct(foa, target) {
  return Math.min(100, Math.round((foa / target) * 100));
}

function fmt(n) { return n.toLocaleString(); }

// ── Render sidebar ─────────────────────────────────────────────────────────

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

// ── Render mission detail ──────────────────────────────────────────────────

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

  // CoA toggle
  document.querySelectorAll('.coa-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.coa === activeCoa);
  });

  // Tabs
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
      <div class="field-group">
        <span class="field-label">Callsign</span>
        <span class="field-value">${t.callsign}</span>
      </div>
      <div class="field-group">
        <span class="field-label">Route</span>
        <span class="field-value mono">${t.route}</span>
      </div>
      <div class="field-group">
        <span class="field-label">Departure</span>
        <span class="field-value mono">${t.dep}</span>
      </div>
      <div class="field-group">
        <span class="field-label">Available Offload</span>
        <span class="field-value mono">${fmt(t.fuel_available)} lbs</span>
      </div>
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
      ? `<div class="field-group"><span class="field-label">Divert Airport</span><span class="field-value mono" style="color:var(--warning)">${data.divert}</span></div>`
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
          <div class="field-group">
            <span class="field-label">AR Track</span>
            <span class="field-value mono">${data.track}</span>
          </div>
          <div class="field-group">
            <span class="field-label">Contact Point</span>
            <span class="field-value mono">${data.point}</span>
          </div>
          <div class="field-group">
            <span class="field-label">Altitude</span>
            <span class="field-value mono">${data.alt}</span>
          </div>
          <div class="field-group">
            <span class="field-label">AR Speed</span>
            <span class="field-value mono">${data.speed}</span>
          </div>
          <div class="field-group">
            <span class="field-label">Offload per Receiver</span>
            <span class="field-value mono">${fmt(data.offload_each)} lbs</span>
          </div>
          <div class="field-group">
            <span class="field-label">Window</span>
            <span class="field-value mono">${data.window}</span>
          </div>
          ${divRow}
        </div>
      </div>
    `;
  }).join('');
}

window.toggleAREvent = function(i) {
  const body = el(`ar-body-${i}`);
  const chevron = el(`chevron-${i}`);
  body.classList.toggle('open');
  chevron.classList.toggle('open');
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
        <tr>
          <th>Seq</th><th>Callsign</th><th>Type</th><th>Fuel on Arrival (est)</th><th>Target Onload</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="add-receiver-row" id="add-receiver-form" style="display:none">
      <div class="form-field">
        <label>Callsign</label>
        <input type="text" id="new-callsign" placeholder="e.g. NOBLE 41-5">
      </div>
      <div class="form-field">
        <label>Aircraft Type</label>
        <select id="new-type">
          <option>F-35A</option><option>F-35B</option><option>F-16C</option><option>F-15E</option><option>C-17</option><option>Other</option>
        </select>
      </div>
      <div class="form-field">
        <label>Target Onload (lbs)</label>
        <input type="number" id="new-onload" placeholder="14000">
      </div>
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

// ── Briefing ────────────────────────────────────────────────────────────────

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

// ── Event wiring ───────────────────────────────────────────────────────────

function renderAll() {
  renderSidebar();
  renderMissionDetail();
}

document.addEventListener('DOMContentLoaded', () => {
  // View toggle (Flights / Missions)
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentView = btn.dataset.view;
      document.querySelectorAll('.toggle-btn').forEach(b => b.classList.toggle('active', b.dataset.view === currentView));
      el('view-flights').classList.toggle('hidden', currentView !== 'flights');
      el('view-missions').classList.toggle('hidden', currentView !== 'missions');
    });
  });

  // New mission button
  el('btn-new-mission').addEventListener('click', () => {
    // For prototype: just select the first mission with a hint
    alert('In production, this opens a "New Mission" setup form.\n\nFor this prototype, select an existing mission from the list to explore the planning interface.');
  });

  // CoA toggle (delegated)
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

  // Add receiver button
  el('btn-add-receiver').addEventListener('click', () => {
    el('add-receiver-form').style.display = 'grid';
    el('btn-add-receiver').style.display = 'none';
  });

  // Initial render — open first mission
  activeMissionId = MISSIONS[0].id;
  currentView = 'missions';
  document.querySelectorAll('.toggle-btn').forEach(b => b.classList.toggle('active', b.dataset.view === 'missions'));
  el('view-flights').classList.add('hidden');
  el('view-missions').classList.remove('hidden');
  renderAll();
});
