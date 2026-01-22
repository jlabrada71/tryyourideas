<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  buttonText: string
}>()

const isModalOpen = ref(false)
</script>

<template>
  <section class="py-20 lg:py-32 bg-gradient-to-br from-primary/20 via-background-dark to-background-dark relative overflow-hidden">
    <div class="absolute inset-0 bg-primary/5 blur-[100px] rounded-full" />
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <h2 class="text-4xl lg:text-5xl font-black text-white mb-6">
        {{ title }}
      </h2>
      <p class="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
        {{ subtitle }}
      </p>
      <button
        type="button"
        class="px-10 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-primary/25"
        @click="isModalOpen = true"
      >
        {{ buttonText }}
      </button>
    </div>

    <InviteRequestModal
      :open="isModalOpen"
      @close="isModalOpen = false"
    />
  </section>
</template>
