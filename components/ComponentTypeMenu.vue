<template>
  <div class="absolute top-20 left-72 w-60 h-60 bg-blue-50 text-black ">
    Component Menu
    <div class="flex flex-row flex-wrap">
      <button
        type="button"
        v-for="type in typeList" 
        class="w-20"
        @click="selectType(type)"
        >{{type.name}}
      </button>
    </div>
    <div>
      <button type="button" @click.stop="cancelSelectType">Cancel</button>
      <button type="button" @click.stop="acceptSelectType">Select</button>
    </div>
  </div>
</template>

<script setup>
  import { typeList } from '@/lib/typeList'
  const emit = defineEmits(['cancel', 'selected'])

  const selectedType = ref(null)

  function selectType(type) {
    selectedType.value = type
  }

  function clearSelection() {
    selectedType.value = null
  }

  function cancelSelectType() {
      emit('cancel')
      clearSelection()
  }

  function acceptSelectType() {
    emit('selected', selectedType.value)
    clearSelection()
  }
</script>