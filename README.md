# VSC StatusBar Debugger

<p align="center">
  <img src="https://raw.githubusercontent.com/fabiospampinato/vscode-statusbar-debugger/master/resources/logo-128x128.png" alt="Logo">
</p>

Adds a debugger to the statusbar, less intrusive than the default floating one.

## Install

Run the following in the command palette:

```shell
ext install vscode-statusbar-debugger
```

## Usage

Just start/stop a debugging session and it will detect it.

It adds a bug-like icon to the statusbar, you can use it to toggle debugging. Once a debugging session has started the usual actions will appear next to it.

## Settings

You should reload the window in order for this changes to take effect.

```js
{
  "statusbarDebugger.actions": ["pause", "continue", "step_over", "step_into", "step_out", "restart", "stop"], // List of enabled actions' buttons
  "statusbarDebugger.activeColor": "#FFCC00" // The color of the bug icon when active
  "statusbarDebugger.alignment": "left", // Should the item be placed to the left or right?
  "statusbarDebugger.priority": -10 // The priority of this item. Higher value means the item should be shown more to the left
}
```

## Demo

![Demo](resources/demo.gif)

## Hits:

- **Disable the default debugger**: set `"debug.hideActionBar": true` in your settings to disable the default, intrusive, debugger.

## License

MIT © Fabio Spampinato
