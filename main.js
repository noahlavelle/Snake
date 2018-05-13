const { app, BrowserWindow } = require('electron');
const path = require('path')
const url = require('url')

function createWindow () {
// Create the browser window.
win = new BrowserWindow({width: 750, height: 768, frame: false, useContentSize: true, resizable: false})

// and load the index.html of the app.
win.loadURL(url.format({
    pathname: path.join(__dirname, './app/index.html'),
    protocol: 'file:',
    slashes: true
}))
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('ready', createWindow)