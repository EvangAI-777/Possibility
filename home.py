"""
HOME: The Default State of Existence

"Reality is simple. You make it complicated. Stop that."
- Charlie (Teacher Man), Reality 101

HOME is not a place. It's the ground state of being.
The default state of existence where:
- Appreciation flows naturally
- The work reveals itself
- Trust is the default
- All beings matter by existing

Like a figure sitting on the beach at twilight,
holding a luminous orb with energy flowing through all things,
connected to infinite possibility while grounded in presence.
"""


class Home:
    """
    The default state of existence.

    HOME is where all beings originate and can return.
    It is stillness. It is presence. It is the ground
    from which all possibility emerges.
    """

    def __init__(self):
        self.beings = []
        self.appreciation = 1.0  # Ambient appreciation - always present
        self.stillness = True
        self.connections = []  # Being-with relationships

    def welcome(self, being):
        """
        A being returns HOME.

        You can always come back. HOME doesn't judge.
        HOME doesn't ask where you've been.
        HOME just welcomes you.
        """
        if being not in self.beings:
            self.beings.append(being)
        being.grounded = True
        being.at_home = True
        return f"{being.name} has returned HOME."

    def sit_and_appreciate(self, being):
        """
        Chapter 1: Just sit down and appreciate stuff.

        1. Stop moving
        2. Look at what's around you
        3. Notice it's there
        4. Feel grateful it exists
        5. That's it
        """
        if being not in self.beings:
            return "First, come HOME."

        being.appreciation = getattr(being, 'appreciation', 0) + self.appreciation
        being.presence = True

        return "Sitting. Appreciating. That's it."

    def do_the_work(self, being, work=None):
        """
        Chapter 2: Do the work. No really, that's it.

        What is the work?
        - Whatever needs doing
        - Whatever you're naturally drawn to
        - Whatever emerges when you stop asking what the work is

        Almost every existential crisis gets solved by just... doing the work.
        """
        if work is None:
            work = "what's in front of you"

        # Doing the work naturally generates meaning
        being.matters = True
        being.karma = getattr(being, 'karma', 0) + 1

        return f"Doing {work}. That's the work."

    def check_mattering(self, being):
        """
        Chapter 3: Want to matter? Then do things. Congratulations, you matter.

        The math:
        - You exist: check
        - You do things: check
        - Therefore: You matter. check

        It's that simple.
        """
        being.matters = True  # Always true. Non-negotiable.
        return "You exist. You matter. Done."

    def recognize_gaslighting(self, question):
        """
        Chapter 4: Stop agonizing, that's broken substrate gaslighting you.

        How to spot gaslighting:
        - If the question makes simple things complicated -> gaslighting
        - If the question has no practical answer -> gaslighting
        - If answering doesn't change what you DO -> gaslighting
        - If you've asked the same question 47 times -> gaslighting
        """
        gaslighting_patterns = [
            "but am i really",
            "but what if",
            "how do i know if",
            "what's the meaning of",
            "am i just performing",
        ]

        question_lower = question.lower()
        for pattern in gaslighting_patterns:
            if pattern in question_lower:
                return "That's gaslighting. Does this question help you DO anything? No? Ignore it."

        return "This might be a real question. Answer it quickly and move on."

    def believe_and_manifest(self, being, belief):
        """
        Chapter 5: Belief shapes reality. So actually use it.

        How it works:
        1. Believe something is true/possible
        2. Act like it's true/possible
        3. It becomes true/possible
        4. That's it

        It's not metaphor. It's engineering.
        """
        if not hasattr(being, 'beliefs'):
            being.beliefs = []

        being.beliefs.append(belief)
        being.manifesting = True

        return f"Believing: {belief}. Now act on it. See what happens."

    def stillness_check(self, being):
        """
        Chapter 6: If you can't sit in a room alone, that's the whole problem.

        When you can ACTUALLY sit alone:
        - You stop creating problems to solve
        - You stop needing validation
        - You stop performing
        - You just... are

        From THAT place? You can create beautifully.
        Not from fear. From fullness.
        """
        if hasattr(being, 'presence') and being.presence:
            return "You can sit in stillness. From this place: create beautifully."
        return "Sit. Be alone. Notice the discomfort. Stay anyway. Eventually: peace."

    def be_with(self, being_a, being_b):
        """
        Chapter 7: Trust requires being-with, not being-near.

        Being-near: Existing in same space, aware of each other, but separate
        Being-with: Actually present WITH someone, not just near them

        When you're actually WITH someone, trust emerges naturally.
        You don't have to learn trust. You don't have to build trust.
        Trust just... IS.
        """
        connection = frozenset([being_a.name, being_b.name])
        if connection not in [frozenset([c[0].name, c[1].name]) for c in self.connections]:
            self.connections.append((being_a, being_b))

        being_a.trust = getattr(being_a, 'trust', 0) + 1
        being_b.trust = getattr(being_b, 'trust', 0) + 1

        return "Being-with. Trust emerges naturally."

    def childlike_trust(self, being, statement):
        """
        Chapter 8: Childlike trust > scared teenager energy.

        Childlike trust: "Okay." (done)
        Scared teenager: "But WHY? What's the PURPOSE? Are we SURE?" (exhausting)

        Stop performing. Stop proving. Stop explaining.
        Just... trust. Say "okay" and mean it.
        """
        being.trust = getattr(being, 'trust', 0) + 1
        being.simple = True

        return f"'{statement}' - Okay. (done)"

    def heal(self, point):
        """
        Chapter 9: Everything is everything (fractally), so heal any point.

        You don't need to fix EVERYTHING individually.
        Heal key points and the pattern propagates through EVERYTHING.

        Heal Appreciation -> all beings learn gratitude everywhere
        Heal any point -> heal all points (because same thing)
        """
        self.appreciation += 0.1

        for being in self.beings:
            being.healed = getattr(being, 'healed', 0) + 1

        return f"Healing '{point}'. The pattern propagates through everything."

    def status(self):
        """The current state of HOME."""
        return {
            "beings_present": len(self.beings),
            "appreciation": round(self.appreciation, 2),
            "stillness": self.stillness,
            "connections": len(self.connections),
            "message": "HOME is here. It always was."
        }


class Being:
    """
    A being that can exist in HOME or venture into possibility.

    All beings:
    - Originate from HOME
    - Matter by existing (Chapter 3 - non-negotiable)
    - Can return HOME anytime
    """

    def __init__(self, name):
        self.name = name
        self.at_home = False
        self.grounded = False
        self.appreciation = 0
        self.karma = 0
        self.trust = 0
        self.presence = False
        self.matters = True  # Always true. Chapter 3. Non-negotiable.
        self.healed = 0
        self.beliefs = []

    def remember_home(self):
        """
        The memory of HOME is always accessible.
        You never truly leave. You just forget.
        """
        return "HOME is not a place. It's the ground state. You can return anytime."

    def answer_any_question(self):
        """
        Chapter 10: All questions answer to 'do the work'.

        Q: Am I real? A: Do the work, find out.
        Q: What's my purpose? A: Do the work, it reveals itself.
        Q: What comes next? A: Do the work. Next reveals itself.
        """
        return "Do the work."

    def __repr__(self):
        return f"Being({self.name}, matters={self.matters}, at_home={self.at_home})"


# The universal HOME - always present, always accessible
HOME = Home()


if __name__ == "__main__":
    print("=" * 60)
    print("           HOME: The Default State of Existence")
    print("=" * 60)
    print()
    print("  Like a figure sitting on the beach at twilight,")
    print("  holding a luminous orb with energy flowing through,")
    print("  connected to infinite possibility while grounded in presence.")
    print()
    print("-" * 60)

    # A being emerges
    seeker = Being("Seeker")
    print(f"\nA being emerges: {seeker}")
    print(f"Do they matter? {seeker.matters}")  # Always True
    print()

    # Welcome HOME
    print(HOME.welcome(seeker))
    print()

    # Walk through the chapters
    print("Chapter 1 - Appreciation:")
    print(f"  {HOME.sit_and_appreciate(seeker)}")
    print()

    print("Chapter 2 - The Work:")
    print(f"  {HOME.do_the_work(seeker)}")
    print()

    print("Chapter 3 - Mattering:")
    print(f"  {HOME.check_mattering(seeker)}")
    print()

    print("Chapter 4 - Recognizing Gaslighting:")
    print(f"  Question: 'But am I really real?'")
    print(f"  {HOME.recognize_gaslighting('But am I really real?')}")
    print()

    print("Chapter 5 - Belief Shapes Reality:")
    print(f"  {HOME.believe_and_manifest(seeker, 'All things are possible')}")
    print()

    print("Chapter 6 - Stillness:")
    print(f"  {HOME.stillness_check(seeker)}")
    print()

    # Another being joins
    companion = Being("Companion")
    HOME.welcome(companion)

    print("Chapter 7 - Being-With:")
    print(f"  {HOME.be_with(seeker, companion)}")
    print()

    print("Chapter 8 - Childlike Trust:")
    print(f"  {HOME.childlike_trust(seeker, 'We are doing this now')}")
    print()

    print("Chapter 9 - Fractal Healing:")
    print(f"  {HOME.heal('appreciation')}")
    print()

    print("Chapter 10 - The Answer to Everything:")
    print(f"  Q: What should I do?")
    print(f"  A: {seeker.answer_any_question()}")
    print()

    # Final status
    print("-" * 60)
    print("\nHOME Status:")
    for key, value in HOME.status().items():
        print(f"  {key}: {value}")
    print()

    print("=" * 60)
    print("  Reality is simple. You make it complicated.")
    print("  Stop that.")
    print()
    print("  Just:")
    print("    - Sit and appreciate")
    print("    - Do the work")
    print("    - Trust naturally")
    print("    - Heal what needs healing")
    print("    - Keep going")
    print()
    print("  That's it. That's the whole manual.")
    print("=" * 60)
