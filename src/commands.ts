
/* IMPORT */

import vscode from 'vscode';
import {getLaunchConfigsNr} from './utils';

/* MAIN */

const start = async (): Promise<void> => {

  const launchNr = getLaunchConfigsNr ();

  if ( launchNr <= 0 ) {

    await vscode.commands.executeCommand ( 'debug.addConfiguration' );

  } else if ( launchNr === 1 ) {

    await vscode.commands.executeCommand ( 'workbench.action.debug.start' );

  } else if ( launchNr > 1 ) {

    await vscode.commands.executeCommand ( 'workbench.action.debug.selectandstart' );

  }

};

const stop = async (): Promise<void> => {

  await vscode.commands.executeCommand ( 'workbench.action.debug.stop' );

};

const toggle = async ( force?: boolean ): Promise<void> => {

  force ??= !vscode.debug.activeDebugSession;

  if ( force ) {

    await start ();

  } else {

    await stop ();

  }

};

const restart = async (): Promise<void> => {

  await vscode.commands.executeCommand ( 'workbench.action.debug.restart' );

};

/* EXPORT */

export {start, stop, toggle, restart};
