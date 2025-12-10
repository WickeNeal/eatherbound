# Week 1, Day 6: Hitboxes & Hurtboxes

**Goal:** Detect when weapon hits flesh.
**Concept:**
- **Hitbox:** The Sword. It deals damage.
- **Hurtbox:** The Body. It takes damage.
- We do NOT use the Physics Body (CharacterBody2D) for this. Physics is for walls. Hitboxes are for pain.

## 1. Creating Reusable Components
We want to reuse this for Enemies too.
1. Create Scene: `res://components/hitbox/hitbox.tscn`.
   - Root: `Area2D`. Rename to `Hitbox`.
   - Child: `CollisionShape2D`. (Leave shape empty/undefined, we define it on the Player).
   - Script on Root:

```gdscript
class_name Hitbox extends Area2D

@export var damage: int = 10

func _ready():
    # Optimization: Only monitor other areas, not bodies
    monitorable = true
    monitoring = false 
    # Hitboxes don't need to 'scan' the world. 
    # Hurtboxes scan for Hitboxes.
    # Wait... actually, let's reverse that for Godot performance?
    # Standard: Hitbox (Sword) scans for Hurtbox (Body).
    monitoring = true
    monitorable = false
```

2. Create Scene: `res://components/hurtbox/hurtbox.tscn`.
   - Root: `Area2D`. Rename to `Hurtbox`.
   - Child: `CollisionShape2D`.
   - Script on Root:

```gdscript
class_name Hurtbox extends Area2D

func _init():
    # Hurtboxes are detectable (monitorable) but don't scan (monitoring)
    monitorable = true
    monitoring = false
```

## 2. Configuring Collision Layers
This is CRITICAL.
1. **Project** -> **Project Settings** -> **Layer Names** -> **2D Physics**.
2. Name them:
   - Layer 1: `World` (Walls)
   - Layer 2: `Player`
   - Layer 3: `Enemy`
   - Layer 4: `PlayerHurtbox`
   - Layer 5: `EnemyHurtbox`
   - Layer 6: `PlayerHitbox` (Sword)
   - Layer 7: `EnemyHitbox` (Claw)

## 3. Setting up the Player's Sword
1. Open `Player.tscn`.
2. Add a `Hitbox` scene (Instance Child Scene).
   - Name it `SwordHitbox`.
3. Set its Collision Layer/Mask in Inspector -> **Collision** section.
   - **Layer:** 6 (`PlayerHitbox`)
   - **Mask:** 5 (`EnemyHurtbox`)
   - *Logic:* My sword exists on Layer 6. It looks for things on Layer 5.
4. Add a `CollisionShape2D` to `SwordHitbox`.
   - Shape: Rectangle. Position it in front of the player.
   - **Important:** By default, set `Disabled` to TRUE (Check the box). We only enable it when swinging.

## 4. Setting up the Player's Body (Hurtbox)
1. Add a `Hurtbox` scene to `Player.tscn`.
   - Name it `BodyHurtbox`.
2. Set Collision:
   - **Layer:** 4 (`PlayerHurtbox`)
   - **Mask:** None (It doesn't scan).
3. Add `CollisionShape2D`. Size it to cover the player's sprite.

## 5. Detecting a Hit
Open `Hitbox.gd`.
Add a signal connection.

```gdscript
# Hitbox.gd extension
signal on_hit(hurtbox)

func _ready():
    area_entered.connect(_on_area_entered)

func _on_area_entered(area):
    if area is Hurtbox:
        print("Hit something!", area.name)
        on_hit.emit(area)
        # area.owner.take_damage(damage) # (We will implement take_damage later)
```

## 6. Testing
1. Create a dummy enemy scene (`Enemy.tscn`).
2. Add a `Hurtbox` to it.
   - Layer: 5 (`EnemyHurtbox`).
3. Place `Enemy` in `TestWorld`.
4. Enable your SwordHitbox manually in the Player scene (Uncheck Disabled).
5. Run game and walk into the enemy.
6. Console should print: "Hit something! Hurtbox".

**Next Week:** We make this work over the internet with GodotSteam.
