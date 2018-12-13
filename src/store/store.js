import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://todo-laravel/api'

export const store = new Vuex.Store({
  state: {
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
        'id': todo.id,
        'title': todo.title,
        'completed': todo.completed,
        'editing': todo.editing,
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
    retrieveTodos(context) {
      axios.get('/todos')
      .then( response => {
        context.commit('retrieveTodos', response.data)
      })
      .catch( err => {
        console.log(err);
      })
    },

    addTodo(context, todo) {
      axios.post('/todos', {
        title: todo.title,
        completed: false,
      })
      .then( response => {
        context.commit('addTodo', response.data)
      })
      .catch( err => {
        console.log(err);
      })
    },

    updateTodo(context, todo) {
      setTimeout(() => {
        context.commit('updateTodo', todo)
      }, 100)
    },

    deleteTodo(context, id) {
      setTimeout(() => {
        context.commit('deleteTodo', id)
      }, 100)
    },

    checkAll(context, checked) {
      setTimeout(() => {
        context.commit('checkAll', checked)
      }, 100)
    },

    updateFilter(context, filter) {
      setTimeout(() => {
        context.commit('updateFilter', filter)
      }, 100)
    },

    clearCompleted(context) {
      setTimeout(() => {
        context.commit('clearCompleted')
      }, 100)
    }
  }
})
