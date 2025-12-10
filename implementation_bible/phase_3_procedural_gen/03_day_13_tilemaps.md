# Week 3, Day 13: AutoTiling & Navigation

**Goal:** Make it look pretty and let AI walk on it.

## 1. AutoTiling (Terrains)
Godot 4 uses "Terrains".
1. Click `TileSet` resource at bottom.
2. **Terrains** tab. Add a new Terrain set. Add a "Rock Floor" terrain.
3. Switch to **TileSet** (Paint) view.
4. Select your tiles.
5. Paint "Bitmask" onto them. (Center bit, edge bits).
   - *Tutorial Note:* This is visual. You ensure the center tile has all bits filled, corners have corners filled.
6. **Code Usage:**
   Instead of `set_cell`, use `tile_map.set_cells_terrain_connect(...)`.
   This function automatically picks the right sprite based on neighbors.

## 2. NavigationRegion2D (The AI Path)
Enemies need to know where walls are.
1. In `TestWorld`, create `NavigationRegion2D`.
2. Move `FloorLayer` (TileMap) INSIDE `NavigationRegion2D` as a child.
3. Go to TileSet editor. Select your Floor Tile.
4. **Navigation Layer 0**: Paint a blue square over the floor tile.
   - *Meaning:* "This tile is walkable."
5. In your `DungeonGenerator` script, after placing tiles:
   
   ```gdscript
   func _on_generation_complete():
       # Bake the navmesh at runtime!
       var nav_region = get_parent().get_node("NavigationRegion2D")
       nav_region.bake_navigation_polygon()
   ```

## 3. Verify
1. Add a `NavigationAgent2D` to your Enemy.
2. Tell Enemy to move to Player.
3. Enemy should walk AROUND non-floor tiles.
