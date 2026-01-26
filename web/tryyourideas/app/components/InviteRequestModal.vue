<script setup lang="ts">
const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const toast = useToast()

const form = reactive({
  name: '',
  email: '',
  role: '',
  description: ''
})

const roles = [
  { value: 'creator', label: 'Idea Creator' },
  { value: 'developer', label: 'Developer' },
  { value: 'investor', label: 'Investor' }
]

const submitted = ref(false)
const loading = ref(false)
const error = ref('')

async function handleSubmit() {
  loading.value = true
  error.value = ''

  try {
    await $fetch('/api/invite-requests', {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        role: form.role,
        description: form.description
      }
    })
    // Show success toast and close modal
    toast.success('Thank you! Your invite request has been submitted successfully.', 3000)
    handleClose()
  } catch (e: any) {
    error.value = e.data?.statusMessage || 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}

function handleClose() {
  emit('close')
  // Reset form after close animation
  setTimeout(() => {
    form.name = ''
    form.email = ''
    form.role = ''
    form.description = ''
    submitted.value = false
    error.value = ''
  }, 300)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="handleClose"
      >
        <div class="fixed inset-0 bg-black/70" aria-hidden="true" />

        <div class="relative bg-card-dark border border-white/10 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <!-- Close button -->
          <button
            type="button"
            class="absolute top-4 right-4 text-slate-400 hover:text-white transition"
            @click="handleClose"
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="p-8">
            <!-- Success state -->
            <div v-if="submitted" class="text-center py-8">
              <div class="text-5xl mb-4">🎉</div>
              <h3 class="text-2xl font-bold text-white mb-2">Request Received!</h3>
              <p class="text-slate-400 mb-6">
                Thanks for your interest! We'll review your request and send an invite to your email soon.
              </p>
              <button
                type="button"
                class="px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition font-medium"
                @click="handleClose"
              >
                Close
              </button>
            </div>

            <!-- Form state -->
            <template v-else>
              <h3 class="text-2xl font-bold text-white mb-2">Request an Invite</h3>
              <p class="text-slate-400 mb-6">
                Try Your Ideas is currently invite-only. Tell us about yourself and we'll be in touch.
              </p>

              <!-- Error message -->
              <div v-if="error" class="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                {{ error }}
              </div>

              <form @submit.prevent="handleSubmit" class="space-y-4">
                <div>
                  <label for="name" class="block text-sm font-medium text-slate-300 mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    required
                    :disabled="loading"
                    class="w-full px-4 py-3 bg-background-dark border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="John Doe"
                  >
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    required
                    :disabled="loading"
                    class="w-full px-4 py-3 bg-background-dark border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="john@example.com"
                  >
                </div>

                <div>
                  <label for="role" class="block text-sm font-medium text-slate-300 mb-1">
                    I am a...
                  </label>
                  <select
                    id="role"
                    v-model="form.role"
                    required
                    :disabled="loading"
                    class="w-full px-4 py-3 bg-background-dark border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="" disabled class="text-slate-500">Select your role</option>
                    <option v-for="role in roles" :key="role.value" :value="role.value">
                      {{ role.label }}
                    </option>
                  </select>
                </div>

                <div>
                  <label for="description" class="block text-sm font-medium text-slate-300 mb-1">
                    Tell us about yourself
                  </label>
                  <textarea
                    id="description"
                    v-model="form.description"
                    required
                    rows="4"
                    :disabled="loading"
                    class="w-full px-4 py-3 bg-background-dark border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="What brings you to Try Your Ideas? Share your background or idea..."
                  />
                </div>

                <button
                  type="submit"
                  :disabled="loading"
                  class="w-full py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition font-bold shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <svg v-if="loading" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {{ loading ? 'Submitting...' : 'Send me an invite, please' }}
                </button>
              </form>
            </template>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95);
}
</style>
