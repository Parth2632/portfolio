<template>
  <div class="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#0a0a0a]">
    <!-- CSS Noise Texture Overlay -->
    <div class="noise-overlay absolute inset-0 opacity-[0.03] mix-blend-overlay z-10 pointer-events-none"></div>

    <!-- Mouse following glowing radial gradient -->
    <div 
      class="absolute w-[600px] h-[600px] rounded-full blur-[100px] pointer-events-none transition-[left,top] duration-200 ease-out z-0 mix-blend-screen opacity-20 bg-orange-500/40"
      :style="{ left: `${x - 300}px`, top: `${y - 300}px` }"
    ></div>

    <!-- Background grid -->
    <div class="absolute inset-0 grid-pattern"></div>
    
    <!-- Parallax Orbs -->
    <div 
      class="orb-wrapper"
      :style="{ transform: `translate(${x * 0.02}px, ${y * 0.02}px)` }"
    >
      <div class="orb orb-1"></div>
    </div>
    
    <div 
      class="orb-wrapper"
      :style="{ transform: `translate(${x * -0.015}px, ${y * -0.015}px)` }"
    >
      <div class="orb orb-2"></div>
    </div>

    <!-- Center ambient glow -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div class="orb-center"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMouse } from '@vueuse/core'

const { x, y } = useMouse()
</script>

<style scoped>
/* Simple grid pattern - Opacity reduced to 8% */
.grid-pattern {
  background-image: 
    linear-gradient(rgba(249, 115, 22, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(249, 115, 22, 0.08) 1px, transparent 1px);
  background-size: 32px 32px; /* Made grid slightly larger for cleaner look */
}

/* Noise overlay */
.noise-overlay {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  animation: noise-shift 8s steps(10) infinite;
}

@keyframes noise-shift {
  0%, 100% { background-position: 0 0; }
  10% { background-position: -5% -10%; }
  20% { background-position: -15% 5%; }
  30% { background-position: 7% -25%; }
  40% { background-position: -5% 25%; }
  50% { background-position: -15% 10%; }
  60% { background-position: 15% 0%; }
  70% { background-position: 0% 15%; }
  80% { background-position: 3% 35%; }
  90% { background-position: -10% 10%; }
}

/* Simple floating animation */
@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(30px, -50px); }
  66% { transform: translate(-20px, 20px); }
}

/* Wrapper for parallax movement */
.orb-wrapper {
  position: absolute;
  pointer-events: none;
  transition: transform 0.15s ease-out;
}

/* Base orb styles */
.orb {
  position: relative;
  pointer-events: none;
  border-radius: 50%;
  filter: blur(100px);
  will-change: transform;
}

.orb-wrapper:nth-child(4) {
  top: -20%;
  right: -10%;
}

.orb-wrapper:nth-child(5) {
  bottom: -10%;
  left: -10%;
}

/* Orb styles */
.orb-1 {
  width: 700px;
  height: 700px;
  background: radial-gradient(circle at center, rgba(249, 115, 22, 0.15), transparent 70%);
  animation: float 20s ease-in-out infinite;
}

.orb-2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle at center, rgba(249, 115, 22, 0.1), transparent 70%);
  animation: float 25s ease-in-out infinite reverse;
}

.orb-center {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle at center, rgba(234, 88, 12, 0.15), transparent 60%);
  animation: float 35s ease-in-out infinite;
  animation-delay: -15s;
  filter: blur(120px);
}
</style>
