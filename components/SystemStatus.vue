<template>
  <div id="id-15" class="bg-slate-100 w-full h-10 items-center flex-row justify-end flex gap-2 ">
    <div id="id-15-1" class="bg-slate-200 px-2 items-center flex-row flex ">
      <span id="id-15-1-1" class="bg-slate-200 flex-row flex ">
        Project:
      </span>
      <span id="id-15-1-2" class="bg-slate-200 px-2 flex-row font-bold flex ">
        {{project}}
      </span>
    </div>
    <div id="id-15-2" class="bg-slate-200 px-2 flex-row flex ">
      <span id="id-15-2-1" class="bg-slate-200 flex-row flex ">
        Licence:
      </span>
      <span id="id-15-2-2" class="bg-slate-200 px-2 flex-row font-bold flex ">
        {{licence}}
      </span>
    </div>
    <div id="id-15-3" class="bg-slate-200 px-2 flex-row flex ">
      <span id="id-15-3-1" class="bg-slate-200 flex-row flex ">
        User:
      </span>
      <span id="id-15-3-2" class="bg-slate-200 px-2 flex-row font-bold flex ">
        {{name}}
      </span>
    </div>
    <div id="id-15-3" class="bg-slate-200 px-2 flex-row flex ">
      <span id="id-15-3-1" class="bg-slate-200 flex-row flex ">
        Email:
      </span>
      <span id="id-15-3-2" class="bg-slate-200 px-2 flex-row font-bold flex ">
        {{email}}
      </span>
    </div>
    <button id="id-15-4" type="button" class="bg-slate-200 w-auto h-10 mx-4 py-2 px-4 self-end rounded-full flex-row flex hover:bg-slate-300 hover:w-auto hover:h-10 hover:py-2 hover:px-4 hover:rounded-full hover:flex-row hover:flex ">
      Logout
    </button>
  </div>
</template>
<script setup>
const props = defineProps({
    name: {
        type: String
    },
    licence: {
        type: String
    },
    project: {
        type: String
    },
    email: {
        type: String
    }

})
</script>