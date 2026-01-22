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
    color: 'blue' as const
  },
  {
    icon: '💻',
    title: 'Are a Developer',
    description: 'Build meaningful projects with real potential for equity and long-term success',
    cta: 'Find Projects',
    color: 'purple' as const
  },
  {
    icon: '💰',
    title: 'Want to Invest',
    description: 'Discover early-stage opportunities with transparent teams and verified metrics',
    cta: 'Browse Deals',
    color: 'green' as const
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

const howItWorks = [
  {
    title: 'For Idea Creators',
    color: 'sky' as const,
    steps: [
      'Post your project idea with all details',
      'Review developer applications and team',
      'Collaborate and track project progress',
      'Connect with investors for funding'
    ]
  },
  {
    title: 'For Developers',
    color: 'purple' as const,
    steps: [
      'Create your developer profile',
      'Browse and apply to projects',
      'Get selected and join the team',
      'Build and earn with equity upside'
    ]
  },
  {
    title: 'For Investors',
    color: 'green' as const,
    steps: [
      'Explore curated deal flow',
      'Review teams and financials',
      'Conduct due diligence',
      'Invest and monitor returns'
    ]
  }
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

const isInviteModalOpen = ref(false)
</script>

<template>
  <div class="min-h-screen bg-white">
    <AppHeader />

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
          <div class="flex justify-center mb-12">
            <button
              type="button"
              class="px-8 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition font-semibold text-lg"
              @click="isInviteModalOpen = true"
            >
              Start Your Journey
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
      <div class="absolute top-0 right-0 -z-10 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-20" />
      <div class="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20" />
    </section>

    <!-- User Type Cards Section -->
    <section class="py-20 lg:py-32 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Whatever Your Role"
          subtitle="Try Your Ideas is designed for entrepreneurs, developers, and investors. Choose your path and get started."
        />

        <div class="grid md:grid-cols-3 gap-8">
          <UserTypeCard
            v-for="userType in userTypes"
            :key="userType.title"
            :icon="userType.icon"
            :title="userType.title"
            :description="userType.description"
            :cta="userType.cta"
            :color="userType.color"
          />
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 lg:py-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Powerful Features"
          subtitle="Everything you need to collaborate, build, and succeed"
        />

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            v-for="feature in features"
            :key="feature.title"
            :icon="feature.icon"
            :title="feature.title"
            :description="feature.description"
          />
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section id="how-it-works" class="py-20 lg:py-32 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="How It Works"
          subtitle="Simple, transparent, and proven"
        />

        <div class="grid md:grid-cols-3 gap-8">
          <HowItWorksCard
            v-for="item in howItWorks"
            :key="item.title"
            :title="item.title"
            :steps="item.steps"
            :color="item.color"
          />
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section id="faq" class="py-20 lg:py-32">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Have a question? We're here to help"
        />

        <div class="space-y-6">
          <FaqItem
            v-for="(faq, index) in faqs"
            :key="index"
            :question="faq.question"
            :answer="faq.answer"
          />
        </div>
      </div>
    </section>

    <CtaSection
      title="Ready to Get Started?"
      subtitle="Join thousands of entrepreneurs, developers, and investors building the future together."
      button-text="Join Try Your Ideas Today"
    />

    <AppFooter />

    <InviteRequestModal
      :open="isInviteModalOpen"
      @close="isInviteModalOpen = false"
    />
  </div>
</template>
