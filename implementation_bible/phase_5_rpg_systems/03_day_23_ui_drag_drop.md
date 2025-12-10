# Week 5, Day 23: UI Drag & Drop

**Goal:** Move the sword from slot 1 to slot 5.

## 1. The Slot UI
Create `res://ui/inventory/InventorySlot.tscn`.
- Root: `PanelContainer`. Script `InventorySlot.gd`.
- Child: `TextureRect` (Icon).

```gdscript
extends PanelContainer

var item_data: ItemData

func set_item(data: ItemData):
    item_data = data
    if data:
        $TextureRect.texture = data.icon
    else:
        $TextureRect.texture = null

# DRAG START
func _get_drag_data(at_position):
    if not item_data: return null
    
    # Create the visual preview
    var preview = TextureRect.new()
    preview.texture = item_data.icon
    set_drag_preview(preview)
    
    return item_data # This is the "Data" we are dragging

# DRAG DROP (Recieve)
func _can_drop_data(_pos, data):
    return data is ItemData

func _drop_data(_pos, data):
    # Here we should call the Inventory Component to swap the items at these indices
    # This requires knowing index. For simplicity:
    set_item(data) # Logic should go through backend, visual only update here
```

## 2. The Inventory Screen
1. Create `InventoryMenu.tscn`.
2. `GridContainer` (Columns: 5).
3. Instantiate 20 `InventorySlot` scenes inside.
4. Connect the UI to the Player's Inventory Component signals.
