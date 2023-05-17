<template>
  <label for="mode" class="block mb-2 text-sm font-medium text-slate-900 dark:text-white"><slot></slot></label>
  <select id="mode" v-model="currentModifier" class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500">
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