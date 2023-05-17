<template>
  <div class="flex flex-row flex-wrap">
    <SelectorsModifierTab v-for="modifierName in props.modifierList"
      :value="modifierName"
      :active="modifierName==modifier"
      @click="clicked(modifierName)"
    >
      {{modifierName}}
    </SelectorsModifierTab>
  </div>
  
</template>
<script setup>
  import { computed } from 'vue'

  const emit = defineEmits(['update:modifier'])

  const props = defineProps({
    modifier: {
      type: String
    },
    modifierList: {
      type: Array,
      default: ['default', 'hover', 'focus', 'active']
    }
  })

  const currentModifier = computed({
    get() {
      return props.modifier || 'default'
    },
    set(value) {
      emit('update:modifier', value)
    }
  })

  function clicked(name) {
    currentModifier.value = name
  }
</script>