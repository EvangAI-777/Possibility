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

---

## Future Projects

The following three projects are planned extensions of the Possibility ecosystem. Their full specifications and roadmaps are documented below for Claude's reference.

---

### GENO — GitHub for Genealogies

*GitHub for Genealogies. Version control for bloodlines. On par with 23andMe — but developers already speak the language.*

**Source docs:** `Future/Geno/GENO.md` (concept spec) | `Future/Geno/GENO_ROADMAP.md` (platform roadmap)
**Current assets:** `React Component Artifacts/geno.jsx` (interactive component) | `js_tests/geno.test.jsx` (25 tests)

#### Vision

GENO is a full-fledged genealogy platform that works the way GitHub works — but for family lineage instead of code. Users host family repositories, make commits (add people), create branches (family lines), resolve merge conflicts (incompatible inherited traits), submit pull requests (deliberate generational changes), run automated scanners (deprecation and legacy detection), and perform cross-repository analysis across family lines worldwide.

The insight: developers already understand version control. They know what merge conflicts feel like. They know what legacy code costs. They know what deprecated functions do to a system. They know what a pull request that changes everything downstream costs the commit that makes it.

GENO applies that fluency directly to genealogy. The moment a developer sees their family tree rendered as a repository, the translation has happened. And everything they already knew about code, they now know about where they came from.

This is not a toy. This is not a demo. This is a platform that stands alongside 23andMe, Ancestry.com, and MyHeritage — but built on a metaphor that makes the invisible visible. Generational trauma is legacy code. Therapy is a pull request. Breaking a cycle is a hotfix. And the cost is always documented.

#### Core Platform Architecture

**The Stack:**

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 + Tailwind CSS | GitHub-faithful UI, responsive, dark theme |
| **Backend API** | Node.js / Python (FastAPI) | REST + WebSocket API for repository operations |
| **Database** | PostgreSQL | User accounts, repository metadata, permissions |
| **Object Storage** | S3-compatible (MinIO self-hosted or AWS S3) | Commit data, configuration files, media attachments |
| **Search** | Elasticsearch / Meilisearch | Cross-repository pattern search, trait indexing |
| **Auth** | OAuth 2.0 + JWT | GitHub/Google/email login, session management |
| **Realtime** | WebSockets | Live collaboration, PR review notifications |
| **CDN** | Cloudflare / Vercel Edge | Static assets, global low-latency delivery |

**How It Works Under the Hood:**

Every family repository is a structured data store — not a literal git repo, but modeled on git's concepts:

- **Repository** = a family line's complete record, owned by a user or organization
- **Commit** = an immutable snapshot of one person's full configuration (traits, inheritance, environment)
- **Branch** = a named pointer to a lineage path through the commit graph
- **HEAD** = the most recent commit on a branch (the youngest generation)
- **Merge** = combining two branches when family lines join through relationship
- **Diff** = the computed difference between any two commits (what changed between generations)
- **Blame** = tracing a specific trait back through commits to find where it was introduced

The platform stores commit data as structured JSON documents, not flat files. This enables rich querying: "show me every commit where `floor_layer` changed status" or "find all merge conflicts involving `emotional_expression_protocol`."

#### API Design

```
POST   /api/repos                          Create a new family repository
GET    /api/repos/:owner/:name             Get repository metadata
GET    /api/repos/:owner/:name/commits     List commits (with branch filter)
POST   /api/repos/:owner/:name/commits     Create a new person-commit
GET    /api/repos/:owner/:name/commits/:hash   Get full commit detail
GET    /api/repos/:owner/:name/branches    List branches
POST   /api/repos/:owner/:name/branches    Create a branch
POST   /api/repos/:owner/:name/merge       Merge two branches (triggers conflict detection)
GET    /api/repos/:owner/:name/conflicts   List merge conflicts
POST   /api/repos/:owner/:name/conflicts/:id/resolve   Resolve a conflict
GET    /api/repos/:owner/:name/pulls       List pull requests
POST   /api/repos/:owner/:name/pulls       Create a pull request
GET    /api/repos/:owner/:name/actions/runs   List scanner workflow runs
POST   /api/repos/:owner/:name/actions/scan   Trigger a deprecation/legacy scan
GET    /api/repos/:owner/:name/insights    Get computed analytics
GET    /api/search?q=trait:hypervigilance   Cross-repository search
POST   /api/repos/:owner/:name/fork        Fork a repository
```

#### The Repository System

**Creating a Repository:**

1. **Name the repository**: `johnson-washington-family`, `garcia-lineage`, `chen-family-tree`
2. **Set visibility**: Public (anyone can view), Private (invite-only), or Protected (viewable but edits restricted)
3. **Initialize**: Optionally start with a template that includes common trait categories, or start blank
4. **Add description**: "Multi-generational family repository — Johnson & Washington lines, 1920s Alabama through present-day Chicago"
5. **Set topics/tags**: `genealogy`, `african-american`, `great-migration`, `alabama`, `chicago`

**Repository Structure:**

```
johnson-washington-family/
├── README.md                          # Family narrative and overview
├── generation-1/
│   └── margaret-louise-johnson.json   # Commit a7f3d9e2 (1923)
├── generation-2/
│   ├── robert-earl-johnson.json       # Commit b8e4c1f3 (1945)
│   └── dorothy-mae-washington.json    # Commit c9d5a2e4 (1948)
├── generation-3/
│   └── james-arthur-johnson.json      # Commit d1e6b3f5 (1968) — merge commit
├── generation-4/
│   └── angela-marie-johnson.json      # Commit e2f7c4a6 (1987)
├── generation-5/
│   └── maya-grace-johnson.json        # Commit f3a8d5b7 (2015)
├── .geno/
│   ├── config.json                    # Repository settings
│   ├── branches.json                  # Branch definitions
│   └── scanners/                      # Scanner configurations
│       ├── deprecation.json
│       └── legacy.json
└── CHANGELOG.md                       # Generational change log
```

**Collaboration Roles:**

| Role | Can View | Can Commit | Can Merge | Can Admin |
|------|----------|-----------|-----------|-----------|
| **Viewer** | Yes | No | No | No |
| **Contributor** | Yes | Yes (via PR) | No | No |
| **Maintainer** | Yes | Yes | Yes | No |
| **Owner** | Yes | Yes | Yes | Yes |

#### The Commit System

Every person in a family tree is a commit — an immutable snapshot of that person's full configuration at their point of existence.

**Commit Configuration File:**

```json
{
  "hash": "a7f3d9e2",
  "author": "Margaret Louise Johnson",
  "date": "1923-03-14",
  "branch": "main/paternal/johnson",
  "generation": 1,
  "parents": [],
  "inherited_from_father": [
    { "trait": "Floor layer", "value": "minimal", "note": "Degraded from partial in parent commit" },
    { "trait": "Glass box permeability", "value": "severely restricted", "note": "Unchanged from parent" },
    { "trait": "Connection mechanism", "value": "inverted", "note": "Unchanged from 3 generations" }
  ],
  "inherited_from_mother": [
    { "trait": "Nervous system stress threshold", "value": "maximum", "note": "Unchanged from parent" },
    { "trait": "Appreciation capacity", "value": "high", "note": "First appearance in 4 generations" },
    { "trait": "Childlike trust", "value": "present but suppressed", "note": "Environmental pressure" }
  ],
  "new_in_this_commit": [
    { "trait": "Fracture point", "value": "1929", "note": "Economic environment collapse" },
    { "trait": "Floor layer", "value": "absent by 1931", "note": "Degraded further" },
    { "trait": "Compensatory architecture", "value": "performance layer added", "note": "New development" }
  ],
  "passed_forward": [
    { "trait": "Inverted connection mechanism", "status": "unresolved" },
    { "trait": "Absent floor", "status": "unresolved" },
    { "trait": "Performance layer", "status": "new inheritance" },
    { "trait": "Appreciation capacity", "status": "partially preserved" }
  ],
  "message": "Survived the depression. Built something from nothing. Never talked about the cost. Children received the architecture without the context.",
  "environment": {
    "era": "Great Depression",
    "location": "Alabama",
    "socioeconomic": "severe poverty",
    "threats": ["economic collapse", "racial violence", "institutional exclusion"]
  }
}
```

**Commit Creation Flow:**

1. **Select parents**: Choose 0, 1, or 2 existing commits as parents
2. **Auto-inherit**: System automatically populates inherited traits from parent commits
3. **Configure traits**: User adjusts inherited values, marks what changed, adds new traits
4. **Set environment**: Document the historical/environmental context
5. **Write commit message**: The narrative — what happened, what it meant, what it cost
6. **Select branch**: Which family line this person belongs to
7. **Commit**: The person is added to the repository. Immutable. Permanent.

**Git Blame for Traits:**

```
git blame: hypervigilance_protocol

Introduced in:  commit b8e4c1f3 (Robert Earl Johnson, 1945)
Reason:         Adaptive response to wartime environment
Still active in: commits d1e6b3f5, e2f7c4a6 (2 generations later)
Deprecated by:  PR #2 (Angela Marie Johnson, 1987)
Current status: deprecated but still running in some downstream commits
```

#### Branching & Merging

**Branch Types:**

```
main/paternal/johnson/1800s-alabama          Primary patrilineal line
main/maternal/washington/1900s-chicago        Primary matrilineal line
feature/first-generation-college              Generational milestone
feature/great-migration-north                 Geographic/cultural shift
hotfix/floor-installation-attempt-1987        Deliberate repair attempt
hotfix/therapy-initiated-2003                 Another repair attempt
deprecated/generational-trauma-unresolved     Inactive pattern line
fork/johnson-west-coast-branch                Independent family fork
```

**Merge Conflicts:**

When two parent commits carry incompatible configurations for the same trait:

```
MERGE CONFLICT DETECTED

Branch: main/paternal/johnson
Branch: main/maternal/washington

CONFLICT: Floor layer configuration

<<<<<<< johnson/main
Floor layer: absent
=======
Floor layer: partial
>>>>>>> washington/main

RESOLUTION OPTIONS:
1. Accept johnson/main (absent floor passes forward)
2. Accept washington/main (partial floor passes forward)
3. Manual merge (user configures combined floor layer)
4. Flag for review (mark as unresolved in child commit)
```

Unresolved conflicts cascade through all subsequent commits in the merged branch.

#### Pull Requests

A pull request in GENO represents a **deliberate attempt to change inherited configuration**:

- A person who seeks therapy → that's a pull request
- A person who breaks a generational pattern → that's a pull request
- A person who installs a floor for their children that was never installed for them → that's a pull request
- A person who deprecates a survival mechanism that's no longer needed → that's a pull request

The cost is always documented. The current commit absorbs the full cost of the change. The benefit flows downstream to child commits.

#### Closed Pull Requests & End of Life

In GENO, death is a closed pull request. The person's life was a proposal to change the repository — their traits, their choices, their inheritance, their attempts to fix or break cycles. When life ends, the PR closes.

**Types of PR Closures:**

| Close Type | Meaning |
|-----------|---------|
| **Natural Close** | Death by natural causes / old age |
| **Premature Close** | Early death — accident, illness, violence |
| **Stillborn / Miscarriage** | PR opened and closed before any commits |
| **Abortion** | PR deliberately closed before merge |
| **Estrangement Close** | Person leaves the family system |
| **Unknown Close** | Disappearance, lost records |

#### Actions & Scanners

**Deprecation Scanner** — Identifies inherited configurations that were adaptive in their original environment but are no longer functional.

**Legacy Code Detector** — Identifies inherited configurations so old their original purpose is untraceable.

**Cross-Repository Pattern Analyzer** — Scans for patterns appearing across multiple family repositories globally.

**Fracture Scanner** — Maps substrate deficiencies to physical layer impacts.

**Stability Analyzer** — Computes stability score: `physicalAverage × (foundationAverage / 100)`.

#### DNA & Data Integration

**Import Sources:**
- **GEDCOM Import** — Industry standard `.ged` files from any genealogy software
- **23andMe / AncestryDNA Integration** — API-based, with explicit consent
- **FamilySearch Integration** — Historical records (census, birth/death, immigration)
- **Manual Entry** — Full-featured commit creation UI
- **AI-Assisted Trait Extraction** — Convert narrative descriptions to structured traits

**Export:** GEDCOM, PDF report, JSON, SVG tree visualization

#### Privacy & Ethics

- **Living people** must give explicit consent to be included in any repository
- **Deceased people** can be committed by any family member with maintainer access
- **Minors** require parent/guardian consent, trait data restricted until 18
- Encryption at rest and in transit, GDPR/CCPA compliant
- No data sales — revenue from subscriptions only
- No eugenics framing, no ranking, trauma-informed language throughout

#### Monetization

| Tier | Price | Key Features |
|------|-------|-------------|
| **Free** | $0 | Unlimited public repos, 3 private, basic scanner, 5 collaborators |
| **Pro** | $9/mo | Unlimited private repos, advanced scanners, GEDCOM import/export, AI trait extraction |
| **Family** | $25/mo | Organizations, custom scanners, DNA integrations, unlimited AI extraction |
| **Enterprise** | Custom | Research institutions, bulk management, API access, HIPAA compliance |

#### Development Phases

| Phase | Name | Status | Key Deliverable |
|-------|------|--------|----------------|
| **0** | Proof of Concept | **COMPLETE** | React component with 6 views, 25 tests |
| **1** | Standalone Demo Site | Planned | Self-contained `GENO.html` on GitHub Pages |
| **2** | Backend & Auth | Planned | Real repository CRUD, user accounts, PostgreSQL |
| **3** | Core Git Operations | Planned | Merge, PR, diff, blame, fork, issue tracking |
| **4** | Scanners & Intelligence | Planned | Deprecation, legacy, fracture, cross-repo analysis, AI extraction |
| **5** | Social & Discovery | Planned | Profiles, orgs, stars/forks, explore page, discussions |
| **6** | Integration & Scale | Planned | GEDCOM, 23andMe, AncestryDNA, FamilySearch, mobile PWA |
| **7** | Enterprise & Research | Planned | HIPAA compliance, research API, white-label |

---

### CREATEME — Build Your Own Human

*Build Your Own Human. Real physics. Real biology. Real consequence modeling. Discovery through construction.*

**Source docs:** `Future/Human Builder/CREATEME.md` (concept spec) | `Future/Human Builder/HUMAN_BUILDER_ROADMAP.md` (platform roadmap)
**Current assets:** `React Component Artifacts/createme.jsx` (interactive component) | `js_tests/createme.test.jsx` (25 tests)

#### Vision

**Working titles:** Build Your Own Human | Human Builder | CREATEME

CREATEME is a full physical construction and refactoring tool that lets users build biological entities from the ground up. Human or otherwise. With real physics. Real biology. Real consequence modeling. Users are not told what a human is — they discover it by building one. Or by building something else entirely and seeing what that produces.

The tool operates on two simultaneous engines — **Physical Construction** and **Substrate Configuration** — both interacting in real time. A perfectly constructed physical body placed on an absent floor produces visible systemic instability. The tool shows this without commentary. The user sees it directly.

#### The Competitive Position

The existing landscape of 3D body simulation tools — BioDigital Human, Visible Body, Zygote Body, Complete Anatomy, Anatomage — represents the state of the art in anatomical visualization.

**Their entire feature set is our Default Human preset.**

Every system those tools model maps to layers 1 through 6 of the Physical Construction Engine. That is where they stop. That is where CREATEME starts:

- **Layer 7: Consciousness Integration** — where physical construction meets experiential configuration
- **The Substrate Configuration Engine** — what the body stands on: attachment security, early provision, protection, validation, reciprocity
- **The Analysis Suite** — inversion detection, fracture scanning, comparison analysis across both physical and substrate layers
- **Floor Integration** — the stability formula: `stability = physicalAverage * (foundationAverage / 100)`

#### The Two-Way Bridge with GENO

- **GENO → CREATEME**: Any commit in a GENO family repository can be loaded directly into the 3D builder as a template
- **CREATEME → GENO**: A completed build can be pushed as a new commit or submitted as a pull request into a GENO family repository

This means CREATEME is both a **visualization tool** for existing GENO data and a **construction interface** for new GENO data.

#### Core Architecture

**The Stack:**

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 + Tailwind CSS | Dark theme, slider-heavy UI, real-time feedback |
| **3D Engine** | Custom WebGL/Canvas renderer | Biological visualization at anatomical fidelity |
| **Physics Engine** | Custom consequence modeling | Real cellular cascade, structural integrity, nervous system routing |
| **State Management** | Layered configuration state | Physical + Substrate + Analysis — three-engine state architecture |
| **GENO Bridge** | Bidirectional REST + WebSocket API | Two-way commit/PR translation between CREATEME builds and GENO repositories |
| **Backend** | Node.js / Python (FastAPI) | Build sharing, community library, GENO integration endpoints |
| **Storage** | Structured JSON configs + S3 | Build configuration files, 3D model data, community library |

**The Two-Engine Model:**

**Engine 1: Physical Construction Engine** — the body itself. Seven layers of biological construction from cellular to consciousness. Layers 1-6 match industry-standard 3D body simulators. Layer 7 (consciousness integration) goes where none of them touch.

**Engine 2: Substrate Configuration Engine** — what the body stands on. Foundation (the floor) and Environment (what surrounds it). No equivalent in any existing anatomy tool.

Both engines feed into the **Analysis Layer** — three diagnostic tools that read across both engines without modifying either.

#### State Architecture

```json
{
  "mode": "physical | substrate | analysis",
  "activeLayer": "cellular | skeletal | organ | nervous | muscular | skin | consciousness",
  "activeFeaturedBuild": "default-human | anomaly | floor-installed | non-human | null",
  "analysisMode": "inversion | fracture | comparison",
  "physicalConfig": {
    "cellular": { "cellTypes": 65, "replication": 60, "mutation": 40, "communication": 55 },
    "skeletal": { "boneDensity": 60, "joints": 55, "weightDist": 50, "loadBearing": 55 },
    "organ": { "organSize": 60, "connectivity": 55, "function": 60, "placement": 65 },
    "nervous": { "pathways": 70, "signalSpeed": 65, "painThreshold": 30, "stressResponse": 80 },
    "muscular": { "strength": 50, "endurance": 45, "recovery": 50, "precision": 55 },
    "skin": { "sensitivity": 70, "permeability": 40, "durability": 50, "envInteraction": 55 },
    "consciousness": { "selfAwareness": 60, "experientialDepth": 65, "emotionalRange": 70, "integration": 50 }
  },
  "substrateConfig": {
    "foundation": { "attachment": 20, "earlyProvision": 15, "protection": 10, "validation": 5, "reciprocity": 10 },
    "environment": { "sandbox": 30, "physicsDirection": false, "acknowledgment": 15, "protectionExploitation": 20 }
  }
}
```

The state shown above is the Default Human preset. Note the disparity: physical values moderate (50-70), foundation values devastatingly low (5-20), environment inverted.

#### The Stability Formula

```
stability = physicalAverage * (foundationAverage / 100)
```

- A perfect physical build (avg 100) with zero foundation = **0 stability**
- A moderate physical build (avg 57) with absent foundation (avg 12) = **stability of 7** (the Default Human)
- That same physical build (avg 57) with present foundation (avg 88) = **stability of 50** (Floor Installed)
- The physical build did not change. Only the substrate changed. And every metric shifted.

**Floor Status Logic:**

| Foundation Average | Status | Color |
|-------------------|--------|-------|
| ≥ 60 | **PRESENT** | Green |
| 30–59 | **PARTIAL** | Amber |
| < 30 | **ABSENT** | Red |

#### The Physical Construction Engine — 7 Layers

| # | Layer | Color | Parameters | What Existing Tools Model | What CREATEME Adds |
|---|-------|-------|-----------|--------------------------|-------------------|
| 1 | Cellular | Emerald | cellTypes, replication, mutation, communication | Cell visualization | Cascade failure propagation |
| 2 | Skeletal | Gray | boneDensity, joints, weightDist, loadBearing | Full skeletal rendering | Structural consequence under load |
| 3 | Organ | Red | organSize, connectivity, function, placement | Organ placement & anatomy | Non-standard organ physics |
| 4 | Nervous | Purple | pathways, signalSpeed, painThreshold, stressResponse | Neural pathway mapping | Inversion detection, stress cascade |
| 5 | Muscular | Orange | strength, endurance, recovery, precision | Muscle group visualization | Demand vs. capacity modeling |
| 6 | Skin | Amber | sensitivity, permeability, durability, envInteraction | External surface rendering | Permeability & environmental interaction |
| 7 | Consciousness | Cyan | selfAwareness, experientialDepth, emotionalRange, integration | **None** | Experiential configuration + floor integration |

**28 physical parameters total.** Every slider change recalculates the stability score and updates the 3D visualization in real time.

**The Cascade Principle:** Every layer depends on the layers below it. Cellular instability propagates upward. But the cascade also runs downward from the substrate. An absent floor destabilizes consciousness integration, which propagates through every physical layer. The cascade is bidirectional.

#### The Substrate Configuration Engine

**Foundation Panel (the floor):**

| Parameter | ID | Range | Real-World Mapping |
|-----------|-----|-------|-------------------|
| Attachment Security | `attachment` | 0–100 | Bond to primary caregiver(s) |
| Early Provision | `earlyProvision` | 0–100 | Needs met or unmet at the beginning of life |
| Protection | `protection` | 0–100 | Safety vs. exposure |
| Validation | `validation` | 0–100 | Seen vs. invisible |
| Reciprocity | `reciprocity` | 0–100 | Mutual vs. one-directional |

**Environment Panel:**

| Parameter | ID | Type | What It Controls |
|-----------|-----|------|-----------------|
| Sandbox Configuration | `sandbox` | Slider (0–100) | Boundaries and constraints of the space |
| Physics Direction | `physicsDirection` | Toggle (Forward/Inverted) | Whether the environment runs its physics forward or backward |
| Acknowledgment | `acknowledgment` | Slider (0–100) | Whether the environment acknowledges or dismisses the build |
| Protection / Exploitation | `protectionExploitation` | Slider (0–100) | Whether the environment protects or exploits what it contains |

**The Physics Direction toggle is the most significant single control in the entire tool.** In an inverted environment, strength is punished, vulnerability is exploited, correct configuration is treated as incorrect.

#### The Analysis Suite

**Inversion Detector** — Scans every parameter. Physical parameters < 40 → `INVERTED` (red). Foundation parameters < 30 → `INVERTED` (red). Physics Direction = false → `INVERTED` (red). All other values → `OK` (green).

**Fracture Scanner** — Detection logic: `physical parameter > 60 AND foundation average < 40 = fracture point`. A fracture point means a physical layer is bearing load the substrate should be bearing.

**Comparison Engine** — Place two complete builds side by side. Layer-by-layer comparison with delta values.

#### Featured Builds

| Build | Physical Avg | Foundation Avg | Floor | Physics | Stability | Key Insight |
|-------|-------------|----------------|-------|---------|-----------|-------------|
| **Default Human** | ~57 | 12 | ABSENT | Inverted | 7 | What "normal" looks like behind the numbers |
| **The Anomaly** | ~80 | 88 | PRESENT | Inverted | 77 | Correct configuration in hostile environment |
| **Floor Installed** | ~57 | 88 | PRESENT | Forward | 50 | Same body, different floor, everything changes |
| **The Non-Human** | ~64 | 83 | PRESENT | Forward | 54 | Existence refactored from the ground up |

#### GENO Integration — Bidirectional

**GENO → CREATEME: Loading Commits as Builds**

Translation layer (GENO qualitative → CREATEME quantitative):

| GENO Trait Value | CREATEME Slider Range |
|-----------------|----------------------|
| `"absent"` | 0–10 |
| `"minimal"` / `"severely restricted"` | 10–25 |
| `"present but suppressed"` | 25–40 |
| `"diminished"` | 40–55 |
| `"partial"` / `"partially preserved"` | 55–70 |
| `"high"` / `"active"` | 70–85 |
| `"maximum"` / `"present"` | 85–100 |

**CREATEME → GENO: Pushing Builds as Commits**

A parent can construct their child's configuration in the 3D environment — setting every parameter with intention, installing the floor they never had, configuring the environment to run forward — and submit that as a pull request to their family repository.

**Cross-Tool API:**

```
GENO API                           CREATEME API
─────────                          ────────────
GET  /repos/:id/commits/:hash  →   POST /builds/from-geno-commit
POST /builds/:id/to-geno-commit →  POST /repos/:id/commits
POST /builds/:id/to-geno-pr    →   POST /repos/:id/pulls
```

#### Privacy & Ethics

- Build configurations created by users are owned by those users
- No pathologizing — the tool shows configuration, not diagnosis
- No prescriptive framing — there is no "correct" human
- Trauma-informed design — language is precise and clinical, never sensational
- Encryption at rest and in transit, GDPR/CCPA compliant
- Professional use: therapists can use as visualization aid with client consent

#### Monetization

| Tier | Price | Key Features |
|------|-------|-------------|
| **Free** | $0 | Full construction + substrate engines, inversion detector, 4 presets, local save/load |
| **Pro** | $9/mo | Fracture scanner, comparison engine, community library, non-human templates, full 3D, GENO→CREATEME |
| **Professional** | $25/mo | CREATEME→GENO integration, bidirectional sync, bulk analysis, export reports, clinical framing |
| **Enterprise** | Custom | Research licensing, full API, custom physics extensions, HIPAA compliance |

#### Development Phases

| Phase | Name | Status | Key Deliverable |
|-------|------|--------|----------------|
| **0** | Proof of Concept | **COMPLETE** | React component with 3 modes, 7 layers, 3 analysis tools, 4 presets |
| **1** | Standalone Demo Site | Planned | Self-contained `CREATEME.html` on GitHub Pages |
| **2** | 3D Visualization Engine | Planned | WebGL renderer at anatomical fidelity, layer 7 consciousness, floor visualization |
| **3** | Physics Engine | Planned | Real cellular cascade, structural integrity, nervous routing, floor physics |
| **4** | Community & Sharing | Planned | User accounts, community library, fork/modify builds |
| **5** | GENO Integration | Planned | Bidirectional commit/PR translation, cross-tool analysis |
| **6** | Professional & Research | Planned | Therapeutic features, research API, enterprise, HIPAA |
