<template>
  <SelectorsModifier :modifier="currentClass.modifier" @update:modifier="value => emit('update:modifier', value)">Select Modifier</SelectorsModifier>
  <div id="item-style-accordion-open" data-accordion="open" class="bg-white">
    <AccordionItem id="21">
      <template #head><span class="flex items-center">General</span></template>
      <template #body>
        <div class="flex flex-col gap-2">
          <div class="flex gap-2"> 
            <label for="text-edit">Text</label>
            <input id="text-edit" class="bg-slate-100 rounded" type="text" v-model="props.item.text">
          </div>

          <SelectorsDisplay  :display="currentClass.display" @update:display="value => updateClass('display', value)"></SelectorsDisplay>
         
          <SelectorsBackgroundColor :color="currentClass.backgroundColor" @update:color="value => updateClass('backgroundColor', value)"></SelectorsBackgroundColor>
          <SelectorsWidth  :width="currentClass.width" @update:width="value => updateClass('width', value)"></SelectorsWidth>
          <SelectorsHeight :height="currentClass.height" @update:height="value => updateClass('height', value)"></SelectorsHeight>
          <SelectorsPadding :padding="currentClass.padding" @update:padding="value => updateClass('padding', value)"></SelectorsPadding>
          <SelectorsMargin :margin="currentClass.margin" @update:margin="value => updateClass('margin', value)"></SelectorsMargin>
          <SelectorsSpacing :spacing="currentClass.spacing" @update:spacing="value => updateClass('spacing', value)"></SelectorsSpacing>
        </div>
        
      </template>
    </AccordionItem>

    <AccordionItem id="22">
      <template #head><span class="flex items-center">Typography</span></template>
      <template #body>
        <SelectorsTextColor :color="currentClass.textColor" @update:color="value => updateClass('textColor', value)"></SelectorsTextColor>
        <SelectorsFontSize :size="currentClass.fontSize" @update:size="value => updateClass('fontSize', value)"></SelectorsFontSize>
        <SelectorsFontFamily :family="currentClass.fontFamily" @update:family="value => updateClass('fontFamily', value)"></SelectorsFontFamily>
        <SelectorsFontWeight :weight="currentClass.fontWeight" @update:weight="value => updateClass('fontWeight', value)"></SelectorsFontWeight>
        <SelectorsLetterSpacing :spacing="currentClass.letterSpacing" @update:spacing="value => updateClass('letterSpacing', value)"></SelectorsLetterSpacing>
        <SelectorsLineHeight :height="currentClass.lineHeight" @update:height="value => updateClass('lineHeight', value)"></SelectorsLineHeight>
        <SelectorsTextAlign :align="currentClass.textAlign" @update:align="value => updateClass('textAlign', value)"></SelectorsTextAlign>
        <SelectorsTextVerticalAlign :align="currentClass.textVerticalAlign" @update:align="value => updateClass('textVerticalAlign', value)"></SelectorsTextVerticalAlign>
      </template>
    </AccordionItem>    

    <AccordionItem id="23">
      <template #head><span class="flex items-center">Borders</span></template>
      <template #body>
        <SelectorsBorderRadius :radius="currentClass.borderRadius"  @update:radius="value => updateClass('borderRadius', value)"></SelectorsBorderRadius>
        <SelectorsBorderWidth  :width="currentClass.borderWidth" @update:width="value => updateClass('borderWidth', value)"></SelectorsBorderWidth>
        <SelectorsBorderStyle :style="currentClass.borderStyle" @update:style="value => updateClass('borderStyle', value)"></SelectorsBorderStyle>
        <SelectorsBorderColor :color="currentClass.borderColor" @update:color="value => updateClass('borderColor', value)"></SelectorsBorderColor>
      </template>
    </AccordionItem> 

    <AccordionItem id="24">
      <template #head><span class="flex items-center">Shadows</span></template>
      <template #body>
        <SelectorsShadow :shadow="currentClass.shadow" @update:shadow="value => updateClass('shadow', value)"></SelectorsShadow>
        <SelectorsShadowColor :color="currentClass.shadowColor" @update:color="value => updateClass('shadowColor', value)"></SelectorsShadowColor>
      </template>
    </AccordionItem> 

    <AccordionItem id="25">
      <template #head><span class="flex items-center">Flex</span></template>
      <template #body>
        
        <SelectorsFlexDirection :direction="currentClass.flexDirection" @update:direction="value => updateClass('flexDirection', value)"></SelectorsFlexDirection>
        <SelectorsFlexWrap :wrap="currentClass.flexWrap" @update:wrap="value => updateClass('flexWrap', value)"></SelectorsFlexWrap>
        
        <SelectorsGap :gap="currentClass.gap" @update:gap="value => updateClass('gap', value)"></SelectorsGap>

        <SelectorsJustifyContent :justify="currentClass.justifyContent" @update:justify="value => updateClass('justifyContent', value)"></SelectorsJustifyContent>
        <SelectorsJustifyItems :justify="currentClass.justifyItems" @update:justify="value => updateClass('justifyItems', value)"></SelectorsJustifyItems>

        <SelectorsAlignContent :align="currentClass.alignContent" @update:align="value => updateClass('alignContent', value)"></SelectorsAlignContent>
        <SelectorsAlignItems :align="currentClass.alignItems" @update:align="value => updateClass('alignItems', value)"></SelectorsAlignItems>

        <SelectorsPlaceContent :place="currentClass.placeContent" @update:place="value => updateClass('placeContent', value)"></SelectorsPlaceContent>
        <SelectorsPlaceItems :place="currentClass.placeItems" @update:place="value => updateClass('placeItems', value)"></SelectorsPlaceItems>

      </template>
    </AccordionItem>

    <AccordionItem id="26">
      <template #head><span class="flex items-center">Self</span></template>
      <template #body>
        <SelectorsFlexBasis :basis="currentClass.flexBasis" @update:basis="value => updateClass('flexBasis', value)"></SelectorsFlexBasis>
        <SelectorsFlexShrinkGrow :shrinkGrow="currentClass.flexShrinkGrow" @update:shrinkGrow="value => updateClass('flexShrinkGrow', value)"></SelectorsFlexShrinkGrow>
        <SelectorsJustifySelf :justify="currentClass.justifySelf" @update:justify="value => updateClass('justifySelf', value)"></SelectorsJustifySelf>
        <SelectorsAlignSelf :align="currentClass.alignSelf" @update:align="value => updateClass('alignSelf', value)"></SelectorsAlignSelf>
        <SelectorsPlaceSelf :place="currentClass.placeSelf" @update:place="value => updateClass('placeSelf', value)"></SelectorsPlaceSelf>

      </template>
    </AccordionItem>
    
    <AccordionItem id="99">
      <template #head><span class="flex items-center">Others</span></template>
      <template #body>
        <SelectorsDivideColor :color="currentClass.divideColor" @update:color="value => updateClass('divideColor', value)"></SelectorsDivideColor>
        <SelectorsOutlineColor :color="currentClass.outlineColor" @update:color="value => updateClass('outlineColor', value)"></SelectorsOutlineColor>
        <SelectorsRingColor :color="currentClass.ringColor" @update:color="value => updateClass('ringColor', value)"></SelectorsRingColor>
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

const emit = defineEmits(['update:item', 'update:modifier'])

const currentClass = computed(() => props.item.currentClass ? props.item.currentClass : props.item.classes[0] )

function updateClass(className, value) {
  const newItem = {...props.item }
  newItem.currentClass[className] = value

  emit('update:item', newItem)
}
</script>