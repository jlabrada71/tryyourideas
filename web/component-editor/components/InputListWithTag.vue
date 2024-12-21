<template>
  <div class="flex items-baseline">
    <slot></slot><InputList v-model:option="untagOption" :options="props.options"></InputList>
  </div>
</template>
<script setup>
  import { removeTag, taggedValue } from '@/lib/ValueUtils.js'

  const emit = defineEmits(['update:option'])
  const props = defineProps({
    options:  { type: Array, required: true },
    option: { type: String },
    tag: { type: String }
  })

  const untagOption = computed( {
    get() {
      return removeTag(props.option, props.tag)
    }, 
    set(value) {
      emit('update:option', taggedValue(value, props.tag))
    }
  })
</script>