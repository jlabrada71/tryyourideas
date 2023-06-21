<template> 
  <div>
    <InputListWithTag :options="borderRadius" :option="radius" tag="rounded" @update:option="value=>emit('update:radius', value)">
      <h1 class="m-2 w-20">Radius: </h1>
    </InputListWithTag>
  </div>
</template>
<script setup>
  const props = defineProps(['radius'])
  const emit = defineEmits(['update:radius'])

  const borderRadius = ['unset', "none", "sm", "md", "lg", "xl", "2xl", "3xl", "full", "t-none", "t-sm", "t-md", "t-lg", "t-xl", "t-2xl", "t-3xl", "t-full", "r-none", "r-sm", "r-md", "r-lg", "r-xl", "r-2xl", "r-3xl", "r-full", "b-none", "b-sm", "b-md", "b-lg", "b-xl", "b-2xl", "b-3xl", "b-full", "l-none", "l-sm", "l-md", "l-lg", "l-xl", "l-2xl", "l-3xl", "l-full", "tl-none	", "tl-sm	", "tl-md	", "tl-lg	", "tl-xl	", "tl-2xl	", "tl-3xl	", "tl-full	", "tr-none	", "tr-sm	", "tr-md	", "tr-lg	", "tr-xl	", "tr-2xl	", "tr-3xl	", "tr-full	", "br-none	", "br-sm	", "br-md	", "br-lg	", "br-xl	", "br-2xl	", "br-3xl	", "br-full	", "bl-none	", "bl-sm	", "bl-md	", "bl-lg	", "bl-xl	", "bl-2xl	", "bl-3xl	", "bl-full" ]

</script>

