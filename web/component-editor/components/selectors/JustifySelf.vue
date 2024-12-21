<template>
  <div>
    <RadioButton :options="justifyList" :option="justify" name="justify-self-group" tag="justify-self" @update:option="value=>emit('update:justify', value)">
      Justify self: {{txt}}
    </RadioButton> 
  </div>
</template>
<script setup>
  import { removeTag } from '@/lib/ValueUtils.js'
  const props = defineProps(['justify'])
  const emit = defineEmits(['update:justify'])

  const justifyList = ['unset', 'auto', 'start', 'end', 'center', 'stretch']
  const txt = computed(() => removeTag(props.justify, ''))
</script>

