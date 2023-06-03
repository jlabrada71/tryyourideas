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
  const resolvedComponents = {}
  resolvedComponents['Icon'] = resolveComponent('Icon')

  const emit = defineEmits(['selected'])
  const refreshChildren = ref('false')

  const resolvedType = computed(() => {
    if (props.item.needsResolve) {
      return resolvedComponents[props.item.type]  // tryyourideas components
    }
    return props.item.type
  })

  const editorClass = computed(() => {
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