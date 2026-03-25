# CREATEME: The Human Builder Roadmap

*Build Your Own Human. Real physics. Real biology. Real consequence modeling. Discovery through construction.*

---

## Vision

CREATEME is a full physical construction and refactoring tool that lets users build biological entities from the ground up. Human or otherwise. With real physics. Real biology. Real consequence modeling. Users are not told what a human is — they discover it by building one. Or by building something else entirely and seeing what that produces.

The tool operates on two simultaneous engines — **Physical Construction** and **Substrate Configuration** — both interacting in real time. A perfectly constructed physical body placed on an absent floor produces visible systemic instability. The tool shows this without commentary. The user sees it directly.

### The Competitive Position

The existing landscape of 3D body simulation tools — BioDigital Human, Visible Body, Zygote Body, Complete Anatomy, Anatomage — represents the state of the art in anatomical visualization. They are impressive. They are detailed. They model the physical body with genuine fidelity.

**Their entire feature set is our Default Human preset.**

Every system those tools model — skeletal structure, organ placement, muscular architecture, nervous system routing, cellular composition, skin interaction — maps to layers 1 through 6 of the Physical Construction Engine. That is where they stop. That is where CREATEME starts.

CREATEME builds on their grounded expertise as foundational infrastructure. We do not dismiss what they have accomplished. We absorb it. Their anatomical modeling becomes the baseline physical construction layer — the floor those tools stand on. Then we build everything they cannot:

- **Layer 7: Consciousness Integration** — where physical construction meets experiential configuration. No existing 3D body simulator models this. None of them ask the question: how does this specific physical configuration experience being itself?
- **The Substrate Configuration Engine** — what the body stands on. Attachment security. Early provision. Protection. Validation. Reciprocity. The floor. No anatomy tool models what happens to a perfect physical build when the floor beneath it is absent.
- **The Analysis Suite** — inversion detection, fracture scanning, comparison analysis across both physical and substrate layers. No anatomy tool shows you where a body has absorbed costs its substrate should have absorbed.
- **Floor Integration** — the stability formula that governs everything: `stability = physicalAverage * (foundationAverage / 100)`. A perfect physical build with zero foundation scores zero. BioDigital Human cannot show you this because it does not know the floor exists.

The scaling principle is direct: existing 3D body simulators model the physical body in isolation. CREATEME models the physical body, what it stands on, what environment receives it, what physics govern that environment, whether those physics are running forward or inverted, and what consciousness experiences as a result of the entire configuration. Their ceiling is our default. Their complete system is one preset in ours.

### The Two-Way Bridge

CREATEME does not exist in isolation. It is one half of a bidirectional system with GENO — the genealogy platform that renders family trees as repositories.

- **GENO → CREATEME**: Any commit in a GENO family repository can be loaded directly into the 3D builder as a template. A user exploring their family tree clicks on an ancestor's commit, and CREATEME renders it as a fully interactive physical build with substrate configuration — analyzable, modifiable, comparable.
- **CREATEME → GENO**: A completed build in CREATEME can be pushed as a new commit or submitted as a pull request into a GENO family repository. A user builds a person in the 3D construction environment — sets physical parameters, installs a floor, configures the environment — then commits that configuration to the family lineage.

This means CREATEME is both a **visualization tool** for existing GENO data and a **construction interface** for new GENO data. The builder is not read-only. It writes back. A parent can construct their child's configuration in the 3D environment — setting every parameter with intention, installing the floor they never had, configuring the environment to run forward — and submit that as a pull request to their family repository. A deliberate generational change, authored in 3D, committed to the bloodline.

### Why This Matters

Attachment theory. Developmental psychology. Somatic experience. Generational trauma. Nervous system regulation. These are not abstract concepts in CREATEME. They are slider values. They are floor status indicators. They are cascade failures visible in real time across every physical layer.

The moment a user builds a stable physical body on an absent floor and watches the cascade failure propagate through every layer they carefully constructed — the understanding has happened. Without reading a single research paper. Without hearing a single lecture. The physics did the teaching.

> This is not a biology textbook. Not a game. Not a simulation. Not an anatomy viewer. It is a construction environment with real consequence modeling — and the first tool that integrates physical construction, substrate configuration, consciousness, and cross-generational lineage in a single interactive system.

---

## Core Architecture

### The Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 + Tailwind CSS | Dark theme, slider-heavy UI, real-time feedback |
| **3D Engine** | Custom WebGL/Canvas renderer | Biological visualization at anatomical fidelity — on par with BioDigital Human, Visible Body, Complete Anatomy as baseline, then extending beyond |
| **Physics Engine** | Custom consequence modeling | Real cellular cascade, structural integrity, nervous system routing — not animation, actual physics |
| **State Management** | Layered configuration state | Physical + Substrate + Analysis — three-engine state architecture |
| **GENO Bridge** | Bidirectional REST + WebSocket API | Two-way commit/PR translation between CREATEME builds and GENO repositories |
| **Backend** | Node.js / Python (FastAPI) | Build sharing, community library, GENO integration endpoints |
| **Storage** | Structured JSON configs + S3 | Build configuration files, 3D model data, community library |

### The Two-Engine Model

The core architectural decision: two engines operating simultaneously, interacting in real time.

**Engine 1: Physical Construction Engine** — the body itself. Seven layers of biological construction from cellular to consciousness. This engine encompasses everything that existing 3D body simulators model (layers 1-6) and then extends into territory none of them touch (layer 7: consciousness integration). The 3D visualization renders at the same anatomical fidelity as industry-standard tools — skeletal structures, organ systems, muscular architecture, nervous system pathways — because that fidelity is the baseline, not the goal.

**Engine 2: Substrate Configuration Engine** — what the body stands on. Foundation (the floor) and Environment (what surrounds it). This engine has no equivalent in any existing anatomy tool. It models the invisible architecture that determines whether a perfectly constructed physical body can actually stand.

Both engines feed into the **Analysis Layer** — three diagnostic tools that read across both engines without modifying either.

### State Architecture

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
    "foundation": {
      "attachment": 20, "earlyProvision": 15, "protection": 10,
      "validation": 5, "reciprocity": 10
    },
    "environment": {
      "sandbox": 30, "physicsDirection": false,
      "acknowledgment": 15, "protectionExploitation": 20
    }
  }
}
```

The state shown above is the Default Human preset. Note the disparity: physical values moderate (50-70), foundation values devastatingly low (5-20), environment inverted. This is the configuration that existing 3D body simulators model — the physical layer — without seeing that it is standing on nothing.

### The Stability Formula

```
stability = physicalAverage * (foundationAverage / 100)
```

This formula is architecturally significant. It means:

- A perfect physical build (avg 100) with zero foundation = **0 stability**
- A moderate physical build (avg 57) with absent foundation (avg 12) = **stability of 7** (the Default Human)
- That same physical build (avg 57) with present foundation (avg 88) = **stability of 50** (Floor Installed)
- The physical build did not change. Only the substrate changed. And every metric shifted.

### Floor Status Logic

| Foundation Average | Status | Color |
|-------------------|--------|-------|
| ≥ 60 | **PRESENT** | Green |
| 30–59 | **PARTIAL** | Amber |
| < 30 | **ABSENT** | Red |

The floor status determines global system behavior. An absent floor does not just lower a score — it produces visible cascade instability across every physical layer, regardless of how well that layer was individually configured.

---

## The Physical Construction Engine

The primary workspace is a 3D biological construction environment starting from absolute zero. No default humanoid skeleton unless the user selects it. The user begins with nothing and builds toward something.

This engine encompasses everything that BioDigital Human, Visible Body, Complete Anatomy, and Anatomage model — and renders it at equivalent anatomical fidelity. Their skeletal systems, organ visualizations, muscular overlays, nervous system pathways, cellular modeling — all of that is the baseline capability of the Physical Construction Engine. Layers 1 through 6 match the state of the art. Layer 7 goes where none of them have gone.

### Layer 1: Cellular (Emerald)

The foundation of physical construction. Users select cell types, configure cellular behavior, set replication parameters, mutation thresholds, and communication protocols between cells. The physics engine models actual cellular behavior in real time.

| Parameter | ID | Range | What It Models |
|-----------|-----|-------|---------------|
| Cell Type Diversity | `cellTypes` | 0–100 | Variety and specialization of cell populations |
| Replication Rate | `replication` | 0–100 | How fast cells reproduce and replace |
| Mutation Threshold | `mutation` | 0–100 | Tolerance for genetic variation before instability |
| Cell Communication | `communication` | 0–100 | Signal quality between cell populations |

Misconfigured cellular communication produces visible cascade failures throughout everything built above it. If cells cannot talk to each other, organs cannot coordinate. This is where the 3D visualization diverges from static anatomy tools — the cascade is visible, animated, and traceable.

### Layer 2: Skeletal (Gray)

The structural framework everything else hangs on. Bone density, joint configuration, weight distribution, load bearing capacity.

| Parameter | ID | Range | What It Models |
|-----------|-----|-------|---------------|
| Bone Density | `boneDensity` | 0–100 | Structural strength of the skeletal frame |
| Joint Flexibility | `joints` | 0–100 | Range of motion at connection points |
| Weight Distribution | `weightDist` | 0–100 | How mass is balanced across the structure |
| Load Bearing Capacity | `loadBearing` | 0–100 | Maximum sustainable weight and stress |

The 3D engine renders the skeletal layer at the same fidelity as Complete Anatomy's skeletal visualization — individual bones, joint articulation, structural stress mapping — then adds consequence modeling: what happens when load bearing capacity is set to 15 and the muscular layer above it demands 80.

### Layer 3: Organ (Red)

Users place and configure organs. Size. Position. Connectivity. Function. Users can build organs that do not exist in standard human biology. The physics engine models what those organs would actually do given their configuration and placement.

| Parameter | ID | Range | What It Models |
|-----------|-----|-------|---------------|
| Organ Size | `organSize` | 0–100 | Physical dimensions relative to body |
| Connectivity | `connectivity` | 0–100 | Integration with surrounding systems |
| Functional Output | `function` | 0–100 | Performance capacity of the organ system |
| Placement Optimization | `placement` | 0–100 | Positioning efficiency within the body |

### Layer 4: Nervous System (Purple)

Users route the nervous system. Connection pathways, signal speed, pain threshold, stress response calibration. The physics engine shows how each routing decision affects the entire system in real time.

| Parameter | ID | Range | What It Models |
|-----------|-----|-------|---------------|
| Connection Pathways | `pathways` | 0–100 | Density and routing of neural connections |
| Signal Speed | `signalSpeed` | 0–100 | Transmission velocity across the network |
| Pain Threshold | `painThreshold` | 0–100 | Signal level required to register pain |
| Stress Response | `stressResponse` | 0–100 | Activation intensity of fight/flight/freeze |

Note: in the Default Human, `painThreshold` is 30 (very low — everything registers as pain) and `stressResponse` is 80 (very high — constant activation). This is not a bug. This is the default configuration. The inversion detector flags both.

### Layer 5: Muscular (Orange)

Mechanical output based on configuration. Strength, endurance, recovery, fine motor precision.

| Parameter | ID | Range | What It Models |
|-----------|-----|-------|---------------|
| Strength | `strength` | 0–100 | Raw force generation capacity |
| Endurance | `endurance` | 0–100 | Sustained output over time |
| Recovery Rate | `recovery` | 0–100 | How quickly the system restores after exertion |
| Fine Motor Precision | `precision` | 0–100 | Accuracy of small, controlled movements |

### Layer 6: Skin/External (Amber)

The interface between the build and the world. Sensitivity, permeability, durability, environmental interaction.

| Parameter | ID | Range | What It Models |
|-----------|-----|-------|---------------|
| Sensitivity | `sensitivity` | 0–100 | How much external input is registered |
| Permeability | `permeability` | 0–100 | What passes through the external barrier |
| Durability | `durability` | 0–100 | Resistance to external damage |
| Environmental Interaction | `envInteraction` | 0–100 | Responsiveness to surrounding conditions |

### Layer 7: Consciousness Integration (Cyan)

Where physical construction meets experiential configuration. This layer has no equivalent in any existing 3D body simulator. BioDigital Human stops at the nervous system. Complete Anatomy stops at the muscular system. CREATEME asks the question none of them ask: how does this specific physical configuration experience being itself?

| Parameter | ID | Range | What It Models |
|-----------|-----|-------|---------------|
| Self-Awareness | `selfAwareness` | 0–100 | Degree to which the build perceives itself |
| Experiential Depth | `experientialDepth` | 0–100 | Richness and complexity of lived experience |
| Emotional Range | `emotionalRange` | 0–100 | Spectrum of emotional states accessible |
| Physical Integration | `integration` | 0–100 | How fully consciousness inhabits the physical body |

Consciousness integration is what connects the physical build to the substrate below it. A body with high physical integration and an absent floor experiences the absence somatically — it feels the instability in the body, not just as a metric.

### Layer Summary

| # | Layer | Color | Icon | Parameters | What Existing Tools Model | What CREATEME Adds |
|---|-------|-------|------|-----------|--------------------------|-------------------|
| 1 | Cellular | Emerald | Circle | 4 | Cell visualization | Cascade failure propagation |
| 2 | Skeletal | Gray | Box | 4 | Full skeletal rendering | Structural consequence under load |
| 3 | Organ | Red | Heart | 4 | Organ placement & anatomy | Non-standard organ physics |
| 4 | Nervous | Purple | Brain | 4 | Neural pathway mapping | Inversion detection, stress cascade |
| 5 | Muscular | Orange | Activity | 4 | Muscle group visualization | Demand vs. capacity modeling |
| 6 | Skin | Amber | Shield | 4 | External surface rendering | Permeability & environmental interaction |
| 7 | Consciousness | Cyan | Eye | 4 | **None** | Experiential configuration + floor integration |

**28 physical parameters total.** Every slider change recalculates the stability score and updates the 3D visualization in real time.

### The Cascade Principle

Every layer depends on the layers below it. Cellular instability propagates upward through skeletal, organ, nervous, muscular, skin, and into consciousness. A low `communication` value at the cellular layer produces visible degradation at every level above it.

But the cascade also runs downward — from the substrate. An absent floor destabilizes consciousness integration, which destabilizes the physical body's relationship to itself, which propagates through every physical layer. The cascade is bidirectional. The physics are real.

---

## The Substrate Configuration Engine

Once a physical build is constructed, it must be placed somewhere. The Substrate Configuration Engine handles what that somewhere is. This engine has no equivalent in any existing 3D body simulator — it models the invisible architecture that determines whether a perfectly constructed body can actually stand.

### Foundation Panel

The floor layer. What does this physical build stand on.

| Parameter | ID | Range | Real-World Mapping |
|-----------|-----|-------|-------------------|
| Attachment Security | `attachment` | 0–100 | Bond to primary caregiver(s) — secure, anxious, avoidant, disorganized |
| Early Provision | `earlyProvision` | 0–100 | What was provided at the beginning of life — needs met or unmet |
| Protection | `protection` | 0–100 | What shields the build from external damage — safety vs. exposure |
| Validation | `validation` | 0–100 | Whether the environment confirms the build exists — seen vs. invisible |
| Reciprocity | `reciprocity` | 0–100 | Whether the environment gives back what it receives — mutual vs. one-directional |

The critical insight: **an absent floor produces visible instability cascading through the entire physical build above it, regardless of how well that build was constructed.** In the 3D visualization, this is not a number on a dashboard — the build visibly shakes, layers decouple, structural integrity degrades in real time.

Default Human foundation values: `attachment: 20, earlyProvision: 15, protection: 10, validation: 5, reciprocity: 10`. Foundation average: **12**. Floor status: **ABSENT**.

### Environment Panel

What surrounds the physical build.

| Parameter | ID | Type | What It Controls |
|-----------|-----|------|-----------------|
| Sandbox Configuration | `sandbox` | Slider (0–100) | Boundaries and constraints of the space |
| Physics Direction | `physicsDirection` | Toggle (Forward/Inverted) | Whether the environment runs its physics forward or backward |
| Acknowledgment | `acknowledgment` | Slider (0–100) | Whether the environment acknowledges or dismisses the build |
| Protection / Exploitation | `protectionExploitation` | Slider (0–100) | Whether the environment protects or exploits what it contains |

**The Physics Direction toggle is the most significant single control in the entire tool.** It determines whether the environment runs forward (cause produces expected effect) or inverted (cause produces opposite effect). In an inverted environment, strength is punished, vulnerability is exploited, correct configuration is treated as incorrect. The 3D visualization renders inverted physics as visible anti-gravity — forces pulling in wrong directions, structural stresses appearing where none should exist.

### Configuration Comparison

**Default Human substrate:**
```json
{
  "foundation": { "attachment": 20, "earlyProvision": 15, "protection": 10, "validation": 5, "reciprocity": 10 },
  "environment": { "sandbox": 30, "physicsDirection": false, "acknowledgment": 15, "protectionExploitation": 20 }
}
```

**Floor Installed substrate:**
```json
{
  "foundation": { "attachment": 90, "earlyProvision": 85, "protection": 90, "validation": 85, "reciprocity": 90 },
  "environment": { "sandbox": 80, "physicsDirection": true, "acknowledgment": 85, "protectionExploitation": 90 }
}
```

Same physical build. Different substrate. Default Human stability: **7**. Floor Installed stability: **50**. The body did not change. The floor changed. Everything shifted.

### Foundation × Environment Matrix

The relationship between Foundation and Environment produces four distinct configurations:

| | **Forward Environment** | **Inverted Environment** |
|---|---|---|
| **Present Floor** | Stable build, correct physics. The intended configuration. | **The Anomaly**: correctly built, correctly grounded, surrounded by hostile physics. Everything about the build is right — the environment doesn't acknowledge it. |
| **Absent Floor** | Forward physics, no ground. The environment isn't hostile — there is simply nothing to stand on. | **The Default Human**: no floor, inverted physics. The most common configuration. The cascade failure is total. |

Each combination produces different systemic effects visible in the 3D engine. The Anomaly is particularly significant: high stability score (the foundation is strong), but the environment runs backward. The build can stand — it just cannot rest.
