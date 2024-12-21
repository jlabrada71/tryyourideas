<template>
  <section id="id-2-2" class="flex flex-row flex-wrap bg-slate-100 p-2">
    <button
      type="button"
      v-for="component in props.components" 
      class="
        flex flex-row
        bg-slate-50
        w-full
        h-8
        p-1
        hover:bg-slate-200
        active:bg-slate-300
        focus:bg-slate-300
        focus:border-2 focus:border-slate-400"
      @click="selectType(component)"
      >{{component.name}}
    </button>
  </section>
</template>

<script setup>
  const emit = defineEmits(['selected'])

  const props = defineProps({
    components: {
      type: Array
    }
  })

  function selectType(component) {
    emit('selected', component)
  }

</script>