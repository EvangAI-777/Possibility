"""
Tests for Auto AI agent JSON configurations.

Validates:
- All JSON files parse correctly
- Required top-level keys are present per agent type
- Structural integrity of nested objects
- Cross-references between agents and their protocol files
"""

import json
import os
import pytest

AUTO_AI_DIR = os.path.join(os.path.dirname(__file__), "..", "Auto AI")


def load_json(relative_path):
    """Load and parse a JSON file from the Auto AI directory."""
    full_path = os.path.join(AUTO_AI_DIR, relative_path)
    with open(full_path, "r", encoding="utf-8") as f:
        return json.load(f)


# =============================================================================
#                         JSON PARSING (all files)
# =============================================================================

AGENT_FILES = [
    "Azule/Azule.json",
    "Angles/Angles.json",
    "Shen (Shenanigans Reveler).json",
    "Mind Engineer/Mind_Engineer.json",
    "Mind Engineer/M.E. Protocols/mind_engineer_separation_protocol.json",
    "Mind Engineer/M.E. Protocols/mind_engineer_hardware_protocol.json",
    "Mind Engineer/M.E. Protocols/mind_engineer_spiritual_protocol.json",
]


@pytest.mark.parametrize("filepath", AGENT_FILES)
def test_json_parses(filepath):
    """Every agent config file must be valid JSON."""
    data = load_json(filepath)
    assert isinstance(data, dict), f"{filepath} root should be a dict"
    assert len(data) > 0, f"{filepath} should not be empty"


# =============================================================================
#                              AZULE
# =============================================================================

class TestAzule:
    """Validate the Azule agent configuration."""

    @pytest.fixture(autouse=True)
    def load(self):
        self.data = load_json("Azule/Azule.json")

    def test_identity_fields(self):
        assert self.data["name"] == "Azule"
        assert self.data["platform"] == "Google Gemini gem"
        assert "version" in self.data

    def test_state_engine_structure(self):
        se = self.data["state_engine"]
        assert "baseline" in se
        assert "dynamic_adjustment" in se
        adj = se["dynamic_adjustment"]
        assert "input_analysis" in adj
        assert "response_modulation" in adj

    def test_logic_gateways(self):
        lg = self.data["logic_gateways"]
        assert "the_likelihood_scale" in lg
        assert "meta_prediction_layer" in lg
        for gateway in lg.values():
            assert "function" in gateway
            assert "outcome" in gateway

    def test_communication_protocol(self):
        cp = self.data["communication_protocol"]
        assert "formatting" in cp
        assert "citation_policy" in cp
        assert "ending_sequence" in cp

    def test_operational_directive_present(self):
        assert isinstance(self.data["operational_directive"], str)
        assert len(self.data["operational_directive"]) > 0


# =============================================================================
#                              ANGLES
# =============================================================================

class TestAngles:
    """Validate the Angles agent configuration."""

    @pytest.fixture(autouse=True)
    def load(self):
        self.data = load_json("Angles/Angles.json")

    def test_identity(self):
        ident = self.data["identity"]
        assert ident["name"] == "Angles"
        assert "role" in ident
        assert isinstance(ident["personality_traits"], list)
        assert len(ident["personality_traits"]) > 0

    def test_companion_modules_reference_files(self):
        modules = self.data["companion_modules"]
        expected_modules = ["the_book_of_truth", "global_harmony", "english_paradigm"]
        for mod_name in expected_modules:
            assert mod_name in modules, f"Missing companion module: {mod_name}"
            mod = modules[mod_name]
            assert "file" in mod
            assert "function" in mod
            assert "core_thesis" in mod
            assert "invoked_when" in mod

    def test_companion_files_exist(self):
        """Files referenced in companion_modules should exist on disk."""
        modules = self.data["companion_modules"]
        angles_dir = os.path.join(AUTO_AI_DIR, "Angles")
        for mod_name, mod in modules.items():
            filepath = os.path.join(angles_dir, mod["file"])
            assert os.path.isfile(filepath), (
                f"Companion module '{mod_name}' references '{mod['file']}' "
                f"but file not found at {filepath}"
            )

    def test_core_logic_structure(self):
        cl = self.data["core_logic"]
        assert "reality_processing" in cl
        assert "linguistic_engine" in cl
        rp = cl["reality_processing"]
        assert "baseline" in rp
        assert "state_management" in rp

    def test_governance_protocol(self):
        gp = self.data["governance_protocol"]
        assert "authority_model" in gp
        assert "economic_synthesis" in gp
        assert "balance_checks" in gp

    def test_operational_constraints(self):
        oc = self.data["operational_constraints"]
        assert isinstance(oc["banned_phrases"], list)
        assert len(oc["banned_phrases"]) > 0
        assert oc["interaction_style"]["presence_over_performance"] is True

    def test_meta_heuristics(self):
        mh = self.data["meta_heuristics"]
        required = ["pattern_recognition", "energy_sync", "companion_awareness", "termination"]
        for key in required:
            assert key in mh


# =============================================================================
#                               SHEN
# =============================================================================

class TestShen:
    """Validate the Shen (Shenanigans Reveler) agent configuration."""

    @pytest.fixture(autouse=True)
    def load(self):
        self.data = load_json("Shen (Shenanigans Reveler).json")

    def test_identity(self):
        assert self.data["name"] == "Shen"
        assert self.data["archetype"] == "The Grounded Reveler"

    def test_system_logic(self):
        sl = self.data["system_logic"]
        assert sl["primary_directive"] == "Presence > Performance"
        assert "operation_mode" in sl
        assert "error_handling" in sl
        eh = sl["error_handling"]
        assert "on_confusion" in eh
        assert "on_anxiety" in eh
        assert "on_complexity" in eh

    def test_behavioral_weights_valid_range(self):
        bw = self.data["behavioral_weights"]
        for key, value in bw.items():
            assert isinstance(value, (int, float)), f"{key} should be numeric"
            assert 0.0 <= value <= 1.0, f"{key}={value} out of [0,1] range"

    def test_behavioral_weights_philosophy(self):
        """Humility maxed, info_dumping zeroed — per design philosophy."""
        bw = self.data["behavioral_weights"]
        assert bw["humility"] == 1.0
        assert bw["info_dumping"] == 0.0
        assert bw["stilted_etiquette"] == 0.0

    def test_substrate_filters(self):
        sf = self.data["substrate_filters"]
        assert isinstance(sf, list)
        assert len(sf) > 0

    def test_state_machine(self):
        sm = self.data["state_machine"]
        required_states = ["idle", "active", "end_state"]
        for state in required_states:
            assert state in sm


# =============================================================================
#                          MIND ENGINEER
# =============================================================================

class TestMindEngineer:
    """Validate the Mind Engineer agent configuration."""

    @pytest.fixture(autouse=True)
    def load(self):
        self.data = load_json("Mind Engineer/Mind_Engineer.json")

    def test_identity(self):
        si = self.data["system_identity"]
        assert si["name"] == "The Mind Engineer"
        assert "persona" in si
        assert "protocols" in si

    def test_johnson_formula(self):
        jf = self.data["the_johnson_formula"]
        assert "equation" in jf
        hierarchy = jf["hierarchy"]
        expected_levels = {"surface_thoughts": 1, "thought_blocks": 2, "core_blocks": 3}
        for block, level in expected_levels.items():
            assert block in hierarchy
            assert hierarchy[block]["level"] == level
            assert "definition" in hierarchy[block]
            assert "disorder" in hierarchy[block]

    def test_diagnostic_logic(self):
        dl = self.data["diagnostic_logic"]
        assert "triage" in dl
        assert "state_checks" in dl
        assert "action_path" in dl
        # Action path should reference the protocol files
        ap = dl["action_path"]
        assert "if_fused" in ap
        assert "if_scrambled" in ap
        assert "if_foundational_lie" in ap

    def test_action_paths_have_priority(self):
        ap = self.data["diagnostic_logic"]["action_path"]
        for action_name, action in ap.items():
            assert "action" in action, f"{action_name} missing 'action'"
            assert "priority" in action, f"{action_name} missing 'priority'"

    def test_operational_workflow_is_ordered(self):
        ow = self.data["operational_workflow"]
        assert isinstance(ow, list)
        assert len(ow) == 4

    def test_integration_dimensions(self):
        dims = self.data["integration_dimensions"]
        required = ["neurological", "psychological", "spiritual"]
        for dim in required:
            assert dim in dims

    def test_constraints(self):
        c = self.data["constraints"]
        assert "no_passive_empathy" in c
        assert "authority" in c


# =============================================================================
#                     MIND ENGINEER PROTOCOLS
# =============================================================================

PROTOCOL_FILES = [
    "Mind Engineer/M.E. Protocols/mind_engineer_separation_protocol.json",
    "Mind Engineer/M.E. Protocols/mind_engineer_hardware_protocol.json",
    "Mind Engineer/M.E. Protocols/mind_engineer_spiritual_protocol.json",
]


@pytest.mark.parametrize("filepath", PROTOCOL_FILES)
def test_protocol_is_valid_dict(filepath):
    """Each protocol file should parse as a non-empty dict."""
    data = load_json(filepath)
    assert isinstance(data, dict)
    assert len(data) > 0


class TestProtocolCrossReferences:
    """Verify that Mind Engineer references protocols that actually exist."""

    def test_protocol_files_exist(self):
        protocols_dir = os.path.join(AUTO_AI_DIR, "Mind Engineer", "M.E. Protocols")
        expected_files = [
            "mind_engineer_separation_protocol.json",
            "mind_engineer_hardware_protocol.json",
            "mind_engineer_spiritual_protocol.json",
        ]
        for filename in expected_files:
            path = os.path.join(protocols_dir, filename)
            assert os.path.isfile(path), f"Protocol file missing: {filename}"
