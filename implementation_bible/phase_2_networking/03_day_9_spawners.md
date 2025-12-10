# Week 2, Day 9: MultiplayerSpawner & Authority

**Goal:** When Player A joins, a Player Character appears on Player B's screen automatically.
**Concept:** Manual `rpc` calls to spawn players are buggy. Godot 4 introduced `MultiplayerSpawner`. It watches a node, and if a child is added, it replicates that child to all clients.

## 1. Prepare the Level
1. Open `test_world.tscn`.
2. Add a `MultiplayerSpawner` node.
3. In Inspector:
   - **Spawn Path:** `.` (The root, TestWorld).
     - *Meaning:* "Watch the TestWorld node."
   - **Auto Spawn List:** Add Element. Select `res://entities/player/player.tscn`.
     - *Meaning:* "If a Player scene is added here, tell everyone."

## 2. The Game Manager (Spawning Logic)
We need a script to decide WHO spawns WHAT.
1. Create `res://systems/GameManager.gd` (Node).
2. Attach it to `test_world.tscn` root.
3. Code:

```gdscript
extends Node2D

@export var player_scene: PackedScene

func _ready():
    # Only the HOST (Authority) spawns players
    if multiplayer.is_server():
        spawn_players()
        
        # Listen for new connections
        multiplayer.peer_connected.connect(_on_player_connected)
        multiplayer.peer_disconnected.connect(_on_player_disconnected)

func spawn_players():
    # Spawn the host (myself)
    _create_player(1) # 1 is always the ID of the Host
    
    # Spawn valid clients if any are already connected
    for id in multiplayer.get_peers():
        _create_player(id)

func _on_player_connected(id):
    _create_player(id)

func _on_player_disconnected(id):
    if has_node(str(id)):
        get_node(str(id)).queue_free()

func _create_player(id: int):
    var p = player_scene.instantiate()
    p.name = str(id) # Name must be the ID for Authority to work!
    p.position = Vector2(100, 100) # Spawn point
    add_child(p) 
    # Because we added child to TestWorld, the MultiplayerSpawner sees it 
    # and instantly replicates it to all clients.
```

## 3. Assigning Authority (The Controller)
Right now, both players exist on both screens. But who controls whom?
If I press 'W', do I move Player 1 or Player 2?

Open `Player.gd`.
Modify `_physics_process` (or your state machine input reading):

```gdscript
func _enter_tree():
    # Set the authority to the number in the Name (e.g., "1", "49284")
    set_multiplayer_authority(name.to_int())

func _physics_process(delta):
    # CRITICAL CHECK: Am I the owner of this player?
    if is_multiplayer_authority():
        # Yes, this is MY character. I read MY keyboard.
        # Run state machine logic...
        pass
    else:
        # No, this is a distinct puppet. I do NOT read keyboard.
        # I just exist. Synchronization will move me.
        pass
```

## 4. Testing
Run Host and Client.
- Host should see two knights.
- Client should see two knights.
- **Problem:** If Host moves, Client sees Host standing still. Why?
- **Answer:** We spawned them, but we aren't syncing their position yet. That's Day 10.
