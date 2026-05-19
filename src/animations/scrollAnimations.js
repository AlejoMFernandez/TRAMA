import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ============================================================
   scrollAnimations.js
   Orquesta la transición sketch→final sección por sección.

   Mecanismo: clip-path inset() de derecha a izquierda.
   Capa final empieza totalmente oculta (inset 0 100% 0 0) y
   se revela de izquierda a derecha (inset 0 0% 0 0) conforme
   la sección entra al viewport.

   Desktop (≥768px): patrón "scrollytelling" — cada sección
   se ancla a pantalla completa y el reveal ocurre durante
   ~1000-1200px de scroll.

   Mobile (<768px): patrón "reveal on enter" — sin pin, la
   sección se revela mientras entra al viewport. Más fluido
   sobre touch scroll y consume menos viewport-height (que
   en mobile es escaso).
   ============================================================ */

const MOBILE_BREAKPOINT = 768

export function initScrollAnimations() {
  const isMobile = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const scenes = document.querySelectorAll('.scene')

  scenes.forEach(scene => {
    const finalLayer = scene.querySelector('.scene__layer--final')
    if (!finalLayer) return

    /* Estado inicial: final layer completamente oculta */
    gsap.set(finalLayer, { clipPath: 'inset(0 100% 0 0)' })

    /* ── prefers-reduced-motion: revelar al instante sin scrub ── */
    if (prefersReducedMotion) {
      gsap.to(finalLayer, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: scene,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })
      return
    }

    const isHero = scene.id === 'scene-hero'

    if (isMobile) {
      /* ── MOBILE: reveal al entrar al viewport, sin pin ── */
      gsap.to(finalLayer, {
        clipPath: 'inset(0 0% 0 0)',
        ease: 'none',
        scrollTrigger: {
          trigger: scene,
          start: 'top 85%',
          end: 'top 30%',
          scrub: 1,
        },
      })
    } else {
      /* ── DESKTOP: cada sección se ancla y revela durante su scroll ── */
      gsap.to(finalLayer, {
        clipPath: 'inset(0 0% 0 0)',
        ease: 'none',
        scrollTrigger: {
          trigger: scene,
          start: 'top top',
          end: isHero ? '+=1200' : '+=1000',
          scrub: 1.2,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      })
    }
  })

  /* ── Nav: se vuelve sólida al salir del hero ── */
  ScrollTrigger.create({
    trigger: '#scene-hero',
    start: 'bottom 80%',
    onEnter:      () => document.getElementById('site-header')?.classList.add('is-solid'),
    onLeaveBack:  () => document.getElementById('site-header')?.classList.remove('is-solid'),
  })

  /* ── Re-init en cambios drásticos de viewport (rotación, resize) ──
     Mejor que adivinar mobile/desktop al vuelo: refrescamos triggers
     y dejamos que el browser recalcule layout. Para cambios entre
     mobile/desktop el usuario tendría que recargar igual. */
  let resizeTimer
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 250)
  })
}
