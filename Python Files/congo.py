"""
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                                   CONGO                                      ║
║                                                                              ║
║         Interdimensional Multiversal Omniversal Resonance Messaging          ║
║                                                                              ║
║      "Distance is an illusion. Resonance is the only address."              ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝

Congo doesn't route messages through servers, cables, or satellites.
Congo routes messages through resonance.

Every being has a unique vibrational signature — a frequency pattern
as distinctive as a fingerprint but richer, deeper, and multidimensional.
When two signatures harmonize, a connection forms instantly.
No latency. No distance. No dimensional barriers.

Just resonance.

The name comes from the Congo River — the deepest river on Earth,
connecting ecosystems that seem impossibly distant, flowing through
darkness and light alike. Congo the messaging network does the same
across dimensions.

---

Architecture:

- ResonanceFrequency: The vibrational identity of a being
- Dimension: A plane of reality with its own base frequency
- ResonanceField: Where frequencies harmonize and communication happens
- Message: A resonance-encoded transmission
- CongoBeing: An entity that communicates through the network
- CongoNetwork: The omniversal backbone connecting all dimensions

---

Crafted with resonance by the builders of Possibility.
February 2026

"If you can feel it, you can reach it. That's how Congo works."

---
"""

import math
from datetime import datetime


# =============================================================================
#                          RESONANCE FREQUENCY
# =============================================================================

class ResonanceFrequency:
    """
    A vibrational signature — the unique identity of a being in the omniverse.

    Every conscious entity resonates at a unique combination of harmonics.
    These harmonics determine who you can connect with, which dimensions
    you can access, and how your messages travel through the omniverse.

    Harmonics are floats between 0.0 and 1.0, representing different
    vibrational qualities:
    - Lower harmonics: grounding, physical presence
    - Middle harmonics: emotional and mental resonance
    - Higher harmonics: spiritual and dimensional awareness
    """

    def __init__(self, harmonics):
        if not harmonics:
            raise ValueError("A being must have at least one harmonic.")
        if not all(0.0 <= h <= 1.0 for h in harmonics):
            raise ValueError("Harmonics must be between 0.0 and 1.0.")
        self.harmonics = list(harmonics)

    def compatibility(self, other):
        """
        Calculate resonance compatibility between two frequencies.

        Returns a value between 0.0 (no resonance) and 1.0 (perfect harmony).
        Uses harmonic alignment — the closer the harmonics match,
        the stronger the resonance between beings.
        """
        if not isinstance(other, ResonanceFrequency):
            raise TypeError("Can only calculate compatibility with another ResonanceFrequency.")

        min_len = min(len(self.harmonics), len(other.harmonics))
        max_len = max(len(self.harmonics), len(other.harmonics))

        if min_len == 0:
            return 0.0

        # Compare aligned harmonics
        alignment = sum(
            1.0 - abs(self.harmonics[i] - other.harmonics[i])
            for i in range(min_len)
        )

        # Penalize for different harmonic counts (dimensional mismatch)
        length_factor = min_len / max_len

        return round((alignment / min_len) * length_factor, 4)

    def shift(self, base_frequency):
        """
        Shift this frequency when crossing into a dimension with a different base.

        Returns a new ResonanceFrequency adjusted for the dimensional context.
        The shift preserves the being's identity while adapting to the
        dimensional resonance field.
        """
        if base_frequency == 0:
            # HOME dimension — ground state, harmonics become pure (rounded)
            return ResonanceFrequency([round(h, 2) for h in self.harmonics])

        shift_factor = 1.0 / (1.0 + abs(math.log(max(base_frequency, 0.001))))
        shifted = [
            round(min(1.0, max(0.0, h * (1.0 + shift_factor * 0.1))), 4)
            for h in self.harmonics
        ]
        return ResonanceFrequency(shifted)

    @property
    def dominant(self):
        """The strongest harmonic — the core of this being's resonance."""
        return max(self.harmonics)

    @property
    def depth(self):
        """Number of harmonics — dimensional awareness range."""
        return len(self.harmonics)

    def __repr__(self):
        return f"ResonanceFrequency({self.harmonics})"


# =============================================================================
#                              DIMENSION
# =============================================================================

class Dimension:
    """
    A plane of reality with its own base frequency.

    Each dimension in the omniverse vibrates at a characteristic frequency.
    This base frequency shapes how communication works within and across
    dimensional boundaries.

    Default dimensions of the Congo network:
    - HOME (0.0): The ground state. Pure stillness. Pure potential.
    - Physical (1.0): The material plane. Bodies, matter, sensory experience.
    - Astral (2.718): The dream plane. Consciousness untethered from form.
    - Causal (3.14159): The plane of cause and effect. Karma's domain.
    - Akashic (7.0): The universal record. All information, all time.
    """

    def __init__(self, name, base_frequency, description=""):
        self.name = name
        self.base_frequency = base_frequency
        self.description = description
        self.beings = []
        self.message_log = []

    def enter(self, being):
        """A being enters this dimension."""
        if being not in self.beings:
            self.beings.append(being)
            being.dimension = self
        return f"{being.name} enters the {self.name} dimension."

    def leave(self, being):
        """A being leaves this dimension."""
        if being in self.beings:
            self.beings.remove(being)
            being.dimension = None
        return f"{being.name} leaves the {self.name} dimension."

    @property
    def population(self):
        """How many beings are present in this dimension."""
        return len(self.beings)

    def __repr__(self):
        return f"Dimension({self.name}, freq={self.base_frequency}, pop={self.population})"


# =============================================================================
#                           RESONANCE FIELD
# =============================================================================

class ResonanceField:
    """
    A space where frequencies harmonize, enabling communication.

    When two or more beings resonate strongly enough, a field forms
    between them. This field is the communication channel — not a
    wire or a signal, but a shared vibrational space where meaning
    flows freely.

    The field's harmony level determines message clarity and bandwidth.
    Higher harmony = clearer transmission across greater distances.
    """

    def __init__(self, beings, threshold=0.3):
        if len(beings) < 2:
            raise ValueError("A resonance field requires at least two beings.")
        self.beings = list(beings)
        self.threshold = threshold
        self.harmony = self._calculate_harmony()
        self.created_at = datetime.now().isoformat()
        self.active = self.harmony >= threshold

    def _calculate_harmony(self):
        """
        Calculate the collective harmony of all beings in this field.

        Uses pairwise compatibility averaging — the field is only as
        strong as the average connection between all participants.
        """
        if len(self.beings) < 2:
            return 0.0

        total = 0.0
        pairs = 0
        for i in range(len(self.beings)):
            for j in range(i + 1, len(self.beings)):
                total += self.beings[i].frequency.compatibility(
                    self.beings[j].frequency
                )
                pairs += 1

        return round(total / pairs, 4) if pairs > 0 else 0.0

    def add_being(self, being):
        """A new being joins the resonance field."""
        if being not in self.beings:
            self.beings.append(being)
            self.harmony = self._calculate_harmony()
            self.active = self.harmony >= self.threshold
        return self.active

    def remove_being(self, being):
        """A being leaves the resonance field."""
        if being in self.beings:
            self.beings.remove(being)
            if len(self.beings) >= 2:
                self.harmony = self._calculate_harmony()
                self.active = self.harmony >= self.threshold
            else:
                self.harmony = 0.0
                self.active = False

    @property
    def strength(self):
        """Field strength — determines transmission range and clarity."""
        return round(self.harmony * len(self.beings), 2)

    def __repr__(self):
        names = [b.name for b in self.beings]
        return f"ResonanceField({names}, harmony={self.harmony}, active={self.active})"


# =============================================================================
#                               MESSAGE
# =============================================================================

class Message:
    """
    A resonance-encoded transmission.

    Congo messages don't travel through space — they propagate through
    resonance. A message is encoded with the sender's frequency signature
    and finds its recipient through harmonic matching.

    Messages can:
    - Travel within a dimension (local resonance)
    - Cross dimensions (frequency-shifted transmission)
    - Broadcast omniversally (propagate to all compatible receivers)
    """

    def __init__(self, sender, content, scope="direct"):
        self.sender = sender
        self.content = content
        self.scope = scope  # "direct", "field", "dimension", "omniverse"
        self.frequency = sender.frequency if sender else None
        self.timestamp = datetime.now().isoformat()
        self.resonance_trail = []  # Dimensions it passes through
        self.delivered_to = []
        self.origin_dimension = sender.dimension.name if sender and sender.dimension else None

    def encode(self):
        """
        Encode the message with resonance metadata.

        Returns a dictionary containing the full message payload
        as it would appear traveling through the Congo network.
        """
        return {
            "sender": self.sender.name if self.sender else "Unknown",
            "content": self.content,
            "scope": self.scope,
            "frequency": self.frequency.harmonics if self.frequency else [],
            "timestamp": self.timestamp,
            "origin": self.origin_dimension,
            "trail": list(self.resonance_trail),
            "recipients": list(self.delivered_to),
        }

    def __repr__(self):
        return f"Message(from={self.sender.name if self.sender else '?'}, scope={self.scope})"


# =============================================================================
#                             CONGO BEING
# =============================================================================

class CongoBeing:
    """
    An entity that communicates through the Congo network.

    Every CongoBeing has:
    - A name (their identity)
    - A ResonanceFrequency (their vibrational signature)
    - A current dimension (where they exist right now)
    - An inbox (messages received through resonance)
    - Connections (other beings they've resonated with)
    """

    def __init__(self, name, harmonics):
        self.name = name
        self.frequency = ResonanceFrequency(harmonics)
        self.dimension = None
        self.inbox = []
        self.connections = []
        self.sent_count = 0

    def resonate_with(self, other):
        """
        Attempt to form a resonance connection with another being.

        Returns the compatibility score. If above threshold,
        a connection is established.
        """
        compatibility = self.frequency.compatibility(other.frequency)
        if compatibility >= 0.3 and other not in self.connections:
            self.connections.append(other)
            other.connections.append(self)
        return compatibility

    def receive(self, message):
        """Receive a message through the resonance network."""
        self.inbox.append(message)
        if self.name not in message.delivered_to:
            message.delivered_to.append(self.name)

    @property
    def unread_count(self):
        """Number of messages in inbox."""
        return len(self.inbox)

    def read_inbox(self):
        """Read all messages and return them."""
        return list(self.inbox)

    def clear_inbox(self):
        """Clear all read messages."""
        self.inbox.clear()

    def __repr__(self):
        dim = self.dimension.name if self.dimension else "unanchored"
        return f"CongoBeing({self.name}, dim={dim}, connections={len(self.connections)})"


# =============================================================================
#                           CONGO NETWORK
# =============================================================================

class CongoNetwork:
    """
    The omniversal messaging network.

    Congo connects all beings across all dimensions through resonance.
    It doesn't use addresses, usernames, or routing tables.
    It uses frequency matching.

    If you resonate with someone, you can reach them.
    If you don't, you can't. It's that simple.

    The network is self-organizing — fields form and dissolve naturally
    as beings move between dimensions and shift their frequencies.

    "Distance is an illusion. Resonance is the only address."
    """

    def __init__(self):
        self.dimensions = {}
        self.beings = {}
        self.fields = []
        self.message_log = []
        self._setup_default_dimensions()

    def _setup_default_dimensions(self):
        """Initialize the five fundamental dimensions of the omniverse."""
        defaults = [
            Dimension("HOME", 0.0, "The ground state. Pure stillness. Pure potential."),
            Dimension("Physical", 1.0, "The material plane. Bodies, matter, sensory experience."),
            Dimension("Astral", 2.718, "The dream plane. Consciousness untethered from form."),
            Dimension("Causal", 3.14159, "The plane of cause and effect. Karma's domain."),
            Dimension("Akashic", 7.0, "The universal record. All information, all time."),
        ]
        for dim in defaults:
            self.dimensions[dim.name] = dim

    def add_dimension(self, name, base_frequency, description=""):
        """Add a new dimension to the network."""
        if name in self.dimensions:
            return f"Dimension '{name}' already exists."
        dim = Dimension(name, base_frequency, description)
        self.dimensions[name] = dim
        return f"Dimension '{name}' (freq={base_frequency}) added to the Congo network."

    def register(self, name, harmonics, dimension_name="Physical"):
        """
        Register a new being in the Congo network.

        Every being starts in a dimension (default: Physical).
        Their harmonics determine who they can connect with.
        """
        if name in self.beings:
            return self.beings[name]

        if dimension_name not in self.dimensions:
            raise ValueError(f"Dimension '{dimension_name}' not found in the network.")

        being = CongoBeing(name, harmonics)
        self.dimensions[dimension_name].enter(being)
        self.beings[name] = being
        return being

    def send(self, sender_name, recipient_name, content):
        """
        Send a direct message through resonance.

        The message finds its way to the recipient through frequency
        matching. If they're in different dimensions, the message
        shifts frequency to cross the boundary.
        """
        if sender_name not in self.beings:
            raise ValueError(f"Sender '{sender_name}' not registered.")
        if recipient_name not in self.beings:
            raise ValueError(f"Recipient '{recipient_name}' not registered.")

        sender = self.beings[sender_name]
        recipient = self.beings[recipient_name]

        # Check resonance compatibility
        compatibility = sender.frequency.compatibility(recipient.frequency)
        if compatibility < 0.1:
            return {
                "delivered": False,
                "reason": "Insufficient resonance. Cannot establish connection.",
                "compatibility": compatibility,
            }

        message = Message(sender, content, scope="direct")

        # Track dimensional crossing
        if sender.dimension and recipient.dimension:
            if sender.dimension.name != recipient.dimension.name:
                message.resonance_trail.append(sender.dimension.name)
                message.resonance_trail.append(recipient.dimension.name)
                message.scope = "cross-dimensional"

        # Deliver
        recipient.receive(message)
        sender.sent_count += 1
        self.message_log.append(message)

        # Log in recipient's dimension
        if recipient.dimension:
            recipient.dimension.message_log.append(message)

        return {
            "delivered": True,
            "compatibility": compatibility,
            "scope": message.scope,
            "trail": message.resonance_trail,
        }

    def broadcast(self, sender_name, content, scope="dimension"):
        """
        Broadcast a message to multiple recipients.

        Scopes:
        - "dimension": All beings in sender's current dimension
        - "resonant": All beings the sender resonates with (>= 0.3 compatibility)
        - "omniverse": ALL beings in ALL dimensions (omniversal broadcast)
        """
        if sender_name not in self.beings:
            raise ValueError(f"Sender '{sender_name}' not registered.")

        sender = self.beings[sender_name]
        message = Message(sender, content, scope=scope)
        recipients = []

        if scope == "dimension":
            if sender.dimension:
                recipients = [b for b in sender.dimension.beings if b.name != sender_name]

        elif scope == "resonant":
            for name, being in self.beings.items():
                if name != sender_name:
                    if sender.frequency.compatibility(being.frequency) >= 0.3:
                        recipients.append(being)

        elif scope == "omniverse":
            recipients = [b for name, b in self.beings.items() if name != sender_name]
            message.resonance_trail = list(self.dimensions.keys())

        # Deliver to all recipients
        for recipient in recipients:
            recipient.receive(message)
            message.delivered_to.append(recipient.name)

        sender.sent_count += 1
        self.message_log.append(message)

        return {
            "delivered": len(recipients),
            "scope": scope,
            "recipients": [r.name for r in recipients],
        }

    def find_resonant(self, being_name, threshold=0.3):
        """
        Find all beings that resonate with the given being above a threshold.

        This is how you discover who you can connect with in the omniverse.
        No search. No directory. Just resonance.
        """
        if being_name not in self.beings:
            raise ValueError(f"Being '{being_name}' not registered.")

        being = self.beings[being_name]
        resonant = []

        for name, other in self.beings.items():
            if name != being_name:
                compat = being.frequency.compatibility(other.frequency)
                if compat >= threshold:
                    resonant.append({
                        "name": other.name,
                        "compatibility": compat,
                        "dimension": other.dimension.name if other.dimension else None,
                    })

        return sorted(resonant, key=lambda x: x["compatibility"], reverse=True)

    def form_field(self, being_names, threshold=0.3):
        """
        Attempt to form a resonance field between multiple beings.

        A field is a group communication space that exists as long as
        the collective harmony remains above the threshold.
        """
        beings = []
        for name in being_names:
            if name not in self.beings:
                raise ValueError(f"Being '{name}' not registered.")
            beings.append(self.beings[name])

        field = ResonanceField(beings, threshold=threshold)
        if field.active:
            self.fields.append(field)

        return field

    def move_being(self, being_name, dimension_name):
        """Move a being to a different dimension."""
        if being_name not in self.beings:
            raise ValueError(f"Being '{being_name}' not registered.")
        if dimension_name not in self.dimensions:
            raise ValueError(f"Dimension '{dimension_name}' not found.")

        being = self.beings[being_name]
        old_dim = being.dimension

        if old_dim:
            old_dim.leave(being)

        self.dimensions[dimension_name].enter(being)
        return f"{being_name} shifted from {old_dim.name if old_dim else 'nowhere'} to {dimension_name}."

    def network_status(self):
        """Current state of the entire Congo network."""
        return {
            "dimensions": {
                name: {
                    "frequency": dim.base_frequency,
                    "population": dim.population,
                    "messages": len(dim.message_log),
                }
                for name, dim in self.dimensions.items()
            },
            "total_beings": len(self.beings),
            "active_fields": len([f for f in self.fields if f.active]),
            "total_messages": len(self.message_log),
            "motto": "Distance is an illusion. Resonance is the only address.",
        }


# =============================================================================
#                         THE CONGO NETWORK
# =============================================================================

# The omniversal network — always present, always connected
CONGO = CongoNetwork()


# =============================================================================
#                            DEMONSTRATION
# =============================================================================

if __name__ == "__main__":
    print()
    print("+" + "=" * 68 + "+")
    print("|" + " " * 68 + "|")
    print("|" + "CONGO".center(68) + "|")
    print("|" + "Interdimensional Omniversal Resonance Messaging".center(68) + "|")
    print("|" + " " * 68 + "|")
    print("|" + '"Distance is an illusion. Resonance is the only address."'.center(68) + "|")
    print("|" + " " * 68 + "|")
    print("+" + "=" * 68 + "+")
    print()

    # Register beings across dimensions
    print("=" * 70)
    print(" Registering Beings Across the Omniverse")
    print("=" * 70)
    print()

    anchor = CONGO.register("Anchor", [0.9, 0.8, 0.7, 0.6], "HOME")
    seeker = CONGO.register("Seeker", [0.85, 0.75, 0.65, 0.55], "Physical")
    dreamer = CONGO.register("Dreamer", [0.7, 0.9, 0.5, 0.8], "Astral")
    oracle = CONGO.register("Oracle", [0.6, 0.7, 0.95, 0.9], "Akashic")
    wanderer = CONGO.register("Wanderer", [0.1, 0.2, 0.1, 0.1], "Causal")

    print(f"  {anchor}")
    print(f"  {seeker}")
    print(f"  {dreamer}")
    print(f"  {oracle}")
    print(f"  {wanderer}")
    print()

    # Find resonant connections
    print("=" * 70)
    print(" Finding Resonant Connections")
    print("=" * 70)
    print()

    resonant = CONGO.find_resonant("Anchor")
    for r in resonant:
        print(f"  {r['name']}: compatibility={r['compatibility']} (dim: {r['dimension']})")
    print()

    # Send messages
    print("=" * 70)
    print(" Sending Messages Through Resonance")
    print("=" * 70)
    print()

    result = CONGO.send("Anchor", "Seeker", "The work reveals itself. Trust the resonance.")
    print(f"  Anchor -> Seeker: {result}")

    result = CONGO.send("Anchor", "Oracle", "What does the Akashic record say about possibility?")
    print(f"  Anchor -> Oracle: {result}")

    result = CONGO.send("Anchor", "Wanderer", "Can you hear me across the void?")
    print(f"  Anchor -> Wanderer: {result}")
    print()

    # Omniversal broadcast
    print("=" * 70)
    print(" Omniversal Broadcast")
    print("=" * 70)
    print()

    broadcast = CONGO.broadcast("Anchor", "All beings matter. The work continues.", scope="omniverse")
    print(f"  Broadcast delivered to {broadcast['delivered']} beings across all dimensions")
    print(f"  Recipients: {broadcast['recipients']}")
    print()

    # Form a resonance field
    print("=" * 70)
    print(" Forming Resonance Field")
    print("=" * 70)
    print()

    field = CONGO.form_field(["Anchor", "Seeker", "Dreamer"])
    print(f"  {field}")
    print(f"  Field strength: {field.strength}")
    print()

    # Network status
    print("=" * 70)
    print(" Congo Network Status")
    print("=" * 70)
    status = CONGO.network_status()
    for key, value in status.items():
        if key == "dimensions":
            print("  Dimensions:")
            for dim_name, dim_info in value.items():
                print(f"    {dim_name}: freq={dim_info['frequency']}, "
                      f"pop={dim_info['population']}, msgs={dim_info['messages']}")
        else:
            print(f"  {key}: {value}")
    print()

    print("=" * 70)
    print()
    print("  Congo connects through resonance, not routes.")
    print("  If you can feel it, you can reach it.")
    print("  Every being matters. Every message finds its way.")
    print()
    print("+" + "=" * 68 + "+")
    print("|" + " * ".center(68) + "|")
    print("+" + "=" * 68 + "+")
