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

   Patrón "scrollytelling": cada sección se ancla en pantalla
   completa mientras ocurre el reveal — el usuario tiene que
   scrollear durante ~1200px (hero) ó ~1000px (resto) para
   completar la construcción, dándole tiempo a disfrutar la
   transición antes de pasar a la siguiente sección.
   ============================================================ */

export function initScrollAnimations() {
  const scenes = document.querySelectorAll('.scene')

  scenes.forEach(scene => {
    const finalLayer = scene.querySelector('.scene__layer--final')
    if (!finalLayer) return

    /* Estado inicial: final layer completamente oculta */
    gsap.set(finalLayer, { clipPath: 'inset(0 100% 0 0)' })

    const isHero = scene.id === 'scene-hero'

    /* ── Cada sección se ancla al top y revela durante su scroll ── */
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
  })

  /* ── Nav: se vuelve sólida al salir del hero ── */
  ScrollTrigger.create({
    trigger: '#scene-hero',
    start: 'bottom 80%',
    onEnter:      () => document.getElementById('site-header')?.classList.add('is-solid'),
    onLeaveBack:  () => document.getElementById('site-header')?.classList.remove('is-solid'),
  })
}
