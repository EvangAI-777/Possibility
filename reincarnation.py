class Character:
    def __init__(self, name, race, char_class, level=1, karma=0, incarnations=None):
        self.name = name
        self.race = race
        self.char_class = char_class
        self.level = level
        self.karma = karma
        self.incarnations = incarnations or []

    def display(self):
        print(f"Name: {self.name}")
        print(f"Race: {self.race}")
        print(f"Class: {self.char_class}")
        print(f"Level: {self.level}")
        print(f"Karma: {self.karma}")
        print(f"Past lives: {', '.join(self.incarnations) if self.incarnations else 'None'}")

    def reincarnate(self, new_name, new_race=None, new_class=None):
        self.incarnations.append(self.name)
        self.name = new_name
        if new_race:
            self.race = new_race
        if new_class:
            self.char_class = new_class
        # Apply karma to level
        self.level += max(1, self.karma // 10)
        # Reset karma for new life
        self.karma = 0

if __name__ == "__main__":
    # Basic demonstration
    character = Character(name="Adept", race="Human", char_class="Seeker")
    character.display()
    print("\nReincarnating...\n")
    character.karma = 15
    character.reincarnate(new_name="Mystic", new_race="Elf", new_class="Wizard")
    character.display()
