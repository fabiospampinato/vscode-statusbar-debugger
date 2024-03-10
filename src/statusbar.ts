
/* IMPORT */

import vscode from 'vscode';
import {getOptions, once} from './utils';
import type {StatusbarItems} from './types';

/* MAIN */

const Statusbar = {

  /* API */

  create: once ((): StatusbarItems => {

    const bug = Statusbar.createAction ( 'bug' );
    const pause = Statusbar.createAction ( 'pause' );
    const resume = Statusbar.createAction ( 'continue' );
    const stepOver = Statusbar.createAction ( 'step_over' );
    const stepInto = Statusbar.createAction ( 'step_into' );
    const stepOut = Statusbar.createAction ( 'step_out' );
    const restart = Statusbar.createAction ( 'restart' );
    const stop = Statusbar.createAction ( 'stop' );

    return {bug, pause, resume, stepOver, stepInto, stepOut, restart, stop};

  }),

  createAction: ( name: string ): vscode.StatusBarItem | undefined => {

    const options = getOptions ();
    const actionIndex = options.actions.indexOf ( name );
    const visible = ( actionIndex >= 0 );

    if ( !visible ) return;

    const alignment = ( options.alignment === 'left' ) ? vscode.StatusBarAlignment.Left : vscode.StatusBarAlignment.Right;
    const priority = options.priority - actionIndex - 1;
    const command = options.actionsCommands[actionIndex];
    const icon = options.actionsIcons[actionIndex];
    const tooltip = options.actionsTooltips[actionIndex];
    const item = vscode.window.createStatusBarItem ( alignment, priority );

    item.command = command;
    item.text = icon;
    item.tooltip = tooltip;

    return item;

  },

  refresh: (): void => {

    const actions = Statusbar.create ();
    const active = !!vscode.debug.activeDebugSession;
    const fn = active ? 'show' : 'hide';

    if ( actions.bug ) {
      actions.bug.tooltip = active ? 'Stop Debugging' : 'Start Debugging';
      actions.bug.show ();
    }

    actions.pause?.[fn]();
    actions.resume?.[fn]();
    actions.stepOver?.[fn]();
    actions.stepInto?.[fn]();
    actions.stepOut?.[fn]();
    actions.restart?.[fn]();
    actions.stop?.[fn]();

  }

};

/* EXPORT */

export default Statusbar;
