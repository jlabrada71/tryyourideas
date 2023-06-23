<template>
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
        focus:border-2 focus:border-slate-400"
      @click="selectType(type)"
      >{{type.name}}
    </button>
  </section>
</template>

<script setup>
  import { typeList } from '@/lib/typeList.js'
  const emit = defineEmits(['selected'])

  function selectType(type) {
    emit('selected', type)
  }

</script>