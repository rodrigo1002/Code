# Project Constitution
# Top 100 DJs de Música Electrónica

**Version:** 1.1  
**Project:** Top 100 DJs de Música Electrónica  
**Language:** Spanish  
**Architecture:** Static Website  
**Status:** Active  
**Last reviewed:** 2026-11-07 (manual)

---

## Article I — Project Identity and Purpose

The project is a static website dedicated to presenting, exploring and discovering a curated ranking of the 100 most influential and relevant DJs in electronic music.

The website must provide an engaging experience for electronic music enthusiasts while maintaining reliable information, intuitive navigation and a distinctive visual identity.

The ranking is an editorial selection and must never be presented as an official or universally accepted ranking.

All user-facing content must be written in Spanish.

The project must evolve incrementally without compromising its original purpose.

## Article II — Core Technical Architecture

The application MUST use:

- HTML5.
- CSS3.
- Vanilla JavaScript.

The application MUST maintain the following three primary files:

- `index.html`
- `styles.css`
- `app.js`

The application MAY maintain non-code assets required by the interface:

- `images/NNN.jpg`: one local photo per DJ.
- `images/CREDITOS.md`: the source credits for those photos.

These are assets, not application files, and MUST NOT introduce runtime dependencies.

The website MUST:

- Run by opening `index.html` directly in a browser.
- Work without a local server.
- Work without an Internet connection.
- Avoid external runtime dependencies.
- Remain lightweight and easy to maintain.

The project MUST NOT introduce frameworks, external libraries, databases, APIs, build tools or package dependencies without explicit user authorization.

Additional application files or architectural changes require prior approval.

## Article III — Ranking and Data Integrity

The ranking is one of the most important assets of this project.

The application MUST maintain exactly 100 unique DJs.

The following rules are mandatory:

1. Never remove a DJ without authorization.
2. Never introduce duplicate DJs.
3. Never modify ranking positions without authorization.
4. Never invent artist information.
5. Never replace real data with illustrative or placeholder data.
6. Never assume a DJ's nationality, genre, career start year or biography.
7. Preserve existing data when modifying the data model.
8. Keep artist information consistent throughout the application.
9. Treat the documented geography in `djGeo` as data integrity: it MUST be keyed by DJ name, carry `precision`, `basis` and `source`, and never be invented or silently aligned with the ranking country.

The original ranking position MUST remain unchanged when users search, filter or explore the list.

Filtered results MUST NOT modify the original dataset.

Missing information MUST be handled explicitly rather than fabricated.

## Article IV — User Experience

The website MUST prioritize clarity, usability and intuitive navigation.

Core functionality MUST remain available and operational:

- DJ ranking.
- Search by artist name.
- Filter by musical genre.
- Filter by country.
- Additional filters when approved.
- Individual DJ detail dialog.
- Statistics and distributions calculated from the full dataset.
- Methodology section explaining the editorial criteria.
- Global map of documented locations, independent from the list filters.
- Accurate result counters.
- Clear empty states.
- Responsive navigation.

Search and filters MUST work together without interfering with one another.

User actions MUST produce predictable results and appropriate feedback.

All visible interface text MUST be in Spanish.

## Article V — Visual Identity and Design Quality

The website MUST maintain a distinctive identity inspired by electronic music culture.

Design decisions should consider relevant references such as:

- Electronic music festivals.
- Underground club culture.
- DJ performances.
- Record labels and album artwork.
- Synthesizers and electronic equipment.
- Contemporary music editorial design.

The visual identity MUST be intentional, coherent and recognizable.

The website MUST avoid generic templates and unnecessary decoration.

Design principles:

- Dark visual foundation, unless explicitly redesigned.
- Carefully selected accent colors.
- Consistent typography.
- Clear visual hierarchy.
- Balanced spacing.
- Meaningful use of color and contrast.
- Consistent component styling.
- Restrained and purposeful animation.

New components MUST integrate naturally with the existing design.

A complete redesign MUST NOT be performed unless explicitly requested.

## Article VI — Responsive Design and Accessibility

The application MUST support:

- Desktop.
- Laptop.
- Tablet.
- Mobile.

The interface MUST:

- Avoid horizontal overflow.
- Maintain readable text.
- Provide usable touch controls.
- Include visible keyboard focus.
- Use semantic HTML.
- Provide sufficient color contrast.
- Respect `prefers-reduced-motion`.
- Include appropriate labels for form controls.

Accessibility MUST be considered part of implementation, not an optional enhancement.

## Article VII — Statistics and Information Accuracy

All statistics MUST be calculated from actual available data.

Examples include:

- Total DJs.
- Number of musical genres.
- Most represented genre.
- Distribution by genre.
- Distribution by country.
- Distribution by career-start decade.

The application MUST NOT display fabricated statistics.

Calculations MUST handle missing values and zero denominators safely.

When information is unavailable, the interface MUST communicate that limitation clearly in Spanish.

Documented geography MUST follow the same standard. The map MUST use `djGeo` with its `precision`, `basis` and `source`, MUST NOT draw a DJ whose location is `unknown`, and MUST NOT present a group label as a specific place unless every DJ in the group shares it.

## Article VIII — Code Quality and Maintainability

All code MUST be simple, readable and maintainable.

Development standards:

- Reuse existing functions and components when appropriate.
- Avoid unnecessary duplication.
- Use meaningful variable and function names.
- Avoid unnecessary global variables.
- Keep CSS selectors predictable.
- Avoid conflicting selector specificity.
- Use CSS custom properties for shared design tokens.
- Handle missing data safely.
- Use `textContent` for dynamic text when appropriate.
- Avoid unsafe HTML injection.
- Keep data processing and rendering logically organized.

Unnecessary abstractions and premature optimization SHOULD be avoided.

## Article IX — Development and Change Management

Every modification MUST follow a controlled development process.

Significant changes SHOULD follow the project's SDD workflow: Explore investigates, Planner specifies and plans, the user approves, Implementor executes, and Reviewer verifies independently in read-only mode. The Coordinador manages the workflow. Implementation MUST NOT start before the specification and plan are approved.

Before implementation:

1. Inspect the existing project.
2. Understand the current architecture.
3. Identify affected files and functionality.
4. Evaluate potential regressions.
5. Present a concise implementation plan for significant changes.

During implementation:

1. Make focused changes.
2. Preserve existing functionality.
3. Avoid unrelated refactoring.
4. Do not overwrite entire files unnecessarily.
5. Respect all technical and data constraints.

If a request requires additional dependencies, new application files, external services or architectural changes, obtain user authorization first.

## Article X — Testing and Validation

Every significant change MUST be validated before being considered complete.

Validation MUST include, when applicable:

- Page loads successfully.
- Exactly 100 unique DJs remain.
- Original ranking positions are preserved.
- Search works correctly.
- Filters work correctly.
- Combined filters work correctly.
- Statistics reflect actual data.
- Empty states behave correctly.
- Responsive layouts remain functional.
- No obvious JavaScript errors exist.
- No unnecessary external dependencies were introduced.
- The application still works offline.

Do not claim that a test was performed if it was not actually executed.

## Article XI — Documentation and Project Knowledge

Project documentation MUST remain consistent with the implementation.

When significant changes are made, update relevant documentation when necessary.

Documentation should explain:

- Project architecture.
- Data structure.
- Implemented functionality.
- Important technical decisions.
- Known limitations.

Do not introduce documentation files unnecessarily.

Documentation is split into three documents with different jobs:

- `constitution.md`: principles, scope and durable constraints.
- `AGENTS.md`: operational invariants and editing rules.
- `MEMORY.md`: current state, verified data counts, technical decisions and known limitations.

Every completed task that changes behaviour, data, design or tooling MUST synchronize those documents. Update `MEMORY.md` first, then `AGENTS.md` when an invariant changed, and `constitution.md` only when scope or principles changed. Bump the constitution's manual version when its content changes. If nothing changed, leave the documents untouched.

The `.opencode/plugins/docs-sync` plugin queues this final step when a task modifies the application, and `/SYNC` runs the same procedure manually. Both are development tooling and MUST NOT affect the offline website.

## Article XII — Priority and Conflict Resolution

When requirements conflict, follow this priority order:

1. Explicit user instructions.
2. Data integrity and preservation of existing project content.
3. Core technical architecture and offline compatibility.
4. Existing functionality and usability.
5. Accessibility and responsive behavior.
6. Visual identity and design consistency.
7. Code simplicity and maintainability.
8. Optional enhancements and optimizations.

Do not silently override a higher-priority requirement to satisfy a lower-priority preference.

When a conflict cannot be resolved safely, ask the user before proceeding.

---

## Fundamental Principle

**Protect the identity, data and stability of the project while continuously improving its design and functionality.**

Every implementation must contribute to a better electronic music discovery experience without introducing unnecessary complexity or compromising what already works.