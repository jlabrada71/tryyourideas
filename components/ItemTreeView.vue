<template>
    <div v-if="props.selectedItemId===props.item.id && !props.item.isComponent"
      :class="selectedClass" 
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
      :class="selectedClass" 
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

  const unsetBackImage = ref('url("http://localhost:3000/logo.png")')
  const hoverBackImage = ref('url(/images/text-gradient.png)')
  const activeBackImage = ref('url(/images/gradient-tutorial.png)')
  const focusBackImage = ref('url(/images/text-gradient.png)')

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

  const backImageClass = computed(() => {
    const itemClasses = getItemClasses(viewedItem.value, props.device, props.mode)
    const backgroundImagesClasses = itemClasses.filter(cls => cls.backgroundImage !== 'unset' )
    if (!backgroundImagesClasses.length) return ''
    // return `background-image:url('${backgroundImages[0].backgroundImage}')`
    // this below is unfinished
    const setImage = () => 
    backgroundImagesClasses.forEach( cls => {
      backImage[cls.modifier].value = cls.backgroundImage == 'unset' ? 'none' : `url("${cls.backgroundImage}")` 
    })
    const result = backgroundImagesClasses.map(cls => cls.backgroundImage === 'unset' || cls.backgroundImage === '' ? '' : `${cls.modifier}: { background-image:url('${cls.backgroundImage}');}`).join('')
    const result2 = result.replaceAll('unset:', '')
    console.log(result)
    console.log(result2)
    
    return ' image '
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
    return cls + backImageClass.value + ( props.selectedItemId === props.item.id ? ' absolute' : '')
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
    debug('selected: ' + item.id)
    emit('selected', item)
  }

  function getProperty(name) {
    const prop = viewedItem.value.properties.find( prop => prop.name === name )
    return prop ? prop.value : undefined
  }
</script>
<style>
.image {
  color: v-bind(color);
  background-image: v-bind(unsetBackImage );
}

.image:hover {
  background-image: v-bind(hoverBackImage );
}

.image:active {
  background-image: v-bind(activeBackImage );
}

.image:focus {
  background-image: v-bind(focusBackImage );
}
</style>