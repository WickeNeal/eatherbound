# Week 1, Day 3: Creating the Player (Movement & Sprites)

**Goal:** Get a character on screen, moving with WASD, using your own sprite.
**Prerequisite:** You have a `player.png` or `player.aseprite` file. If not, draw a 16x16 red square in Aseprite and save it.

## 1. The Scene Concept
Every object in Godot is a **Scene**. The Player is a Scene. The Level is a Scene.
A Scene is a tree of **Nodes**.

## 2. Creating the Player Scene
1. Click the **+** tab next to your `MainMenu` tab to create a new empty scene.
2. Click **Other Node** (at the bottom of the "Create Root Node" list).
3. Search for: `CharacterBody2D`.
   - *Note:* Godot 3 used `KinematicBody2D`. Godot 4 uses `CharacterBody2D`.
4. Click **Create**.
5. Rename the root node `CharacterBody2D` to `Player`.
6. Save the scene (**Ctrl+S**): `res://entities/player/player.tscn`.

## 3. Adding the Sprite (Visuals)
The `Player` node is invisible logic. We need a picture.
1. Right-click the `Player` node -> **Add Child Node**.
2. Search: `Sprite2D`. Create.
3. Now we need an image.
   - **Right way:** Drag your `player.png` from your file system (outside Godot) into the **FileSystem dock** inside Godot, into `res://entities/player/`.
4. Click the `Sprite2D` node.
5. In the **Inspector** (right panel), look for the **Texture** property (it says `<empty>`).
6. Drag your `player.png` from FileSystem into that **Texture** slot.
7. You should see your character in the viewport!

## 4. Adding the Collision (Physics)
You see a yellow warning triangle on `Player`. Click it.
*"This node has no shape..."* 
1. Right-click `Player` -> **Add Child Node**.
2. Search: `CollisionShape2D`. Create.
3. In the Inspector, look for **Shape** -> `<empty>`.
4. Click `<empty>` -> Select **New RectangleShape2D** (or Circle).
5. A blue box appears on your character.
6. Use the red dots in the Viewport to resize the blue box so it covers your character's FEET.
   - *Tip:* In top-down games, collision should only be the feet, so you can stand "in front" of walls to fake depth.

## 5. Scripting: The Magic (Logic)
Now we code.
1. Click the `Player` node (the top one).
2. Click the **Scroll with Green +** icon (Attach Script) top-right of the Scene dock.
3. **Template:** Default.
4. **Path:** `res://entities/player/player.gd`.
5. Click **Create**.

The script editor opens. Delete EVERYTHING. Paste this instead:

```gdscript
extends CharacterBody2D

# @export allows us to change this in the Inspector!
@export var move_speed: float = 200.0

func _physics_process(_delta: float) -> void:
    # 1. Get Input Direction
    # Input.get_vector helper calculates the vector for us.
    # It handles deadzones using "ui_left", "ui_right", etc.
    # By default, these are mapped to Arrow Keys. We will change them to WASD later.
    var direction: Vector2 = Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")
    
    # 2. Apply Velocity
    # direction is normalized (length of 1). We multiply by speed.
    velocity = direction * move_speed
    
    # 3. Move
    # This magic function uses the 'velocity' variable and moves the body,
    # handling collisions with walls automatically.
    move_and_slide()
    
    # Debug: Print only if moving
    if direction != Vector2.ZERO:
        print("Moving: ", direction)
```

## 6. Testing Movement
1. Go back to your `MainMenu` scene (or creating a new `Level` test scene).
   - Let's create a temporary Level.
   - **Scene** -> **New Scene**.
   - **Root Node**: `Node2D`. Rename to `TestWorld`.
   - **Instance Player**: Click the "Chain Link" icon (Instance Child Scene) next to the + button.
   - Select `player.tscn`.
2. Save `TestWorld` as `res://test_world.tscn`.
3. Press **F6** (Play Current Scene).
4. Use Arrow Keys. Your character should move!

## 7. Fixing Input Map (WASD)
1. **Project** -> **Project Settings**.
2. **Input Map** tab.
3. Toggle the "Show Built-in Actions" switch to ON.
4. Scroll to `ui_left`. Click the **+** (Add Event).
5. Press **A**. OK.
6. Repeat for `ui_right` (D), `ui_up` (W), `ui_down` (S).
7. Close.
8. Play again (**F6**). WASD now works.

## Summary
You just created a Scene, added Components (nodes), attached a Script, handled Input, and executed Physics movement. This is 90% of game dev.
