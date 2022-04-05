//local storage
'use strict'
//grab the store class so we have something to work with
const Store = require('electron-store')

class DataStore extends Store {
    //setup constructor
    constructor(settings) {
        super(settings)

        //init with existing todos or an empty arr
        this.todos = this.get('todos') || []

    }

    getTodos () {
        // fetch all 'todos' items stored local and display in the window
        this.todos = this.get('todos') || []

        return this
    }

    addTodo (todo) {
        //merge new todo with existing todos
        this.todos = [...this.todos, todo]

        // always save the todos when you add one
        return this.saveTodos()
    }

    saveTodos () {
        //save todos to a file
        this.set('todos', this.todos)

        return this
    }

    deleteTodo(todo) {
        // filter out the target todo
        this.todos = this.todos.filter(t => t !== todo)

        return this.saveTodos()
    }
}

// export the data store used
module.exports = DataStore
