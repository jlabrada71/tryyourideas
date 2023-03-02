<template>
  <div id="accordion-open" data-accordion="open" class="bg-white">
    <AccordionItem id="1">
      <template #head><span class="flex items-center">General</span></template>
      <template #body>
        <div class="flex flex-col gap-2">
          <span>Id: {{item.id}} - device:{{item.class.device}}</span>
          <SelectorsModifier  @update:modifier="value => emit('add:modifier', value)">Add Modifier</SelectorsModifier>
          <SelectorsModifier :modifier="props.item.modifier" @update:modifier="value => emit('update:modifier', value)">Select Modifier</SelectorsModifier>
          <SelectorsHtmlTag :type="props.item.type" @update:color="value => updateClass('backgroundColor', value)"></SelectorsHtmlTag>
          <div class="flex gap-2"> 
            <label for="text-edit">Text</label>
            <input id="text-edit" class="bg-slate-100 rounded" type="text" v-model="props.item.text">
          </div>
         
          <SelectorsBackgroundColor :color="props.item.class.backgroundColor" @update:color="value => updateClass('backgroundColor', value)"></SelectorsBackgroundColor>
          <SelectorsWidth  :width="props.item.class.width" @update:width="value => updateClass('width', value)"></SelectorsWidth>
          <SelectorsHeight :height="props.item.class.height" @update:height="value => updateClass('height', value)"></SelectorsHeight>
          <SelectorsPadding :padding="props.item.class.padding" @update:padding="value => updateClass('padding', value)"></SelectorsPadding>
          <SelectorsMargin :margin="props.item.class.margin" @update:margin="value => updateClass('margin', value)"></SelectorsMargin>
          <SelectorsSpacing :spacing="props.item.class.spacing" @update:spacing="value => updateClass('spacing', value)"></SelectorsSpacing>
        </div>
        
      </template>
    </AccordionItem>

    <AccordionItem id="2">
      <template #head><span class="flex items-center">Typography</span></template>
      <template #body>
        <SelectorsTextColor :color="props.item.class.textColor" @update:color="value => updateClass('textColor', value)"></SelectorsTextColor>
        <SelectorsFontSize :size="props.item.class.fontSize" @update:size="value => updateClass('fontSize', value)"></SelectorsFontSize>
        <SelectorsFontFamily :family="props.item.class.fontFamily" @update:family="value => updateClass('fontFamily', value)"></SelectorsFontFamily>
        <SelectorsFontWeight :weight="props.item.class.fontWeight" @update:weight="value => updateClass('fontWeight', value)"></SelectorsFontWeight>
        <SelectorsLetterSpacing :spacing="props.item.class.letterSpacing" @update:spacing="value => updateClass('letterSpacing', value)"></SelectorsLetterSpacing>
        <SelectorsLineHeight :height="props.item.class.lineHeight" @update:height="value => updateClass('lineHeight', value)"></SelectorsLineHeight>
        <SelectorsTextAlign :align="props.item.class.textAlign" @update:align="value => updateClass('textAlign', value)"></SelectorsTextAlign>
        <SelectorsTextVerticalAlign :align="props.item.class.textVerticalAlign" @update:align="value => updateClass('textVerticalAlign', value)"></SelectorsTextVerticalAlign>
      </template>
    </AccordionItem>    

    <AccordionItem id="3">
      <template #head><span class="flex items-center">Borders</span></template>
      <template #body>
        <SelectorsBorderRadius :radius="props.item.class.borderRadius"  @update:radius="value => updateClass('borderRadius', value)"></SelectorsBorderRadius>
        <SelectorsBorderWidth  :width="props.item.class.borderWidth" @update:width="value => updateClass('borderWidth', value)"></SelectorsBorderWidth>
        <SelectorsBorderStyle :style="props.item.class.borderStyle" @update:style="value => updateClass('borderStyle', value)"></SelectorsBorderStyle>
        <SelectorsBorderColor :color="props.item.class.borderColor" @update:color="value => updateClass('borderColor', value)"></SelectorsBorderColor>
      </template>
    </AccordionItem> 

    <AccordionItem id="4">
      <template #head><span class="flex items-center">Shadows</span></template>
      <template #body>
        <SelectorsShadow :shadow="props.item.class.shadow" @update:shadow="value => updateClass('shadow', value)"></SelectorsShadow>
        <SelectorsShadowColor :color="props.item.class.shadowColor" @update:color="value => updateClass('shadowColor', value)"></SelectorsShadowColor>
      </template>
    </AccordionItem> 
    
    <AccordionItem id="5">
      <template #head><span class="flex items-center">Others</span></template>
      <template #body>
        <SelectorsDivideColor :color="props.item.class.divideColor" @update:color="value => updateClass('divideColor', value)"></SelectorsDivideColor>
        <SelectorsOutlineColor :color="props.item.class.outlineColor" @update:color="value => updateClass('outlineColor', value)"></SelectorsOutlineColor>
        <SelectorsRingColor :color="props.item.class.ringColor" @update:color="value => updateClass('ringColor', value)"></SelectorsRingColor>
      </template>
    </AccordionItem>
  </div>
</template>
<script setup>
  import { ref, computed, onMounted, watch } from 'vue'
  import { 
    initAccordions, 
    initCarousels, 
    initCollapses, 
    initDials, 
    initDismisses, 
    initDrawers, 
    initDropdowns, 
    initModals, 
    initPopovers, 
    initTabs, 
    initTooltips } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
    initAccordions();
    initCarousels();
    initCollapses();
    initDials();
    initDismisses();
    initDrawers();
    initDropdowns();
    initModals();
    initPopovers();
    initTabs();
    initTooltips();
})

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:item', 'update:modifier', 'add:modifier'])

function updateClass(className, value) {
  const newItem = {...props.item }
  newItem.class[className] = value
  emit('update:item', newItem)
}

function e(modifier) {
  return style => {
    if (style === 'default') return ''
    return `${modifier}${style}`
  }
}

function r(modifier, mode, device) {
  return  (style) => {    
    const editorStyle = e(modifier)(style)
    if ( editorStyle === '' ) return '';

    return `${mode}${device}${editorStyle}`
  }
}

const modifiedClass = (( itemClass, f ) => `${f(itemClass.backgroundColor)} ${f(itemClass.width)} ${f(itemClass.height)} ${f(itemClass.padding)} ${f(itemClass.margin)}  ${f(itemClass.spacing)}
          ${f(itemClass.shadow)} ${f(itemClass.shadowColor)} 
          ${f(itemClass.borderRadius)} ${f(itemClass.borderWidth)} ${f(itemClass.borderStyle)} ${f(itemClass.borderColor)}
          ${f(itemClass.textColor)} ${f(itemClass.fontSize)}  ${f(itemClass.fontWeight)} ${f(itemClass.fontFamily)} ${f(itemClass.letterSpacing)} ${f(itemClass.lineHeight)}  ${f(itemClass.textAlign)} ${f(itemClass.textVerticalAlign)}
          ${f(itemClass.outlineColor)} 
          ${f(itemClass.ringColor)} 
          ${f(itemClass.divideColor)} 
          flex flex-wrap
          ` )

const getEditorClass = itemClass => modifiedClass(itemClass, e(itemClass.modifier))
const getRenderedClass = itemClass => modifiedClass(itemClass, r(itemClass.modifier, itemClass.mode, itemClass.device ))

const editorClass = computed(() => getEditorClass(props.item.class))
const renderedClass = computed(() => getRenderedClass(props.item.class))

function compoundRenderedClass(component) {
  return component.classes.map(cls => getRenderedClass(cls)).join(' ')
}

function compoundEditorClass(component) {
  return component.classes.map(cls =>  getEditorClass(cls)).join(' ')
}

watch(renderedClass, (newClass, oldClass) => {
  const newItem = {...props.item }
  newItem.class.editorClass = editorClass.value
  newItem.class.renderedClass = renderedClass

  const compoundRendered = compoundRenderedClass(newItem)
  console.log(compoundRendered)
  newItem.renderedClass = compoundRendered
  newItem.editorClass = compoundEditorClass(newItem)

  console.log('compound rendered class')
  console.log(newItem.renderedClass)

  emit('update:item', newItem)
})
</script>