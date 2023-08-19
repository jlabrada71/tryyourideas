<template>
  
  <AccordionItem id="31">
    <template #head><span class="flex items-center">Filters</span></template>
    <template #body>
      
      <SelectorsBackdropBlur :blur="cls.backdropBlur" @update:blur="value => updateClass('backdropBlur', value)"></SelectorsBackdropBlur>
      <SelectorsBackdropOpacity :opacity="cls.backdropOpacity" @update:opacity="value => updateClass('backdropOpacity', value)"></SelectorsBackdropOpacity>
      
    </template>
  </AccordionItem>
</template>
<script setup>
  const props = defineProps({
    cls: {
      type: Object,
      required: true
    }
  })

  const emit = defineEmits(['update:cls'])

  function updateClass(name, value) {
    emit('update:cls', { name, value })
  }

</script>