# Week 2: Networking Foundation Overview

**Goal:** Two players can join a lobby, see each other, and walk around.
**Concept:** "Multiplayer-First". If you don't build networking now, you will never build it later. Refactoring a single-player game to multiplayer is hell.

## The "Authority" Mindset
In Web Dev, the Server is the Authority.
In P2P (Peer-to-Peer), the **Host** is the Authority.
- **Client:** "I pressed the Attack button." (Sends RPC to Host)
- **Host:** "Okay, you attacked." (Spawns hitbox, tells everyone else)

## The Schedule
- **Day 7:** GodotSteam Integration. (Getting the API to talk)
- **Day 8:** The Lobby System. (Finding a game)
- **Day 9:** The MultiplayerSpawner. (How players appear)
- **Day 10:** The MultiplayerSynchronizer. (Smooth movement)

**Proceed to Day 7.**
