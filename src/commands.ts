
/* IMPORT */

import * as vscode from 'vscode';
import Config from './config';
import Utils from './utils';

/* COMMANDS */

async function start () {

  const config = Config.get ();

  if ( config.command === 'start' ) {

    vscode.commands.executeCommand ( 'workbench.action.debug.start' );

  } else if ( config.command === 'select' ) {

    vscode.commands.executeCommand ( 'workbench.action.debug.selectandstart' );

  } else if ( config.command === 'auto' ) {

    try {

      await vscode.commands.executeCommand ( 'debugLauncher.auto' );

    } catch ( e ) {

      const nr = await Utils.getLaunchConfigurationsNr ();

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

async function restart () {

  try {

    await vscode.commands.executeCommand ( 'debugLauncher.auto' );

  } catch ( e ) {

    vscode.commands.executeCommand ( 'workbench.action.debug.restart' );

  }

}

/* EXPORT */

export {start, stop, restart};
