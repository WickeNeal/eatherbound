# Week 2, Day 10: MultiplayerSynchronizer

**Goal:** Sync movement smoothly across the network.
**Concept:** The `MultiplayerSynchronizer` node reads variables (Position, Velocity) and sends them to other clients automatically.

## 1. Adding the Synchronizer
1. Open `Player.tscn`.
2. Add a child node: `MultiplayerSynchronizer`.
3. In the Inspector -> **Replication Config** -> `<empty>` -> **New SceneReplicationConfig**.
4. Click **Add Property**.
   - Select property: `:position` (Node2D > Transform > Position).
   - Select property: `:velocity`.
   - *Optional:* Sync `:animation` if you store "current_animation" in a variable.

## 2. Configuring Intervals
- Click the property in the list.
- **Spawn:** Checked (Sync on spawn).
- **Replication Interval:**
  - `0`: Every frame (60hz). High bandwidth, smooth.
  - `0.05`: 20hz. Lower bandwidth, might look jittery without interpolation.
  - *Recommendation:* Keep it `0` (Always) for development. Optimize later.

## 3. Animation Sync
Position is easy. Animation is harder.
If I play "Attack", you need to see "Attack".
1. In `Player.gd` or `StateMachine.gd`, add a sync variable:
   
   ```gdscript
   @export var sync_anim_name: String = "idle"
   ```

2. Add `sync_anim_name` to the MultiplayerSynchronizer replication list.
3. In `_process`:
   
   ```gdscript
   if is_multiplayer_authority():
       sync_anim_name = state_machine.current_state.name
   else:
       # I am a puppet. I read the synced variable and play it.
       anim_player.play(sync_anim_name)
   ```

## 4. Interpolation (Making it butter smooth)
Godot 4's Synchronizer handles basic interpolation, but for true quality:
1. Ensure **Replication Interval** is set to a standard tick (e.g., 20hz).
2. The `MultiplayerSynchronizer` has a property `Root Path`. Ensure it points to the Player.
3. There is a setting `Interpolate`. Ensure it is True.

## 5. Final Verify
Run Host and Client.
1. Host moves. -> Client sees Host move.
2. Client moves. -> Host sees Client move.
3. Host disconnects -> Client sees Host disappear (handling disconnects).

**Result:** You have a working Multiplayer Foundation.
**Next Phase:** Making a Dungeon for these players to explore.
