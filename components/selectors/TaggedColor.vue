<template>
  <div>
    <h1><slot>Color</slot></h1>
    <div>
      <button @click="show = !show" :class="buttonClass"></button>
      <ColorButton v-if="show" :color="rawColor" @update:color="selectedColor"></ColorButton>
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

  // onUpdated(() => {
  //   console.log('tag: ' + props.tag)
  //   console.log('updated: ' + props.color)
  //   console.log('raw: ' + rawColor.value)
  //   console.log('background: ' + backgroundColor.value)
  //   console.log('buttonClass ' + buttonClass.value)
  // })

  function selectedColor(color) {
    console.log(color)
    emit('update:color', `${props.tag}-${color}`)
    show.value = false
  }

</script>
<style scoped>
  div {
    width: 200px;
  }
</style>


