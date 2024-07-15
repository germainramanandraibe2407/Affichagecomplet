const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      enableRemoteModule: true
    }
  });

  const menuTemplate = [
   
  
    {
      label: 'Affichage',
      submenu:  [
        { label: 'Toggle Full Screen', role: 'togglefullscreen' },
        { type: 'separator' },
        {
          label: 'Réactualiser la page',
          accelerator: 'CmdOrCtrl+R', // Raccourci clavier pour recharger
          click: () => {
            mainWindow.reload();
          }
        },
        { type: 'separator' },
        {
          label: 'Zoom In',
          accelerator: 'CmdOrCtrl+Plus', // Raccourci clavier
          click: () => {
            mainWindow.webContents.zoomFactor += 0.1;
          }
        },
        {
          label: 'Zoom Out',
          accelerator: 'CmdOrCtrl+-', // Raccourci clavier
          click: () => {
            mainWindow.webContents.zoomFactor -= 0.1;
          }
        },
        {
          label: 'Reset Zoom',
          accelerator: 'CmdOrCtrl+0', // Raccourci clavier
          click: () => {
            mainWindow.webContents.zoomFactor = 1.0;
          }
        }
      ]
    }/*,{
      label: 'Zoom',
      submenu: [
        {
          label: 'Zoom In',
          accelerator: 'CmdOrCtrl+Plus', // Raccourci clavier
          click: () => {
            mainWindow.webContents.zoomFactor += 0.1;
          }
        },
        {
          label: 'Zoom Out',
          accelerator: 'CmdOrCtrl+-', // Raccourci clavier
          click: () => {
            mainWindow.webContents.zoomFactor -= 0.1;
          }
        },
        {
          label: 'Reset Zoom',
          accelerator: 'CmdOrCtrl+0', // Raccourci clavier
          click: () => {
            mainWindow.webContents.zoomFactor = 1.0;
          }
        }
      ]
    }*/
   
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  //const startUrl = `file://${path.join(__dirname, '../build/index.html')}`; http://192.168.88.95:3000
  //mainWindow.loadURL(startUrl);
  mainWindow.loadURL('http://192.168.88.95:3000/');
});
