# Week 1, Day 4: The Finite State Machine (FSM)

**Goal:** Refactor our Player code so we can easily add complex moves like Rolling and Attacking without using 1000 `if` statements.
**Concept:** You are only ever in ONE state. If you are `Attacking`, you cannot be `Walking`. The FSM enforces this.

## 1. Creating the State Machine Nodes
We will use Nodes for this. This is the "Godot Way".

1. Open your `Player.tscn` scene.
2. Right-click `Player` (Root) -> **Add Child Node**.
3. Create a generic `Node`. Rename it `StateMachine`.
4. Right-click `StateMachine` -> **Add Child Node**.
5. Create a generic `Node`. Rename it `Idle`.
6. Duplicate `Idle` (Ctrl+D) and name it `Walk`.
7. Your Tree should look like:
   ```
   Player (CharacterBody2D)
   ├── Sprite2D
   ├── CollisionShape2D
   └── StateMachine (Node)
       ├── Idle (Node)
       └── Walk (Node)
   ```

## 2. The Base State Script
We need a template that all states will share.
1. Right-click `res://components/` -> Create New Folder `state_machine`.
2. Right-click that folder -> Create New **Script**.
   - Name: `State.gd`
   - Inherits: `Node`
3. Paste this code:

```gdscript
class_name State extends Node

# We store a reference to the player so we can move him
var player: CharacterBody2D

# Virtual functions (Vue "Lifecycle Hooks" equivalent)
func enter():
	pass

func exit():
	pass

func update(_delta: float):
	pass

func physics_update(_delta: float):
	pass
```

## 3. The State Machine Script
This manages the active state.
1. Create New Script in `res://components/state_machine/` named `StateMachine.gd`.
2. Paste this:

```gdscript
class_name StateMachine extends Node

@export var initial_state: State

var current_state: State
var states: Dictionary = {}

func _ready():
	# Wait for owner (Player) to be ready
	await owner.ready
	
	# Find all children that are States
	for child in get_children():
		if child is State:
			states[child.name.to_lower()] = child
			child.player = owner # The Player Node
	
	if initial_state:
		initial_state.enter()
		current_state = initial_state

func _process(delta):
	if current_state:
		current_state.update(delta)

func _physics_process(delta):
	if current_state:
		current_state.physics_update(delta)

# The Function to Change States
func transition_to(key: String):
	if !states.has(key):
		return
	
	current_state.exit()
	current_state = states[key]
	current_state.enter()
```

## 4. Connecting Scripts to Scene
1. Go back to `Player.tscn`.
2. Click the `StateMachine` node.
3. Drag `StateMachine.gd` onto it.
4. **Important:** In the Inspector for StateMachine, you will see "Initial State". It is empty. We will fill it soon.

## 5. Implementing Idle and Walk
Now we move the logic from `Player.gd` into these smaller scripts.

### The Player (Cleaned up)
Open `Player.gd`. Remove the movement code in `_physics_process`.
It should just hold data now.

```gdscript
extends CharacterBody2D
class_name Player # Global class name

@export var move_speed: float = 200.0

# We don't do anything here anymore! The States handle it.
```

### The Idle State
1. Click the `Idle` node in the Scene tree.
2. Attach a New Script. Save it as `res://entities/player/states/player_idle.gd`.
3. Code:

```gdscript
extends State

func enter():
	# When we stop moving, play Idle animation (later)
	player.velocity = Vector2.ZERO

func physics_update(_delta: float):
	# Check for input
	var direction = Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")
	
	if direction != Vector2.ZERO:
		# Transition to Walk!
		# We must emit a signal or call the parent. 
		# For simplicity, we assume we can call the parent state machine (a slightly dirty but easy pattern)
		get_parent().transition_to("walk")
```

### The Walk State
1. Click `Walk` node.
2. Attach Script: `res://entities/player/states/player_walk.gd`.
3. Code:

```gdscript
extends State

func physics_update(_delta: float):
	var direction = Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")
	
	if direction == Vector2.ZERO:
		get_parent().transition_to("idle")
		return

	player.velocity = direction * player.move_speed
	player.move_and_slide()
```

## 6. Final Wiring
1. Click `StateMachine` node.
2. Assign **Initial State**: Click `Assign...` and select the `Idle` node.
3. Run the game (`F6`).
   - It should behave exactly the same as before.
   - **Why did we do this?** Because now, if you want to add `Attack`, you just create an `Attack` node. Inside `Attack.gd`, you simply *don't* check for movement keys. Therefore, the player CANNOT move while attacking.

## Checklist
- [ ] `Player.gd` is nearly empty.
- [ ] `StateMachine` node has the script.
- [ ] `Idle` and `Walk` nodes have their specific scripts.
- [ ] You can walk around using WASD.
- [ ] Moving prints nothing, but the logic is working.
