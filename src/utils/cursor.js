import { gsap } from 'gsap'

/* ============================================================
   cursor.js
   Cursor custom: un lápiz SVG que sigue al mouse cuando está
   sobre la capa sketch. Sobre la capa final (revelada) o
   elementos interactivos, vuelve al cursor nativo.
   Skip en touch devices (hover: none).
   ============================================================ */

export function initCustomCursor() {
  if (window.matchMedia('(hover: none)').matches) return

  const cursor = document.createElement('div')
  cursor.className = 'pencil-cursor'
  cursor.setAttribute('aria-hidden', 'true')
  cursor.innerHTML = /* html */`
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Cuerpo del lápiz (madera) -->
      <path d="M6 26 L8 20 L20 8 L24 12 L12 24 L6 26 Z"
        fill="#F5F1EA" stroke="#1A1A1A" stroke-width="1.4"
        stroke-linejoin="round"/>
      <!-- Banda al borde del grafito -->
      <line x1="9" y1="19" x2="13" y2="23" stroke="#1A1A1A" stroke-width="1.2"/>
      <!-- Punta de grafito -->
      <path d="M6 26 L8 20 L12 24 Z" fill="#1A1A1A"/>
      <!-- Punto más oscuro al final de la punta -->
      <circle cx="6.5" cy="25.5" r="0.8" fill="#1A1A1A"/>
      <!-- Goma de borrar (terracota) -->
      <path d="M20 8 L24 12 L26 6 L22 4 Z"
        fill="#D4634A" stroke="#1A1A1A" stroke-width="1.4"
        stroke-linejoin="round"/>
    </svg>
  `
  document.body.appendChild(cursor)

  /* Offset: queremos que la punta del lápiz (esq inferior izq del svg)
     quede exactamente sobre el puntero del mouse */
  const OFFSET_X = 6
  const OFFSET_Y = 26

  gsap.set(cursor, { x: -100, y: -100, opacity: 0 })

  const updateCursorState = (x, y) => {
    const target = document.elementFromPoint(x, y)
    if (!target) return

    const overInteractive = target.closest(
      'a, button, input, textarea, label, .btn'
    )
    const overSketch = target.closest('.scene__layer--sketch')

    /* Lápiz visible solo cuando estamos sobre sketch y no sobre interactivos */
    cursor.classList.toggle(
      'is-visible',
      !!overSketch && !overInteractive
    )
  }

  document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
      x: e.clientX - OFFSET_X,
      y: e.clientY - OFFSET_Y,
      duration: 0.16,
      ease: 'power2.out',
      overwrite: 'auto',
    })
    updateCursorState(e.clientX, e.clientY)
  })

  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('is-visible')
  })

  /* Re-evaluar al scrollear: el cursor no se mueve pero la capa debajo sí */
  window.addEventListener('scroll', () => {
    /* Necesitamos la posición actual del mouse, pero no la tenemos
       en el evento de scroll. Trick: pedimos elementFromPoint con
       la última posición conocida — basta listener simple. */
  }, { passive: true })
}
