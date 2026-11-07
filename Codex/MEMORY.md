# Repository Memory

## Verified Project Facts

- The project is a local Windows PC monitoring dashboard. Browser code is in `index.html`, `styles.css`, and `app.js`.
- `scripts/collect-dashboard.ps1` collects computer, Windows, CPU, memory, storage, network, security, GPU, health score, and collection error data into `data/dashboard.json`.
- `scripts/watch-dashboard.ps1` invokes the collector repeatedly. Supported intervals are 5, 10, 30, and 60 seconds, with a default of 10 seconds.
- `system-info.ps1` outputs a separate system summary.
- The collector scripts require PowerShell 7 or later and support Windows.
- The browser loads `data/dashboard.json`, renders the dashboard sections, and keeps up to 60 valid CPU and memory utilization samples in page memory.
- Dashboard status classes use a fixed allowlist. Unrecognized status values receive the neutral style, and status text is HTML-escaped.
- The collector evaluates available security checks so an unavailable check does not hide a known disabled, not-ready, or absent security state.
- Zero free memory is preserved as a measured value. Storage health is `N/A` when there are no drives or a drive status is unknown, and network health is `N/A` when network collection fails.
- The GPU collector marks video memory as unavailable when `Win32_VideoController.AdapterRAM` reaches the `uint32` maximum because that property cannot represent larger values.
- The dashboard describes itself as local and states that access depends on server settings. The documented local server command binds to loopback.
- The browser starts in a clearly labeled, high-load fictional server demo unless the saved data mode is `live`. Demo CPU and memory readings cycle through a synthetic series. The selector choice is stored in browser local storage. Live data falls back to the demo fixture when the snapshot cannot be loaded, and chart histories reset when the displayed source changes.
- There is no configured build step, automated test framework, formatter, or linter.

## Common Workflow

- Collect a snapshot with `pwsh -File scripts/collect-dashboard.ps1`.
- Run recurring collection with `pwsh -File scripts/watch-dashboard.ps1 -IntervalSeconds 10`.
- Serve the repository root with `py -m http.server 8000 --bind 127.0.0.1` and open `http://127.0.0.1:8000`.
- Follow `AGENTS.md` for development and documentation maintenance. Follow `CONSTITUTION.md` for project principles.

## Data Handling

- A dashboard snapshot may expose machine-specific system and security information. Treat it as sensitive. `.gitignore` excludes the default snapshot path, and the local snapshot remains available to the dashboard.
- The browser dashboard reads local JSON and does not require a service connection.

## Maintenance

- Review these notes at the end of every project-changing task. Keep durable facts current and remove stale or unrelated notes.
- Update `AGENTS.md` for workflow or convention changes. Update `CONSTITUTION.md` only when project principles change.
- Last reviewed: 2026-11-07.
