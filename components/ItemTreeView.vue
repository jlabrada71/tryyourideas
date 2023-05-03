<template>
  <component
    :id="item.id" 
    :is="item.type" 
    :class="editorClass" 
    :src="getProperty('src')"
    :type="getProperty('type')"
    @click.stop="emit('selected', item)">
      {{item.text}}
    <ItemTreeView 
      v-if="item.children.length > 0" 
      v-for="child in item.children" 
      :item="child" 
      :device="device"
      :mode="mode"
      :refresh="refreshChildren"
      @selected="value=>emit('selected', value)">
    </ItemTreeView>
  </component>
</template>
<script setup>
  import { getComponentEditorClass } from '../lib/ClassGeneration'

  const emit = defineEmits(['selected'])

  const refreshChildren = ref('false')

  const editorClass = computed(() => {
    // console.log('updating tree View')
    // console.log(props.item.id)
    // console.log(props.item.classes)
    const forceRefresh = props.refresh // use the refresh prop to for the treeView to refresh
    refreshChildren.value = forceRefresh
    const device = props.device
    const mode = props.mode
    const cls = getComponentEditorClass(props.item, device, mode)
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

  function getProperty(name) {
    const prop = props.item.props.find( prop => prop.name === name )
    return prop ? prop.value : undefined
  }
</script>