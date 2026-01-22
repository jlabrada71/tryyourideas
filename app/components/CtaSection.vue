<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  buttonText: string
}>()

const isModalOpen = ref(false)
</script>

<template>
  <section class="py-20 lg:py-32 bg-gradient-to-r from-sky-600 to-blue-600">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-4xl lg:text-5xl font-bold text-white mb-6">
        {{ title }}
      </h2>
      <p class="text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
        {{ subtitle }}
      </p>
      <button
        class="px-8 py-4 bg-white text-sky-600 rounded-lg hover:bg-sky-50 transition font-bold text-lg"
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
