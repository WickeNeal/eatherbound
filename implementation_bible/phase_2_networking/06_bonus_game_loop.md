# Bonus: The Full Game Loop (Connecting the Dots)

**Goal:** Understand how to flow from Title Screen -> Character Create -> Town -> Dungeon.

## 1. The Scene Flow Manager
We need a master script to handle scene transitions.
`res://systems/SceneManager.gd` (Autoload).

```gdscript
extends Node

var current_player_data: Dictionary = {
    "name": "Hero",
    "class": "Warrior",
    "hair_color": Color.RED
}

func go_to_title():
    get_tree().change_scene_to_file("res://ui/menus/MainMenu.tscn")

func go_to_town():
    get_tree().change_scene_to_file("res://levels/Town.tscn")

func go_to_dungeon(seed: int):
    # Pass seed via argument or global
    GameData.current_seed = seed
    get_tree().change_scene_to_file("res://levels/DungeonParams.tscn")
```

## 2. Character Creation Screen
**Missing Piece:** You asked for this!
1. Create `res://ui/menus/CharacterCreate.tscn`.
2. **UI Elements:**
   - `LineEdit` (Name).
   - `OptionButton` (Class: Warrior, Mage).
   - `ColorPickerButton` (Hair).
3. **Logic:**
   ```gdscript
   func _on_start_pressed():
       SceneManager.current_player_data["name"] = $NameInput.text
       SceneManager.current_player_data["class"] = $ClassOption.selected
       SceneManager.go_to_town()
   ```

## 3. The Town (The Safe Hub)
The "Town" is just a Level where:
1. **Combat is Disabled:** Players cannot swing swords (Input check `if in_town: return`).
2. **Shopkeepers:** NPCs that open `ShopUI`.
3. **The Portal:** An Area2D at the end of town.
   - `_on_body_entered`: `SceneManager.go_to_lobby_menu()`.

## 4. The Loop
1. **Title Screen** -> Click "New Game".
2. **Character Create** -> Click "Enter World".
3. **Town** -> Walk around, buy potions.
4. **Portal** -> Opens **Lobby Menu** (Steam).
5. **Lobby** -> Wait for friends -> Click "Start Raid".
6. **Dungeon** -> Procedural Gen triggers -> Use `current_player_data` to spawn valid class.
7. **Death/Victory** -> Return to Town (Keep loot, or lose it).

## 5. Spawning the Custom Character
In `GameManager.gd` (Day 9), update the spawn logic:

```gdscript
func _create_player(id):
    var p = player_scene.instantiate()
    
    # Apply Customization from Global Data
    # (In multiplayer, you'd need to send this data via RPC first!)
    var data = SceneManager.get_player_data(id) # You need to sync this list
    p.set_class(data["class"])
    p.set_hair_color(data["hair_color"])
    
    add_child(p)
```

**Conclusion:**
You have the systems (Inventory, Combat, Steam).
This guide shows you how to **chain them together** into a loop.
