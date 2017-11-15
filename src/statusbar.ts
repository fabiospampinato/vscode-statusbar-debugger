
/* IMPORT */

import * as _ from 'lodash';
import * as vscode from 'vscode';
import Config from './config';

/* STATUSBAR */

class Statusbar {

  config; bug; actions; _isActive;

  constructor () {

    this.init ();
    this.events ();

  }

  init () {

    this.initConfig ();
    this.initBug ();
    this.initActions ();

  }

  initConfig () {

    this.config = Config.get ();
    this.config.alignment = ( this.config.alignment === 'right' ) ? vscode.StatusBarAlignment.Right : vscode.StatusBarAlignment.Left;

  }

  initBug () {

    const bugOptions = {
      text: this.config.template,
      tooltip: 'Start debugging',
      command: 'workbench.action.debug.start'
    };

    this.bug = this.makeItem ( bugOptions, this.config.alignment, this.config.priority );
    this.bug.show ();

  }

  initActions () {

    const actionsOptions = [
      { name: 'pause',     text: '❙\u2009❙',                      tooltip: 'Pause',     command: 'workbench.action.debug.pause' },
      { name: 'continue',  text: '\u2006$(triangle-right)\u2006', tooltip: 'Continue',  command: 'workbench.action.debug.continue' },
      { name: 'step_over', text: '$(arrow-right)',                tooltip: 'Step over', command: 'workbench.action.debug.stepOver' },
      { name: 'step_into', text: '$(arrow-down)',                 tooltip: 'Step into', command: 'workbench.action.debug.stepInto' },
      { name: 'step_out',  text: '$(arrow-up)',                   tooltip: 'Step out',  command: 'workbench.action.debug.stepOut' },
      { name: 'restart',   text: '$(mail-reply)',                 tooltip: 'Restart',   command: 'workbench.action.debug.restart' },
      { name: 'stop',      text: '$(primitive-square)',           tooltip: 'Stop',      command: 'workbench.action.debug.stop' }
    ];

    const enabledActionsOptions = actionsOptions.filter ( actionOption => _.includes ( this.config.actions, actionOption.name ) );

    this.actions = enabledActionsOptions.map ( ( options, index ) => this.makeItem ( options, this.config.alignment, this.config.priority - index - 1 ) );

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

    this._isActive = active;

    this.updateBug ();
    this.updateActions ();

  }

  updateBug () {

    this.bug.color = this._isActive ? this.config.activeColor : undefined;
    this.bug.tooltip = this._isActive ? 'Stop debugging' : 'Start debugging';
    this.bug.command = this._isActive ? 'workbench.action.debug.stop' : 'workbench.action.debug.start';

  }

  updateActions () {

    const method = this._isActive ? 'show' : 'hide';

    this.actions.forEach ( action => action[method]() );

  }

}

/* EXPORT */

const statusbar = new Statusbar ();

export default statusbar;
