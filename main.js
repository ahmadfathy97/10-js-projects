const { app, BrowserWindow, Menu } = require('electron')
let  mainMenu;
const menuBar = [];
function createWindow () {
  const win = new BrowserWindow({
    width: 350,
    height: 540,
    minWidth: 350,
    minHeight: 550,
    maxWidth: 450,
    maxHeight: 650,
    webPreferences: {
      nodeIntegration: true
    },
    icon: './assets/icon.png'
  })
  win.loadFile('index.html');
  win.setMaximizable(false)
  // win.setResizable(false)
  win.on('closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
}

app.whenReady().then(createWindow)

mainMenu = new Menu.buildFromTemplate(menuBar);
Menu.setApplicationMenu(mainMenu);

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
});
