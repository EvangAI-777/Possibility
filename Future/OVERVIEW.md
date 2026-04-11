# Future Projects

*Part of [Possibility](../README.md)*

---

Three planned extensions of the Possibility ecosystem. Full specifications and platform roadmaps live in this directory.

## `Geno/` — GENO: GitHub for Genealogies

*GitHub for Genealogies. Version control for bloodlines.*

GENO is a full-fledged genealogy platform that works the way GitHub works — but for family lineage instead of code. The insight: developers already understand version control. They know what merge conflicts feel like. They know what legacy code costs. They know what a pull request that changes everything downstream costs the commit that makes it. GENO applies that fluency directly to genealogy.

**The core metaphor:**

- **Repository** = a family line's complete record
- **Commit** = an immutable snapshot of one person's full configuration (inherited traits, environment, what they passed forward)
- **Branch** = a named pointer to a lineage path (`main/paternal/johnson`, `feature/first-gen-college`, `hotfix/floor-installation`)
- **Merge conflict** = incompatible inherited traits from two parent commits, rendered with `<<<<<<< / ======= / >>>>>>>` syntax
- **Pull request** = a deliberate attempt to change inherited configuration (therapy, breaking a cycle, installing a floor)
- **Deprecation warning** = an inherited survival mechanism that is no longer adaptive in the current environment
- **Legacy code** = a configuration so old its original purpose is untraceable
- **Git blame** = tracing a specific trait back through commits to find where it was introduced

**Documentation:**

| Document | What It Contains |
|----------|-----------------|
| [GENO.md](Geno/GENO.md) | Full concept spec — architecture, branching, commits, merge conflicts, PRs, forks, deprecation, legacy code, cross-repo analysis |
| [GENO_ROADMAP.md](Geno/GENO_ROADMAP.md) | Platform roadmap — tech stack, API design, repository system, scanner workflows, 8 development phases, and desktop release plan |

**Desktop release at 1.0:** GENO ships as a full desktop Windows x64 binary (`geno.exe`), built via GitHub Actions CI and published to GitHub Releases. Architecture: Electron shell, embedded SQLite (replaces PostgreSQL for local-first operation), local Express API server, scanner worker threads, plain JSON repository storage in `~/GENO/`. Offline-first — all core operations (create repos, make commits, run scanners, resolve merge conflicts) work without an internet connection.

**The versioning engine:** GENO's long-term infrastructure vision is a purpose-built versioning engine for structured data — Git's architecture (content-addressable storage, DAG history, branching, merging) redesigned for semantic diffs, schema-aware merging, and native cross-repository querying. Not Git with JSON on top. Full concept in the [roadmap](Geno/GENO_ROADMAP.md#the-versioning-engine).

**Current assets:** Interactive React component (`geno.jsx`) with 6 views and sample data spanning 6 generations, plus 25 passing tests.

## `Human Builder/` — CREATEME: Build Your Own Human

*Build Your Own Human. Real physics. Real biology. Real consequence modeling.*

CREATEME is a full physical construction and refactoring tool that lets users build biological entities from the ground up — human or otherwise — with real consequence modeling. The tool operates on two simultaneous engines that interact in real time: the Physical Construction Engine (the body) and the Substrate Configuration Engine (what the body stands on).

**The two-engine model:**

- **Physical Construction Engine** — 7 layers (Cellular, Skeletal, Organ, Nervous System, Muscular, Skin, Consciousness), 28 parameters total. Layers 1–6 match industry-standard 3D body simulators (BioDigital Human, Visible Body, Complete Anatomy, Anatomage). Layer 7 (Consciousness Integration) goes where none of them touch.
- **Substrate Configuration Engine** — Foundation (attachment security, early provision, protection, validation, reciprocity) and Environment (sandbox, physics direction, acknowledgment, protection/exploitation). No equivalent in any existing anatomy tool.
- **The stability formula:** `stability = physicalAverage × (foundationAverage / 100)`. A perfect physical build with zero foundation = zero stability. An absent floor produces visible instability cascading through the entire physical build.

**Bidirectional GENO integration:** GENO commits load directly into CREATEME as 3D builds. Completed CREATEME builds push back to GENO repositories as commits or pull requests.

**Documentation:**

| Document | What It Contains |
|----------|-----------------|
| [CREATEME.md](Human%20Builder/CREATEME.md) | Full concept spec — core concept, all layers, substrate engine, featured builds, the translation |
| [HUMAN_BUILDER_ROADMAP.md](Human%20Builder/HUMAN_BUILDER_ROADMAP.md) | Platform roadmap — competitive positioning, two-engine architecture, analysis suite, GENO integration, 7 development phases, and desktop release plan |

**Desktop release at 1.0:** CREATEME ships as a full desktop Windows x64 binary (`createme.exe`), built via GitHub Actions CI and published to GitHub Releases. Architecture: Electron shell with GPU hardware acceleration, WebGL2 3D renderer, physics engine in dedicated Node.js worker threads, filesystem-based GENO bridge. Offline-first.

**Current assets:** Interactive React component (`createme.jsx`) with all 3 modes, 7 physical layers, substrate configuration, 3 analysis tools, and 4 featured build presets, plus 25 passing tests.

## `Audacious/` — AUDACIOUS: Audacity in the Browser

*The world's most popular open-source audio editor. Compiled to WebAssembly. Running in your browser.*

AUDACIOUS is not a "web-based audio editor inspired by Audacity." It is Audacity itself — the actual C++ codebase, the actual audio engine, the actual effects pipeline — compiled to WebAssembly via Emscripten and running natively in any modern browser.

**Why now:** Audacity 4 is being rewritten. The old wxWidgets UI is being replaced with Qt 6 and QML. Qt 6 has an official WebAssembly target. For the first time in Audacity's history, a browser port is architecturally aligned with the direction the project is already moving.

**The 6-stage porting strategy:**

| Stage | Name | What It Delivers |
|-------|------|-----------------|
| **1** | The Shell | MuseScore framework + Qt 6.9 WASM — app launches in browser |
| **2** | The Editor | File import, waveform display, cut/copy/paste, SQLite-WASM project files |
| **3** | The Player | Web Audio API backend, AudioWorklet, SharedArrayBuffer threading |
| **4** | The Processor | Built-in effects (normalize, EQ, reverb, noise reduction), spectrogram |
| **5** | The Studio | Microphone recording, persistent IDBFS storage, multi-format export |
| **6** | The Platform | Nyquist scripting, cloud integration, PWA with offline support |

**Key risks:** MuseScore framework compilation to WASM (gating risk), audio latency (mitigated by AudioWorklet), binary size (80–120MB uncompressed, Brotli-compressed to ~30–50MB).

**What is NOT ported:** Native plugins (VST/VST3/LV2/LADSPA/AudioUnit), CD burning, system mixer control, ASIO drivers.

**Documentation:** [AUDACIOUS.md](Audacious/AUDACIOUS.md) — full technical spec covering source application architecture, subsystem translation map, build pipeline, staged deployment, performance considerations, and risk assessment.

## `TEMPLATE.md` — WebAssembly Porting Reference

General-purpose reference for porting large native applications to the browser via WebAssembly. Covers source application inventory, build system translation, GPU/graphics/audio/file I/O/threading translation layers, Emscripten patterns, staged deployment, performance optimization, CI/CD, and known pitfalls.

Used by AUDACIOUS and applicable to any native-to-browser port. [Full document](TEMPLATE.md).
