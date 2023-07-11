<template>
  <div>
    <ul class="flex flex-col pl-2">
      <div :class="itemClass" @click="emit('selected', item)">
        <span class="justify-self-start w-full">{{item.type}}</span>
        <div class="hidden group-hover:block group-focus:block">
          <div class="relative flex flex-row justify-self-end  pt-1">            
            <button 
              v-if="allowChild" 
              type="button" 
              class="text-white w-10 px-3 hover:text-white font-medium rounded-lg text-sm" 
              @click.stop="emit('update:add-child', item )">
              <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 122.88 119.8">
                <title>Add item</title>
                <path d="M23.59,0h75.7a23.63,23.63,0,0,1,23.59,23.59V96.21A23.64,23.64,0,0,1,99.29,119.8H23.59a23.53,23.53,0,0,1-16.67-6.93l-.38-.42A23.49,23.49,0,0,1,0,96.21V23.59A23.63,23.63,0,0,1,23.59,0ZM55.06,38.05a6.38,6.38,0,1,1,12.76,0V53.51H83.29a6.39,6.39,0,1,1,0,12.77H67.82V81.75a6.38,6.38,0,0,1-12.76,0V66.28H39.59a6.39,6.39,0,1,1,0-12.77H55.06V38.05ZM99.29,12.77H23.59A10.86,10.86,0,0,0,12.77,23.59V96.21a10.77,10.77,0,0,0,2.9,7.37l.28.26A10.76,10.76,0,0,0,23.59,107h75.7a10.87,10.87,0,0,0,10.82-10.82V23.59A10.86,10.86,0,0,0,99.29,12.77Z"/>
              </svg>
            </button>
            <button type="button" class="text-white w-10 px-3 hover:text-white font-medium rounded-lg text-sm"  @click.stop="emit('update:remove', item )">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <title>Delete item</title>
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>
              
            </button>
          </div>
          
        </div>
      </div>
      <li v-if="item.children.length > 0" v-for="child in item.children">
        <ItemTree :item="child"
          @update:add-child="value => emit('update:add-child', value)"
          @update:remove="value=>emit('update:remove', value)"
          @selected="value=>emit('selected', value)"
          ></ItemTree>
      </li>
    </ul>
  </div>
</template>
<script setup>
  import { selfClosingTags } from '@/lib/typeList.js'

  const emit = defineEmits(['update:add-child', 'update:remove', 'selected'])

  const props = defineProps({
    item: {
      type: Object
    }
  })

  const allowChild = computed(() => !selfClosingTags.includes(props.item.type) && !props.item.isComponent)
  const selected = computed(() => props.item.isSelected ? 'bg-slate-400 text-white' : 'bg-slate-100 text-black' )
  const itemClass = computed(() => `flex ${selected.value} pl-1 hover:bg-slate-600 hover:text-slate-200 w-full group focus:bg-slate-300`)
</script>