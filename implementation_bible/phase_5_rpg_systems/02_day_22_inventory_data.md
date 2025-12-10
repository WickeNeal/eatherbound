# Week 5, Day 22: Inventory Data Structure

**Goal:** A backend system to hold `[Sword, Potion, null, null]`.

## 1. The Inventory Component
`res://components/inventory/Inventory.gd`.

```gdscript
class_name Inventory extends Node

signal inventory_changed

@export var size: int = 20
var items: Array[ItemData] = []

func _ready():
    items.resize(size)

func add_item(item: ItemData) -> bool:
    # 1. Check for empty slot
    for i in range(size):
        if items[i] == null:
            items[i] = item
            inventory_changed.emit()
            return true
    return false # Full

func remove_item(index: int):
    items[index] = null
    inventory_changed.emit()
```

## 2. Attaching to Player
1. Open `Player.tscn`.
2. Add Child Node `Inventory` (Custom Node you just made).
3. Now the player has a backpack.
