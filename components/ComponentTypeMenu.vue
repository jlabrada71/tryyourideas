<template>
  <div class="absolute top-20 left-72 w-80 h-auto  bg-slate-100 p-5 shadow-md rounded-2xl flex flex-col">
    <h1 id="id-2-1" class="flex flex-row w-full h-10">
      Html 5 Tags
    </h1>
    <section id="id-2-2" class="flex flex-row flex-wrap bg-slate-100 p-2">
      <button
        type="button"
        v-for="type in typeList" 
        class="
          flex flex-row
          bg-slate-50
          w-20
          h-10
          p-1
          hover:bg-slate-200
          active:bg-slate-300
          focus:bg-slate-300
          focus:border-2 focus:border-slate-400
        "
        @click="selectType(type)"
        >{{type.name}}
      </button>
    </section>
    <footer
      id="id-2-3"
      class="
        flex flex-row
        justify-around justify-self-end
        mt-5
        bg-slate-100
        w-full
        h-10
        px-5
      "
    >
      <button
        id="id-2-3-1"
        class="
          block          
          bg-slate-300
          w-20
          h-10
          shadow-md
          rounded-2xl          
          hover:bg-slate-400          
          focus:bg-slate-400
          active:bg-slate-300
          active:shadow-none
        "
        @click.stop="cancelSelectType"
      >
        Cancel
      </button>
      <button
        id="id-2-3-2"
        class="
          block
          bg-slate-300
          w-20
          h-10
          shadow-md
          rounded-2xl          
          hover:bg-slate-400          
          focus:bg-slate-400          
          active:bg-slate-300
          active:shadow-none
        "
        @click.stop="acceptSelectType"
      >
        Select
      </button>
    </footer>
  </div>
</template>

<script setup>
  import { typeList } from '@/lib/typeList.js'
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