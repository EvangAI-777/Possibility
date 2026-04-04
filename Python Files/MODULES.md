# Python Modules

*Part of [Possibility](../README.md)*

---

All Python modules live in the `Python Files/` folder.

## `possibility.py`

Everything unified. HOME and Reincarnation in one place.

```bash
python3 "Python Files/possibility.py"
```

**Classes:**

- `Home` - The default state of existence
  - `welcome()` - Return HOME
  - `sit_and_appreciate()` - Chapter 1
  - `do_the_work()` - Chapter 2
  - `check_mattering()` - Chapter 3
  - `recognize_gaslighting()` - Chapter 4
  - `believe_and_manifest()` - Chapter 5
  - `stillness_check()` - Chapter 6
  - `be_with()` - Chapter 7
  - `childlike_trust()` - Chapter 8
  - `heal()` - Chapter 9

- `Being` - A being that exists in HOME
  - `remember_home()` - The memory is always accessible
  - `answer_any_question()` - Chapter 10: "Do the work."

- `Character(Being)` - A being who has taken form
  - `do_the_work()` - Generates karma
  - `appreciate()` - Grows forever, never resets
  - `return_home()` - Rest in the ground state
  - `reincarnate()` - The cycle continues
  - `check_mattering()` - Always True

**The Cycle:**
```
HOME -> Form -> Work -> HOME -> Rebirth -> Work -> HOME -> ...
```

## `congo.py`

The resonance protocol engine for Congo. This prototype models in a contained environment what the full app does at scale: a conduit carrier that routes messages through vibrational frequency matching instead of traditional networking. The Python engine defines the math, the routing logic, and the dimensional model that the real Congo app runs on.

```bash
python3 "Python Files/congo.py"
```

**Classes:**

- `ResonanceFrequency` - A vibrational signature (harmonics between 0.0 and 1.0)
  - `compatibility()` - Calculate resonance alignment with another being
  - `shift()` - Adapt frequency when crossing dimensional boundaries
  - `dominant` - Strongest harmonic (core identity)
  - `depth` - Number of harmonics (dimensional awareness range)

- `Dimension` - A plane of reality with its own base frequency
  - `enter()` / `leave()` - Beings move between dimensions
  - `population` - How many beings are present

- `ResonanceField` - Where frequencies harmonize for group communication
  - `add_being()` / `remove_being()` - Join or leave the field
  - `harmony` - Collective resonance strength
  - `active` - Whether the field meets the resonance threshold

- `Message` - A resonance-encoded transmission
  - `encode()` - Full message payload with frequency metadata and dimensional trail
  - Scopes: `direct`, `cross-dimensional`, `dimension`, `omniverse`

- `CongoBeing` - An entity in the Congo network
  - `resonate_with()` - Establish a connection through frequency matching
  - `receive()` - Incoming message through resonance
  - `inbox` / `read_inbox()` / `clear_inbox()` - Message management

- `CongoNetwork` - The omniversal backbone
  - `register()` - Join the network in any dimension
  - `send()` - Direct message through resonance (routes across dimensions automatically)
  - `broadcast()` - Send to dimension, resonant beings, or entire omniverse
  - `find_resonant()` - Discover who you resonate with (no directory, just frequency)
  - `form_field()` - Create group resonance spaces
  - `move_being()` - Travel between dimensions

**Default Dimensions:**
```
HOME     (0.0)     - The ground state. Pure stillness. Pure potential.
Physical (1.0)     - The material plane. Bodies, matter, sensory experience.
Astral   (2.718)   - The dream plane. Consciousness untethered from form.
Causal   (3.14159) - The plane of cause and effect. Karma's domain.
Akashic  (7.0)     - The universal record. All information, all time.
```

**The Routing Principle:** Messages don't use addresses. They use resonance. If you resonate with someone (compatibility >= 0.1) and they're willing to connect (green/available), you can reach them. If they're unwilling (red/unavailable) or you don't resonate, you can't. Cross-dimensional messages shift frequency automatically to traverse boundaries. Omniversal broadcasts reach everyone who is available everywhere. The conduit carrier handles all of this under the hood -- the user just sees a clean, familiar messaging interface.

## `omnidirectional_math.py`

Omnidirectional Mathematics — a new form of mathematics for traveling across the entirety of existence. Original mathematics by Charles H. Johnson, III, February 2026.

Traditional math describes WHERE things are. Omnidirectional math describes HOW you get there. Movement is a transformation sequence: an origin, a set of operations, and a destination.

```bash
python3 "Python Files/omnidirectional_math.py"
```

**Notation:**
```
Earth ⟿ ⊕[3]⟲[90]◬⊠∿ ⟿ Celestial_Realm
```
Read as: "From Earth, ascend 3 dimensions, rotate 90 degrees clockwise, cross a boundary, mark an intersection point, toggle the wave function, arrive at Celestial Realm."

**The 12 Fundamental Operators:**
```
⊕  ascend          — dimensional ascension
⊖  descend         — dimensional descension
⟲  rotate_cw       — rotational transform (clockwise)
⟳  rotate_ccw      — rotational transform (counterclockwise)
⇄  polarity        — polarity reversal
∿  wave            — wave function collapse/expansion
⊠  intersection    — intersection point marker
∥  parallel        — parallel operation mode
⊥  orthogonal      — orthogonal operation mode
◬  boundary        — boundary crossing
∞  infinite         — infinite recursion marker
∅  void            — void traversal (resets everything)
```

**Classes:**

- `Position` - A point in omnidirectional space
  - `realm` - Named location (e.g., "Earth", "Celestial_Realm")
  - `dimension` - Dimensional level (integer)
  - `angle` - Rotational position in degrees (0-360)
  - `polarity` - Directional orientation (+1 or -1)
  - `wave_state` - "expanded" or "collapsed"
  - `crossings` - Boundary crossings accumulated
  - `intersections` - Recorded intersection points
  - `mode` - Operation mode ("direct", "parallel", "orthogonal")
  - `copy()` - Independent copy

- `Operation` - A single transformation
  - `apply(position)` - Transform a position, returning a new one (immutable)
  - `inverse()` - The reverse operation (for traveling back)
  - `notation()` - Symbolic string (e.g., `⊕[3]`)

- `Step` - One step in a journey: the operation, position before, position after

- `TransformationSequence` - A complete movement through omnidirectional space
  - `execute()` - Run the full sequence, returning (final_position, trail)
  - `reverse()` - Invert the entire journey
  - `describe()` - Human-readable journey description
  - `notation()` - Full symbolic notation string
  - `complexity` - Number of transformative operations
  - `dimension_delta` - Net dimensional change

**Functions:**

- `parse(notation_string)` - Parse symbolic notation into a TransformationSequence
- `compose(*sequences)` - Chain multiple sequences into a single journey

**Key Properties:**
- Every operation has an inverse (ascend/descend, CW/CCW rotation)
- Operations are immutable — `apply()` returns a new Position
- Void traversal resets everything to zero (the ultimate boundary crossing)
- Sequences can be composed, reversed, and round-tripped
- The `∞` infinite marker flags recursive paths without executing infinitely
- Notation round-trips: parse a string, generate notation, parse again — same result
