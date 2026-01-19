<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const userTypes = [
  {
    icon: '💡',
    title: 'Have an Idea',
    description: 'Transform your vision into reality by connecting with skilled developers and investors',
    cta: 'Post Your Idea',
    color: 'blue'
  },
  {
    icon: '💻',
    title: 'Are a Developer',
    description: 'Build meaningful projects with real potential for equity and long-term success',
    cta: 'Find Projects',
    color: 'purple'
  },
  {
    icon: '💰',
    title: 'Want to Invest',
    description: 'Discover early-stage opportunities with transparent teams and verified metrics',
    cta: 'Browse Deals',
    color: 'green'
  }
]

const features = [
  {
    icon: '🤝',
    title: 'Smart Matching',
    description: 'AI-powered algorithm connects projects with the perfect team'
  },
  {
    icon: '🔒',
    title: 'Trust & Verification',
    description: 'All participants are verified and vetted for reliability'
  },
  {
    icon: '💼',
    title: 'Professional Tools',
    description: 'Manage projects, track milestones, and handle payments securely'
  },
  {
    icon: '📊',
    title: 'Transparent Tracking',
    description: 'Real-time progress updates and financial transparency'
  },
  {
    icon: '🌍',
    title: 'Global Community',
    description: 'Connect with talent and investors from around the world'
  },
  {
    icon: '⚖️',
    title: 'Legal Support',
    description: 'Templates and guidance for agreements and contracts'
  }
]

const stats = [
  { number: '50K+', label: 'Active Users' },
  { number: '500+', label: 'Projects Created' },
  { number: '$50M+', label: 'Funding Facilitated' },
  { number: '95%', label: 'Success Rate' }
]

const faqs = [
  {
    question: 'How do I post my idea?',
    answer: 'Simply sign up as an idea creator, fill in your project details, and publish. You\'ll start receiving applications from developers within hours.'
  },
  {
    question: 'What happens if a project doesn\'t work out?',
    answer: 'We have a fair dispute resolution process. If there are concerns, both parties can escalate through our mediation system with clear guidelines.'
  },
  {
    question: 'How is payment handled?',
    answer: 'All payments go through our secure escrow system. Funds are only released when agreed-upon milestones are completed.'
  },
  {
    question: 'Can I work on multiple projects?',
    answer: 'Yes! Developers can work on multiple projects as long as they have the availability. You set your own schedule.'
  },
  {
    question: 'How do investors find deals?',
    answer: 'Our investor portal provides filtered deal flow based on your criteria. You can browse opportunities and contact founders directly.'
  },
  {
    question: 'Is there a fee?',
    answer: 'We take a small commission on successful transactions (2-5%) to maintain the platform and support all participants.'
  }
]
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation Header -->
    <header class="border-b border-gray-200 sticky top-0 bg-white z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div class="text-2xl font-bold text-sky-600">
          Try Your Ideas
        </div>
        <nav class="hidden md:flex gap-8">
          <a href="#features" class="text-gray-700 hover:text-sky-600 transition">Features</a>
          <a href="#how-it-works" class="text-gray-700 hover:text-sky-600 transition">How It Works</a>
          <a href="#faq" class="text-gray-700 hover:text-sky-600 transition">FAQ</a>
        </nav>
        <div class="flex gap-3">
          <button class="px-4 py-2 text-sky-600 border border-sky-600 rounded-lg hover:bg-sky-50 transition font-medium">
            Sign In
          </button>
          <button class="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition font-medium">
            Get Started
          </button>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div class="text-center">
          <h1 class="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Transform Your Ideas Into Reality
          </h1>
          <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect with talented developers and visionary investors. Bring your innovations to life on a platform built for collaboration and success.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button class="px-8 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition font-semibold text-lg">
              Start Your Journey
            </button>
            <button class="px-8 py-3 border-2 border-sky-600 text-sky-600 rounded-lg hover:bg-sky-50 transition font-semibold text-lg">
              Watch Demo
            </button>
          </div>
        </div>

        <!-- Hero Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-200">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <div class="text-3xl lg:text-4xl font-bold text-sky-600 mb-2">
              {{ stat.number }}
            </div>
            <div class="text-gray-600">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>

      <!-- Decorative background -->
      <div class="absolute top-0 right-0 -z-10 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-20"></div>
      <div class="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20"></div>
    </section>

    <!-- User Type Cards Section -->
    <section class="py-20 lg:py-32 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Whatever Your Role
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Try Your Ideas is designed for entrepreneurs, developers, and investors. Choose your path and get started.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="userType in userTypes"
            :key="userType.title"
            class="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition border border-gray-200"
          >
            <div class="text-5xl mb-4">
              {{ userType.icon }}
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">
              {{ userType.title }}
            </h3>
            <p class="text-gray-600 mb-6 leading-relaxed">
              {{ userType.description }}
            </p>
            <button :class="[
              'w-full py-3 rounded-lg font-semibold transition',
              userType.color === 'blue' ? 'bg-sky-600 text-white hover:bg-sky-700' :
              userType.color === 'purple' ? 'bg-purple-600 text-white hover:bg-purple-700' :
              'bg-green-600 text-white hover:bg-green-700'
            ]">
              {{ userType.cta }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 lg:py-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to collaborate, build, and succeed
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="p-8 rounded-xl border border-gray-200 hover:border-sky-300 hover:bg-sky-50 transition"
          >
            <div class="text-4xl mb-4">
              {{ feature.icon }}
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section id="how-it-works" class="py-20 lg:py-32 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple, transparent, and proven
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- For Creators -->
          <div>
            <div class="bg-white rounded-2xl p-8 h-full border-2 border-sky-200">
              <h3 class="text-2xl font-bold text-gray-900 mb-6">For Idea Creators</h3>
              <ol class="space-y-4">
                <li class="flex gap-4">
                  <span class="flex-shrink-0 w-8 h-8 bg-sky-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                  <span class="text-gray-700">Post your project idea with all details</span>
                </li>
                <li class="flex gap-4">
                  <span class="flex-shrink-0 w-8 h-8 bg-sky-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                  <span class="text-gray-700">Review developer applications and team</span>
                </li>
                <li class="flex gap-4">
                  <span class="flex-shrink-0 w-8 h-8 bg-sky-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                  <span class="text-gray-700">Collaborate and track project progress</span>
                </li>
                <li class="flex gap-4">
                  <span class="flex-shrink-0 w-8 h-8 bg-sky-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                  <span class="text-gray-700">Connect with investors for funding</span>
                </li>
              </ol>
            </div>
          </div>

          <!-- For Developers -->
          <div>
            <div class="bg-white rounded-2xl p-8 h-full border-2 border-purple-200">
              <h3 class="text-2xl font-bold text-gray-900 mb-6">For Developers</h3>
              <ol class="space-y-4">
                <li class="flex gap-4">
                  <span class="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                  <span class="text-gray-700">Create your developer profile</span>
                </li>
                <li class="flex gap-4">
                  <span class="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                  <span class="text-gray-700">Browse and apply to projects</span>
                </li>
                <li class="flex gap-4">
                  <span class="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                  <span class="text-gray-700">Get selected and join the team</span>
                </li>
                <li class="flex gap-4">
                  <span class="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                  <span class="text-gray-700">Build and earn with equity upside</span>
                </li>
              </ol>
            </div>
          </div>

          <!-- For Investors -->
          <div>
            <div class="bg-white rounded-2xl p-8 h-full border-2 border-green-200">
              <h3 class="text-2xl font-bold text-gray-900 mb-6">For Investors</h3>
              <ol class="space-y-4">
                <li class="flex gap-4">
                  <span class="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                  <span class="text-gray-700">Explore curated deal flow</span>
                </li>
                <li class="flex gap-4">
                  <span class="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                  <span class="text-gray-700">Review teams and financials</span>
                </li>
                <li class="flex gap-4">
                  <span class="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                  <span class="text-gray-700">Conduct due diligence</span>
                </li>
                <li class="flex gap-4">
                  <span class="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                  <span class="text-gray-700">Invest and monitor returns</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section id="faq" class="py-20 lg:py-32">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p class="text-xl text-gray-600">
            Have a question? We're here to help
          </p>
        </div>

        <div class="space-y-6">
          <details
            v-for="(faq, index) in faqs"
            :key="index"
            class="bg-white border border-gray-200 rounded-lg p-6 cursor-pointer hover:border-sky-300 transition group"
          >
            <summary class="flex items-center justify-between font-semibold text-gray-900 text-lg">
              {{ faq.question }}
              <span class="text-2xl text-sky-600 group-open:rotate-180 transition">+</span>
            </summary>
            <p class="text-gray-600 mt-4 leading-relaxed">
              {{ faq.answer }}
            </p>
          </details>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 lg:py-32 bg-gradient-to-r from-sky-600 to-blue-600">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Get Started?
        </h2>
        <p class="text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
          Join thousands of entrepreneurs, developers, and investors building the future together.
        </p>
        <button class="px-8 py-4 bg-white text-sky-600 rounded-lg hover:bg-sky-50 transition font-bold text-lg">
          Join Try Your Ideas Today
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-400">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 class="text-white font-bold mb-4">Try Your Ideas</h3>
            <p class="text-sm">Transform ideas into reality with the platform for creators, developers, and investors.</p>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-4">Product</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-white transition">Features</a></li>
              <li><a href="#" class="hover:text-white transition">Pricing</a></li>
              <li><a href="#" class="hover:text-white transition">Security</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-4">Company</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-white transition">About</a></li>
              <li><a href="#" class="hover:text-white transition">Blog</a></li>
              <li><a href="#" class="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-4">Legal</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-white transition">Privacy</a></li>
              <li><a href="#" class="hover:text-white transition">Terms</a></li>
              <li><a href="#" class="hover:text-white transition">Cookies</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-800 pt-8 flex items-center justify-between">
          <p class="text-sm">&copy; 2026 Try Your Ideas. All rights reserved.</p>
          <div class="flex gap-4 text-sm">
            <a href="#" class="hover:text-white transition">Twitter</a>
            <a href="#" class="hover:text-white transition">LinkedIn</a>
            <a href="#" class="hover:text-white transition">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
