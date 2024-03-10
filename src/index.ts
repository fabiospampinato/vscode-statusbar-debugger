
/* IMPORT */

import vscode from 'vscode';
import * as Commands from './commands';
import Statusbar from './statusbar';

/* MAIN */

const activate = (): void => {

  Statusbar.refresh ();

  vscode.commands.registerCommand ( 'statusbarDebugger.start', Commands.start );
  vscode.commands.registerCommand ( 'statusbarDebugger.stop', Commands.stop );
  vscode.commands.registerCommand ( 'statusbarDebugger.toggle', Commands.toggle );
  vscode.commands.registerCommand ( 'statusbarDebugger.restart', Commands.restart );

  vscode.debug.onDidStartDebugSession ( Statusbar.refresh );
  vscode.debug.onDidTerminateDebugSession ( Statusbar.refresh );
  vscode.debug.onDidChangeActiveDebugSession ( Statusbar.refresh );

};

/* EXPORT */

export {activate};
