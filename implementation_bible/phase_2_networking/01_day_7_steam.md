# Week 2, Day 7: GodotSteam Integration

**Goal:** Initialize Steamworks so the game knows your Steam ID.
**Prerequisite:** You installed the GodotSteam GDExtension in Week 0.
**Warning:** Steam must be running in the background for this to work.

## 1. The Steam App ID
For development, we use App ID `480` (Spacewar). It is Valve's test app.
Everyone uses 480 until they pay the $100 Steam Direct fee.

## 2. Initializes Steam (The Global Manager)
We need a script that runs *before* the game starts.
1. Create `res://_core/networking/SteamManager.gd`.
2. Code:

```gdscript
extends Node

var is_owned: bool = false
var steam_id: int = 0
var steam_username: String = ""

func _ready():
	initialize_steam()

func initialize_steam():
	var INIT: Dictionary = Steam.steamInit()
	# Dictionary usually returns {"status": 0, "verbal": "Success"}
	
	if INIT['status'] != 1:
		print("Failed to initialize Steam: " + str(INIT['verbal']))
		# If we fail, maybe we aren't on Steam (Dev mode). 
		# If this crashes, make sure Steam is open!
		return

	is_owned = Steam.isSubscribed()
	steam_id = Steam.getSteamID()
	steam_username = Steam.getPersonaName()
	
	print("Steam Init Successful!")
	print("User: ", steam_username)
	print("ID: ", steam_id)

func _process(_delta):
	# Steam requires us to call run_callbacks() every frame
	# This checks for incoming packets, lobby invites, etc.
	Steam.run_callbacks()
```

## 3. Registering the Autoload
Ideally, you want this to run globally.
1. **Project** -> **Project Settings** -> **Autoload**.
2. Add `res://_core/networking/SteamManager.gd`.
3. Name it `SteamManager`.

## 4. Run it
1. Press F5 (Run Project).
2. Look at the **Output** console (Bottom panel).
3. If it says: "Steam Init Successful! User: [YourName]", you win.
4. If it crashes or says "Failed", make sure the Steam Client is running and you are logged in.

## 5. Troubleshooting "steam_appid.txt"
Sometimes GDExtension needs a text file to know we are App 480.
1. Open your project folder (Right click `res://` -> Open in File Manager).
2. Create a file named `steam_appid.txt` in the root (next to project.godot).
3. Write `480` inside. Save.
4. Restart Godot.

**Result:** Your game is now connected to the Steam network.
