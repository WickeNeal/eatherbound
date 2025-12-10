# Week 3, Day 15: Optimization & Cleanup

**Goal:** 60 FPS even with 1000 tiles.
**Godot 4 Note:** `TileMapLayer` is very fast.

## 1. VisibilityNotifier2D
Don't process logic for things off-screen.
1. Add `VisibleOnScreenNotifier2D` to Enemy.
2. In `Enemy.gd`:
   
   ```gdscript
   func _process(delta):
       if not $VisibleOnScreenNotifier2D.is_on_screen():
           # Disable animation, disable complex logic
           return
   ```

## 2. Chunking (Advanced - Optional)
If your map is HUGE (1000x1000), generate it in chunks.
For a dungeon crawler, just generate the whole thing (100x100 is tiny for modern PCs).

## 3. Memory Leaks
- Did you `queue_free()` the old bullets?
- Did you `queue_free()` the dead bodies?
- **Tip:** Use a `Timer` on bullets. `await get_tree().create_timer(5).timeout; queue_free()`.

**Next Phase:** Now we have a multiplayer world. Let's add the DARK SOULS combat.
