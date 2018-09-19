# StatusBar Debugger

<p align="center">
  <img src="https://raw.githubusercontent.com/fabiospampinato/vscode-statusbar-debugger/master/resources/logo-128x128.png" alt="Logo">
</p>

Adds a debugger to the statusbar, less intrusive than the default floating one.

## Install

Follow the instructions in the [Marketplace](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-statusbar-debugger), or run the following in the command palette:

```shell
ext install fabiospampinato.vscode-statusbar-debugger
```

## Usage

Just start/stop a debugging session and it will detect it.

It adds a "bug" icon and the name of the current debug session to the statusbar, you can use it to toggle debugging. This can be customized via the `statusbarDebugger.template` setting. Once a debugging session has started the usual actions will appear next to it.

## Settings

Most of these settings require a window reload in order for them to take effect.

```js
{
  "statusbarDebugger.template": "$(bug) [name]", // Template used for rendering the statusbar item, by default a "bug" icon and the name of the current debug session
  "statusbarDebugger.command": "auto", // Command to execute when clicking the "bug" icon. Possible values are: "start" always start the active configuration, "select" always ask to select the configuration, "auto" start debugging if it detects only one configuration and ask for a selection if there are more than one. If a debug session is active the command will always be to stop it
  "statusbarDebugger.actions": ["pause", "continue", "step_over", "step_into", "step_out", "restart", "stop"], // List of enabled actions' buttons
  "statusbarDebugger.actionsIcons": ["❙❙", "$(triangle-right)", "$(arrow-right)", "$(arrow-down)", "$(arrow-up)", "$(mail-reply)", "$(primitive-square)"], // Icons for the actions' buttons
  "statusbarDebugger.activeColor": "", // The color of the statusbar item when debugging
  "statusbarDebugger.alignment": "left", // Should the item be placed to the left or right?
  "statusbarDebugger.priority": -10 // The priority of this item. Higher value means the item should be shown more to the left
}
```

## Demo

![Demo](resources/demo.gif)

## Hints

- **Disable the default floating debugger**: set `"debug.toolBarLocation": "hidden"` in your settings to disable the default, intrusive, debugger.
- **Disable the default debug launcher**: set `"debug.showInStatusBar": "never"` in yout settings to disable the default debug launcher present in the statusbar.
- **Icons**: [here](https://octicons.github.com/) you can browse a list of supported icons. If for instance you click the first icon, you'll get a page with `.octicon-alert` written in it, to get the string to use simply remove the `.octicon-` part, so in this case the icon name would be `alert`.

## License

MIT © Fabio Spampinato
