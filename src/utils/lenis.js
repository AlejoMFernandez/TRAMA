import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 1.5,
  })

  /* RAF loop — conecta Lenis con ScrollTrigger */
  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  /* Notificar a ScrollTrigger en cada scroll de Lenis */
  lenis.on('scroll', ScrollTrigger.update)

  return lenis
}
