# Week 5, Day 24: Loot Tables

**Goal:** Identify what a Goblin drops.

## 1. The Loot Table Resource
`res://_core/resources/LootTable.gd`.

```gdscript
class_name LootTable extends Resource

@export var items: Array[ItemData]
@export var chances: Array[float] # 0.0 to 1.0

func get_drop() -> ItemData:
    var roll = randf()
    # Weighted math logic here...
    return items[0] # Simplified
```

## 2. Dropping it on the Ground
When Enemy dies:
1. `var item = loot_table.get_drop()`.
2. `var pickup = preload("res://entities/interactables/Pickup.tscn").instantiate()`.
3. `pickup.data = item`.
4. `get_tree().current_scene.add_child(pickup)`.

## 3. The Pickup Object
A 3D/2D object on the floor.
- `Area2D` detecting Player.
- `Sprite2D` showing `item.icon`.
- `_on_body_entered`: `player.inventory.add_item(data); queue_free()`.
