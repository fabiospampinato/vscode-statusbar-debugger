
/* IMPORT */

import * as _ from 'lodash';
import * as vscode from 'vscode';

/* STATUSBAR */

class Statusbar {

  _isActive; bug; actions;

  constructor () {

    /* BUG */

    const bugOptions = { text: '$(bug)', tooltip: 'Start debugging', command: 'statusbarDebugger.toggle' };

    this.bug = this.makeItem ( bugOptions );
    this.bug.show ();

    /* ACTIONS */

    const actionsOptions = [
      // { text: '$(quote)', tooltip: 'Pause', command: 'workbench.action.debug.pause' },
      { text: '$(triangle-right)', tooltip: 'Continue', command: 'workbench.action.debug.continue' },
      { text: '$(arrow-right)',tooltip: 'Step over', command: 'workbench.action.debug.stepOver' },
      { text: '$(arrow-down)', tooltip: 'Step into', command: 'workbench.action.debug.stepInto' },
      { text: '$(arrow-up)', tooltip: 'Step out', command: 'workbench.action.debug.stepOut' },
      { text: '$(mail-reply)', tooltip: 'Restart', command: 'workbench.action.debug.restart' },
      { text: '$(primitive-square)', tooltip: 'Stop', command: 'statusbarDebugger.stop' }
    ];

    this.actions = actionsOptions.map ( this.makeItem );

  }

  makeItem ( options ) {

    const item = vscode.window.createStatusBarItem ( vscode.StatusBarAlignment.Left, -Infinity );

    _.extend ( item, options );

    return item;

  }

  isActive () {

    return !!this._isActive;

  }

  toggle ( force?: boolean ) {

    const active = _.isBoolean ( force ) ? force : !this._isActive;

    /* BUG */

    this.bug.color = active ? '#FFCC00' : undefined;
    this.bug.tooltip = active ? 'Stop debugging' : 'Start debugging';

    /* ACTIONS */

    this.actions.forEach ( action => action[active ? 'show' : 'hide']() );

  }

}

/* EXPORT */

const statusbar = new Statusbar ();

export default statusbar;
