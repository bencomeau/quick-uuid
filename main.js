try {
  // eslint-disable-next-line global-require
  require('electron-reloader')(module);
} catch (e) {
  console.error(e);
}

const { Menu, Tray, app } = require('electron');
const path = require('path');
const { menubar } = require('menubar');

const { writeData, readData, generateUUID } = require('./utils');

const iconPath = path.join(__dirname, 'assets', 'iconTemplate.png');

app.setName('Quick UUID');
app.on('ready', () => {
  const resetClipboardSecondsOptions = [5, 10, 15, 20];
  const resetClipboardSeconds = readData('resetClipboardSeconds');

  const tray = new Tray(iconPath);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Copy UUID',
      click: async () => {
        await generateUUID();
        tray.closeContextMenu();
      },
    },
    // {
    //   label: 'Copy as',
    //   submenu: [
    //     {
    //       label: 'Array', click: async () => {
    //         await generateUUID(); // Copy as ['uuid']
    //         tray.closeContextMenu();
    //       }
    //     },
    //     ...options for { id: 'uuid' }, single quoted (''), double-quoted (), etc. Not sure...
    //   ]
    // },
    { type: 'separator' },
    {
      // Would be fun to put this in an actual "preferences" window
      // with a few other options...like setting a default copy option...
      label: 'Reset clipboard after',
      type: 'submenu',
      click: () => {
        console.log('click!');
      },
      submenu: [
        ...resetClipboardSecondsOptions.map(seconds => ({
          label: `${seconds} seconds`,
          type: 'radio',
          click: () => writeData('resetClipboardSeconds', seconds),
          checked: seconds === resetClipboardSeconds,
        })),
        {
          label: 'Never',
          type: 'radio',
          click: () => writeData('resetClipboardSeconds', undefined),
          checked: resetClipboardSeconds === undefined,
        },
      ],
    },
    { type: 'separator' },
    { role: 'quit' },
  ]);

  tray.setContextMenu(contextMenu);

  const mb = menubar({
    tray,
  });

  mb.on('ready', () => {
    // Stop the propagation of events...for some reason
    // the context menu was opening along with the
    // HTML and this was a quick solution.
    // https://github.com/maxogden/menubar/issues/345
    tray.removeAllListeners();
  });

  // This avoids a flash when starting the application
  mb.app.commandLine.appendSwitch(
    'disable-backgrounding-occluded-windows',
    'true',
  );
});
