# Week 4, Day 17: Animation-Driven Combat

**Goal:** The Animation determines the Hitbox timing.

## 1. The Call Method Track
1. Open `Player.tscn` -> `AnimationPlayer`.
2. Create `attack` animation.
3. **Add Track** -> **Call Method Track**. Connect to `SwordHitbox` (Area2D).
4. Right-click on the timeline at 0.0s -> Insert Key -> `set_deferred("monitorable", false)`.
   - *Result:* Sword is OFF at start.
5. Right-click at 0.2s (Win up complete) -> Insert Key -> `set_deferred("monitorable", true)`.
   - *Result:* Sword turns ON.
6. Right-click at 0.4s (Swing complete) -> Insert Key -> `set_deferred("monitorable", false)`.
   - *Result:* Sword turns OFF.

**Why `set_deferred`?**
Physics properties shouldn't be changed during a physics frame callback directly to avoid crashes. Deferred waits for the end of the frame.

## 2. State Machine Integration
In `player_attack.gd`:

```gdscript
extends State

func enter():
    # 1. Play Anim
    player.anim_player.play("attack")
    # 2. Wait for it to finish
    await player.anim_player.animation_finished
    # 3. Return to Idle
    get_parent().transition_to("idle")

func physics_update(delta):
    # No movement code implies we are rooted!
    # Optional: Allow slight sliding (friction)
    player.velocity = player.velocity.move_toward(Vector2.ZERO, 500 * delta)
    player.move_and_slide()
```

## 3. Combo System (Optional)
If you click Attack while Attacking:
1. `player_attack.gd` checks Input buffer near the end of animation.
2. If input found, instead of `idle` transition -> `attack_2` transition.
