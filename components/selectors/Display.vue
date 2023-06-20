<template>
  <div class="flex w-auto items-baseline">
    <h1 class="m-2">Display: </h1><InputList :options="displayList" :option="display" @update:option="value=>emit('update:display', value)" />
  </div>
</template>
<script setup>
  const props = defineProps(['display'])
  const emit = defineEmits(['update:display'])

  const displayList = ['unset', 'block', 'inline-block', 'inline', 'flex', 'inline-flex', 'table', 'inline-table', 'table-caption', 'table-cell', 'table-column', 'table-column-group', 'table-footer-group', 'table-header-group', 'table-row-group', 'table-row', 'flow-root', 'grid', 'inline-grid', 'contents', 'list-item', 'hidden']
</script>

