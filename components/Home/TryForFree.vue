<template>
    <div  class="bg-unset flex-row flex ">
        <a @click="emit('click')" class="bg-slate-200 h-14 items-center rounded-full flex-row text-3xl font-bold bg-gradient-to-r from-cyan-300 to-fuchsia-300 shadow-md shadow-slate-300 flex hover:bg-slate-200 hover:h-14 hover:items-center hover:rounded-full hover:flex-row hover:text-3xl hover:font-bold hover:bg-gradient-to-r hover:from-cyan-400 hover:to-fuchsia-400 hover:shadow-slate-300 hover:flex active:bg-slate-200 active:h-14 active:items-center active:rounded-full active:flex-row active:text-3xl active:font-bold active:bg-gradient-to-r active:from-cyan-500 active:to-fuchsia-500 active:shadow-none active:shadow-slate-300 active:flex ">
            <span class="bg-unset h-10 px-4 flex-row from-unset to-unset flex hover:bg-unset hover:h-10 hover:px-4 hover:flex-row hover:from-unset hover:to-unset hover:flex ">
                Get Started
            </span>
        </a>
    </div>
</template>
<script setup>

const emit = defineEmits(['click'])

</script>
