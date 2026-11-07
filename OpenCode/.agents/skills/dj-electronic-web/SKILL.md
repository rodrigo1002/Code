---
name: dj-electronic-web
description: Specialized frontend development knowledge for the Top 100 DJs de Música Electrónica static website. Use when developing, maintaining, debugging, improving or reviewing its interface, DJ data, filters, rankings, statistics and responsive design.
compatibility: opencode
---

# DJ Electronic Web — Project Skill

## 1. Project identity

This skill is dedicated to the project **Top 100 DJs de Música Electrónica**.

The project is a static website designed to present and explore a curated ranking of 100 electronic music DJs.

The website must maintain a modern, dark and visually engaging electronic music aesthetic.

All user-facing content must be written in Spanish.

## 2. Technology stack

The application uses only:

- HTML5
- CSS3
- Vanilla JavaScript

The main application files are:

- `index.html`
- `styles.css`
- `app.js`

The website must work by opening `index.html` directly in a browser.

Do not introduce:

- Frontend frameworks.
- External JavaScript libraries.
- External APIs.
- Databases.
- Build systems.
- Package managers as runtime requirements.
- External services or dependencies.

Do not create additional application files without explicit user approval.

## 3. Data integrity — DJs

The ranking must contain exactly 100 unique DJs.

Data integrity is a priority.

Rules:

- Never remove a DJ without authorization.
- Never add duplicate DJs.
- Never change ranking positions without authorization.
- Never invent artist information.
- Never assume a DJ's country, career start year, genre or biography.
- Preserve existing data when modifying the data structure.
- Keep artist information consistent throughout the application.

When possible, keep DJ information centralized in a JavaScript data structure.

Recommended data model:

```javascript
{
  rank: 1,
  name: "DJ Name",
  genre: "Techno",
  country: "Country",
  careerStartYear: 2010
}
```

This is an example of structure only. Do not use example values as factual information.

Optional fields must be handled safely when information is unavailable.

## 4. Ranking and sorting

The ranking is an editorial selection, not an official or universally accepted ranking.

Rules:

- Preserve the original ranking order.
- Do not automatically sort DJs alphabetically.
- Do not recalculate ranking positions when filters are applied.
- Filtering must not modify the original dataset.
- Always distinguish the original ranking position from the filtered result position.

The original rank must remain visible when users search or filter the list.

## 5. Search and filters

The website may include:

- Search by DJ name.
- Filter by musical genre.
- Filter by country.
- Additional filters when explicitly requested.

All filters must work together.

For example, a user must be able to search for a DJ while simultaneously filtering by genre and country.

Rules:

- Filters must use the original dataset.
- Filtering must not modify or delete original records.
- Update the visible results dynamically.
- Update result counters correctly.
- Provide a clear empty-state message.
- Include an option to reset filters when appropriate.

Avoid duplicating filtering logic across multiple functions.

## 6. Statistics and data visualization

Statistics must always be calculated from actual available data.

Possible metrics:

- Total number of DJs.
- Number of unique genres.
- Most represented genre.
- DJs per genre.
- Percentage distribution by genre.
- DJs per country.
- Percentage distribution by country.
- Career start distribution by decade, when reliable dates exist.

Rules:

- Never hardcode statistics that should be calculated.
- Never invent missing values.
- Ignore missing optional values when calculating relevant metrics.
- Avoid division by zero.
- Ensure percentages are calculated using the correct denominator.
- Make visualizations consistent with the underlying data.

Use HTML and CSS for charts and visual representations.

Do not introduce chart libraries.

When data is unavailable, display a clear Spanish message explaining that the statistic cannot currently be calculated.

## 7. Visual design

Maintain the existing visual identity.

Design principles:

- Dark background.
- Electronic music visual atmosphere.
- Neon accent colors.
- Modern cards and panels.
- Subtle borders and shadows.
- Clear typography.
- Consistent spacing.
- Smooth but restrained transitions.
- Good visual hierarchy.

Avoid excessive animations, visual clutter and unnecessary decorative elements.

New components must look like a natural extension of the existing interface.

## 8. Responsive design

The website must work correctly on:

- Desktop computers.
- Laptops.
- Tablets.
- Mobile phones.

Rules:

- Avoid horizontal overflow.
- Keep text readable.
- Adapt cards and grids to available screen width.
- Ensure filters are usable on touch screens.
- Keep navigation and controls accessible.
- Avoid fixed widths that break smaller screens.

## 9. JavaScript development practices

Use simple, maintainable JavaScript.

Rules:

- Reuse existing functions when appropriate.
- Avoid unnecessary global variables.
- Use meaningful variable and function names.
- Avoid duplicated logic.
- Handle missing or undefined data safely.
- Use `textContent` for dynamic text.
- Avoid unsafe HTML injection.
- Keep rendering and data processing logically separated.
- Do not mutate the original DJ dataset when filtering or calculating statistics.

Prefer readable code over unnecessarily complex abstractions.

## 10. Accessibility and usability

Consider the following:

- Semantic HTML elements.
- Proper labels for form controls.
- Keyboard navigation.
- Visible focus states.
- Sufficient color contrast.
- Descriptive button labels.
- Accessible messages for empty results.
- Appropriate alternative text for images if images are introduced.

Do not rely exclusively on color to communicate information.

## 11. Performance

Keep the website lightweight.

Rules:

- Avoid unnecessary DOM operations.
- Avoid recalculating statistics repeatedly when the underlying data has not changed.
- Avoid unnecessary event listeners.
- Prefer efficient rendering.
- Keep CSS organized.
- Do not introduce large dependencies.

The website should remain fast on ordinary desktop and mobile devices.

## 12. Development workflow

Whenever working on the project:

1. Inspect the existing files before making changes.
2. Understand the current implementation.
3. Identify the affected components and functions.
4. Preserve existing behavior.
5. Make focused changes.
6. Avoid unrelated refactoring.
7. Validate the new functionality.
8. Check for regressions.

If a requested feature requires architectural changes, additional files, dependencies or external services, explain the reason and ask for authorization first.

## 13. Final validation checklist

Before considering a change complete, verify:

- The website loads correctly.
- The ranking still contains exactly 100 unique DJs.
- Original ranking positions are preserved.
- Search works correctly.
- Existing filters work correctly.
- Combined filters work correctly.
- Statistics reflect actual data.
- Missing information is handled correctly.
- The interface remains responsive.
- No unnecessary external dependencies were introduced.
- No obvious JavaScript errors remain.
- The website still works by opening `index.html` directly.

## 14. Main principle

**Protect the project before extending it.**

Every new feature must improve the website without compromising its existing functionality, data integrity, performance or visual identity.

Prefer incremental, focused and maintainable improvements over unnecessary complexity.