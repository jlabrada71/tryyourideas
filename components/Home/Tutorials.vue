<template>
  <div class="bg-slate-100 rounded-xl p-4">
    <h1 class="font-bold text-3xl">Tutorials</h1>
    <div class="bg-slate-200 w-full h-64 p-5 flex-row flex-wrap flex gap-4 rounded-xl">
      <HomeTutorialItem 
        title="How to create simple gradients" 
        url="https://www.youtube.com/watch?v=4ZQ8p-kZQA8&t=81s"
        image="/images/gradient-tutorial.png">
      </HomeTutorialItem>
      <HomeTutorialItem 
        title="How to create a responsive component" 
        url="https://www.youtube.com/watch?v=Q7K64NZioIY"
        image="/images/responsive-tutorial.png">
      </HomeTutorialItem>
      <HomeTutorialItem 
        title="How to create a text gradient" 
        url="https://www.youtube.com/watch?v=MiRSLI9VUfQ"
        image="/images/text-gradient.png">
      </HomeTutorialItem>
      <HomeTutorialItem 
        title="How to bind properties (coming soon)" 
        url=""
        image="logo.png">
      </HomeTutorialItem>
      
    </div>
  </div>
</template>
<script setup>
const props = defineProps({})
const emit = defineEmits([])
</script>
