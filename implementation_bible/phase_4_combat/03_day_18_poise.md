# Week 4, Day 18: Poise & Stagger

**Goal:** Hitting an enemy should interrupt them.

## 1. The Stats Component
We need a `HealthComponent`.
1. `res://components/stats/HealthComponent.gd`.

```gdscript
class_name HealthComponent extends Node

signal on_death
signal on_damage(amount, current)

@export var max_health: int = 100
var current_health: int

@export var max_poise: float = 10.0
var current_poise: float

func _ready():
    current_health = max_health
    current_poise = max_poise

func take_damage(amount: int, poise_damage: float):
    current_health -= amount
    current_poise -= poise_damage
    
    on_damage.emit(amount, current_health)
    
    if current_health <= 0:
        on_death.emit()
    
    # Regenerate poise over time (logic loop needed)
```

## 2. Connect Hurtbox to Health
In `Enemy.gd`:

```gdscript
@onready var health_comp = $HealthComponent
@onready var state_machine = $StateMachine

func _ready():
    $Hurtbox.hit_received.connect(_on_hit)

func _on_hit(damage, poise_dmg):
    health_comp.take_damage(damage, poise_dmg)
    
    if health_comp.current_poise <= 0:
        state_machine.transition_to("stagger")
        health_comp.current_poise = health_comp.max_poise # Reset
```

## 3. The Stagger State
`enemy_stagger.gd`:
- **Enter:** Play "Stun" animation. Stop moving.
- **Update:** Wait 1.0 second.
- **Exit:** Transition to "Chase".
