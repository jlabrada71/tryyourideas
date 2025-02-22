<template>
    <div class="bg-slate-100 w-full h-auto flex-row justify-center from-unset to-unset flex ">
        <div class="bg-slate-200 w-1/3 h-96 m-20 items-center flex-col justify-center bg-gradient-to-br from-yellow-100 to-yellow-500 flex ">
            <span class="bg-transparent w-auto h-auto p-5 flex-row text-5xl font-bold font-sans flex ">
                {{message}}
            </span>
            <span class="bg-transparent w-auto h-auto p-5 flex-row text-2xl font-bold font-sans flex ">
              {{result}}
          </span>
            <button @click="goHomePage" type="button" class="bg-slate-200 w-32 h-10 rounded-full flex-row text-xl font-bold bg-gradient-to-r from-fuchsia-300 to-cyan-300 shadow-md block hover:bg-slate-200 hover:w-32 hover:h-10 hover:rounded-full hover:flex-row hover:text-xl hover:font-bold hover:bg-gradient-to-r hover:from-fuchsia-300 hover:to-cyan-400 hover:shadow-none hover:block ">
                Home Page
            </button>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    message: {
        type: String
    }, 
    result: {
        type: String
    }

})

function goHomePage() {
  const router = useRouter()
  router.push('/')
}

</script>