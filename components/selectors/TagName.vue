<template>
  <div class="flex gap-1 align-center">
    <label for="tags" class="text-slate-900 dark:text-white">Type</label>
    <select id="tags" v-model="selectedTag" class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full  dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500">
      <option v-for="option in typeList" :value="option.name">&lt;{{option.name}}&gt;</option>
      <!-- <option value="h1">&lt;h1&gt;</option>
      <option value="span">&lt;span&gt;</option>
       <option value="p">&lt;p&gt;</option>
      <option value="form">&lt;form&gt;</option>
      <option value="input">&lt;input&gt;</option>
      <option value="img">&lt;img&gt;</option>
      <option value="picture">&lt;picture&gt;</option>
      <option value="audio">&lt;audio&gt;</option>
      <option value="video">&lt;video&gt;</option>
      <option value="source">&lt;source&gt;</option>
      <option value="header">&lt;header&gt;</option>
      <option value="main">&lt;main&gt;</option>
      <option value="section">&lt;section&gt;</option>
      <option value="article">&lt;article&gt;</option>
      <option value="aside">&lt;aside&gt;</option>
      <option value="footer">&lt;footer&gt;</option>
      <option value="template">&lt;template&gt;</option> -->
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