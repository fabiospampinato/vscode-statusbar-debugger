### Version 3.0.2
- Delaying activation until the editor has started up, for slightly faster startup

### Version 3.0.1
- Minor internal improvements

### Version 3.0.0
- Rewritten: more modern code, much simpler implementation, no third-party dependencies, 99% smaller bundle
- Removed special support for the [Debug Launcher](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-debug-launcher) extension
- Removed setting: "statusbarDebugger.activeColor", for simplicity
- Removed setting: "statusbarDebugger.command", for simplicity
- Removed setting: "statusbarDebugger.template", for simplicity
- New command: "statusbarDebugger.toggle", to start/stop debugging
- New setting: "statusbarDebugger.actionsCommands", to customize which commands are executed for each action button
- New setting: "statusbarDebugger.actionsTooltips", to customize the tooltips for each action button
- New action: "bug", now the "bug" icon is customizable exactly like any other action button

### Version 2.1.0
- Added support for disabling prompts by setting "donations.disablePrompt" to "true"
- Updated some dependencies
- Using the new debug icons that vscode itself uses

### Version 2.0.8
- Added a dialog announcing the fundraising

### Version 2.0.7
- Update .github/FUNDING.yml
- Deleted repo-level github funding.yml
- Minor improvements to the used icons

### Version 2.0.6
- Improved description of the “statusbarDebugger.command” setting

### Version 2.0.5
- Fixed a regression regarding detecting existing launch configurations

### Version 2.0.4
- Properly restarting debuggers launched via Debug Launcher

### Version 2.0.3
- Readme: using hi-res logo

### Version 2.0.2
- Outputting modern code (es2017, faster)
- Using "Debug Launcher" for debugging

### Version 2.0.1
- Properly detecting if “Debug Launcher” is installed

### Version 2.0.0
- Added support for “Debug Launcher”

### Version 1.4.5
- Fixed a regression

### Version 1.4.4
- Bundling with webpack

### Version 1.4.3
- Readme: updated hint for disabling the floating debugger

### Version 1.4.2
- Ensuring all instances of each token get replaced

### Version 1.4.1
- Improved active session detection

### Version 1.4.0
- Support for changing the icon of each action

### Version 1.3.3
- Updated readme

### Version 1.3.2
- Readme: added an hint about the debug launcher

### Version 1.3.1
- Fixed a typo

### Version 1.3.0
- Added support for disabling some or all actions
- Added a `template` setting
- Added support for displaying the name of the current debugging session
- Added a `command `option
- Added support for a smart `auto` command
- Watching `launch.json` for changes

### Version 1.2.0
- Added options for customizing alignment and priority

### Version 1.1.2
- Improved support for `Start Without Debugging`

### Version 1.1.1
- Updated readme

### Version 1.1.0
- Auto-detection of start/stop events

### Version 1.0.2
- Added a `pause` action button

### Version 1.0.2
- Added a setting for changed the bug's color when active

### Version 1.0.1
- Changed bug's color when active

### Version 1.0.0
- Initial release
