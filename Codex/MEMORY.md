# Repository Memory

## Project

- Local Windows PC monitoring dashboard.
- Browser interface lives in `index.html`, `styles.css`, and `app.js` at the repository root.
- PowerShell collection scripts are under `scripts/`. The collector writes `data/dashboard.json`.
- Collection scripts require PowerShell 7 or later and run on Windows.

## Common Workflow

- Collect a snapshot with `pwsh -File scripts/collect-dashboard.ps1`.
- Run recurring collection with `pwsh -File scripts/watch-dashboard.ps1 -IntervalSeconds 10`. Supported values are 5, 10, 30, and 60.
- Serve the repository root on loopback with `py -m http.server 8000 --bind 127.0.0.1` and open `http://127.0.0.1:8000` to view the dashboard.
- No build step, automated test framework, formatter, or linter configuration is present.

## Repository Notes

- `system-info.ps1` is a separate system summary script. `hello.ps1` is a small example.
- `data/dashboard.json` contains machine-specific system data. Treat it as sensitive and avoid committing personal snapshots or secrets.
- This checkout has no Git metadata, so commit history conventions cannot be inspected here.
- Contributor instructions are in `AGENTS.md`.

## Maintenance notes (2026-11-01)

- In `app.js`, unavailable CPU or memory utilization is appended to chart history as zero, so missing measurements appear as zero-percent readings.
- Serve the dashboard with the loopback bind address documented above. The snapshot contains machine-specific information.
- Removed the deprecated `memory_tool` feature flag from the user Codex config, leaving `memories = true` enabled. Added YAML frontmatter to `.agents/skills/frontend-design/SKILL.md` with its name and description.

- Refreshed the dashboard UI with an instrument-panel visual system, responsive navigation, clearer health and performance hierarchy, and accessible chart/refresh controls (2026-11-01).
