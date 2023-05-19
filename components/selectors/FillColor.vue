<template>
  <div>
    <SelectorsTaggedColor
      :color="color"
      @update:color="value=>emit('update:color', value)"
      tag="fill">
      Fill color: <span>{{color}}</span>
    </SelectorsTaggedColor>
  </div>
</template>
<script setup>

  const props = defineProps(['color'])
  const emit = defineEmits(['update:color'])
 
</script>
