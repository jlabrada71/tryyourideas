<template>
  <RadioButton 
    id="juntify-items"
    :options="justifyList" 
    :option="justify" 
    name="justify-items-group" 
    tag="justify-items" 
    @update:option="value=>emit('update:justify', value)">
    Justify items: {{txt}}
  </RadioButton> 
</template>
<script setup>
  import { removeTag } from '@/lib/ValueUtils.js'

  const props = defineProps(['justify'])
  const emit = defineEmits(['update:justify'])

 const justifyList = ['unset', 'start', 'end', 'center', 'stretch']
 const txt = computed(() => removeTag(props.justify, 'justify-items-'))

</script>
