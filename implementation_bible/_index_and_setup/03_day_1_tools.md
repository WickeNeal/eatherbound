# Week 0, Day 1: The Toolchain Setup

**Goal:** Install all necessary software and configure the Godot Editor for professional development.
**Estimated Time:** 1 Hour

## 1. Install Godot Engine
You are a developer, so we will do this the right way.
1. Go to [godotengine.org/download](https://godotengine.org/download).
2. Download **Godot 4.3** (or latest stable).
   - *Note:* You do NOT need the .NET/C# version. GDScript is better for this project.
3. Extract the zip.
4. Move the `Godot` app to your Applications folder.
5. **Open Godot**.

## 2. Install Aseprite (for Art)
We will use pixel art. Aseprite is the industry standard.
1. Buy/Download Aseprite from [aseprite.org](https://www.aseprite.org/) or Steam.
2. (Optional but Recommended) If you don't want to buy it, you can compile it from source (complex) or use **LibreSprite** (free fork).
3. **Verify:** Open Aseprite and draw a smiley face. Save it as `player.aseprite`.

## 3. Create the Project
1. In GodotProject Manager, click **+ Create New Project**.
2. **Project Name:** `Aetherbound`
3. **Project Path:** Create a folder at `~/Dev/Aetherbound` (or wherever you code).
4. **Renderer:** `Forward+` (Best for PC/Steam).
5. Click **Create & Edit**.

## 4. Install "Aseprite Wizard" (Crucial Plugin)
This plugin lets you save `.aseprite` files directly into your project, and Godot will automatically turn them into SpriteFrames. No manual exporting!
1. Inside Godot, click **AssetLib** (top center).
2. Search for `Aseprite Wizard`.
3. Click **Download**, then **Install**.
4. A popup "Package Installer" appears. Ensure files are checked and click **Install**.
5. Enable the plugin:
   - Go to **Project** (top left) -> **Project Settings**.
   - Click the **Plugins** tab.
   - Check the **Enable** box next to Aseprite Wizard.
6. Configure it:
   - Go to **Project** -> **Tools** -> **Aseprite Wizard Config**.
   - Set the path to your Aseprite executable (e.g., `/Applications/Aseprite.app/Contents/MacOS/aseprite`).

## 5. Install "GodotSteam"
We need Steamworks networking.
1. Go to the [GodotSteam Asset Library Page](https://godotengine.org/asset-library/asset/2445) or search "GodotSteam" in the AssetLib.
   - *Warning:* Creating a Steam game is complex. For now, we will just install the GDExtension.
   - **Easiest Method:** Download the **Pre-Compiled Editor** from [GodotSteam Github](https://github.com/CoaguCo-Industries/GodotSteam/releases) if you want deep integration, BUT for this guide, we will use the **GDExtension** plug-in which works with standard Godot.
2. Search `GodotSteam` in the AssetLib. Download & Install the **GDExtension** version.
3. Enable it in **Plugins** tab.
4. **Restart Godot**.

## 6. Configure Editor Settings (Developer Quality of Life)
Make Godot feel like VS Code.
1. **Editor** -> **Editor Settings**.
2. **Interface** -> **Theme**:
   - Preset: `Godot 2` (Darker, flatter) or keep Default.
   - Base Color: Change to your liking.
3. **Text Editor** -> **Behavior**:
   - **Indent Use Spaces:** ON (Python/GDScript standard is Tabs, but Vue usually uses Spaces. Stick to **TABS** for Godot community standard, or change to Spaces if you really prefer). *Recommendation: Keep Tabs.*
4. **FileSystem** -> **File Dialog**:
   - Show Hidden Files: On.

## Checklist
- [ ] Godot 4.3 is running.
- [ ] Aseprite Wizard is active.
- [ ] GodotSteam is active.
- [ ] You see an empty 3D or 2D scene.

**Next Step:** We will organize our project folders to avoid "Spaghetti Files".
