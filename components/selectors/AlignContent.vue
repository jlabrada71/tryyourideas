<template>
  <RadioButton 
    :options="alignList" 
    :option="align" 
    name="align-content-group" 
    tag="content" 
    @update:option="value=>emit('update:align', value)">
    Align content: {{txt}}
  </RadioButton> 
</template>
<script setup>
  import { removeTag } from '@/lib/ValueUtils.js'

  const props = defineProps(['align'])
  const emit = defineEmits(['update:align'])

 const alignList = ['unset','normal', 'start', 'end', 'center', 'between', 'around', 'evenly', 'baseline', 'stretch']

 const txt = computed(() => removeTag(props.align))
</script>