<template>
  <div>
    <RadioButton :options="placeList" :option="place" name="place-items-group" tag="place-items" @update:option="value=>emit('update:place', value)">
      Place items: {{txt}}
    </RadioButton> 
  </div>
</template>
<script setup>
  import { removeTag } from '@/lib/ValueUtils.js'

  const props = defineProps(['place'])
  const emit = defineEmits(['update:place'])

  const placeList = ['unset', 'start', 'end', 'center', 'baseline', 'stretch']
  const txt = computed(() => removeTag(props.place, 'place-items-'))
</script>

