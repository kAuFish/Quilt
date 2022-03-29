// main.js
'use strict' // don't worry ab this
// Modules to control application life
const { app } = require('electron')

// forces app to require the window class to exist
const Window = require('./Window')

// main function. It literally just loads the window class from window.js 
// do not worry about filesystem naming. I can change it l8r.
function main () {
  const mainWindow = new Window({
    file: 'index.html'
  })
}

// This is called when electron initiliazes.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  main()

  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) main()
})

// Quit when all windows are closed, the darwin if statement does the usual bullshit where the app stays open lmfao
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
