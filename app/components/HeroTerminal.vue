<template>
  <div 
    class="relative w-full max-w-[500px] mx-auto animate-float"
  >
    <!-- Soft Ambient Glow -->
    <div class="absolute -inset-1 rounded-xl bg-orange-500/20 blur-2xl opacity-60 pointer-events-none"></div>

    <!-- Terminal Container -->
    <div 
      class="relative w-full rounded-xl overflow-hidden bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 shadow-2xl"
    >
      <!-- Glassmorphism Title Bar -->
      <div class="relative flex items-center px-4 py-3 bg-white/[0.02] border-b border-white/5 backdrop-blur-md">
        <!-- Reflection -->
        <div class="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div class="flex space-x-2 z-10">
          <div class="w-3 h-3 rounded-full bg-[#FF5F56] shadow-[0_0_8px_rgba(255,95,86,0.5)]"></div>
          <div class="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-[0_0_8px_rgba(255,189,46,0.5)]"></div>
          <div class="w-3 h-3 rounded-full bg-[#27C93F] shadow-[0_0_8px_rgba(39,201,63,0.5)]"></div>
        </div>
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span class="text-[11px] font-mono font-medium text-zinc-500 tracking-wider">guest@parth-arora:~</span>
        </div>
      </div>
      
      <!-- Scanline Overlay -->
      <div class="scanlines absolute inset-0 pointer-events-none z-20 mix-blend-overlay opacity-20"></div>
      
      <!-- Terminal Body -->
      <div class="relative p-5 md:p-6 font-mono text-sm leading-relaxed text-zinc-300 min-h-[300px] flex flex-col gap-2 z-10">
        <div v-for="(line, index) in visibleLines" :key="index" class="whitespace-pre-wrap" v-html="line"></div>
        <div v-if="!isFinished && isTyping" class="flex items-center text-orange-400">
          <span class="mr-2 opacity-70">❯</span>
          <span>{{ currentTypedText }}</span>
          <span class="w-[8px] h-4 ml-[2px] bg-orange-400 animate-cursor-blink inline-block shadow-[0_0_8px_rgba(249,115,22,0.6)]"></span>
        </div>
        <div v-else-if="!isFinished" class="flex items-center text-orange-400">
          <span class="mr-2 opacity-70">❯</span>
          <span class="w-[8px] h-4 bg-orange-400 animate-cursor-blink inline-block shadow-[0_0_8px_rgba(249,115,22,0.6)]"></span>
        </div>
        <div v-else class="flex items-center text-orange-400 mt-2">
          <span class="mr-2 opacity-70">❯</span>
          <span class="w-[8px] h-4 bg-orange-400 animate-cursor-blink inline-block shadow-[0_0_8px_rgba(249,115,22,0.6)]"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Terminal Logic
const visibleLines = ref<string[]>([])
const currentTypedText = ref('')
const isFinished = ref(false)
const hasStarted = ref(false)
const isTyping = ref(false)

const commands = [
  { text: './portfolio --profile', delay: 400 },
  { output: `<span class="text-zinc-500 animate-pulse">Loading profile...</span>`, delay: 600, replaceLine: true },
  { output: `<span class="text-green-400 mr-2">✔</span> <span class="text-white">AI/LLM Engineering</span>`, delay: 150 },
  { output: `<span class="text-green-400 mr-2">✔</span> <span class="text-white">Backend Development</span>`, delay: 150 },
  { output: `<span class="text-green-400 mr-2">✔</span> <span class="text-white">Machine Learning</span>`, delay: 150 },
  { output: `<span class="text-green-400 mr-2">✔</span> <span class="text-white">Docker & AWS</span>`, delay: 150 },
  { output: `<span class="text-green-400 mr-2">✔</span> <span class="text-white">Problem Solving</span>`, delay: 400 },
  { output: `<br/><span class="text-zinc-500 uppercase text-xs font-bold tracking-widest">Status:</span><br/><span class="text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]">Ready for Internship</span>`, delay: 0 }
]

const typeText = async (text: string, speed = 35) => {
  isTyping.value = true
  currentTypedText.value = ''
  for (let i = 0; i < text.length; i++) {
    currentTypedText.value += text.charAt(i)
    await new Promise(resolve => setTimeout(resolve, speed + (Math.random() * 20 - 10))) // Randomize typing speed slightly
  }
  isTyping.value = false
}

const runSequence = async () => {
  if (hasStarted.value) return
  hasStarted.value = true
  
  await new Promise(resolve => setTimeout(resolve, 800))
  
  for (const cmd of commands) {
    if (cmd.text) {
      await typeText(cmd.text)
      await new Promise(resolve => setTimeout(resolve, 150))
      visibleLines.value.push(`<span class="text-orange-400 opacity-70">❯</span> ${cmd.text}`)
      currentTypedText.value = ''
    } else if (cmd.output) {
      if (cmd.replaceLine && visibleLines.value.length > 0) {
         // Custom logic to simulate replace (we'll just append for now to be safe, or just pop the last one if it was a loader)
         // Actually, let's just append
         visibleLines.value.push(cmd.output)
      } else {
         visibleLines.value.push(cmd.output)
      }
    }
    
    if (cmd.delay > 0) {
      await new Promise(resolve => setTimeout(resolve, cmd.delay))
    }
  }
  
  // Replace the loading line with an empty line or remove it (simulated)
  const loadingIndex = visibleLines.value.findIndex(l => l.includes('Loading profile...'))
  if (loadingIndex !== -1) {
    visibleLines.value.splice(loadingIndex, 1)
  }
  
  isFinished.value = true
}

onMounted(() => {
  // Start animation slightly after mount for Hero
  setTimeout(() => {
    runSequence()
  }, 500)
})
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes cursor-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.animate-cursor-blink {
  animation: cursor-blink 1s step-end infinite;
}

/* Scanline Effect */
.scanlines {
  background: linear-gradient(
    to bottom,
    rgba(255,255,255,0),
    rgba(255,255,255,0) 50%,
    rgba(0,0,0,0.2) 50%,
    rgba(0,0,0,0.2)
  );
  background-size: 100% 4px;
  animation: scroll-scanlines 10s linear infinite;
}

@keyframes scroll-scanlines {
  0% { background-position: 0 0; }
  100% { background-position: 0 100%; }
}
</style>
