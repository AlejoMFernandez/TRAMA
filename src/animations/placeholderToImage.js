/* Fase 4 — Blur-up: placeholder gris → foto real */
import { gsap } from 'gsap'

export function placeholderToImage(imgEl, duration = 1.0, delay = 0) {
  gsap.set(imgEl, { filter: 'blur(20px) grayscale(1)', scale: 1.05 })
  return gsap.to(imgEl, {
    filter: 'blur(0px) grayscale(0)',
    scale: 1,
    duration,
    delay,
    ease: 'power3.out',
  })
}
