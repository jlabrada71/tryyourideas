<template>
  <div id="id-14" class="bg-slate-100 w-full p-2 content-start flex-row flex-wrap divide-slate-400 flex ">
    <span id="id-14-1" class="bg-slate-300 w-full h-6  px-2 flex-row flex ">
      Items
    </span>
    <ItemTree 
      :item="component.root"
      class="w-full"
      @update:add-child="value => emit('update:add-child', value)" 
      @update:remove="value => emit('update:remove', value)"  
      @selected="value => emit('selected', value)">
    </ItemTree>
  </div>
</template>
<script setup>
const props = defineProps({
  component: {
    type: Object
  }
})
const emit = defineEmits(['update:add-child', 'update:remove', 'selected'])

</script>