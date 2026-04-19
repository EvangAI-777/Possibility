# Competition Collaboration Log

*Part of [Future Projects](../OVERVIEW.md)*

---

This document tracks a live collaboration between **Charles Johnson** and **GPT-5.3-Codex** for an AI development competition funded with a **$100 school allocation**.

## Purpose

- Establish a dedicated record of competition-focused planning and execution.
- Capture decisions, artifacts, and build momentum inside the existing Possibility ecosystem.
- Treat human + AI collaboration as a real development partnership, not a one-off prompt.

## Collaboration

**Human Lead:** Charles (Kairos)

**AI Collaborator:** GPT-5.3-Codex (OpenAI)

**Collaboration posture:** direct, practical, iterative. Build, test, document, ship.

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

- [ ] 90-second product demo video
- [ ] 1-page narrative brief
- [ ] Architecture diagram
- [ ] Scoring model appendix
- [ ] 3 scenario reports
- [ ] "Why now / why this team" close

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

**Remaining submission artifacts:**
- [ ] 90-second product demo video
- [ ] 1-page narrative brief
- [ ] Architecture diagram
- [ ] Scoring model appendix
- [ ] 3 scenario reports
- [ ] "Why now / why this team" close

---

*First established: April 15, 2026.*
