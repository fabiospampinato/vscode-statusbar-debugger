
/* IMPORT */

import vscode from 'vscode';

/* MAIN */

type Options = {
  alignment: string,
  priority: number,
  actions: string[],
  actionsCommands: string[],
  actionsIcons: string[],
  actionsTooltips: string[]
};

type StatusbarItems = {
  bug?: vscode.StatusBarItem,
  pause?: vscode.StatusBarItem,
  resume?: vscode.StatusBarItem,
  stepOver?: vscode.StatusBarItem,
  stepInto?: vscode.StatusBarItem,
  stepOut?: vscode.StatusBarItem,
  restart?: vscode.StatusBarItem,
  stop?: vscode.StatusBarItem
};

/* EXPORT */

export type {Options, StatusbarItems};
