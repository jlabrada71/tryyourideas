<template>
  <AccordionItem id="30">
    <template #head><span class="flex items-center">Background</span></template>
    <template #body>
      <SelectorsBackgroundClip :clip="cls.backgroundClip" @update:clip="value => updateClass('backgroundClip', value)"></SelectorsBackgroundClip>
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