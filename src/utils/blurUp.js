/* ============================================================
   blurUp.js
   Carga progresiva de las imágenes con efecto blur-up.
   La imagen aparece borrosa + un poco escalada, y al cargar
   transiciona a nitidez completa. Si la imagen ya estaba
   cacheada (img.complete), se revela sin animación.
   ============================================================ */

export function initBlurUp() {
  const images = document.querySelectorAll('.hero__image')

  images.forEach((img) => {
    /* Si la imagen ya cargó (cache), saltearse el blur */
    if (img.complete && img.naturalWidth > 0) return

    img.classList.add('is-loading')

    const reveal = () => img.classList.remove('is-loading')

    img.addEventListener('load',  reveal, { once: true })
    img.addEventListener('error', reveal, { once: true })
  })
}
