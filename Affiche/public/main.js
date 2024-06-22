const { app, BrowserWindow, screen } = require('electron');
const { Menu } = require('electron');

let mainWindow, secondaryWindow;

app.on('ready', () => {
  const displays = screen.getAllDisplays();
  const primaryDisplay = displays[1];
  //const secondaryDisplay = displays[1];
console.log(displays)
  // Supprimer le menu de l'application
  Menu.setApplicationMenu(null);
 
  // Créer la fenêtre principale sur l'écran primaire
  mainWindow = new BrowserWindow({
    width: 800,
    height: 20,
    x: primaryDisplay.bounds.x,
    y: primaryDisplay.bounds.y,
    webPreferences: {
      enableRemoteModule: true
    }
  });
  mainWindow.loadURL('http://localhost:3000');
/*
  // Créer la deuxième fenêtre sur l'écran secondaire
  secondaryWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    x: secondaryDisplay.bounds.x,
    y: secondaryDisplay.bounds.y,
    webPreferences: {
      enableRemoteModule: true
    }
  });
  secondaryWindow.loadURL('http://localhost:3000/dashboard');
*/
  // Mettre les deux fenêtres en plein écran
  mainWindow.setFullScreen(true);
 // secondaryWindow.setFullScreen(true);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindows();
  }
});