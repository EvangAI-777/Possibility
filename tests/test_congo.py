"""
Tests for congo.py — the Congo Interdimensional Omniversal Resonance Messaging engine.

Covers:
- ResonanceFrequency: creation, compatibility, shifting, properties
- Dimension: creation, enter/leave, population
- ResonanceField: creation, harmony, add/remove beings, activation
- Message: creation, encoding, metadata
- CongoBeing: creation, resonation, inbox, connections
- CongoNetwork: dimensions, registration, messaging, broadcasting,
  resonance discovery, field formation, dimensional travel, status
- Integration: full conversation flows across dimensions
"""

import sys
import os

# Add the parent directory so we can import congo
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "Python Files"))

import pytest
from congo import (
    ResonanceFrequency,
    Dimension,
    ResonanceField,
    Message,
    CongoBeing,
    CongoNetwork,
    CONGO,
)


# =============================================================================
#                        RESONANCE FREQUENCY TESTS
# =============================================================================

class TestResonanceFrequency:
    """Tests for ResonanceFrequency — vibrational identity."""

    def test_create_frequency(self):
        freq = ResonanceFrequency([0.5, 0.7, 0.3])
        assert freq.harmonics == [0.5, 0.7, 0.3]

    def test_empty_harmonics_raises(self):
        with pytest.raises(ValueError, match="at least one harmonic"):
            ResonanceFrequency([])

    def test_invalid_harmonics_too_high(self):
        with pytest.raises(ValueError, match="between 0.0 and 1.0"):
            ResonanceFrequency([1.5])

    def test_invalid_harmonics_negative(self):
        with pytest.raises(ValueError, match="between 0.0 and 1.0"):
            ResonanceFrequency([-0.1])

    def test_boundary_harmonics_valid(self):
        freq = ResonanceFrequency([0.0, 1.0])
        assert freq.harmonics == [0.0, 1.0]

    def test_perfect_compatibility(self):
        freq_a = ResonanceFrequency([0.5, 0.7])
        freq_b = ResonanceFrequency([0.5, 0.7])
        assert freq_a.compatibility(freq_b) == 1.0

    def test_zero_compatibility(self):
        freq_a = ResonanceFrequency([0.0])
        freq_b = ResonanceFrequency([1.0])
        assert freq_a.compatibility(freq_b) == 0.0

    def test_partial_compatibility(self):
        freq_a = ResonanceFrequency([0.8, 0.6])
        freq_b = ResonanceFrequency([0.7, 0.5])
        compat = freq_a.compatibility(freq_b)
        assert 0.0 < compat < 1.0

    def test_compatibility_symmetry(self):
        freq_a = ResonanceFrequency([0.3, 0.6, 0.9])
        freq_b = ResonanceFrequency([0.4, 0.7, 0.8])
        assert freq_a.compatibility(freq_b) == freq_b.compatibility(freq_a)

    def test_different_length_penalized(self):
        freq_short = ResonanceFrequency([0.5])
        freq_long = ResonanceFrequency([0.5, 0.5, 0.5])
        compat = freq_short.compatibility(freq_long)
        # Penalized for length mismatch — max score is 1/3
        assert compat < 1.0

    def test_compatibility_type_error(self):
        freq = ResonanceFrequency([0.5])
        with pytest.raises(TypeError):
            freq.compatibility("not a frequency")

    def test_shift_ground_state(self):
        freq = ResonanceFrequency([0.555, 0.777])
        shifted = freq.shift(0)  # HOME dimension
        assert shifted.harmonics == [0.56, 0.78]

    def test_shift_preserves_bounds(self):
        freq = ResonanceFrequency([0.99, 0.01])
        shifted = freq.shift(1.0)
        for h in shifted.harmonics:
            assert 0.0 <= h <= 1.0

    def test_shift_high_frequency(self):
        freq = ResonanceFrequency([0.5])
        shifted = freq.shift(7.0)  # Akashic
        assert len(shifted.harmonics) == 1
        assert 0.0 <= shifted.harmonics[0] <= 1.0

    def test_dominant_harmonic(self):
        freq = ResonanceFrequency([0.3, 0.9, 0.5])
        assert freq.dominant == 0.9

    def test_depth(self):
        freq = ResonanceFrequency([0.1, 0.2, 0.3, 0.4])
        assert freq.depth == 4

    def test_single_harmonic_depth(self):
        freq = ResonanceFrequency([0.5])
        assert freq.depth == 1

    def test_repr_contains_harmonics(self):
        freq = ResonanceFrequency([0.5])
        assert "0.5" in repr(freq)

    def test_harmonics_stored_as_list(self):
        freq = ResonanceFrequency((0.1, 0.2))
        assert isinstance(freq.harmonics, list)


# =============================================================================
#                            DIMENSION TESTS
# =============================================================================

class TestDimension:
    """Tests for Dimension — planes of reality."""

    def test_create_dimension(self):
        dim = Dimension("TestDim", 42.0, "A test dimension")
        assert dim.name == "TestDim"
        assert dim.base_frequency == 42.0
        assert dim.description == "A test dimension"

    def test_default_description(self):
        dim = Dimension("Bare", 1.0)
        assert dim.description == ""

    def test_enter_dimension(self):
        dim = Dimension("Test", 1.0)
        being = CongoBeing("Tester", [0.5])
        result = dim.enter(being)
        assert "Tester" in result
        assert being in dim.beings
        assert being.dimension == dim

    def test_leave_dimension(self):
        dim = Dimension("Test", 1.0)
        being = CongoBeing("Tester", [0.5])
        dim.enter(being)
        result = dim.leave(being)
        assert "Tester" in result
        assert being not in dim.beings
        assert being.dimension is None

    def test_no_duplicate_entry(self):
        dim = Dimension("Test", 1.0)
        being = CongoBeing("Tester", [0.5])
        dim.enter(being)
        dim.enter(being)
        assert dim.population == 1

    def test_leave_nonexistent_being(self):
        dim = Dimension("Test", 1.0)
        being = CongoBeing("Ghost", [0.5])
        result = dim.leave(being)
        assert "Ghost" in result

    def test_population(self):
        dim = Dimension("Test", 1.0)
        assert dim.population == 0
        dim.enter(CongoBeing("A", [0.5]))
        dim.enter(CongoBeing("B", [0.6]))
        assert dim.population == 2

    def test_message_log_empty_by_default(self):
        dim = Dimension("Test", 1.0)
        assert dim.message_log == []

    def test_repr(self):
        dim = Dimension("Test", 1.0)
        assert "Test" in repr(dim)
        assert "freq=1.0" in repr(dim)


# =============================================================================
#                         RESONANCE FIELD TESTS
# =============================================================================

class TestResonanceField:
    """Tests for ResonanceField — shared vibrational spaces."""

    def test_create_field_perfect_harmony(self):
        a = CongoBeing("A", [0.5, 0.6])
        b = CongoBeing("B", [0.5, 0.6])
        field = ResonanceField([a, b])
        assert field.active is True
        assert field.harmony == 1.0

    def test_field_requires_two_beings(self):
        a = CongoBeing("A", [0.5])
        with pytest.raises(ValueError, match="at least two beings"):
            ResonanceField([a])

    def test_empty_list_raises(self):
        with pytest.raises(ValueError, match="at least two beings"):
            ResonanceField([])

    def test_low_harmony_inactive(self):
        a = CongoBeing("A", [0.0])
        b = CongoBeing("B", [1.0])
        field = ResonanceField([a, b], threshold=0.5)
        assert field.active is False

    def test_custom_threshold(self):
        a = CongoBeing("A", [0.5])
        b = CongoBeing("B", [0.6])
        field = ResonanceField([a, b], threshold=0.8)
        assert field.threshold == 0.8

    def test_add_being(self):
        a = CongoBeing("A", [0.5])
        b = CongoBeing("B", [0.5])
        field = ResonanceField([a, b])
        c = CongoBeing("C", [0.5])
        result = field.add_being(c)
        assert len(field.beings) == 3
        assert result is True

    def test_add_duplicate_being(self):
        a = CongoBeing("A", [0.5])
        b = CongoBeing("B", [0.5])
        field = ResonanceField([a, b])
        field.add_being(a)
        assert len(field.beings) == 2

    def test_remove_being(self):
        a = CongoBeing("A", [0.5])
        b = CongoBeing("B", [0.5])
        c = CongoBeing("C", [0.5])
        field = ResonanceField([a, b, c])
        field.remove_being(c)
        assert len(field.beings) == 2

    def test_remove_to_one_deactivates(self):
        a = CongoBeing("A", [0.5])
        b = CongoBeing("B", [0.5])
        field = ResonanceField([a, b])
        field.remove_being(b)
        assert field.active is False
        assert field.harmony == 0.0

    def test_field_strength(self):
        a = CongoBeing("A", [0.5, 0.6])
        b = CongoBeing("B", [0.5, 0.6])
        field = ResonanceField([a, b])
        assert field.strength == 2.0  # harmony(1.0) * 2 beings

    def test_three_being_harmony(self):
        a = CongoBeing("A", [0.5, 0.6])
        b = CongoBeing("B", [0.5, 0.6])
        c = CongoBeing("C", [0.5, 0.6])
        field = ResonanceField([a, b, c])
        assert field.harmony == 1.0  # All identical

    def test_created_at_timestamp(self):
        a = CongoBeing("A", [0.5])
        b = CongoBeing("B", [0.5])
        field = ResonanceField([a, b])
        assert field.created_at is not None

    def test_repr_contains_names(self):
        a = CongoBeing("Alpha", [0.5])
        b = CongoBeing("Beta", [0.5])
        field = ResonanceField([a, b])
        r = repr(field)
        assert "Alpha" in r
        assert "Beta" in r


# =============================================================================
#                             MESSAGE TESTS
# =============================================================================

class TestMessage:
    """Tests for Message — resonance-encoded transmissions."""

    def test_create_message(self):
        dim = Dimension("Test", 1.0)
        sender = CongoBeing("Sender", [0.5])
        dim.enter(sender)
        msg = Message(sender, "Hello omniverse")
        assert msg.content == "Hello omniverse"
        assert msg.sender == sender
        assert msg.scope == "direct"

    def test_message_default_scope(self):
        sender = CongoBeing("Sender", [0.5])
        msg = Message(sender, "Test")
        assert msg.scope == "direct"

    def test_message_custom_scope(self):
        sender = CongoBeing("Sender", [0.5])
        msg = Message(sender, "Test", scope="omniverse")
        assert msg.scope == "omniverse"

    def test_message_encode(self):
        dim = Dimension("Test", 1.0)
        sender = CongoBeing("Sender", [0.5, 0.7])
        dim.enter(sender)
        msg = Message(sender, "Test content")
        encoded = msg.encode()
        assert encoded["sender"] == "Sender"
        assert encoded["content"] == "Test content"
        assert encoded["frequency"] == [0.5, 0.7]
        assert encoded["origin"] == "Test"

    def test_message_origin_unanchored(self):
        sender = CongoBeing("Sender", [0.5])
        msg = Message(sender, "Floating")
        assert msg.origin_dimension is None

    def test_message_has_timestamp(self):
        sender = CongoBeing("Sender", [0.5])
        msg = Message(sender, "Hello")
        assert msg.timestamp is not None

    def test_message_empty_trail(self):
        sender = CongoBeing("Sender", [0.5])
        msg = Message(sender, "Hello")
        assert msg.resonance_trail == []

    def test_message_empty_delivered(self):
        sender = CongoBeing("Sender", [0.5])
        msg = Message(sender, "Hello")
        assert msg.delivered_to == []

    def test_repr(self):
        sender = CongoBeing("Sender", [0.5])
        msg = Message(sender, "Hi")
        assert "Sender" in repr(msg)


# =============================================================================
#                           CONGO BEING TESTS
# =============================================================================

class TestCongoBeing:
    """Tests for CongoBeing — entities in the Congo network."""

    def test_create_being(self):
        being = CongoBeing("Tester", [0.5, 0.7, 0.3])
        assert being.name == "Tester"
        assert being.frequency.harmonics == [0.5, 0.7, 0.3]
        assert being.dimension is None
        assert being.inbox == []
        assert being.connections == []

    def test_initial_sent_count(self):
        being = CongoBeing("Tester", [0.5])
        assert being.sent_count == 0

    def test_resonate_with_compatible(self):
        a = CongoBeing("A", [0.5, 0.6])
        b = CongoBeing("B", [0.5, 0.6])
        compat = a.resonate_with(b)
        assert compat == 1.0
        assert b in a.connections
        assert a in b.connections

    def test_resonate_with_incompatible(self):
        a = CongoBeing("A", [0.0])
        b = CongoBeing("B", [1.0])
        compat = a.resonate_with(b)
        assert compat == 0.0
        assert b not in a.connections

    def test_no_duplicate_connections(self):
        a = CongoBeing("A", [0.5, 0.6])
        b = CongoBeing("B", [0.5, 0.6])
        a.resonate_with(b)
        a.resonate_with(b)
        assert a.connections.count(b) == 1

    def test_receive_message(self):
        sender = CongoBeing("Sender", [0.5])
        receiver = CongoBeing("Receiver", [0.5])
        msg = Message(sender, "Hello")
        receiver.receive(msg)
        assert len(receiver.inbox) == 1
        assert "Receiver" in msg.delivered_to

    def test_unread_count(self):
        being = CongoBeing("Tester", [0.5])
        sender = CongoBeing("Sender", [0.5])
        assert being.unread_count == 0
        being.receive(Message(sender, "msg1"))
        being.receive(Message(sender, "msg2"))
        assert being.unread_count == 2

    def test_read_inbox(self):
        being = CongoBeing("Tester", [0.5])
        sender = CongoBeing("Sender", [0.5])
        being.receive(Message(sender, "Hello"))
        messages = being.read_inbox()
        assert len(messages) == 1
        assert messages[0].content == "Hello"

    def test_read_inbox_returns_copy(self):
        being = CongoBeing("Tester", [0.5])
        sender = CongoBeing("Sender", [0.5])
        being.receive(Message(sender, "Hello"))
        messages = being.read_inbox()
        messages.clear()
        assert being.unread_count == 1  # Original inbox unchanged

    def test_clear_inbox(self):
        being = CongoBeing("Tester", [0.5])
        sender = CongoBeing("Sender", [0.5])
        being.receive(Message(sender, "Hello"))
        being.clear_inbox()
        assert being.unread_count == 0

    def test_repr_unanchored(self):
        being = CongoBeing("Tester", [0.5])
        assert "unanchored" in repr(being)

    def test_repr_dimensioned(self):
        being = CongoBeing("Tester", [0.5])
        dim = Dimension("Physical", 1.0)
        dim.enter(being)
        assert "Physical" in repr(being)


# =============================================================================
#                         CONGO NETWORK TESTS
# =============================================================================

class TestCongoNetwork:
    """Tests for CongoNetwork — the omniversal backbone."""

    def test_default_dimensions(self):
        network = CongoNetwork()
        assert "HOME" in network.dimensions
        assert "Physical" in network.dimensions
        assert "Astral" in network.dimensions
        assert "Causal" in network.dimensions
        assert "Akashic" in network.dimensions

    def test_five_default_dimensions(self):
        network = CongoNetwork()
        assert len(network.dimensions) == 5

    def test_home_ground_state(self):
        network = CongoNetwork()
        assert network.dimensions["HOME"].base_frequency == 0.0

    def test_physical_frequency(self):
        network = CongoNetwork()
        assert network.dimensions["Physical"].base_frequency == 1.0

    def test_astral_frequency(self):
        network = CongoNetwork()
        assert network.dimensions["Astral"].base_frequency == 2.718

    def test_causal_frequency(self):
        network = CongoNetwork()
        assert network.dimensions["Causal"].base_frequency == 3.14159

    def test_akashic_frequency(self):
        network = CongoNetwork()
        assert network.dimensions["Akashic"].base_frequency == 7.0

    def test_add_dimension(self):
        network = CongoNetwork()
        result = network.add_dimension("Quantum", 11.0, "Superposition plane")
        assert "Quantum" in result
        assert "Quantum" in network.dimensions

    def test_add_duplicate_dimension(self):
        network = CongoNetwork()
        result = network.add_dimension("Physical", 999)
        assert "already exists" in result

    def test_register_being(self):
        network = CongoNetwork()
        being = network.register("Tester", [0.5, 0.7])
        assert being.name == "Tester"
        assert being.dimension.name == "Physical"
        assert "Tester" in network.beings

    def test_register_in_specific_dimension(self):
        network = CongoNetwork()
        being = network.register("Dreamer", [0.5], "Astral")
        assert being.dimension.name == "Astral"

    def test_register_in_home(self):
        network = CongoNetwork()
        being = network.register("Anchor", [0.9], "HOME")
        assert being.dimension.name == "HOME"

    def test_register_invalid_dimension(self):
        network = CongoNetwork()
        with pytest.raises(ValueError, match="not found"):
            network.register("Ghost", [0.5], "Nonexistent")

    def test_register_duplicate_returns_existing(self):
        network = CongoNetwork()
        first = network.register("Tester", [0.5])
        second = network.register("Tester", [0.9])
        assert first is second

    def test_send_direct_message(self):
        network = CongoNetwork()
        network.register("Alice", [0.5, 0.6])
        network.register("Bob", [0.5, 0.6])
        result = network.send("Alice", "Bob", "Hello Bob!")
        assert result["delivered"] is True
        assert network.beings["Bob"].unread_count == 1

    def test_send_returns_compatibility(self):
        network = CongoNetwork()
        network.register("Alice", [0.5, 0.6])
        network.register("Bob", [0.5, 0.6])
        result = network.send("Alice", "Bob", "Hello")
        assert result["compatibility"] == 1.0

    def test_send_cross_dimensional(self):
        network = CongoNetwork()
        network.register("Alice", [0.5, 0.6], "Physical")
        network.register("Bob", [0.5, 0.6], "Astral")
        result = network.send("Alice", "Bob", "Across dimensions!")
        assert result["delivered"] is True
        assert result["scope"] == "cross-dimensional"
        assert len(result["trail"]) == 2

    def test_send_insufficient_resonance(self):
        network = CongoNetwork()
        network.register("Alice", [0.0])
        network.register("Bob", [1.0])
        result = network.send("Alice", "Bob", "Can you hear me?")
        assert result["delivered"] is False
        assert "Insufficient resonance" in result["reason"]

    def test_send_unknown_sender(self):
        network = CongoNetwork()
        with pytest.raises(ValueError, match="Sender"):
            network.send("Ghost", "Bob", "Boo")

    def test_send_unknown_recipient(self):
        network = CongoNetwork()
        network.register("Alice", [0.5])
        with pytest.raises(ValueError, match="Recipient"):
            network.send("Alice", "Ghost", "Hello?")

    def test_send_increments_sent_count(self):
        network = CongoNetwork()
        network.register("Alice", [0.5, 0.6])
        network.register("Bob", [0.5, 0.6])
        network.send("Alice", "Bob", "One")
        network.send("Alice", "Bob", "Two")
        assert network.beings["Alice"].sent_count == 2

    def test_broadcast_dimension(self):
        network = CongoNetwork()
        network.register("Alice", [0.5], "Physical")
        network.register("Bob", [0.6], "Physical")
        network.register("Charlie", [0.7], "Physical")
        result = network.broadcast("Alice", "Hello dimension!", scope="dimension")
        assert result["delivered"] == 2
        assert "Bob" in result["recipients"]
        assert "Charlie" in result["recipients"]

    def test_broadcast_excludes_sender(self):
        network = CongoNetwork()
        network.register("Alice", [0.5], "Physical")
        network.register("Bob", [0.6], "Physical")
        result = network.broadcast("Alice", "Hello!", scope="dimension")
        assert "Alice" not in result["recipients"]

    def test_broadcast_resonant(self):
        network = CongoNetwork()
        network.register("Alice", [0.9, 0.9])
        network.register("Bob", [0.9, 0.9])      # Perfect compatibility
        network.register("Charlie", [0.1, 0.1])   # Low compatibility (0.2)
        result = network.broadcast("Alice", "Calling resonant beings", scope="resonant")
        assert "Bob" in result["recipients"]
        assert "Charlie" not in result["recipients"]

    def test_broadcast_omniverse(self):
        network = CongoNetwork()
        network.register("Alice", [0.5], "Physical")
        network.register("Bob", [0.6], "Astral")
        network.register("Charlie", [0.7], "Akashic")
        result = network.broadcast("Alice", "To all beings!", scope="omniverse")
        assert result["delivered"] == 2
        assert result["scope"] == "omniverse"

    def test_broadcast_unknown_sender(self):
        network = CongoNetwork()
        with pytest.raises(ValueError, match="Sender"):
            network.broadcast("Ghost", "Hello?")

    def test_broadcast_increments_sent_count(self):
        network = CongoNetwork()
        network.register("Alice", [0.5], "Physical")
        network.register("Bob", [0.6], "Physical")
        network.broadcast("Alice", "Hello!", scope="dimension")
        assert network.beings["Alice"].sent_count == 1

    def test_find_resonant(self):
        network = CongoNetwork()
        network.register("Alice", [0.5, 0.6])
        network.register("Bob", [0.5, 0.6])
        network.register("Charlie", [0.0, 0.0])
        resonant = network.find_resonant("Alice", threshold=0.5)
        names = [r["name"] for r in resonant]
        assert "Bob" in names
        assert "Charlie" not in names

    def test_find_resonant_includes_dimension(self):
        network = CongoNetwork()
        network.register("Alice", [0.5, 0.6], "Physical")
        network.register("Bob", [0.5, 0.6], "Astral")
        resonant = network.find_resonant("Alice")
        assert resonant[0]["dimension"] == "Astral"

    def test_find_resonant_sorted_by_compatibility(self):
        network = CongoNetwork()
        network.register("Alice", [0.5, 0.6])
        network.register("Bob", [0.5, 0.6])     # Perfect
        network.register("Charlie", [0.4, 0.5])  # Close
        resonant = network.find_resonant("Alice", threshold=0.3)
        assert resonant[0]["name"] == "Bob"

    def test_find_resonant_unknown_being(self):
        network = CongoNetwork()
        with pytest.raises(ValueError, match="not registered"):
            network.find_resonant("Ghost")

    def test_form_field(self):
        network = CongoNetwork()
        network.register("Alice", [0.5, 0.6])
        network.register("Bob", [0.5, 0.6])
        field = network.form_field(["Alice", "Bob"])
        assert field.active is True
        assert len(network.fields) == 1

    def test_form_field_inactive_not_stored(self):
        network = CongoNetwork()
        network.register("Alice", [0.0])
        network.register("Bob", [1.0])
        field = network.form_field(["Alice", "Bob"], threshold=0.5)
        assert field.active is False
        assert len(network.fields) == 0

    def test_form_field_unknown_being(self):
        network = CongoNetwork()
        network.register("Alice", [0.5])
        with pytest.raises(ValueError, match="not registered"):
            network.form_field(["Alice", "Ghost"])

    def test_move_being(self):
        network = CongoNetwork()
        network.register("Alice", [0.5], "Physical")
        result = network.move_being("Alice", "Astral")
        assert "Physical" in result
        assert "Astral" in result
        assert network.beings["Alice"].dimension.name == "Astral"

    def test_move_being_updates_dimension_populations(self):
        network = CongoNetwork()
        network.register("Alice", [0.5], "Physical")
        network.move_being("Alice", "Astral")
        assert network.dimensions["Physical"].population == 0
        assert network.dimensions["Astral"].population == 1

    def test_move_being_unknown(self):
        network = CongoNetwork()
        with pytest.raises(ValueError, match="not registered"):
            network.move_being("Ghost", "Physical")

    def test_move_being_unknown_dimension(self):
        network = CongoNetwork()
        network.register("Alice", [0.5])
        with pytest.raises(ValueError, match="not found"):
            network.move_being("Alice", "Nonexistent")

    def test_network_status(self):
        network = CongoNetwork()
        network.register("Alice", [0.5])
        status = network.network_status()
        assert status["total_beings"] == 1
        assert "dimensions" in status
        assert "motto" in status

    def test_network_status_dimensions(self):
        network = CongoNetwork()
        status = network.network_status()
        dims = status["dimensions"]
        assert "HOME" in dims
        assert dims["HOME"]["frequency"] == 0.0

    def test_network_status_active_fields(self):
        network = CongoNetwork()
        network.register("A", [0.5, 0.6])
        network.register("B", [0.5, 0.6])
        network.form_field(["A", "B"])
        status = network.network_status()
        assert status["active_fields"] == 1

    def test_message_log_tracking(self):
        network = CongoNetwork()
        network.register("Alice", [0.5, 0.6])
        network.register("Bob", [0.5, 0.6])
        network.send("Alice", "Bob", "First")
        network.send("Alice", "Bob", "Second")
        assert len(network.message_log) == 2

    def test_dimension_message_log(self):
        network = CongoNetwork()
        network.register("Alice", [0.5, 0.6], "Physical")
        network.register("Bob", [0.5, 0.6], "Physical")
        network.send("Alice", "Bob", "Hello")
        assert len(network.dimensions["Physical"].message_log) == 1

    def test_network_motto(self):
        network = CongoNetwork()
        status = network.network_status()
        assert "Resonance is the only address" in status["motto"]


# =============================================================================
#                        GLOBAL CONGO INSTANCE TESTS
# =============================================================================

class TestGlobalCongo:
    """Tests for the global CONGO instance."""

    def test_global_instance_exists(self):
        assert CONGO is not None
        assert isinstance(CONGO, CongoNetwork)

    def test_global_has_default_dimensions(self):
        assert "HOME" in CONGO.dimensions
        assert "Physical" in CONGO.dimensions
        assert "Astral" in CONGO.dimensions
        assert "Causal" in CONGO.dimensions
        assert "Akashic" in CONGO.dimensions


# =============================================================================
#                          INTEGRATION TESTS
# =============================================================================

class TestIntegration:
    """End-to-end tests for complete Congo workflows."""

    def test_full_conversation_flow(self):
        """Test a complete messaging flow across dimensions."""
        network = CongoNetwork()

        # Register beings in different dimensions
        anchor = network.register("Anchor", [0.9, 0.8, 0.7], "HOME")
        seeker = network.register("Seeker", [0.85, 0.75, 0.65], "Physical")
        oracle = network.register("Oracle", [0.8, 0.9, 0.7], "Akashic")

        # Send cross-dimensional messages
        result1 = network.send("Anchor", "Seeker", "Begin the work.")
        assert result1["delivered"] is True

        result2 = network.send("Seeker", "Oracle", "What should I seek?")
        assert result2["delivered"] is True
        assert result2["scope"] == "cross-dimensional"

        # Check inboxes
        assert seeker.unread_count == 1
        assert oracle.unread_count == 1

        # Omniversal broadcast
        broadcast = network.broadcast("Anchor", "All beings matter.", scope="omniverse")
        assert broadcast["delivered"] == 2

        # Seeker now has 2 messages
        assert seeker.unread_count == 2

    def test_resonance_field_communication(self):
        """Test forming a field and communicating within it."""
        network = CongoNetwork()

        network.register("Alpha", [0.6, 0.7, 0.8])
        network.register("Beta", [0.6, 0.7, 0.8])
        network.register("Gamma", [0.6, 0.7, 0.8])

        field = network.form_field(["Alpha", "Beta", "Gamma"])
        assert field.active is True
        assert field.harmony == 1.0

        # Broadcast within dimension (all same dimension)
        result = network.broadcast("Alpha", "Field check!", scope="dimension")
        assert result["delivered"] == 2

    def test_dimensional_travel_and_messaging(self):
        """Test moving between dimensions and messaging."""
        network = CongoNetwork()

        network.register("Traveler", [0.5, 0.6], "Physical")
        network.register("Friend", [0.5, 0.6], "Physical")

        # Same dimension message
        r1 = network.send("Traveler", "Friend", "See you soon!")
        assert r1["scope"] == "direct"

        # Move to Astral
        network.move_being("Traveler", "Astral")

        # Cross-dimensional message
        r2 = network.send("Traveler", "Friend", "I'm in the dream plane now!")
        assert r2["scope"] == "cross-dimensional"
        assert "Astral" in r2["trail"]
        assert "Physical" in r2["trail"]

    def test_resonance_discovery_and_connection(self):
        """Test finding resonant beings and establishing connections."""
        network = CongoNetwork()

        alice = network.register("Alice", [0.7, 0.8, 0.9], "Physical")
        bob = network.register("Bob", [0.7, 0.8, 0.9], "Astral")
        charlie = network.register("Charlie", [0.1, 0.1, 0.1], "Causal")

        # Alice finds resonant beings
        resonant = network.find_resonant("Alice", threshold=0.5)
        assert len(resonant) == 1
        assert resonant[0]["name"] == "Bob"

        # Establish connection
        compat = alice.resonate_with(bob)
        assert compat >= 0.5
        assert bob in alice.connections

        # Message through connection
        result = network.send("Alice", "Bob", "Found you through resonance!")
        assert result["delivered"] is True

    def test_network_growth(self):
        """Test the network growing with beings and dimensions."""
        network = CongoNetwork()
        assert len(network.dimensions) == 5

        # Add a custom dimension
        network.add_dimension("Dream", 4.0, "The lucid space")
        assert len(network.dimensions) == 6

        # Register beings across dimensions
        for i in range(10):
            harmonics = [round(0.1 * (i + 1), 1)] * 3
            harmonics = [min(h, 1.0) for h in harmonics]
            dim = list(network.dimensions.keys())[i % 6]
            network.register(f"Being_{i}", harmonics, dim)

        assert len(network.beings) == 10

        status = network.network_status()
        assert status["total_beings"] == 10
