<template>
  <div @click.stop="emit('selected', item)" :class="item.renderedClass">
    <TreeItemView 
      v-if="item.children.length > 0" 
      v-for="child in item.children" 
      :item="child" 
      @selected="value=>emit('selected', value)">
    </TreeItemView>
  </div>
</template>
<script setup>
  const emit = defineEmits(['selected'])

  const props = defineProps({
    item: {
      type: Object
    }
  })
</script>