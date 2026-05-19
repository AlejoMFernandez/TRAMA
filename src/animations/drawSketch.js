/* ============================================================
   drawSketch.js
   Animación "dibujado a mano" del corte arquitectónico del hero.

   Implementación: Web Animations API nativa.
   Evita los quirks de GSAP CSSPlugin con multi-value strings
   y los problemas de kickoff de CSS transitions cuando el
   property + value cambian en el mismo frame.

   Flujo por trazo:
     1. Calculamos longitud (getTotalLength + fallback geométrico)
     2. Set inicial vía DOM: dasharray = length, dashoffset = length
     3. element.animate([from, to], options) → se dibuja
     4. onfinish: restauramos el dasharray original (patrón
        discontinuo del boceto) y cancelamos la animación
   ============================================================ */

const DELAY_INITIAL = 300   /* ms antes del primer trazo */
const DELAY_STAGGER = 38    /* ms entre cada trazo */
const DURATION_LINE = 650   /* ms duración de cada trazo */
const TEXT_FADE     = 450   /* ms duración fade de textos */

export function initDrawSketch() {
  const svg = document.querySelector('.scene__layer--sketch .hero__wireframe')
  if (!svg) return

  const all = svg.querySelectorAll(
    'path, rect, line, circle, polyline, polygon, ellipse'
  )
  const strokes = Array.from(all).filter(el => !el.closest('defs, pattern'))
  const texts   = Array.from(svg.querySelectorAll('text'))

  /* ── Trazos: setup inicial + Web Animation ── */
  strokes.forEach((el, i) => {
    const length = getStrokeLength(el)
    if (!length) return

    const originalDasharray = el.getAttribute('stroke-dasharray')

    /* Estado inicial: línea invisible (dashoffset = length) */
    el.style.strokeDasharray  = String(length)
    el.style.strokeDashoffset = String(length)

    /* Animación nativa, completamente independiente de CSS transitions */
    const anim = el.animate(
      [
        { strokeDashoffset: length },
        { strokeDashoffset: 0 },
      ],
      {
        duration: DURATION_LINE,
        delay: DELAY_INITIAL + i * DELAY_STAGGER,
        easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
        fill: 'forwards',
      }
    )

    anim.onfinish = () => {
      /* Restaurar el dasharray original (devolvemos el look
         "lápiz discontinuo" del estado boceto) y limpiar */
      el.style.strokeDasharray  = originalDasharray || ''
      el.style.strokeDashoffset = ''
      anim.cancel()
    }
  })

  /* ── Textos: fade in al final del dibujo ── */
  const textsStartDelay =
    DELAY_INITIAL + strokes.length * DELAY_STAGGER + 80

  texts.forEach((t, i) => {
    t.style.opacity = '0'
    const anim = t.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      {
        duration: TEXT_FADE,
        delay: textsStartDelay + i * 35,
        easing: 'ease-out',
        fill: 'forwards',
      }
    )
    anim.onfinish = () => {
      t.style.opacity = '1'
      anim.cancel()
    }
  })
}

/* ── Length helper: getTotalLength + fallbacks geométricos ── */
function getStrokeLength(el) {
  if (typeof el.getTotalLength === 'function') {
    try {
      const l = el.getTotalLength()
      if (l > 0) return l
    } catch (_) { /* algunos browsers tiran en rect/circle */ }
  }

  const tag = el.tagName.toLowerCase()
  const n = (attr) => parseFloat(el.getAttribute(attr)) || 0

  if (tag === 'rect')   return 2 * (n('width') + n('height'))
  if (tag === 'circle') return 2 * Math.PI * n('r')
  if (tag === 'line')   return Math.hypot(n('x2') - n('x1'), n('y2') - n('y1'))
  if (tag === 'ellipse') {
    const rx = n('rx'), ry = n('ry')
    return Math.PI * (3 * (rx + ry) - Math.sqrt((3 * rx + ry) * (rx + 3 * ry)))
  }
  return 200
}
