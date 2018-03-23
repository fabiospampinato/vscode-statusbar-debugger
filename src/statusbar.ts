
/* IMPORT */

import * as _ from 'lodash';
import * as chokidar from 'chokidar';
import * as JSON5 from 'json5';
import * as path from 'path';
import * as vscode from 'vscode';
import Config from './config';
import Utils from './utils';

/* STATUSBAR */

class Statusbar {

  config; bug; actions; _isActive; _launchPath; _watcher;

  constructor () {

    this.init ();
    this.events ();

  }

  init () {

    this.initConfig ();
    this.initLaunchPath ();
    this.initBug ();
    this.initActions ();

  }

  initConfig () {

    this.updateConfig ();

  }

  initLaunchPath () {

    this._launchPath = this.getLaunchPath ();

  }

  async initBug () {

    this.bug = this.makeItem ( {}, this.config.alignment, this.config.priority );
    await this.updateBug ();
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

    actionsOptions.map ( (actionOption, i ) => actionOption.text = this.config.actionsIcons[i] )

    const enabledActionsOptions = actionsOptions.filter ( actionOption => _.includes ( this.config.actions, actionOption.name ) );

    this.actions = enabledActionsOptions.map ( ( options, index ) => this.makeItem ( options, this.config.alignment, this.config.priority - index - 1 ) );

  }

  events () {

    const debouncedOnDidChangeActiveTextEditor = _.debounce ( this.onDidChangeActiveTextEditor.bind ( this ), 100 );

    vscode.debug.onDidStartDebugSession ( () => this.update ( true ) );
    vscode.debug.onDidTerminateDebugSession ( () => this.update ( false ) );
    vscode.debug.onDidChangeActiveDebugSession ( () => this.update () );
    vscode.window.onDidChangeActiveTextEditor ( debouncedOnDidChangeActiveTextEditor );
    this.eventWatchLauch ();

  }

  eventWatchLauch () {

    if ( this._watcher ) this._watcher.close ();

    try {

      this._watcher = chokidar.watch ( this._launchPath );

      this._watcher.on ( 'change', () => this.updateBug () );

    } catch ( e ) {}

  }

  onDidChangeActiveTextEditor () {

    const newLaunchPath = this.getLaunchPath ();

    if ( newLaunchPath === this._launchPath ) return;

    this._launchPath = newLaunchPath;

    this.updateBug ();
    this.eventWatchLauch ();

  }

  getLaunchPath () {

    const rootPath = Utils.folder.getActiveRootPath ();

    if ( !rootPath ) return;

    return path.join ( rootPath, '.vscode', 'launch.json' );

  }

  async getConfigurationsNr () {

    const launchPath = this._launchPath;

    if ( !launchPath ) return 0;

    const content = await Utils.file.read ( launchPath );

    if ( !content ) return 0;

    const contentj = _.attempt ( JSON5.parse, content ) as any; //TSC

    if ( _.isError ( contentj ) ) return 0;

    const {configurations} = contentj;

    if ( !_.isArray ( configurations ) ) return 0;

    return configurations.length;

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
      template = template.replace ( `[${key}]`, value );
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
      command = 'workbench.action.debug.stop';

    } else {

      const configurationsNr = await this.getConfigurationsNr ();

      if ( !configurationsNr ) {

        tooltip = 'Add Configuration';
        command = 'debug.addConfiguration';

      } else if ( this.config.command === 'start' || ( this.config.command === 'auto' && configurationsNr === 1 ) ) {

        tooltip = 'Start Debugging';
        command = 'workbench.action.debug.start';

      } else if ( this.config.command === 'select' || ( this.config.command === 'auto' && configurationsNr > 1 ) ) {

        tooltip = 'Select and Start Debugging';
        command = 'workbench.action.debug.selectandstart';

      }

    }

    this.bug.tooltip = tooltip;
    this.bug.command = command;

  }

  updateActions () {

    const method = this._isActive ? 'show' : 'hide';

    this.actions.forEach ( action => action[method]() );

  }

}

/* EXPORT */

const statusbar = new Statusbar ();

export default statusbar;
