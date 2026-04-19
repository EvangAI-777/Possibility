# Handshake Enterprise Copilot
## Scenario Reports

*Competition Submission — Charles H. Johnson, III*

*Three preloaded demonstrations. Each maps to a real-world hiring pattern.*

---

## Scenario 1 — Great Candidate, Weak Floor

**Premise:** A high-performing candidate interviews well, scores strong across every dimension, and accepts an offer. On paper this is a win. Underneath the surface, the team has a history of poor feedback loops, an inconsistent manager, and almost no psychological safety infrastructure.

**The question this scenario answers:** *Can a strong candidate overcome a weak substrate?*

---

### Input Configuration

#### Candidate Profile
| Variable | Value | Interpretation |
|----------|-------|---------------|
| Skills & Capabilities | 88 | Expert-level, demonstrated competency |
| Work Style Fit | 75 | Moderately autonomous, adaptable |
| Stress Response | 70 | Performs well under pressure |
| Growth Preferences | 82 | Strong growth orientation |
| Mobility Goals | 65 | Open to advancement |
| **candidateFit** | **76** | Strong candidate — top quartile |

#### Team Profile (the floor)
| Variable | Value | Interpretation |
|----------|-------|---------------|
| Execution Velocity | 40 | Slow-moving, reactive team |
| Decision Style | 30 | Top-down authority, minimal input |
| Feedback Quality | 18 | Rare, unclear, non-actionable |
| Autonomy Tolerance | 20 | Closely supervised environment |
| Manager Reliability | 15 | Inconsistent, follow-through poor |
| **teamFloor** | **25** | Floor: **ABSENT** |

#### Org Profile
| Variable | Value | Interpretation |
|----------|-------|---------------|
| Change Load | 45 | Moderate change volume |
| Role Clarity | 60 | Reasonably well-defined scope |
| Cross-Team Dependency | 50 | Average dependency level |
| Policy Stability | 55 | Mostly stable HR/comp policies |
| Attrition Signal | 55 | Slightly elevated turnover |
| **orgAlignment** | **~49** | Below stability threshold |

---

### Output

```
candidateFit:       76
teamFloor:          25    ← ABSENT
orgAlignment:       49

overallStability:   round(76 × 0.25 × 0.49) = round(9.3) = 9

conflictPenalties:  teamFloor < 30  → +15
                    orgAlignment<50 → +5
                    attrition > 50  → 0
                    TOTAL: +20

mergeConflictRisk:  100 − 9 + 20 = 111 → clamped to 100
```

**Verdict: 🔴 High Conflict Risk**

| Score | Value |
|-------|-------|
| Overall Stability | 9 / 100 |
| Merge Conflict Risk | 100 / 100 |
| Confidence | Low |

---

### Intervention Pull Request

**Status: Branch Separately**

1. **Manager Coaching** *(High Priority)*
   Establish weekly structured 1:1 cadence before Day 1. Manager reliability scored at 15 — well below the minimum viable threshold. Without explicit structure, the candidate has no feedback mechanism.
   *Expected delta: +8–12 teamFloor*

2. **Onboarding Plan** *(High Priority)*
   Build written 30/60/90-day success criteria. Feedback quality at 18 means the candidate cannot self-calibrate without external scaffolding.
   *Expected delta: +5–8 teamFloor*

3. **Policy Update** *(High Priority)*
   Org alignment below threshold. Clarify role scope and decision authority before the offer is extended.
   *Expected delta: +10–15 orgAlignment*

4. **Role Adjustment** *(High Priority)*
   Candidate stress response (70) is strong, but this is insufficient compensation for a team floor at 25. Strong candidates placed on absent floors do not underperform slightly — they leave. Consider placing this candidate on a higher-floor team or delaying hire until floor conditions are corrected.

---

### Interpretation

This is the scenario the hiring market produces constantly. The candidate is genuinely strong. The team is genuinely broken. No amount of candidate quality rescues a zero-floor situation. `76 × 0.25 = 19` — the team floor cuts the effective candidate contribution by 75% before org conditions are even factored in.

The industry calls this "culture fit failure." This model calls it what it actually is: a substrate problem that was visible in the data and ignored.

---
---

## Scenario 2 — Average Candidate, Strong Floor

**Premise:** A moderately qualified candidate — no exceptional skill, no exceptional growth orientation — enters a team with a genuinely excellent manager, regular constructive feedback, and an organization with crystalline role clarity and stable policies.

**The question this scenario answers:** *How much does a strong floor compensate for a moderate candidate?*

---

### Input Configuration

#### Candidate Profile
| Variable | Value | Interpretation |
|----------|-------|---------------|
| Skills & Capabilities | 52 | Competent — not exceptional |
| Work Style Fit | 58 | Slight preference for structure |
| Stress Response | 48 | Moderate — needs some support |
| Growth Preferences | 55 | Moderate growth orientation |
| Mobility Goals | 50 | Content in current role |
| **candidateFit** | **53** | Average candidate — middle of the distribution |

#### Team Profile (the floor)
| Variable | Value | Interpretation |
|----------|-------|---------------|
| Execution Velocity | 72 | Fast, responsive team |
| Decision Style | 80 | Collaborative, candidate will have voice |
| Feedback Quality | 88 | Regular, specific, actionable feedback |
| Autonomy Tolerance | 82 | Candidate will be trusted |
| Manager Reliability | 90 | Highly reliable — consistent expectations |
| **teamFloor** | **82** | Floor: **PRESENT** |

#### Org Profile
| Variable | Value | Interpretation |
|----------|-------|---------------|
| Change Load | 25 | Stable environment — minimal disruption |
| Role Clarity | 85 | Scope and success metrics well-defined |
| Cross-Team Dependency | 35 | Mostly self-contained |
| Policy Stability | 80 | HR/comp policies consistent and trusted |
| Attrition Signal | 15 | Very low turnover — team retains people |
| **orgAlignment** | **~80** | Strong org conditions |

---

### Output

```
candidateFit:       53
teamFloor:          82    ← PRESENT
orgAlignment:       80

overallStability:   round(53 × 0.82 × 0.80) = round(34.8) = 35

conflictPenalties:  teamFloor ≥ 50  → 0
                    orgAlignment≥50 → 0
                    attrition ≤ 70  → 0
                    TOTAL: 0

mergeConflictRisk:  100 − 35 + 0 = 65
```

**Verdict: ⚠️ Merge with Conditions**

| Score | Value |
|-------|-------|
| Overall Stability | 35 / 100 |
| Merge Conflict Risk | 65 / 100 |
| Confidence | Low–Moderate |

---

### Interpretation

The floor is genuinely strong — 82. The org conditions are excellent — 80. The limiting factor is the candidate score of 53. Even with near-perfect environmental conditions, a moderate candidate can only produce moderate outcomes: `53 × 0.82 × 0.80 = 35`.

This is the honest finding this scenario is designed to demonstrate: **a strong floor is necessary but not sufficient.** It dramatically increases the ceiling for what a moderate candidate can achieve, and it reduces conflict risk to zero penalty signals — but it cannot manufacture capability that isn't there.

What changes is the trajectory. A moderate candidate on this floor will grow. A moderate candidate on Scenario 1's floor will plateau or leave. The floor determines the direction of travel, not the starting position.

**The decision here is not "don't hire" — it is "hire with expectation calibration."** The candidate's 35 stability will improve over time as the team floor continues to develop their capabilities. The intervention recommendation is standard onboarding, not structural repair.

---

### Intervention Pull Request

**Status: ⚠️ Merge with Conditions**

1. **Standard Onboarding** *(No Critical Interventions)*
   Stability scores are solid across the team and org dimensions. The candidate score is the constraint, not the environment. Proceed with standard onboarding and focus on growth path clarity — this candidate will respond well to explicit development conversation given the team's feedback quality.

---
---

## Scenario 3 — High Conflict Reorg

**Premise:** Two teams have been merged post-acquisition. A new hire is being placed into the combined team. The org is in active restructuring: role definitions are unclear, change load is extreme, attrition is spiking, and the manager is navigating their own reporting uncertainty.

**The question this scenario answers:** *What does the system show when organizational conditions are the primary failure mode — not the candidate?*

---

### Input Configuration

#### Candidate Profile
| Variable | Value | Interpretation |
|----------|-------|---------------|
| Skills & Capabilities | 65 | Solid skills — above average |
| Work Style Fit | 60 | Reasonably adaptable |
| Stress Response | 45 | Moderate — needs some support |
| Growth Preferences | 50 | Balanced |
| Mobility Goals | 70 | Open to change |
| **candidateFit** | **58** | Good candidate — above midpoint |

#### Team Profile
| Variable | Value | Interpretation |
|----------|-------|---------------|
| Execution Velocity | 55 | Mixed — two teams' cultures mid-merge |
| Decision Style | 35 | Authority lines unclear post-reorg |
| Feedback Quality | 28 | Feedback cadence disrupted |
| Autonomy Tolerance | 40 | Manager cannot delegate while navigating upward |
| Manager Reliability | 30 | Manager's own role is uncertain |
| **teamFloor** | **38** | Floor: **PARTIAL** (lower half) |

#### Org Profile
| Variable | Value | Interpretation |
|----------|-------|---------------|
| Change Load | 92 | Active restructuring — extreme flux |
| Role Clarity | 18 | Roles not yet redefined post-merger |
| Cross-Team Dependency | 85 | New dependencies not yet mapped |
| Policy Stability | 12 | Comp structures and reporting not finalized |
| Attrition Signal | 88 | High voluntary departures since announcement |
| **orgAlignment** | **~11** | Org conditions: critical |

---

### Output

```
candidateFit:       58
teamFloor:          38    ← PARTIAL
orgAlignment:       11    ← critical

overallStability:   round(58 × 0.38 × 0.11) = round(2.4) = 2

conflictPenalties:  teamFloor < 50   → +7
                    orgAlignment < 30 → +12
                    attrition > 70   → +8
                    changeLoad > 70  → +5
                    TOTAL: +32

mergeConflictRisk:  100 − 2 + 32 = 130 → clamped to 100
```

**Verdict: 🔴 High Conflict Risk**

| Score | Value |
|-------|-------|
| Overall Stability | 2 / 100 |
| Merge Conflict Risk | 100 / 100 |
| Confidence | Low |

---

### Intervention Pull Request

**Status: 🔴 Branch Separately**

1. **Policy Update** *(High Priority)*
   Role clarity at 18 and policy stability at 12. No hire should be made into undefined scope. Resolve role definition, reporting structure, and comp alignment before extending any offer.
   *Expected delta: +10–15 orgAlignment*

2. **Manager Coaching** *(High Priority)*
   Manager reliability at 30. The manager is navigating their own uncertainty — they cannot reliably support a new hire while doing so. Either assign a stable onboarding mentor or delay hire.
   *Expected delta: +8–12 teamFloor*

3. **Retention Risk** *(High Priority)*
   Attrition signal at 88. This is not a vacancy to be filled — this is a pattern. Hiring into an unaddressed pattern repeats the outcome. Conduct exit interview audit before this backfill is approved.
   *Prevents future churn cycle*

4. **Communication Plan** *(Medium Priority)*
   Change load at 92. Candidates who can see the restructuring roadmap tolerate uncertainty significantly better than those navigating blind. Provide a written timeline of expected stabilization milestones.
   *Expected delta: +5 conflict risk reduction*

5. **Onboarding Plan** *(High Priority)*
   Feedback quality at 28. In the absence of reliable manager feedback, written milestones are the only feedback proxy. Essential.
   *Expected delta: +5–8 teamFloor*

---

### Interpretation

This is not a candidate problem. The candidate scored 58 — a reasonable hire under normal conditions. This is a pure organizational substrate failure. `58 × 0.38 × 0.11 = 2.4`. The org alignment variable (11) is nearly zero. Any candidate placed here in this window produces a near-zero stability outcome.

The system's output is not "this candidate is wrong." It is "this organization is not ready to receive anyone." That distinction is the product's core value proposition: separating individual signal from environmental noise.

**The correct action is not to reject the candidate.** It is to pause the hire, address the substrate, and re-run the simulation at 60-day intervals until orgAlignment reaches a viable threshold. The candidate can be pipelined. The role definition cannot be skipped.

---

## Cross-Scenario Summary

| Metric | Scenario 1 | Scenario 2 | Scenario 3 |
|--------|-----------|-----------|-----------|
| candidateFit | 76 (strong) | 53 (average) | 58 (good) |
| teamFloor | 25 (absent) | 82 (present) | 38 (partial) |
| orgAlignment | 49 (low) | 80 (strong) | 11 (critical) |
| overallStability | 9 | 35 | 2 |
| mergeConflictRisk | 100 | 65 | 100 |
| Verdict | High Conflict | Conditions | High Conflict |
| Root Cause | Team floor | Candidate fit | Org substrate |

**The pattern:** overallStability is constrained by its weakest multiplicative factor. Candidate quality is only one of three. Hiring platforms that measure only the candidate are measuring one-third of the equation.
