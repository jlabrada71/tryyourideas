<template>
  <AccordionItem id="27">
    <template #head><span class="flex items-center">Transitions</span></template>
    <template #body>
      <SelectorsTransition :transition="cls.transition" @update:transition="value => updateClass('transition', value)"></SelectorsTransition>
      <SelectorsTransitionDuration :transition="cls.transitionDuration" @update:transition="value => updateClass('transitionDuration', value)"></SelectorsTransitionDuration>
      <SelectorsTransitionDelay :transition="cls.transitionDelay" @update:transition="value => updateClass('transitionDelay', value)"></SelectorsTransitionDelay>
      <SelectorsTransitionTiming :transition="cls.transitionTiming" @update:transition="value => updateClass('transitionTiming', value)"></SelectorsTransitionTiming>
      <SelectorsAnimation :animation="cls.animation" @update:animation="value => updateClass('animation', value)"></SelectorsAnimation>
      
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