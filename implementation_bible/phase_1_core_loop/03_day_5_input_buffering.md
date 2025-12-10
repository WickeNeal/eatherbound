# Week 1, Day 5: Game Feel (Input Buffering)

**Goal:** Make the controls feel responsive.
**Problem:** If I press "Space" (Roll) 0.1 seconds before my Attack animation ends, the game ignores it. The player feels "The game ate my input!".
**Solution:** We remember the key press for 0.15 seconds.

## 1. The Global Input Buffer
We need a Singleton (Autoload) that listens to inputs globally.
1. Create script: `res://_core/input/InputBuffer.gd`.
2. **Project** -> **Project Settings** -> **Autoload**.
3. Add `InputBuffer.gd`. Name it `InputBuffer`.
4. Code:

```gdscript
extends Node

# How long (in ms) to remember a press
const BUFFER_WINDOW: int = 150 

var _last_action: String = ""
var _timestamp: int = 0

func _input(event):
	if event.is_action_pressed("ui_accept"): # Space bar usually
		_last_action = "ui_accept"
		_timestamp = Time.get_ticks_msec()

func is_action_pressed_buffered(action: String) -> bool:
	if action != _last_action:
		return false
	
	var time_diff = Time.get_ticks_msec() - _timestamp
	if time_diff <= BUFFER_WINDOW:
		# We consumed the input, so clear it!
		_last_action = "" 
		return true
		
	return false
```

## 2. Implementing a Roll State
Let's use this buffer.
1. Add a new Node to StateMachine in `Player.tscn`: `Roll`.
2. Script `player_roll.gd`.

```gdscript
extends State

var roll_speed: float = 400.0
var timer: float = 0.0
var roll_duration: float = 0.2

func enter():
	timer = roll_duration
	# Get last input direction or default to current facing
	var dir = Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")
	if dir == Vector2.ZERO:
		dir = Vector2.RIGHT # Default roll right if standing still
	
	player.velocity = dir * roll_speed

func physics_update(delta):
	timer -= delta
	player.move_and_slide()
	
	if timer <= 0:
		get_parent().transition_to("idle")
```

## 3. Wiring the Buffer
Go to `player_walk.gd` and `player_idle.gd`.
Add this check inside `physics_update`:

```gdscript
# Check Global Buffer
if InputBuffer.is_action_pressed_buffered("ui_accept"):
	get_parent().transition_to("roll")
```

**Note:** You must map "Space" to `ui_accept` in Project Settings -> Input Map if it isn't already.

## 4. Testing "Coyote Time" (Optional but Good)
Coyote Time usually refers to jumping after walking off a ledge, but here we can think of it as "Input Memorization".
1. Play the game.
2. Tap WASD to walk.
3. Tap Space. You dash!
4. **The Feel Test:** While Dashing, press Space again.
   - *Current Result:* Nothing happens because Roll state ignores input.
   - *Desired Result:* As soon as Roll ends, you Roll again immediately.
   - *Fix:* In `player_roll.gd`, inside `physics_update`, check the buffer ONLY when `timer <= 0`.
   
   ```gdscript
   if timer <= 0:
       if InputBuffer.is_action_pressed_buffered("ui_accept"):
           enter() # Restart roll!
           return
       get_parent().transition_to("idle")
   ```

Now you can chain rolls perfectly. This is the foundation of "Souls-like" combat flow.
