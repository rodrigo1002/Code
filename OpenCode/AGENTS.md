# AGENTS.md

## Project

Static, dependency-free site: **Top 100 DJs de Música Electrónica**. Spanish UI. It must keep working when `index.html` is opened directly via `file://`; there is no server, build step, package manager, or test suite.

## Verify changes

- Open `index.html` in a browser and check the console for errors.
- `node --check app.js` for a quick syntax check.
- Do not introduce `fetch`, APIs, ES modules, frameworks, libraries, or build tooling: any of these can break direct file opening.

## Documentation

The project keeps three documents in sync. They have different jobs, so update the right one:

- `constitution.md` — durable principles, scope and constraints. Change it only when the project's purpose, architecture, data-integrity rules or documentation protocol change.
- `AGENTS.md` — operational invariants an agent must follow while editing. Change it when a rule, hook, file or design invariant changes.
- `MEMORY.md` — current state, verified data counts, technical decisions and known limitations. Change it after every task that alters behaviour, data, design or tooling.

End-of-task rule (mandatory):

1. Compare what changed with the three documents; do not rewrite them from scratch.
2. Update `MEMORY.md` first with the verified result (and fix stale counts or paths).
3. Update `AGENTS.md` if an invariant, hook, path or workflow rule changed.
4. Update `constitution.md` only if the change affects scope, principles or constraints; bump its manual version when you do.
5. If nothing changed, do not touch the documents and say so explicitly.

Automation: `.opencode/plugins/docs-sync/index.ts` detects edits to `index.html`, `styles.css`, `app.js` and the project tooling, then queues a final documentation turn when the session becomes idle. The procedure lives in `.opencode/commands/SYNC.md`; run `/SYNC` to do it manually. The plugin and the command are OpenCode tooling: they are not loaded by `index.html` and do not add runtime dependencies to the site.

Project skills and SDD agents:

- `.agents/skills/dj-electronic-web/SKILL.md` and `.agents/skills/frontend-design/SKILL.md`.
- `.opencode/agents/coordinador.md`, `planner.md`, `implementor.md`, `reviewer.md`.
- `explore` is the built-in subagent; it has no `.opencode/agents/explore.md` file.

## Structure

- `index.html`: fixed page shell. It starts with the decorative `.backdrop` layer (`aria-hidden="true"`), which has no ID and no content. JavaScript hooks: `search`, `genre`, `country`, `djGrid`, `resultsInfo`, `emptyState`, `resetWrapper`, `resetFilters`, plus the stats nodes (`statTotal`, `statGenres`, `statTopGenre`, `statTopGenreHint`, `statCountries`, `genreBars`, `decadeBars`, `decadeNotice`, `genrePanelHint`, `decadePanelHint`) and the map nodes (`mapSearch`, `mapCountry`, `mapSvg`, `mapGraticule`, `mapWorld`, `mapMarkers`, `mapZoomIn`, `mapZoomOut`, `mapPanel`, `mapSummary`, `mapLive`, `mapCountries`). The map section also holds the single Natural Earth `<path>` (~127 kB of coordinates).
- `styles.css`: all styling. Visual direction is a **printed chart sheet**: near-black ground, hairline 1 px rules, zero border-radius, zero shadows/gradients, a single spot ink (`--spot`, `#FF2D6F`) and system typefaces (`Bahnschrift` for voice, `Consolas` for data). `[hidden] { display: none !important; }` is intentional. The page-wide background grid lives in the `/* --- Retícula de fondo --- */` block; the map styles live in the `/* --- Mapa global --- */` block plus its rules inside the media queries.
- `app.js`: source of truth for the DJ list and for `djGeo` (geography); renders cards, derives filter options and stats from the data, filters by name + genre + country, and runs the independent map module.
- `images/NNN.jpg`: one local 600×600 photo per DJ, numbered by position with three digits (`001.jpg` … `100.jpg`). See `images/CREDITOS.md` for sources.

## Invariants

- Keep exactly 100 DJs, positions `1`–`100` in order, with no duplicate names.
- Every DJ needs `country`; `debutYear` is a verified year or `null` — never guess a date.
- Flags are inline SVG in `countryFlags` (`app.js`). Never use flag emoji: Windows does not render them.
- Stats are computed from the full `djs` array, not from the filtered results.
- Photo paths are derived from `position`; adding, removing, or reordering a DJ requires renaming the matching image.
- All interface text stays in Spanish.
- Counts of one use `djUnit()`: `1 DJ`, never `1 DJs`.
- Escape data inserted into card HTML with `escapeHTML` (it escapes `& < > " '`, because it is used inside `alt` and `aria-label` attributes); name search intentionally ignores case, accents and punctuation via `normalize` + `searchTokens`, so `Chase Status` matches `Chase & Status`.
- Do not put `aria-label` on `#djGrid`: it is a bare `div`, so screen readers expose that name inconsistently. The `.ranking` section is already named by its `<h2 class="sr-only">` and the count is announced by `#resultsInfo`.
- The footer must credit every source actually used in `images/CREDITOS.md` (Wikimedia Commons, Deezer, Discogs). If a photo's origin changes, update both.
- `.card__media` is a real `<button>` wrapping the photo and is the **only** trigger that opens the detail dialog (`data-position` + `aria-label="Ver ficha de …"`, `alt=""` on the image). There is no "Ver ficha" button; do not reintroduce one, and keep the focus return pointing at `.card__media[data-position]`.
- `djBios` in `app.js` holds one 21–40 word editorial review per DJ, keyed by **name** (unique and stable; positions are never used as keys). These are project-written context, not verified facts: the dialog labels them "Reseña editorial" and the footer note states it. Never present them as documented biography, and keep `djBios` at 100 entries matching `djs`.
- Heading structure is fixed: one `<h1>`, one `<h2>` per section (`El ranking en cifras`, `Cómo se construyó este ranking`, `El mapa global de la música electrónica`, a visually hidden `Listado de los 100 DJs`), and one `<h3>` per DJ in `.card__name` — that is 5 `<h2>` (the detail dialog adds its own `<h2 id="detailName">`) and exactly 100 `<h3>`. Hide text from sighted users only with `.sr-only`, never with `display: none`. The map section adds no `<h3>`: its `<summary>` elements are not headings.
- `djGeo` in `app.js` is the documented geography, keyed by **name**, never by position, and it must keep 100 entries matching `djs`. Every record carries `city`, `country`, coordinates, `precision: "city"`, `basis` (`birth` | `formation` | `activity` | `origin` in the current data) and `source` (Wikidata QID block, `enwiki:Article/field`, `simplewiki:Article/field` or `ranking:Country`). `precision` keeps `country`/`unknown` in the schema for future cases, but no record uses them. Never invent or "improve" a location: change it only with a source.
- All 100 DJs have a documented city and are drawn with `.map__dot`; there is no country-only marker, no `Sin ubicación` panel and no city-only filter. If a city is missing, find a source that documents it and update `city`, `country`, `lat`, `lon`, `basis` and `source`; never substitute "desconocido" or leave the record without a city.
- The marker country is geographic and may differ from the ranking country (`djs[].country`); when it does, the map panel says `Ranking: …`. Never align one with the other by hand.
- A group label may name a place only when **every** DJ in the group shares it (`N DJs en Los Ángeles`); otherwise it says `N DJs agrupados en esta zona`, and that same string feeds the `aria-label`, the panel kicker and `#mapLive`. Never label a group with its most frequent city: a 26-unit cell mixes cities, so such a label asserts a false location.
- Cartography is Natural Earth 1:110 m (public domain), already projected to Miller 1000 × 500. The `d` attribute is generated, never edited by hand, and never replaced with external tiles, images or map libraries.
- The map is independent of the list: it never calls `render()` and never touches `#djGrid`, `#resultsInfo` or the top filters. Its own state is `mapK`, `mapTX`, `mapTY`, `mapSelected`, `mapQuery`, `mapCountry`, `mapFocusIdx`, `mapPanelKind` and `mapPanelClusterKey`. There is no map reset button: the selection and halo persist until another marker is chosen or a filter removes the selected DJ.
- Marker positions are recomputed in viewBox units (`x = mapX(lon) * k + tx`) and `#mapMarkers` never receives a `transform`, so markers keep their zoom size. `mapMetrics()` sizes the invisible `.map__hit` circle to a 24 × 24 CSS px target and group numbers to 10 CSS px, with slightly larger visuals on narrow screens. Zoom is clamped to `k` 1–6 and the translation to `[1000·(1−k), 0]` / `[500·(1−k), 0]`, with `tx = ty = 0` at `k = 1`.
- Wheel and touch never trap the page: at `k = 1` the SVG uses `touch-action: pan-y pinch-zoom` and does not capture the pointer; at `k > 1` it uses `touch-action: none` and drag pans the map. Wheel zoom is not intercepted at the zoom limits or with `Ctrl` (browser zoom), and drag renders are batched with `requestAnimationFrame`.
- The side panel must never show stale data: it only keeps a DJ still present in `mapFilteredDjs()` or a group whose position signature (`mapClusterKey`) still exists. Otherwise it returns to the default hint. `selectMapDj(position, { focus })` validates visibility; the map search passes `focus: false`, and selecting a DJ inside a group sends focus to `.map__panel-open` instead of `<body>`.
- Marker and group focus uses a roving tabindex (one `tabindex="0"` at a time); arrows walk the markers, Enter/Space opens the detail (or lists a group) and `+`/`−` zoom. `openDetail(position, triggerEl)` returns focus to `triggerEl` when it is still in the document and to `.card__media[data-position]` otherwise.
- Visual language is two-ink print: never reintroduce gradient text, blurred glow blobs, drop shadows, rounded card kits or a second accent colour. One hot spot ink only. The 1 px `.flag` ring (`box-shadow: 0 0 0 1px`) is a hairline border substitute for pale flags, not a decorative shadow.
- `.backdrop` is decorative texture, not a feature: fixed layer behind everything (`z-index: -1`), `pointer-events: none`, 72 px hairlines from `--line-soft` at `opacity: 0.4`, no colour of its own, no shadow and no gradient fill. Its transform must stay on that element, never on `body` or `html`, and it must never animate `background-position` or `background-color`. The pattern repeats every 72 px, so the JS translates it within one cycle (`scrollY × 0.18 % 72`) and the layer never needs to be taller than the viewport. With `prefers-reduced-motion: reduce` the module removes the scroll listener and clears the transform; the CSS `animation: none` block alone does not stop a JS transform.
- Never override `outline` on an interactive element: the single focus ring is the global `:focus-visible` (2 px `--spot`, 3 px offset). No control may have an interactive area under 24 × 24 px. Never apply `opacity` to text — it silently drops contrast; use `--ash` / `--ash-dim` instead.
- Typefaces must stay local (`Bahnschrift`, `Consolas` and their fallbacks). Never add a webfont, CDN or `@import`.
- Card photos are greyscale at rest and regain colour on hover — but the `grayscale` declaration must live **inside** `@media (hover: hover)`, never in the base rule: touch devices have no hover, so a base-level grayscale leaves all 100 photos grey forever. Keep the hover colour reward; it unifies 100 photos from different sources.
- `styles.css` also declares `[hidden] { display: none !important; }` on purpose: components that set `display` (e.g. `.controls__actions`) would otherwise override the `hidden` attribute.
- Do not replace local photos with remote URLs or add features outside the requested scope.
- At the end of every task, follow the Documentation rule above: update `MEMORY.md` first, then `AGENTS.md` if an invariant changed, then `constitution.md` only if scope or principles changed.