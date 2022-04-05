// main.js
'use strict' // don't worry ab this

//set the path for local objs to be stored
const path = require('path')
// Modules to control application life
const { app, ipcMain } = require('electron')

// forces app to require the window class to exist
const Window = require('./Window')
const DataStore = require('./DataStore') // same as above but for the datastore object

//require('electron-reload')(__dirname) // don't worry ab this


// create a new todo store name "Todos Main"
const todosData = new DataStore({ name: 'Todos Main' })

// main function. It literally just loads the window class from window.js 
function main() {
    let mainWindow = new Window({
        //call window elements from the renderer index.html
        file: path.join('renderer','index.html')
    })

    let addTodoWin //call the todo window
    mainWindow.once('show', () => {
        // load the todo data
        // todo (lol) make this more readable and in a better location
        mainWindow.webContents.send('todos', todosData.todos)
    })

    ipcMain.on('add-todo-window', () => {
        //create addTodowin if it's not a real thing yet
        if(!addTodoWin) {
            addTodoWin = new Window({
                // point add entry window to add.html with a set size
                file: path.join('renderer', 'add.html'),
                width: 400,
                height: 400,
                // Tie cleanup with the main window
                parent: mainWindow
            })

            // cleanup
            addTodoWin.on('closed', () => {
                addTodoWin = null // don't worry ab this
            })
        }
    })

    ipcMain.on('add-todo', (event, todo) => {
        const updatedTodos = todosData.addTodo(todo).todos
        // calls mainwindow to pull up the addtodo window for an entry
        mainWindow.send('todos', updatedTodos)
    })

    ipcMain.on('delete-todo', (event, todo) => {
        //don't melt your brain on this next one
        const updatedTodos = todosData.deleteTodo(todo).todos

        mainWindow.send('todos', updatedTodos)
    })

}

// This is called when electron initiliazes.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  main()

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, the darwin if statement does the usual bullshit where the app stays open lmfao
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
