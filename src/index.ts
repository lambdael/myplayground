import { app, BrowserWindow, globalShortcut } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow | null = null;

const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) {
  enableLiveReload({ strategy: 'react-hmr' });
}

const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true,
    frame: false,
    backgroundColor: '#00000000',
    fullscreen: true,

    alwaysOnTop: true,
  });

  mainWindow.setIgnoreMouseEvents(true);
  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  if (isDevMode) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    // mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('ready', () => {
  if (mainWindow) {
    mainWindow.setOpacity(0.3);
  }
  globalShortcut.register('CommandOrControl+Alt+Shift+X', () => {
    console.log('CommandOrControl+Alt+Shift+X is pressed');
    if (mainWindow) {
      mainWindow.setIgnoreMouseEvents(true);
      mainWindow.setOpacity(0.3);
      // mainWindow
      // mainWindow.webContents.
    }
  });
  globalShortcut.register('CommandOrControl+Alt+X', () => {
    console.log('CommandOrControl+Alt+X is pressed');
    if (mainWindow) {
      mainWindow.setIgnoreMouseEvents(false);
      mainWindow.setOpacity(1.0);
      mainWindow.focus();
      // mainWindow.webContents.
      // globalShortcut.unregister('CommandOrControl+Alt+X');

    }
  });
  globalShortcut.register('CommandOrControl+F12', () => {
    console.log('CommandOrControl+F12 is pressed');
    if (mainWindow) {
      mainWindow.webContents.openDevTools();

    }
  });
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // Strip away preload scripts if unused or verify their location is legitimate
    delete webPreferences.preload;
    delete webPreferences.preloadURL;

    // Disable Node.js integration
    webPreferences.nodeIntegration = false;

    // Verify URL being loaded
    if (!params.src.startsWith('https://yourapp.com/')) {
      //  event.preventDefault();
    }
  });
});