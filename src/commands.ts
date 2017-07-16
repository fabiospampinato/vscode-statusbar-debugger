
/* IMPORT */

import * as _ from 'lodash';
import * as vscode from 'vscode';
import statusbar from './statusbar';

/* COMMANDS */

function toggle ( force?: boolean ) {

  const start = _.isBoolean ( force ) ? force : !statusbar.isActive (),
        command = start ? 'workbench.action.debug.start' : 'workbench.action.debug.stop';

  vscode.commands.executeCommand ( command );

  statusbar.toggle ( force );

}

function start () {

  toggle ( true );

}

function stop () {

  toggle ( false );

}

/* EXPORT */

export {toggle, start, stop};
