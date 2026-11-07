# Repository Guidelines

## Project Structure & Module Organization

This repository is a local Windows PC monitoring dashboard. `index.html`, `styles.css`, and `app.js` provide the browser interface. `scripts/collect-dashboard.ps1` gathers system data and writes `data/dashboard.json`. `scripts/watch-dashboard.ps1` repeats collection on an interval. `system-info.ps1` is a separate system summary script, and `hello.ps1` is a small example. Keep browser code in the root files and collection logic in `scripts/`.

## Build, Test, and Development Commands

PowerShell 7 or later is required for the collection scripts. Run:

- `pwsh -File scripts/collect-dashboard.ps1` to collect a snapshot for the current Windows machine.
- `pwsh -File scripts/watch-dashboard.ps1 -IntervalSeconds 10` to refresh the snapshot repeatedly. Supported intervals are 5, 10, 30, and 60 seconds.
- `py -m http.server 8000 --bind 127.0.0.1` to serve the dashboard on this machine, then open `http://127.0.0.1:8000`.
- Update the MEMORY.md file at the end of each task.

There is no configured build step or automated test framework. Check interface changes by serving the page and reviewing each dashboard section. Run the collector on Windows to verify data changes.

## Coding Style & Naming Conventions

Use four spaces for PowerShell indentation and follow the existing verb-noun names for PowerShell functions and scripts. Use descriptive lower camel case for JavaScript variables and functions. Keep HTML semantic and accessible, and use the existing CSS custom properties for shared colors. No formatter or linter configuration is present.

## Testing Guidelines

No test suite or coverage requirement is configured. For collector changes, inspect the generated JSON for valid structure and confirm collection errors appear in its `errors` field. For UI changes, verify refresh behavior and the layout at desktop and narrow viewport widths.

## Commit & Pull Request Guidelines

Git metadata is not available in this checkout, so existing commit message conventions cannot be confirmed. Use a short imperative commit subject, such as `Improve dashboard refresh handling`. Pull requests should explain the change, list manual verification performed, link related work when applicable, and include screenshots for visible interface changes.

## Security & Configuration

The collector reads local system and security status and writes it to `data/dashboard.json`. Treat snapshots as machine-specific information. Do not add personal snapshots, credentials, or secrets to commits. The dashboard is designed to read local JSON and does not require a service connection.
