/* ============================================================
   Contacto — TRAMA Estudio
   Info de estudio + formulario de consulta
   ============================================================ */

export function contactoHTML() {
  return /* html */`
<section class="section section--contacto" id="contacto">
  <div class="section__inner">
    <div class="contacto__grid">

      <!-- ── Columna izquierda: header + info ── -->
      <div class="contacto__left">
        <header class="section__header contacto__header">
          <span class="section__label">03 / Empecemos</span>
          <h2 class="section__title">Contanos tu proyecto</h2>
          <p class="section__sub">
            ¿Tenés un terreno, una casa para refaccionar o un
            local en mente? Escribinos y agendamos una primera
            visita sin cargo.
          </p>
        </header>

        <div class="contacto__meta">
          <a class="contacto__link" href="mailto:hola@trama.estudio">
            <span class="contacto__link-label">Email</span>
            <span class="contacto__link-val">hola@trama.estudio</span>
          </a>
          <a class="contacto__link" href="#">
            <span class="contacto__link-label">Instagram</span>
            <span class="contacto__link-val">@trama.estudio</span>
          </a>
          <a class="contacto__link" href="#">
            <span class="contacto__link-label">Estudio</span>
            <span class="contacto__link-val">Av. Libertador 4830 · CABA</span>
          </a>
          <div class="contacto__response">
            <span class="contacto__link-label">Primera visita</span>
            <span class="contacto__link-val">Sin cargo, en tu terreno ✓</span>
          </div>
        </div>

        <!-- Sketch only: anotación a mano -->
        <div class="contacto__sketch-note" aria-hidden="true">
          <svg viewBox="0 0 80 40" fill="none" class="contacto__arrow-svg">
            <path d="M4,20 C20,5 50,35 76,20" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3"/>
            <path d="M70,16 L76,20 L70,24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Te respondemos en 48 hs</span>
        </div>
      </div>

      <!-- ── Columna derecha: form ── -->
      <form class="contacto__form" novalidate>
        <div class="form__row form__row--2col">
          <div class="form__field">
            <label class="form__label" for="contact-nombre">Nombre</label>
            <input
              class="form__input"
              type="text"
              id="contact-nombre"
              name="nombre"
              placeholder="Tu nombre"
              autocomplete="given-name"
            >
          </div>
          <div class="form__field">
            <label class="form__label" for="contact-email">Email</label>
            <input
              class="form__input"
              type="email"
              id="contact-email"
              name="email"
              placeholder="tu@email.com"
              autocomplete="email"
            >
          </div>
        </div>

        <div class="form__field">
          <label class="form__label" for="contact-mensaje">Sobre tu proyecto</label>
          <textarea
            class="form__input form__textarea"
            id="contact-mensaje"
            name="mensaje"
            rows="5"
            placeholder="Tipo de proyecto (vivienda, local, interiorismo), ubicación aproximada, m² estimados y plazo en mente."
          ></textarea>
        </div>

        <button class="btn btn--primary btn--send" type="submit">
          Enviar consulta
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </form>

    </div><!-- /contacto__grid -->
  </div>
</section>
  `.trim()
}
