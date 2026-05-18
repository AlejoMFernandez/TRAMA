import './styles/main.css'
import './styles/sketch.css'
import './styles/final.css'

import { heroHTML }      from './components/Hero.js'
import { serviciosHTML } from './components/Servicios.js'
import { procesoHTML }   from './components/Proceso.js'
import { contactoHTML }  from './components/Contacto.js'
import { initLenis }     from './utils/lenis.js'
import { initScrollAnimations } from './animations/scrollAnimations.js'

/* ── Construir escenas ────────────────────────────────────── */
function scene(id, html) {
  return /* html */`
<div class="scene" id="scene-${id}">
  <div class="scene__layer scene__layer--sketch">${html}</div>
  <div class="scene__layer scene__layer--final">${html}</div>
</div>`
}

document.getElementById('app').innerHTML = [
  scene('hero',      heroHTML()),
  scene('servicios', serviciosHTML()),
  scene('proceso',   procesoHTML()),
  scene('contacto',  contactoHTML()),
].join('\n')

/* ── Init smooth scroll + animaciones ────────────────────── */
initLenis()
initScrollAnimations()
