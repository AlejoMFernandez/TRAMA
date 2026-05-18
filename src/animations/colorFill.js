/* Fase 3/4 — Transición de color via clip-path (izquierda → derecha) */
import { gsap } from 'gsap'

export function colorFill(el, duration = 0.9, delay = 0) {
  gsap.set(el, { clipPath: 'inset(0 100% 0 0)' })
  return gsap.to(el, {
    clipPath: 'inset(0 0% 0 0)',
    duration,
    delay,
    ease: 'power3.inOut',
  })
}
