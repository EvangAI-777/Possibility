# Handshake Enterprise Copilot
## Scoring Model Appendix

*Competition Submission — Charles H. Johnson, III*

---

## Design Principles

1. **Deterministic.** Given the same inputs, the model always produces the same outputs. No stochastic elements, no black box.
2. **Multiplicative, not additive.** A weak floor destroys a strong candidate score. An additive model would merely penalize it. The real-world dynamic is multiplicative — a candidate cannot outperform a floor that isn't there.
3. **Explainable.** Every output traces directly to specific input values. The top 3 positive and conflict factors are surfaced on every report.
4. **No protected class data.** The model operates entirely on behavioral, environmental, and organizational signals — never on demographic variables.

---

## Input Variables

### Candidate Dimension (5 variables, equal weight)

| Variable | ID | Range | Description |
|----------|-----|-------|-------------|
| Skills & Capabilities | `skills` | 0–100 | Technical depth, transferable skills, demonstrated competency |
| Work Style Fit | `workStyle` | 0–100 | Preference for structure vs autonomy |
| Stress Response | `stressResponse` | 0–100 | Performance under pressure and ambiguity |
| Growth Preferences | `growthPreferences` | 0–100 | Orientation toward learning and stretch assignments |
| Mobility Goals | `mobilityGoals` | 0–100 | Appetite for role evolution, promotion, lateral moves |

### Team Dimension (5 variables, equal weight)

| Variable | ID | Range | Description |
|----------|-----|-------|-------------|
| Execution Velocity | `velocity` | 0–100 | How fast the team ships and responds to change |
| Decision Style | `decisionStyle` | 0–100 | Top-down (0) to consensus-driven (100) |
| Feedback Quality | `feedbackPattern` | 0–100 | Frequency, honesty, and actionability of feedback loops |
| Autonomy Tolerance | `autonomyTolerance` | 0–100 | Degree to which independent judgment is welcomed |
| Manager Reliability | `managerProfile` | 0–100 | Consistency of support, clarity of expectations |

### Org Dimension (5 variables, differentially weighted)

| Variable | ID | Range | Direction | Weight |
|----------|-----|-------|-----------|--------|
| Role Clarity | `roleClarity` | 0–100 | Positive | 1.4× |
| Policy Stability | `policyStability` | 0–100 | Positive | 1.2× |
| Change Load | `changeLoad` | 0–100 | Inverted (100 = high risk) | 0.9× of inverse |
| Cross-Team Dependency | `crossTeamDependency` | 0–100 | Inverted (100 = high risk) | 0.5× of inverse |
| Attrition Signal | `attritionSignals` | 0–100 | Inverted (100 = high turnover) | 1.0× of inverse |

---

## Intermediate Calculations

### candidateFit

Simple average of all five candidate variables:

```
candidateFit = (skills + workStyle + stressResponse + growthPreferences + mobilityGoals) / 5
```

Rounded to nearest integer. Range: 0–100.

---

### teamFloor

Simple average of all five team variables:

```
teamFloor = (velocity + decisionStyle + feedbackPattern + autonomyTolerance + managerProfile) / 5
```

Rounded to nearest integer. Range: 0–100.

**Interpretation thresholds:**

| teamFloor | Floor Status | Meaning |
|-----------|-------------|---------|
| ≥ 60 | PRESENT | Conditions support normal performance |
| 30–59 | PARTIAL | Mixed conditions — some support absent |
| < 30 | ABSENT | Insufficient support — failure risk high |

---

### orgAlignment

Weighted average of org variables, with inverted risk factors:

```
orgAlignment = (
    roleClarity × 1.4
  + policyStability × 1.2
  + (100 − changeLoad) × 0.9
  + (100 − crossTeamDependency) × 0.5
  + (100 − attritionSignals) × 1.0
) / 5.0
```

Clamped to 0–100. Rounded to nearest integer.

**Why the weights differ:**

- **Role Clarity (1.4×)** — The single highest predictor of early failure is undefined scope. Weighted highest.
- **Policy Stability (1.2×)** — Shifting compensation, reporting, and operating rules undermine trust faster than most factors.
- **Change Load (0.9× inverted)** — High change is a risk multiplier, but organizations can navigate it with strong leadership. Weighted medium.
- **Cross-Team Dependency (0.5× inverted)** — Weighted lowest because dependency is sometimes unavoidable and manageable with good communication infrastructure.
- **Attrition Signal (1.0× inverted)** — Voluntary turnover is the clearest trailing indicator of a systemic floor problem. Weighted at baseline.

---

## Primary Output Calculations

### overallStability

```
overallStability = round(candidateFit × (teamFloor / 100) × (orgAlignment / 100))
```

Range: 0–100.

**Key behavior:** Multiplicative structure means a zero on any component collapses the entire score. A candidate with `skills=100` placed in `teamFloor=0` produces `overallStability=0`. This is the central insight of the model — the floor is not a penalty, it is a multiplier.

**Worked example — Default configuration (all sliders at 50):**
```
candidateFit   = (50+50+50+50+50) / 5 = 50
teamFloor      = (50+50+50+50+50) / 5 = 50
orgAlignment   = (50×1.4 + 50×1.2 + 50×0.9 + 50×0.5 + 50×1.0) / 5
               = (70 + 60 + 45 + 25 + 50) / 5
               = 250 / 5 = 50
overallStability = 50 × (50/100) × (50/100) = 50 × 0.5 × 0.5 = 12.5 → 13
```

Even with every slider at the midpoint, stability is 13 — not 50. This demonstrates that *average conditions produce poor outcomes*, not average ones.

---

### conflictPenalties

Penalty points added when specific risk signals are active:

| Condition | Penalty |
|-----------|---------|
| `teamFloor < 30` | +15 |
| `teamFloor < 50` (and ≥ 30) | +7 |
| `orgAlignment < 30` | +12 |
| `orgAlignment < 50` (and ≥ 30) | +5 |
| `attritionSignals > 70` | +8 |
| `changeLoad > 70` | +5 |

Penalties stack. Maximum possible penalty: +45.

---

### mergeConflictRisk

```
mergeConflictRisk = clamp(100 − overallStability + conflictPenalties, 0, 100)
```

Range: 0–100. Higher = more risk.

---

## Verdict Thresholds

| overallStability | Verdict | PR Status |
|-----------------|---------|-----------|
| ≥ 60 | ✅ Merge Approved | Proceed with standard onboarding |
| 35–59 | ⚠️ Merge with Conditions | Address flagged vectors before hire |
| < 35 | 🔴 High Conflict Risk | Intervention required before hire can succeed |

---

## Factor Extraction

**Positive factors** — parameters where value meets or exceeds a per-variable threshold:

| Parameter | Positive Threshold |
|-----------|-------------------|
| skills | ≥ 60 |
| workStyle | ≥ 50 |
| stressResponse | ≥ 55 |
| growthPreferences | ≥ 50 |
| mobilityGoals | ≥ 40 |
| feedbackPattern | ≥ 55 |
| managerProfile | ≥ 60 |
| autonomyTolerance | ≥ 45 |
| roleClarity | ≥ 60 |
| policyStability | ≥ 55 |
| changeLoad | ≤ 40 (inverted) |
| attritionSignals | ≤ 35 (inverted) |

Top 3 positive factors = highest-value parameters meeting their threshold, sorted descending by value.

**Conflict factors** — parameters failing their threshold, sorted ascending by value (worst first).

Top 3 conflict factors = lowest-value parameters below threshold.

---

## Confidence Band

| overallStability | Confidence |
|-----------------|------------|
| > 70 | High |
| 40–70 | Moderate |
| < 40 | Low |

---

## Intervention Trigger Logic

`buildInterventions()` evaluates six conditions independently and generates a contextual action item for each that fires:

| Trigger | Intervention Type | Priority |
|---------|------------------|---------|
| `teamFloor < 50` | Manager Coaching | High |
| `feedbackPattern < 50` | Onboarding Plan | High |
| `orgAlignment < 50` | Policy Update | High |
| `changeLoad > 65` | Communication Plan | Medium |
| `attritionSignals > 65` | Retention Risk | High |
| `stressResponse < 40` AND `teamFloor < 50` | Role Adjustment | High |

If no conditions fire, a "Standard Onboarding" item is generated, confirming no critical interventions are required.

---

## Limitations and Future Work

1. **No longitudinal feedback loop.** The model is predictive but has no mechanism to ingest outcome data and recalibrate weights. A production system would close this loop with 90-day and 1-year hire outcome data.
2. **Equal candidate weighting.** All five candidate variables are equally weighted. A production system would allow role-specific weighting (e.g., `stressResponse` weighted higher for high-volatility roles).
3. **Binary conflict detection.** Conflict factors are currently detected above/below a fixed threshold. A production system would use sliding penalty curves rather than binary triggers.
4. **No cross-variable interaction terms.** The model treats variables as independent. In practice, `managerProfile × feedbackPattern` interactions have outsized impact — a manager who is unreliable *and* gives poor feedback is more than twice the risk of either alone.
