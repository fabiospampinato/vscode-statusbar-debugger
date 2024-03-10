# Statusbar Debugger

<p align="center">
  <img src="https://raw.githubusercontent.com/fabiospampinato/vscode-statusbar-debugger/master/resources/logo.png" width="128" alt="Logo">
</p>

Adds a debugger to the statusbar, less intrusive than the default floating one.

## Install

Follow the instructions in the [Marketplace](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-statusbar-debugger), or run the following in the command palette:

```shell
ext install fabiospampinato.vscode-statusbar-debugger
```

## Usage

Just start/stop a debugging session and it will detect it.

It adds a "bug" icon to the statusbar, you can use it to toggle debugging. Once a debugging session has started the usual actions will appear next to it.

Which exacts actions are available, what they look like, and what commands they execute, is customizable via the settings.

## Settings

Most of these settings require a window reload in order for them to take effect.

```js
{
  "statusbarDebugger.alignment": "left", // Should the item be placed to the left or right?
  "statusbarDebugger.priority": -10, // The priority of this item. Higher value means the item should be shown more to the left
  "statusbarDebugger.actions": ["bug", "pause", "continue", "step_over", "step_into", "step_out", "restart", "stop"], // List of enabled actions' buttons
  "statusbarDebugger.actionsCommands": ["statusbarDebugger.toggle", "workbench.action.debug.pause", "workbench.action.debug.continue", "workbench.action.debug.stepOver", "workbench.action.debug.stepInto", "workbench.action.debug.stepOut", "statusbarDebugger.restart", "workbench.action.debug.stop"], // Commands for the actions' buttons
  "statusbarDebugger.actionsIcons": ["$(bug)", "$(debug-pause)", "$(debug-continue)", "$(debug-step-over)", "$(debug-step-into)", "$(debug-step-out)", "$(debug-step-back)", "$(debug-stop)"], // Icons for the actions' buttons
  "statusbarDebugger.actionsTooltips": ["Toggle Debugging", "Pause", "Continue", "Step Over", "Step Into", "Step Out", "Restart", "Stop"] // Tooltips for the actions' buttons
}
```

## Hints

- **Disable the default floating debugger**: set `"debug.toolBarLocation": "hidden"` in your settings to disable the default, intrusive, debugger.
- **Disable the default debug launcher**: set `"debug.showInStatusBar": "never"` in yout settings to disable the default debug launcher present in the statusbar.
- **Icon**: [here](https://code.visualstudio.com/api/references/icons-in-labels#icon-listing) you can browse a list of supported icons.

## License

MIT © Fabio Spampinato
