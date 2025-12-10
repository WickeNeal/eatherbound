# Project Aetherbound: The Implementation Bible (Index)

## Overview
This bible provides a step-by-step, day-by-day guide to building **Project Aetherbound**, a Godot 4.3+ P2P Multiplayer ARPG, tailored for a Full-Stack Web Developer.

## Conceptual Dictionary
- [The Web-to-Game Dictionary](_index_and_setup/01_web_to_game_mapping.md)
- [Antigravity Master Directive](_index_and_setup/02_master_directive.md)

## Week 0: Setup & Tools
- [Day 1: Tool Installation & Configuration](_index_and_setup/03_day_1_tools.md)
- [Day 2: Project Architecture & Organization](_index_and_setup/04_day_2_structure.md)

## Phase 1: The Core Loop (Single Player Physics)
- [Week 1 Overview](phase_1_core_loop/00_week_1_overview.md)
    - [Day 3: The Player Controller](phase_1_core_loop/01_day_3_player_controller.md)
    - [Day 4: The State Machine Pattern](phase_1_core_loop/02_day_4_state_machine.md)
    - [Day 5: Input Buffering & Feel](phase_1_core_loop/03_day_5_input_buffering.md)
    - [Day 6: Basic Combat Interactions](phase_1_core_loop/04_day_6_hits_and_hurts.md)

## Phase 2: Networking Foundation
- [Week 2 Overview](phase_2_networking/00_week_2_overview.md)
    - [Day 7: GodotSteam Integration](phase_2_networking/01_day_7_steam.md)
    - [Day 8: Lobbies & P2P](phase_2_networking/02_day_8_lobbies.md)
    - [Day 9: Spawners & Authority](phase_2_networking/03_day_9_spawners.md)
    - [Day 10: Synchronization](phase_2_networking/04_day_10_sync.md)
    - [Bonus: The Full Game Loop (Title -> Town -> Dungeon)](phase_2_networking/06_bonus_game_loop.md)

## Phase 3: Procedural Dungeon Generation
- [Week 3 Overview](phase_3_procedural_gen/00_week_3_overview.md)
    - [Day 11: Deterministic RNG](phase_3_procedural_gen/01_day_11_seeds.md)
    - [Day 12: BSP Algorithm](phase_3_procedural_gen/02_day_12_bsp.md)
    - [Day 13: AutoTiling & Navigation](phase_3_procedural_gen/03_day_13_tilemaps.md)

## Phase 4: Souls-like Combat System
- [Week 4 Overview](phase_4_combat/00_week_4_overview.md)
    - [Day 14: Collision Matrices](phase_4_combat/01_day_14_layers.md)
    - [Day 15: Animation Events](phase_4_combat/02_day_15_anim_events.md)
    - [Day 16: Poise & Stagger](phase_4_combat/03_day_16_poise.md)
    - [Day 17: Enemy AI (Behavior Trees)](phase_4_combat/04_day_17_ai.md)
    - [Day 20: Visual Feedback (Hitstop, Shake, Flash)](phase_4_combat/05_day_20_juice.md)
    - [Bonus: Boss Design & Phases](phase_4_combat/06_bonus_boss_design.md)

## Phase 5: RPG Systems
- [Week 5 Overview](phase_5_rpg_systems/00_week_5_overview.md)
    - [Day 18: Resource-based Data](phase_5_rpg_systems/01_day_18_resources.md)
    - [Day 19: Inventory Management](phase_5_rpg_systems/02_day_19_inventory.md)
    - [Day 20: UI & Drag-Drop](phase_5_rpg_systems/03_day_20_ui.md)
