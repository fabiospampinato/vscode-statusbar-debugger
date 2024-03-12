
/* IMPORT */

import fs from 'node:fs';
import path from 'node:path';
import JSONC from 'tiny-jsonc';
import {getConfig, getProjectRootPath} from 'vscode-extras';
import type {Options} from './types';

/* MAIN */

const attempt = <T> ( fn: () => T ): T | undefined => {

  try {

    return fn ();

  } catch {

    return;

  }

};

const getLaunchConfigsNr = (): number => {

  const rootPath = getProjectRootPath ();

  if ( !rootPath ) return 0;

  const launchPath = path.join ( rootPath, '.vscode', 'launch.json' );
  const launchContent = attempt ( () => fs.readFileSync ( launchPath, 'utf8' ) );

  if ( !launchContent ) return 0;

  const launchJSON = attempt ( () => JSONC.parse ( launchContent ) );

  if ( !launchJSON ) return 0;
  if ( !( 'configurations' in launchJSON ) ) return 0;
  if ( !isArray ( launchJSON.configurations ) ) return 0;

  return launchJSON.configurations.length;

};

const getOptions = (): Options => {

  const config = getConfig ( 'statusbarDebugger' );
  const alignment = isString ( config?.alignment ) ? config.alignment : 'left';
  const priority = isNumber ( config?.priority ) ? config.priority : -10;
  const actions = isArray ( config?.actions ) && config.actions.every ( isString ) ? config.actions : [];
  const actionsCommands = isArray ( config?.actionsCommands ) && config.actionsCommands.every ( isString ) ? config.actionsCommands : [];
  const actionsIcons = isArray ( config?.actionsIcons ) && config.actionsIcons.every ( isString ) ? config.actionsIcons : [];
  const actionsTooltips = isArray ( config?.actionsTooltips ) && config.actionsTooltips.every ( isString ) ? config.actionsTooltips : [];

  return {alignment, priority, actions, actionsCommands, actionsIcons, actionsTooltips};

};

const isArray = ( value: unknown ): value is unknown[] => {

  return Array.isArray ( value );

};

const isNumber = ( value: unknown ): value is number => {

  return typeof value === 'number';

};

const isString = ( value: unknown ): value is string => {

  return typeof value === 'string';

};

const once = <T> ( fn: () => T ): (() => T) => {

  let inited = false;
  let result: T;

  return (): T => {

    result = ( inited ? result : fn () );
    inited = true;

    return result;

  };

};

/* EXPORT */

export {attempt, getLaunchConfigsNr, getOptions, isArray, isNumber, isString, once};
