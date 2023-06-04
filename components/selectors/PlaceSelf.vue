<template>
  <RadioButton :options="placeList" :option="place" name="place-self-group" tag="place-self" @update:option="value=>emit('update:place', value)">
    Place items: {{txt}}
  </RadioButton> 
</template>
<script setup>
   import { removeTag } from '@/lib/ValueUtils.js'
  const props = defineProps(['place'])
  const emit = defineEmits(['update:place'])

  const placeList = ['unset', 'auto', 'start', 'end', 'center', 'stretch']
  const txt = computed(() => removeTag(props.place, 'place-self-'))
</script>
