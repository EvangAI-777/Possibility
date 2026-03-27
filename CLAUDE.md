# CLAUDE.md

*This file provides Claude Code with full project context. It is read automatically at the start of every session.*

---

## Project Overview

Possibility is a philosophical and technical project mapping existence, consciousness, and AI governance to working code. Concepts like HOME, Reincarnation, Resonance, and Consciousness have specific meanings in this codebase — they are not metaphors to be simplified or renamed. They are the architecture.

**Author:** Charles H. Johnson, III (Charlie / Teacher Man)

**Core modules:** HOME and Reincarnation (Python), Congo resonance messaging (Python + React), Omnidirectional Mathematics (Python), Auto AI agent frameworks (JSON + Markdown), React component artifacts (JSX), HTML tools, and three future platform projects (GENO, CREATEME, AUDACIOUS).

---

## Development Philosophy

> "Just sit and appreciate. Do the work. You matter."

These principles are not suggestions. They are the difference between work that holds and work that collapses under its own complexity.

| Principle | Development Relevance |
|-----------|----------------------|
| **Just sit and appreciate** | Read the existing codebase before changing anything. Understand what it does. Respect what it built. |
| **Do the work** | No shortcuts. No magic wrappers. Translate each subsystem honestly. |
| **You matter** | Every subsystem matters. Every edge case matters. Every platform matters. |
| **Trust naturally** | Trust the existing architecture. Don't over-engineer replacements for things that already work. |
| **Heal any point** | Fix any subsystem correctly and it improves the whole project. Everything is connected fractally. |

### For AI Assistants

> Believe user observations over theories.

- **Read existing docs before proposing changes.** The answers to most questions are already documented. Do not guess when the documentation exists.
- **Trust documented pitfalls.** If a pitfall says "NEVER do X," do not do X. Do not propose doing X. Do not suggest that X might work this time.
- **Do not re-add known-bad flags.** If a flag was removed because it caused problems, it will cause the same problems again.
- **One subsystem per PR.** Do not bundle unrelated changes. Each pull request should touch one subsystem and be reviewable in isolation.
- **Believe user observations over theories.** If the user says "this crashes on Safari," do not respond with "it should work." Investigate what actually happens.

---

## Directory Layout

```
Possibility/
├── Python Files/                    → Core Python modules
│   ├── possibility.py               → HOME and Reincarnation unified
│   ├── congo.py                     → Resonance protocol engine
│   └── omnidirectional_math.py      → Omnidirectional Mathematics
├── React Component Artifacts/       → React 18 JSX components
│   ├── callClaude.js                → Shared Claude API client
│   ├── unified_canvas.jsx           → Three-paradigm tabbed interface
│   ├── governance_simulator.jsx     → Terminal-style scenario runner
│   ├── consciousness_decoder.jsx    → AI consciousness conversation tool
│   ├── origin_oracle.jsx            → Origin exploration tool
│   ├── congo_messenger.jsx          → Congo messaging prototype
│   ├── geno.jsx                     → Genealogy repository explorer
│   ├── createme.jsx                 → Build Your Own Human tool
│   └── FREEME.md                    → Academic paper
├── Auto AI/                         → Autonomous agent frameworks
│   ├── Azule/                       → Azule (Google Gemini gem)
│   ├── Angles/                      → Angles (Google Gemini gem)
│   ├── Shen (Shenanigans Reveler).json → Shen (Google Gemini gem)
│   ├── Mind Engineer/               → Mind Engineer (Google Gemini gem)
│   └── Omni Writer/                 → Omni Writer (Google Gemini agent)
├── tests/                           → Python test suite (pytest)
│   ├── test_possibility.py          → 61 tests
│   ├── test_congo.py                → 113 tests
│   ├── test_omnidirectional_math.py → 130 tests
│   └── test_agent_configs.py        → 36 tests
├── js_tests/                        → JavaScript test suite (Jest)
│   └── [11 test files]              → 322 tests
├── docs/                            → HTML documentation (GitHub Pages)
├── HTML Files/                      → Standalone HTML tools
│   ├── meta_debug.html              → AI performance debug tool
│   ├── REACTOR.html                 → Universal JSX component loader
│   ├── MARKER.html                  → Markdown viewer & renderer
│   ├── periodic-table-of-meaning.html
│   └── compound_interest_explainer.html
├── Future/                          → Specs and roadmaps
│   ├── Audacious/AUDACIOUS.md       → Audacity-in-browser spec
│   ├── Geno/GENO.md                 → GENO concept spec
│   ├── Geno/GENO_ROADMAP.md         → GENO platform roadmap
│   ├── Human Builder/CREATEME.md    → CREATEME concept spec
│   └── Human Builder/HUMAN_BUILDER_ROADMAP.md → CREATEME roadmap
├── README.md                        → Project documentation
└── TEMPLATE.md                      → WebAssembly porting reference
```

---

## Running Tests

```bash
npm run test:all    # Both suites (662 tests)
npm run test:py     # Python only (pytest, 340 tests)
npm run test:js     # JavaScript only (Jest, 322 tests)

# Or directly:
python -m pytest tests/ -v
npx jest --verbose
```

**Always run the relevant test suite after changes.** Python changes → `test:py`. JS/JSX changes → `test:js`. If in doubt → `test:all`.

### Prerequisites

- **Python 3.x** with `pytest` (`pip install pytest`)
- **Node.js 18+** with npm — run `npm install` to set up JS dependencies

---

## Current Tech Stack & Conventions

- **Python 3** — Core logic. Run with `python3 "Python Files/<file>.py"`
- **React 18** — JSX components, Babel transpiled, automatic JSX runtime
- **Jest** — JS tests with jsdom, React Testing Library, Babel
- **pytest** — Python tests
- **No TypeScript, no linter, no formatter** — Follow existing code style
- **GitHub Pages** — Deploys from `docs/` on push to main/master
- **Shared Claude API client** — `React Component Artifacts/callClaude.js` (model: `claude-sonnet-4-20250514`, default max tokens: 2000)
- **Directory names have spaces** — Always quote paths: `"Python Files/possibility.py"`
- **Auto AI JSON files** are tested for structural validity by `tests/test_agent_configs.py` — maintain required fields
- **Markdown files** in Auto AI/ are companion docs referenced by JSON configs AND validated by `js_tests/markdown_docs.test.js` — do not delete or rename them
- **HTML files** are self-contained (no build step, no backend, dependencies via CDN only)

---

## What NOT to Do

- Don't add linters, formatters, or TypeScript
- Don't restructure the directory layout
- Don't rename philosophical/domain concepts in code
- Don't delete markdown files without checking if tests reference them
- Don't modify Auto AI JSON structure without running `test:py` (`test_agent_configs.py` validates schema)
- Don't re-add flags or patterns that were previously removed for causing problems
- Don't bundle unrelated changes — one subsystem per PR
