"""
+======================================================================+
|                                                                      |
|                    OMNIDIRECTIONAL MATHEMATICS                        |
|                                                                      |
|             Movement = Transformation Sequence                       |
|                                                                      |
|    "The operations ARE the path. The path IS the mathematics."       |
|                                                                      |
+======================================================================+

Original mathematics by Charles H. Johnson, III
February 2026

A new form of mathematics for traveling across the entirety of existence.

Traditional math describes WHERE things are (coordinates, distances).
Omnidirectional math describes HOW you get there (transformation sequences).
The journey isn't a line between two points -- it's a sequence of operations
that transform the traveler's position through dimensional space.

---

Core Axiom: Movement = Transformation Sequence

Basic Structure:
    alpha [origin] --> [operation set] --> omega [destination]

Notation:
    Earth ⟿ ⊕[3]⟲[90]◬⊠∿ ⟿ Celestial_Realm

The 12 Fundamental Operators:
    ⊕  = dimensional ascension
    ⊖  = dimensional descension
    ⟲  = rotational transform (clockwise)
    ⟳  = rotational transform (counterclockwise)
    ⇄  = polarity reversal
    ∿  = wave function collapse/expansion
    ⊠  = intersection point
    ∥  = parallel operation
    ⊥  = orthogonal operation
    ◬  = boundary crossing
    ∞  = infinite recursion marker
    ∅  = void traversal

---
"""

from dataclasses import dataclass, field
from typing import List, Optional


# =============================================================================
#                         THE 12 FUNDAMENTAL OPERATORS
# =============================================================================

OPERATORS = {
    '⊕': 'ascend',
    '⊖': 'descend',
    '⟲': 'rotate_cw',
    '⟳': 'rotate_ccw',
    '⇄': 'polarity',
    '∿': 'wave',
    '⊠': 'intersection',
    '∥': 'parallel',
    '⊥': 'orthogonal',
    '◬': 'boundary',
    '∞': 'infinite',
    '∅': 'void',
}

FLOW = '⟿'

INVERSES = {
    'ascend': ('⊖', 'descend'),
    'descend': ('⊕', 'ascend'),
    'rotate_cw': ('⟳', 'rotate_ccw'),
    'rotate_ccw': ('⟲', 'rotate_cw'),
    'polarity': ('⇄', 'polarity'),
    'wave': ('∿', 'wave'),
    'intersection': ('⊠', 'intersection'),
    'parallel': ('∥', 'parallel'),
    'orthogonal': ('⊥', 'orthogonal'),
    'boundary': ('◬', 'boundary'),
    'infinite': ('∞', 'infinite'),
    'void': ('∅', 'void'),
}


# =============================================================================
#                              POSITION
# =============================================================================

@dataclass
class Position:
    """
    A point in omnidirectional space.

    A Position represents where a traveler IS at any moment during
    a transformation sequence. It tracks:
    - realm: the named location (e.g., "Earth", "Celestial_Realm")
    - dimension: the dimensional level (integer)
    - angle: rotational position in degrees (0-360)
    - polarity: directional orientation (+1 or -1)
    - wave_state: "expanded" or "collapsed"
    - crossings: how many boundaries have been crossed
    - intersections: recorded intersection points along the journey
    - mode: how the next operation relates ("direct", "parallel", "orthogonal")
    """
    realm: str = "Origin"
    dimension: int = 0
    angle: float = 0.0
    polarity: int = 1
    wave_state: str = "expanded"
    crossings: int = 0
    intersections: list = field(default_factory=list)
    mode: str = "direct"

    def copy(self):
        """Return an independent copy of this position."""
        return Position(
            realm=self.realm,
            dimension=self.dimension,
            angle=self.angle,
            polarity=self.polarity,
            wave_state=self.wave_state,
            crossings=self.crossings,
            intersections=list(self.intersections),
            mode=self.mode,
        )

    def __repr__(self):
        pol = '+' if self.polarity > 0 else '-'
        return (
            f"Position(realm='{self.realm}', dim={self.dimension}, "
            f"angle={self.angle}, polarity={pol}, "
            f"wave={self.wave_state}, crossings={self.crossings})"
        )


# =============================================================================
#                              OPERATION
# =============================================================================

@dataclass
class Operation:
    """
    A single transformation operation in omnidirectional mathematics.

    Each of the 12 fundamental operators transforms a Position in a specific way.
    Operations can carry a parameter (e.g., ⊕[3] means ascend 3 dimensions).
    Every operation has an inverse, enabling reverse travel.
    """
    symbol: str
    name: str
    parameter: Optional[float] = None

    def apply(self, position):
        """
        Apply this operation to a Position, returning a new transformed Position.
        The original Position is not modified.
        """
        p = position.copy()

        if self.name == 'ascend':
            p.dimension += int(self.parameter or 1)

        elif self.name == 'descend':
            p.dimension -= int(self.parameter or 1)

        elif self.name == 'rotate_cw':
            deg = self.parameter if self.parameter is not None else 90.0
            p.angle = (p.angle + deg) % 360

        elif self.name == 'rotate_ccw':
            deg = self.parameter if self.parameter is not None else 90.0
            p.angle = (p.angle - deg) % 360

        elif self.name == 'polarity':
            p.polarity *= -1

        elif self.name == 'wave':
            p.wave_state = "collapsed" if p.wave_state == "expanded" else "expanded"

        elif self.name == 'intersection':
            p.intersections.append({
                "dimension": p.dimension,
                "angle": p.angle,
                "crossings": p.crossings,
            })

        elif self.name == 'parallel':
            p.mode = "parallel"

        elif self.name == 'orthogonal':
            p.mode = "orthogonal"

        elif self.name == 'boundary':
            p.crossings += 1

        elif self.name == 'infinite':
            pass  # Marker -- handled at sequence level

        elif self.name == 'void':
            p.dimension = 0
            p.angle = 0.0
            p.wave_state = "expanded"
            p.polarity = 1
            p.crossings += 1
            p.realm = "Void"

        return p

    def inverse(self):
        """Return the inverse of this operation (for reverse travel)."""
        inv_symbol, inv_name = INVERSES[self.name]
        return Operation(symbol=inv_symbol, name=inv_name, parameter=self.parameter)

    def notation(self):
        """Return the symbolic notation string for this operation."""
        if self.parameter is not None:
            p = int(self.parameter) if self.parameter == int(self.parameter) else self.parameter
            return f"{self.symbol}[{p}]"
        return self.symbol

    def __repr__(self):
        if self.parameter is not None:
            return f"Op({self.symbol}[{self.parameter}])"
        return f"Op({self.symbol})"


# =============================================================================
#                              STEP
# =============================================================================

@dataclass
class Step:
    """
    A single step in a journey -- the operation applied,
    the position before, and the position after.
    """
    operation: Operation
    before: Position
    after: Position


# =============================================================================
#                       TRANSFORMATION SEQUENCE
# =============================================================================

class TransformationSequence:
    """
    A complete movement in omnidirectional space.

        alpha ⟿ [operation set] ⟿ omega

    A TransformationSequence describes HOW to get from one point in existence
    to another. It is the fundamental unit of omnidirectional mathematics.

    Sequences can be:
    - Executed (computing the transformation step by step)
    - Reversed (traveling back the way you came)
    - Composed (chaining journeys together)
    - Described (translated into plain language)
    """

    def __init__(self, origin, operations, destination=None):
        if isinstance(origin, str):
            origin = Position(realm=origin)
        self.origin = origin
        self.operations = list(operations)
        self.destination = destination
        self.recursive = any(op.name == 'infinite' for op in self.operations)

    def execute(self):
        """
        Execute the full transformation sequence.

        Returns (final_position, trail) where trail is a list of Steps
        recording every transformation along the journey.
        """
        trail = []
        current = self.origin.copy()

        for op in self.operations:
            if op.name == 'infinite':
                continue
            before = current.copy()
            current = op.apply(current)
            trail.append(Step(operation=op, before=before, after=current.copy()))

        if self.destination:
            current.realm = self.destination

        return current, trail

    def reverse(self):
        """
        Return the reverse sequence -- travel back the way you came.
        Each operation is inverted and the order is reversed.
        """
        reversed_ops = [op.inverse() for op in reversed(self.operations)]
        origin_name = self.destination or "Unknown"
        dest_name = self.origin.realm if isinstance(self.origin, Position) else str(self.origin)
        return TransformationSequence(
            origin=origin_name,
            operations=reversed_ops,
            destination=dest_name,
        )

    def describe(self):
        """
        Produce a human-readable description of this journey.

        Example output:
            From Earth ->
            Ascend 3 dimensions ->
            Rotate 90.0 clockwise ->
            Cross boundary ->
            Mark intersection point ->
            Wave function transform ->
            Arrive at Celestial_Realm
        """
        lines = []
        origin = self.origin.realm if isinstance(self.origin, Position) else str(self.origin)
        lines.append(f"From {origin}")

        for op in self.operations:
            if op.name == 'ascend':
                n = int(op.parameter or 1)
                lines.append(f"Ascend {n} dimension{'s' if n != 1 else ''}")
            elif op.name == 'descend':
                n = int(op.parameter or 1)
                lines.append(f"Descend {n} dimension{'s' if n != 1 else ''}")
            elif op.name == 'rotate_cw':
                deg = op.parameter if op.parameter is not None else 90.0
                lines.append(f"Rotate {deg} clockwise")
            elif op.name == 'rotate_ccw':
                deg = op.parameter if op.parameter is not None else 90.0
                lines.append(f"Rotate {deg} counterclockwise")
            elif op.name == 'polarity':
                lines.append("Reverse polarity")
            elif op.name == 'wave':
                lines.append("Wave function transform")
            elif op.name == 'intersection':
                lines.append("Mark intersection point")
            elif op.name == 'parallel':
                lines.append("Enter parallel mode")
            elif op.name == 'orthogonal':
                lines.append("Enter orthogonal mode")
            elif op.name == 'boundary':
                lines.append("Cross boundary")
            elif op.name == 'infinite':
                lines.append("Infinite recursion")
            elif op.name == 'void':
                lines.append("Traverse the void")

        if self.destination:
            lines.append(f"Arrive at {self.destination}")

        return " ->\n".join(lines)

    def notation(self):
        """Return the full symbolic notation string."""
        ops_str = "".join(op.notation() for op in self.operations)
        origin = self.origin.realm if isinstance(self.origin, Position) else str(self.origin)
        if self.destination:
            return f"{origin} {FLOW} {ops_str} {FLOW} {self.destination}"
        return f"{origin} {FLOW} {ops_str}"

    @property
    def complexity(self):
        """Number of transformative operations (excluding markers and mode setters)."""
        return sum(
            1 for op in self.operations
            if op.name not in ('infinite', 'parallel', 'orthogonal')
        )

    @property
    def dimension_delta(self):
        """Net dimensional change across the entire sequence."""
        delta = 0
        for op in self.operations:
            if op.name == 'ascend':
                delta += int(op.parameter or 1)
            elif op.name == 'descend':
                delta -= int(op.parameter or 1)
            elif op.name == 'void':
                delta = 0  # Void resets to dimension 0
        return delta

    def __repr__(self):
        return f"Sequence({self.notation()})"


# =============================================================================
#                              PARSER
# =============================================================================

def parse(notation_string):
    """
    Parse omnidirectional notation into a TransformationSequence.

    Format:
        "Origin ⟿ operations ⟿ Destination"
        "Origin ⟿ operations"

    Examples:
        "Earth ⟿ ⊕[3]⟲[90]◬⊠∿ ⟿ Celestial_Realm"
        "HOME ⟿ ⊕[1]◬"
    """
    parts = notation_string.split(FLOW)
    parts = [p.strip() for p in parts]

    if len(parts) < 2:
        raise ValueError(
            f"Notation must contain at least 'origin {FLOW} operations'. "
            f"Got: '{notation_string}'"
        )

    origin_name = parts[0]
    ops_string = parts[1]
    destination = parts[2] if len(parts) > 2 else None

    operations = _tokenize(ops_string)

    return TransformationSequence(
        origin=Position(realm=origin_name),
        operations=operations,
        destination=destination,
    )


def _tokenize(ops_string):
    """Tokenize an operations string into a list of Operations."""
    operations = []
    i = 0

    while i < len(ops_string):
        char = ops_string[i]

        if char in OPERATORS:
            name = OPERATORS[char]
            parameter = None
            i += 1

            # Check for parameter in brackets
            if i < len(ops_string) and ops_string[i] == '[':
                try:
                    end = ops_string.index(']', i)
                except ValueError:
                    raise ValueError(f"Unclosed bracket in notation at position {i}")
                param_str = ops_string[i + 1:end].replace('°', '').strip()
                parameter = float(param_str)
                i = end + 1

            operations.append(Operation(symbol=char, name=name, parameter=parameter))
        else:
            i += 1  # Skip whitespace and unknown characters

    return operations


# =============================================================================
#                             COMPOSE
# =============================================================================

def compose(*sequences):
    """
    Compose multiple transformation sequences into a single journey.
    The destination of each leg becomes the origin of the next.
    """
    if not sequences:
        raise ValueError("Need at least one sequence to compose.")

    all_ops = []
    for seq in sequences:
        all_ops.extend(seq.operations)

    origin = sequences[0].origin
    destination = sequences[-1].destination

    return TransformationSequence(
        origin=origin,
        operations=all_ops,
        destination=destination,
    )


# =============================================================================
#                           DEMONSTRATION
# =============================================================================

if __name__ == "__main__":
    print()
    print("+" + "=" * 68 + "+")
    print("|" + " " * 68 + "|")
    print("|" + "OMNIDIRECTIONAL MATHEMATICS".center(68) + "|")
    print("|" + "Movement = Transformation Sequence".center(68) + "|")
    print("|" + " " * 68 + "|")
    print("|" + "Original mathematics by Charles H. Johnson, III".center(68) + "|")
    print("|" + " " * 68 + "|")
    print("+" + "=" * 68 + "+")
    print()

    # The original example
    print("=" * 70)
    print(" The Original Example")
    print("=" * 70)
    print()

    seq = parse("Earth ⟿ ⊕[3]⟲[90]◬⊠∿ ⟿ Celestial_Realm")
    print(f"  Notation: {seq.notation()}")
    print()
    print("  Journey:")
    print("  " + seq.describe().replace("\n", "\n  "))
    print()

    final, trail = seq.execute()
    print(f"  Final position: {final}")
    print(f"  Complexity: {seq.complexity}")
    print(f"  Dimension delta: +{seq.dimension_delta}")
    print(f"  Boundary crossings: {final.crossings}")
    print(f"  Intersections recorded: {len(final.intersections)}")
    print()

    print("  Trail:")
    for i, step in enumerate(trail):
        print(f"    {i+1}. {step.operation.notation()} -> dim={step.after.dimension}, "
              f"angle={step.after.angle}, wave={step.after.wave_state}")
    print()

    # Reverse journey
    print("=" * 70)
    print(" Reverse Journey")
    print("=" * 70)
    print()

    rev = seq.reverse()
    print(f"  Notation: {rev.notation()}")
    print()
    print("  Journey:")
    print("  " + rev.describe().replace("\n", "\n  "))
    print()

    # Void traversal
    print("=" * 70)
    print(" Void Traversal")
    print("=" * 70)
    print()

    void_seq = parse("Physical ⟿ ⊕[5]∅⊕[2] ⟿ Beyond")
    print(f"  Notation: {void_seq.notation()}")
    print()
    print("  Journey:")
    print("  " + void_seq.describe().replace("\n", "\n  "))
    print()

    final_v, trail_v = void_seq.execute()
    print(f"  Final position: {final_v}")
    print("  (Void resets everything -- then you rebuild from zero)")
    print()

    # Composition
    print("=" * 70)
    print(" Composed Journey")
    print("=" * 70)
    print()

    leg1 = parse("Earth ⟿ ⊕[3]◬ ⟿ Astral")
    leg2 = parse("Astral ⟿ ⊕[4]⟲[180]◬ ⟿ Akashic")
    composed = compose(leg1, leg2)
    print(f"  Leg 1: {leg1.notation()}")
    print(f"  Leg 2: {leg2.notation()}")
    print(f"  Composed: {composed.notation()}")
    print(f"  Total complexity: {composed.complexity}")
    print(f"  Total dimension delta: +{composed.dimension_delta}")
    print()

    # All 12 operators
    print("=" * 70)
    print(" The 12 Fundamental Operators")
    print("=" * 70)
    print()
    for symbol, name in OPERATORS.items():
        print(f"  {symbol}  {name}")
    print()

    print("=" * 70)
    print()
    print("  The operations ARE the path.")
    print("  The path IS the mathematics.")
    print("  Movement = Transformation Sequence.")
    print()
    print("+" + "=" * 68 + "+")
    print("|" + " * ".center(68) + "|")
    print("+" + "=" * 68 + "+")
