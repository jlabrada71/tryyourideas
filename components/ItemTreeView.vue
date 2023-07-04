<template>
  <component
    :id="item.id" 
    :is="resolvedType" 
    :class="editorClass" 
    :href="getProperty('href')"
    :src="getProperty('src')"
    :alt="getProperty('alt')"
    :type="getProperty('type')"
    :name="getProperty('name')"
    :target="getProperty('target')"
    :value="getProperty('value')"
    :min="getProperty('min')"
    :max="getProperty('max')"
    :for="getProperty('for')"
    :svg="getProperty('svg')"
    @click.stop="emit('selected', item)">
      {{item.text}}
    <ItemTreeView 
      v-if="viewedItem.children.length > 0" 
      v-for="child in viewedItem.children" 
      :item="child" 
      :device="device"
      :mode="mode"
      :refresh="refreshChildren"
      @selected="value=>emit('selected', value)">
    </ItemTreeView>
  </component>
</template>
<script setup>
  import { getItemEditorClass } from '../lib/ClassGeneration'
  const resolvedComponents = {}
  resolvedComponents['Icon'] = resolveComponent('Icon')

  const emit = defineEmits(['selected'])
  const refreshChildren = ref('false')

  const resolvedType = computed(() => {
    if (viewedItem.value.needsResolve) {
      return resolvedComponents[viewedItem.value.type]  // tryyourideas components
    }
    return viewedItem.value.type
  })

  // for a project component show the root, otherwise show the item
  const viewedItem = computed(() => props.item.isComponent ? props.item.definition.root: props.item)

  const editorClass = computed(() => {
    const forceRefresh = props.refresh // use the refresh prop to for the treeView to refresh
    refreshChildren.value = forceRefresh
    const device = props.device
    const mode = props.mode
    // console.log('Item Tree View')
    // console.log(props.item.name)
    // console.log(props.item.id)
    // console.log('Is Component' + props.item.isComponent)
    // console.log('Props Item')
    // console.log(props.item)
    // console.log('Viewed Item')
    // console.log(viewedItem.value)
    const cls = getItemEditorClass(viewedItem.value, device, mode)
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
    const prop = viewedItem.value.props.find( prop => prop.name === name )
    return prop ? prop.value : undefined
  }
</script>