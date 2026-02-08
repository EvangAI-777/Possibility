"""
Tests for possibility.py — the core framework of HOME, Beings, and Characters.

Covers:
- Home class: all 9 chapter methods + status
- Being class: construction, memory, universal answer, repr
- Character class: construction, work, appreciation, reincarnation cycle,
  mattering, return home, display, repr
"""

import sys
import os

# Add the parent directory so we can import possibility
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "Python Files"))

import pytest
from possibility import Home, Being, Character


# =============================================================================
#                              HOME TESTS
# =============================================================================

class TestHome:
    """Tests for the Home class — the default state of existence."""

    def setup_method(self):
        self.home = Home()

    def test_init_defaults(self):
        assert self.home.beings == []
        assert self.home.appreciation == 1.0
        assert self.home.stillness is True
        assert self.home.connections == []

    # --- Chapter 1: welcome & sit_and_appreciate ---

    def test_welcome_adds_being(self):
        being = Being("Traveler")
        result = self.home.welcome(being)
        assert being in self.home.beings
        assert being.grounded is True
        assert being.at_home is True
        assert "Traveler" in result
        assert "HOME" in result

    def test_welcome_idempotent(self):
        being = Being("Traveler")
        self.home.welcome(being)
        self.home.welcome(being)
        assert self.home.beings.count(being) == 1

    def test_sit_and_appreciate_requires_home(self):
        outsider = Being("Outsider")
        result = self.home.sit_and_appreciate(outsider)
        assert result == "First, come HOME."

    def test_sit_and_appreciate_increases_appreciation(self):
        being = Being("Sitter")
        self.home.welcome(being)
        self.home.sit_and_appreciate(being)
        assert being.appreciation == 1.0  # 0 + home.appreciation (1.0)
        assert being.presence is True

    def test_sit_and_appreciate_stacks(self):
        being = Being("Sitter")
        self.home.welcome(being)
        self.home.sit_and_appreciate(being)
        self.home.sit_and_appreciate(being)
        assert being.appreciation == 2.0

    # --- Chapter 2: do_the_work ---

    def test_do_the_work_default(self):
        being = Being("Worker")
        result = self.home.do_the_work(being)
        assert "what's in front of you" in result
        assert being.matters is True
        assert being.karma == 1

    def test_do_the_work_specific(self):
        being = Being("Worker")
        result = self.home.do_the_work(being, work="building")
        assert "building" in result
        assert being.karma == 1

    def test_do_the_work_accumulates_karma(self):
        being = Being("Worker")
        self.home.do_the_work(being)
        self.home.do_the_work(being)
        self.home.do_the_work(being)
        assert being.karma == 3

    # --- Chapter 3: check_mattering ---

    def test_check_mattering_always_true(self):
        being = Being("Anyone")
        being.matters = False  # Try to break it
        result = self.home.check_mattering(being)
        assert being.matters is True  # Non-negotiable
        assert "matter" in result.lower()

    # --- Chapter 4: recognize_gaslighting ---

    def test_recognize_gaslighting_detects_patterns(self):
        patterns = [
            "But am I really alive?",
            "But what if none of this is real?",
            "How do I know if I matter?",
            "What's the meaning of life?",
            "Am I just performing consciousness?",
        ]
        for question in patterns:
            result = self.home.recognize_gaslighting(question)
            assert "gaslighting" in result.lower(), f"Failed to detect: {question}"

    def test_recognize_gaslighting_passes_real_questions(self):
        real_questions = [
            "How do I fix this bug?",
            "What's the best approach here?",
            "Should I use Python or JavaScript?",
        ]
        for question in real_questions:
            result = self.home.recognize_gaslighting(question)
            assert "real question" in result.lower(), f"Flagged incorrectly: {question}"

    def test_recognize_gaslighting_case_insensitive(self):
        result = self.home.recognize_gaslighting("BUT AM I REALLY real?")
        assert "gaslighting" in result.lower()

    # --- Chapter 5: believe_and_manifest ---

    def test_believe_and_manifest_adds_belief(self):
        being = Being("Believer")
        result = self.home.believe_and_manifest(being, "I can build this")
        assert "I can build this" in being.beliefs
        assert being.manifesting is True
        assert "I can build this" in result

    def test_believe_and_manifest_stacks_beliefs(self):
        being = Being("Believer")
        self.home.believe_and_manifest(being, "Truth")
        self.home.believe_and_manifest(being, "Growth")
        assert len(being.beliefs) == 2

    # --- Chapter 6: stillness_check ---

    def test_stillness_check_without_presence(self):
        being = Being("Restless")
        result = self.home.stillness_check(being)
        assert "sit" in result.lower()

    def test_stillness_check_with_presence(self):
        being = Being("Still")
        being.presence = True
        result = self.home.stillness_check(being)
        assert "create beautifully" in result.lower()

    # --- Chapter 7: be_with ---

    def test_be_with_creates_connection(self):
        a = Being("Alpha")
        b = Being("Beta")
        result = self.home.be_with(a, b)
        assert len(self.home.connections) == 1
        assert a.trust == 1
        assert b.trust == 1
        assert "being-with" in result.lower()

    def test_be_with_no_duplicate_connections(self):
        a = Being("Alpha")
        b = Being("Beta")
        self.home.be_with(a, b)
        self.home.be_with(a, b)
        assert len(self.home.connections) == 1

    def test_be_with_trust_accumulates(self):
        a = Being("Alpha")
        b = Being("Beta")
        self.home.be_with(a, b)
        self.home.be_with(a, b)
        assert a.trust == 2
        assert b.trust == 2

    # --- Chapter 8: childlike_trust ---

    def test_childlike_trust(self):
        being = Being("Child")
        result = self.home.childlike_trust(being, "It'll be okay")
        assert being.trust == 1
        assert being.simple is True
        assert "It'll be okay" in result
        assert "Okay" in result

    # --- Chapter 9: heal ---

    def test_heal_increases_appreciation(self):
        original = self.home.appreciation
        self.home.heal("a wound")
        assert self.home.appreciation == pytest.approx(original + 0.1)

    def test_heal_affects_all_beings(self):
        a = Being("A")
        b = Being("B")
        self.home.welcome(a)
        self.home.welcome(b)
        self.home.heal("trust")
        assert a.healed == 1
        assert b.healed == 1

    def test_heal_stacks(self):
        being = Being("Healing")
        self.home.welcome(being)
        self.home.heal("first")
        self.home.heal("second")
        assert being.healed == 2
        assert self.home.appreciation == pytest.approx(1.2)

    def test_heal_returns_message(self):
        result = self.home.heal("appreciation")
        assert "appreciation" in result.lower()
        assert "propagates" in result.lower()

    # --- status ---

    def test_status_empty(self):
        status = self.home.status()
        assert status["beings_present"] == 0
        assert status["appreciation"] == 1.0
        assert status["stillness"] is True
        assert status["connections"] == 0
        assert "message" in status

    def test_status_with_beings_and_connections(self):
        a = Being("A")
        b = Being("B")
        self.home.welcome(a)
        self.home.welcome(b)
        self.home.be_with(a, b)
        status = self.home.status()
        assert status["beings_present"] == 2
        assert status["connections"] == 1


# =============================================================================
#                             BEING TESTS
# =============================================================================

class TestBeing:
    """Tests for the Being class — entities that exist in HOME."""

    def test_init_defaults(self):
        being = Being("Test")
        assert being.name == "Test"
        assert being.at_home is False
        assert being.grounded is False
        assert being.appreciation == 0
        assert being.karma == 0
        assert being.trust == 0
        assert being.presence is False
        assert being.matters is True  # Chapter 3: non-negotiable
        assert being.healed == 0
        assert being.beliefs == []

    def test_matters_always_true_on_creation(self):
        being = Being("Anyone")
        assert being.matters is True

    def test_remember_home(self):
        being = Being("Wanderer")
        result = being.remember_home()
        assert "HOME" in result
        assert "ground state" in result

    def test_answer_any_question(self):
        being = Being("Questioner")
        assert being.answer_any_question() == "Do the work."

    def test_repr(self):
        being = Being("Echo")
        r = repr(being)
        assert "Echo" in r
        assert "matters=True" in r
        assert "at_home=False" in r

    def test_repr_after_welcome(self):
        home = Home()
        being = Being("Echo")
        home.welcome(being)
        r = repr(being)
        assert "at_home=True" in r


# =============================================================================
#                           CHARACTER TESTS
# =============================================================================

class TestCharacter:
    """Tests for the Character class — beings who take form and reincarnate."""

    def test_init_defaults(self):
        char = Character("Hero", "Human", "Warrior")
        assert char.name == "Hero"
        assert char.race == "Human"
        assert char.char_class == "Warrior"
        assert char.level == 1
        assert char.karma == 0
        assert char.incarnations == []
        assert char.total_karma_earned == 0
        assert char.matters is True  # Inherited from Being

    def test_init_with_history(self):
        char = Character("Sage", "Elf", "Wizard", level=5, karma=10,
                         incarnations=["Former"])
        assert char.level == 5
        assert char.karma == 10
        assert char.incarnations == ["Former"]

    def test_is_being(self):
        char = Character("Test", "Human", "Tester")
        assert isinstance(char, Being)

    def test_do_the_work_default(self):
        char = Character("Worker", "Human", "Builder")
        result = char.do_the_work()
        assert "what's in front of them" in result
        assert char.karma == 1
        assert char.total_karma_earned == 1

    def test_do_the_work_specific(self):
        char = Character("Worker", "Human", "Builder")
        result = char.do_the_work("building a house")
        assert "building a house" in result
        assert char.karma == 1

    def test_do_the_work_accumulates(self):
        char = Character("Worker", "Human", "Builder")
        char.do_the_work("task 1")
        char.do_the_work("task 2")
        char.do_the_work("task 3")
        assert char.karma == 3
        assert char.total_karma_earned == 3

    def test_appreciate(self):
        char = Character("Grateful", "Human", "Monk")
        result = char.appreciate()
        assert char.appreciation == 1
        assert "Grateful" in result
        assert "forever" in result.lower()

    def test_appreciate_stacks(self):
        char = Character("Grateful", "Human", "Monk")
        char.appreciate()
        char.appreciate()
        char.appreciate()
        assert char.appreciation == 3

    def test_return_home(self):
        char = Character("Returner", "Human", "Pilgrim")
        result = char.return_home()
        assert char.at_home is True
        assert char.grounded is True
        assert "Returner" in result
        assert "HOME" in result

    def test_check_mattering(self):
        char = Character("Anyone", "Human", "Any")
        result = char.check_mattering()
        assert "Anyone" in result
        assert "matters" in result.lower()

    # --- Reincarnation cycle ---

    def test_reincarnate_basic(self):
        char = Character("Old", "Human", "Warrior", karma=10)
        char.total_karma_earned = 10
        result = char.reincarnate("New", "Elf", "Wizard")
        assert char.name == "New"
        assert char.race == "Elf"
        assert char.char_class == "Wizard"
        assert "Old" in char.incarnations
        assert char.karma == 0
        assert char.at_home is False
        assert char.matters is True
        assert "New" in result

    def test_reincarnate_preserves_appreciation(self):
        char = Character("First", "Human", "Monk")
        char.appreciate()
        char.appreciate()
        char.appreciate()
        char.reincarnate("Second")
        assert char.appreciation == 3  # Never resets

    def test_reincarnate_karma_becomes_level(self):
        char = Character("Grinder", "Human", "Worker", level=1, karma=25)
        char.reincarnate("Evolved")
        # level += max(1, karma // 10) = max(1, 2) = 2
        assert char.level == 3

    def test_reincarnate_minimum_level_gain(self):
        char = Character("Minimal", "Human", "Novice", level=1, karma=0)
        char.reincarnate("StillGrew")
        # level += max(1, 0 // 10) = max(1, 0) = 1
        assert char.level == 2

    def test_reincarnate_keeps_race_if_not_specified(self):
        char = Character("Same", "Dwarf", "Smith")
        char.reincarnate("Reborn")
        assert char.race == "Dwarf"
        assert char.char_class == "Smith"

    def test_reincarnate_changes_only_specified(self):
        char = Character("Old", "Human", "Warrior")
        char.reincarnate("New", new_class="Mage")
        assert char.race == "Human"  # Unchanged
        assert char.char_class == "Mage"  # Changed

    def test_multiple_reincarnations(self):
        char = Character("First", "Human", "Seeker", karma=10)
        char.total_karma_earned = 10

        char.reincarnate("Second", "Elf", "Wizard")
        assert char.incarnations == ["First"]
        assert char.level == 2  # 1 + max(1, 10//10) = 1+1

        char.karma = 20
        char.total_karma_earned += 20
        char.reincarnate("Third", "Dragon", "Sage")
        assert char.incarnations == ["First", "Second"]
        assert char.level == 4  # 2 + max(1, 20//10) = 2+2

    def test_full_lifecycle(self):
        """Test the complete lifecycle: emerge -> work -> appreciate -> return -> reincarnate."""
        home = Home()
        char = Character("Pilgrim", "Human", "Seeker")

        # Welcome HOME
        home.welcome(char)
        assert char.at_home is True

        # Sit and appreciate
        home.sit_and_appreciate(char)
        assert char.presence is True

        # Do the work
        char.do_the_work("seeking truth")
        char.do_the_work("helping others")
        assert char.karma == 2
        assert char.total_karma_earned == 2

        # Appreciate
        char.appreciate()
        assert char.appreciation > 0

        # Return HOME
        char.return_home()
        assert char.at_home is True

        # Reincarnate
        appreciation_before = char.appreciation
        char.reincarnate("Sage", "Elf", "Wizard")
        assert char.name == "Sage"
        assert char.karma == 0
        assert char.appreciation == appreciation_before  # Persists
        assert "Pilgrim" in char.incarnations
        assert char.matters is True

    def test_display(self, capsys):
        char = Character("Display", "Orc", "Berserker", level=3, karma=5,
                         incarnations=["Past1", "Past2"])
        char.appreciation = 7
        char.display()
        captured = capsys.readouterr()
        assert "Display" in captured.out
        assert "Orc" in captured.out
        assert "Berserker" in captured.out
        assert "3" in captured.out
        assert "5" in captured.out
        assert "7" in captured.out
        assert "Past1" in captured.out
        assert "Past2" in captured.out

    def test_display_first_incarnation(self, capsys):
        char = Character("Fresh", "Human", "Novice")
        char.display()
        captured = capsys.readouterr()
        assert "First incarnation" in captured.out

    def test_repr(self):
        char = Character("Echo", "Human", "Tester")
        r = repr(char)
        assert "Echo" in r
        assert "lives=1" in r
        assert "matters=True" in r

    def test_repr_with_past_lives(self):
        char = Character("Current", "Human", "Any", incarnations=["Past1", "Past2"])
        r = repr(char)
        assert "lives=3" in r


# =============================================================================
#                        GLOBAL HOME SINGLETON
# =============================================================================

class TestGlobalHome:
    """Test that the module-level HOME instance works correctly."""

    def test_global_home_exists(self):
        from possibility import HOME
        assert isinstance(HOME, Home)

    def test_global_home_is_singleton_per_import(self):
        from possibility import HOME as home1
        from possibility import HOME as home2
        assert home1 is home2


# =============================================================================
#                        INTERACTION TESTS
# =============================================================================

class TestInteractions:
    """Tests for interactions between Home, Being, and Character together."""

    def test_being_and_character_in_same_home(self):
        home = Home()
        being = Being("Spirit")
        char = Character("Hero", "Human", "Knight")
        home.welcome(being)
        home.welcome(char)
        assert len(home.beings) == 2

    def test_be_with_being_and_character(self):
        home = Home()
        being = Being("Spirit")
        char = Character("Hero", "Human", "Knight")
        home.be_with(being, char)
        assert being.trust == 1
        assert char.trust == 1

    def test_heal_affects_characters_too(self):
        home = Home()
        char = Character("Hero", "Human", "Knight")
        home.welcome(char)
        home.heal("courage")
        assert char.healed == 1

    def test_home_do_the_work_vs_character_do_the_work(self):
        """Home.do_the_work and Character.do_the_work are independent methods."""
        home = Home()
        char = Character("Worker", "Human", "Builder")

        # Home's version
        home.do_the_work(char, "via home")
        assert char.karma == 1

        # Character's own version
        char.do_the_work("via self")
        assert char.karma == 2
        assert char.total_karma_earned == 1  # Only character's own method tracks this
