# Week 2, Day 8: The Lobby System

**Goal:** Create a "Host Game" button that opens a P2P lobby, and a list of lobbies for others to join.
**Concept:**
- **Lobby:** A "Room" on Steam servers that holds metadata (Room Name, Player Count). It is NOT the game server. It's just a signpost.
- **P2P Connection:** Once players are in the Lobby, they connect directly to each other (Peer-to-Peer).

## 1. Updating SteamManager for Lobbies
Open `SteamManager.gd`. We need to handle Lobby signals.

```gdscript
# Add these signals
signal lobby_created(connect_id)
signal lobby_joined(lobby_id)
signal lobby_list_refreshed(lobbies)

func _ready():
    initialize_steam()
    # Connect Steam signals to our functions
    Steam.lobby_created.connect(_on_lobby_created)
    Steam.lobby_match_list.connect(_on_lobby_match_list)
    Steam.lobby_joined.connect(_on_lobby_joined)

# -- HOSTING --
func host_lobby():
    # LobbyType: 2 (Public), MaxMembers: 4
    Steam.createLobby(Steam.LOBBY_TYPE_PUBLIC, 4)

func _on_lobby_created(connect: int, lobby_id: int):
    if connect == 1: # 1 means Success
        steam_id = lobby_id
        print("Created Lobby: ", steam_id)
        
        # Set Lobby Data (Title)
        Steam.setLobbyData(steam_id, "name", str(steam_username) + "'s Game")
        
        # Setup the P2P Connection (Using Godot's High Level Multiplayer)
        _create_p2p_host()
        
        lobby_created.emit(lobby_id)

# -- JOINING --
func list_lobbies():
    Steam.addRequestLobbyListDistanceFilter(Steam.LOBBY_DISTANCE_FILTER_WORLDWIDE)
    Steam.requestLobbyList()

func _on_lobby_match_list(lobbies: Array):
    # lobbies is an array of Lobby IDs
    lobby_list_refreshed.emit(lobbies)

func join_lobby(lobby_id: int):
    Steam.joinLobby(lobby_id)

func _on_lobby_joined(lobby_id: int, _permissions: int, _locked: bool, response: int):
    if response == 1: # Success
        print("Joined Lobby: ", lobby_id)
        _create_p2p_client(lobby_id)
        lobby_joined.emit(lobby_id)

# -- THE NETWORKING LAYER -- (Crucial Step)

var peer = SteamMultiplayerPeer.new()

func _create_p2p_host():
    peer.create_host(0) # 0 is standard port for Steam
    multiplayer.multiplayer_peer = peer

func _create_p2p_client(lobby_id: int):
    # We connect to the HOST of the lobby (The Lobby Owner)
    var host_steam_id = Steam.getLobbyOwner(lobby_id)
    peer.create_client(host_steam_id, 0)
    multiplayer.multiplayer_peer = peer
```

## 2. The Lobby UI
We need buttons.
1. Create `res://ui/menus/LobbyMenu.tscn` (Control Node).
2. Add:
   - Button (`HostButton`)
   - Button (`RefreshButton`)
   - VBoxContainer (`LobbyList`)
3. Script `LobbyMenu.gd`:

```gdscript
extends Control

@onready var lobby_list = $LobbyList

func _ready():
    # Connect Buttons
    $HostButton.pressed.connect(_on_host_pressed)
    $RefreshButton.pressed.connect(_on_refresh_pressed)
    
    # Listen to Manager
    SteamManager.lobby_list_refreshed.connect(_on_lobby_list)
    SteamManager.lobby_joined.connect(_on_joined)

func _on_host_pressed():
    SteamManager.host_lobby()
    # Loading screen would go here
    
func _on_refresh_pressed():
    SteamManager.list_lobbies()

func _on_lobby_list(lobbies):
    # Clear old list
    for child in lobby_list.get_children():
        child.queue_free()
    
    # Populate new
    for lobby_id in lobbies:
        var lobby_name = Steam.getLobbyData(lobby_id, "name")
        var btn = Button.new()
        btn.text = lobby_name
        btn.pressed.connect(func(): SteamManager.join_lobby(lobby_id))
        lobby_list.add_child(btn)

func _on_joined(_lobby_id):
    # Start the game scene!
    get_tree().change_scene_to_file("res://test_world.tscn")
```

## 3. Testing Logic
You cannot test multiplayer alone.
1. **Export** the project (Project -> Export -> Windows/Mac).
2. Send the build to a friend (OR run the exported .exe yourself while running the Editor).
   - *Note:* You cannot run two copies of the same Steam Account in same lobby usually.
   - *Workaround:* Use `Steamcmd` or just run two instances. GodotSteam usually handles loopback if running two instances on one machine for dev.
3. Instance 1: Click Host.
4. Instance 2: Click Refresh -> Click Join.
5. If both scenes change to `test_world.tscn`, you have successful P2P connection!
