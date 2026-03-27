# Plan: Create JASON.html — JSON Viewer Tool

## Context
The Possibility repo has two HTML file viewer tools (REACTOR.html for JSX/React components, MARKER.html for Markdown) that follow identical architectural patterns: GitHub dark theme, 4-screen architecture, IIFE namespace, 3-step loading pipeline, drag-and-drop upload, animated branding. The user wants a third tool — JASON.html — for viewing/exploring JSON files, following the exact same patterns. All documentation and tests must be updated.

## Implementation Steps

Each step ends with a commit + push to `claude/evaluate-claude-md-ruOcF`.

---

### Step 1: Create `HTML Files/JASON.html`

**Single self-contained HTML file (~900-1100 lines) following REACTOR/MARKER patterns exactly.**

**Architecture (identical to REACTOR/MARKER):**
- 4 screens: `#upload-screen`, `#loading-screen`, `#error-screen`, `#component-view`
- `showScreen(name)` function toggling `.active`/`.hidden` classes
- IIFE namespace: `const JASON = (() => { ... return { deploy, reset }; })();`
- `const $ = (id) => document.getElementById(id);` internal helper
- Hidden `<input type="file" accept=".json">` with drop zone (click + drag-and-drop)
- `.drag-over` class on drag events, `.file-name-display.visible` on file select
- 3-step loading pipeline: `step-read` ("Reading file"), `step-parse` ("Parsing JSON"), `step-render` ("Rendering tree")
- States: default (opacity 0.3), `.active` (opacity 1 + pulse), `.done` (opacity 0.7 + green check)
- Back navigation: `.back-link` (fixed, href="index.html", "← Possibility") + `.back-pill` (fixed, onclick `JASON.reset()`, animated dot)

**GitHub Dark Theme CSS Variables (same as REACTOR/MARKER):**
```css
--bg: #0d1117; --surface: #161b22; --surface-hover: #1c2129;
--border: #30363d; --text: #e6edf3; --text-muted: #8b949e;
--accent: #58a6ff; --accent-hover: #79b8ff;
--green: #3fb950; --yellow: #d29922; --red: #f85149;
--jason-glow: #f0883e;  /* Orange — JSON's signature color */
```

**Branding:**
- Title: "JASON" with subtitle "JSON Explorer"
- Animated logo: curly braces `{ }` with nested brackets and a pulsing dot (JSON-themed)
- Tool-specific glow color: orange (`#f0883e`)

**JSON-Specific Features:**
- Tree view with collapsible nodes (objects/arrays expand/collapse)
- Syntax-highlighted raw view toggle
- Key-value color coding: strings (green), numbers (blue/accent), booleans (yellow), null (red/muted)
- Path breadcrumb showing current location in tree (e.g., `root > users > 0 > name`)
- Search/filter by key name
- Copy path or value on click
- Node count display (objects show key count, arrays show length)
- Format toggle: Tree View / Raw View

**CDN Dependencies:**
- None required (JSON parsing is native — `JSON.parse()`)
- No external libraries needed — pure vanilla JS

**Public API:** `JASON.deploy()`, `JASON.reset()`

**Critical files to reference:**
- `/home/user/Possibility/HTML Files/REACTOR.html` — base pattern (929 lines)
- `/home/user/Possibility/HTML Files/MARKER.html` — enhanced pattern with sidebar (1152 lines)

**Commit:** "Add JASON.html JSON explorer to HTML Files"

---

### Step 2: Copy to `docs/JASON.html`

Identical copy of `HTML Files/JASON.html` to `docs/JASON.html` for GitHub Pages deployment.

**Commit:** "Add JASON.html to docs for GitHub Pages"

---

### Step 3: Create `js_tests/jason.test.js`

**Follow marker.test.js pattern exactly — 15 test suites, ~100 tests.**

**Test suites (mirroring marker.test.js structure):**

1. **File Existence & Deployment** — source file exists, docs copy exists, both are identical
2. **HTML Document Structure** — DOCTYPE, html lang="en", viewport meta, title contains "JASON"
3. **CDN Dependencies** — verify no CDN deps needed (or test any that exist)
4. **Four-Screen Architecture** — upload-screen, loading-screen, error-screen, component-view, drop-zone, file input with accept=".json"
5. **JASON Branding** — title text, subtitle text, logo element, CSS animations, `--jason-glow` variable
6. **Loading Pipeline** — step-read, step-parse, step-render with correct labels
7. **GitHub Dark Theme CSS Variables** — `test.each` over all 11 standard variables
8. **JSON-Specific Features** — tree view container, raw view toggle, search input, path breadcrumb
9. **JavaScript Engine** — IIFE `const JASON`, public API (deploy, reset), `const $` helper, `JSON.parse` usage, clipboard API
10. **Event Wiring** — DOMContentLoaded, file input change, drag events (dragover, dragleave, drop), onclick handlers
11. **Responsive Design** — 768px/480px breakpoints, clamp/min usage
12. **Error Handling** — error container, retry button, showError function reference
13. **Back Navigation** — `.back-link` element, href="index.html", arrow + text, fixed position, z-index
14. **Universal Back-Link Validation** — add JASON.html to the test.each array (tests ALL tools together)
15. **docs/index.html Integration** — link to JASON.html, title, description, badge

**Critical file to reference:**
- `/home/user/Possibility/js_tests/marker.test.js` — template (504 lines, 15 suites)

**Commit:** "Add jason.test.js with full test suite"

---

### Step 4: Update `js_tests/marker.test.js` universal back-link validation

Add `JASON.html` to the `test.each` array in the "Universal Back-Link Validation" suite (suite 14) that tests all HTML tools together.

**Commit:** "Add JASON.html to universal back-link validation in marker.test.js"

---

### Step 5: Update `docs/index.html` — Add Live Card

Add a JASON card to the Interactive Tools section (`.cards` grid inside the first `.section`), right after the MARKER card. Must follow the exact same schema as the other 5 live tools — relative `href` pointing to `JASON.html` (which lives in the same `docs/` directory and deploys to GitHub Pages automatically), `badge live` class for the green "Live" badge:

```html
<div class="card">
    <span class="badge live">Live</span>
    <h3><a href="JASON.html">JASON</a></h3>
    <p>JSON Explorer. Upload any .json file and navigate its structure as a collapsible tree with search, path tracking, and syntax highlighting.</p>
</div>
```

This gives JASON a live clickable link on the GitHub Pages site (`https://<user>.github.io/Possibility/JASON.html`) identical to how REACTOR, MARKER, and the other tools work.

**Critical file:** `/home/user/Possibility/docs/index.html` (line ~201, after MARKER card, before closing `</div>` of `.cards`)

**Commit:** "Add JASON live card to docs/index.html Interactive Tools"

---

### Step 6: Update `README.md`

Add JASON.html subsection to the HTML Files section (after MARKER.html, before periodic-table-of-meaning.html), following the exact format of existing tool entries:
- Description paragraph
- "How it works" numbered steps
- Features bullet list
- Tech details

**Critical file:** `/home/user/Possibility/README.md` (lines 215-351 = HTML Files section)

**Commit:** "Add JASON.html documentation to README.md"

---

### Step 7: Update `CLAUDE.md`

- Add `JASON.html` to the Directory Layout under `HTML Files/`
- Add `JASON.html` to `docs/` listing
- Add `jason.test.js` to `js_tests/` listing
- Update test count if changed

**Critical file:** `/home/user/Possibility/CLAUDE.md`

**Commit:** "Update CLAUDE.md with JASON.html references"

---

### Step 8: Run full test suite and fix any breaks

```bash
npm run test:all
```

Fix any failures. If test counts changed, update CLAUDE.md and README.md accordingly.

**Commit (if fixes needed):** "Fix test suite issues for JASON.html integration"

---

## Files Modified

| Action | File |
|--------|------|
| **Create** | `HTML Files/JASON.html` |
| **Create** | `docs/JASON.html` |
| **Create** | `js_tests/jason.test.js` |
| **Edit** | `js_tests/marker.test.js` (add to universal back-link array) |
| **Edit** | `docs/index.html` (add card) |
| **Edit** | `README.md` (add tool section) |
| **Edit** | `CLAUDE.md` (directory layout + test counts) |

## Verification
1. `npm run test:all` passes with all tests (662 + new jason.test.js tests)
2. `HTML Files/JASON.html` and `docs/JASON.html` are byte-identical
3. JASON.html opens in browser: drag a `.json` file, see tree view, toggle raw view, search works
4. `docs/index.html` shows JASON card
5. README.md has JASON section in correct location
6. CLAUDE.md directory layout is accurate
