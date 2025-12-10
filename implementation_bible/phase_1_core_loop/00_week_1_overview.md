# Week 1: The Core Loop Overview

**Goal:** Create a game feeling that is fun *before* we add enemies or multiplayer.
**Focus:** "Game Feel", State Management, and Physics.

## The Schedule
- **Day 3:** The Player Controller. (Movement, Sprites)
- **Day 4:** The State Machine. (Organizing code so you can't walk while attacking)
- **Day 5:** Input Buffering & Coyote Time. (Making it feel responsive, not clunky)
- **Day 6:** Hitboxes & Hurtboxes. (The foundation of combat)

## Key Concepts
1.  **Kinematic Bodies:** We control the movement 100%. Gravity, friction, acceleration are all math we write.
2.  **States:** A player is always in ONE state. `Idle`, `Run`, `Attack`, `Roll`.
3.  **Composition:** We will build a `StateMachine` node that can be reused for Enemies later.

**Proceed to Day 3 to start coding.**
