
/* IMPORT */

import * as _ from 'lodash';
import * as vscode from 'vscode';
import Config from './config';

/* STATUSBAR */

class Statusbar {

  bug; actions;

  constructor () {

    const priority = Number.MIN_SAFE_INTEGER + 1000;

    /* BUG */

    const bugOptions = { text: '$(bug)', tooltip: 'Start debugging', command: 'workbench.action.debug.start' };

    this.bug = this.makeItem ( bugOptions, priority );
    this.bug.show ();

    /* ACTIONS */

    const actionsOptions = [
      { text: '❙\u2009❙', tooltip: 'Pause', command: 'workbench.action.debug.pause' },
      { text: '\u2006$(triangle-right)\u2006', tooltip: 'Continue', command: 'workbench.action.debug.continue' },
      { text: '$(arrow-right)',tooltip: 'Step over', command: 'workbench.action.debug.stepOver' },
      { text: '$(arrow-down)', tooltip: 'Step into', command: 'workbench.action.debug.stepInto' },
      { text: '$(arrow-up)', tooltip: 'Step out', command: 'workbench.action.debug.stepOut' },
      { text: '$(mail-reply)', tooltip: 'Restart', command: 'workbench.action.debug.restart' },
      { text: '$(primitive-square)', tooltip: 'Stop', command: 'workbench.action.debug.stop' }
    ];

    this.actions = actionsOptions.map ( ( options, index ) => this.makeItem ( options, priority - index - 1 ) );

    /* EVENTS */

    this.events ();

  }

  events () {

    vscode['debug'].onDidChangeActiveDebugSession(() => this.update());

  }

  makeItem ( options, priority ) {

    const item = vscode.window.createStatusBarItem ( vscode.StatusBarAlignment.Left, priority );

    _.extend ( item, options );

    return item;

  }

  update ( active = !!vscode['debug'].activeDebugSession ) {

    const config = Config.get ();

    /* BUG */

    this.bug.color = active ? config.activeColor : undefined;
    this.bug.tooltip = active ? 'Stop debugging' : 'Start debugging';
    this.bug.command = active ? 'workbench.action.debug.stop' : 'workbench.action.debug.start';

    /* ACTIONS */

    this.actions.forEach ( action => action[active ? 'show' : 'hide']() );

  }

}

/* EXPORT */

const statusbar = new Statusbar ();

export default statusbar;
