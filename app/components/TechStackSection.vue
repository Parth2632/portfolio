<template>
    <section
        id="tech-stack"
        v-motion="fade"
        class="flex flex-col justify-center min-h-screen px-4 py-24 lg:py-32 overflow-hidden sm:px-6 lg:px-8"
    >
        <div class="w-10/12 md:w-8/12 mx-auto max-w-[110rem] px-4">
            <!-- Section Header -->
            <header class="flex flex-col items-center mb-16 text-center md:items-start md:text-left">
                <h2 class="text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl lg:text-7xl font-space">
                    <span
                      v-motion="fade"
                      class="text-zinc-100"
                    >My</span>
                    <span
                      v-motion="slideUp"
                      class="relative inline-block ml-3"
                    >
                        <span class="bg-gradient-to-r from-orange-700 via-orange-500 to-orange-400 bg-clip-text text-transparent transition-[background-size,background-position] duration-300 hover:bg-[length:200%_100%] bg-[length:100%_100%] bg-[position:0%] hover:bg-[position:100%]">
                            Tech Stack
                        </span>
                    </span>
                </h2>
                <p
                  v-motion="withDelay(slideUp, 0.15)"
                  class="max-w-[680px] mt-6 text-lg text-white/70 md:text-xl [text-wrap:pretty]"
                >
                    These are the technologies I have experience with.
                </p>
            </header>

            <!-- Tech Grid - Fixed 3 rows max -->
            <ul class="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                <li v-for="(tech, index) in techStack?.technologies" :key="tech.name">
                    <button
                       v-motion="chipMotion(index)"
                       class="group flex w-full p-4 text-left transition-[border-color,background-color,transform,box-shadow] duration-500 rounded-xl border border-white/10
                              hover:border-orange-500/20 bg-white/[0.02] hover:bg-orange-500/[0.02] hover:-translate-y-1.5
                              active:scale-[0.96] focus:outline-none focus:ring-2 focus:ring-orange-500/50 will-change-transform"
                       v-bind="createHandlers(index)"
                       @click="handleTechClick($event, tech.icon)">
                        
                        <!-- Spotlight Effect (simplified) -->
                        <span class="absolute inset-0 transition-opacity duration-500 opacity-0 pointer-events-none group-hover:opacity-100 rounded-xl bg-gradient-to-br from-orange-500/20 to-transparent"
                              :style="spotlightStyles[index]"></span>

                        <!-- Icon Container -->
                        <span class="flex items-center justify-center w-12 h-12 rounded-lg shrink-0 transition-[box-shadow,transform] duration-500
                                     shadow-[0_0_0_1px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_0_1.5px_rgba(230,57,70,0.2)]
                                     group-hover:scale-110" 
                              :class="getIconBackgroundClass(tech.color)">
                            <Icon :name="tech.icon"
                                  class="w-6 h-6 transition-transform duration-500 group-hover:scale-110"
                                  :style="{ color: tech.color }" 
                                  loading="lazy"
                                  width="24"
                                  height="24"
                                  aria-hidden="true" />
                        </span>
                        
                        <!-- Text Content -->
                        <span class="flex-1 min-w-0 ml-4">
                            <h3 class="text-sm font-medium truncate transition-colors duration-300 text-white/90 group-hover:text-white font-space">
                                {{ tech.name }}
                            </h3>
                            <p class="text-xs truncate transition-colors duration-300 text-white/60 group-hover:text-orange-400/80">
                                {{ tech.category }}
                            </p>
                        </span>
                        
                        <!-- External Link Icon -->
                        <Icon
                              name="lucide:sparkles"
                              class="w-4 h-4 ml-auto text-white/30 opacity-0 transition-[opacity,transform,color] duration-300
                                     group-hover:opacity-100 group-hover:scale-110 group-hover:text-[#f97316]"
                              loading="lazy"
                              width="16"
                              height="16"
                              aria-hidden="true" />
                    </button>
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup lang="ts">
const { spotlightStyles, createHandlers } = useSpotlightEffect(20)

const { data: techStack, error } = await useAsyncData('tech-stack', () =>
  queryCollection('techStack').first()
)

if (error.value || !techStack.value?.technologies) {
    throw createError({
        statusCode: 500,
        statusMessage: 'Failed to load tech stack data',
        cause: error.value
    })
}

const { fade, slideUp, withDelay, staggered } = useAnimationPresets()
const chipMotion = (index: number) => staggered(index, 'fast', 0.12)

const nuxtApp = useNuxtApp()

// Map content icons (logos:*) to background icons (simple-icons:*)
const bgIconMap: Record<string, string> = {
  'logos:typescript-icon': 'simple-icons:typescript',
  'logos:python': 'simple-icons:python',
  'logos:vue': 'simple-icons:vuedotjs',
  'logos:nuxt-icon': 'simple-icons:nuxtdotjs',
  'logos:fastapi-icon': 'simple-icons:fastapi',
  'simple-icons:flask': 'simple-icons:flask',
  'logos:tailwindcss-icon': 'simple-icons:tailwindcss',
  'logos:git-icon': 'simple-icons:git',
  'logos:postgresql': 'simple-icons:postgresql',
  'logos:docker-icon': 'simple-icons:docker',
  'logos:linux-tux': 'simple-icons:linux',
  'logos:bash-icon': 'simple-icons:gnubash',
}

function handleTechClick(event: MouseEvent, icon: string) {
  const spawn = nuxtApp.$spawnTechIcons as ((icon: string, x: number, y: number, count?: number) => void) | undefined
  if (!spawn) return
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  spawn(bgIconMap[icon] || icon, rect.left + rect.width / 2, rect.top + rect.height / 2)
}

// Convert hex color to tailwind-compatible background classes to avoid hydration mismatch
function getIconBackgroundClass(hexColor: string): string {
  // Map common colors to tailwind classes to avoid inline styles
  const colorMap: Record<string, string> = {
    '#3776AB': 'bg-[#3776AB15]', // Python
    '#00599C': 'bg-[#00599C15]', // C++
    '#009688': 'bg-[#00968815]', // FastAPI
    '#FFFFFF': 'bg-[#FFFFFF15]', // LangChain
    '#FFD21E': 'bg-[#FFD21E15]', // Hugging Face
    '#F7931E': 'bg-[#F7931E15]', // scikit-learn
    '#150458': 'bg-[#15045815]', // Pandas
    '#013243': 'bg-[#01324315]', // NumPy
    '#4169E1': 'bg-[#4169E115]', // PostgreSQL
    '#47A248': 'bg-[#47A24815]', // MongoDB
    '#FFCA28': 'bg-[#FFCA2815]', // Firebase
    '#F05032': 'bg-[#F0503215]', // Git
    '#007ACC': 'bg-[#007ACC15]', // VS Code
    '#FCC624': 'bg-[#FCC62415]', // Linux
  }
  
  return colorMap[hexColor] || 'bg-white/5' // Fallback for any colors not in the map
}

</script>
