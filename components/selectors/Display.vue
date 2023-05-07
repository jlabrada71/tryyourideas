<template>
  <div>
    <SelectButton :options="displayList" :option="display" @update:option="value=>emit('update:display', value)">
      <h1>Display: <span>{{display}}</span></h1>
    </SelectButton>
  </div>
</template>
<script setup>
  const props = defineProps(['display'])
  const emit = defineEmits(['update:display'])

  const displayList = ['default', 'block', 'inline-block', 'inline', 'flex', 'inline-flex', 'table', 'inline-table', 'table-caption', 'table-cell', 'table-column', 'table-column-group', 'table-footer-group', 'table-header-group', 'table-row-group', 'table-row', 'flow-root', 'grid', 'inline-grid', 'contents', 'list-item', 'hidden']
</script>

