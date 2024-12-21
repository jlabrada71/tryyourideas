<template>
  <RadioButton 
    id="justify-content"
    :options="justifyList" 
    :option="justify" 
    name="justify-content-group" 
    tag="justify" 
    @update:option="value=>emit('update:justify', value)">
    Justify content: {{txt}}
  </RadioButton> 
</template>
<script setup>
  import { removeTag } from '@/lib/ValueUtils.js'

  const props = defineProps(['justify'])
  const emit = defineEmits(['update:justify'])

 const justifyList = ['unset','normal', 'start', 'end', 'center', 'between', 'around', 'evenly', 'stretch']
 const txt = computed(() => removeTag(props.justify))

</script>
