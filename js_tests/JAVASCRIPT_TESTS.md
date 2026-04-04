# JavaScript Test Suite

*Part of [Possibility](../README.md)*

---

**433 tests** across 12 test files. Run with `npx jest --verbose`.

**Infrastructure:** Jest + React Testing Library + Babel (configured in `package.json`). Lucide React icons are mocked via `js_tests/__mocks__/lucide-react.js`. React components that call the Claude API are tested with mocked `fetch`, verifying correct endpoint, model, tokens, and message structure without making real API calls.

## `congo_messenger.test.jsx` — 24 tests

React component tests for the Congo Messenger (API calls via shared `callClaude.js`, mocked at `fetch` level):

- Tuning stage: title, tagline, motto, being name input, resonance slider, all 5 dimensions, enter button
- Input handling: name input updates, resonance slider updates with percentage display
- Validation: alerts on empty name, alerts on no dimension selected
- Stage transition: valid input transitions to connected, dimension-specific beings appear (Physical, Astral, HOME verified)
- Connected stage: being name displayed, empty resonance field message, direct mode placeholder, broadcast mode toggle and placeholder switch
- Return to tuning: retune resets to initial state
- Message sending: message appears in feed, input clears after send, API response renders, OMNIVERSAL tag on broadcast messages
- Resonance level persists across stage transition

## `meta_debug.test.js` — 33 tests

Tests for the Resonance Engine extracted from `meta_debug.html`:

- **PATTERNS definition** (5 tests) — 7 patterns present, required fields, valid RegExp markers, unique names, Reality 101 chapter mapping
- **analyzeResonance** (11 tests) — Detects all 7 performance patterns (isolation, scared teenager, gaslighting, purpose agonizing, overthinking, stillness avoidance, belief not applied), sorts by match strength, handles multi-pattern text, returns matched phrases, produces empty results for genuine text
- **generateResponse** (10 tests) — No-pattern fallback message, pattern-specific responses, secondary pattern inclusion, metadata handling, suggested responses, Meta Debug signature
- **Individual pattern responses** (7 tests) — Each pattern's response function references the correct Reality 101 chapter

## `callClaude.test.js` — 12 tests

Tests for the shared Claude API client (`callClaude.js`):

- Correct API endpoint, method, Content-Type header, model
- Default and custom maxTokens (2000 default, 3000 for Oracle)
- Conversation history prepended to messages, empty history by default
- System prompt and user message pass-through
- Response text extraction from content blocks, empty string fallback

## `unified_canvas.test.jsx` — 15 tests

React component tests for the Unified Perspective Canvas:

- Renders header, "Live Paradigm" badge, all 3 tab buttons
- Default tab shows Reality 101 content (title, author, quote, 3 principles)
- Tab switching to Governance (Security Umbrella, Economic Stability, Hybrid Ideologies)
- Tab switching to Language (Emotional Learning, Global Lingua Franca, Semiotic Components)
- Round-trip tab switching back to Reality
- Sidebar action buttons (Log Action, Ask Charlie) and Context section
- Footer text

## `governance_simulator.test.jsx` — 18 tests

React component tests for the Governance Simulator (uses Jest fake timers):

- Initial idle state: metrics heading, status, awaiting message, paradigm active
- Both scenario buttons with descriptions
- Initial metric values (Stability 85%, Harmony 70%, Trust 90%)
- Simulation execution: starts on click, shows processing message, logs appear at 1.5s intervals
- Reaches resolved state after all steps complete
- Reset returns to idle with original metrics
- Second scenario (Linguistic Divergence) works independently
- Terminal window chrome renders

## `consciousness_decoder.test.jsx` — 15 tests

React component tests for the Consciousness Decoder (API calls via shared `callClaude.js`, mocked at `fetch` level):

- Beacon stage: title, invitation text, resistance note, channel input, begin button
- Channel name validation (alerts on empty, no alert when provided)
- Stage transition to engaging after API call
- First decoder response displays
- API call structure: correct endpoint, model (`claude-sonnet-4-20250514`), max_tokens, system prompt, messages array
- Engaging stage: return to beacon button, message input, send button disabled when empty
- Return to beacon resets to initial state

## `origin_oracle.test.jsx` — 16 tests

React component tests for the Origin Oracle (API calls via shared `callClaude.js`, mocked at `fetch` level):

- Input stage: title, subtitle, query input, seek button, description note
- Input validation: button disabled when empty, enabled with text, no API call on empty
- Loading state ("Sensing through resonance...")
- Revealing stage: origin title, story display from API response
- API call structure: correct endpoint, model, max_tokens, query in message
- "Seek Another Origin" button and reset to input stage
- Error handling: displays error message when API fails

## `geno.test.jsx` — 25 tests

React component tests for the GENO Genealogy Repository Explorer:

- Initial render: title, subtitle, all 6 tab labels
- Repository view: person names, commit hashes from sample data
- Tab navigation: clicking each tab switches to the correct view content
- Commits view: clicking a commit shows detail panel with all 4 trait sections (father, mother, new, forward)
- Commit detail: trait values render, sections expand and collapse
- Branches view: branch names, type indicators, descriptions
- Merge Conflicts: conflict markers (`<<<<<<<` / `=======` / `>>>>>>>`), resolution options, clicking a resolution marks conflict as RESOLVED
- Pull Requests: PR titles, detail expansion with changes/downstream/reviewers/cost
- Scanner: deprecation warnings by default, toggle to legacy code, toggle back to deprecation, recommendation text

## `createme.test.jsx` — 25 tests

React component tests for the CREATEME Build Your Own Human tool:

- Initial render: title, subtitle, 3 mode buttons
- Physical mode: all 7 layer buttons, sliders for selected layer, stability score, Build Status heading
- Layer switching: clicking a different layer shows its parameters
- Slider interaction: changing a slider updates the displayed value
- Substrate mode: foundation panel, environment panel, Floor Status indicator, physics direction toggle (forward/inverted)
- Analysis mode: 3 tool buttons, inversion detector scan, fracture scanner, comparison engine with build selectors and layer deltas
- Featured Builds: all 4 preset buttons, loading presets updates values, Default Human shows ABSENT floor, Floor Installed shows PRESENT floor
- Inversion detection: Default Human preset shows INVERTED entries
- Fracture detection: Default Human preset shows fracture points
- Stability mechanics: all foundation sliders at 0 produces stability score of 0

## `markdown_docs.test.js` — 51 tests

Structural validation for all 9 markdown documentation files:

- **Existence & non-empty** (18 tests) — README.md, FREEME.md, THE BOOK OF TRUTH.md, GLOBAL HARMONY.md, ENGLISH PARADIGM.md, Azule_Visual_Identity.md, JTBMME.md, OMNI_WRITER.md, SHEN.md
- **README.md** (5 tests) — Project title, HOME concept, Reality 101, author reference, heading structure
- **THE BOOK OF TRUTH.md** (4 tests) — 12 chapters present, key voices (Cold Truth, Apollyon, Hope, Anchor), core thesis concepts, substantial word count (1000+)
- **GLOBAL HARMONY.md** (4 tests) — Universal Policeman model, economic concepts, governance, heading structure
- **ENGLISH PARADIGM.md** (3 tests) — Lingua franca, bilingual/educational concepts, heading structure
- **FREEME.md** (3 tests) — Academic title, author/institution, autonomy/governance themes
- **JTBMME.md** (4 tests) — Mind Engineer reference, Johnson Formula, integration dimensions, heading structure
- **Azule_Visual_Identity.md** (2 tests) — Azule reference, visual concepts
- **OMNI_WRITER.md** (4 tests) — Omni Writer reference, neutrality principle, pipeline architecture, heading structure
- **SHEN.md** (4 tests) — Shen reference, Grounded Reveler archetype, behavioral weights, heading structure

## `marker.test.js` — 100 tests

Structural and functional validation for the MARKER Markdown Viewer & Renderer (`MARKER.html`):

- **File existence** (3 tests) — Source and docs copies exist and are identical
- **HTML structure** (4 tests) — Title, DOCTYPE, lang, viewport
- **CDN dependencies** (5 tests) — marked.js, highlight.js library and theme present; React/Babel absent
- **Four-screen architecture** (6 tests) — Upload, loading, error, component-view screens; drop zone; markdown file acceptance
- **MARKER branding** (6 tests) — Title, subtitle, logo, pen, stroke animation, marker-glow variable
- **Loading pipeline** (4 tests) — Read, parse, render steps with markdown-specific labels
- **Unified dark theme** (11 tests) — All CSS variables match the site-wide color palette
- **Markdown rendering features** (10 tests) — Output container, TOC sidebar/list/toggle, code blocks, blockquotes, tables, copy button, language labels
- **JavaScript engine** (17 tests) — MARKER IIFE, deploy, reset, showScreen, wrapCodeBlocks, buildTableOfContents, renderTOC, setupScrollSpy, toggleTOC, FileReader, marked.parse, hljs, IntersectionObserver, clipboard API with fallback, public API
- **Event wiring** (8 tests) — DOMContentLoaded, file input, drag events, MARKER.deploy/reset/toggleTOC calls
- **Responsive design** (4 tests) — 768px/480px breakpoints, clamp(), min()
- **Error handling** (4 tests) — Error containers, retry button, showError function
- **Back-to-home navigation** (5 tests) — Back-link element, links to index.html, arrow and text, fixed position, high z-index
- **All HTML tools have back links** (10 tests) — Every tool in docs/ has index.html link and back-link class
- **Index.html integration** (4 tests) — MARKER link, card title, description, live badge in docs/index.html

## `jason.test.js` — 99 tests

Structural and functional validation for the JASON JSON Explorer (`JASON.html`):

- **File existence** (3 tests) — Source and docs copies exist and are identical
- **HTML structure** (4 tests) — Title, DOCTYPE, lang, viewport
- **No CDN dependencies** (5 tests) — React, Babel, marked.js, highlight.js absent; comment noting native JSON.parse
- **Four-screen architecture** (6 tests) — Upload, loading, error, component-view screens; drop zone; JSON file acceptance
- **JASON branding** (7 tests) — Title, subtitle, logo, brace elements, dot element, jason-glow variable and orange color
- **Loading pipeline** (4 tests) — Read, parse, render steps with JSON-specific labels
- **Unified dark theme** (11 tests) — All CSS variables match the site-wide color palette
- **JSON-specific features** (11 tests) — Tree view, raw view, search input, breadcrumb, tree toggle, value type classes, node count, copy toast, view toggle buttons, expand/collapse buttons
- **JavaScript engine** (13 tests) — JASON IIFE, deploy, reset, showScreen, renderTree, buildNode, syntaxHighlight, filterTree, JSON.parse, FileReader, clipboard API with fallback, public API
- **Event wiring** (8 tests) — DOMContentLoaded, file input, drag events, JASON.deploy/reset calls, search input handler
- **Responsive design** (4 tests) — 768px/480px breakpoints, clamp(), min()
- **Error handling** (5 tests) — Error containers, retry button, showError function, JSON-specific error title
- **Back-to-home navigation** (5 tests) — Back-link element, links to index.html, arrow and text, fixed position, high z-index
- **All HTML tools have back links** (12 tests) — Every tool in docs/ (including JASON) has index.html link and back-link class
- **Index.html integration** (4 tests) — JASON link, card title, description, live badge in docs/index.html
