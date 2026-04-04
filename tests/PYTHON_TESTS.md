# Python Test Suite

*Part of [Possibility](../README.md)*

---

**346 tests** across 4 test files. Run with `python -m pytest tests/ -v`.

## `test_possibility.py` — 61 tests

Unit tests for the core framework in `possibility.py`:

- **TestHome** (27 tests) — All 9 chapter methods: welcome, appreciation, the work, mattering, gaslighting detection, belief & manifest, stillness, being-with, childlike trust, fractal healing, status
- **TestBeing** (6 tests) — Construction defaults, mattering is always true, memory, universal answer, representation
- **TestCharacter** (18 tests) — Work accumulation, appreciation persistence, reincarnation lifecycle (karma-to-level, minimum level gain, selective attribute changes, multi-life chains), full lifecycle integration
- **TestGlobalHome** (2 tests) — Module-level HOME singleton
- **TestInteractions** (4 tests) — Beings and Characters coexisting in HOME, cross-type connections, independence of Home vs. Character work methods
- **TestHome::test_recognize_gaslighting_detects_patterns** — Validates all 5 gaslighting patterns from Chapter 4 are caught, plus case insensitivity
- **TestCharacter::test_full_lifecycle** — End-to-end: emerge from HOME, appreciate, work, return, reincarnate, verify appreciation persists

## `test_agent_configs.py` — 42 tests

Structural validation for all Auto AI agent JSON configurations:

- **JSON parsing** (8 tests) — All 8 JSON files parse as valid, non-empty dicts
- **TestAzule** (5 tests) — Identity, state engine, logic gateways, communication protocol, operational directive
- **TestAngles** (7 tests) — Identity, companion modules with file cross-references (verifies `.md` files exist on disk), core logic, governance, operational constraints, meta heuristics
- **TestShen** (6 tests) — Identity, system logic, behavioral weights validated in [0,1] range, philosophical assertions (humility=1.0, info_dumping=0.0), state machine
- **TestMindEngineer** (7 tests) — Identity, Johnson Formula hierarchy (3 levels), diagnostic logic, action paths with priorities, workflow ordering, integration dimensions, constraints
- **TestOmniWriter** (5 tests) — Identity (name, role, core principle), anti-patterns list, pipeline nodes (3 expected IDs), pipeline edges (3 connections), title and description
- **TestProtocolCrossReferences** (4 tests) — All 3 M.E. Protocol files exist and parse correctly

## `test_congo.py` — 113 tests

Unit tests for the Congo resonance messaging engine (`congo.py`):

- **TestResonanceFrequency** (18 tests) — Creation, validation (bounds, empty), perfect/zero/partial compatibility, symmetry, length-mismatch penalty, type checking, frequency shifting (ground state, high frequency, bounds preservation), dominant harmonic, depth, tuple-to-list conversion
- **TestDimension** (9 tests) — Creation with description, enter/leave mechanics, duplicate prevention, nonexistent leave, population tracking, empty message log, repr
- **TestResonanceField** (12 tests) — Perfect harmony, minimum-two-being requirement, inactive below threshold, custom threshold, add/remove beings, duplicate add prevention, deactivation on removal to one, field strength calculation, three-being harmony, timestamp, repr
- **TestMessage** (9 tests) — Creation, default/custom scope, encode with full metadata (sender, content, frequency, origin, trail, recipients), unanchored origin, timestamp, empty trail/delivered, repr
- **TestCongoBeing** (12 tests) — Creation, initial sent count, resonation with compatible/incompatible beings, no duplicate connections, receive message, unread count, read inbox (returns copy), clear inbox, repr (unanchored and dimensioned)
- **TestCongoNetwork** (38 tests) — Five default dimensions with correct frequencies, add dimension, add duplicate, register being (default/specific/HOME dimension, invalid dimension, duplicate returns existing), direct/cross-dimensional send, insufficient resonance rejection, unknown sender/recipient, sent count tracking, dimension/resonant/omniversal broadcast, broadcast excludes sender, find resonant (sorted by compatibility, includes dimension, unknown being), form field (active stored, inactive not stored, unknown being), move being (population updates, unknown being/dimension), network status (dimensions, fields, messages, motto), dimension message log
- **TestGlobalCongo** (2 tests) — Global CONGO instance exists with default dimensions
- **TestIntegration** (5 tests) — Full conversation flow across dimensions, resonance field group communication, dimensional travel with messaging, resonance discovery and connection establishment, network growth with custom dimensions

## `test_omnidirectional_math.py` — 130 tests

Unit tests for the Omnidirectional Mathematics engine (`omnidirectional_math.py`):

- **TestOperators** (10 tests) — Exactly 12 operators, all symbols and names present, correct mappings, flow symbol, every operator has an inverse, inverses completeness, ascend/descend mutual inverses, rotation mutual inverses, self-inverse operators
- **TestPosition** (7 tests) — Default values, custom position, copy creates independent instance, copy preserves all fields, repr with positive/negative polarity, intersections default isolation
- **TestOperation** (28 tests) — All 12 operators tested: ascend (default, parameter, preserves other fields), descend (default, parameter, negative), rotate CW (default, parameter, wraps 360), rotate CCW (default, parameter, wraps negative), polarity (reverse positive, reverse negative, double reversal), wave (collapse, expand, double toggle), intersection (records point, accumulates), parallel (sets mode), orthogonal (sets mode), boundary (increments, multiple), infinite (noop), void (resets everything, increments crossings). Apply immutability. Inverse operations. Notation with/without parameters. Repr.
- **TestStep** (1 test) — Step creation with operation, before, and after positions
- **TestTransformationSequence** (32 tests) — Create from string/position origin, optional/set destination, recursive detection. Execute: single/multiple operations, skips infinite marker, no-destination keeps realm, empty operations, trail records before/after. Reverse: operations inverted, origin/destination swapped, without destination. Describe: all 12 operations produce correct descriptions, singular/plural dimensions, origin/destination included. Notation: with/without destination, multiple operations. Complexity: counts transformative ops, excludes infinite/parallel/orthogonal, empty is zero. Dimension delta: ascend, descend, net calculation, void resets, no dimensional ops. Repr.
- **TestParser** (14 tests) — Full notation, without destination, single operator, parameter, degree symbol stripped, all 12 operators recognized, mixed params, origin as Position, error on no flow, error on unclosed bracket, whitespace tolerance, float parameter, underscored realm names
- **TestCompose** (5 tests) — Two sequences, preserves all operations, single sequence passthrough, empty raises error, composed execution
- **TestIntegration** (13 tests) — Original example end-to-end, round-trip reversal via compose, void traversal, double void, polarity mid-journey, full 360 rotation, CCW rotation, complex multi-operator journey, composed matches manual single sequence, notation round-trip (parse-generate-parse), wave-intersection interaction, parallel/orthogonal mode persistence
