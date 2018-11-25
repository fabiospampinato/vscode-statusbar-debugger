
/* IMPORT */

import * as _ from 'lodash';
import * as chokidar from 'chokidar';
import * as path from 'path';
import * as vscode from 'vscode';
import Config from './config';
import Utils from './utils';

/* STATUSBAR */

class Statusbar {

  config; bug; actions; _isActive; _watcher;

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

    this.updateConfig ();

  }

  async initBug () {

    this.bug = this.makeItem ( {}, this.config.alignment, this.config.priority );
    await this.updateBug ();
    this.bug.show ();

  }

  initActions () {

    const actionsOptions = [
      { name: 'pause',     text: '', tooltip: 'Pause',     command: 'workbench.action.debug.pause' },
      { name: 'continue',  text: '', tooltip: 'Continue',  command: 'workbench.action.debug.continue' },
      { name: 'step_over', text: '', tooltip: 'Step over', command: 'workbench.action.debug.stepOver' },
      { name: 'step_into', text: '', tooltip: 'Step into', command: 'workbench.action.debug.stepInto' },
      { name: 'step_out',  text: '', tooltip: 'Step out',  command: 'workbench.action.debug.stepOut' },
      { name: 'restart',   text: '', tooltip: 'Restart',   command: 'statusbarDebugger.restart' },
      { name: 'stop',      text: '', tooltip: 'Stop',      command: 'workbench.action.debug.stop' }
    ];

    actionsOptions.forEach ( ( actionOption, i ) => actionOption.text = this.config.actionsIcons[i] )

    const enabledActionsOptions = actionsOptions.filter ( actionOption => _.includes ( this.config.actions, actionOption.name ) );

    this.actions = enabledActionsOptions.map ( ( options, index ) => this.makeItem ( options, this.config.alignment, this.config.priority - index - 1 ) );

  }

  events () {

    vscode.debug.onDidStartDebugSession ( () => this.update () );
    vscode.debug.onDidTerminateDebugSession ( () => this.update () );
    vscode.debug.onDidChangeActiveDebugSession ( () => this.update () );

  }

  makeItem ( options, alignment, priority ) {

    const item = vscode.window.createStatusBarItem ( alignment, priority );

    _.extend ( item, options );

    return item;

  }

  renderTemplate ( template ) {

    const tokens = {
      name: _.get ( vscode.debug.activeDebugSession, 'name' ) || '' // Better to show nothing than a useless `No Configurations`
    };

    _.forOwn ( tokens, ( value, key ) => {

      const re = new RegExp ( `\\[${_.escapeRegExp ( key )}\\]`, 'g' );

      template = template.replace ( re, value );

    });

    template = _.trim ( template );

    return template;

  }

  update ( active = !!vscode.debug.activeDebugSession ) {

    this._isActive = active;

    this.updateConfig ();
    this.updateBug ();
    this.updateActions ();

  }

  updateConfig () {

    this.config = Config.get ();
    this.config.alignment = ( this.config.alignment === 'right' ) ? vscode.StatusBarAlignment.Right : vscode.StatusBarAlignment.Left;

  }

  async updateBug () {

    this.bug.text = this.renderTemplate ( this.config.template );
    this.bug.color = this._isActive ? this.config.activeColor : undefined;

    let tooltip, command;

    if ( this._isActive ) {

      tooltip = 'Stop Debugging';
      command = 'statusbarDebugger.stop';

    } else {

      tooltip = 'Start Debugging';
      command = 'statusbarDebugger.start';

    }

    this.bug.tooltip = tooltip;
    this.bug.command = command;

  }

  updateActions () {

    const method = this._isActive ? 'show' : 'hide';

    this.actions.forEach ( ( action, i ) => action.text = this.config.actionsIcons[i] );
    this.actions.forEach ( action => action[method]() );

  }

}

/* EXPORT */

const statusbar = new Statusbar ();

export default statusbar;
