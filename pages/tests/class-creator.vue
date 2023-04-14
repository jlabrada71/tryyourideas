<template>
<DivClassGenerator :tags="fontSizeTags" :values="fontSizes"></DivClassGenerator>
<!-- <DivClassGenerator :tags="sizeTags" :values="sizeValues"></DivClassGenerator> -->
<!-- <div>
  <div v-for="name in colorNames" class="flex">
    &lt;div class="flex h-8"&gt;  &lt;div class="w-24"&gt;{{name}}&lt;/div&gt; <br>
    <div v-for="cl in colorValues" class="'w-80 h-8">&lt;div class="w-8 h-8 bg-{{name}}-{{cl}} text-{{name}}-{{cl}} border-{{name}}-{{cl}} divide-{{name}}-{{cl}} ring-{{name}}-{{cl}} outline-{{name}}-{{cl}} shadow-{{name}}-{{cl}}"&gt; &lt;/div&gt;</div>
    &lt;/div&gt;
  </div>
</div> -->
  <!-- <div>
    <div v-for="modifier in modifiers">
      <div v-for="name in colorNames" class="flex">
        &lt;div class="flex h-8"&gt;  &lt;div class="w-24"&gt;{{name}}&lt;/div&gt; <br>
        <div v-for="cl in colorValues" class="'w-80 h-8">&lt;div class="w-8 h-8 {{modifier}}:bg-{{name}}-{{cl}} {{modifier}}:text-{{name}}-{{cl}} {{modifier}}:border-{{name}}-{{cl}} {{modifier}}:divide-{{name}}-{{cl}} {{modifier}}:ring-{{name}}-{{cl}} {{modifier}}:outline-{{name}}-{{cl}} {{modifier}}:shadow-{{name}}-{{cl}}"&gt; &lt;/div&gt;</div>
        &lt;/div&gt;
      </div>
    </div>
  </div> -->
</template>
<script setup>
  import { ref } from 'vue'

  const props = defineProps(['color'])
  const emit = defineEmits(['update:color'])

  const colorNames = ref(['slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 
'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'])
  const colorValues = ref([50, 100, 200, 300, 400, 500, 600, 700, 800, 900])

  const shadowValues =  ["sm", "md", "lg", "xl", "2xl", "inner", "none" ]
  
  const fontSizeTags = ['text']
  const fontSizes = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl']

  const sizeTags = ['w', 'h']
  const sizeValues = ['0', 'px', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', '40', '44', '48', '52', '56', '60', '64', '72', '80', '96', 
                 '1/2', 
                 '1/3', '2/3', 
                 '1/4', '2/4', '3/4', 
                 '1/5', '2/5', '3/5', '4/5', 
                 '1/6', '2/6', '3/6', '4/6', '5/6', 
                 '1/12', '2/12', '3/12', '4/12', '5/12', '6/12', '7/12', '8/12', '9/12', '10/12', '11/12', 
                 'auto', 'full', 'screen', 'min', 'max', 'fit']

</script>