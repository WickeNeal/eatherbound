# Week 4, Day 16: Collision Layers & Matrices

**Goal:** Ensure Enemies don't kill themselves, and Players don't hit their own friends (unless friendly fire is on).

## 1. The Matrix (Refined)
Verify your Project Settings -> Layer Names -> 2D Physics:

| Layer | Name | Description |
| :--- | :--- | :--- |
| 1 | World | Walls, Pits. |
| 2 | PlayerBody | Physical body. Collides with Wall. |
| 3 | EnemyBody | Physical body. Collides with Wall. |
| 4 | PlayerHurtbox| Detects Enemy Weapons. |
| 5 | EnemyHurtbox | Detects Player Weapons. |
| 6 | PlayerHitbox | The Sword. |
| 7 | EnemyHitbox | The Claw. |
| 8 | Interactable | Chests. |

## 2. Configuration Best Practices
- **Player Body:** Layer 2. Mask 1 (Walls), 3 (Enemies - so you can't walk through them).
- **Enemy Body:** Layer 3. Mask 1 (Walls), 2 (Players), 3 (Other Enemies - so they don't stack).

- **Player Sword:** Layer 6. Mask 5 (Enemy Hurtbox).
  - *Monitorable:* True (It has a shape).
  - *Monitoring:* True (It needs to fire `area_entered`).

- **Enemy Hurtbox:** Layer 5. Mask None.
  - *Monitorable:* True.
  - *Monitoring:* False (It is passive).

## 3. The `Team` Concept
Sometimes layers aren't enough. What if we have PVP?
In `Hurtbox.gd`:
```gdscript
@export var team: int = 0 # 0 = Player, 1 = Enemy
```
In `Hitbox.gd`:
```gdscript
@export var team: int = 0

func _on_area_entered(area):
    if area is Hurtbox:
        if area.team == self.team:
            return # Don't hit friends
        
        on_hit.emit(area)
```
