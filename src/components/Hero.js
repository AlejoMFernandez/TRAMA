/* ============================================================
   Hero — TRAMA Estudio
   Estado boceto: corte arquitectónico a mano con cotas
   Estado final:  foto de obra terminada
   ============================================================ */

export function heroHTML() {
  return /* html */`
<section class="hero">

  <!-- Fondo de grilla (solo visible en sketch via CSS) -->
  <div class="hero__grid-bg" aria-hidden="true"></div>

  <div class="hero__container">

    <!-- ── Columna de contenido ───────────────────────── -->
    <div class="hero__content">

      <span class="hero__eyebrow">TRAMA · Estudio de Arquitectura</span>

      <h1 class="hero__title">
        Espacios que se
        <span class="hero__title-line2">
          <span class="hero__accent">
            construyen
            <!-- Subrayado SVG animable en Fase 4 -->
            <svg
              class="hero__svg-underline"
              viewBox="0 0 320 22"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                class="hero__underline-path"
                d="M4,16 C55,4 110,22 165,14 C220,6 270,20 316,14"
              />
            </svg>
          </span>
        </span>
        ante tus ojos
      </h1>

      <p class="hero__sub">
        Estudio de arquitectura en Buenos Aires.
        Diseñamos viviendas, comercios e interiores donde cada
        línea del primer croquis se convierte en un espacio
        habitable, cuidado y a tu medida.
      </p>

      <div class="hero__cta">
        <a href="#scene-servicios" class="btn btn--primary">Ver nuestros proyectos</a>
        <a href="#scene-contacto" class="btn btn--ghost">Empezar un proyecto →</a>
      </div>

    </div><!-- /hero__content -->

    <!-- ── Columna visual ─────────────────────────────── -->
    <div class="hero__visual">

      <!-- SKETCH: corte arquitectónico SVG -->
      <div class="hero__wireframe-wrap" aria-hidden="true">
        ${architecturalSketchSVG()}
      </div>

      <!-- FINAL: foto de obra real + bloque accent -->
      <div class="hero__image-wrap">
        <div class="hero__image-frame">
          <picture>
            <source srcset="/casa-rd04.webp" type="image/webp">
            <img
              class="hero__image"
              src="/casa-rd04.jpg"
              alt="Casa RD-04 — vivienda unifamiliar diseñada por TRAMA Estudio"
              loading="eager"
              fetchpriority="high"
              width="1341"
              height="1173"
            />
          </picture>
        </div>
        <div class="hero__image-accent" aria-hidden="true"></div>
      </div>

    </div><!-- /hero__visual -->

  </div><!-- /hero__container -->

  <!-- Anotaciones técnicas (solo visibles en sketch) -->
  <footer class="hero__annotations" aria-hidden="true">
    <span class="hero__ann">Corte transversal · Esc 1:100</span>
    <span class="hero__ann">Cota nivel ± 0.00 (terreno natural)</span>
    <span class="hero__ann">Doble altura sobre estar — 6.20 m</span>
    <span class="hero__ann">Casa RD-04 · San Isidro · 2024</span>
  </footer>

</section>
  `.trim()
}

/* ── Architectural Sketch SVG ──────────────────────────────
   Corte de vivienda de dos plantas con cotas, terreno
   hachurado, árbol para escala y cartouche con título.
   ─────────────────────────────────────────────────────────── */
function architecturalSketchSVG() {
  return /* html */`
<svg
  class="hero__wireframe"
  viewBox="0 0 320 280"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <!-- Patrón de hachura para terreno -->
  <defs>
    <pattern id="ground-hatch" x="0" y="0" width="6" height="6"
             patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="6" stroke="#C8C8C8" stroke-width="0.7"/>
    </pattern>
  </defs>

  <!-- Marco exterior del plano -->
  <rect x="1" y="1" width="318" height="278" rx="3"
    stroke="#C2C2C2" stroke-width="1" stroke-dasharray="6 3"/>

  <!-- ── COTA SUPERIOR (ancho total) ── -->
  <line x1="55" y1="40" x2="265" y2="40" stroke="#B8B8B8" stroke-width="0.8"/>
  <line x1="55" y1="35" x2="55" y2="45" stroke="#B8B8B8" stroke-width="0.8"/>
  <line x1="265" y1="35" x2="265" y2="45" stroke="#B8B8B8" stroke-width="0.8"/>
  <text x="160" y="32"
    font-family="'Caveat', cursive" font-size="14" font-weight="600"
    fill="#888" text-anchor="middle"
  >8.40 m</text>

  <!-- ── TERRENO (línea natural + hachura) ── -->
  <line x1="20" y1="215" x2="300" y2="215" stroke="#777" stroke-width="1.8"/>
  <rect x="20" y="215" width="280" height="14" fill="url(#ground-hatch)"/>
  <text x="20" y="212"
    font-family="'Caveat', cursive" font-size="11"
    fill="#999"
  >± 0.00</text>

  <!-- ── CUERPO PRINCIPAL DE LA CASA (dos plantas) ── -->
  <rect x="65" y="105" width="180" height="110"
    stroke="#666" stroke-width="1.6" stroke-dasharray="8 3"/>

  <!-- ── LOSA DE TECHO (con voladizo) ── -->
  <line x1="55" y1="105" x2="255" y2="105" stroke="#555" stroke-width="2"/>
  <line x1="55" y1="105" x2="55" y2="100" stroke="#555" stroke-width="2"/>
  <line x1="255" y1="105" x2="255" y2="100" stroke="#555" stroke-width="2"/>
  <line x1="55" y1="100" x2="255" y2="100" stroke="#777" stroke-width="1"/>

  <!-- ── ENTREPISO (división de plantas) ── -->
  <line x1="65" y1="160" x2="245" y2="160"
    stroke="#999" stroke-width="0.9" stroke-dasharray="4 3"/>
  <text x="248" y="163"
    font-family="'Caveat', cursive" font-size="10"
    fill="#999"
  >+3.10</text>

  <!-- ── PLANTA ALTA: ventana dormitorio ── -->
  <rect x="80" y="118" width="50" height="28"
    stroke="#777" stroke-width="1.2" stroke-dasharray="4 2"/>
  <line x1="105" y1="118" x2="105" y2="146"
    stroke="#AAA" stroke-width="0.8" stroke-dasharray="2 2"/>

  <!-- ── PLANTA ALTA: ventanal estar (doble altura) ── -->
  <rect x="160" y="118" width="75" height="28"
    stroke="#777" stroke-width="1.2" stroke-dasharray="4 2"/>
  <line x1="197" y1="118" x2="197" y2="146"
    stroke="#AAA" stroke-width="0.8" stroke-dasharray="2 2"/>

  <!-- ── PLANTA BAJA: puerta principal ── -->
  <rect x="80" y="175" width="22" height="40"
    stroke="#777" stroke-width="1.3" stroke-dasharray="4 2"/>
  <path d="M 80 215 Q 91 195 102 215"
    stroke="#AAA" stroke-width="0.7" fill="none" stroke-dasharray="2 2"/>

  <!-- ── PLANTA BAJA: ventanal estar ── -->
  <rect x="115" y="170" width="120" height="45"
    stroke="#777" stroke-width="1.3" stroke-dasharray="4 2"/>
  <line x1="155" y1="170" x2="155" y2="215"
    stroke="#AAA" stroke-width="0.7" stroke-dasharray="2 2"/>
  <line x1="195" y1="170" x2="195" y2="215"
    stroke="#AAA" stroke-width="0.7" stroke-dasharray="2 2"/>

  <!-- ── COTA LATERAL (altura total) ── -->
  <line x1="278" y1="105" x2="278" y2="215" stroke="#B8B8B8" stroke-width="0.8"/>
  <line x1="273" y1="105" x2="283" y2="105" stroke="#B8B8B8" stroke-width="0.8"/>
  <line x1="273" y1="215" x2="283" y2="215" stroke="#B8B8B8" stroke-width="0.8"/>
  <text x="290" y="163"
    font-family="'Caveat', cursive" font-size="14" font-weight="600"
    fill="#888" text-anchor="middle"
    transform="rotate(90 290 163)"
  >6.20 m</text>

  <!-- ── ÁRBOL PARA ESCALA ── -->
  <line x1="38" y1="215" x2="38" y2="178" stroke="#777" stroke-width="1.3"/>
  <circle cx="38" cy="170" r="12"
    stroke="#777" stroke-width="1.3" stroke-dasharray="3 2" fill="none"/>
  <circle cx="34" cy="167" r="4"
    stroke="#999" stroke-width="0.8" stroke-dasharray="2 1" fill="none"/>
  <circle cx="42" cy="172" r="3"
    stroke="#999" stroke-width="0.8" stroke-dasharray="2 1" fill="none"/>

  <!-- ── PERSONA PARA ESCALA (silueta simple) ── -->
  <circle cx="260" cy="200" r="3" stroke="#888" stroke-width="1" fill="none"/>
  <line x1="260" y1="203" x2="260" y2="215" stroke="#888" stroke-width="1"/>
  <line x1="260" y1="207" x2="256" y2="213" stroke="#888" stroke-width="1"/>
  <line x1="260" y1="207" x2="264" y2="213" stroke="#888" stroke-width="1"/>

  <!-- ── CARTOUCHE (título del plano) ── -->
  <line x1="20" y1="245" x2="300" y2="245" stroke="#CCC" stroke-width="0.6"/>
  <text x="20" y="260"
    font-family="'SF Mono', 'Fira Code', monospace" font-size="9"
    fill="#999"
  >CORTE A-A'</text>
  <text x="160" y="260"
    font-family="'SF Mono', 'Fira Code', monospace" font-size="9"
    fill="#888" text-anchor="middle" font-weight="600"
  >CASA RD-04</text>
  <text x="300" y="260"
    font-family="'SF Mono', 'Fira Code', monospace" font-size="9"
    fill="#999" text-anchor="end"
  >ESC 1:100</text>
</svg>
  `.trim()
}
