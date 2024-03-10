
/* IMPORT */

import vscode from 'vscode';
import {command, getLaunchConfigsNr} from './utils';

/* MAIN */

const start = async (): Promise<void> => {

  const launchNr = getLaunchConfigsNr ();

  if ( launchNr <= 0 ) {

    await command ( 'debug.addConfiguration' );

  } else if ( launchNr === 1 ) {

    await command ( 'workbench.action.debug.start' );

  } else if ( launchNr > 1 ) {

    await command ( 'workbench.action.debug.selectandstart' );

  }

};

const stop = async (): Promise<void> => {

  await command ( 'workbench.action.debug.stop' );

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

  await command ( 'workbench.action.debug.restart' );

};

/* EXPORT */

export {start, stop, toggle, restart};
