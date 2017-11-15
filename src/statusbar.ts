
/* IMPORT */

import * as _ from 'lodash';
import * as vscode from 'vscode';
import Config from './config';

/* STATUSBAR */

class Statusbar {

  bug; actions;

  constructor () {

    /* CONFIG */

    const config = Config.get (),
          {actions, priority, template} = config,
          alignment = config.alignment === 'right' ? vscode.StatusBarAlignment.Right : vscode.StatusBarAlignment.Left;

    /* BUG */

    const bugOptions = { text: template, tooltip: 'Start debugging', command: 'workbench.action.debug.start' };

    this.bug = this.makeItem ( bugOptions, alignment, priority );
    this.bug.show ();

    /* ACTIONS */

    const actionsOptions = [
      { name: 'pause',     text: '❙\u2009❙',                      tooltip: 'Pause',     command: 'workbench.action.debug.pause' },
      { name: 'continue',  text: '\u2006$(triangle-right)\u2006', tooltip: 'Continue',  command: 'workbench.action.debug.continue' },
      { name: 'step_over', text: '$(arrow-right)',                tooltip: 'Step over', command: 'workbench.action.debug.stepOver' },
      { name: 'step_into', text: '$(arrow-down)',                 tooltip: 'Step into', command: 'workbench.action.debug.stepInto' },
      { name: 'step_out',  text: '$(arrow-up)',                   tooltip: 'Step out',  command: 'workbench.action.debug.stepOut' },
      { name: 'restart',   text: '$(mail-reply)',                 tooltip: 'Restart',   command: 'workbench.action.debug.restart' },
      { name: 'stop',      text: '$(primitive-square)',           tooltip: 'Stop',      command: 'workbench.action.debug.stop' }
    ];

    const enabledActionsOptions = actionsOptions.filter ( actionOption => _.includes ( actions, actionOption.name ) );

    this.actions = enabledActionsOptions.map ( ( options, index ) => this.makeItem ( options, alignment, priority - index - 1 ) );

    /* EVENTS */

    this.events ();

  }

  events () {

    vscode.debug.onDidStartDebugSession ( () => this.update ( true ) );
    vscode.debug.onDidTerminateDebugSession ( () => this.update ( false ) );
    vscode.debug.onDidChangeActiveDebugSession ( () => this.update () );

  }

  makeItem ( options, alignment, priority ) {

    const item = vscode.window.createStatusBarItem ( alignment, priority );

    _.extend ( item, options );

    return item;

  }

  update ( active = !!vscode.debug.activeDebugSession ) {

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
