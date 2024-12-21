<template>
  <div class="flex gap-1 align-center">
    <label for="tags" class="text-slate-900 dark:text-white">Type</label>
    <select id="tags" v-model="selectedTag" class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full  dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500">
      <option v-for="option in typeList" :value="option.name">&lt;{{option.name}}&gt;</option>
    </select>
  </div>
  
</template>

<script setup>
  const props = defineProps({
    type: {
      type: String
    },
    typeList: {
      type: Array,
    }
  })
  const emit = defineEmits(['update:type'])

  const selectedTag = computed({
    get() {
      return props.type
    },
    set(value) {
      emit('update:type', value)
    }
  })
</script>