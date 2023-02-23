<template>
  <h1>To Do List</h1>
  <div class="ToDoList">
    <ul>
      <li v-for="todo in props.todos" :key="todo.id">
        {{ todo.task }}
      </li>
    </ul> 
  </div>
  </template>

  <script setup>

import { ref } from 'vue'

const props = defineProps({
  todos:  { type: Array, required: true }
  
})

  </script>
  