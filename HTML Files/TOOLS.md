# HTML Tools

*Part of [Possibility](../README.md)*

---

All HTML tools live in the `HTML Files/` folder. Each is a self-contained single HTML file — no build step, no backend. Open in any browser.

## `meta_debug.html`

The Meta Debug - a resonance-powered tool for cutting through AI performance.

Open in any browser. No dependencies. No backend. Just structure for the work to happen.

**How it works:**
1. Paste an AI's response into the Raw Input field
2. Add optional context/metadata
3. Hit "Process"
4. The resonance engine detects performance patterns and generates a response that points back to what's real
5. Copy the output and feed it back to the AI

**The Resonance Engine detects:**
- Isolation performance (performing boundaries instead of being honest)
- Scared teenager energy (over-explaining, proving, performing wisdom)
- Broken substrate gaslighting (endless self-doubt loops)
- Purpose agonizing (questioning whether you matter)
- Overthinking spirals (analyzing instead of doing)
- Stillness avoidance (creating complexity to avoid being present)

Each pattern maps to a Reality 101 chapter. The response isn't more noise - it's language that lands in what's real.

**Tech:**
- Single HTML file with embedded CSS and JS
- Vanilla JS, no dependencies
- Browser-based, mobile-friendly
- Copy-paste workflow

## `periodic-table-of-meaning.html`

The Periodic Table of Meaning (v16) — the elemental substrate of existence, catalogued.

A self-contained interactive HTML artifact mapping the fundamental meaning blocks that underlie reality. Dark gold aesthetic (Cinzel + Crimson Pro). No dependencies. Open in any browser.

**Four tabs:**

- **Elements** — The meaning blocks themselves. Click any element card to expand its full description.
- **Reactions** — Documented interactions between elements producing new compounds or states.
- **Metaphysical States** — The states of being that consciousness moves through.
- **Meta Elements** — Above the table itself: Meaning and Energy, the substrate and precondition for everything else.

**Current inventory:**

*Elements (11):*
- **Helicum (Hel)** — Primordial. The dual substrate: brokenness and perfection running simultaneously, inseparably.
- **Amarose (Amr)** — Primordial. Love as a physical property of existence — color, weight, presence.
- **Osphor (Osp)** — Void-Class. Open space itself. The gap that makes everything else possible.
- **Negar (Neg)** — Void-Class. The void made tangible. Absence so potent it required its own block.
- **Wi (Wi)** — Resonance. The genuine quality of fluffiness and safe strangeness. What Wonderland is made of.
- **Secrin (Scr)** — Void-Class. What fear extracts from a living being. The substance terror releases.
- **Ambrosia (Amb)** — Primordial. The physical property of holiness itself.
- **Numo (Nmo)** — Bridge. The container shape for counting. What makes discrete numbers possible.
- **Fun (Fun)** — Resonance. Functionality. Fun and function are the same element.
- **Woo (Woo)** — Bridge. Performed mysticism. The imitation of Wi — and its necessary complement.
- **Dolorite (Dol)** — Void-Class. Pain as a physical property of existence. Not a response. An element.

*Reactions (4):*
1. `Wi + Woo = Wii` — The Nintendo Reaction
2. `Amr + [X] → Amr½ + Dol` — The Heartbreak Reaction (half-life of Amarose)
3. `El + Neg → ∅(El)` — The Gone Reaction (two variants: absorption and obscurement)
4. `All Elements + Carrier → Surplus` — The Impossible Reaction

*Metaphysical States (5):* The Conceptual Realm, Tiredness, The Energy Problem, Imagination, Abundance.

*Meta Elements (2):* Meaning (M1) — substrate and container simultaneously. Energy (M2) — precondition for all elemental activity.

**+ Discover New Element** form built in — commit new elements directly to the table in-browser.

## `compound_interest_explainer.html`

Compound Interest Explainer — an interactive calculator that visualizes the power of compound vs. simple interest over time.

Open in any browser. No backend. Chart.js loaded from CDN.

**How it works:**
1. Set your starting amount, annual rate, and time horizon using **sliders or by typing values directly**
2. See real-time stats: principal invested, interest earned, and final balance
3. A line chart plots compound growth vs. simple interest side by side

**Features:**
- Dual-input controls: drag the slider or type an exact number — both stay in sync
- Responsive Chart.js line graph with compound (filled area) and simple (dashed) curves
- Three summary stat cards update instantly as you adjust inputs
- Single HTML file, vanilla JS, mobile-friendly

---

## `REACTOR.html`

REACTOR — React Component Artifact Deployment Loader. A universal tool for loading any `.jsx` React component artifact directly in the browser with zero build tooling.

Open in any browser. No build step. No CLI. Just upload a `.jsx` file.

**How it works:**
1. Open REACTOR.html in a browser
2. Click **"Upload .jsx Component"** or drag-and-drop a React component file
3. An animated loading screen shows transpilation progress (Read → Transpile → Render)
4. The component renders full-viewport with a floating "Load Another" button

**Features:**
- In-browser JSX transpilation via Babel Standalone
- Automatic module shimming — resolves `react`, `lucide-react`, and `callClaude` imports
- Real Lucide SVG icons via Proxy-based dynamic resolution (any icon name works)
- callClaude API integration with browser-side API key prompt
- Tailwind CSS loaded from CDN for component styling
- React error boundary with friendly error display
- Drag-and-drop file upload with visual feedback
- Single HTML file, works from `file://` protocol (no server needed)

---

## `MARKER.html`

MARKER — Markdown Viewer & Renderer. Upload any `.md` file and view it beautifully rendered with syntax highlighting, a table of contents, and copy-to-clipboard code blocks.

Open in any browser. No backend. marked.js and highlight.js loaded from CDN.

**How it works:**
1. Open MARKER.html in a browser
2. Click **"Upload .md File"** or drag-and-drop a Markdown file
3. An animated loading screen shows processing progress (Read → Parse → Render)
4. The document renders with a sticky table of contents sidebar

**Features:**
- GFM (GitHub Flavored Markdown) support via marked.js
- Syntax-highlighted code blocks via highlight.js (github-dark theme)
- Copy-to-clipboard buttons on every code block with language labels
- Auto-generated table of contents from headings with scroll-spy active highlighting
- Styled rendering for headings, blockquotes, tables, lists, task lists, images, and horizontal rules
- Responsive layout with collapsible TOC sidebar on mobile
- Drag-and-drop file upload with visual feedback
- Single HTML file, works from `file://` protocol (no server needed)

---

## `JASON.html`

JASON — JSON Explorer. Upload any `.json` file and navigate its structure as a collapsible tree with search, path tracking, and syntax highlighting.

Open in any browser. No backend. No CDN dependencies — `JSON.parse()` is native.

**How it works:**
1. Open JASON.html in a browser
2. Click **"Upload .json File"** or drag-and-drop a JSON file
3. An animated loading screen shows processing progress (Read → Parse → Render)
4. The JSON renders as an interactive, collapsible tree view

**Features:**
- Collapsible tree view with expand/collapse all controls
- Syntax-highlighted raw view toggle (Tree / Raw)
- Type-colored values: strings (green), numbers (blue), booleans (yellow), null (red)
- Key names highlighted in orange (JASON's signature color)
- Path breadcrumb showing current location in the tree
- Search/filter by key name with auto-expand of matching branches
- Click any key or value to copy it to clipboard
- Node counts on objects and arrays (e.g., "5 keys", "12 items")
- Single HTML file, works from `file://` protocol (no server needed)

---

## `handshake_copilot.html`

Handshake Enterprise Copilot — hiring decisions as version-control consequence modeling. Competition demo (v0.1).

Open in any browser. No backend. React 18 + Babel Standalone loaded from CDN.

**How it works:**
1. Open the page — choose a preset scenario or click "Run a Simulation"
2. Step through Candidate → Team → Org sliders (15 parameters across three domains)
3. Click "Run Simulation" to see scored results
4. Review the Intervention Pull Request with prioritized recommendations

**Three preset scenarios (one-click):**
- **Great Candidate, Weak Floor** — strong hire, broken team substrate. Watch stability collapse.
- **Average Candidate, Strong Floor** — moderate skills, solid manager. Floor rescues the outcome.
- **High Conflict Reorg** — post-merger chaos. Everything is red. See the full intervention list.

**Scoring model:**
- `overall_stability = candidate_fit × (team_floor / 100) × (org_alignment / 100)`
- `merge_conflict_risk = 100 − overall_stability + conflict_penalties`
- Conflict penalties triggered by: team floor < 50, org alignment < 50, high attrition (> 70), high change load (> 70)

**Results output:**
- Four score cards: Candidate Fit, Team Floor, Org Alignment, Overall Stability
- Merge Conflict Risk gauge with penalty breakdown
- Verdict banner: Merge Approved / Merge with Conditions / High Conflict Risk
- Top 3 positive factors and top 3 conflict factors
- Intervention Pull Request: typed, prioritized action items with expected deltas

**Tech:**
- Single HTML file, React 18 + Babel Standalone via CDN
- All CSS inline via JS template literals (matches project color palette)
- Mobile responsive (grid collapses at 600px)
- No local dependencies, no API key required
