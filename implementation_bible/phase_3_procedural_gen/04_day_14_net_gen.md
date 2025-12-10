# Week 3, Day 14: Network Recreation (The Handshake)

**Goal:** Host generates map -> Tells Client -> Client generates map -> Game Starts.

## 1. The Loading State
We can't spawn players until the map is done.
1. Add a `LoadingScreen` UI.
2. **GameManager.gd**:
   
   ```gdscript
   # RPC that Host calls on everyone
   @rpc("authority", "call_local", "reliable")
   func start_game(seed: int):
       show_loading_screen()
       
       # 1. Generate Map
       await dungeon_generator.generate_dungeon(seed)
       
       # 2. Wait for NavMesh bake (it runs on thread usually, wait for signal)
       await dungeon_generator.nav_baked
       
       # 3. Spawn Players
       if multiplayer.is_server():
           spawn_players()
           
       hide_loading_screen()
   ```

## 2. The Loop
1. Lobby Host presses "Start Game".
2. `SteamManager` RPCs `GameManager.start_game( ranid() )`.
3. Validating:
   - Host sees 7 rooms.
   - Client sees 7 rooms.
   - If Client walks into a wall on Host's screen, you desynced. Check `rng` usage.

**Optimization:**
If baking navmesh is slow, only Host bakes it.
- **Problem:** Client AI handling?
- **Solution:** Usually, Host handles ALL AI. Client just receives "Enemy Position".
- **Benefit:** Client doesn't need to bake navmesh.

## 3. Troubleshooting
- **Desync:** "I see a wall, you see a floor."
  - *Cause:* Did you use `randi()` anywhere instead of `rng.randi()`?
  - *Cause:* Did you iterate a Dictionary? (Dictionaries are unordered). Always iterate Arrays or sort keys first.
