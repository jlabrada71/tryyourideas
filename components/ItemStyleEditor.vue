<template>
  <SelectorsModifier :modifier="currentClass.modifier" @update:modifier="value => emit('update:modifier', value)">Select Modifier</SelectorsModifier>
  <div id="item-style-accordion-open" data-accordion="collapse" class="bg-white">
    
    <StyleEditorMainSection id="21"
      :cls="currentClass" 
      :text="props.item.text"
      @update:cls="val => updateClass(val.name, val.value)"
      @update:text="val => updateText(val)">
    </StyleEditorMainSection>

    <StyleEditorTypographySection id="22" 
      :cls="currentClass" 
      @update:cls="val => updateClass(val.name, val.value)">
    </StyleEditorTypographySection>

    <StyleEditorBordersSection id="23"
      :cls="currentClass" 
      @update:cls="val => updateClass(val.name, val.value)">
    </StyleEditorBordersSection>

    <StyleEditorEffectsSection id="24"
      :cls="currentClass" 
      @update:cls="val => updateClass(val.name, val.value)">
    </StyleEditorEffectsSection>

    <StyleEditorFlexSection id="25"
      :cls="currentClass" 
      @update:cls="val => updateClass(val.name, val.value)">
    </StyleEditorFlexSection>

    <StyleEditorSelfSection id="26"
      :cls="currentClass" 
      @update:cls="val => updateClass(val.name, val.value)">
    </StyleEditorSelfSection>

    <StyleEditorTransformSection id="28"
      :cls="currentClass" 
      @update:cls="val => updateClass(val.name, val.value)">
    </StyleEditorTransformSection>

    <StyleEditorGradientSection id="29"
      :cls="currentClass" 
      @update:cls="val => updateClass(val.name, val.value)">
    </StyleEditorGradientSection>

    <StyleEditorBackgroundSection id="30"
      :cls="currentClass" 
      @update:cls="val => updateClass(val.name, val.value)">
    </StyleEditorBackgroundSection>

    <StyleEditorOthersSection id="99"
      :cls="currentClass" 
      @update:cls="val => updateClass(val.name, val.value)">
    </StyleEditorOthersSection>

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
  const newItem = { ...props.item }
  newItem.currentClass[className] = value
  console.log(`updating "${className}" to "${value}" as ${newItem.currentClass[className]}`)

  emit('update:item', newItem)
}

function updateText(text) {
  const newItem = { ...props.item }
  newItem.text = text
  emit('update:item', newItem)
}

</script>