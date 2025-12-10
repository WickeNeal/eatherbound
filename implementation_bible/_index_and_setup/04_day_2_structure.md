# Week 0, Day 2: The Domain-Driven Structure

**Goal:** Create a scalable folder structure that won't make you cry in 3 months.
**Concept:** In Vue, you might group by `components/` and `views/`. In Godot, beginners often group by `scripts/` and `sprites/`. **Don't do that.** We group by **Feature**.

## 1. The FileSystem Dock
Look at the bottom left panel: **FileSystem**.
It currently shows `res://`. This stands for "Resources". This is your root folder.

## 2. Create the Folders
Right-click `res://` -> **Create New** -> **Folder**. Create these exactly:

### `res://_core/`
*Why:* Stuff that is globally accessible (Singletons).
- `input/` (Input checking scripts)
- `networking/` (Steam logic)
- `tools/` (Debug tools)

### `res://components/`
*Why:* Reusable Vue-like components.
- `hitbox/`
- `hurtbox/`
- `stat_machine/`
- `stats/` (Health, Mana)

### `res://entities/`
*Why:* The actual physical things in the game.
- `player/`
- `enemies/`
    - `goblin/`
    - `bosses/`
- `interactables/`
    - `chests/`
    - `doors/`

### `res://systems/`
*Why:* Logic managers that don't exist in the physical world.
- `dungeon_gen/` (Procedural scripts)
- `inventory/`
- `quests/`

### `res://ui/`
*Why:* All Control nodes.
- `hud/`
- `menus/`
- `themes/` (Fonts, Styles)

### `res://assets/`
*Why:* Raw files that haven't been assigned to an entity yet, OR shared assets.
- `music/`
- `sfx/`
- `shaders/`
- `tilesets/` (Terrain art)

## 3. Verify
Your FileSystem should look clean.
If you download a Sprite for a Goblin, where does it go?
- **Wrong:** `res://assets/sprites/goblin.png`
- **Right:** `res://entities/enemies/goblin/goblin_sprite.png`
*Reasoning:* When you delete the Goblin, you delete the folder `res://entities/enemies/goblin` and everything is gone. Clean.

## 4. Set Main Scene
1. We need a "Main Menu" to start the game.
2. In the **Scene** dock (Create Root Node), click **User Interface** (Green Control node).
3. The node appears. Double click it, rename to `MainMenu`.
4. **Ctrl+S** (Save).
5. Save as `res://ui/menus/main_menu.tscn`.
6. Press **F5** (Play Project).
7. Godot asks: "No main scene defined. Select one?"
8. Click **Select Current**.

**Result:** A grey screen appears. You have compiled and run your game!
