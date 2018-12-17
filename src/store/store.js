import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://todo-laravel/api'

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    filter: 'all',
    todos: []
  },
  getters: {
    remaining(state) {
      return state.todos.filter(todo => !todo.completed).length
    },
    anyRemaining(state, getters) {
      return getters.remaining !== 0
    },
    todosFiltered(state) {
      if (state.filter === 'all') {
        return state.todos
      } else if (state.filter === 'active') {
        return state.todos.filter(todo => !todo.completed)
      } else if (state.filter === 'completed') {
        return state.todos.filter(todo => todo.completed)
      }
      return state.todos
    },
    showClearCompletedButton(state) {
      return state.todos.filter(todo => todo.completed).length > 0
    }
  },
  mutations: {
    retrieveToken(state, token){
      state.token = token
    },

    retrieveTodos(state, todos) {
      state.todos = todos
    },

    addTodo(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: false,
        editing: false,
      })
    },
    updateTodo(state, todo) {
      const index = state.todos.findIndex(item => item.id === todo.id)
      state.todos.splice(index, 1, {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        editing: todo.editing
      })
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex(item => item.id === id)
      state.todos.splice(index, 1)
    },
    checkAll(state, checked) {
      state.todos.forEach(todo => (todo.completed = checked))
    },
    updateFilter(state, filter) {
      state.filter = filter
    },
    clearCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.completed)
    }
  },

  actions: {
    // Dispatch to actions (instead of commit to mutations) whenever the action is
    // likely to be async or take a long time.
    // The setTimeouts below are to simulate async actions.
    retrieveToken(context, credentials) {
      return new Promise((resolve, reject) => {
        axios
        .post('/login', {
          username: credentials.username,
          password: credentials.password
        })
        .then(response => {
          const token = response.data.access_token

          localStorage.setItem('access_token', token)
          context.commit('retrieveToken', token)
          resolve(response)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
      })
    },

    retrieveTodos(context) {
      axios
        .get('/todos')
        .then(response => {
          context.commit('retrieveTodos', response.data)
        })
        .catch(err => {
          console.log(err)
        });
    },

    addTodo(context, todo) {
      axios
        .post('/todos', {
          title: todo.title,
          completed: false
        })
        .then(response => {
          context.commit('addTodo', response.data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    updateTodo(context, todo) {
      axios
        .put('/todos/' + todo.id, {
          title: todo.title,
          completed: todo.completed
        })
        .then(response => {
          context.commit('updateTodo', response.data)
        })
        .catch(err => {
          console.log(err)
        });
    },

    deleteTodo(context, id) {
      axios
        .delete('/todos/' + id)
        .then(() => {
          context.commit('deleteTodo', id)
        })
        .catch(err => {
          console.log(err)
        })
    },

    checkAll(context, checked) {
      axios
        .put('/todos/checkAll', {
          completed: checked
        })
        .then(() => {
          context.commit('checkAll', checked)
        })
        .catch(err => {
          console.log(err)
        });
    },

    updateFilter(context, filter) {
      context.commit('updateFilter', filter)
    },

    clearCompleted(context) {
      const completed = context.state.todos
        .filter(todo => todo.completed) // Only completed todos
        .map(todo => todo.id) // Get their IDs

      axios
        .delete('/todos/deleteCompleted', {
          data: {
            todos: completed
          }
        })
        .then(() => {
          context.commit('clearCompleted')
        })
        .catch(err => {
          console.log(err)
        });
    }
  }
})
