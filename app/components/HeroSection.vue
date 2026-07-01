<template>
  <section
    class="relative flex items-center justify-center min-h-screen px-4 py-24 sm:px-6 lg:px-8 overflow-hidden"
    id="hero"
    aria-labelledby="hero-title"
  >
    <div class="w-10/12 md:w-8/12 mx-auto max-w-[110rem] px-4 relative z-10">
      <!-- Grid Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-12 items-end">
        
        <!-- Top Left: Intro (Row 1) -->
        <div class="flex flex-col text-left lg:col-span-7 xl:col-span-7 lg:row-start-1">
          
          <!-- Badge -->
          <div 
            v-motion="slideUp"
            class="inline-flex self-start items-center px-4 py-1.5 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-md whitespace-nowrap"
          >
            <span class="text-[11px] sm:text-xs font-medium tracking-wider text-zinc-300 uppercase">
              AI Engineer <span class="text-orange-500/70 mx-2">•</span> Backend Developer <span class="text-orange-500/70 mx-2">•</span> ML Enthusiast
            </span>
          </div>

          <!-- Heading -->
          <h1 id="hero-title" class="font-bold text-5xl sm:text-6xl lg:text-[4rem] xl:text-[5rem] text-zinc-100 leading-[1.1] tracking-tight mb-6">
            <span class="block w-fit overflow-hidden pb-2 pr-4">
              <span class="block font-space hero-reveal" style="--delay: 100ms">
                Building
              </span>
            </span>
            <span class="block w-fit overflow-hidden pb-2 pr-4">
              <span class="block font-space hero-reveal text-orange-500" style="--delay: 200ms">
                Intelligent
              </span>
            </span>
            <span class="block w-fit overflow-hidden pb-2 pr-4">
              <span class="block font-space hero-reveal" style="--delay: 300ms">
                Systems.
              </span>
            </span>
          </h1>

          <!-- Paragraph -->
          <p 
            v-motion="withDelay(slideUp, 0.4)"
            class="text-lg sm:text-xl text-zinc-300 leading-relaxed mb-10 max-w-xl"
          >
            Hi, I'm <span class="text-white font-medium">Parth Arora</span>. A computer engineering student at <span class="text-orange-400 font-medium">Thapar Institute of Engineering and Technology</span> bridging the gap between scalable backend architectures and advanced machine learning models.
          </p>

          <!-- Buttons -->
          <div 
            v-motion="withDelay(slideUp, 0.5)"
            class="flex flex-col sm:flex-row items-center gap-4"
          >
            <!-- Primary CTA -->
            <button 
              @click="scrollToProjects"
              class="group relative flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-orange-500 text-white font-medium rounded-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]"
            >
              <span class="relative z-10">View Projects</span>
              <Icon name="lucide:arrow-right" class="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              <div class="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
            </button>

            <!-- Secondary CTA -->
            <a 
              href="/resume.pdf"
              download="Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              class="group relative flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white font-medium rounded-lg border border-white/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm"
            >
              <span>Download Resume</span>
              <Icon name="lucide:download" class="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        <!-- Right Column: Terminal (Row 1) -->
        <div 
          v-motion="withDelay(slideLeft, 0.7)"
          class="relative w-full flex justify-center lg:justify-end lg:col-span-5 xl:col-span-5 lg:row-start-1"
        >
          <HeroTerminal />
        </div>

        <!-- Bottom Left: Stats (Row 2) -->
        <div 
          v-motion="withDelay(slideUp, 0.6)"
          class="grid grid-cols-2 sm:flex sm:flex-row gap-4 lg:col-span-7 xl:col-span-7 lg:row-start-2 pt-8 lg:pt-4"
        >
          <div class="flex flex-col px-4 py-3 bg-white/[0.02] border border-white/5 rounded-xl backdrop-blur-sm">
            <span class="text-2xl font-bold text-white font-space">9.16</span>
            <span class="text-xs text-zinc-500 font-medium tracking-wide uppercase mt-1">CGPA</span>
          </div>
          <div class="flex flex-col px-4 py-3 bg-white/[0.02] border border-white/5 rounded-xl backdrop-blur-sm">
            <span class="text-2xl font-bold text-white font-space">3rd</span>
            <span class="text-xs text-zinc-500 font-medium tracking-wide uppercase mt-1">Year TIET</span>
          </div>
          <div class="flex flex-col px-4 py-3 bg-white/[0.02] border border-white/5 rounded-xl backdrop-blur-sm">
            <span class="text-2xl font-bold text-white font-space">AI/BE</span>
            <span class="text-xs text-zinc-500 font-medium tracking-wide uppercase mt-1">Specialization</span>
          </div>
          <a href="https://leetcode.com/u/parth_aroraaa/" target="_blank" rel="noopener noreferrer" class="flex flex-col px-4 py-3 bg-white/[0.02] border border-white/5 rounded-xl backdrop-blur-sm transition-colors hover:bg-white/[0.04]">
            <span class="text-2xl font-bold text-white font-space">300+</span>
            <span class="text-xs text-zinc-500 font-medium tracking-wide uppercase mt-1">LeetCode</span>
          </a>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { slideUp, withDelay } = useAnimationPresets()

// Custom slideLeft for the terminal
const slideLeft = {
  initial: {
    opacity: 0,
    x: 40
  },
  visibleOnce: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      type: 'spring',
      stiffness: 50,
      damping: 15
    }
  }
}

const scrollToProjects = () => {
  const projectsSection = document.getElementById('projects')
  if (projectsSection) {
    const { $lenis } = useNuxtApp()
    if ($lenis) {
      // @ts-ignore
      $lenis.scrollTo(projectsSection)
    } else {
      const y = projectsSection.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style scoped>
/* ── Entrance: mask reveal (name slides up from behind overflow-hidden) ── */
@keyframes hero-mask-reveal {
  from {
    transform: translateY(110%);
  }
  to {
    transform: translateY(0);
  }
}

.hero-reveal {
  animation: hero-mask-reveal 0.9s cubic-bezier(0.19, 1, 0.22, 1) both;
  animation-delay: var(--delay);
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  .hero-reveal {
    animation: none;
    transform: none;
  }
}
</style>
