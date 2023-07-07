<template>
  <SelectorsModifier :modifier="currentClass.modifier" @update:modifier="value => emit('update:modifier', value)">Select Modifier</SelectorsModifier>
  <div id="item-style-accordion-open" data-accordion="collapse" class="bg-white">
    <AccordionItem id="21">
      <template #head><span class="flex items-center">Main</span></template>
      <template #body>
        <div class="flex flex-col gap-1">
          <div class="flex gap-1"> 
            <label for="text-edit">Text</label>
            <input id="text-edit" class="bg-slate-100 w-52 rounded" type="text" v-model="props.item.text">
          </div>
          <SelectorsDisplay  :display="currentClass.display" @update:display="value => updateClass('display', value)"></SelectorsDisplay>
          <SelectorsBackgroundColor :color="currentClass.backgroundColor" @update:color="value => updateClass('backgroundColor', value)"></SelectorsBackgroundColor>
          <SelectorsWidth  :width="currentClass.width" @update:width="value => updateClass('width', value)"></SelectorsWidth>
          <SelectorsHeight :height="currentClass.height" @update:height="value => updateClass('height', value)"></SelectorsHeight>
          <SelectorsMultiPaddingSelect 
            :top="currentClass.paddingTop"
            :left="currentClass.paddingLeft"
            :right="currentClass.paddingRight"
            :bottom="currentClass.paddingBottom"
            @update:values="values => updatePaddings(values)">
          </SelectorsMultiPaddingSelect>
          <SelectorsMultiMarginSelect 
            :top="currentClass.marginTop"
            :left="currentClass.marginLeft"
            :right="currentClass.marginRight"
            :bottom="currentClass.marginBottom"
            @update:values="values => updateMargins(values)">
          </SelectorsMultiMarginSelect>
          <!-- <SelectorsSpacing :spacing="currentClass.spacing" @update:spacing="value => updateClass('spacing', value)"></SelectorsSpacing> -->
          <SelectorsMultiSpacingSelect 
            :top="currentClass.spacingY"
            :left="currentClass.spacingX"
            right=""
            bottom=""
            @update:values="values => updateSpacings(values)">
          </SelectorsMultiSpacingSelect>
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
        <SelectorsAlignItems :align="currentClass.alignItems" tag="items" @update:align="value => updateClass('alignItems', value)"></SelectorsAlignItems>

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

    <AccordionItem id="27">
      <template #head><span class="flex items-center">Transitions</span></template>
      <template #body>
        <SelectorsTransition :transition="currentClass.transition" @update:transition="value => updateClass('transition', value)"></SelectorsTransition>
        <SelectorsTransitionDuration :transition="currentClass.transitionDuration" @update:transition="value => updateClass('transitionDuration', value)"></SelectorsTransitionDuration>
        <SelectorsTransitionDelay :transition="currentClass.transitionDelay" @update:transition="value => updateClass('transitionDelay', value)"></SelectorsTransitionDelay>
        <SelectorsTransitionTiming :transition="currentClass.transitionTiming" @update:transition="value => updateClass('transitionTiming', value)"></SelectorsTransitionTiming>
        <SelectorsAnimation :animation="currentClass.animation" @update:animation="value => updateClass('animation', value)"></SelectorsAnimation>
        
      </template>
    </AccordionItem>
    <AccordionItem id="28">
      <template #head><span class="flex items-center">Transform</span></template>
      <template #body>
        <SelectorsTransformScale :transform="currentClass.transformScale" @update:transform="value => updateClass('transformScale', value)"></SelectorsTransformScale>
        <SelectorsTransformRotate :transform="currentClass.transformRotate" @update:transform="value => updateClass('transformRotate', value)"></SelectorsTransformRotate>
        <SelectorsTransformTranslate :transform="currentClass.transformTranslate" @update:transform="value => updateClass('transformTranslate', value)"></SelectorsTransformTranslate>
        <SelectorsTransformSkew :transform="currentClass.transformSkew" @update:transform="value => updateClass('transformSkew', value)"></SelectorsTransformSkew>
        <SelectorsTransformOrigin :transform="currentClass.transformOrigin" @update:transform="value => updateClass('transformOrigin', value)"></SelectorsTransformOrigin>
      </template>
    </AccordionItem>

    <AccordionItem id="29">
      <template #head><span class="flex items-center">Background Gradient</span></template>
      <template #body>
        <SelectorsGradientDirection :direction="currentClass.gradientDirection" @update:direction="value => updateClass('gradientDirection', value)"></SelectorsGradientDirection>
        <SelectorsGradientFromColor :color="currentClass.gradientFromColor" @update:color="value => updateClass('gradientFromColor', value)"></SelectorsGradientFromColor>
        <SelectorsGradientViaColor :color="currentClass.gradientViaColor" @update:color="value => updateClass('gradientViaColor', value)"></SelectorsGradientViaColor>
        <SelectorsGradientToColor :color="currentClass.gradientToColor" @update:color="value => updateClass('gradientToColor', value)"></SelectorsGradientToColor>
       
      </template>
    </AccordionItem>
    
    <AccordionItem id="99">
      <template #head><span class="flex items-center">Others</span></template>
      <template #body>
        <SelectorsDivideColor :color="currentClass.divideColor" @update:color="value => updateClass('divideColor', value)"></SelectorsDivideColor>
        <SelectorsOutlineColor :color="currentClass.outlineColor" @update:color="value => updateClass('outlineColor', value)"></SelectorsOutlineColor>
        <SelectorsRingColor :color="currentClass.ringColor" @update:color="value => updateClass('ringColor', value)"></SelectorsRingColor>
        <SelectorsFillColor :color="currentClass.fillColor" @update:color="value => updateClass('fillColor', value)"></SelectorsFillColor>
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
  console.log(`updating "${className}" to "${value}" as ${newItem.currentClass[className]}`)

  emit('update:item', newItem)
}

function updateMargins(values) {
  if (values.A) {
    updateClass('marginTop', values.A)
    updateClass('marginLeft', 'unset')
    updateClass('marginRight',  'unset')
    updateClass('marginBottom',  'unset')
  }
  if (values.Y) {
    updateClass('marginTop', values.Y)
    updateClass('marginLeft', values.X)
    updateClass('marginRight',  'unset')
    updateClass('marginBottom',  'unset')
  }
  if (values.T) {
    updateClass('marginTop', values.T)
    updateClass('marginLeft', values.L)
    updateClass('marginRight', values.R)
    updateClass('marginBottom', values.B)
  }
}

function updatePaddings(values) {
  if (values.A) {
    updateClass('paddingTop', values.A)
    updateClass('paddingLeft', 'unset')
    updateClass('paddingRight',  'unset')
    updateClass('paddingBottom',  'unset')
  }
  if (values.Y) {
    updateClass('paddingTop', values.Y)
    updateClass('paddingLeft', values.X)
    updateClass('paddingRight',  'unset')
    updateClass('paddingBottom',  'unset')
  }
  if (values.T) {
    updateClass('paddingTop', values.T)
    updateClass('paddingLeft', values.L)
    updateClass('paddingRight', values.R)
    updateClass('paddingBottom', values.B)
  }
}

function updateSpacings(values) {
  updateClass('spacingY', values.Y)
  updateClass('spacingX', values.X)
}
</script>