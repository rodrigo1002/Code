# Project Constitution

## Purpose

This project presents local Windows PC health and performance information through a browser dashboard and PowerShell collection scripts.

## Governing Principles

1. **Make local data exposure explicit.** Collection writes a local JSON snapshot and the dashboard reads that snapshot. Access to static files depends on the server binding, so use loopback for local-only access. Treat collected system and security information as sensitive. Do not add credentials, secrets, or personal snapshots to the repository.
2. **Report what the code and data support.** Preserve unavailable values as unavailable, surface collection failures through the snapshot `errors` field, and do not describe an inference as a verified fact.
3. **Keep collection and presentation understandable.** PowerShell scripts collect and serialize system data. The browser files present that data. Keep changes in the appropriate layer and keep the snapshot contract consistent between them.
4. **Keep the dashboard usable.** Preserve semantic and accessible interface behavior, responsive layouts, and clear refresh and error feedback when changing the UI.
5. **Document actual behavior.** Repository documentation must match the checked-in code and available workflow. Mark uncertain claims as unverified or omit them.

## Change Review

Before completing a project change, review the affected behavior and check `AGENTS.md`, `MEMORY.md`, and this constitution for accuracy. Record durable, verified project knowledge in `MEMORY.md`. Change this constitution only when a governing principle changes.

## Scope

This constitution governs the dashboard repository. Contributor workflow details belong in `AGENTS.md`, while concise verified project state belongs in `MEMORY.md`.
