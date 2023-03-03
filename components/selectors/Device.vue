
<template>
  <div class="border-b border-gray-200 dark:border-gray-700">
    <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
      <TabTitle :active="props.device=='any'" @update:active="activate('any')">
        <svg aria-hidden="true" class="w-5 h-5 mr-2 text-inherit-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 86.686" enable-background="new 0 0 122.88 86.686" xml:space="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M53.995,73.994h25.399c0.064,4.396,1.872,8.325,6.783,11.429H47.22 C51.14,82.576,54.013,79.116,53.995,73.994L53.995,73.994L53.995,73.994L53.995,73.994z M41.118,30.451v53.131 c0,1.012-0.829,1.841-1.84,1.841H1.841C0.829,85.423,0,84.594,0,83.582V30.451c0-1.011,0.829-1.84,1.841-1.84h37.432 C40.289,28.611,41.118,29.439,41.118,30.451L41.118,30.451L41.118,30.451z M20.557,79.303c1.164,0,2.11,0.945,2.11,2.109 s-0.946,2.11-2.11,2.11s-2.11-0.946-2.11-2.11C18.452,80.248,19.393,79.303,20.557,79.303L20.557,79.303L20.557,79.303z M38.622,31.895v45.537H2.755V31.895H38.622L38.622,31.895L38.622,31.895z M102.54,44.215h15.942c1.213,0,2.32,0.495,3.109,1.29 c0.8,0.801,1.288,1.902,1.288,3.109v33.673c0,1.214-0.494,2.321-1.288,3.109c-0.802,0.802-1.902,1.289-3.109,1.289H102.54 c-1.214,0-2.321-0.494-3.109-1.289c-0.801-0.8-1.289-1.901-1.289-3.109V48.608c0-1.214,0.494-2.321,1.289-3.11 C100.231,44.698,101.326,44.215,102.54,44.215L102.54,44.215L102.54,44.215z M99.657,80.576h21.701V49.012H99.657V80.576 L99.657,80.576z M110.505,81.952c0.995,0,1.808,0.801,1.808,1.808c0,0.996-0.801,1.809-1.808,1.809 c-0.995,0-1.809-0.801-1.809-1.809C108.696,82.766,109.497,81.952,110.505,81.952L110.505,81.952L110.505,81.952z M17.5,0h97.411 c1.542,0,2.8,1.257,2.8,2.8v31.73h-3.976V6.268c0-1.359-1.11-2.479-2.479-2.479H21.145l0,0c-1.359,0-2.479,1.11-2.479,2.479v16.178 H14.7V2.8C14.7,1.257,15.958,0,17.5,0L17.5,0L17.5,0L17.5,0z M47.03,60.417h45.478v9.713H47.03V60.417L47.03,60.417z"/></g></svg>
        any
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