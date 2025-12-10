# Conceptual Mapping: The "Web-to-Game" Dictionary

**Target Audience:** Full-Stack Vue/Laravel Developers
**Goal:** Translate game development concepts into familiar web development terms.

| Web Concept (Vue/Laravel) | Godot/Game Concept | Implementation Notes & Differences |
| :--- | :--- | :--- |
| **DOM Tree** | **Scene Tree** | A hierarchy of Nodes. Just as you manipulate the DOM with JS (`document.getElementById`), you manipulate the Scene Tree with GDScript (`get_node()`). However, the Scene Tree updates 60 times a second. |
| **Component (<Button />)** | **Node (Scene)** | Godot is Component-Based. Instead of a `<UserCard>` component, you have a `Player.tscn` scene. You compose entities: A Player is a `CharacterBody2D` with a `Sprite2D`, `CollisionShape2D`, and custom `HealthComponent` (Node). |
| **Props (Vue)** | **Export Variables** | `@export var health: int = 100` allows you to set the value in the Inspector (GUI), just like passing props to a component. |
| **Events ($emit)** | **Signals** | `signal health_changed(new_value)`. You `connect` signals to functions. Equivalent to `v-on:click` or purely event-driven architecture. |
| **Vuex / Pinia (Store)** | **Autoload (Singleton)** | Global scripts that persist between scene changes. Use for `GameData`, `NetworkManager`, or `Settings`. accessible anywhere via `Name.property`. |
| **Lifecycle (mounted, created)** | **_ready(), _enter_tree()** | `_ready()` is `mounted()`. It runs once when the node acts. `_process(delta)` is the game loop, running every frame (no Web equivalent, maybe `requestAnimationFrame`). |
| **Database (MySQL)** | **Resources (.tres)** | For static data (Item stats, Enemy types), use **Resources**. They are scriptable objects saved as files. Think of them as strictly typed JSON files that load instantly. |
| **API Request (fetch)** | **RPC (Remote Procedure Call)** | `attack.rpc()`. Instead of hitting an endpoint, you execute a function on another client's machine. |
| **Backend Server** | **Host (Authority)** | In P2P, one player is the Host. Code uses `is_multiplayer_authority()` to decide if it has permission to change critical state (like HP). |

## Critical Mindset Shifts

### 1. The Loop > The Request
In Web, you wait for a request, process it, and return a response.
In Games, the `_process(delta)` function runs ~60 times a second regardless of input. You are constantly simulating a world.
**Advice:** Do not block the main thread. No `sleep()` calls. Use timers or state checks.

### 2. State Management
In Web, state often lives in the DB or the Store.
In Games, state is distributed. The `Player` node holds its own `health`. The `Level` node holds the list of enemies.
**Advice:** Use "Signals" (Events) to decouple. The `Player` shouldn't know about the `UI`. The `Player` emits `health_changed`, and the `UI` listens for it.

### 3. Composition over Inheritance
Don't make a giant `Entity` class and inherit `Player` and `Enemy` from it.
Make small components: `HealthComponent`, `HitboxComponent`, `InventoryComponent`.
Attach these to `Player` and `Enemy`.
**Why:** It's like Vue Mixins but better. It prevents "Gorilla/Banana" problems (you wanted a banana, but got the gorilla holding it and the entire jungle).
