# Week 3, Day 11: Deterministic RNG

**Goal:** Understand how to generate the same random numbers on different computers.

## 1. The Problem with Global `randi()`
Godot has a global function `randf()` and `randi()`.
This uses a global seed based on time.
- Computer A calls `randi()` -> gets 5.
- Computer B calls `randi()` -> gets 92.
**Result:** Player A sees a wall, Player B sees a door. Desync.

## 2. The Solution: `RandomNumberGenerator` Class
We instantiate a local generator.
1. Create `res://systems/dungeon_gen/DungeonGenerator.gd`.

```gdscript
extends Node2D

var rng: RandomNumberGenerator = RandomNumberGenerator.new()

func generate_dungeon(seed: int):
	rng.seed = seed
	print("Generating dungeon with seed: ", seed)
	
	# Test it
	var room_count = rng.randi_range(5, 10)
	print("Room Count: ", room_count)
```

## 3. Testing Determinism
1. Add this script to `TestWorld`.
2. In `_ready`, call `generate_dungeon(12345)`.
   - Run. Note the output. (e.g., Room Count: 7).
   - Stop.
   - Run again. Note the output. (It MUST be 7).
3. Change seed to `999`.
   - Run. Output changes (e.g., Room Count: 9).

## 4. Sending the Seed
When the Host starts the game:
1. Host picks a random seed: `var current_seed = randi()` (Yes, here we use random because we WANT a new dungeon).
2. Host RPCs: `generate_level.rpc(current_seed)`.
3. Everyone receives `12938192`.
4. Everyone sets `rng.seed = 12938192`.
5. Everyone runs the BSP algorithm using `rng`.

**Result:** Identical dungeons, 0KB map data transfer.
