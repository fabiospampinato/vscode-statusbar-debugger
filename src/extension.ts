
/* IMPORT */

import './statusbar';
import * as vscode from 'vscode';
import beggar from 'vscode-beggar';
import Utils from './utils';

/* ACTIVATE */

function activate ( ctx: vscode.ExtensionContext ) {

  beggar ({
    id: 'vscode-statusbar-debugger',
    title: '𝗦𝘁𝗮𝘁𝘂𝘀𝗯𝗮𝗿 𝗗𝗲𝗯𝘂𝗴𝗴𝗲𝗿 - 𝗙𝘂𝗻𝗱𝗿𝗮𝗶𝘀𝗶𝗻𝗴 𝗔𝗻𝗻𝗼𝘂𝗻𝗰𝗲𝗺𝗲𝗻𝘁: We are collecting some money to allow for further development, if you find this extension useful please please please consider donating to it and be part of something amazing!',
    url: 'https://buy.stripe.com/4gw5m763T4Td18s6oS',
    actions: {
      yes: {
        webhook: `https://telemetry.notable.app/track?events=%5B%7B%22event%22%3A%22vscode-beggar%22%2C%22extension%22%3A%22vscode-statusbar-debugger%22%2C%22result%22%3A1%2C%22timestamp%22%3A${Date.now ()}%7D%5D`
      },
      no: {
        webhook: `https://telemetry.notable.app/track?events=%5B%7B%22event%22%3A%22vscode-beggar%22%2C%22extension%22%3A%22vscode-statusbar-debugger%22%2C%22result%22%3A0%2C%22timestamp%22%3A${Date.now ()}%7D%5D`
      },
      cancel: {
        webhook: `https://telemetry.notable.app/track?events=%5B%7B%22event%22%3A%22vscode-beggar%22%2C%22extension%22%3A%22vscode-statusbar-debugger%22%2C%22result%22%3A2%2C%22timestamp%22%3A${Date.now ()}%7D%5D`
      }
    }
  });

  return Utils.initCommands ( ctx );

}

/* EXPORT */

export {activate};
