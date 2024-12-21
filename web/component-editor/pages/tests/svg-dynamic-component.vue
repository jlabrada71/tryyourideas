<script setup>
  import { typeList } from '@/lib/typeList.js'

  const needResolve = typeList.filter(type => type.needsResolve)
  const resolvedComponents = {}
  resolvedComponents['Icon'] = resolveComponent('Icon')
  const compName = ref('Icon')
  const comp = computed(() => resolvedComponents['Icon'])
  // needResolve.forEach(type => {
  //   console.log('Resolving ' + type.name)
  //   resolvedComponents[type.name] = resolveComponent(type.name)
  // })
  
</script>
  
<template>
  <div>
    dynamic component 2
    <component :is="comp" 
      class="fill-blue-400 bg-yellow-100 hover:bg-yellow-400" 
      type="regular" 
      name="chess-rook" />
  </div>
</template>