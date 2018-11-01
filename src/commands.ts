
/* IMPORT */

import * as vscode from 'vscode';
import Config from './config';
import Utils from './utils';

/* COMMANDS */

async function start () {

  const config = Config.get (),
        nr = await Utils.getLaunchConfigurationsNr ();

  if ( config.command === 'start' ) {

    vscode.commands.executeCommand ( 'workbench.action.debug.start' );

  } else if ( config.command === 'select' ) {

    vscode.commands.executeCommand ( 'workbench.action.debug.selectandstart' );

  } else if ( config.command === 'auto' ) {

    try {

      await vscode.commands.executeCommand ( 'debugLauncher.auto' );

    } catch ( e ) {

      if ( !nr ) {

        vscode.commands.executeCommand ( 'debug.addConfiguration' );

      } else if ( nr === 1 ){

        vscode.commands.executeCommand ( 'workbench.action.debug.start' );

      } else if ( nr > 1 ) {

        vscode.commands.executeCommand ( 'workbench.action.debug.selectandstart' );

      }

    }

  }

}

async function stop () {

  vscode.commands.executeCommand ( 'workbench.action.debug.stop' );

}

/* EXPORT */

export {start, stop};
