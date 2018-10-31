
/* IMPORT */

import './statusbar';
import * as vscode from 'vscode';
import Utils from './utils';

/* ACTIVATE */

function activate ( ctx: vscode.ExtensionContext ) {

  return Utils.initCommands ( ctx );

}

/* EXPORT */

export {activate};
