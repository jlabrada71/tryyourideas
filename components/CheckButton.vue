<template>
  <input type="checkbox" 
      v-model="selected"
      class="w-4 rounded-lg border-2 border-slate-400"
    >
</template>
<script setup>
  import { computed } from 'vue'

  const emit = defineEmits(['update:value'])

  const props = defineProps({
    value: { type: Boolean, default: false }
  })

  const selected = computed({
    get() {
      return props.value
    },
    set(value) {
      emit('update:value', value)
    }
  })
 
</script>