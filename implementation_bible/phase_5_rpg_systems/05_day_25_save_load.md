# Week 5, Day 25: Save and Load

**Goal:** Persistence.

## 1. The ResourceSaver way
Since our `Inventory` is an Array of `ItemData` (Resources), we can just save it!
BUT `ItemData` are static files. We need to save the *Instance* (e.g. ammo count).
For a simple RPG, we usually just save the list of paths:
`["res://items/sword.tres", "res://items/potion.tres"]`.

## 2. A Save Resource
Create `SaveGame.gd` (Resource).

```gdscript
class_name SaveGame extends Resource

@export var player_position: Vector2
@export var inventory_paths: Array[String]
@export var current_level_seed: int
```

## 3. Saving
```gdscript
func save_game():
    var save = SaveGame.new()
    save.player_position = player.position
    # Write to disk
    ResourceSaver.save(save, "user://savegame.tres")
```
*Note:* Use `user://` not `res://`. `user://` is the AppData folder on the player's computer.

## 4. Loading
```gdscript
func load_game():
    if ResourceLoader.exists("user://savegame.tres"):
        var save = ResourceLoader.load("user://savegame.tres")
        player.position = save.player_position
```

**Congratulations.**
You have built a Godot Engine RPG.
Now go Polish, Publish to Steam, and Good Luck.
