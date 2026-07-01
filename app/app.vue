<template>
  <div class="relative min-h-screen overflow-x-hidden font-mono antialiased text-white bg-black" role="document">
    <!-- Background Grid -->
    <div class="fixed inset-0 pointer-events-none" aria-hidden="true">
      <div class="absolute inset-0 bg-gradient-to-b from-orange-900/20 via-black to-black"></div>
      <div class="absolute inset-0 bg-grid-pattern [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
    </div>

    <!-- Animated orbs -->
    <BackgroundOrbs aria-hidden="true" />

    <!-- Global tech icons - rendered behind content, interaction via JS hit-testing -->
    <GlobalTechIcons aria-hidden="true" />

    <!-- Main content -->
    <main id="main-content" class="relative z-10">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: '%s',
})


defineOgImageComponent('Frame')
</script>

<style>
.bg-grid-pattern {
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* Prevent overscroll bounce on mobile */
html, body {
  overscroll-behavior: none;
}

/* Ensure window scrolling works properly with Lenis */
html {
  /* Removed scroll-behavior: smooth to prevent conflict with Lenis */
}

body {
  min-height: 100vh;
}

/* Hide scrollbar for Chrome, Safari and Opera */
::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
html {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

/* Simple, Clean Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, filter 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(4px);
}

/* Accessibility: Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition: opacity 0.15s ease;
  }

  .page-enter-from,
  .page-leave-to {
    filter: none;
  }
}
</style>
