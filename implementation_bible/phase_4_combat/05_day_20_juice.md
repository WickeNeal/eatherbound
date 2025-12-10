# Week 4, Day 20: Visual Feedback (Juice)

**Goal:** Make it feel like hitting a truck.

## 1. Hitstop (Freeze Frame)
When a hit occurs, pause the game for 0.1s.
In `GameManager` or `EventBus`:

```gdscript
func hit_stop(duration_scale: float):
    Engine.time_scale = 0.05 # Slow motion
    await get_tree().create_timer(duration_scale * 0.05, true, false, true).timeout
    Engine.time_scale = 1.0 # Back to normal
```
Call this whenever damage is dealt.

## 2. Shader Flash
Paint the sprite White for 1 frame.
1. Create `HitFlash.gdshader`.
   ```glsl
   shader_type canvas_item;
   uniform bool active = false;
   
   void fragment() {
       vec4 color = texture(TEXTURE, UV);
       if (active) {
           COLOR = vec4(1.0, 1.0, 1.0, color.a);
       } else {
           COLOR = color;
       }
   }
   ```
2. In `Enemy.gd` `_on_hit`:
   ```gdscript
   sprite.material.set_shader_parameter("active", true)
   await get_tree().create_timer(0.1).timeout
   sprite.material.set_shader_parameter("active", false)
   ```

## 3. Screenshake
Simple Camera Shake.
Attach to `Camera2D`.
```gdscript
func shake(intensity: float):
    var offset = Vector2(randf(), randf()) * intensity
    position += offset
```
Return to 0,0 over time using `lerp`.
