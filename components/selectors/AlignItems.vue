<template>
  <RadioButton 
    :options="alignList" 
    :option="align" 
    name="align-items-group" 
    tag="items" 
    @update:option="value=>emit('update:align', value)">
    Align items: {{txt}}
  </RadioButton> 
</template>
<script setup>
  import { removeTag } from '@/lib/ValueUtils.js'

  const props = defineProps(['align'])
  const emit = defineEmits(['update:align'])
  const alignList = ['unset', 'start', 'end', 'center', 'baseline', 'stretch']
  
  const txt = computed(() => removeTag(props.align))
</script>

