<template>
  <div class="bg-slate-100 w-full h-10 items-center flex-row justify-end flex gap-2 ">
    <div class="bg-slate-200 px-2 items-center flex-row flex ">
      <span class="bg-slate-200 flex-row flex ">
        Project:
      </span>
      <span class="bg-slate-200 px-2 flex-row font-bold flex ">
        {{project}}
      </span>
    </div>
    <div class="bg-slate-200 px-2 flex-row flex ">
      <span class="bg-slate-200 flex-row flex ">
        Licence:
      </span>
      <span class="bg-slate-200 px-2 flex-row font-bold flex ">
        {{licence}}
      </span>
    </div>
    <div class="bg-slate-200 px-2 flex-row flex ">
      <span class="bg-slate-200 flex-row flex ">
        User:
      </span>
      <span class="bg-slate-200 px-2 flex-row font-bold flex ">
        {{name}}
      </span>
    </div>
    <div class="bg-slate-200 px-2 flex-row flex ">
      <span class="bg-slate-200 flex-row flex ">
        Email:
      </span>
      <span class="bg-slate-200 px-2 flex-row font-bold flex ">
        {{visualEmail}}
      </span>
    </div>
    <button type="button" class="bg-slate-200 w-auto h-10 mx-4 py-2 px-4 self-end rounded-full flex-row flex hover:bg-slate-300 hover:w-auto hover:h-10 hover:py-2 hover:px-4 hover:rounded-full hover:flex-row hover:flex ">
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

const visualEmail = computed(() => props.email.endsWith('fakemail.com') ? 'unset': props.email )
</script>