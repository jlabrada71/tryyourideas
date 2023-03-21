<template>
  <div>
    <ul class="flex flex-col pl-3">
      <div :class="itemClass" @click="emit('selected', item)">
        <span class="justify-self-start w-full">{{item.type}}</span>
        <div class="hidden group-hover:block group-focus:block">
          <div class="flex flex-row justify-self-end gap-1">            
            <button type="button" class="text-white bg-red-600 w-5 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"  @click.stop="emit('update:remove', item )">-</button>
            <button type="button" class="text-white bg-blue-700 w-5 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" @click.stop="emit('update:add-child', item )">+</button>
          </div>
        </div>
      </div>
      <li v-if="item.children.length > 0" v-for="child in item.children">
        <TreeItem :item="child"
          @update:add-child="value => emit('update:add-child', value)"
          @update:remove="value=>emit('update:remove', value)"
          @selected="value=>emit('selected', value)"
          ></TreeItem>
      </li>
    </ul>
  </div>
</template>
<script setup>
  const emit = defineEmits(['update:add-child', 'update:remove', 'selected'])

  const props = defineProps({
    item: {
      type: Object
    }
  })

  const selected = computed(() => props.item.isSelected ? 'bg-slate-400 text-white' : 'bg-slate-100 text-black' )
  const itemClass = computed(() => `flex ${selected.value} hover:bg-slate-300 w-full group focus:bg-slate-300`)
</script>