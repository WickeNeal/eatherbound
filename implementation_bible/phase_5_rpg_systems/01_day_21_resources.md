# Week 5, Day 21: Custom Resources (The Database)

**Goal:** Create a "Database" of items without SQL.

## 1. Creating the Schema
Create `res://_core/resources/ItemData.gd`.
This defines what an "Item" looks like.

```gdscript
class_name ItemData extends Resource

enum Type { WEAPON, ARMOR, CONSUMABLE }

@export var id: String
@export var name: String
@export_multiline var description: String
@export var icon: Texture2D
@export var item_type: Type
@export var weight: float = 1.0
@export var value: int = 10
@export var scene_to_instantiate: PackedScene # For throwing it on ground
```

## 2. Using the Schema
1. Right-click in FileSystem -> Create New -> **Resource**.
2. Search `ItemData`.
3. Save as `res://assets/items/sword_iron.tres`.
4. In the Inspector, fill out the fields:
   - Name: "Iron Sword"
   - Damage: 5
   - Icon: [Drag sprite here]
5. Make another: `potion_health.tres`.

## 3. Why is this powerful?
You just made a database entry.
You can Drag and Drop `sword_iron.tres` into ANY script variable typed as `@export var loot: ItemData`.
No IDs to look up. No queries. Just drag the file.
