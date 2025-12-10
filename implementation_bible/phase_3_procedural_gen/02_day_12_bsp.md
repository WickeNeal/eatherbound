# Week 3, Day 12: The BSP Algorithm

**Goal:** Create a room layout.
**Algorithm:** Binary Space Partitioning.
1. Take a big rectangle.
2. Cut it in half (horizontally or vertically).
3. Take the two pieces. Cut THEM in half.
4. Repeat 4-5 times.
5. Create a room inside the final small rectangles.

## 1. The Code
Open `DungeonGenerator.gd`.

```gdscript
extends Node2D

var rng = RandomNumberGenerator.new()
var rooms: Array[Rect2i] = []

func _generate_bsp(container: Rect2i, iterations: int):
	if iterations <= 0:
		# We are at a leaf node. Create a room here.
		_create_room(container)
		return
	
	# Decide cut direction (0 = Horizontal, 1 = Vertical)
	# Use 'rng' not 'randi'!
	var cut_dir = rng.randi() % 2 
	
	var left_rect: Rect2i
	var right_rect: Rect2i
	
	if cut_dir == 0: # Horizontal Split
		var split_y = rng.randi_range(container.position.y + 5, container.end.y - 5)
		var h1 = split_y - container.position.y
		var h2 = container.size.y - h1
		left_rect = Rect2i(container.position, Vector2i(container.size.x, h1))
		right_rect = Rect2i(Vector2i(container.position.x, split_y), Vector2i(container.size.x, h2))
	else: # Vertical Split
		var split_x = rng.randi_range(container.position.x + 5, container.end.x - 5)
		var w1 = split_x - container.position.x
		var w2 = container.size.x - w1
		left_rect = Rect2i(container.position, Vector2i(w1, container.size.y))
		right_rect = Rect2i(Vector2i(split_x, container.position.y), Vector2i(w2, container.size.y))
		
	# Recursion
	_generate_bsp(left_rect, iterations - 1)
	_generate_bsp(right_rect, iterations - 1)

func _create_room(rect: Rect2i):
	# Shrink the rectangle slightly so walls don't touch seamlessly
	var width = rng.randi_range(rect.size.x / 2, rect.size.x - 2)
	var height = rng.randi_range(rect.size.y / 2, rect.size.y - 2)
	var x = rect.position.x + rng.randi_range(0, rect.size.x - width)
	var y = rect.position.y + rng.randi_range(0, rect.size.y - height)
	
	var room = Rect2i(x, y, width, height)
	rooms.append(room)
```

## 2. Drawing it (TileMapLayer)
We need to see it.
1. Add a `TileMapLayer` node to `TestWorld`. Rename `FloorLayer`.
2. Create a TileSet (New TileSet). Drag your floor sprite in.
3. In `DungeonGenerator.gd`:

```gdscript
@export var tile_map: TileMapLayer

func place_tiles():
    tile_map.clear()
    for room in rooms:
        for x in range(room.position.x, room.end.x):
            for y in range(room.position.y, room.end.y):
                tile_map.set_cell(Vector2i(x, y), 0, Vector2i(0, 0)) # Source ID 0, Atlas (0,0)
```

## 3. Connecting Corridors
(Simplified for guide)
Iterate through `rooms`. Connect `rooms[i]` center to `rooms[i+1]` center using "Dog-leg" paths (Horizontal then Vertical).

```gdscript
func _create_corridor(start: Vector2i, end: Vector2i):
    var cursor = start
    while cursor.x != end.x:
        tile_map.set_cell(cursor, 0, Vector2i(0,0))
        cursor.x += sign(end.x - start.x)
    while cursor.y != end.y:
        tile_map.set_cell(cursor, 0, Vector2i(0,0))
        cursor.y += sign(end.y - start.y)
```
