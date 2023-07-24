<template>
  <div v-if="props.selectedItemId===item.id"
    :class="selectedClass" 
    @click.stop="selectItem(item)"
  >
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
      @click.stop="selectItem(item)">
        {{item.text}}
      
    </component>

            <!-- Frame -->
    <div :class="frameClass" @click.stop="selectItem(item)">
      <ItemTreeView 
        v-if="viewedItem.children.length > 0" 
        v-for="child in viewedItem.children" 
        :item="child" 
        :device="device"
        :mode="mode"
        :selectedItemId="props.selectedItemId"
        :refresh="refreshChildren"
        @selected="value=>selectItem(value)">
      </ItemTreeView>
    </div> 
      <!-- the handlers are hidden
      <div class="absolute left-0  top-0    w-2 h-2 bg-blue-200 rounded-full border-[1px] border-blue-800 "></div>
      <div class="absolute left-0  bottom-0 w-2 h-2 bg-blue-200 rounded-full border-[1px] border-blue-800 "></div>
      <div class="absolute right-0 top-0    w-2 h-2 bg-blue-200 rounded-full border-[1px] border-blue-800 "></div>
      <div class="absolute right-0 bottom-0 w-2 h-2 bg-blue-200 rounded-full border-[1px] border-blue-800 "></div>
      -->
      <!-- Frame end -->

  </div>
  <component
    v-else
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
    @click.stop="selectItem(item)">
      {{item.text}}
    <ItemTreeView 
      v-if="viewedItem.children.length > 0" 
      v-for="child in viewedItem.children" 
      :item="child" 
      :device="device"
      :mode="mode"
      :selectedItemId="props.selectedItemId"
      :refresh="refreshChildren"
      @selected="value=>emit('selected', value)">
    </ItemTreeView>
  </component>
</template>
<script setup>
  import { getItemEditorClass } from '@/lib/generators/ClassGeneration.js'
  import { debug } from '@/lib/logger.js'

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
    },
    selectedItemId: {
      type: String
    }
  })

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
    return cls + ( props.selectedItemId === props.item.id ? ' absolute' : '')
  })
  const selectedClass = computed(() => { 
    const cls = editorClass.value
    const sizeCl = cls.split(' ').filter(cl => cl.startsWith('w-') || cl.startsWith('h-')).join(' ')
    return sizeCl + ' relative'
  })

  const frameClass = computed(() => { 
    const cls = editorClass.value
    const sizeCl = cls.split(' ').filter(cl => ! cl.startsWith('bg-') && ! cl.startsWith('border') ).join(' ')
    const newCls = 'absolute w-full h-full bg-transparent border-[1px] border-blue-800 ' + sizeCl
    
    return newCls
  })

  function selectItem(item) {
    debug('seleced: ' + item.id)
    emit('selected', item)
  }

  function getProperty(name) {
    const prop = viewedItem.value.properties.find( prop => prop.name === name )
    return prop ? prop.value : undefined
  }
</script>