<template>
  <div class="m-0 hover:bg-slate-200 h-6 overflow-hidden hover:h-auto">
    <slot></slot>
    <div 
      class="flex items-center px-2" 
      v-for="option in props.options"  
      :key="option">
      <input 
        :id="`${props.name}-${option}`" 
        type="radio" 
        v-model="selected" 
        :value="option" 
        :name="props.name" 
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
      <label :for="`${props.name}-${option}`" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{option}}</label>
    </div>
  </div>
</template>
<script setup>
  import { computed } from 'vue'
  import { removeTag, taggedValue } from '@/lib/ValueUtils'
  import { EditorStyles } from '@/lib/EditorConstants'

  const emit = defineEmits(['update:option'])

  const props = defineProps({
    options:  { type: Array, required: true },
    option: { type: String, default: EditorStyles.UNSET },
    name: { type: String, default: 'item-radio-group' },
    tag: { type: String }
  })

  const selected = computed({
    get() {
      return removeTag(props.option, props.tag + '-')
    },
    set(value) {
      const result = taggedValue(value, props.tag)
      emit('update:option', result)
    }
  })
 
</script>