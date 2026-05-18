/* ============================================================
   Proceso — Cuatro fases de un proyecto arquitectónico
   Concepto · Anteproyecto · Ejecutivo · Obra
   ============================================================ */

const PASOS = [
  {
    num: '01',
    title: 'Concepto',
    desc: 'Visitamos el terreno, escuchamos cómo querés vivir el espacio y dibujamos los primeros croquis. Salen ideas, no aún planos.',
  },
  {
    num: '02',
    title: 'Anteproyecto',
    desc: 'Plantas, cortes y vistas con materialidad definida. Modelo 3D para que veas el espacio antes de aprobar nada en obra.',
  },
  {
    num: '03',
    title: 'Proyecto ejecutivo',
    desc: 'Planos técnicos, planillas, especificaciones de terminaciones y cómputo. Todo lo que necesita una constructora para presupuestar bien.',
  },
  {
    num: '04',
    title: 'Obra',
    desc: 'Dirección semanal, control de calidad y resolución de detalles in situ. Te acompañamos hasta la entrega de llaves.',
  },
]

export function procesoHTML() {
  return /* html */`
<section class="section section--proceso" id="proceso">
  <div class="section__inner">

    <header class="section__header">
      <span class="section__label">02 / Cómo trabajamos</span>
      <h2 class="section__title">De la idea a la obra</h2>
      <p class="section__sub">Un proceso ordenado en cuatro fases. Vos sabés en qué etapa estamos y qué se decide en cada una.</p>
    </header>

    <div class="timeline" role="list">
      ${PASOS.map(p => /* html */`
      <div class="timeline__step" role="listitem" data-step="${p.num}">
        <div class="timeline__node" aria-hidden="true">
          <span class="timeline__num">${p.num}</span>
        </div>
        <div class="timeline__body">
          <h4 class="timeline__title">${p.title}</h4>
          <p class="timeline__desc">${p.desc}</p>
        </div>
      </div>
      `).join('')}
    </div>

  </div>
</section>
  `.trim()
}
