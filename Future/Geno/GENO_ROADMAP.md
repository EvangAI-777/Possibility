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
