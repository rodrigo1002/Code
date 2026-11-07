# Repository Guidelines

## Project Structure

This repository contains a local Windows PC monitoring dashboard.

- `index.html`, `styles.css`, and `app.js` implement the browser interface.
- `scripts/collect-dashboard.ps1` collects system information and writes a JSON snapshot to `data/dashboard.json`.
- `scripts/watch-dashboard.ps1` runs the collector repeatedly. It accepts intervals of 5, 10, 30, or 60 seconds.
- `system-info.ps1` prints a separate system summary.

Keep browser interface code in the root files and recurring dashboard collection logic under `scripts/`.

## Development Workflow

PowerShell 7 or later is required for the collection scripts, which are supported on Windows.

- Run `pwsh -File scripts/collect-dashboard.ps1` to collect a snapshot.
- Run `pwsh -File scripts/watch-dashboard.ps1 -IntervalSeconds 10` to collect repeatedly.
- Serve the repository root locally with `py -m http.server 8000 --bind 127.0.0.1`, then open `http://127.0.0.1:8000`.

There is no configured build step, automated test framework, formatter, or linter. For interface changes, manually inspect dashboard sections, refresh behavior, and desktop and narrow layouts. For collector changes, inspect the JSON structure and its `errors` field. Run the collector on Windows when the environment permits it.

## Coding Conventions

- Use four spaces for PowerShell indentation and verb-noun names for PowerShell commands and scripts.
- Use descriptive lower camel case for JavaScript variables and functions.
- Keep HTML semantic and accessible. Reuse CSS custom properties for shared colors.
- Follow `CONSTITUTION.md` for project principles and truthful documentation.

## Documentation Maintenance

At the end of every completed task that changes the project, review `AGENTS.md`, `MEMORY.md`, and `CONSTITUTION.md` against the resulting repository state.

- Update `MEMORY.md` with durable, verified facts about the task or changed project behavior. Remove or correct notes that no longer match the repository. Do not add unrelated personal machine details.
- Update `AGENTS.md` when project structure, workflow, conventions, or verification instructions change.
- Update `CONSTITUTION.md` only when a project principle or governance rule changes. Check that the other documents remain consistent with it.
- Do not claim a document was updated if no verified change is needed. Keep each document concise and do not duplicate the same detailed content across files.

## Data and Security

The collector reads local system and security status and writes it to `data/dashboard.json`. Treat snapshots as machine-specific and potentially sensitive. `.gitignore` excludes the default snapshot path while leaving the local file available to the dashboard. Do not force-add personal snapshots, credentials, or secrets. The dashboard reads local JSON and does not require a service connection.

## Collaboration Notes

No repository test suite or commit convention is configured in this checkout. When proposing a commit subject, use a short imperative phrase. A change description should summarize the change and manual verification, with screenshots for visible interface changes when relevant.
