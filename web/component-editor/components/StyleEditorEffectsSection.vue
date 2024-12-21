<template>
  <AccordionItem id="24">
    <template #head><span class="flex items-center">Effects</span></template>
    <template #body>
      <SelectorsShadow :shadow="cls.shadow" @update:shadow="value => updateClass('shadow', value)"></SelectorsShadow>
      <SelectorsShadowColor :color="cls.shadowColor" @update:color="value => updateClass('shadowColor', value)"></SelectorsShadowColor>
      <SelectorsOpacity :opacity="cls.opacity" @update:opacity="value => updateClass('opacity', value)"></SelectorsOpacity>
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