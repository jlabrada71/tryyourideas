<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

// Page SEO
useSeoMeta({
  title: 'Transform Your Ideas Into Reality',
  description: 'Connect with talented developers and visionary investors. The collaborative ecosystem where entrepreneurs, developers, and investors unite to build the future of technology.',
  ogTitle: 'Try Your Ideas - Transform Your Ideas Into Reality',
  ogDescription: 'Connect with talented developers and visionary investors. The collaborative ecosystem where entrepreneurs, developers, and investors unite to build the future.',
  ogImage: '/og-image.png',
  ogType: 'website',
  ogSiteName: 'Try Your Ideas',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Try Your Ideas - Transform Your Ideas Into Reality',
  twitterDescription: 'Connect with talented developers and visionary investors. Build the future of technology together.',
  twitterImage: '/og-image.png',
})

// Canonical URL
useHead({
  link: [
    { rel: 'canonical', href: 'https://tryyourideas.com' },
  ],
})

const stats = [
  { icon: 'mdi:rocket-launch', number: '1,240+', label: 'Projects Launched' },
  { icon: 'mdi:account-group', number: '500+', label: 'Active Investors' },
  { icon: 'mdi:cash-multiple', number: '$10M+', label: 'Capital Raised' }
]

const projects = [
  {
    title: 'AI Eco-Tracker',
    description: 'Scaling the next generation of environmental monitoring. Seeking 2 Frontend Devs.',
    tag: 'HIRING',
    tagColor: 'primary' as const,
    author: 'GreenTech Labs'
  },
  {
    title: 'NovaPay Wallet',
    description: 'Revolutionizing cross-border payments. Round A: 60% funded.',
    tag: 'FUNDING',
    tagColor: 'amber' as const,
    author: 'Nova FinTech'
  },
  {
    title: 'CloudSync Pro',
    description: 'Enterprise-grade distributed storage. Early access now open for testers.',
    tag: 'BETA',
    tagColor: 'blue' as const,
    author: 'SyncSystems'
  },
  {
    title: 'Quantum Mesh',
    description: 'Edge computing re-imagined. Project just launched today.',
    tag: 'NEW',
    tagColor: 'purple' as const,
    author: 'Q-Labs'
  }
]

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

// JSON-LD Structured Data
useSchemaOrg([
  defineOrganization({
    name: 'Try Your Ideas',
    logo: '/logo.png',
    url: 'https://tryyourideas.com',
    sameAs: [],
  }),
  defineWebSite({
    name: 'Try Your Ideas',
    url: 'https://tryyourideas.com',
  }),
  defineWebPage({
    name: 'Try Your Ideas - Transform Your Ideas Into Reality',
    description: 'Connect with talented developers and visionary investors. The collaborative ecosystem where entrepreneurs, developers, and investors unite to build the future of technology.',
  }),
  // FAQ structured data
  ...faqs.map(faq => defineQuestion({
    name: faq.question,
    acceptedAnswer: faq.answer,
  })),
])

const isInviteModalOpen = ref(false)
</script>

<template>
  <div class="min-h-screen bg-background-dark text-slate-200 selection:bg-primary/30">
    <AppHeader @join-click="isInviteModalOpen = true" />

    <main class="max-w-7xl mx-auto px-6 lg:px-8 relative">
      <!-- Hero Section -->
      <HeroSection
        badge="Vibrant Ecosystem"
        title="Transform Your "
        highlighted-word="Ideas"
        description="The world's most advanced collaborative ecosystem where elite entrepreneurs, developers, and investors unite to engineer the future of technology."
        primary-button-text="Get Started"
        secondary-button-text="Browse Projects"
        @primary-click="isInviteModalOpen = true"
      >
        <template #title>
          Transform Your <span class="text-primary italic">Ideas</span> Into Reality
        </template>
      </HeroSection>

      <!-- Stats Section -->
      <section class="py-12 border-y border-white/5">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
          <div class="lg:w-1/4">
            <h3 class="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-1">
              Platform Growth
            </h3>
            <p class="text-xl font-bold text-white">Our thriving network</p>
          </div>
          <div class="flex-1 w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StatCard
              v-for="stat in stats"
              :key="stat.label"
              :icon="stat.icon"
              :number="stat.number"
              :label="stat.label"
            />
          </div>
        </div>
      </section>

      <!-- Recent Activity Section -->
      <section class="py-20">
        <div class="flex items-end justify-between mb-10">
          <div>
            <h3 class="text-3xl font-bold text-white mb-2">Recent Activity</h3>
            <p class="text-slate-500">Real-time updates from across the platform</p>
          </div>
          <button
            type="button"
            class="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all"
          >
            View All Activity
            <Icon name="mdi:arrow-right" />
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProjectCard
            v-for="project in projects"
            :key="project.title"
            :title="project.title"
            :description="project.description"
            :tag="project.tag"
            :tag-color="project.tagColor"
            :author="project.author"
          />
        </div>
      </section>

      <!-- User Type Cards Section -->
      <section class="py-20 border-t border-white/5">
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
      </section>

      <!-- Features Section -->
      <section id="features" class="py-20 border-t border-white/5">
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
      </section>

      <!-- How It Works Section -->
      <section id="how-it-works" class="py-20 border-t border-white/5">
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
      </section>

      <!-- FAQ Section -->
      <section id="faq" class="py-20 border-t border-white/5">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Have a question? We're here to help"
        />
        <div class="max-w-3xl mx-auto space-y-6">
          <FaqItem
            v-for="(faq, index) in faqs"
            :key="index"
            :question="faq.question"
            :answer="faq.answer"
          />
        </div>
      </section>
    </main>

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
