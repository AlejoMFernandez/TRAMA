/* ============================================================
   Servicios — Tres áreas de TRAMA Estudio
   Vivienda · Comercial · Interiorismo
   ============================================================ */

const SERVICIOS = [
  {
    label: '01',
    title: 'Vivienda',
    desc: 'Casas unifamiliares, ampliaciones y refacciones. Proyectos pensados desde el clima, la luz natural y la forma en que se habita cada metro cuadrado.',
    /* Casa: techo + cuerpo + puerta */
    icon: `<path d="M3 11 L12 3 L21 11"/><path d="M5 10 L5 20 L19 20 L19 10"/><path d="M10 20 L10 14 L14 14 L14 20"/>`,
  },
  {
    label: '02',
    title: 'Comercial',
    desc: 'Locales gastronómicos, retail y espacios de trabajo chicos. Identidad espacial coherente con la marca, optimizando flujo y experiencia del cliente.',
    /* Vidriera de local con toldo */
    icon: `<path d="M3 9 L21 9 L19 5 L5 5 Z"/><path d="M4 9 L4 21 L20 21 L20 9"/><path d="M9 21 L9 14 L15 14 L15 21"/>`,
  },
  {
    label: '03',
    title: 'Interiorismo',
    desc: 'Diseño de interiores integral: distribución, mobiliario a medida, paleta de materiales y dirección de obra. De los planos a las llaves en mano.',
    /* Silla / sillón simple */
    icon: `<path d="M5 11 L5 7 Q5 5 7 5 L17 5 Q19 5 19 7 L19 11"/><path d="M3 11 L21 11 L21 16 L3 16 Z"/><path d="M6 16 L6 20"/><path d="M18 16 L18 20"/>`,
  },
]

export function serviciosHTML() {
  return /* html */`
<section class="section section--servicios" id="servicios">
  <div class="section__inner">

    <header class="section__header">
      <span class="section__label">01 / Qué hacemos</span>
      <h2 class="section__title">Lo que diseñamos</h2>
      <p class="section__sub">Tres áreas, una misma forma de trabajar: escuchar mucho, dibujar a mano antes que en pantalla, y acompañar la obra hasta el último detalle.</p>
    </header>

    <div class="cards">
      ${SERVICIOS.map(s => /* html */`
      <article class="card" data-service="${s.label}">
        <div class="card__top">
          <div class="card__icon-wrap" aria-hidden="true">
            <svg
              class="card__icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >${s.icon}</svg>
          </div>
          <span class="card__num">${s.label}</span>
        </div>
        <h3 class="card__title">${s.title}</h3>
        <p class="card__desc">${s.desc}</p>
        <span class="card__cta">Ver proyectos →</span>
      </article>
      `).join('')}
    </div>

  </div>
</section>
  `.trim()
}
