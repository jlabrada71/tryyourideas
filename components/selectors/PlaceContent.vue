<template>
  <div>
    <RadioButton :options="placeList" :option="place" name="place-content-group" tag="place-content" @update:option="value=>emit('update:place', value)">
      Place content: {{txt}}
    </RadioButton> 
  </div>
</template>
<script setup>
  import { removeTag } from '@/lib/ValueUtils.js'

  const props = defineProps(['place'])
  const emit = defineEmits(['update:place'])

  const placeList = ['unset','normal', 'start', 'end', 'center', 'between', 'around', 'evenly', 'baseline', 'stretch']

  const txt = computed(() => removeTag(props.place, 'place-content-'))
</script>


