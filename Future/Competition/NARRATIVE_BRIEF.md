# Handshake Enterprise Copilot
## Narrative Brief — Competition Submission

*Charles H. Johnson, III — Taylor University — April 2026*

---

## The Problem

Hiring systems optimize for the wrong thing.

They rank candidates. They score resumes. They match keywords to job descriptions. What they do not do is model what happens *after* the hire — when a real person lands inside a real team, inside a real organization, with its own inherited patterns, its own velocity, its own floor.

The result: companies hire well and onboard badly. Candidates who looked strong on paper fail inside broken team substrates. High-performing employees leave because the organization around them was structurally incompatible — not with their skills, but with their working conditions.

**The market can rank candidates. It cannot model consequence.**

---

## The Insight

This project began with a question: what if a hiring decision was treated the same way a developer treats a pull request?

A developer doesn't just evaluate whether the new code is good in isolation. They ask: *does this merge cleanly? Where are the conflicts? What does the diff look like against the existing codebase? What breaks downstream?*

The analogy is precise:

- **The candidate** is a commit — a snapshot of capability, style, and configuration
- **The team** is a branch — with its own history, its own inherited patterns
- **The organization** is the repository — the environment the branch lives in
- **The hire** is a merge — and like every merge, it can be clean, conditional, or conflicted

The insight from this project's GENO architecture (genealogical version control) and CREATEME tool (human substrate modeling) is that **a system can look functional while failing because the floor underneath it is absent.** This same principle governs workplace outcomes. A strong candidate placed on a weak team floor will underperform. An average candidate placed on a solid substrate will outperform expectations.

**The floor is the variable no hiring tool measures.**

---

## The Solution

**Handshake Enterprise Copilot** is a dual-engine consequence modeling platform:

**Engine 1 — Candidate Fit:** Scores role compatibility across capability, working style, stress response, growth orientation, and mobility goals.

**Engine 2 — Substrate Scoring:** Independently scores the receiving environment — team floor (feedback quality, manager reliability, autonomy tolerance) and org alignment (role clarity, policy stability, change load, attrition signals).

These three scores feed a single formula:

```
overall_stability = candidate_fit × (team_floor / 100) × (org_alignment / 100)
```

The output is not a ranking. It is a **verdict with an action plan** — phrased as a pull request:

- **Merge Approved** — proceed, conditions are favorable
- **Merge with Conditions** — proceed with named interventions
- **Branch Separately** — high conflict risk; address substrate before hire

Every output includes the top 3 positive factors, top 3 conflict factors, confidence band, and a contextual intervention checklist — the *what to actually do* that most hiring tools skip entirely.

---

## Why It Wins

**Novel framing.** No competing product models the team and org substrate as independent variables that multiply against candidate quality. The stability formula is the insight. A perfect candidate (score 100) placed on a zero floor produces **zero stability** — and the tool shows that directly.

**Actionable output.** The platform does not produce risk labels. It produces PR-style intervention items with named owners, expected stability deltas, and prioritization. Managers can act on it the same day.

**Enterprise breadth.** The same engine applies to new hires, internal mobility decisions, post-merger team integration, and reorganization planning. One tool, four use cases.

**Handshake relevance.** Early-career placement fails most often not because the candidate was underqualified, but because the receiving team had no onboarding infrastructure. This tool quantifies that risk and hands it back to recruiters before the offer letter is signed.

**Ethics by design.** No black box. Explicit explanation layer on every output. Intervention recommendations over deterministic exclusion. Human in the loop for every final decision. No protected class data required.

---

## Status

The MVP is built, tested, and deployed. Three one-click scenario demos are ready for judge review. The scoring engine is deterministic, fully documented, and requires no proprietary dataset to operate.

*Full demo: load via REACTOR.html → handshake_copilot.jsx*
