<template>
  <div>
    <h1><slot>Color</slot></h1>
    <div>
      <button @click="openForm" :class="buttonClass"></button>
      <ColorButton v-if="show" 
        :color="rawColor" 
        :originalColor="originalColor"
        @update:color="selectedColor" 
        @close="closeSelector">
      </ColorButton>
    </div>
  </div>
</template>
<script setup>
  import { ref, computed } from 'vue'

  const props = defineProps(['color', 'tag'])
  const emit = defineEmits(['update:color'])

  const rawColor = computed(() => props.color.substring(props.tag.length + 1))
  const backgroundColor = computed(() => `bg-${rawColor.value}`)
  const buttonClass = computed(() => `border w-8 h-8 ${backgroundColor.value} ${props.color}`)

  const show = ref(false)
  const originalColor = ref(null)

  function selectedColor(color) {
    console.log(color)
    emit('update:color', `${props.tag}-${color}`)
  }

  function closeSelector() {
    show.value = false
  }

  function openForm() {
    show.value = !show.value
    if (show.value) {
      originalColor.value = rawColor.value
    }
  }

</script>
<style scoped>
  div {
    width: 200px;
  }
</style>


