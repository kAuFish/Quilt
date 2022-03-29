// ToDo list

const { BrowserWindow } = require('electron')

// default window settings
const defaultProps = {
  width: 500,
  height: 800,
  show: false
}

class Window extends BrowserWindow {
  constructor ({ file, ...windowSettings }) {
    // calls new BrowserWindow with these props
    super({ ...defaultProps, ...windowSettings })

    // load html and open tooling
    this.loadFile(file)
    this.webContents.openDevTools()

    // prevent fucking flickering
    this.once('ready-to-show', () => {
      this.show()
    })
  }
}

module.exports = Window
