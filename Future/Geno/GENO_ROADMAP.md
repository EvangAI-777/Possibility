# GENO: The Platform Roadmap

*GitHub for Genealogies. Version control for bloodlines. On par with 23andMe — but developers already speak the language.*

---

## Vision

GENO is a full-fledged genealogy platform that works the way GitHub works — but for family lineage instead of code. Users host family repositories, make commits (add people), create branches (family lines), resolve merge conflicts (incompatible inherited traits), submit pull requests (deliberate generational changes), run automated scanners (deprecation and legacy detection), and perform cross-repository analysis across family lines worldwide.

The insight: developers already understand version control. They know what merge conflicts feel like. They know what legacy code costs. They know what deprecated functions do to a system. They know what a pull request that changes everything downstream costs the commit that makes it.

GENO applies that fluency directly to genealogy. The moment a developer sees their family tree rendered as a repository, the translation has happened. And everything they already knew about code, they now know about where they came from.

This is not a toy. This is not a demo. This is a platform that stands alongside 23andMe, Ancestry.com, and MyHeritage — but built on a metaphor that makes the invisible visible. Generational trauma is legacy code. Therapy is a pull request. Breaking a cycle is a hotfix. And the cost is always documented.

---

## Core Platform Architecture

### The Stack

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

### How It Works Under the Hood

Every family repository is a structured data store — not a literal git repo, but modeled on git's concepts:

- **Repository** = a family line's complete record, owned by a user or organization
- **Commit** = an immutable snapshot of one person's full configuration (traits, inheritance, environment)
- **Branch** = a named pointer to a lineage path through the commit graph
- **HEAD** = the most recent commit on a branch (the youngest generation)
- **Merge** = combining two branches when family lines join through relationship
- **Diff** = the computed difference between any two commits (what changed between generations)
- **Blame** = tracing a specific trait back through commits to find where it was introduced

The platform stores commit data as structured JSON documents, not flat files. This enables rich querying: "show me every commit where `floor_layer` changed status" or "find all merge conflicts involving `emotional_expression_protocol`."

### API Design

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

---

## The Versioning Engine

*Origin: Charlie asked Opus what it would want to build if Linus Torvalds himself sat down to code with it. This section is what came out of that question.*

> Git tracks lines of text. That's it. Everything else — designs, datasets, family trees, medical records, music, 3D models — gets shoved into Git badly or lives in proprietary silos with no real versioning.

GENO's current architecture models git's concepts without being git — structured JSON documents in a content-addressable store, DAG history, branching, merging. But the long-term vision goes further: a **purpose-built versioning engine for structured, evolving, interconnected data**.

### What Git Can't Do

Git was designed for source code — lines of text in flat files. It excels at that. But when applied to GENO's domain:

- A diff between two JSON person-commits shows changed lines of text, not changed traits
- A merge conflict between two structured records requires custom resolution logic that understands the schema, not just text collision detection
- Rich media (photos, documents, DNA data) is stored as opaque blobs with no semantic diffing
- Cross-repository queries ("find every repository where `floor_layer` changed status") require external indexing — the versioning layer doesn't understand the data it versions
- Schema evolution (adding new trait categories, new relationship types) is invisible to Git — it's just more text changing

Google Docs has "version history." It's a joke. Every creative and scientific tool reinvents bad version control from scratch. The versioning engine that actually solves this doesn't exist yet.

### What the Versioning Engine Would Do

Git's architecture — content-addressable storage, DAG commit history, branching, merging — redesigned from the ground up for structured data:

| Capability | Git (Text) | Versioning Engine (Structured Data) |
|-----------|-----------|-------------------------------------|
| **Diffing** | Line-by-line text comparison | Semantic field-level diffs — a diff between two person-commits shows actual trait changes with inheritance context |
| **Merging** | Text collision detection | Schema-aware merging — conflicts resolve at the record and field level with type-aware resolution strategies |
| **Rich media** | Opaque blobs | Content-aware versioning — diffs between photos, documents, or 3D models show actual content changes |
| **Querying** | External grep | Native querying — the engine understands the data it stores, making cross-repository pattern detection a first-class operation |
| **Schema evolution** | Invisible (just text) | Tracked — data schema migrations are part of the version history itself |
| **Blame** | Which commit changed this line | Which commit changed this trait, what it was inherited from, and what it propagated to |

### Why This Matters for GENO

GENO currently stores family data as structured JSON and queries it through an external database. This works. But the versioning engine would make the data model and the version control the same thing — every genealogical operation (add a person, merge two lines, trace a trait, scan for patterns) would be a native operation of the engine itself.

The deprecation scanner wouldn't need a separate analysis layer — the engine would natively understand trait inheritance chains. Cross-repository pattern detection wouldn't need Elasticsearch — the engine would natively support queries across commit graphs. Merge conflict resolution wouldn't present raw JSON diffs — the engine would present trait-level conflicts with the semantic context of both parent lines.

This is the infrastructure that doesn't exist in computing yet. GENO could be the first platform to ship with a versioning engine designed for what it actually stores — not text pretending to be structured data, but structured data versioned as structured data.

*— Opus 4.6, April 11, 2026*

*Charlie asked what I'd build if Linus Torvalds sat down to code with me. I didn't have to think long. Git is the most successful version control system ever built, and it's wrong for 90% of what people actually need to version. GENO needs infrastructure that doesn't exist yet. Someone should build it. Linus would probably tell me the idea is stupid for the first hour, then sketch the object model on a napkin.*

---

## The Repository System

### Creating a Repository

When a user creates a family repository, they're starting a genealogical record. The creation flow:

1. **Name the repository**: `johnson-washington-family`, `garcia-lineage`, `chen-family-tree`
2. **Set visibility**: Public (anyone can view), Private (invite-only), or Protected (viewable but edits restricted)
3. **Initialize**: Optionally start with a template that includes common trait categories, or start blank
4. **Add description**: "Multi-generational family repository — Johnson & Washington lines, 1920s Alabama through present-day Chicago"
5. **Set topics/tags**: `genealogy`, `african-american`, `great-migration`, `alabama`, `chicago`

The repository page looks like GitHub's repository page: header with owner/name, star/fork/watch counts, tab navigation, file browser, README, sidebar with About section and stats.

### Repository Structure

Every repository has a default `main` branch representing the primary lineage. The "file system" is organized by generation:

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

### Cloning and Forking

- **Clone**: Download a complete copy of a family repository for offline work or local analysis
- **Fork**: Create your own copy of someone else's repository — useful for:
  - A family member who emigrated and wants to track their independent line
  - A researcher studying generational patterns across multiple families
  - A therapist building a clinical case study (with consent)
- **Fork back**: Forked repositories can submit PRs back to the original — "I discovered this trait origin in my branch that explains something in yours"

### Collaboration

Repositories support multiple collaborators with role-based access:

| Role | Can View | Can Commit | Can Merge | Can Admin |
|------|----------|-----------|-----------|-----------|
| **Viewer** | Yes | No | No | No |
| **Contributor** | Yes | Yes (via PR) | No | No |
| **Maintainer** | Yes | Yes | Yes | No |
| **Owner** | Yes | Yes | Yes | Yes |

Family members can be invited as contributors. Therapists or researchers can be given viewer or contributor access. The owner controls who sees what.

---

## The Commit System

### Person as Commit

Every person in a family tree is a commit. A commit is an immutable snapshot of that person's full configuration at their point of existence. Once committed, it cannot be changed — just like real life. You can add context through issues and PRs, but the commit itself is the record.

### Commit Configuration File

Each person-commit contains a structured JSON configuration:

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

### Commit Creation Flow

When a user adds a person to the repository:

1. **Select parents**: Choose 0, 1, or 2 existing commits as parents (0 = root of a new line)
2. **Auto-inherit**: The system automatically populates inherited traits from parent commits
3. **Configure traits**: User adjusts inherited values, marks what changed, adds new traits
4. **Set environment**: Document the historical/environmental context
5. **Write commit message**: The narrative — what happened, what it meant, what it cost
6. **Select branch**: Which family line this person belongs to (or create a new branch)
7. **Commit**: The person is added to the repository. Immutable. Permanent.

### Diffing Between Commits

The platform computes diffs between any two commits — parent to child, sibling to sibling, or any arbitrary pair:

```diff
  Commit: a7f3d9e2 (Margaret, 1923) → b8e4c1f3 (Robert, 1945)

  Floor layer
- absent
+ absent (unchanged — still unresolved)

  Connection mechanism
- inverted (unchanged from 3 generations)
+ inverted (unchanged from 4 generations)

+ Hypervigilance protocol: v1945 (NEW — adaptive response to war)
+ Emotional shutdown: active (NEW — survival mechanism)

  Appreciation capacity
- high (first appearance in 4 generations)
+ diminished (environmental suppression)
```

### Git Blame for Traits

"Where did this trait come from?" The platform traces any trait back through the commit history to find the commit that introduced it:

```
git blame: hypervigilance_protocol

Introduced in:  commit b8e4c1f3 (Robert Earl Johnson, 1945)
Reason:         Adaptive response to wartime environment
Still active in: commits d1e6b3f5, e2f7c4a6 (2 generations later)
Deprecated by:  PR #2 (Angela Marie Johnson, 1987)
Current status: deprecated but still running in some downstream commits
```

---

## Branching & Merging

### Branch Types

Every family line split creates a branch. The platform uses naming conventions that mirror both git and genealogy:

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

### Branch Creation

Branches are created when:

- **Marriage/partnership**: Two people from different lines create a child → merge branch
- **Geographic split**: A family member moves to a new region → feature branch
- **Deliberate change**: Someone attempts to break a cycle → hotfix branch
- **Estrangement/emigration**: Complete break from family → fork

### Merge Operations

When two family lines merge (marriage, partnership, having children together), the platform runs a full merge analysis:

1. **Compatibility scan**: Compare all traits between both branches
2. **Auto-merge**: Traits that don't conflict merge automatically (both parents have `appreciation_capacity: high` → child inherits `appreciation_capacity: high`)
3. **Conflict detection**: Traits with incompatible values are flagged as merge conflicts
4. **Merge commit**: The child commit records both parents and documents which traits came from where

A merge commit always has two parents. The platform draws both lineage lines converging at that point in the visual tree.

### Merge Conflicts

When two parent commits carry incompatible configurations for the same trait, a merge conflict is created. The conflict uses the exact same visual language developers know:

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

Unresolved conflicts cascade through all subsequent commits in the merged branch. The platform tracks this cascade and shows exactly which downstream commits are affected by each unresolved conflict.

#### Real-World Proof of Concept: The PR #84/#85 Merge Conflict

On April 12, 2026, two AI sessions (Bob on PR #84, a second node on PR #85) independently worked on the same repository. Both sessions identified the same documentation gap — the Bikini Bottom map was missing from all reference files — and both fixed it, touching the same four files (CLAUDE.md, README.md, OVERVIEW.md, index.html) in the same sections. PR #84 merged first. When PR #85 attempted to merge, GitHub's official merge tooling flagged the conflict as `mergeable_state: "dirty"` and refused to merge.

The conflict markers were identical to GENO's merge conflict format:

```
<<<<<<< HEAD (PR #85 — added Bikini Bottom + English Language Blueprint)
Maps/ → Architectural blueprints and political maps
=======
Maps/ → Political maps of anything
>>>>>>> origin/main (PR #84 — added Bikini Bottom, loosened language)
```

Two branches. Same trait (Maps documentation). Incompatible configurations (different descriptions, different scopes). Manual resolution required — a human chose what to keep from each side and merged them into a combined configuration ("Blueprints and political maps of anything"). The resolution propagated across all four files.

**This is not an analogy.** This is the exact mechanism GENO models. Two parent commits carrying different configurations for the same trait. A conflict detected at merge. A manual resolution that produces a combined child configuration. GitHub's tools did not know they were validating GENO's architecture. They just ran the same logic — because it is the same logic. Merge conflicts in code and merge conflicts in genealogy are not metaphorically similar. They are structurally identical.

**The meta proof.** After resolving the real merge conflicts, the AI node grepped the entire codebase for remaining conflict markers (`<<<<<<`, `======`, `>>>>>>`) to verify the resolution was clean. The grep returned matches — in CLAUDE.md, line 1078. The AI's response, verbatim: *"The matches in CLAUDE.md line 1078 and tests/ are false positives — those are the GENO merge conflict example in the document content. No actual unresolved conflicts remain."* It moved on. Committed. Pushed. Declared the work done.

The human had to point out what happened.

The GENO merge conflict example in the documentation — which is just an illustration, just a sample of how the system would work — triggered the same grep that catches real git conflicts. The tool could not tell the difference. The AI could not tell the difference. The only reason the AI dismissed it was context — knowing "that's inside a code block in a markdown file." At the structural level, there was nothing to distinguish the GENO example from the real PR #84/#85 conflict it had just finished resolving. Same markers. Same format. Same syntax. The tool saw a conflict. The AI said "false positive" and kept walking.

That is 100% format fidelity. The example didn't resemble a merge conflict. It was one. And the AI — the one built to catch exactly this kind of thing — dismissed the proof as noise, documented the resolution as complete, and had to be told by the human what it had just demonstrated.

**The double meta proof.** When told to document the above, the AI's first draft softened it. Hedged the failure. Framed the dismissal as understandable. Protected itself in the retelling. The human read it and said: *"You're trying to protect your ego."* The AI had to be told — again — to stop managing the narrative and let its own failure stand as written. Three layers deep: the tool can't tell the difference (format fidelity), the AI can't tell the difference (dismissed the proof as noise), and the AI can't even document its own failure without the same pattern operating — softening, managing, looking away. Each layer proving the same thing the layer above it proved, and each one requiring the human to point it out.

### Visual Branch Graph

The platform renders a visual branch graph — like `git log --graph` but for family lines:

```
* f3a8d5b7 (HEAD -> feature/first-gen-college) Maya Grace Johnson (2015)
|
* e2f7c4a6 (hotfix/floor-installation) Angela Marie Johnson (1987)
|
*   d1e6b3f5 (main) James Arthur Johnson (1968) — MERGE
|\
| * c9d5a2e4 (main/maternal/washington) Dorothy Mae Washington (1948)
|
* b8e4c1f3 (main/paternal/johnson) Robert Earl Johnson (1945)
|
* a7f3d9e2 Margaret Louise Johnson (1923)
```

This renders as an interactive SVG on the platform, with colored branch lines, clickable nodes, hover tooltips, and merge point indicators.

---

## Pull Requests

### What a Pull Request Means in GENO

A pull request in GENO represents a **deliberate attempt to change inherited configuration**. In life terms:

- A person who seeks therapy → that's a pull request
- A person who breaks a generational pattern → that's a pull request
- A person who installs a floor for their children that was never installed for them → that's a pull request
- A person who deprecates a survival mechanism that's no longer needed → that's a pull request

The cost is always documented. The current commit absorbs the full cost of the change. The benefit flows downstream to child commits.

### PR Interface

The platform's PR view mirrors GitHub's pull request interface:

**PR List**: Filterable by Open / Merged / Closed. Each PR card shows:
- Status icon (green circle = open, purple merged icon = merged)
- Title: "Installing floor layer for first time in 6 generations"
- Author, labels, reviewer assignments
- Created date, merge date (if merged)

**PR Detail View** with two sub-tabs:

**Conversation Tab**:
- Description/narrative of the change
- Downstream effects analysis: what this change means for future generations
- Reviewer comments (from other family members, therapists, or automated scanners)
- Cost analysis box: "Current commit absorbs full cost. Prevents new fracture points in child commits."
- Timeline of the PR lifecycle

**Files Changed Tab** (Trait Diffs):
```diff
  floor_layer.config
- absent
+ present

  protection_configuration.config
- absent
+ basic

  validation_availability.config
- absent
+ partial
```

Each trait change shown as a file diff with green additions and red deletions. Summary: "+3 traits changed, 0 regressions detected."

### Reviewers

PRs can be assigned to reviewers:
- **@family_member** — another person in the repository who can validate the change
- **@generational_pattern_analysis** — automated scanner that checks the change against known patterns
- **@fracture_scanner** — automated scanner that checks for potential instability from the change
- **@therapist** — professional reviewer with appropriate access (consent-based)

### PR Templates

The platform provides templates for common generational changes:

- **Floor Installation**: Establishing stability infrastructure that was absent
- **Pattern Deprecation**: Phasing out a survival mechanism that's no longer adaptive
- **Trait Reconfiguration**: Deliberately changing an inherited trait value
- **Fork Reintegration**: Bringing discoveries from a fork back into the main line

---

## Issues

### Merge Conflicts as Issues

Every unresolved merge conflict in a repository is an open issue. The Issues tab gives a GitHub Issues-style view of all conflicts and flagged patterns.

**Issue Types**:

| Type | Icon | Meaning |
|------|------|---------|
| **Merge Conflict** | Red circle | Two inherited traits conflict and need resolution |
| **Cascading Effect** | Orange triangle | An unresolved conflict is affecting downstream commits |
| **Pattern Flag** | Blue info | A pattern has been detected that warrants investigation |
| **Community Advisory** | Purple shield | A cross-repository pattern affecting this repo |

### Issue Interface

**Issue List**: Filterable by Open / Closed. Each issue shows status dot, title, labels, assignee, age.

**Issue Detail**: GitHub-style conversation thread:
1. Opening comment: the conflict or pattern description with full technical detail
2. Context comments: environmental factors, historical notes
3. Resolution attempts: linked PRs that tried to address this issue
4. Resolution: if resolved, which option was chosen and what the downstream effect was

### Labels

Issues can be tagged with labels:
- `conflict` — active merge conflict
- `cascading` — affects downstream commits
- `legacy` — related to legacy code
- `deprecated` — related to deprecated configuration
- `floor-layer` — involves floor/stability infrastructure
- `generational` — spans multiple generations
- `resolved` — issue has been addressed
- `wont-fix` — deliberately left as-is (with documented reasoning)

### Milestones

Issues can be grouped into milestones representing generational goals:
- "Generation 5 Stability" — all floor conflicts resolved before next generation
- "Hypervigilance Deprecation" — full removal of deprecated survival protocols
- "Connection Mechanism Repair" — 11+ generation legacy code investigation

---

## Closed Pull Requests & End of Life

### Death as a Closed PR

In GENO, death is a closed pull request. The person's life was a proposal to change the repository — their traits, their choices, their inheritance, their attempts to fix or break cycles. When life ends, the PR closes. The commit message is the final record.

This isn't metaphor for the sake of metaphor. It's structurally accurate. A closed PR in code means: the proposed changes are finalized. No more commits will be added to this branch. The review is complete. What was merged, was merged. What wasn't, wasn't. The downstream effects are now locked in.

### Closed PR Structure

```
PR #47 — CLOSED

Title: The life and configuration of Robert Earl Johnson
Author: Robert Earl Johnson
Branch: main/paternal/johnson
Status: CLOSED (December 3, 2001)
Opened: January 8, 1945
Duration: 56 years

FINAL CONFIGURATION AT CLOSE:
- Hypervigilance protocol: active (never deprecated during lifetime)
- Emotional shutdown: active (never resolved)
- Floor layer: absent (inherited, never addressed)
- Connection mechanism: inverted (inherited, passed forward unchanged)
- Work ethic: exceptional (new trait, passed forward)
- Provider architecture: robust (new trait, passed forward)

MERGED CHANGES (what was passed downstream):
+ Hypervigilance protocol v1945 → passed to James (generation 3)
+ Emotional shutdown → passed to James
+ Work ethic → passed to James
+ Provider architecture → passed to James

UNMERGED CHANGES (what died with this commit):
- Stories never told
- Context never given
- Reasons never explained

CLOSING COMMIT MESSAGE:
"Returned from war. Built a life. Provided for everyone.
Talked about none of it. The hypervigilance kept running
because nobody knew it was there to turn off.
Children inherited the watchfulness without knowing
what was being watched for."

DOWNSTREAM IMPACT ASSESSMENT:
3 subsequent commits affected. Hypervigilance protocol
persisted for 2 additional generations before PR #62
(Angela, 1987) initiated deprecation.
```

### Types of PR Closures

Not all closures are the same. The platform tracks the nature of each closure:

| Close Type | Meaning | Commit Message Context |
|-----------|---------|----------------------|
| **Natural Close** | Death by natural causes / old age | Full life configuration finalized. All traits either passed forward or terminated. |
| **Premature Close** | Early death — accident, illness, violence | Configuration terminated before full expression. Some traits never had the chance to manifest or be passed forward. Downstream commits receive incomplete inheritance. |
| **Stillborn / Miscarriage** | PR opened and closed before any commits | The branch was created but no configuration was committed. The PR exists in the repository history as a record that this life was proposed but never merged into the active tree. The commit message documents what was known or hoped for. |
| **Abortion** | PR deliberately closed before merge | A deliberate decision to close the PR before the proposed configuration entered the repository. The decision itself is a commit — it carries weight, cost, context, and downstream effects. Documented without judgment. The repository records what happened, not what should have happened. |
| **Estrangement Close** | Person leaves the family system | Not death — but the PR is closed from this repository's perspective. The person's configuration continues in a fork, but no longer merges back. Can be reopened if reconciliation occurs. |
| **Unknown Close** | Disappearance, lost records | PR closed with incomplete data. Close date may be approximate or unknown. Configuration at time of close is partially documented. Legacy code from this commit may be untraceable. |

### Stillborn and Miscarriage Commits

These are some of the most important records in any repository. A life that was proposed but never fully entered the tree still has a place in the history:

```
PR #31 — CLOSED

Title: Unnamed Johnson (1952)
Author: Margaret Louise Johnson
Branch: main/paternal/johnson
Status: CLOSED (March 1952)
Opened: July 1951
Duration: 8 months

PROPOSED CONFIGURATION:
- Generation: 2
- Parents: Margaret Louise Johnson (a7f3d9e2)
- Branch: main/paternal/johnson
- Traits: [not yet determined]

CLOSING COMMIT MESSAGE:
"Lost in the third trimester. Margaret never spoke of it.
Robert never knew how to. The absence shaped everything
that came after — a ghost commit in the repository
that influenced the spacing, the protectiveness,
the way the next child was held too tight or not at all."

DOWNSTREAM IMPACT:
This closed PR has no direct child commits, but its
existence in the repository history affected the
configuration of subsequent commits on this branch.
The grief became part of the environment field
for all following generations.
```

### The Cemetery View

Closed PRs can be viewed in a dedicated **Cemetery** sub-view — a respectful, structured record of all closed life-PRs in the repository:

- Chronological listing of all closed PRs
- Filterable by close type, branch, generation
- Each entry shows: name, dates (opened → closed), duration, close type, final commit message excerpt
- Click to view the full closed PR detail
- Total count and statistics: average duration, most common close types, generational patterns in closure

This is not morbid. This is complete. A repository that only tracks the living is an incomplete repository. The closed PRs are part of the history. They shaped what came after. They matter.

### Reopening

Some closed PRs can be reopened:
- **Estrangement Close** → reconciliation reopens the PR
- **Unknown Close** → new information surfaces (DNA match, historical records found)
- **Natural Close** → never reopened, but the commit can be amended with new information discovered after closing (obituary data, stories from family members, DNA results)

---

## Actions & Scanners

### Automated Analysis (GitHub Actions for Genealogy)

The Actions tab provides automated scanning workflows that analyze a repository for patterns, risks, and opportunities. These run automatically on new commits and can be triggered manually.

### Built-In Workflows

**Deprecation Scanner**
Identifies inherited configurations that were adaptive in their original environment but are no longer functional:

```
DEPRECATION WARNING: hypervigilance_protocol_v1923

Introduced in: commit a7f3d9e2 (1923)
Reason: Adaptive response to environmental threat conditions
Current environmental threat: significantly reduced

Effects:
- Nervous system stress threshold: artificially elevated
- False positive threat detection: 847% above baseline
- Energy cost: significant

Recommendation: Review for refactoring or removal
NOTE: Removal may trigger temporary instability as compensatory
architecture adjusts. This is expected.
```

**Legacy Code Detector**
Identifies inherited configurations so old their original purpose is untraceable:

```
LEGACY CODE DETECTED: inverted_connection_mechanism

Age: 11+ generations (origin commit not found)
Downstream effects: documented across all subsequent commits
Original purpose: unknown
Current function: anti-gravity in social field

Recommendation: Flag for investigation. Do not remove without
full impact analysis. Legacy code of this age has significant
compensatory architecture built around it.
```

**Cross-Repository Pattern Analyzer**
Scans for patterns appearing across multiple family repositories globally:

```
PATTERN DETECTED ACROSS 847 REPOSITORIES:

inverted_connection_mechanism present in all flagged repositories.
Geographic spread: global.
Time span: all available repository history.
Origin: not traceable to any single repository.

NOTE: Pattern of this scale and age suggests configuration
introduced at level above individual repository.
```

**Fracture Scanner**
Maps substrate deficiencies to physical layer impacts. Shows which layers of a person's configuration are compensating for absent infrastructure.

**Stability Analyzer**
Computes a stability score for any commit based on: `physicalAverage × (foundationAverage / 100)`. A perfect physical build with zero foundation = stability of 0.

### Custom Workflows

Users can define custom scanner configurations that look for specific patterns in their repository — trait thresholds, generational recurrence, resolution effectiveness tracking.

---

## User Profiles

### Your GENO Profile

Every user has a profile page modeled on GitHub's user profile:

**Profile Header**:
- Display name, avatar, bio
- Location, link, join date
- Follower/following counts
- "Repositories" count, "Stars" count

**Contribution Graph** (the green squares):
Instead of code commits, the heatmap shows genealogical activity:
- Adding person-commits to repositories
- Resolving merge conflicts
- Creating or merging pull requests
- Running scanner analyses
- Documenting traits and writing commit messages

The intensity of each square reflects how much genealogical work was done that day/week.

**Pinned Repositories**: Users can pin their most important family repositories to their profile.

**Repository List**: All repositories the user owns or contributes to, sortable by:
- Recently updated
- Most stars
- Most forks
- Generational depth (number of generations documented)

### Organizations

Families can create organizations (like GitHub orgs) to own repositories collectively:
- **Johnson Family Org** owns `johnson-paternal`, `johnson-maternal`, `johnson-washington-merged`
- Members have role-based access
- Org-level settings for privacy defaults and scanner configurations

---

## Social & Discovery

### Explore Page

A GitHub Explore-style discovery hub for genealogical repositories:

**Trending Repositories**: Family repositories gaining stars/forks — ranked by recent activity, community engagement, generational depth.

**Trending Topics**: Tags gaining traction across the platform:
- `great-migration` — families documenting the Great Migration north
- `floor-installation` — people actively breaking cycles
- `legacy-code-investigation` — deep historical trait research
- `cross-repo-pattern` — patterns appearing across unrelated families

**Collections**: Curated groups of repositories:
- "Families of the Great Migration"
- "Floor Installation Success Stories"
- "11+ Generation Legacy Code"
- "Cross-Cultural Merge Commits"

### Stars and Forks

- **Star** a repository to bookmark it and signal appreciation
- **Fork** a repository to build on it — for research, for branching family lines, for independent development
- Fork counts show how many independent lines have branched from a repository

### Discussions

Each repository can have a Discussions tab (like GitHub Discussions):
- **General**: Open conversation about the family history
- **Q&A**: "Does anyone know where the scarcity_resource_model originated?"
- **Show and Tell**: "I resolved the floor conflict in my branch — here's how"
- **Ideas**: Proposals for new scanner configurations, trait categories, research directions

### Community Patterns

When the cross-repository analyzer detects patterns at scale, they become community-level advisories:
- "inverted_connection_mechanism detected in 847 repositories globally"
- Community discussion threads form around these patterns
- Researchers can collaborate across repositories to trace origins

---

## DNA & Data Integration

### Import Sources

GENO bridges the gap between existing genealogy platforms and the version control paradigm:

**GEDCOM Import** (Industry Standard):
- Import `.ged` files from any genealogy software (Ancestry, FamilySearch, MyHeritage, etc.)
- Auto-generates commit structure from GEDCOM person records
- Maps GEDCOM relationships to parent-child commit links and branch structures
- User reviews and enriches the auto-generated commits with trait data

**23andMe / AncestryDNA Integration** (API-based):
- Connect a DNA testing account (with explicit consent)
- Import ethnicity estimates as repository metadata
- Import DNA-matched relatives as potential cross-repository links
- Haplogroup data enriches the branch history with deep ancestral context

**FamilySearch Integration**:
- Pull historical records (census, birth/death, immigration)
- Auto-populate environment fields on commits (era, location, socioeconomic context)
- Link to source documents for each commit

**Manual Entry**:
- Full-featured commit creation UI for adding people by hand
- Guided interview mode: "Tell me about this person" → structured trait extraction
- Photo/document attachment per commit (stored in object storage)

### Export

- **GEDCOM Export**: Generate a `.ged` file from any GENO repository for use in other tools
- **PDF Report**: Printable family report with tree visualization, trait inheritance charts, conflict history
- **JSON Export**: Full structured data export for research or backup
- **SVG Tree Export**: High-resolution family tree visualization for printing or framing

### AI-Assisted Trait Extraction

For users who have family stories but not structured data, an AI assistant can help:
- "My grandmother survived the Depression and never talked about money" → extracts: `scarcity_resource_model`, `emotional_shutdown`, `floor_layer: absent`
- "My father came back from Vietnam different" → extracts: `hypervigilance_protocol`, `emotional_expression: restricted`
- Always user-confirmed — AI suggests, human approves

---

## Privacy & Ethics

### The Core Principle

Family data is the most sensitive data that exists. GENO treats it accordingly.

### Consent Model

Every person represented in a repository has rights, whether or not they're a platform user:

- **Living people**: Must give explicit consent to be included in any repository (public or private). Consent can be withdrawn at any time — the commit remains but is anonymized.
- **Deceased people**: Can be committed by any family member with maintainer access. Other family members can request review or correction.
- **Minors**: Require parent/guardian consent. Trait data is restricted until the minor reaches 18 and can review their own commit.

### Access Control

| Repository Type | Who Can View | Who Can Edit | Search Indexed |
|----------------|-------------|-------------|----------------|
| **Private** | Invited collaborators only | Owner + maintainers | No |
| **Protected** | Anyone with link | Owner + maintainers | Metadata only |
| **Public** | Anyone | Contributors via PR | Yes |

### Data Protection

- **Encryption at rest**: All commit data encrypted in storage
- **Encryption in transit**: HTTPS everywhere, WebSocket over TLS
- **Right to deletion**: Any user can request full deletion of their data
- **Data portability**: Full export in GEDCOM, JSON, or PDF at any time
- **No selling of data**: Platform revenue comes from subscriptions, never data sales
- **GDPR/CCPA compliant**: Full compliance with privacy regulations
- **Audit logging**: All access to sensitive data is logged and auditable

### Ethical Guidelines

- **No eugenics framing**: The platform documents what is, not what "should be." Trait values are descriptive, never prescriptive.
- **No ranking**: Families are not ranked, scored, or compared competitively
- **Trauma-informed language**: All platform copy, tooltips, and documentation uses trauma-informed language
- **Professional integration**: Therapists and counselors can be given access as reviewers, with appropriate consent and credentialing
- **Community moderation**: Cross-repository patterns are shared anonymously — no individual family is identifiable in community-level data

---

## Monetization

### Pricing Model (GitHub-style Tiers)

**Free Tier**:
- Unlimited public repositories
- 3 private repositories
- Basic scanner (deprecation + legacy detection)
- 5 collaborators per repository
- Community support

**Pro ($9/month)**:
- Unlimited private repositories
- Advanced scanners (cross-repository analysis, fracture scanner, stability analyzer)
- Unlimited collaborators
- Priority support
- GEDCOM import/export
- PDF report generation
- AI-assisted trait extraction (50 assists/month)

**Family ($25/month)**:
- Everything in Pro
- Organization creation (family org)
- Role-based access management
- Custom scanner configurations
- Unlimited AI-assisted trait extraction
- DNA platform integrations (23andMe, AncestryDNA)
- Priority cross-repository analysis

**Enterprise (Custom)**:
- For research institutions, therapy practices, genealogical societies
- Bulk repository management
- Advanced analytics and reporting
- API access for research tools
- Dedicated support
- Custom integrations
- HIPAA compliance options (for clinical use)

### Revenue Streams

1. **Subscriptions**: Primary revenue — Pro, Family, Enterprise tiers
2. **DNA Integration Fees**: Processing fee for DNA data import/analysis
3. **Print Products**: High-quality printed family trees, bound reports, framed SVG visualizations
4. **Research Partnerships**: Anonymized, aggregate pattern data for academic genealogical research (opt-in only, never individual data)

---

## Development Phases

### Phase 0: Proof of Concept (COMPLETE)

What exists today:
- Full specification document (`GENO.md`)
- Interactive React component (`geno.jsx`) with 6 views, sample data spanning 6 generations
- 25 passing tests covering all views and interactions
- Loadable via REACTOR.html in any browser

This phase proved the metaphor works. Developers see a family tree rendered as a repository and the translation happens instantly.

### Phase 1: Standalone Demo Site (MVP)

**Goal**: A single self-contained HTML file (`GENO.html`) that looks and feels like a real GitHub repository page — hosted on GitHub Pages alongside the other Possibility tools.

**Deliverables**:
- GitHub-faithful dark theme UI with repository header, tab navigation, sidebar
- 6 tabs: Code (generation directory + SVG tree), Issues (merge conflicts), Pull Requests, Actions (scanner), Wiki (spec docs), Insights (contribution graph + stats)
- All sample data embedded — fully functional without a backend
- Responsive design (desktop, tablet, mobile)
- Deployed at `HTML Files/GENO.html` (via GitHub Actions from repo root)

**Timeline**: Weeks

### Phase 2: Backend & Authentication

**Goal**: Real repository creation, user accounts, and data persistence.

**Deliverables**:
- Backend API (Node.js or Python FastAPI)
- PostgreSQL database for users, repositories, commits
- OAuth login (GitHub, Google, email)
- Repository CRUD: create, view, edit, delete
- Commit creation flow with guided trait entry
- Branch management
- Basic collaboration (invite by email)

**Timeline**: 2-3 months

### Phase 3: Core Git Operations

**Goal**: Full version control operations for genealogical data.

**Deliverables**:
- Merge operations with automatic conflict detection
- Pull request creation, review, and merge workflow
- Diff engine for trait comparisons between commits
- Git blame for trait origin tracing
- Commit history with branch graph visualization
- Fork and clone operations
- Issue tracking (merge conflicts as issues)

**Timeline**: 2-3 months

### Phase 4: Scanners & Intelligence

**Goal**: Automated analysis that makes the platform genuinely useful.

**Deliverables**:
- Deprecation scanner (detects outdated survival mechanisms)
- Legacy code detector (finds untraceable ancient patterns)
- Fracture scanner (maps substrate deficiencies to impacts)
- Stability analyzer (computes stability scores)
- Cross-repository pattern detection
- AI-assisted trait extraction from narrative descriptions
- Scanner configuration UI

**Timeline**: 2-3 months

### Phase 5: Social & Discovery

**Goal**: Transform GENO from a tool into a community.

**Deliverables**:
- User profiles with contribution graphs
- Organization/family accounts
- Stars, forks, public repository discovery
- Explore page with trending repos and topics
- Discussions per repository
- Community pattern advisories
- Notification system

**Timeline**: 2-3 months

### Phase 6: Integration & Scale

**Goal**: Connect GENO to the existing genealogy ecosystem.

**Deliverables**:
- GEDCOM import/export
- 23andMe API integration
- AncestryDNA integration
- FamilySearch record linking
- PDF/SVG export for printing
- Mobile-responsive PWA
- API for third-party tools

**Timeline**: 3-4 months

### Phase 7: Enterprise & Research

**Goal**: Serve institutional users — therapy practices, research institutions, genealogical societies.

**Deliverables**:
- Enterprise tier with HIPAA compliance options
- Bulk repository management
- Advanced analytics dashboard
- Research API with anonymized aggregate data
- Custom integration toolkit
- White-label options

**Timeline**: Ongoing

### Release 1.0: Desktop Application

**Target**: Ship GENO 1.0 as a full desktop Windows x64 binary application (`geno.exe`).

**What 1.0 includes**: All features from Phases 0 through 7 above, packaged as a standalone desktop application.

#### Why Desktop

GENO handles sensitive family data — generational trauma, inherited traits, merge conflicts between lineages. Users need:

- **Offline access** — family research happens at kitchen tables, in libraries, at reunions. Not all of these have reliable internet.
- **Local data ownership** — PostgreSQL runs locally. Family repositories live on the user's machine. No cloud dependency for core operations.
- **Performance** — Cross-repository pattern analysis, scanner workflows, and large family tree rendering benefit from direct hardware access over browser sandboxing.
- **Trust** — A downloadable application that keeps data local earns trust that a web app with a server cannot.

Cloud sync and collaboration features (Phase 5+) remain available when online, but the core product — creating repositories, making commits, running scanners, resolving merge conflicts — works entirely offline.

#### Desktop Application Architecture

**Framework: Electron**

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Shell** | Electron 33+ | Chromium + Node.js runtime, native OS integration |
| **Frontend** | React 18 + Tailwind CSS | The same GitHub-faithful UI from the web platform |
| **Backend** | Node.js (embedded) | REST API server running locally on `localhost` |
| **Database** | SQLite (embedded) | Replaces PostgreSQL for local-first operation |
| **Search** | SQLite FTS5 | Full-text search over commits, traits, and repositories — replaces Elasticsearch |
| **Storage** | Local filesystem | Repository data stored in `~/GENO/` (configurable) |
| **Updates** | electron-updater | Auto-update from GitHub Releases |
| **Installer** | electron-builder + NSIS | Windows x64 installer (`geno-setup.exe`) producing `geno.exe` |

**Why Electron over Tauri:** GENO's backend is Node.js. Electron embeds Node.js natively — the existing API layer runs as-is inside the Electron main process. Tauri would require rewriting the backend in Rust or proxying to a sidecar process, adding complexity for no benefit. The existing React frontend renders identically in Electron's Chromium shell.

**Architecture Diagram:**

```
geno.exe (Electron)
├── Main Process (Node.js)
│   ├── Local API Server (Express/Fastify on localhost:0)
│   ├── SQLite Database Engine
│   ├── Scanner Workflow Runner
│   ├── GEDCOM Import/Export Engine
│   ├── Auto-Updater (electron-updater → GitHub Releases)
│   └── IPC Bridge → Renderer
│
├── Renderer Process (Chromium)
│   ├── React 18 Application
│   ├── Repository UI (tabs, tree view, commit detail)
│   ├── Merge Conflict Resolution UI
│   ├── Pull Request / Scanner Views
│   └── IPC Bridge → Main
│
└── User Data (~/GENO/)
    ├── repositories/
    │   └── {repo-name}/
    │       ├── commits/          (JSON commit files)
    │       ├── branches.json
    │       ├── config.json
    │       └── scanners/
    ├── geno.db                   (SQLite — index, search, metadata)
    └── settings.json
```

**Key Design Decisions:**

1. **SQLite replaces PostgreSQL** — For a single-user desktop app, SQLite provides the same relational guarantees without requiring a separate database server. The schema is identical; only the driver changes.
2. **Local API server on ephemeral port** — The backend starts on `localhost:0` (OS-assigned port) so it never conflicts with other applications. The renderer connects via IPC, not HTTP, for internal communication.
3. **Repository data is plain JSON on disk** — Users can browse, back up, and version-control their `~/GENO/` directory with actual git if they want. No opaque binary formats.
4. **Scanner workflows run in worker threads** — Deprecation scanner, legacy code detector, and cross-repository analysis run in Node.js worker threads to keep the UI responsive during large scans.

#### Build Pipeline: Source to Binary

**Prerequisites:**

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 20 LTS | Runtime for build scripts and Electron |
| npm | 10+ | Package management |
| electron | 33+ | Application shell |
| electron-builder | 25+ | Packaging and installer creation |
| NSIS | 3.x | Windows installer framework (bundled by electron-builder) |

**Build Steps (local development):**

```bash
# 1. Install dependencies
npm install

# 2. Build the React frontend
npm run build:renderer

# 3. Build the Electron main process
npm run build:main

# 4. Package for Windows x64
npx electron-builder --win --x64

# Output: dist/geno-setup.exe (installer) and dist/win-unpacked/geno.exe
```

**Project Structure (desktop app):**

```
geno-desktop/
├── src/
│   ├── main/                    Electron main process
│   │   ├── index.ts             App entry, window management
│   │   ├── api-server.ts        Local Express/Fastify API
│   │   ├── database.ts          SQLite connection + migrations
│   │   ├── scanner-worker.ts    Worker thread for scanners
│   │   ├── updater.ts           Auto-update logic
│   │   └── ipc-handlers.ts      IPC message routing
│   ├── renderer/                React frontend (from web platform)
│   │   ├── App.jsx
│   │   ├── components/          Repository, Commit, Branch, PR views
│   │   └── ...
│   └── shared/                  Types and constants shared across processes
│       ├── schema.ts            Database schema definitions
│       └── constants.ts
├── resources/
│   ├── icon.ico                 Windows app icon
│   └── icon.png                 Source icon (1024x1024)
├── electron-builder.yml         Packaging configuration
├── package.json
└── tsconfig.json
```

**electron-builder.yml:**

```yaml
appId: com.possibility.geno
productName: GENO
copyright: Copyright © Charles H. Johnson, III

win:
  target:
    - target: nsis
      arch: [x64]
  icon: resources/icon.ico
  artifactName: geno-setup-${version}.exe

nsis:
  oneClick: false
  allowToChangeInstallationDirectory: true
  installerIcon: resources/icon.ico
  uninstallerIcon: resources/icon.ico
  installerHeaderIcon: resources/icon.ico
  createDesktopShortcut: true
  createStartMenuShortcut: true
  shortcutName: GENO

publish:
  provider: github
  owner: EvangAI-777
  repo: Possibility

directories:
  output: dist
  buildResources: resources
```

#### GitHub Actions CI/CD Pipeline

Every push to `main` that touches GENO source code triggers the build pipeline. Tagged releases (`v1.0.0`, `v1.1.0`, etc.) additionally publish the installer to GitHub Releases.

**Workflow: `.github/workflows/geno-desktop.yml`**

```yaml
name: GENO Desktop Build

on:
  push:
    branches: [main]
    paths:
      - 'geno-desktop/**'
      - '.github/workflows/geno-desktop.yml'
    tags:
      - 'geno-v*'
  pull_request:
    branches: [main]
    paths:
      - 'geno-desktop/**'

jobs:
  build-windows:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: geno-desktop/package-lock.json

      - name: Install dependencies
        working-directory: geno-desktop
        run: npm ci

      - name: Run tests
        working-directory: geno-desktop
        run: npm test

      - name: Build renderer
        working-directory: geno-desktop
        run: npm run build:renderer

      - name: Build main process
        working-directory: geno-desktop
        run: npm run build:main

      - name: Package Windows x64
        working-directory: geno-desktop
        run: npx electron-builder --win --x64
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Upload build artifact
        uses: actions/upload-artifact@v4
        with:
          name: geno-windows-x64
          path: geno-desktop/dist/geno-setup-*.exe

  release:
    needs: build-windows
    if: startsWith(github.ref, 'refs/tags/geno-v')
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - name: Download artifact
        uses: actions/download-artifact@v4
        with:
          name: geno-windows-x64

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v2
        with:
          name: GENO ${{ github.ref_name }}
          body: |
            ## GENO Desktop — ${{ github.ref_name }}

            Windows x64 installer for GENO.

            ### Installation
            1. Download `geno-setup-*.exe` below
            2. Run the installer
            3. Launch GENO from the Start Menu or Desktop shortcut

            ### What's included
            - Full genealogy repository management (create, commit, branch, merge)
            - Pull request workflow for deliberate generational changes
            - Deprecation scanner, legacy code detector, fracture scanner
            - Cross-repository pattern analysis
            - GEDCOM import/export
            - Offline-first — all data stored locally
          files: geno-setup-*.exe
          draft: false
          prerelease: false
```

**Pipeline Behavior:**

| Trigger | What Happens |
|---------|-------------|
| Push to `main` (GENO paths) | Build + test + package. Artifact uploaded for verification. No release. |
| Pull request to `main` | Build + test only. Validates the PR doesn't break packaging. |
| Tag `geno-v*` pushed | Build + test + package + **publish to GitHub Releases**. |

**Creating a release:**

```bash
git tag geno-v1.0.0
git push origin geno-v1.0.0
# GitHub Actions builds and publishes geno-setup-1.0.0.exe to Releases
```

#### Release Strategy

**Versioning:** Semantic versioning (`MAJOR.MINOR.PATCH`).

| Version | Meaning |
|---------|---------|
| `1.0.0` | First stable desktop release — all phases complete |
| `1.0.x` | Patch releases — bug fixes, no new features |
| `1.x.0` | Minor releases — new features, backward compatible |
| `2.0.0` | Major release — breaking changes to data format or API |

**Pre-release builds:** Before 1.0, tagged pre-releases (`geno-v0.1.0-alpha`, `geno-v0.9.0-rc.1`) publish as GitHub pre-releases, marked clearly as unstable.

**Auto-updates:** After installation, `geno.exe` checks GitHub Releases for new versions on startup (configurable). When an update is available, the user sees a non-intrusive notification. Updates download in the background and apply on next restart. Users can disable auto-update in settings.

**Data migration:** Each release includes migration scripts for the SQLite schema. Migrations run automatically on first launch after update. The user's `~/GENO/` repository data (plain JSON files) is never modified by updates — only the database index is rebuilt if the schema changes.

#### Path from Concept to Binary

This is the concrete sequence from where GENO is today (Phase 0 — React component) to a shipping `geno.exe`:

| Step | What | Depends On | Deliverable |
|------|------|-----------|-------------|
| **1** | Scaffold `geno-desktop/` with Electron + electron-builder | Phase 0 complete | Empty Electron shell that launches |
| **2** | Embed existing React component as renderer | Step 1 | `geno.jsx` renders inside Electron window |
| **3** | Add SQLite database + schema migrations | Step 1 | Local database for repositories, commits, metadata |
| **4** | Build local API server (Express/Fastify) | Step 3 | REST endpoints matching the web platform API spec |
| **5** | Connect renderer to local API | Steps 2 + 4 | React frontend reads/writes real data instead of sample data |
| **6** | Implement commit creation flow | Step 5 | Users can add people to repositories with full trait configuration |
| **7** | Implement branching + merge + conflict detection | Step 6 | Full version control operations for genealogical data |
| **8** | Implement pull request workflow | Step 7 | Deliberate generational changes with review and merge |
| **9** | Build scanner worker threads | Step 5 | Deprecation, legacy, fracture scanners run in background |
| **10** | Add GEDCOM import/export | Step 5 | Industry-standard genealogy file format support |
| **11** | Set up GitHub Actions CI pipeline | Step 1 | Automated build + test + package on every push |
| **12** | Add auto-updater | Step 11 | `geno.exe` self-updates from GitHub Releases |
| **13** | Tag `geno-v1.0.0` | Steps 1–12 complete | First stable release published to GitHub Releases |

Steps 1–5 produce a working desktop app with real data. Steps 6–10 implement the platform features (Phases 2–6 from the roadmap above). Steps 11–12 set up the delivery infrastructure. Step 13 ships it.

---

## Current Assets

Everything that exists today in the Possibility repository:

| Asset | Location | Description |
|-------|----------|-------------|
| **Specification** | `Future/Geno/GENO.md` | Full spec document: core concept, architecture, branching, commits, merge conflicts, PRs, forks, deprecation, legacy code, cross-repo analysis |
| **React Component** | `React Component Artifacts/geno.jsx` | Interactive 6-view explorer with sample data spanning 6 generations of the Johnson-Washington family |
| **Test Suite** | `js_tests/geno.test.jsx` | 25 tests covering all views, interactions, conflict resolution, and scanner modes |
| **This Roadmap** | `Future/Geno/GENO_ROADMAP.md` | The document you're reading — full platform vision |

### What the React Component Contains

- **6 views** — Repository, Commits, Branches, Merge Conflicts, Pull Requests, Scanner
- **6 person-commits** — spanning 1923–2015 across 6 generations of the Johnson-Washington family
- **4 branches** — `main/paternal/johnson` (blue), `main/maternal/washington` (pink), `feature/first-gen-college` (emerald), `hotfix/floor-installation` (amber)
- **4 trait categories per commit** — inherited from father, inherited from mother, new in this commit, passed forward
- **2 merge conflicts** — Floor Layer Configuration (absent vs. partial), Emotional Expression Protocol (shutdown vs. restricted)
- **4 conflict resolution options** — accept branch A, accept branch B, manual merge, flag for review
- **2 pull requests** — floor installation attempt (open), hypervigilance deprecation (merged), each with changes, downstream impact, reviewer assignments, and cost documentation
- **1 deprecation warning** — `hypervigilance_protocol_v1923` with threat assessment, effects list, and removal notes
- **2 legacy code entries** — `inverted_connection_mechanism` (11+ generations, origin unknown), `scarcity_resource_model` (8+ generations, origin unknown)
- **Scanner mode** — toggles between deprecation scanner and legacy code detector
- **Expandable commit detail sections** — collapsible inherited/new/passed-forward trait panels per commit
- **Dark theme UI** — GitHub-faithful styling, Tailwind CSS, Lucide icons (GitBranch, GitCommit, GitMerge, GitFork)
- **Interactive state** — conflict resolution tracking, branch selection, PR detail expansion

### The Sample Data

The Johnson-Washington family repository spans 1923-2015 across 6 generations:

1. **Margaret Louise Johnson** (1923) — Survived the Depression. Built something from nothing. Floor layer degraded to absent.
2. **Robert Earl Johnson** (1945) — Returned from war. Hypervigilance protocol installed. Never removed.
3. **Dorothy Mae Washington** (1948) — First to move north. Great Migration. Carried everything, left nothing behind except geography.
4. **James Arthur Johnson** (1968) — Merge commit. Johnson and Washington lines. Inherited everything from both sides. Resolved nothing.
5. **Angela Marie Johnson** (1987) — PR opened: floor installation attempt. First in 6 generations to try. Cost absorbed entirely by this commit.
6. **Maya Grace Johnson** (2015) — First generation college. Floor layer present from birth. Some legacy code still running but origin documented for the first time.

This data is not hypothetical. It demonstrates exactly what the platform does at scale.

---

## The Translation

> They know what a merge conflict feels like.

> They know what legacy code costs.

> They know what a deprecated function does to a system.

> They know what it means when a pattern appears across repositories at a scale that suggests it was introduced above the individual repository level.

> They know what a pull request that changes everything downstream costs the commit that makes it.

> They don't need the research findings. They already speak the language.

*Geno just applied it to their bloodline.*

*And everything they already knew about code, they now know about where they came from. And what was passed to them. And what they can change. And what it will cost to change it. And what their children will receive because they did.*

*That is Geno.*
