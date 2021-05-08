<template>
  <section class="todoapp">
    <!-- header -->
    <header class="header">
      <input class="new-todo" autocomplete="off" placeholder="添加" @keyup.enter="addTodo">
    </header>
    <!-- main section -->
    <section v-show="todos.length" class="main">
      <input id="toggle-all" :checked="allChecked" class="toggle-all" type="checkbox" @change="toggleAll({ done: !allChecked })">
      <label for="toggle-all" />
      <ul class="todo-list">
        <todo
          v-for="(todo, index) in filteredTodos"
          :key="index"
          :todo="todo"
          @toggleTodo="toggleTodo"
          @editTodo="editTodo"
          @deleteTodo="deleteTodo"
        />
      </ul>
    </section>
    <!-- footer -->
    <footer v-show="todos.length" class="footer">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        条待办
      </span>
      <ul class="filters">
        <li v-for="(val, key) in filters" :key="key">
          <a :class="{ selected: visibility === key }" @click.prevent="visibility = key">{{ key | status }}</a>
        </li>
      </ul>
      <!-- <button class="clear-completed" v-show="todos.length > remaining" @click="clearCompleted">
        Clear completed
      </button> -->
    </footer>
  </section>
</template>

<script>
import Todo from './Todo.vue'

const STORAGE_KEY = 'todos'
const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
}
const defalutList = [
  { text: '请添加待办事项1', done: false },
  { text: '请添加待办事项2', done: false },
  { text: '请添加待办事项3', done: false }
]
export default {
  components: { Todo },
  filters: {
    pluralize: (n, w) => n === 1 ? w : w + 's',
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1),
    status(val) {
      let status
      const statusArr = ['全部', '待办', '已完成']
      switch (val) {
        case 'active':
          status = statusArr[1]
          break
        case 'completed':
          status = statusArr[2]
          break
        default:
          status = statusArr[0]
      }
      return status
    }
  },
  data() {
    const todoData = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
    return {
      visibility: 'all',
      filters,
      todos: (todoData && todoData['user_' + this.$store.getters.id]) || defalutList
    }
  },
  computed: {
    allChecked() {
      return this.todos.every(todo => todo.done)
    },
    filteredTodos() {
      return filters[this.visibility](this.todos)
    },
    remaining() {
      return this.todos.filter(todo => !todo.done).length
    }
  },
  created() {

  },
  methods: {
    setLocalStorage() {
      const todoData = JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || {}
      todoData['user_' + this.$store.getters.id] = this.todos
      console.log(todoData)
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todoData))
    },
    addTodo(e) {
      const text = e.target.value
      if (text.trim()) {
        this.todos.push({
          text,
          done: false
        })
        this.setLocalStorage()
      }
      e.target.value = ''
    },
    toggleTodo(val) {
      val.done = !val.done
      this.setLocalStorage()
    },
    deleteTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
      this.setLocalStorage()
    },
    editTodo({ todo, value }) {
      todo.text = value
      this.setLocalStorage()
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.done)
      this.setLocalStorage()
    },
    toggleAll({ done }) {
      this.todos.forEach(todo => {
        todo.done = done
        this.setLocalStorage()
      })
    }
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
