<template>
    <HomeSignInForm @update:session="value => emit('update:session', value)"></HomeSignInForm>
    <HomeSignUpForm @update:user="value => emit('update:user', value)"></HomeSignUpForm>
    <div class="flex flex-row">
      <div class="p-3 flex flex-row gap-4">
        <img src="/logo.png" width="50px" alt="Try Your Ideas Logo"><h1 class="w-96 text-3xl font-semibold">TryYourIdeas</h1>
      </div>
      
      <div id="id-6" class="flex flex-row gap-4 justify-end my-3 mx-10 bg-transparent w-full h-10 ">
          <button id="id-6-1" data-modal-target="signInForm" data-modal-toggle="signInForm" class=" flex flex-row bg-inherit h-8 hover:flex hover:flex-row hover:bg-inherit hover:h-8 hover:rounded-none hover:border-b-4 hover:border-solid hover:border-slate-700 ">
              <span id="id-6-1-1" class=" flex flex-row bg-inherit ">
                  Sign In
              </span>
          </button>
          <button id="id-6-1" data-modal-target="signUpForm" data-modal-toggle="signUpForm" class=" flex flex-row bg-inherit h-8 hover:flex hover:flex-row hover:bg-inherit hover:h-8 hover:rounded-none hover:border-b-4 hover:border-solid hover:border-slate-700 ">
            <span id="id-6-1-1" class=" flex flex-row bg-inherit ">
                Sign Up
            </span>
        </button>
      </div>
    </div>
</template>

<script setup>
  const emit = defineEmits(['update:session', 'update:user'])
</script>
