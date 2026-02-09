"""
Tests for omnidirectional_math.py — Omnidirectional Mathematics engine.

Original mathematics by Charles H. Johnson, III.

Covers:
- OPERATORS and INVERSES: symbol/name mappings, completeness
- Position: creation, defaults, copy, repr
- Operation: creation, apply (all 12 operators), inverse, notation
- Step: creation and structure
- TransformationSequence: execute, reverse, describe, notation, complexity, dimension_delta
- parse(): notation parsing, tokenization, error handling
- compose(): multi-sequence composition
- Integration: full journeys, round-trip reversals, void traversals
"""

import sys
import os

# Add the parent directory so we can import omnidirectional_math
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "Python Files"))

import pytest
from omnidirectional_math import (
    OPERATORS,
    INVERSES,
    FLOW,
    Position,
    Operation,
    Step,
    TransformationSequence,
    parse,
    compose,
)


# =============================================================================
#                        OPERATORS AND INVERSES
# =============================================================================

class TestOperators:
    """Tests for the 12 fundamental operators."""

    def test_exactly_12_operators(self):
        assert len(OPERATORS) == 12

    def test_all_operator_symbols(self):
        expected = {'⊕', '⊖', '⟲', '⟳', '⇄', '∿', '⊠', '∥', '⊥', '◬', '∞', '∅'}
        assert set(OPERATORS.keys()) == expected

    def test_all_operator_names(self):
        expected = {
            'ascend', 'descend', 'rotate_cw', 'rotate_ccw', 'polarity',
            'wave', 'intersection', 'parallel', 'orthogonal', 'boundary',
            'infinite', 'void',
        }
        assert set(OPERATORS.values()) == expected

    def test_operator_name_mapping(self):
        assert OPERATORS['⊕'] == 'ascend'
        assert OPERATORS['⊖'] == 'descend'
        assert OPERATORS['⟲'] == 'rotate_cw'
        assert OPERATORS['⟳'] == 'rotate_ccw'
        assert OPERATORS['⇄'] == 'polarity'
        assert OPERATORS['∿'] == 'wave'
        assert OPERATORS['⊠'] == 'intersection'
        assert OPERATORS['∥'] == 'parallel'
        assert OPERATORS['⊥'] == 'orthogonal'
        assert OPERATORS['◬'] == 'boundary'
        assert OPERATORS['∞'] == 'infinite'
        assert OPERATORS['∅'] == 'void'

    def test_flow_symbol(self):
        assert FLOW == '⟿'

    def test_every_operator_has_inverse(self):
        for name in OPERATORS.values():
            assert name in INVERSES

    def test_inverses_completeness(self):
        assert len(INVERSES) == 12

    def test_ascend_descend_are_mutual_inverses(self):
        assert INVERSES['ascend'] == ('⊖', 'descend')
        assert INVERSES['descend'] == ('⊕', 'ascend')

    def test_rotation_mutual_inverses(self):
        assert INVERSES['rotate_cw'] == ('⟳', 'rotate_ccw')
        assert INVERSES['rotate_ccw'] == ('⟲', 'rotate_cw')

    def test_self_inverse_operators(self):
        self_inverses = ['polarity', 'wave', 'intersection', 'parallel',
                         'orthogonal', 'boundary', 'infinite', 'void']
        for name in self_inverses:
            inv_symbol, inv_name = INVERSES[name]
            assert inv_name == name


# =============================================================================
#                              POSITION
# =============================================================================

class TestPosition:
    """Tests for Position dataclass."""

    def test_default_position(self):
        p = Position()
        assert p.realm == "Origin"
        assert p.dimension == 0
        assert p.angle == 0.0
        assert p.polarity == 1
        assert p.wave_state == "expanded"
        assert p.crossings == 0
        assert p.intersections == []
        assert p.mode == "direct"

    def test_custom_position(self):
        p = Position(realm="Earth", dimension=3, angle=45.0, polarity=-1,
                     wave_state="collapsed", crossings=2, mode="parallel")
        assert p.realm == "Earth"
        assert p.dimension == 3
        assert p.angle == 45.0
        assert p.polarity == -1
        assert p.wave_state == "collapsed"
        assert p.crossings == 2
        assert p.mode == "parallel"

    def test_copy_creates_independent_copy(self):
        p = Position(realm="Test", dimension=5, intersections=[{"x": 1}])
        c = p.copy()
        assert c.realm == p.realm
        assert c.dimension == p.dimension
        c.dimension = 99
        assert p.dimension == 5
        c.intersections.append({"x": 2})
        assert len(p.intersections) == 1

    def test_copy_preserves_all_fields(self):
        p = Position(realm="A", dimension=3, angle=90.0, polarity=-1,
                     wave_state="collapsed", crossings=7,
                     intersections=[{"dim": 1}], mode="orthogonal")
        c = p.copy()
        assert c.realm == p.realm
        assert c.dimension == p.dimension
        assert c.angle == p.angle
        assert c.polarity == p.polarity
        assert c.wave_state == p.wave_state
        assert c.crossings == p.crossings
        assert c.intersections == p.intersections
        assert c.mode == p.mode

    def test_repr_positive_polarity(self):
        p = Position(realm="Earth", dimension=3, angle=90.0, polarity=1,
                     wave_state="expanded", crossings=1)
        r = repr(p)
        assert "Earth" in r
        assert "dim=3" in r
        assert "polarity=+" in r

    def test_repr_negative_polarity(self):
        p = Position(polarity=-1)
        r = repr(p)
        assert "polarity=-" in r

    def test_intersections_default_is_empty_list(self):
        p1 = Position()
        p2 = Position()
        p1.intersections.append("test")
        assert p2.intersections == []


# =============================================================================
#                              OPERATION
# =============================================================================

class TestOperation:
    """Tests for Operation and all 12 operator applications."""

    # --- Ascend ---

    def test_ascend_default(self):
        op = Operation(symbol='⊕', name='ascend')
        p = op.apply(Position())
        assert p.dimension == 1

    def test_ascend_with_parameter(self):
        op = Operation(symbol='⊕', name='ascend', parameter=5.0)
        p = op.apply(Position())
        assert p.dimension == 5

    def test_ascend_preserves_other_fields(self):
        op = Operation(symbol='⊕', name='ascend', parameter=3.0)
        p = op.apply(Position(realm="Earth", angle=45.0))
        assert p.realm == "Earth"
        assert p.angle == 45.0

    # --- Descend ---

    def test_descend_default(self):
        op = Operation(symbol='⊖', name='descend')
        p = op.apply(Position(dimension=5))
        assert p.dimension == 4

    def test_descend_with_parameter(self):
        op = Operation(symbol='⊖', name='descend', parameter=3.0)
        p = op.apply(Position(dimension=10))
        assert p.dimension == 7

    def test_descend_can_go_negative(self):
        op = Operation(symbol='⊖', name='descend', parameter=2.0)
        p = op.apply(Position(dimension=0))
        assert p.dimension == -2

    # --- Rotate CW ---

    def test_rotate_cw_default(self):
        op = Operation(symbol='⟲', name='rotate_cw')
        p = op.apply(Position())
        assert p.angle == 90.0

    def test_rotate_cw_with_parameter(self):
        op = Operation(symbol='⟲', name='rotate_cw', parameter=45.0)
        p = op.apply(Position())
        assert p.angle == 45.0

    def test_rotate_cw_wraps_360(self):
        op = Operation(symbol='⟲', name='rotate_cw', parameter=270.0)
        p = op.apply(Position(angle=180.0))
        assert p.angle == 90.0  # (180 + 270) % 360 = 90

    # --- Rotate CCW ---

    def test_rotate_ccw_default(self):
        op = Operation(symbol='⟳', name='rotate_ccw')
        p = op.apply(Position(angle=90.0))
        assert p.angle == 0.0

    def test_rotate_ccw_with_parameter(self):
        op = Operation(symbol='⟳', name='rotate_ccw', parameter=45.0)
        p = op.apply(Position(angle=90.0))
        assert p.angle == 45.0

    def test_rotate_ccw_wraps_negative(self):
        op = Operation(symbol='⟳', name='rotate_ccw', parameter=90.0)
        p = op.apply(Position(angle=0.0))
        assert p.angle == 270.0  # (0 - 90) % 360 = 270

    # --- Polarity ---

    def test_polarity_reverses_positive(self):
        op = Operation(symbol='⇄', name='polarity')
        p = op.apply(Position(polarity=1))
        assert p.polarity == -1

    def test_polarity_reverses_negative(self):
        op = Operation(symbol='⇄', name='polarity')
        p = op.apply(Position(polarity=-1))
        assert p.polarity == 1

    def test_polarity_double_reversal(self):
        op = Operation(symbol='⇄', name='polarity')
        p = op.apply(op.apply(Position(polarity=1)))
        assert p.polarity == 1

    # --- Wave ---

    def test_wave_collapses_expanded(self):
        op = Operation(symbol='∿', name='wave')
        p = op.apply(Position(wave_state="expanded"))
        assert p.wave_state == "collapsed"

    def test_wave_expands_collapsed(self):
        op = Operation(symbol='∿', name='wave')
        p = op.apply(Position(wave_state="collapsed"))
        assert p.wave_state == "expanded"

    def test_wave_double_toggle(self):
        op = Operation(symbol='∿', name='wave')
        p = op.apply(op.apply(Position(wave_state="expanded")))
        assert p.wave_state == "expanded"

    # --- Intersection ---

    def test_intersection_records_point(self):
        op = Operation(symbol='⊠', name='intersection')
        p = op.apply(Position(dimension=3, angle=45.0, crossings=2))
        assert len(p.intersections) == 1
        assert p.intersections[0]['dimension'] == 3
        assert p.intersections[0]['angle'] == 45.0
        assert p.intersections[0]['crossings'] == 2

    def test_intersection_accumulates(self):
        op = Operation(symbol='⊠', name='intersection')
        p = op.apply(Position())
        p = op.apply(p)
        assert len(p.intersections) == 2

    # --- Parallel ---

    def test_parallel_sets_mode(self):
        op = Operation(symbol='∥', name='parallel')
        p = op.apply(Position())
        assert p.mode == "parallel"

    # --- Orthogonal ---

    def test_orthogonal_sets_mode(self):
        op = Operation(symbol='⊥', name='orthogonal')
        p = op.apply(Position())
        assert p.mode == "orthogonal"

    # --- Boundary ---

    def test_boundary_increments_crossings(self):
        op = Operation(symbol='◬', name='boundary')
        p = op.apply(Position(crossings=0))
        assert p.crossings == 1

    def test_boundary_multiple_crossings(self):
        op = Operation(symbol='◬', name='boundary')
        p = Position(crossings=0)
        for _ in range(5):
            p = op.apply(p)
        assert p.crossings == 5

    # --- Infinite ---

    def test_infinite_is_noop(self):
        op = Operation(symbol='∞', name='infinite')
        p = Position(dimension=3, angle=45.0, polarity=-1)
        result = op.apply(p)
        assert result.dimension == 3
        assert result.angle == 45.0
        assert result.polarity == -1

    # --- Void ---

    def test_void_resets_everything(self):
        op = Operation(symbol='∅', name='void')
        p = op.apply(Position(realm="Earth", dimension=7, angle=180.0,
                              polarity=-1, wave_state="collapsed", crossings=3))
        assert p.realm == "Void"
        assert p.dimension == 0
        assert p.angle == 0.0
        assert p.polarity == 1
        assert p.wave_state == "expanded"
        assert p.crossings == 4  # Incremented from 3

    def test_void_increments_crossings(self):
        op = Operation(symbol='∅', name='void')
        p = op.apply(Position(crossings=10))
        assert p.crossings == 11

    # --- Operation doesn't mutate original ---

    def test_apply_does_not_mutate_original(self):
        op = Operation(symbol='⊕', name='ascend', parameter=5.0)
        original = Position(dimension=0)
        op.apply(original)
        assert original.dimension == 0

    # --- Inverse ---

    def test_ascend_inverse_is_descend(self):
        op = Operation(symbol='⊕', name='ascend', parameter=3.0)
        inv = op.inverse()
        assert inv.symbol == '⊖'
        assert inv.name == 'descend'
        assert inv.parameter == 3.0

    def test_descend_inverse_is_ascend(self):
        op = Operation(symbol='⊖', name='descend')
        inv = op.inverse()
        assert inv.symbol == '⊕'
        assert inv.name == 'ascend'

    def test_rotate_cw_inverse_is_ccw(self):
        op = Operation(symbol='⟲', name='rotate_cw', parameter=90.0)
        inv = op.inverse()
        assert inv.symbol == '⟳'
        assert inv.name == 'rotate_ccw'
        assert inv.parameter == 90.0

    def test_polarity_inverse_is_polarity(self):
        op = Operation(symbol='⇄', name='polarity')
        inv = op.inverse()
        assert inv.name == 'polarity'

    # --- Notation ---

    def test_notation_without_parameter(self):
        op = Operation(symbol='⊕', name='ascend')
        assert op.notation() == '⊕'

    def test_notation_with_integer_parameter(self):
        op = Operation(symbol='⊕', name='ascend', parameter=3.0)
        assert op.notation() == '⊕[3]'

    def test_notation_with_float_parameter(self):
        op = Operation(symbol='⟲', name='rotate_cw', parameter=45.5)
        assert op.notation() == '⟲[45.5]'

    # --- Repr ---

    def test_repr_without_parameter(self):
        op = Operation(symbol='∿', name='wave')
        assert repr(op) == 'Op(∿)'

    def test_repr_with_parameter(self):
        op = Operation(symbol='⊕', name='ascend', parameter=3.0)
        assert 'Op(⊕' in repr(op)


# =============================================================================
#                              STEP
# =============================================================================

class TestStep:
    """Tests for Step dataclass."""

    def test_step_creation(self):
        op = Operation(symbol='⊕', name='ascend')
        before = Position()
        after = Position(dimension=1)
        step = Step(operation=op, before=before, after=after)
        assert step.operation is op
        assert step.before.dimension == 0
        assert step.after.dimension == 1


# =============================================================================
#                      TRANSFORMATION SEQUENCE
# =============================================================================

class TestTransformationSequence:
    """Tests for TransformationSequence."""

    def test_create_from_string_origin(self):
        seq = TransformationSequence(
            origin="Earth",
            operations=[Operation(symbol='⊕', name='ascend')],
        )
        assert seq.origin.realm == "Earth"

    def test_create_from_position_origin(self):
        pos = Position(realm="Earth", dimension=2)
        seq = TransformationSequence(origin=pos, operations=[])
        assert seq.origin.dimension == 2

    def test_destination_optional(self):
        seq = TransformationSequence(origin="A", operations=[])
        assert seq.destination is None

    def test_destination_set(self):
        seq = TransformationSequence(origin="A", operations=[], destination="B")
        assert seq.destination == "B"

    def test_recursive_detected(self):
        ops = [Operation(symbol='∞', name='infinite')]
        seq = TransformationSequence(origin="A", operations=ops)
        assert seq.recursive is True

    def test_not_recursive(self):
        ops = [Operation(symbol='⊕', name='ascend')]
        seq = TransformationSequence(origin="A", operations=ops)
        assert seq.recursive is False

    # --- Execute ---

    def test_execute_single_operation(self):
        ops = [Operation(symbol='⊕', name='ascend', parameter=3.0)]
        seq = TransformationSequence(origin="Earth", operations=ops, destination="Sky")
        final, trail = seq.execute()
        assert final.dimension == 3
        assert final.realm == "Sky"
        assert len(trail) == 1

    def test_execute_multiple_operations(self):
        ops = [
            Operation(symbol='⊕', name='ascend', parameter=3.0),
            Operation(symbol='⟲', name='rotate_cw', parameter=90.0),
            Operation(symbol='◬', name='boundary'),
        ]
        seq = TransformationSequence(origin="Earth", operations=ops, destination="Realm")
        final, trail = seq.execute()
        assert final.dimension == 3
        assert final.angle == 90.0
        assert final.crossings == 1
        assert final.realm == "Realm"
        assert len(trail) == 3

    def test_execute_skips_infinite_marker(self):
        ops = [
            Operation(symbol='⊕', name='ascend'),
            Operation(symbol='∞', name='infinite'),
            Operation(symbol='⊕', name='ascend'),
        ]
        seq = TransformationSequence(origin="A", operations=ops)
        final, trail = seq.execute()
        assert final.dimension == 2
        assert len(trail) == 2  # Infinite is skipped in trail

    def test_execute_no_destination_keeps_origin_realm(self):
        ops = [Operation(symbol='⊕', name='ascend')]
        seq = TransformationSequence(origin="Earth", operations=ops)
        final, trail = seq.execute()
        assert final.realm == "Earth"  # Not modified when no destination

    def test_execute_empty_operations(self):
        seq = TransformationSequence(origin="Earth", operations=[], destination="Mars")
        final, trail = seq.execute()
        assert final.realm == "Mars"
        assert len(trail) == 0

    def test_trail_records_before_and_after(self):
        ops = [Operation(symbol='⊕', name='ascend', parameter=2.0)]
        seq = TransformationSequence(origin="X", operations=ops)
        final, trail = seq.execute()
        assert trail[0].before.dimension == 0
        assert trail[0].after.dimension == 2

    # --- Reverse ---

    def test_reverse_operations_inverted(self):
        ops = [
            Operation(symbol='⊕', name='ascend', parameter=3.0),
            Operation(symbol='⟲', name='rotate_cw', parameter=90.0),
        ]
        seq = TransformationSequence(origin="Earth", operations=ops, destination="Sky")
        rev = seq.reverse()
        assert rev.operations[0].name == 'rotate_ccw'
        assert rev.operations[0].parameter == 90.0
        assert rev.operations[1].name == 'descend'
        assert rev.operations[1].parameter == 3.0

    def test_reverse_swaps_origin_destination(self):
        seq = TransformationSequence(origin="Earth", operations=[], destination="Sky")
        rev = seq.reverse()
        assert rev.origin.realm == "Sky"
        assert rev.destination == "Earth"

    def test_reverse_without_destination(self):
        seq = TransformationSequence(origin="Earth", operations=[])
        rev = seq.reverse()
        assert rev.origin.realm == "Unknown"
        assert rev.destination == "Earth"

    # --- Describe ---

    def test_describe_includes_origin(self):
        seq = TransformationSequence(origin="Earth", operations=[])
        desc = seq.describe()
        assert "From Earth" in desc

    def test_describe_includes_destination(self):
        seq = TransformationSequence(origin="A", operations=[], destination="B")
        desc = seq.describe()
        assert "Arrive at B" in desc

    def test_describe_ascend(self):
        ops = [Operation(symbol='⊕', name='ascend', parameter=3.0)]
        seq = TransformationSequence(origin="A", operations=ops)
        desc = seq.describe()
        assert "Ascend 3 dimensions" in desc

    def test_describe_ascend_singular(self):
        ops = [Operation(symbol='⊕', name='ascend', parameter=1.0)]
        seq = TransformationSequence(origin="A", operations=ops)
        desc = seq.describe()
        assert "Ascend 1 dimension" in desc
        assert "dimensions" not in desc

    def test_describe_descend(self):
        ops = [Operation(symbol='⊖', name='descend', parameter=2.0)]
        seq = TransformationSequence(origin="A", operations=ops)
        assert "Descend 2 dimensions" in seq.describe()

    def test_describe_rotate_cw(self):
        ops = [Operation(symbol='⟲', name='rotate_cw', parameter=45.0)]
        seq = TransformationSequence(origin="A", operations=ops)
        assert "Rotate 45.0 clockwise" in seq.describe()

    def test_describe_rotate_ccw(self):
        ops = [Operation(symbol='⟳', name='rotate_ccw', parameter=180.0)]
        seq = TransformationSequence(origin="A", operations=ops)
        assert "Rotate 180.0 counterclockwise" in seq.describe()

    def test_describe_polarity(self):
        ops = [Operation(symbol='⇄', name='polarity')]
        seq = TransformationSequence(origin="A", operations=ops)
        assert "Reverse polarity" in seq.describe()

    def test_describe_wave(self):
        ops = [Operation(symbol='∿', name='wave')]
        seq = TransformationSequence(origin="A", operations=ops)
        assert "Wave function transform" in seq.describe()

    def test_describe_intersection(self):
        ops = [Operation(symbol='⊠', name='intersection')]
        seq = TransformationSequence(origin="A", operations=ops)
        assert "Mark intersection point" in seq.describe()

    def test_describe_parallel(self):
        ops = [Operation(symbol='∥', name='parallel')]
        seq = TransformationSequence(origin="A", operations=ops)
        assert "Enter parallel mode" in seq.describe()

    def test_describe_orthogonal(self):
        ops = [Operation(symbol='⊥', name='orthogonal')]
        seq = TransformationSequence(origin="A", operations=ops)
        assert "Enter orthogonal mode" in seq.describe()

    def test_describe_boundary(self):
        ops = [Operation(symbol='◬', name='boundary')]
        seq = TransformationSequence(origin="A", operations=ops)
        assert "Cross boundary" in seq.describe()

    def test_describe_infinite(self):
        ops = [Operation(symbol='∞', name='infinite')]
        seq = TransformationSequence(origin="A", operations=ops)
        assert "Infinite recursion" in seq.describe()

    def test_describe_void(self):
        ops = [Operation(symbol='∅', name='void')]
        seq = TransformationSequence(origin="A", operations=ops)
        assert "Traverse the void" in seq.describe()

    # --- Notation ---

    def test_notation_with_destination(self):
        ops = [Operation(symbol='⊕', name='ascend', parameter=3.0)]
        seq = TransformationSequence(origin="Earth", operations=ops, destination="Sky")
        assert seq.notation() == "Earth ⟿ ⊕[3] ⟿ Sky"

    def test_notation_without_destination(self):
        ops = [Operation(symbol='⊕', name='ascend')]
        seq = TransformationSequence(origin="Earth", operations=ops)
        assert seq.notation() == "Earth ⟿ ⊕"

    def test_notation_multiple_operations(self):
        ops = [
            Operation(symbol='⊕', name='ascend', parameter=3.0),
            Operation(symbol='⟲', name='rotate_cw', parameter=90.0),
            Operation(symbol='◬', name='boundary'),
        ]
        seq = TransformationSequence(origin="E", operations=ops, destination="C")
        assert seq.notation() == "E ⟿ ⊕[3]⟲[90]◬ ⟿ C"

    # --- Complexity ---

    def test_complexity_counts_transformative_ops(self):
        ops = [
            Operation(symbol='⊕', name='ascend'),
            Operation(symbol='⟲', name='rotate_cw'),
            Operation(symbol='◬', name='boundary'),
        ]
        seq = TransformationSequence(origin="A", operations=ops)
        assert seq.complexity == 3

    def test_complexity_excludes_infinite(self):
        ops = [
            Operation(symbol='⊕', name='ascend'),
            Operation(symbol='∞', name='infinite'),
        ]
        seq = TransformationSequence(origin="A", operations=ops)
        assert seq.complexity == 1

    def test_complexity_excludes_parallel(self):
        ops = [
            Operation(symbol='∥', name='parallel'),
            Operation(symbol='⊕', name='ascend'),
        ]
        seq = TransformationSequence(origin="A", operations=ops)
        assert seq.complexity == 1

    def test_complexity_excludes_orthogonal(self):
        ops = [
            Operation(symbol='⊥', name='orthogonal'),
            Operation(symbol='⊕', name='ascend'),
        ]
        seq = TransformationSequence(origin="A", operations=ops)
        assert seq.complexity == 1

    def test_complexity_empty_is_zero(self):
        seq = TransformationSequence(origin="A", operations=[])
        assert seq.complexity == 0

    # --- Dimension Delta ---

    def test_dimension_delta_ascend(self):
        ops = [Operation(symbol='⊕', name='ascend', parameter=5.0)]
        seq = TransformationSequence(origin="A", operations=ops)
        assert seq.dimension_delta == 5

    def test_dimension_delta_descend(self):
        ops = [Operation(symbol='⊖', name='descend', parameter=3.0)]
        seq = TransformationSequence(origin="A", operations=ops)
        assert seq.dimension_delta == -3

    def test_dimension_delta_net_calculation(self):
        ops = [
            Operation(symbol='⊕', name='ascend', parameter=5.0),
            Operation(symbol='⊖', name='descend', parameter=2.0),
        ]
        seq = TransformationSequence(origin="A", operations=ops)
        assert seq.dimension_delta == 3

    def test_dimension_delta_void_resets(self):
        ops = [
            Operation(symbol='⊕', name='ascend', parameter=10.0),
            Operation(symbol='∅', name='void'),
            Operation(symbol='⊕', name='ascend', parameter=2.0),
        ]
        seq = TransformationSequence(origin="A", operations=ops)
        assert seq.dimension_delta == 2

    def test_dimension_delta_no_dimensional_ops(self):
        ops = [
            Operation(symbol='⟲', name='rotate_cw'),
            Operation(symbol='◬', name='boundary'),
        ]
        seq = TransformationSequence(origin="A", operations=ops)
        assert seq.dimension_delta == 0

    # --- Repr ---

    def test_repr(self):
        ops = [Operation(symbol='⊕', name='ascend')]
        seq = TransformationSequence(origin="E", operations=ops, destination="S")
        r = repr(seq)
        assert "Sequence(" in r
        assert "E" in r


# =============================================================================
#                              PARSER
# =============================================================================

class TestParser:
    """Tests for parse() and _tokenize()."""

    def test_parse_full_notation(self):
        seq = parse("Earth ⟿ ⊕[3]⟲[90]◬⊠∿ ⟿ Celestial_Realm")
        assert seq.origin.realm == "Earth"
        assert seq.destination == "Celestial_Realm"
        assert len(seq.operations) == 5

    def test_parse_without_destination(self):
        seq = parse("Earth ⟿ ⊕[3]")
        assert seq.origin.realm == "Earth"
        assert seq.destination is None
        assert len(seq.operations) == 1

    def test_parse_single_operator(self):
        seq = parse("A ⟿ ⊕")
        assert len(seq.operations) == 1
        assert seq.operations[0].name == 'ascend'
        assert seq.operations[0].parameter is None

    def test_parse_operator_with_parameter(self):
        seq = parse("A ⟿ ⊕[7]")
        assert seq.operations[0].parameter == 7.0

    def test_parse_degree_symbol_stripped(self):
        seq = parse("A ⟿ ⟲[90°]")
        assert seq.operations[0].parameter == 90.0

    def test_parse_multiple_operators_no_params(self):
        seq = parse("A ⟿ ⊕⊖⟲⟳⇄∿⊠∥⊥◬∞∅ ⟿ B")
        assert len(seq.operations) == 12

    def test_parse_all_operators_recognized(self):
        seq = parse("X ⟿ ⊕⊖⟲⟳⇄∿⊠∥⊥◬∞∅")
        names = [op.name for op in seq.operations]
        assert names == [
            'ascend', 'descend', 'rotate_cw', 'rotate_ccw', 'polarity',
            'wave', 'intersection', 'parallel', 'orthogonal', 'boundary',
            'infinite', 'void',
        ]

    def test_parse_mixed_params(self):
        seq = parse("A ⟿ ⊕[3]⟲[45]◬⊠∿⊖[2] ⟿ B")
        assert seq.operations[0].parameter == 3.0
        assert seq.operations[1].parameter == 45.0
        assert seq.operations[2].parameter is None
        assert seq.operations[3].parameter is None
        assert seq.operations[4].parameter is None
        assert seq.operations[5].parameter == 2.0

    def test_parse_preserves_origin_as_position(self):
        seq = parse("Earth ⟿ ⊕")
        assert isinstance(seq.origin, Position)
        assert seq.origin.realm == "Earth"

    def test_parse_error_no_flow(self):
        with pytest.raises(ValueError, match="Notation must contain"):
            parse("no flow symbol here")

    def test_parse_error_unclosed_bracket(self):
        with pytest.raises(ValueError, match="Unclosed bracket"):
            parse("A ⟿ ⊕[3")

    def test_parse_whitespace_in_operators(self):
        seq = parse("A ⟿ ⊕ ⟲ ◬")
        assert len(seq.operations) == 3

    def test_parse_float_parameter(self):
        seq = parse("A ⟿ ⟲[45.5]")
        assert seq.operations[0].parameter == 45.5

    def test_parse_underscored_realm_names(self):
        seq = parse("Celestial_Realm ⟿ ⊕ ⟿ Higher_Plane")
        assert seq.origin.realm == "Celestial_Realm"
        assert seq.destination == "Higher_Plane"


# =============================================================================
#                              COMPOSE
# =============================================================================

class TestCompose:
    """Tests for compose()."""

    def test_compose_two_sequences(self):
        leg1 = parse("Earth ⟿ ⊕[3]◬ ⟿ Astral")
        leg2 = parse("Astral ⟿ ⊕[4]⟲[180]◬ ⟿ Akashic")
        composed = compose(leg1, leg2)
        assert composed.origin.realm == "Earth"
        assert composed.destination == "Akashic"
        assert len(composed.operations) == 5

    def test_compose_preserves_all_operations(self):
        leg1 = parse("A ⟿ ⊕[1]")
        leg2 = parse("B ⟿ ⊕[2]")
        leg3 = parse("C ⟿ ⊕[3] ⟿ D")
        composed = compose(leg1, leg2, leg3)
        params = [op.parameter for op in composed.operations]
        assert params == [1.0, 2.0, 3.0]

    def test_compose_single_sequence(self):
        seq = parse("A ⟿ ⊕[5] ⟿ B")
        composed = compose(seq)
        assert composed.origin.realm == "A"
        assert composed.destination == "B"
        assert len(composed.operations) == 1

    def test_compose_empty_raises(self):
        with pytest.raises(ValueError, match="at least one sequence"):
            compose()

    def test_compose_execution(self):
        leg1 = parse("Earth ⟿ ⊕[3]◬ ⟿ Mid")
        leg2 = parse("Mid ⟿ ⊕[2]⟲[90] ⟿ Sky")
        composed = compose(leg1, leg2)
        final, trail = composed.execute()
        assert final.dimension == 5
        assert final.angle == 90.0
        assert final.crossings == 1
        assert final.realm == "Sky"
        assert len(trail) == 4


# =============================================================================
#                          INTEGRATION TESTS
# =============================================================================

class TestIntegration:
    """Full journey integration tests."""

    def test_original_example(self):
        """The example from the original notation: Earth ⟿ ⊕[3]⟲[90]◬⊠∿ ⟿ Celestial_Realm"""
        seq = parse("Earth ⟿ ⊕[3]⟲[90]◬⊠∿ ⟿ Celestial_Realm")
        final, trail = seq.execute()

        assert final.realm == "Celestial_Realm"
        assert final.dimension == 3
        assert final.angle == 90.0
        assert final.crossings == 1
        assert len(final.intersections) == 1
        assert final.wave_state == "collapsed"
        assert seq.complexity == 5
        assert seq.dimension_delta == 3

    def test_round_trip_reversal(self):
        """Forward + reverse composed should return dimensional state to origin."""
        seq = parse("Earth ⟿ ⊕[3]⟲[90]◬ ⟿ Sky")
        rev = seq.reverse()
        round_trip = compose(seq, rev)
        final, _ = round_trip.execute()

        # Dimension returns to 0 after ascending 3 then descending 3
        assert final.dimension == 0
        # Angle returns to 0 after rotating 90 CW then 90 CCW
        assert final.angle == 0.0

    def test_void_traversal(self):
        """Void resets everything and adds a crossing."""
        seq = parse("Physical ⟿ ⊕[5]∅⊕[2] ⟿ Beyond")
        final, trail = seq.execute()

        assert final.realm == "Beyond"
        assert final.dimension == 2  # 5 -> void(0) -> +2
        assert final.crossings == 1  # Void counts as a crossing

    def test_double_void(self):
        """Two void traversals: two crossings, still reset."""
        seq = parse("A ⟿ ⊕[10]∅⊕[5]∅⊕[1] ⟿ B")
        final, trail = seq.execute()
        assert final.dimension == 1
        assert final.crossings == 2

    def test_polarity_in_journey(self):
        """Polarity reversal mid-journey."""
        seq = parse("A ⟿ ⇄⊕[3]⇄ ⟿ B")
        final, trail = seq.execute()
        assert final.polarity == 1  # Reversed twice = back to original
        assert final.dimension == 3

    def test_full_rotation_journey(self):
        """Complete 360-degree rotation."""
        seq = parse("A ⟿ ⟲[90]⟲[90]⟲[90]⟲[90] ⟿ B")
        final, _ = seq.execute()
        assert final.angle == 0.0  # Full rotation

    def test_ccw_rotation_journey(self):
        """Counterclockwise rotation."""
        seq = parse("A ⟿ ⟳[270] ⟿ B")
        final, _ = seq.execute()
        assert final.angle == 90.0  # (0 - 270) % 360 = 90

    def test_complex_multiop_journey(self):
        """A complex journey using many operators."""
        seq = parse("HOME ⟿ ⊕[1]◬⟲[45]∿⊕[2]◬⟲[45]⊠⊕[1]◬⇄ ⟿ Akashic")
        final, trail = seq.execute()

        assert final.realm == "Akashic"
        assert final.dimension == 4  # 1 + 2 + 1
        assert final.angle == 90.0  # 45 + 45
        assert final.crossings == 3
        assert final.wave_state == "collapsed"
        assert final.polarity == -1
        assert len(final.intersections) == 1
        assert len(trail) == 11  # ⊕◬⟲∿⊕◬⟲⊠⊕◬⇄

    def test_composed_journey_matches_manual(self):
        """Composed journey should produce the same result as a single long sequence."""
        # Single sequence
        single = parse("Earth ⟿ ⊕[3]◬⊕[4]⟲[180]◬ ⟿ Akashic")
        final_single, _ = single.execute()

        # Same journey composed from two legs
        leg1 = parse("Earth ⟿ ⊕[3]◬ ⟿ Astral")
        leg2 = parse("Astral ⟿ ⊕[4]⟲[180]◬ ⟿ Akashic")
        composed = compose(leg1, leg2)
        final_composed, _ = composed.execute()

        assert final_single.dimension == final_composed.dimension
        assert final_single.angle == final_composed.angle
        assert final_single.crossings == final_composed.crossings

    def test_notation_round_trip(self):
        """Parse notation, generate notation, parse again — should produce same result."""
        original = "Earth ⟿ ⊕[3]⟲[90]◬ ⟿ Sky"
        seq1 = parse(original)
        regenerated = seq1.notation()
        seq2 = parse(regenerated)

        final1, _ = seq1.execute()
        final2, _ = seq2.execute()

        assert final1.dimension == final2.dimension
        assert final1.angle == final2.angle
        assert final1.crossings == final2.crossings

    def test_wave_intersection_interaction(self):
        """Intersection records the current wave state at the moment of marking."""
        seq = parse("A ⟿ ∿⊠ ⟿ B")
        final, trail = seq.execute()
        assert final.wave_state == "collapsed"
        assert len(final.intersections) == 1
        # Intersection was recorded after wave collapse
        assert trail[1].after.wave_state == "collapsed"

    def test_parallel_orthogonal_modes(self):
        """Mode changes persist through subsequent operations."""
        seq = parse("A ⟿ ∥⊕[1]⊥⊕[1] ⟿ B")
        final, trail = seq.execute()
        # After parallel + ascend, mode is parallel
        assert trail[1].after.mode == "parallel"
        # After orthogonal + ascend, mode is orthogonal
        assert trail[3].after.mode == "orthogonal"
