'use strict'

const { ipcRenderer } = require('electron')

const deleteTodo = (e) => {
    ipcRenderer.send('delete-todo', e.target.textContent) // Use the text data of a todo to id it and remove it
}

document.getElementById('createTodoBtn').addEventListener('click', () => {
    // create a button to add a addtodo window
    ipcRenderer.send('add-todo-window')
})

ipcRenderer.on('todos', (event, todos) => {
    const todoList = document.getElementById('todoList') // fetch ui for todo list

    const todoItems = todos.reduce((html, todo) => {
        html += `<li class="todo-item">${todo}</li>` // grab html data

        return html
    }, '')

    todoList.innerHTML = todoItems

    // fucking event bs below
    todoList.querySelectorAll('.todo-item').forEach(item => {
        item.addEventListener('click', deleteTodo)
    })
})
