<template>
  <TodoList :todos="todos" />
  </template>
  <script setup>
    import { ref } from 'vue';
  
    const todos = ref( [
      { id: 1, task: "todos 11", finished: false },
      { id: 2, task: "todos 12", finished: true },
      { id: 3, task: "todos 3", finished: false },
      { id: 4, task: "todos 4", finished: true },
      { id: 5, task: "todos 5", finished: false }
    ])
  </script>
