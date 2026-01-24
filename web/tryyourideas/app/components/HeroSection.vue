<script setup lang="ts">
defineProps<{
  badge?: string
  title: string
  highlightedWord?: string
  description: string
  primaryButtonText: string
  secondaryButtonText?: string
}>()

const emit = defineEmits<{
  primaryClick: []
  secondaryClick: []
}>()
</script>

<template>
  <section class="relative pt-12 lg:pt-24 pb-16 lg:pb-24 geometric-bg hero-gradient">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div class="lg:col-span-7 space-y-8">
        <div class="space-y-6">
          <PulseBadge v-if="badge" :text="badge" />
          <h2 class="text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight text-white">
            <slot name="title">
              {{ title }}
              <span v-if="highlightedWord" class="text-primary italic">{{ highlightedWord }}</span>
            </slot>
          </h2>
          <p class="text-lg lg:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed">
            {{ description }}
          </p>
        </div>
        <div class="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            class="px-10 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition-all shadow-xl shadow-primary/25 text-lg"
            @click="emit('primaryClick')"
          >
            {{ primaryButtonText }}
          </button>
          <button
            v-if="secondaryButtonText"
            type="button"
            class="px-10 py-4 bg-transparent border border-white/10 hover:bg-white/5 text-white rounded-xl font-bold transition-all text-lg"
            @click="emit('secondaryClick')"
          >
            {{ secondaryButtonText }}
          </button>
        </div>
      </div>
      <div class="lg:col-span-5 relative hidden lg:block">
        <div class="aspect-square relative flex items-center justify-center">
          <div class="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
          <div class="relative z-10 w-full h-full flex items-center justify-center">
            <div class="size-64 rounded-3xl bg-card-dark border border-white/10 flex items-center justify-center">
              <Icon name="mdi:lightbulb-on" class="text-primary text-9xl" />
            </div>
          </div>
          <!-- Floating cards -->
          <div class="absolute -top-4 -right-4">
            <FloatingInfoCard
              icon="mdi:code-braces"
              icon-color="bg-blue-500/20 text-blue-400"
              title="Dev Team"
              subtitle="4 Active Members"
            />
          </div>
          <div class="absolute -bottom-6 -left-6">
            <FloatingInfoCard
              icon="mdi:cash"
              title="Seed Funding"
              subtitle="$2.4M Committed"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
