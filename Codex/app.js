const $ = selector => document.querySelector(selector);
const history = { cpu: [], memory: [] };
let timer;
let mode = loadMode();
let activeSource = null;
let refreshSequence = 0;
let demoSampleIndex = 0;

const demoCpuSeries = [92, 94, 91, 89, 93, 95, 90, 87, 92, 94, 88, 91, 96, 89, 93, 92, 85, 90, 94, 91];
const demoMemorySeries = [84, 84, 85, 84, 86, 85, 84, 83, 85, 86, 85, 84, 87, 86, 85, 84, 83, 85, 86, 85];
const demoSnapshot = {
    collectedAt: '',
    computer: {
        name: 'ATLAS-01', manufacturer: 'Northstar Systems', model: 'RackForge R740',
        serialNumber: 'DEMO-NOT-REAL', interactiveUser: 'demo\\operator', runningAccount: 'DEMO\\operator'
    },
    windows: {
        edition: 'Windows Server 2025 Datacenter', version: '10.0.26100', displayVersion: '24H2',
        build: '26100', powerShellVersion: '7.5.3', lastBootTime: '', uptimeSeconds: 10800
    },
    cpu: {
        name: 'AMD EPYC 9554 64-Core Processor', physicalCores: 64, logicalProcessors: 128,
        usagePercent: 92, currentClockMHz: 3550, maxClockMHz: 3750, status: 'Critical'
    },
    memory: { totalGiB: 512, usedGiB: 430.08, availableGiB: 81.92, usagePercent: 84, status: 'Warning' },
    storage: [
        { letter: 'C:', label: 'System', totalGiB: 1024, usedGiB: 947.2, freeGiB: 76.8, filesystem: 'NTFS', usagePercent: 92.5, status: 'Critical' },
        { letter: 'D:', label: 'Workspace', totalGiB: 2048, usedGiB: 1392.64, freeGiB: 655.36, filesystem: 'NTFS', usagePercent: 68, status: 'Normal' }
    ],
    network: [
        { name: 'Demo 25 GbE Adapter', alias: 'Production uplink', type: 'Ethernet', status: 'Up', mac: '02-00-5E-00-53-01', linkSpeed: '25 Gbps', ipv4: ['192.0.2.44'], ipv6: ['2001:db8:10::44'], gateway: '192.0.2.1' },
        { name: 'Demo management interface', alias: 'Management', type: 'Ethernet', status: 'Up', mac: '02-00-5E-00-53-02', linkSpeed: '1 Gbps', ipv4: ['198.51.100.17'], ipv6: ['2001:db8:20::17'], gateway: '198.51.100.1' }
    ],
    security: {
        secureBoot: 'Enabled', tpm: 'Ready', bitLocker: 'Protection enabled',
        defender: 'Real-time protection enabled', firewall: 'Enabled', lastUpdate: 'KB DEMO-2026 installed 2026-10-28'
    },
    gpu: [
        { name: 'NVIDIA L40S (demo)', adapterMemoryGiB: 48, driverVersion: '560.94-demo', driverDate: '2026-10-15' }
    ],
    health: {
        score: 52,
        rules: 'Demo values only. Warnings deduct 8 points and critical states deduct 20.',
        components: { cpu: 'Critical', memory: 'Warning', storage: 'Critical', network: 'Normal', security: 'Normal' }
    },
    errors: { 'GPU telemetry': 'Demo event: response delayed 1.2 seconds during a training job.' }
};

const esc = value => String(value ?? 'N/A').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));
const gib = value => typeof value === 'number' ? `${value.toFixed(2)} GiB` : 'N/A';
const statusClasses = new Map([
    ['normal', 'normal'], ['warning', 'warning'], ['critical', 'critical'], ['n/a', 'na'], ['up', 'normal']
]);
const statusClass = value => statusClasses.get(String(value ?? '').toLowerCase()) ?? 'na';
const badge = value => `<span class="status ${statusClass(value)}">${esc(value)}</span>`;
const card = (label, value, detail = '') => `<article class="card"><div class="label">${esc(label)}</div><div class="value">${esc(value)}</div><div class="label">${detail}</div></article>`;

function loadMode() {
    try {
        return localStorage.getItem('localPcMonitorMode') === 'live' ? 'live' : 'demo';
    } catch {
        return 'demo';
    }
}

function saveMode(value) {
    try {
        localStorage.setItem('localPcMonitorMode', value);
    } catch {
        // Keep the selected mode for this page session when storage is unavailable.
    }
}

function createDemoSnapshot() {
    const index = demoSampleIndex % demoCpuSeries.length;
    const cpuPercent = demoCpuSeries[index];
    const memoryPercent = demoMemorySeries[index];
    const cpuStatus = cpuPercent >= 90 ? 'Critical' : cpuPercent >= 80 ? 'Warning' : 'Normal';
    const memoryStatus = memoryPercent >= 90 ? 'Critical' : memoryPercent >= 80 ? 'Warning' : 'Normal';
    const deductions = (cpuStatus === 'Critical' ? 20 : cpuStatus === 'Warning' ? 8 : 0) +
        (memoryStatus === 'Critical' ? 20 : memoryStatus === 'Warning' ? 8 : 0) + 20;
    demoSampleIndex += 1;

    return {
        ...demoSnapshot,
        collectedAt: new Date().toISOString(),
        cpu: { ...demoSnapshot.cpu, usagePercent: cpuPercent, status: cpuStatus },
        memory: {
            ...demoSnapshot.memory,
            usedGiB: Number((demoSnapshot.memory.totalGiB * memoryPercent / 100).toFixed(2)),
            availableGiB: Number((demoSnapshot.memory.totalGiB * (100 - memoryPercent) / 100).toFixed(2)),
            usagePercent: memoryPercent,
            status: memoryStatus
        },
        health: {
            ...demoSnapshot.health,
            score: Math.max(0, 100 - deductions),
            components: { ...demoSnapshot.health.components, cpu: cpuStatus, memory: memoryStatus }
        }
    };
}

function draw(id, values, color) {
    const canvas = $(id);
    const context = canvas.getContext('2d');
    const ratio = window.devicePixelRatio || 1;
    const width = Math.max(1, Math.floor(canvas.clientWidth * ratio));
    const height = Math.max(1, Math.floor(canvas.clientHeight * ratio));
    canvas.width = width;
    canvas.height = height;
    context.clearRect(0, 0, width, height);
    if (values.length < 2) return;

    context.strokeStyle = color;
    context.lineWidth = 2 * ratio;
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.beginPath();
    values.forEach((value, index) => {
        const x = index * width / (values.length - 1);
        const y = height - Math.max(0, Math.min(100, value)) / 100 * height;
        if (index === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
    });
    context.stroke();
}

function render(data, source, noticeText = '') {
    if (activeSource !== source) {
        history.cpu = [];
        history.memory = [];
        activeSource = source;
    }

    const computer = data.computer || {};
    const windows = data.windows || {};
    const cpu = data.cpu || {};
    const memory = data.memory || {};
    const health = data.health || {};
    const collectedAt = new Date(data.collectedAt);
    const collectionTime = Number.isNaN(collectedAt.getTime()) ? 'Unknown time' : collectedAt.toLocaleString();

    const notice = $('#notice');
    notice.textContent = noticeText || (source === 'demo'
        ? 'DEMO DATA · Fictional server workload'
        : `Last collection: ${collectionTime} · Live snapshot`);
    notice.classList.toggle('demo-notice', source === 'demo');
    $('#summary').innerHTML =
        card('Computer', computer.name, `${esc(computer.manufacturer)} ${esc(computer.model)}<br>Serial: ${esc(computer.serialNumber)}`) +
        card('Signed-in user', computer.interactiveUser, `Collector: ${esc(computer.runningAccount)}`) +
        card('Windows', windows.edition, `Version ${esc(windows.version)} · ${esc(windows.displayVersion)} · build ${esc(windows.build)}<br>PowerShell ${esc(windows.powerShellVersion)}`) +
        card('System health', `${esc(health.score)}/100`, Object.entries(health.components || {}).map(([name, status]) => `${esc(name)}: ${badge(status)}`).join(' &nbsp; '));

    $('#performanceCards').innerHTML =
        card('CPU', `${esc(cpu.usagePercent)}%`, `${esc(cpu.name)}<br>${esc(cpu.physicalCores)} physical / ${esc(cpu.logicalProcessors)} logical · ${esc(cpu.currentClockMHz)} MHz current`) +
        card('Memory', `${esc(memory.usagePercent)}%`, `${gib(memory.usedGiB)} used · ${gib(memory.availableGiB)} available · ${gib(memory.totalGiB)} total`);

    [['cpu', cpu.usagePercent, '#58d6e8'], ['memory', memory.usagePercent, '#70d6a2']].forEach(([key, value, color]) => {
        if (source === 'demo') {
            const samples = key === 'cpu' ? demoCpuSeries : demoMemorySeries;
            history[key] = samples.slice(0, -1);
        }
        if (value !== null && value !== undefined && Number.isFinite(Number(value))) {
            history[key] = history[key].concat(Number(value)).slice(-60);
        }
        draw(`#${key}Chart`, history[key], color);
    });
    $('#cpuChart').setAttribute('aria-label', `CPU utilization history. Current ${cpu.usagePercent ?? 'N/A'} percent; ${history.cpu.length} samples.`);
    $('#memoryChart').setAttribute('aria-label', `Memory utilization history. Current ${memory.usagePercent ?? 'N/A'} percent; ${history.memory.length} samples.`);

    $('#storageContent').innerHTML = (data.storage || []).map(drive => `
        <article class="drive"><b>${esc(drive.letter)} ${esc(drive.label)}</b> ${badge(drive.status)}
        <p>${gib(drive.usedGiB)} used · ${gib(drive.freeGiB)} free · ${esc(drive.filesystem)}</p>
        <div class="bar ${statusClass(drive.status)}" role="img" aria-label="${esc(drive.usagePercent)} percent used"><i style="width:${Math.max(0, Math.min(100, Number(drive.usagePercent) || 0))}%"></i></div></article>`).join('') || '<p class="label">No storage data available.</p>';

    $('#networkContent').innerHTML = (data.network || []).map(adapter => `
        <article class="adapter"><b>${esc(adapter.alias)}</b> ${badge(adapter.status)}
        <p>${esc(adapter.type)} · ${esc(adapter.linkSpeed)} · MAC ${esc(adapter.mac)}<br>
        IPv4: ${esc((adapter.ipv4 || []).join(', ') || 'N/A')}<br>
        IPv6: ${esc((adapter.ipv6 || []).join(', ') || 'N/A')}<br>
        Gateway: ${esc(adapter.gateway)}</p></article>`).join('') || '<p class="label">No network adapters found.</p>';

    $('#securityContent').innerHTML = Object.entries(data.security || {}).map(([name, value]) => card(name.replace(/([A-Z])/g, ' $1'), value)).join('') || card('Security status', 'N/A');
    $('#hardwareContent').innerHTML = (data.gpu || []).map(gpu => card('GPU', gpu.name, `${gib(gpu.adapterMemoryGiB)} · driver ${esc(gpu.driverVersion)} · ${esc(gpu.driverDate)}`)).join('') || card('GPU', 'N/A');
    $('#errorsContent').textContent = Object.keys(data.errors || {}).length
        ? Object.entries(data.errors).map(([name, error]) => `${name}: ${error}`).join('\n')
        : 'No collection errors.';
}

async function refresh() {
    const requestId = ++refreshSequence;
    const requestedMode = mode;

    if (requestedMode === 'demo') {
        render(createDemoSnapshot(), 'demo');
        return;
    }

    try {
        const response = await fetch(`data/dashboard.json?ts=${Date.now()}`, { cache: 'no-store' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (requestId !== refreshSequence || mode !== requestedMode) return;
        render(data, 'live');
    } catch (error) {
        if (requestId !== refreshSequence || mode !== requestedMode) return;
        render(createDemoSnapshot(), 'demo', `DEMO DATA · Live snapshot unavailable (${error.message}). Showing fictional values.`);
    }
}

function schedule() {
    clearInterval(timer);
    const seconds = Number($('#interval').value);
    if (seconds) timer = setInterval(refresh, seconds * 1000);
}

$('#refresh').addEventListener('click', refresh);
$('#interval').addEventListener('change', schedule);
$('#dataMode').value = mode;
$('#dataMode').addEventListener('change', event => {
    mode = event.target.value === 'live' ? 'live' : 'demo';
    saveMode(mode);
    refresh();
});
$('#menu').addEventListener('click', () => {
    const navigation = $('#nav');
    const open = navigation.classList.toggle('open');
    $('#menu').setAttribute('aria-expanded', open);
});
$('#nav').addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link) return;
    $('#nav').querySelectorAll('a').forEach(item => item.classList.toggle('active', item === link));
    $('#nav').classList.remove('open');
    $('#menu').setAttribute('aria-expanded', 'false');
});
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        draw('#cpuChart', history.cpu, '#58d6e8');
        draw('#memoryChart', history.memory, '#70d6a2');
    }, 100);
});

refresh();
schedule();
