<template>
  <li class="mr-2">
    <a href="#" :class="currentClass" @click="currentClass = !props.active">
      <slot></slot>
    </a>
  </li>
</template>

<script setup>
  import { ref, computed } from 'vue'

  const emit = defineEmits(['update:active'])
  const props = defineProps({
    active: {
      type: Boolean,
      default: false
    }
  })

  const defaultClass = "inline-flex p-4 border-b-2 rounded-t-lg group border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
  const activeClass =  "inline-flex p-4 border-b-2 font-bold rounded-t-lg group active text-slate-600 border-slate-600 dark:text-slate-500 dark:border-slate-500"

  const currentClass = computed({
    get() {
      return props.active ? activeClass: defaultClass
    },
    set(value) {
      emit('update:active', value)
    }
  })

  function clicked() {
    console.log(props.active)
    console.log(currentClass.value)
    currentClass.value = !props.active    
  }
</script>
