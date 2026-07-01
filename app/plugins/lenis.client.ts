import Lenis from 'lenis'

export default defineNuxtPlugin((nuxtApp) => {
  const lenis = new Lenis({
    lerp: 0.06, 
    wheelMultiplier: 0.9, 
    smoothWheel: true,
  })

  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  nuxtApp.provide('lenis', lenis)
})
