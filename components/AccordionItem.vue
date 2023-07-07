<template>
  <h2 :id="headingId">
    <button type="button" class="flex items-center justify-between w-full h-10 p-2 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" :data-accordion-target="targetId" aria-expanded="true" :aria-controls="bodyId">
      <span class="flex items-center"><slot name="head"></slot></span>
      <svg data-accordion-icon class="w-6 h-6 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>
  </h2>
  <div :id="bodyId" class="hidden" :aria-labelledby="headingId">
    <div class="p-2 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue'
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
    id: {
      type: String
    }
  })

  const headingId = computed(() => `accordion-open-heading-${props.id}`)
  const bodyId = computed(() => `accordion-open-body-${props.id}`)
  const targetId = computed(() => `#accordion-open-body-${props.id}`)

</script>