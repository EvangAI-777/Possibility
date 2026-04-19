# Handshake Enterprise Copilot
## Architecture Diagram

*Competition Submission — Charles H. Johnson, III*

---

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                     HANDSHAKE ENTERPRISE COPILOT                    │
│                    React 18 · No backend required                   │
└─────────────────────────────────────────────────────────────────────┘

                              USER ENTRY
                                  │
               ┌──────────────────┼──────────────────┐
               │                  │                  │
          Run Sim            Preset 1           Preset 2/3
         (3-step form)    (Weak Floor)        (Strong Floor /
               │                  │             High Conflict)
               │                  └──────────────────┐
               │                                     │
               ▼                                     ▼
┌──────────────────────────────┐      ┌──────────────────────────────┐
│        INPUT LAYER           │      │       PRESET LOADER          │
│                              │      │                              │
│  Step 1: Candidate Profile   │      │  Pre-configured data objects │
│  ├─ Skills & Capabilities    │      │  bypass form and inject      │
│  ├─ Work Style Fit           │      │  directly into scoring       │
│  ├─ Stress Response          │      │  engine state                │
│  ├─ Growth Preferences       │      └──────────────┬───────────────┘
│  └─ Mobility Goals           │                     │
│                              │                     │
│  Step 2: Team & Manager      │                     │
│  ├─ Execution Velocity       │                     │
│  ├─ Decision Style           │                     │
│  ├─ Feedback Quality         │                     │
│  ├─ Autonomy Tolerance       │                     │
│  └─ Manager Reliability      │                     │
│                              │                     │
│  Step 3: Org Profile         │                     │
│  ├─ Change Load (↑ = risk)   │                     │
│  ├─ Role Clarity             │                     │
│  ├─ Cross-Team Dependency    │                     │
│  ├─ Policy Stability         │                     │
│  └─ Attrition Signal (↑=risk)│                     │
└──────────────┬───────────────┘                     │
               │                                     │
               └─────────────────┬───────────────────┘
                                 │
                                 ▼
┌────────────────────────────────────────────────────────────────────┐
│                        SCORING ENGINE                              │
│                    (Pure deterministic JS)                         │
│                                                                    │
│  candidateFit   = avg(candidate sliders)                           │
│                                                                    │
│  teamFloor      = avg(team sliders)                                │
│                                                                    │
│  orgAlignment   = weighted_avg(org sliders)                        │
│                   roleClarity×1.4 + policyStability×1.2           │
│                 + (100−changeLoad)×0.9                             │
│                 + (100−crossTeamDep)×0.5                           │
│                 + (100−attritionSignal)×1.0                        │
│                   ÷ 5.0                                            │
│                                                                    │
│  overallStability = candidateFit × (teamFloor/100) × (orgAl/100)  │
│                                                                    │
│  conflictPenalties:                                                │
│    teamFloor < 30     → +15                                        │
│    teamFloor < 50     → +7                                         │
│    orgAlignment < 30  → +12                                        │
│    orgAlignment < 50  → +5                                         │
│    attrition > 70     → +8                                         │
│    changeLoad > 70    → +5                                         │
│                                                                    │
│  mergeConflictRisk = 100 − overallStability + conflictPenalties    │
│                   (clamped 0–100)                                  │
│                                                                    │
│  Factor Extraction:                                                │
│    positiveFactors = top 3 above-threshold parameters              │
│    conflictFactors = top 3 below-threshold parameters              │
│    confidence      = High / Moderate / Low (by stability band)     │
└──────────────────────────────┬─────────────────────────────────────┘
                               │
               ┌───────────────┼───────────────────┐
               │               │                   │
               ▼               ▼                   ▼
┌──────────────────┐  ┌─────────────────┐  ┌──────────────────────┐
│  SCORE DISPLAY   │  │ FACTOR BREAKDOWN │  │  INTERVENTION ENGINE │
│                  │  │                 │  │                      │
│ • Candidate Fit  │  │ Top 3 Positive  │  │ buildInterventions() │
│ • Team Floor     │  │ Top 3 Conflict  │  │                      │
│ • Org Alignment  │  │ with scores     │  │ Conditions checked:  │
│ • Stability      │  │ and domain tags │  │ • teamFloor < 50     │
│                  │  │                 │  │ • feedbackPattern<50 │
│ • Conflict Risk  │  │                 │  │ • orgAlignment < 50  │
│   gauge + delta  │  │                 │  │ • changeLoad > 65    │
│                  │  │                 │  │ • attrition > 65     │
│ Verdict banner:  │  │                 │  │ • stress+floor combo │
│ ✅ Merge Approved│  │                 │  │                      │
│ ⚠️  Conditions   │  │                 │  │ Output per item:     │
│ 🔴 High Conflict │  │                 │  │ • type label         │
└──────────────────┘  └─────────────────┘  │ • action title       │
                                           │ • description        │
                                           │ • expected delta     │
                                           │ • priority flag      │
                                           │                      │
                                           │ PR badge:            │
                                           │ Merge Approved       │
                                           │ Request Changes      │
                                           │ Branch Separately    │
                                           └──────────────────────┘
```

---

## Data Flow

```
User Input (15 sliders across 3 forms)
        │
        ▼
React useState — single nested object:
{
  candidate: { skills, workStyle, stressResponse, growthPreferences, mobilityGoals },
  team:      { velocity, decisionStyle, feedbackPattern, autonomyTolerance, managerProfile },
  org:       { changeLoad, roleClarity, crossTeamDependency, policyStability, attritionSignals }
}
        │
        ▼
computeScores(data) — pure function, no side effects
        │
        ▼
{ candidateFit, teamFloor, orgAlignment, overallStability,
  mergeConflictRisk, conflictPenalties, positiveFactors,
  conflictFactors, confidence }
        │
        ├──▶ Score cards + gauges (visual)
        ├──▶ Verdict banner (text + color)
        ├──▶ Factor grids (positive / conflict)
        └──▶ buildInterventions(scores, data) ──▶ PR panel
```

---

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| UI | React 18 | No TypeScript, no build step in browser |
| Styling | Inline CSS-in-JS string (`<style>`) | Unified color palette, no external CSS |
| State | React `useState` | Single nested object, prop-drilled |
| Scoring | Pure JS functions | `computeScores()`, `buildInterventions()` — no ML, no API |
| Testing | Jest + React Testing Library | 27 tests, 460 total in suite |
| Loading | REACTOR.html (Babel CDN) | Any JSX component loads without build step |
| Deployment | GitHub Pages via Actions | `actions/deploy-pages@v4`, deploys on push to main |

---

## Component Tree

```
HandshakeCopilot                    (root, manages step/formStep/data state)
├── Landing                         (formula display + CTA + preset buttons)
│   └── [PRESET_WEAK_FLOOR]         (one-click scenario loaders)
│   └── [PRESET_STRONG_FLOOR]
│   └── [PRESET_REORG]
├── FormFlow                        (routes between form steps 0/1/2)
│   ├── StepBar                     (visual step indicator, 4 steps)
│   ├── CandidateForm               (5 Slider components)
│   ├── TeamForm                    (5 Slider components)
│   └── OrgForm                     (5 Slider components)
│       └── Slider                  (reusable: label, hint, range, end labels)
└── Results                         (calls computeScores, renders everything)
    ├── Score cards × 5             (candidateFit, teamFloor, orgAlignment,
    │                                overallStability, mergeConflictRisk)
    ├── Verdict banner
    ├── Factor grids × 2            (positive + conflict)
    └── InterventionPanel           (calls buildInterventions, renders PR items)
```

---

## Scoring Formula — Visual

```
              candidateFit (0–100)
                     │
                     × (teamFloor / 100)
                     │
                     × (orgAlignment / 100)
                     │
                     ▼
             overallStability
                     │
    ┌────────────────┼────────────────────────┐
    │                │                        │
   ≥ 60           35–59                    < 35
    │                │                        │
✅ Merge        ⚠️  Merge              🔴 High
  Approved       w/ Conditions         Conflict
```

A perfect candidate (100) on a zero floor (0/100) = **stability of 0**.
The floor is the determining variable. That is the product insight.
