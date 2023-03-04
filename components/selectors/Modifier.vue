<template>
  <label for="mode" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><slot></slot></label>
  <select id="mode" v-model="currentModifier" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option v-for="modifierName in props.modifierList">{{modifierName}}</option>
  </select>
</template>
<script setup>
  import { computed } from 'vue'

  const emit = defineEmits(['update:modifier'])

  const props = defineProps({
    modifier: {
      type: String
    },
    modifierList: {
      type: Array,
      default: ['default', 'hover', 'focus', 'active']
    }
  })

  const currentModifier = computed({
    get() {
      return props.modifier || 'default'
    },
    set(value) {
      emit('update:modifier', value)
    }
  })
</script>