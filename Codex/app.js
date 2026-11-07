const $ = selector => document.querySelector(selector);
const history = { cpu: [], memory: [] };
let timer;

const esc = value => String(value ?? 'N/A').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));
const gib = value => typeof value === 'number' ? `${value.toFixed(2)} GiB` : 'N/A';
const badge = value => `<span class="status ${String(value).toLowerCase()}">${esc(value)}</span>`;
const card = (label, value, detail = '') => `<article class="card"><div class="label">${esc(label)}</div><div class="value">${esc(value)}</div><div class="label">${detail}</div></article>`;

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

function render(data) {
    const computer = data.computer || {};
    const windows = data.windows || {};
    const cpu = data.cpu || {};
    const memory = data.memory || {};
    const health = data.health || {};
    const collectedAt = new Date(data.collectedAt);
    const collectionTime = Number.isNaN(collectedAt.getTime()) ? 'Unknown time' : collectedAt.toLocaleString();

    $('#notice').textContent = `Last collection: ${collectionTime} · Local data only`;
    $('#summary').innerHTML =
        card('Computer', computer.name, `${esc(computer.manufacturer)} ${esc(computer.model)}<br>Serial: ${esc(computer.serialNumber)}`) +
        card('Signed-in user', computer.interactiveUser, `Collector: ${esc(computer.runningAccount)}`) +
        card('Windows', windows.edition, `Version ${esc(windows.version)} · ${esc(windows.displayVersion)} · build ${esc(windows.build)}<br>PowerShell ${esc(windows.powerShellVersion)}`) +
        card('System health', `${esc(health.score)}/100`, Object.entries(health.components || {}).map(([name, status]) => `${esc(name)}: ${badge(status)}`).join(' &nbsp; '));

    $('#performanceCards').innerHTML =
        card('CPU', `${esc(cpu.usagePercent)}%`, `${esc(cpu.name)}<br>${esc(cpu.physicalCores)} physical / ${esc(cpu.logicalProcessors)} logical · ${esc(cpu.currentClockMHz)} MHz current`) +
        card('Memory', `${esc(memory.usagePercent)}%`, `${gib(memory.usedGiB)} used · ${gib(memory.availableGiB)} available · ${gib(memory.totalGiB)} total`);

    [['cpu', cpu.usagePercent, '#58d6e8'], ['memory', memory.usagePercent, '#70d6a2']].forEach(([key, value, color]) => {
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
        <div class="bar ${String(drive.status).toLowerCase()}" role="img" aria-label="${esc(drive.usagePercent)} percent used"><i style="width:${Math.max(0, Math.min(100, Number(drive.usagePercent) || 0))}%"></i></div></article>`).join('') || '<p class="label">No storage data available.</p>';

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
    try {
        const response = await fetch(`data/dashboard.json?ts=${Date.now()}`, { cache: 'no-store' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        render(await response.json());
    } catch (error) {
        $('#notice').textContent = `Local data unavailable: ${error.message}. Run scripts\\collect-dashboard.ps1, then serve this folder locally.`;
    }
}

function schedule() {
    clearInterval(timer);
    const seconds = Number($('#interval').value);
    if (seconds) timer = setInterval(refresh, seconds * 1000);
}

$('#refresh').addEventListener('click', refresh);
$('#interval').addEventListener('change', schedule);
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
