<template>
  <div>
    <RadioButton :options="alignList" :option="align" name="align-self-group" tag="self" @update:option="value=>emit('update:align', value)">
      Align self: {{txt}}
    </RadioButton> 
  </div>
</template>
<script setup>
  import { removeTag } from '@/lib/ValueUtils.js'
  
  const props = defineProps(['align'])
  const emit = defineEmits(['update:align'])

 const alignList = ['unset', 'auto', 'start', 'end', 'center', 'baseline', 'stretch']
 const txt = computed(() => removeTag(props.align))
</script>


