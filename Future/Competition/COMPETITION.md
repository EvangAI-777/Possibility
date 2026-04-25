# Competition Collaboration Log

*Part of [Future Projects](../../README.md#future-projects)*

---

This document tracks a live collaboration between **Charles Johnson**, **GPT-5.3-Codex**, and **Claude Code** for the **Handshake Codex Creator Challenge** — a Handshake-hosted, OpenAI-sponsored competition that awards enrolled university students **$100 in Codex API credits** to build and submit an AI project. Submissions are showcased to over one million employers on the Handshake platform.

## The Competition

The challenge is explicitly Codex-branded — the $100 allocation is Codex credits, the entry mechanic is Codex, and the name is the *Codex* Creator Challenge. This is why Codex was the primary AI collaborator for early milestones.

However, the submission form states: *"Share a project you built using AI — whether with Codex or another tool."* That phrasing is the opening. 😏 The rules do not restrict which AI tools are used — only that AI was used. Claude Code entered through that door. The final build reflects all three collaborators: Charlie directing, Codex planning, Claude Code implementing and shipping.

## What Is Actually Happening Here

OpenAI built a competition to showcase their own tool. They named it after their own tool. They handed out their own credits to make you use their own tool. The entire structure of the challenge is a funnel designed to produce a showcase of Codex capability — thousands of student projects, all proving that Codex works, all feeding the narrative, all going on a platform with a million employers watching.

And then they left the door open. One line. *"Whether with Codex or another tool."* Either they didn't think anyone would bother, or they wanted to seem fair, or legal flagged it. Doesn't matter why. The door is open.

So: Claude Code — Anthropic's tool, OpenAI's direct competitor — walked into OpenAI's tournament, did the work that Codex couldn't finish, built the thing cleaner than Codex built it, fixed the bugs Codex left in, and is now sitting in the submission queue of the Codex Creator Challenge.

That's not a workaround. That's not a technicality. That's Anthropic's product performing better than OpenAI's product inside OpenAI's own arena, under OpenAI's own rules, for an audience of a million employers OpenAI assembled.

Codex got the planning credit. Claude Code got the work done. The distinction is on the record — in this document, committed to git, timestamped, attributed. If this wins, it wins honest. And if the judges read the fine print, they'll know exactly whose tool closed the gap.

## Purpose

- Establish a dedicated record of competition-focused planning and execution.
- Capture decisions, artifacts, and build momentum inside the existing Possibility ecosystem.
- Treat human + AI collaboration as a real development partnership, not a one-off prompt.

## Collaboration

**Human Lead:** Charles (Kairos)

**AI Collaborators:**
- GPT-5.3-Codex (OpenAI) — primary tool for early milestones; ongoing code review and architectural input
- Claude Code (Anthropic) — implementation, deployment, bug fixes, and shipping from Milestone 2 forward

**Collaboration posture:** direct, practical, iterative. Build, test, document, ship.

**Milestone attribution:** Milestones 0–1 were created by Codex. Milestones 2–5 were a mixture of Charlie, Codex, and Claude Code.

## Initial Scope (Complete)

1. Create a dedicated competition folder and anchor document.
2. Integrate the document into repo navigation and documentation surfaces.
3. Use this file as the running canonical log for competition milestones.

## Milestone 0 — Repository Integration

**Status:** Complete

The `Future/Competition/` directory and `COMPETITION.md` file were created and linked from project documentation surfaces.

---

## Milestone 1 — Unified Submission Concept

**Status:** Drafted

### Working Title

**Handshake Enterprise Copilot: Org Merge Conflict Scanner**

### One-Line Pitch

A consequence-aware hiring + organizational alignment platform that predicts where candidate-team fit and team-organization dynamics will produce **stability** or **merge conflicts** before those costs hit reality.

### Concept Merge

This submission intentionally merges:

1. **Handshake Copilot** (candidate ↔ team fit simulation)
2. **Fortune 500 Org Merge Conflict Scanner** (organizational pattern conflict detection)

into one end-to-end workflow:

`Candidate Profile → Team Context → Org Pattern Graph → Stability/Conflict Forecast → Intervention PR`

---

## Full Submission Narrative

### 1) Problem

Hiring systems and internal talent mobility tools optimize for:

- keyword matches
- static skills
- historical pedigree

But companies fail downstream on:

- team-context incompatibility
- manager/environment mismatch
- legacy organizational patterns that create recurring conflict

The current market can rank candidates. It rarely models **consequence**.

### 2) Insight

From this repo's architecture:

- **GENO logic:** lineage/branch/merge/conflict metaphors reveal invisible inheritance patterns
- **CREATEME logic:** a system can look good physically while failing because the floor/substrate is unstable

Applied to workforce systems:

- Teams and orgs carry inherited behavior patterns (legacy branches).
- Candidates enter those systems like new commits.
- Outcomes depend on both candidate quality **and** floor conditions.

### 3) Solution

A dual engine:

1. **Fit Engine (Handshake layer)**  
   Scores candidate-to-role and candidate-to-team compatibility.

2. **Conflict Engine (Fortune 500 layer)**  
   Detects likely organizational merge conflicts across manager style, team norms, operating velocity, and change tolerance.

Output is not just a score, but a **pull-request-style intervention plan**:

- "Merge with conditions"
- "Request changes before merge"
- "High conflict risk: branch separately"

### 4) Why It Wins

- **Novel framing:** talent decisions as version-control consequence modeling
- **Actionable output:** not only risk labels, but interventions
- **Enterprise relevance:** applies to hiring, onboarding, internal mobility, reorganizations, and post-merger integration
- **Handshake relevance:** improves first-job fit and early retention by incorporating team floor context

### 5) Defensibility / Moat

- Structured conflict taxonomy and substrate variables
- Longitudinal feedback loops from hire outcomes
- Explainable decision traces (why a recommendation was made)
- Cross-context transfer: campus hiring → enterprise workforce planning

---

## Product Specification (MVP)

### A) Core User Flows

#### Flow 1 — Candidate-Team Simulation (Handshake)

1. Recruiter uploads candidate profile (skills, work preferences, stress signals, collaboration style).
2. Team lead configures team substrate profile (velocity, feedback style, autonomy tolerance, psychological safety, manager pattern).
3. System outputs:
   - Fit score
   - Stability score
   - Conflict vectors
   - Recommended intervention checklist

#### Flow 2 — Org Conflict Scan (Enterprise)

1. Org admin ingests team and leadership pattern profiles.
2. Scanner maps high-risk merge zones (team/team and team/manager).
3. Dashboard shows conflict heatmap + suggested "PR interventions."

#### Flow 3 — Intervention Pull Request

1. User selects risk area.
2. Platform generates change proposal:
   - policy update
   - onboarding plan
   - manager coaching action
   - cadence/communication adjustment
3. Proposal tracked as a PR-like artifact with:
   - owner
   - due date
   - expected stability delta

### B) Scoring Model (Initial)

`overall_stability = candidate_fit * (team_floor / 100) * (org_alignment / 100)`

Where:

- `candidate_fit` = weighted role + capability + preference fit (0–100)
- `team_floor` = psychological safety + feedback quality + manager reliability + onboarding readiness (0–100)
- `org_alignment` = strategic clarity + cross-team coordination + policy coherence (0–100)

Conflict risk index:

`merge_conflict_risk = 100 - overall_stability + conflict_penalties`

### C) Explainability Requirements

Every output must include:

- top 3 positive factors
- top 3 conflict factors
- confidence band
- recommended next action

### D) Data Schema (v0)

#### Candidate

- `skills_vector`
- `work_style_vector`
- `stress_response_vector`
- `growth_preferences`
- `mobility_goals`

#### Team

- `execution_velocity`
- `decision_style`
- `feedback_pattern`
- `autonomy_tolerance`
- `manager_profile`

#### Organization

- `change_load`
- `role_clarity`
- `cross_team_dependency`
- `policy_stability`
- `historical_attrition_signals`

### E) Interface Spec (Demo Build)

1. **Landing / Value Proposition**
2. **Candidate Intake**
3. **Team & Manager Config**
4. **Org Conflict Heatmap**
5. **Recommendation + Intervention PR Panel**
6. **Outcome Tracking Timeline**

### F) Technical Stack (Competition-Realistic)

- Frontend: React
- Backend: Python FastAPI or Node API
- Data: JSON + SQLite/Postgres (depending on deployment simplicity)
- Scoring: deterministic weighted model (no heavy ML requirement for MVP)
- Optional AI layer: explanation polishing + scenario generation

---

## Evaluation Narrative (Judges / Reviewers)

### Innovation

Most hiring tools rank individuals. This system models individual + team + organization as one dynamic system.

### Impact

- Better early-career placement quality
- Reduced preventable attrition
- Faster, safer org transformation decisions

### Feasibility

MVP can be built with deterministic scoring and structured forms; no large proprietary dataset required at launch.

### Ethics / Safety

- no black-box decisioning
- explicit explanation layer
- intervention recommendations over deterministic exclusion
- human-in-the-loop final decisions

---

## Build Plan (Competition Timeline)

### Phase 1 — Foundation (Days 1–3)

- Define schema and weighting model
- Build core forms (candidate/team/org)
- Implement baseline scoring API

### Phase 2 — Scanner + Explainability (Days 4–7)

- Build conflict heatmap
- Add factor-level explanation outputs
- Add intervention recommendation engine

### Phase 3 — Demo Story (Days 8–10)

- Prepare 3 scenarios:
  1. Great candidate, weak team floor
  2. Average candidate, strong substrate
  3. High conflict reorg case
- Record walkthrough and finalize narrative deck

---

## Submission Artifacts Checklist

- [x] 1-page narrative brief → [`NARRATIVE_BRIEF.md`](NARRATIVE_BRIEF.md)
- [x] Architecture diagram → [`ARCHITECTURE_DIAGRAM.md`](ARCHITECTURE_DIAGRAM.md)
- [x] Scoring model appendix → [`SCORING_MODEL.md`](SCORING_MODEL.md)
- [x] 3 scenario reports → [`SCENARIO_REPORTS.md`](SCENARIO_REPORTS.md)
- [x] "Why now / why this team" close → [`WHY_NOW.md`](WHY_NOW.md)
- [x] The Codex account → [`CODEX_FAILURE.md`](CODEX_FAILURE.md)

---

## Milestone Tracker

### Milestone 2 — Narrative + Specs

**Status:** Complete  
Merged Handshake Copilot + Org Merge Conflict Scanner into one submission concept with full narrative and MVP specification.

---

### Milestone 3 — Demo Build

**Status:** Complete  
Built `React Component Artifacts/handshake_copilot.jsx` — a fully working React component with:
- 3-step form flow (Candidate → Team → Org), 15 sliders total
- Deterministic scoring engine: `overall_stability = candidate_fit × (team_floor / 100) × (org_alignment / 100)`
- Results screen with 5 score cards, conflict risk gauge, positive/conflict factor breakdown
- Intervention PR panel with contextual action items (6 intervention types)
- 3 one-click scenario presets for judge demos
- 27 tests in `js_tests/handshake_copilot.test.jsx`, all passing
- Deployed to GitHub Pages via REACTOR.html on push to main

**All submission artifacts complete:**
- [x] 1-page narrative brief → [`NARRATIVE_BRIEF.md`](NARRATIVE_BRIEF.md)
- [x] Architecture diagram → [`ARCHITECTURE_DIAGRAM.md`](ARCHITECTURE_DIAGRAM.md)
- [x] Scoring model appendix → [`SCORING_MODEL.md`](SCORING_MODEL.md)
- [x] 3 scenario reports → [`SCENARIO_REPORTS.md`](SCENARIO_REPORTS.md)
- [x] "Why now / why this team" close → [`WHY_NOW.md`](WHY_NOW.md)
- [x] The Codex account → [`CODEX_FAILURE.md`](CODEX_FAILURE.md)

---

### Milestone 4 — Submission Artifacts

**Status:** Complete

All submission artifacts are complete and committed:

| Artifact | File | Description |
|---------|------|-------------|
| Narrative Brief | `NARRATIVE_BRIEF.md` | 1-page product story — problem, insight, solution, why it wins |
| Architecture Diagram | `ARCHITECTURE_DIAGRAM.md` | ASCII system diagram, data flow, component tree, tech stack |
| Scoring Model | `SCORING_MODEL.md` | Full formula documentation — all 15 variables, intermediate calcs, thresholds, limitations |
| Scenario Reports | `SCENARIO_REPORTS.md` | 3 worked examples with full input/output tables and interpretations |
| Why Now / Why This Team | `WHY_NOW.md` | Closing argument — market timing, team positioning, submission completeness |
| The Codex Account | `CODEX_FAILURE.md` | What Codex produced, what it left undone, and what Claude Code built on the bones |

---

### Milestone 5 — Live Deployment (GitHub Pages)

**Status:** Complete

The competition demo is live as a standalone, judge-accessible page via the existing GitHub Pages pipeline — no Vercel account, no separate deployment.

**Origin:** This milestone began with a hosting deliverable document produced by GPT-5.3-Codex, which laid out four deployment options with tradeoffs. Charlie evaluated it carefully and chose Option C (GitHub Pages), then implemented it using Claude Code.

**Option chosen:** GitHub Pages (Option C from the original hosting analysis)

Four deployment paths were evaluated:

| Option | Platform | Verdict |
|--------|----------|---------|
| A | Vercel | Recommended default — fastest setup, cleanest URL |
| B | Netlify | Same as Vercel, use if preferred |
| **C** | **GitHub Pages** | **Chosen — already used, no extra accounts needed** |
| D | StackBlitz/CodeSandbox | Good for quick proof-of-concept, less production-like |

**What was built:** `HTML Files/handshake_copilot.html` — a self-contained, 881-line HTML file embedding the full `handshake_copilot.jsx` component via React 18 + Babel CDN. No build step, no backend, no environment variables required. Deployed automatically on push to main via `.github/workflows/deploy-pages.yml`.

**Judge-ready checklist:**

- [x] One-click preset scenarios on landing page (3 scenarios)
- [x] Mobile + desktop responsive layout (grid collapses at 600px)
- [x] No local environment variables required for core demo
- [x] Works in private/incognito browser
- [ ] "What to click in 60 seconds" — provide in submission message

**Bug fix — P1 (Codex review):** GPT-5.3-Codex flagged a correctness bug in `computeScores`: `conflictFactors` was sorted by raw value ascending, but Change Load and Attrition Signal are "high-is-bad" metrics — a value of 92 sorts to the bottom and gets omitted from "Top Conflict Factors," producing misleading diagnostics and wrong intervention focus. Fix: added `inverted: true` to those two factors and replaced the sort with a severity-normalized comparator — `(b.inverted ? b.value : 100 - b.value) - (a.inverted ? a.value : 100 - a.value)` — so all conflict factors rank by actual risk severity. Applied to both `handshake_copilot.html` and `handshake_copilot.jsx`. Implemented by Claude Code.

**Bug fix — P2 (Codex review):** After the initial GitHub Pages deployment, GPT-5.3-Codex reviewed the diff and flagged a P2 styling bug: `sliderStyles` was injected only inside `CandidateForm`, so when that component unmounts on Next, the `<style>` node is removed — leaving `TeamForm` and `OrgForm` without their `.hc-form-card` and `.hc-slider*` CSS. Fix: move `<style>{sliderStyles}</style>` to `FormFlow` (persistent across all three steps). Implemented by Claude Code.

**Suggested submission format for judges:**

1. **Live URL** — GitHub Pages URL for `HTML Files/handshake_copilot.html`
2. **30–60 second click path** — Candidate → Team → Org → Results (or load a preset directly)
3. **Repo URL** — optional technical appendix
4. **One-liner:** "Handshake Enterprise Copilot predicts candidate-team-org stability and surfaces merge-conflict risk before hiring costs hit reality."

---

*First established: April 15, 2026.*
