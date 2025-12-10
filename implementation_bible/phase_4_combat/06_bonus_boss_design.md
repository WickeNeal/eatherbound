# Week 4, Bonus: Boss Design & Phases

**Goal:** Create a "Big Bad" that changes behavior when at 50% HP.
**Concept:** A Boss is just an Enemy with a specialized State Machine called a "Phase Machine".

## 1. The Boss Hierarchy
Inheritance is useful here.
1. `Enemy.tscn` (Base class with Health, Hurtbox, Movement).
2. `Boss.tscn` (Inherits Enemy).
   - Adds: `BossUI` (CanvasLayer with big health bar).
   - Adds: `PhaseManager` (Node).

## 2. The Phase Logic
In `Boss.gd`, we listen to health changes.

```gdscript
extends Enemy
class_name Boss

signal phase_changed(new_phase)

enum Phase { ONE, TWO, THREE }
var current_phase = Phase.ONE

func _on_health_changed(amount, current):
    var percent = float(current) / float(max_health)
    
    if current_phase == Phase.ONE and percent < 0.5:
        transition_to_phase_two()

func transition_to_phase_two():
    current_phase = Phase.TWO
    # 1. Play roar animation
    state_machine.transition_to("roar")
    # 2. Change Behavior Tree?
    # LimboAI allows swapping the plan:
    $BTPlayer.behavior_tree = load("res://ai/trees/BossPhase2.tres")
    # 3. Enable new hitboxes (e.g., wings grow out)
    phase_changed.emit(2)
```

## 3. Boss Patterns (The Behavior Tree)
A Boss shouldn't just run at you. It should cycle patterns.
**Sequence:**
1. **Attack:** Swing Sword (State).
2. **Cooldown:** Idle for 1.0s.
3. **Special:** Jump Attack.
4. **Cooldown:** Idle 2.0s.
5. **Repeat.**

In LimboAI, this is a `Sequence` node that loops.

## 4. The Boss Health Bar
A UI layer that sits on top of everything.
1. Create `BossHUD.tscn`.
2. Add `TextureProgressBar` (The red bar).
3. Script:
   ```gdscript
   func update_health(current, max):
       value = current
       max_value = max
   ```
4. In `Boss.gd`:
   ```gdscript
   func _ready():
       # Find the Global HUD and tell it to show OUR health
       EventBus.show_boss_bar.emit(self)
   ```

## 5. Summary
- **Regular Enemies:** Simple Behavior (Chase -> Attack).
- **Bosses:** Complex Behavior (Phase Check -> Swap Behavior Tree -> Specific Pattern).
- **Phases:** Triggers based on Health % using the `on_damage` signal.
