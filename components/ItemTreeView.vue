<template>
    <div v-if="props.selectedItemId===props.item.id && !props.item.isComponent"
      :class="selectedClass" ref="selected"
      @click.stop="selectItem(props.item)"
    >
      <component
        :id="props.item.id" 
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
        
        @click.stop="selectItem(props.item)"
        >
          {{props.item.text}}
      </component>

      <!-- Frame -->
      <div :class="frameClass" @click.stop="selectItem(props.item)">
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

    <div v-else-if="props.selectedItemId===props.item.id && props.item.isComponent"
      :class="selectedClass" ref="selected"
      @click.stop="selectItem(props.item)"
    >
      <component
        :id="props.item.id" 
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
        
        @click.stop="selectItem(props.item)">
          {{props.item.text}}
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
      </component>

              <!-- Frame -->
      <div :class="frameClass" @click.stop="selectItem(props.item)">
      </div> 
        <!-- the handlers are hidden
        <div class="absolute left-0  top-0    w-2 h-2 bg-blue-200 rounded-full border-[1px] border-blue-800 "></div>
        <div class="absolute left-0  bottom-0 w-2 h-2 bg-blue-200 rounded-full border-[1px] border-blue-800 "></div>
        <div class="absolute right-0 top-0    w-2 h-2 bg-blue-200 rounded-full border-[1px] border-blue-800 "></div>
        <div class="absolute right-0 bottom-0 w-2 h-2 bg-blue-200 rounded-full border-[1px] border-blue-800 "></div>
        -->
        <!-- Frame end -->

    </div>

    <component v-else-if="!props.item.isComponent"
      :id="props.item.id" 
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
      
      @click.stop="selectItem(props.item)">
        {{props.item.text}}
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
    <component v-else
      :id="props.item.id" 
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
      
      @click.stop="selectItem(props.item)">
        {{props.item.text}}
      <ItemTreeView 
        v-if="viewedItem.children.length > 0" 
        v-for="child in viewedItem.children" 
        :item="child" 
        :device="device"
        :mode="mode"
        :selectedItemId="props.selectedItemId"
        :refresh="refreshChildren"
        @selected="value => selectItem(props.item)">
      </ItemTreeView>
    </component>
</template>
<script setup>
  import { getItemEditorClass, getItemClasses } from '@/lib/generators/ClassGeneration.js'
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

  const unsetBackImage = ref('none')
  const hoverBackImage = ref('none')
  const activeBackImage = ref('none')
  const focusBackImage = ref('none')

  const backImage = {
    unset: unsetBackImage,
    hover: hoverBackImage,
    active: activeBackImage,
    focus: focusBackImage
  }


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

  function getImage(cls) {
    return cls.backgroundImage == 'unset' ? 'none' : `url("${cls.backgroundImage}")` 
  }

  const backImageClass = computed(() => {
    const itemClasses = getItemClasses(viewedItem.value, props.device, props.mode)

    backImage.unset.value = 'none'
    backImage.hover.value = 'none'
    backImage.active.value = 'none'
    backImage.focus.value = 'none'

    const backgroundImagesClasses = itemClasses.filter(cls => cls.backgroundImage !== 'unset' )
    if (!backgroundImagesClasses.length) return ''

    const unsetCls = itemClasses.find(cls => cls.modifier === 'unset')
    backImage.hover.value = getImage( unsetCls.backgroundImage )

    backgroundImagesClasses.forEach( cls => {
      console.log('-----------------------')
      console.log(cls.modifier, backImage[cls.modifier].value )
      backImage[cls.modifier].value = cls.backgroundImage == 'unset' ? 'none' : `url("${cls.backgroundImage}")` 
    })
    
    return ' back-image '
  })
   
  // for a project component show the root, otherwise show the item
  const viewedItem = computed(() => props.item.isComponent ? props.item.definition.root: props.item)

  const editorClass = computed(() => {
    const forceRefresh = props.refresh // use the refresh prop to for the treeView to refresh
    refreshChildren.value = forceRefresh
    const device = props.device
    const mode = props.mode
  
    const cls = getItemEditorClass(viewedItem.value, device, mode)
    console.log('====')
    console.log(cls)
    console.log('+++')

    return cls + backImageClass.value + ( props.selectedItemId === props.item.id ? ' absolute' : '')
  })

  const selectedClass = computed(() => { 
    const cls = editorClass.value
    const sizeCl = cls.split(' ').filter(cl => cl.startsWith('w-') || cl.startsWith('h-')).join(' ')
    return sizeCl + ' relative'
  })

  const selected = ref(null)
  const { x, y, top, right, bottom, left, width, height } = useElementBounding(selected)

  function includesAny(item, arr ) {
    const result = arr.filter(a => item.includes(a))
    return result.length > 0
  }

  const layoutClasses = ['flex', 'grid', 'col', 'row', 'wrap', 'items', 'align', 'justify', 'place', 'self', 'gap']

  function isFrameRelatedClass(cl) {
    return includesAny(cl, layoutClasses)
    // return !cl.startsWith('bg-') && ! cl.startsWith('border')
  }

  const frameClass = computed(() => { 
    const cls = editorClass.value
    const frameCls = cls.split(' ').filter(cl => isFrameRelatedClass(cl)).join(' ')
    return `absolute w-full h-full bg-transparent border-[1px] border-blue-800 `  + frameCls    
  })

  function selectItem(item) {
    debug('selected: ' + item.id)
    emit('selected', item)
  }

  function getProperty(name) {
    const prop = viewedItem.value.properties.find( prop => prop.name === name )
    return prop ? prop.value : undefined
  }
</script>
<style>
.back-image {
  background-image: v-bind(unsetBackImage );
}

.back-image:hover {
  background-image: v-bind(hoverBackImage );
}

.back-image:active {
  background-image: v-bind(activeBackImage );
}

.back-image:focus {
  background-image: v-bind(focusBackImage );
}
</style>