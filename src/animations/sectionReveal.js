/* Fase 3 — Orquesta la transición sketch→final de cada sección con ScrollTrigger */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function sectionReveal(sketchEl, finalEl, options = {}) {
  const { start = 'top 60%', end = 'bottom 40%' } = options

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sketchEl,
      start,
      end,
      scrub: 0.8,
    },
  })

  tl.to(sketchEl, { opacity: 0, duration: 0.5, ease: 'power2.inOut' })
    .fromTo(finalEl, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.inOut' }, '<0.2')

  return tl
}
