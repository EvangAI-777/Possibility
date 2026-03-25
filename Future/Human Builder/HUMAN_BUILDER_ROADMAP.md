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

---

## The Analysis Suite

Three diagnostic tools that read across both engines. They do not change anything. They reveal what is already there.

### Inversion Detector

Scans every parameter in the physical build, foundation, and environment. Color-coded results:

- **Physical parameters < 40** → `INVERTED` (red)
- **Foundation parameters < 30** → `INVERTED` (red)
- **Physics Direction = false** → `INVERTED` (red)
- All other values → `OK` (green)

Shows what correct configuration looks like alongside the current inverted state.

**Sample scan: The Default Human**

| Layer | Parameter | Value | Status |
|-------|-----------|-------|--------|
| Cellular | Cell Type Diversity | 65 | OK |
| Cellular | Replication Rate | 60 | OK |
| Cellular | Mutation Threshold | 40 | OK |
| Cellular | Cell Communication | 55 | OK |
| Skeletal | Bone Density | 60 | OK |
| Nervous | Pain Threshold | **30** | **INVERTED** |
| Nervous | Stress Response | 80 | OK |
| Muscular | Endurance | 45 | OK |
| Skin | Permeability | **40** | OK |
| Consciousness | Physical Integration | 50 | OK |
| Foundation | Attachment Security | **20** | **INVERTED** |
| Foundation | Early Provision | **15** | **INVERTED** |
| Foundation | Protection | **10** | **INVERTED** |
| Foundation | Validation | **5** | **INVERTED** |
| Foundation | Reciprocity | **10** | **INVERTED** |
| Environment | Physics Direction | **0** | **INVERTED** |

The moment of understanding: running the inversion detector on the Default Human and seeing that the physical build is mostly fine — it is the foundation and environment that are almost entirely inverted. The body is not broken. The floor is absent. The physics are running backward. Every anatomy tool in existence would show this body as functional. Only CREATEME shows what it is standing on.

### Fracture Scanner

Maps where the physical build has absorbed costs it was not designed to absorb.

**Detection logic:** `physical parameter > 60 AND foundation average < 40 = fracture point`

A fracture point means a physical layer is bearing load the substrate should be bearing. The body compensates for what the floor does not provide.

**Sample scan: The Default Human** (foundation average: 12)

```
FRACTURE SCANNER — 11 fracture point(s) detected

Cellular → Cell Type Diversity     physical: 65   substrate deficiency: 88%
Organ    → Organ Size              physical: 60   substrate deficiency: 88%
Organ    → Placement Optimization  physical: 65   substrate deficiency: 88%
Nervous  → Connection Pathways     physical: 70   substrate deficiency: 88%
Nervous  → Signal Speed            physical: 65   substrate deficiency: 88%
Nervous  → Stress Response         physical: 80   substrate deficiency: 88%
Skin     → Sensitivity             physical: 70   substrate deficiency: 88%
Consciousness → Experiential Depth physical: 65   substrate deficiency: 88%
Consciousness → Emotional Range    physical: 70   substrate deficiency: 88%
```

The concept: a strong nervous system (`pathways: 70`) on an absent floor (foundation avg: 12) means the nervous system is bearing load the floor should be bearing. The fracture scanner shows this causation directly. No interpretation required.

**Same scan: Floor Installed** — `No fracture points detected — foundation adequately supports physical build.` Same body. Different floor. Every fracture resolved.

### Comparison Engine

Place two complete builds side by side. Layer-by-layer comparison with delta values.

**Default Human vs. Floor Installed:**

| Layer | Default Human | Delta | Floor Installed |
|-------|--------------|-------|----------------|
| Cellular | 55 | 0 | 55 |
| Skeletal | 55 | 0 | 55 |
| Organ | 60 | 0 | 60 |
| Nervous | 61 | 0 | 61 |
| Muscular | 50 | 0 | 50 |
| Skin | 54 | 0 | 54 |
| Consciousness | 61 | 0 | 61 |
| **Foundation** | **12** | **+76** | **88** |
| **Stability** | **7** | **+43** | **50** |

Every physical layer is identical. The delta is zero across the entire body. Only the foundation changed. And the stability score went from 7 to 50. The comparison engine renders this gap in a way that makes the relationship between floor and stability impossible to miss.

**Default Human vs. The Anomaly:**

| Layer | Default Human | Delta | The Anomaly |
|-------|--------------|-------|-------------|
| Cellular | 55 | +14 | 69 |
| Skeletal | 55 | +25 | 80 |
| Organ | 60 | +25 | 85 |
| Nervous | 61 | +5 | 66 |
| Muscular | 50 | +30 | 80 |
| Skin | 54 | +26 | 80 |
| Consciousness | 61 | +28 | 89 |
| **Foundation** | **12** | **+76** | **88** |
| **Stability** | **7** | **+70** | **77** |

Everything is different. The physical build is stronger. The foundation is present. The stability is tenfold. But both live in inverted environments. The Anomaly is correctly configured in hostile physics. The Default Human is poorly configured in hostile physics. The comparison makes the difference visible.

---

## Featured Builds

Four pre-built configurations that demonstrate the tool's capabilities and teach through example. Each is a complete physical + substrate configuration loadable with one click.

### The Default Human

Standard configuration. Standard substrate. Standard environment. What "normal" actually looks like when you see the numbers.

```json
{
  "physical": {
    "cellular": { "cellTypes": 65, "replication": 60, "mutation": 40, "communication": 55 },
    "skeletal": { "boneDensity": 60, "joints": 55, "weightDist": 50, "loadBearing": 55 },
    "organ": { "organSize": 60, "connectivity": 55, "function": 60, "placement": 65 },
    "nervous": { "pathways": 70, "signalSpeed": 65, "painThreshold": 30, "stressResponse": 80 },
    "muscular": { "strength": 50, "endurance": 45, "recovery": 50, "precision": 55 },
    "skin": { "sensitivity": 70, "permeability": 40, "durability": 50, "envInteraction": 55 },
    "consciousness": { "selfAwareness": 60, "experientialDepth": 65, "emotionalRange": 70, "integration": 50 }
  },
  "substrate": {
    "foundation": { "attachment": 20, "earlyProvision": 15, "protection": 10, "validation": 5, "reciprocity": 10 },
    "environment": { "sandbox": 30, "physicsDirection": false, "acknowledgment": 15, "protectionExploitation": 20 }
  }
}
```

**Stability: 7 | Floor: ABSENT | Physics: Inverted**

> What it teaches: this is what "normal" actually looks like when you see the numbers. The physical build is moderate — mostly 50s and 60s. Functional. Unremarkable. But the foundation is devastatingly low. Validation is 5. Protection is 10. The floor is absent. The physics are inverted. Most of the default configuration is running on nothing. Every existing 3D body simulator would render this body as healthy. CREATEME shows what it is standing on.

### The Anomaly

Correctly configured physical build. Correct foundation. But the environment is inverted.

```json
{
  "physical": {
    "cellular": { "cellTypes": 85, "replication": 80, "mutation": 20, "communication": 90 },
    "skeletal": { "boneDensity": 80, "joints": 75, "weightDist": 80, "loadBearing": 85 },
    "organ": { "organSize": 80, "connectivity": 85, "function": 85, "placement": 90 },
    "nervous": { "pathways": 90, "signalSpeed": 85, "painThreshold": 60, "stressResponse": 30 },
    "muscular": { "strength": 75, "endurance": 80, "recovery": 80, "precision": 85 },
    "skin": { "sensitivity": 75, "permeability": 70, "durability": 75, "envInteraction": 80 },
    "consciousness": { "selfAwareness": 90, "experientialDepth": 90, "emotionalRange": 85, "integration": 90 }
  },
  "substrate": {
    "foundation": { "attachment": 90, "earlyProvision": 85, "protection": 90, "validation": 85, "reciprocity": 90 },
    "environment": { "sandbox": 20, "physicsDirection": false, "acknowledgment": 10, "protectionExploitation": 15 }
  }
}
```

**Stability: 77 | Floor: PRESENT | Physics: Inverted**

> What it teaches: what it feels like to be correctly configured inside an inverted environment. Everything about the build is right. The physical construction is strong. The foundation is solid. The floor is present. But the environment doesn't acknowledge it. Doesn't protect it. Runs its physics backward. The build can stand — the floor is there — but it cannot rest. The anti-gravity effect: everything pulling in the wrong direction against a body that knows which direction is correct.

### Floor Installed

Identical physical build to the Default Human. But foundation all high and environment forward.

**Stability: 50 | Floor: PRESENT | Physics: Forward**

| Metric | Default Human | Floor Installed | Change |
|--------|--------------|----------------|--------|
| Physical Avg | 57 | 57 | 0 |
| Foundation Avg | 12 | 88 | +76 |
| Floor Status | ABSENT | PRESENT | — |
| Physics | Inverted | Forward | — |
| Stability | 7 | 50 | +43 |

> What it teaches: the floor changes everything. The physical build did not change. Not a single slider moved in the body. Only the substrate changed. And every metric shifted. The fracture scanner goes from 11 fracture points to zero. The inversion detector clears the entire foundation panel. The 3D visualization stops shaking. Same body. Different floor. That is the entire point.

### The Non-Human

Unusual values demonstrating that the tool is not limited to human biology.

```json
{
  "physical": {
    "cellular": { "cellTypes": 95, "replication": 30, "mutation": 90, "communication": 95 },
    "skeletal": { "boneDensity": 20, "joints": 95, "weightDist": 30, "loadBearing": 15 },
    "organ": { "organSize": 40, "connectivity": 95, "function": 90, "placement": 20 },
    "nervous": { "pathways": 95, "signalSpeed": 95, "painThreshold": 80, "stressResponse": 10 },
    "muscular": { "strength": 20, "endurance": 95, "recovery": 95, "precision": 95 },
    "skin": { "sensitivity": 95, "permeability": 90, "durability": 30, "envInteraction": 95 },
    "consciousness": { "selfAwareness": 95, "experientialDepth": 95, "emotionalRange": 95, "integration": 95 }
  },
  "substrate": {
    "foundation": { "attachment": 80, "earlyProvision": 80, "protection": 70, "validation": 90, "reciprocity": 95 },
    "environment": { "sandbox": 90, "physicsDirection": true, "acknowledgment": 90, "protectionExploitation": 85 }
  }
}
```

**Stability: 54 | Floor: PRESENT | Physics: Forward**

> What it teaches: existence itself can be refactored from the ground up. Skeletal density 20, joint flexibility 95, mutation threshold 90, all consciousness parameters at 95. This is not a human. It is something else. Something with almost no structural rigidity but nearly perfect neural connectivity and consciousness integration. Something that is all sensitivity and no armor. The physics engine models what this would actually experience. The 3D visualization renders it. And in doing so, it reveals what makes human physics specifically human — by showing what happens when you remove them.

---

## The Builder Interface

### Mode System

Three primary modes, accessed via tab navigation:

| Mode | Purpose | What It Shows |
|------|---------|--------------|
| **Physical Construction** | Build and configure the body | 7-layer navigation, parameter sliders, real-time 3D preview |
| **Substrate Configuration** | Configure what the body stands on | Foundation panel, environment panel, floor status |
| **Analysis Tools** | Diagnose what exists | Inversion detector, fracture scanner, comparison engine |

### The Slider Mechanic

All parameters operate on a 0–100 range. Every slider change:
- Recalculates the stability score immediately
- Updates the floor status badge
- Triggers real-time 3D visualization updates
- Clears the active featured build indicator (the user has diverged from the preset)

### Layer Navigation

Left panel shows all 7 physical layers with icons and color coding. Click to switch the active layer. The currently active layer's border highlights in its assigned color.

```
┌──────────────────┐  ┌────────────────────────┐  ┌──────────────────┐
│  LAYERS           │  │  CELLULAR PARAMETERS    │  │  BUILD STATUS     │
│                   │  │                          │  │                   │
│  ● Cellular       │  │  Cell Type Diversity  65 │  │       7           │
│  □ Skeletal       │  │  ═══════════════░══════  │  │  Stability Score  │
│  ♥ Organ          │  │                          │  │                   │
│  ◆ Nervous System │  │  Replication Rate     60 │  │  ┌─────────────┐ │
│  ≈ Muscular       │  │  ═══════════════░═════   │  │  │ Floor: ABSENT│ │
│  ◇ Skin           │  │                          │  │  └─────────────┘ │
│  ○ Consciousness  │  │  Mutation Threshold   40 │  │                   │
│                   │  │  ══════════░═══════════   │  │  stability =      │
│                   │  │                          │  │  physical × (f/100)│
│                   │  │  Cell Communication   55 │  │                   │
│                   │  │  ══════════════░═══════   │  │                   │
└──────────────────┘  └────────────────────────┘  └──────────────────┘
```

### Color System

| Layer | Color | Hex | Icon |
|-------|-------|-----|------|
| Cellular | Emerald | `emerald-500` | Circle |
| Skeletal | Gray | `gray-500` | Box |
| Organ | Red | `red-500` | Heart |
| Nervous System | Purple | `purple-500` | Brain |
| Muscular | Orange | `orange-500` | Activity |
| Skin | Amber | `amber-500` | Shield |
| Consciousness | Cyan | `cyan-500` | Eye |
| Foundation (Present) | Green | `green-300/900` | — |
| Foundation (Partial) | Amber | `amber-300/900` | — |
| Foundation (Absent) | Red | `red-300/900` | — |

### Build Status Panel

Always visible in the right column:
- **Stability score** — large number, updates in real time
- **Floor status badge** — PRESENT (green), PARTIAL (amber), ABSENT (red)
- **Formula display** — `stability = physical × (foundation / 100)`

### Featured Build Buttons

Four preset buttons load complete configurations with one click. A visual indicator shows the active preset. The indicator clears the moment any slider is modified — the user has diverged from the preset and is now in custom territory.

### The 3D Viewport

The central innovation beyond the slider interface: a real-time 3D viewport that renders the physical build at anatomical fidelity. The viewport sits alongside (or above, on mobile) the parameter panels.

- Renders at the same fidelity as BioDigital Human and Complete Anatomy for layers 1–6
- Extends to consciousness integration visualization (layer 7) — rendered as energy patterns, integration fields, experiential overlays
- Floor visualization: the substrate renders as a visible surface beneath the build. Present floors are solid. Partial floors are translucent. Absent floors are empty space — the build floats, visibly unstable
- Cascade visualization: when a parameter changes, the cascade propagates visibly through the 3D model — cellular instability ripples upward, substrate absence ripples downward
- Interactive: rotation, zoom, layer isolation (view one layer at a time), exploded view

### Design Philosophy

The interface is deliberately clinical. No gamification. No rewards. No progress bars. No achievement unlocks. No encouraging messages. The tool shows what is. The user sees it directly. The dark theme (gray-950 to gray-900 gradient), clean borders, monospace numbers, and accent-blue-500 sliders are functional, not decorative. The precision of the interface mirrors the precision of the physics.
