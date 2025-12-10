# Week 4, Day 19: Enemy AI (LimboAI / Behavior Trees)

**Goal:** Smart enemies, no spaghetti code.
**Tool:** LimboAI Plugin (Install from AssetLib if you haven't).

## 1. Why Behavior Trees?
Code becomes: `if dist < 50 attack else if dist < 200 chase else wander`.
Trees make this visual:
```
Selector
├── Sequence (Attack)
│   ├── Is Player Close?
│   └── Attack!
├── Sequence (Chase)
│   ├── Is Player Seen?
│   └── MoveTo(Player)
└── Wander
```

## 2. Setup LimboAI
1. Add `BTPlayer` node to Enemy.
2. Create New BehaviorTree resource.
3. Open BT Editor (Bottom panel).

## 3. Building the Tree
1. Root -> Selector.
2. Add Leaf `CheckTargetInRange`. (Custom Script).
3. Add Leaf `MoveToTarget`. (Blackboard based).

## 4. Coding Custom Tasks
LimboAI tasks are simple scripts.
`res://ai/tasks/task_move_to_player.gd`:

```gdscript
extends BTAction

func _tick(delta):
    var agent = agent # The enemy
    var target = agent.target
    
    if not target:
        return FAILURE
        
    agent.velocity = agent.position.direction_to(target.position) * 100
    agent.move_and_slide()
    return RUNNING
```

## 5. Visual Editing
Drag the task into the tree editor.
Now your enemy chases the player automatically.
