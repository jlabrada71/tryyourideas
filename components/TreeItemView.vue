<template>
  <div @click.stop="emit('selected', item)" :class="editorClass">
    {{item.text}}
    <TreeItemView 
      v-if="item.children.length > 0" 
      v-for="child in item.children" 
      :item="child" 
      :device="device"
      :mode="mode"
      :refresh="refreshChildren"
      @selected="value=>emit('selected', value)">
    </TreeItemView>
  </div>
</template>
<script setup>
  import { getComponentEditorClass } from '../lib/ClassGeneration'

  const emit = defineEmits(['selected'])

  const refreshChildren = ref('false')

  const editorClass = computed(() => {
    console.log('updating tree View')
    console.log(props.item.id)
    console.log(props.item.classes)
    const forceRefresh = props.refresh // use the refresh prop to for the treeView to refresh
    refreshChildren.value = forceRefresh
    const device = props.device === 'any' ? '' : props.device
    const mode = props.mode === 'light' ? '' : props.mode
    const cls = getComponentEditorClass(props.item, device, mode)
    console.log(`"${cls}"`)
    return cls
  })

  const props = defineProps({
    item: {
      type: Object
    },
    device: {
      type: String
    },
    mode: {
      type: String
    },
    refresh: {
      type: Boolean
    }
  })
</script>