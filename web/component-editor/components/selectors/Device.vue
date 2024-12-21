
<template>
  <div class="border-b border-gray-200 dark:border-gray-700">
    <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
      <TabTitle :active="props.device=='any'" @update:active="activate('any')">
        <svg aria-hidden="true" class="w-5 h-5 mr-2 text-inherit-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 64C0 28.7 28.7 0 64 0H256c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm64 96v64c0 17.7 14.3 32 32 32H224c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32H96c-17.7 0-32 14.3-32 32zM80 352a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm24 56a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zm56-56a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm24 56a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zm56-56a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm24 56a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zM128 48c-8.8 0-16 7.2-16 16s7.2 16 16 16h64c8.8 0 16-7.2 16-16s-7.2-16-16-16H128z"/></svg>
        xs
      </TabTitle>
      <TabTitle :active="props.device=='sm'"  @update:active="activate('sm')">
        <svg aria-hidden="true" class="w-5 h-5 mr-2text-inherit-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 40 130" enable-background="new 0 0 40 130"  xml:space="preserve"><path fill-rule="evenodd" clip-rule="evenodd" class="cls-1" d="M13.33,0H57A13.37,13.37,0,0,1,70.34,13.33v96.22A13.37,13.37,0,0,1,57,122.88H13.33A13.35,13.35,0,0,1,0,109.54V13.33A13.35,13.35,0,0,1,13.33,0ZM35.16,108.37a5.46,5.46,0,1,1-5.45,5.46,5.47,5.47,0,0,1,5.45-5.46Zm31.34-4.19V16.75H3.83v87.43Z"/></svg>
        sm
      </TabTitle>
      <TabTitle :active="props.device=='md'"  @update:active="activate('md')">
        <svg aria-hidden="true" class="w-5 h-5 mr-2 text-inherit-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 88.65 122.88" enable-background="new 0 0 88.65 122.88" xml:space="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" class="st0" d="M88.65,3.62v115.63c0,1.99-1.63,3.62-3.62,3.62H3.62c-1.99,0-3.62-1.63-3.62-3.62V3.62C0,1.63,1.63,0,3.62,0 h81.4C87.02,0,88.65,1.63,88.65,3.62L88.65,3.62z M44.32,109.86c2.29,0,4.15,1.86,4.15,4.15c0,2.29-1.86,4.15-4.15,4.15 c-2.29,0-4.15-1.86-4.15-4.15C40.18,111.72,42.03,109.86,44.32,109.86L44.32,109.86z M83.74,6.46v98.75H5.42V6.46H83.74L83.74,6.46 z"/></g></svg>
        md
      </TabTitle>
      <TabTitle :active="props.device=='lg'"  @update:active="activate('lg')">
        <svg aria-hidden="true" class="w-5 h-5 mr-2 text-inherit-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 70.51" xml:space="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" class="st0" d="M2.54,65.44h12.59c-0.93-0.24-1.63-1.1-1.63-2.1V2.17C13.5,0.98,14.48,0,15.67,0h90.97 c1.19,0,2.17,0.98,2.17,2.17v61.16c0,1.01-0.69,1.86-1.63,2.1h13.16c1.4,0,2.54,1.14,2.54,2.54v0c0,1.4-1.14,2.54-2.54,2.54H2.54 c-1.4,0-2.54-1.14-2.54-2.54v0C0,66.58,1.14,65.44,2.54,65.44L2.54,65.44z M17.21,3.4h88.19v59.32H17.21V3.4L17.21,3.4z M57.87,66.39h7.14c0.67,0,1.22,0.55,1.22,1.22l0,0c0,0.67-0.55,1.22-1.22,1.22h-7.14c-0.67,0-1.22-0.55-1.22-1.22l0,0 C56.65,66.93,57.2,66.39,57.87,66.39L57.87,66.39z"/></g></svg>    
        lg
      </TabTitle>   
      <TabTitle :active="props.device=='xl'"  @update:active="activate('xl')">
        <svg  aria-hidden="true" class="w-5 h-5 mr-2 text-inherit-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  viewBox="0 0 122.88 101.9"><path fill-rule="evenodd" clip-rule="evenodd" class="cls-1" d="M3.34,0h116.2a3.35,3.35,0,0,1,3.34,3.34v77a3.35,3.35,0,0,1-3.34,3.34H3.34A3.35,3.35,0,0,1,0,80.32v-77A3.35,3.35,0,0,1,3.34,0Zm43,88.27h30.3c.08,5.24,2.24,9.94,8.09,13.63H38.2c4.68-3.39,8.11-7.51,8.09-13.63Zm-39-83.5H115.56a3,3,0,0,1,3,3V68a3,3,0,0,1-3,3H7.33a3,3,0,0,1-2.95-3V7.72a3,3,0,0,1,3-2.95Z"/></svg>
        xl
      </TabTitle>
      <!-- <TabTitle :active="props.device=='xl'"  @update:active="activate('2xl')">
        2xl
      </TabTitle> -->
      <!-- <TabTitle :active="props.device=='2xl'"  @update:active="activate('2xl')">
        <svg  aria-hidden="true" class="w-5 h-5 mr-2 text-inherit-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 101.9"><path fill-rule="evenodd" clip-rule="evenodd" class="cls-1" d="M3.34,0h116.2a3.35,3.35,0,0,1,3.34,3.34v77a3.35,3.35,0,0,1-3.34,3.34H3.34A3.35,3.35,0,0,1,0,80.32v-77A3.35,3.35,0,0,1,3.34,0Zm43,88.27h30.3c.08,5.24,2.24,9.94,8.09,13.63H38.2c4.68-3.39,8.11-7.51,8.09-13.63Zm-39-83.5H115.56a3,3,0,0,1,3,3V68a3,3,0,0,1-3,3H7.33a3,3,0,0,1-2.95-3V7.72a3,3,0,0,1,3-2.95Z"/></svg>
        2xl
      </TabTitle>   -->
    </ul>
  </div>    
</template>

<script setup>
  import { ref, watch } from 'vue'

  const props = defineProps({
    device: {
      type: String
    }
  })

  const emit = defineEmits(['update:device'])


  function activate(tab) {

    emit('update:device', tab)
  }

</script>