<template>
  <div>
    <SelectorsTaggedColor
      :color="color"
      @update:color="value=>emit('update:color', value)"
      tag="outline">
      Outline color: <span>{{color}}</span>
    </SelectorsTaggedColor>
  </div>
</template>
<script setup>
  import { ref, computed, onUpdated } from 'vue'

  const props = defineProps(['color'])
  const emit = defineEmits(['update:color'])
 
</script>
