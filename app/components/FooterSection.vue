<template>
  <footer
    v-motion="fade"
    class="relative px-4 py-12 overflow-hidden sm:px-6 lg:px-8"
  >
    <!-- Content -->
    <div class="relative z-10 w-10/12 md:w-8/12 mx-auto max-w-[110rem] text-center">
      <!-- Main Content -->
      <h2
        v-motion="fade"
        class="mb-12 text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl lg:text-7xl font-space"
      >
        Let's
        <span class="relative inline-block group">
          <span class="bg-gradient-to-r from-orange-700 via-orange-500 to-orange-400 bg-clip-text text-transparent transition-[background-size,background-position] duration-300 group-hover:bg-[length:200%_100%] bg-[length:100%_100%] bg-[position:0%] hover:bg-[position:100%]">
            connect
          </span>
        </span>
      </h2>

      <p
        v-motion="slideUp"
        class="mb-12 text-white/70 max-w-[75ch] mx-auto text-lg [text-wrap:pretty]"
      >
        I'm always open to new collaborations. If you're building products that use AI, fast APIs, or modern frontend experiences, let's talk.
      </p>

      <!-- Contact Button -->
      <button
        v-motion="withDelay(slideUp, 0.15)"
        class="relative inline-flex h-10 sm:h-12 w-[180px] sm:w-[210px] overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:ring-offset-2 focus:ring-offset-black group transition-[opacity,transform] duration-700 delay-200 active:scale-[0.96]"
        @click="copyEmail"
        data-umami-event="Copy Email"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
        aria-label="Copy email address"
      >
        <span 
          class="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0A0A0A_0%,#0A0A0A_50%,#B91C1C_100%)]" 
        />
        <span 
          class="inline-flex items-center justify-center w-full h-full px-6 py-2 text-base font-medium text-white transition-colors duration-300 bg-black rounded-lg cursor-pointer sm:px-8 sm:text-lg backdrop-blur-3xl group-hover:bg-black/80"
        >
          <div class="relative w-4 h-4 mr-2 sm:w-5 sm:h-5 sm:mr-3">
            <Icon 
              name="lucide:copy"
              class="absolute inset-0 w-4 h-4 transition-[opacity,transform,filter,color] duration-300 ease-[cubic-bezier(0.2,0,0,1)] sm:w-5 sm:h-5"
              :class="copied ? 'opacity-0 scale-[0.25] blur-[4px]' : 'opacity-100 scale-100 blur-0 group-hover:text-orange-400'"
              aria-hidden="true"
            />
            <Icon 
              name="lucide:check"
              class="absolute inset-0 w-4 h-4 transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)] sm:w-5 sm:h-5 text-orange-400"
              :class="copied ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-[0.25] blur-[4px]'"
              aria-hidden="true"
            />
          </div>
          <span class="transition-opacity duration-300 ease-in-out">
            {{ copied ? 'Copied!' : 'Copy Email' }}
          </span>
        </span>
        <!-- Spotlight effect -->
        <div
          class="absolute transition-opacity duration-300 opacity-0 pointer-events-none -inset-px group-hover:opacity-100"
          :style="spotlightStyle"
          aria-hidden="true"
        >
          <div class="absolute inset-0 rounded-lg bg-gradient-to-br from-orange-500/20 to-transparent" />
        </div>
      </button>

      <!-- Social Links -->
      <div class="flex justify-center mt-12 gap-6">
        <NuxtLink
          v-for="(link, index) in socialLinks"
          :key="link.name"
          v-motion="socialLink(index, 0.3)"
          :to="link.url"
          external
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center transition-colors duration-300 text-white/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-400/50 p-3 min-w-[44px] min-h-[44px]"
          :data-umami-event="`Visit ${link.name}`"
          :aria-label="`Visit my ${link.name} profile`"
        >
          <Icon
            :name="link.playfulIcon"
            class="w-8 h-8 sm:w-10 sm:h-10"
            loading="lazy"
            aria-hidden="true"
          />
          <span class="sr-only">{{ link.name }}</span>
        </NuxtLink>
      </div>

      <!-- Copyright -->
      <div
        v-motion="withDelay(slideUp, 0.3)"
        class="mt-12 text-sm text-white/40"
      >
        © {{ new Date().getFullYear() }} Built with 
        <span class="text-orange-400" aria-hidden="true">❤️</span><span class="sr-only">love</span> by Parth Arora
      </div>    </div>
  </footer>
</template>

<script setup lang="ts">
const { fade, slideUp, withDelay, socialLink } = useAnimationPresets()

const email = 'partharora2632@gmail.com'

// Use VueUse clipboard composable
const { copy, copied } = useClipboard({ legacy: true, copiedDuring: 2000 })
const copyEmail = () => copy(email)

const { spotlightStyle, handleMouseMove, handleMouseLeave } = useSpotlightEffect()

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/Parth2632', playfulIcon: 'ph:github-logo-fill' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/parth-arora-4a9636325', playfulIcon: 'ri:linkedin-fill' },
  { name: 'LeetCode', url: 'https://leetcode.com/u/parth_aroraaa/', playfulIcon: 'simple-icons:leetcode' },
]
</script>
