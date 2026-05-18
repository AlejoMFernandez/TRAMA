/* Fase 4 — Anima stroke-dashoffset de paths SVG (efecto "dibujándose") */
import { gsap } from 'gsap'

export function drawStroke(pathEl, duration = 1.2, delay = 0) {
  const length = pathEl.getTotalLength()
  gsap.set(pathEl, { strokeDasharray: length, strokeDashoffset: length })
  return gsap.to(pathEl, {
    strokeDashoffset: 0,
    duration,
    delay,
    ease: 'power3.out',
  })
}
