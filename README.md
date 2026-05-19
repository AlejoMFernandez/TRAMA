# TRAMA Estudio · Landing meta

> Una landing page que **se construye ante los ojos del usuario** mientras la scrollea.
>
> Pieza de portfolio para un cliente ficticio (TRAMA, estudio de arquitectura boutique en Buenos Aires). El concepto: cada sección empieza como un croquis a lápiz sobre papel milimétrico y se transforma en su versión final terminada conforme el usuario hace scroll. El medio es el mensaje — un estudio de arquitectura cuyo sitio web literalmente se "construye" como si fuera uno de sus proyectos.

**🔗 Live demo:** [trama-ten.vercel.app](https://trama-ten.vercel.app)

---

## El concepto

Cada sección de la página vive en dos estados superpuestos:

| Estado | Cómo se ve | Implementación |
|---|---|---|
| **Sketch** (lápiz) | Tipografía Caveat, líneas discontinuas, fondo papel milimétrico, anotaciones técnicas | Capa siempre visible |
| **Final** (terminado) | Tipografía Clash Display + Satoshi, fotos reales, paleta crema/tinta/terracota | Capa superpuesta con `clip-path` controlado por scroll |

La capa final arranca oculta (`clip-path: inset(0 100% 0 0)`) y se revela de izquierda a derecha (`inset(0 0% 0 0)`) conforme entra al viewport. Sobre desktop, cada sección se **ancla a pantalla completa** ("scrollytelling") mientras dura la transición — así el usuario tiene tiempo de apreciar el momento. Sobre mobile, el reveal ocurre simplemente al entrar en pantalla, sin pin, para que el scroll no se sienta pegajoso al toque.

---

## Stack

- **[Vite 5](https://vitejs.dev/)** — dev server y bundler
- **Vanilla JavaScript** — sin framework. Cada sección es una función que devuelve un string HTML
- **[GSAP 3 + ScrollTrigger](https://gsap.com/)** — animación de `clip-path` controlada por scroll, pinning de secciones
- **[Lenis](https://lenis.darkroom.engineering/)** — smooth scroll inerte, conectado a ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)`
- **Web Animations API nativa** — para el dibujado "a mano" del SVG del corte arquitectónico (más limpio que GSAP para este caso, evita el conflicto del CSSPlugin con `stroke-dasharray` multi-valor)
- **CSS Grid + clip-path** — overlay de capas sketch/final en la misma celda del grid

**Tipografía:**
- [Clash Display](https://www.fontshare.com/fonts/clash-display) (display, vía Fontshare)
- [Satoshi](https://www.fontshare.com/fonts/satoshi) (body, vía Fontshare)
- [Caveat](https://fonts.google.com/specimen/Caveat) (estado boceto, vía Google Fonts)

**Hosting:** Vercel · CI/CD automático con cada push a `main`.

---

## Features destacadas

### 🎬 Animación de "construcción" sección por sección
Cada `.scene` tiene dos capas (`__layer--sketch` y `__layer--final`) que comparten la misma celda del CSS Grid. La capa final usa `clip-path` animado por GSAP ScrollTrigger en scrub mode (la animación se ata a la posición del scroll, no al tiempo).

### ✏️ Corte arquitectónico que se dibuja a mano
Al cargar el hero, el SVG del corte (vivienda de 2 plantas con cotas, terreno hachurado, cartouche con "CORTE A-A' · CASA RD-04 · ESC 1:100") se dibuja línea por línea usando `stroke-dashoffset` con Web Animations API. Trick: el `stroke-dasharray` original ("6 3", "4 2" para emular trazo discontinuo a lápiz) se guarda antes de la animación y se restaura al terminar, para no perder la estética de boceto.

### 🖱️ Cursor lápiz custom
Un SVG de un lápiz Faber-Castell sigue al mouse sobre las áreas en estado sketch. Cuando el cursor pasa sobre la capa final revelada (o sobre nav, botones e inputs), se oculta y vuelve el cursor nativo del sistema. La detección usa `document.elementFromPoint` que **respeta el `clip-path`**, así que el toggle ocurre automáticamente sin que tengamos que calcular nosotros qué porcentaje está revelado.

Desactivado en touch devices (`@media (hover: none)`) y para usuarios con `prefers-reduced-motion`.

### 🖼️ Hero image con blur-up + WebP
La foto del hero (`<picture>` con WebP + JPG fallback) entra con `filter: blur(22px)` + `transform: scale(1.04)` y transiciona a nítida al disparar el evento `load`. Optimizada de 2.6 MB (PNG original de DALL-E) a **213 KB en WebP** con `sharp`.

### 📱 Mobile responsive
- En `< 768px` se desactiva el pinning de scroll (los scrubs largos se sienten mal en touch). Cada sección usa un `start: 'top 85%' / end: 'top 30%'` simple
- Layouts colapsan a 1 columna en hero, servicios, proceso y contacto
- Nav mobile muestra solo el CTA "Contacto" — los anchors internos se navegan con scroll natural
- Tipografía clamp() escalando suavemente

### ♿ Accesibilidad
- `prefers-reduced-motion` desactiva pin/scrub y muestra cada sección con un fade simple
- Cursor custom desactivado en touch
- `alt` en todas las imágenes, `aria-hidden` en decorativos, `aria-label` en nav
- Foco visible en CTAs y inputs (estilos default conservados)

---

## Estructura

```
src/
├── components/        # Cada función devuelve HTML string de su sección
│   ├── Hero.js        ← incluye SVG inline del corte arquitectónico
│   ├── Servicios.js
│   ├── Proceso.js
│   └── Contacto.js
├── animations/
│   ├── scrollAnimations.js  ← GSAP ScrollTrigger + pinning sección por sección
│   └── drawSketch.js        ← Web Animations API para el dibujado del SVG
├── utils/
│   ├── lenis.js       ← inicialización smooth scroll
│   ├── cursor.js      ← cursor lápiz follower
│   └── blurUp.js      ← blur→sharp en imágenes hero
├── styles/
│   ├── main.css       ← variables, reset, escenas, nav, layouts, mobile
│   ├── sketch.css     ← estética estado boceto (.scene__layer--sketch *)
│   └── final.css      ← estética estado terminado (.scene__layer--final *)
└── main.js            ← entry point: arma escenas, dispara init de todo

public/
└── casa-rd04.{webp,jpg}  ← hero image (generada con DALL-E, optimizada con sharp)

index.html             ← nav + <main id="app"> donde main.js inyecta las escenas
```

---

## Desarrollo

Requisitos: **Node ≥18**.

```bash
# Instalar dependencias
npm install

# Dev server (Vite hot reload en localhost:5173)
npm run dev

# Build de producción → dist/
npm run build

# Preview del build local
npm run preview
```

---

## Decisiones técnicas comentables

**¿Por qué vanilla y no React/Vue/Svelte?**
Para una landing one-page sin estado complejo, el framework era overhead innecesario. Vanilla + Vite da un bundle final más liviano (57 KB JS gzipped incluyendo GSAP + Lenis), HMR instantáneo y cero abstraction tax. Los componentes son funciones que devuelven strings — perfectamente legibles.

**¿Por qué Web Animations API en vez de GSAP para el dibujado del SVG?**
El SVG del corte tiene muchos elementos con `stroke-dasharray="6 3"` (líneas discontinuas para emular trazo a lápiz). GSAP CSSPlugin intenta ser inteligente con valores multi-componente y termina interpolando "6 3" → "1186 3", lo que rompe el estado intermedio. Web Animations API maneja keyframes explícitos sin esa magia, y permite limpiar el dasharray al final con `anim.onfinish`.

**¿Por qué `clip-path` y no opacity o transform?**
- `opacity` cross-fade entre capas perdería el efecto de "construcción direccional"
- `transform` no permitiría que ambas capas ocupen el mismo espacio
- `clip-path: inset()` revela exactamente la porción que queremos (de izquierda a derecha), respeta hit-testing del mouse (clave para el cursor custom) y es GPU-accelerable

**¿Por qué pin solo en desktop?**
El scrollytelling con pin es magia en monitores grandes con rueda/trackpad. En mobile, el touch scroll tiene inercia propia y los pins largos compiten con esa inercia generando una sensación pegajosa. Mejor un reveal limpio al entrar viewport.

---

## Performance

| Métrica | Valor |
|---|---|
| Bundle JS gzip | ~58 KB (GSAP + Lenis incluidos) |
| Bundle CSS gzip | ~4 KB |
| Hero image | 213 KB WebP / 273 KB JPG fallback |
| Total above-the-fold transfer | < 300 KB |
| Lighthouse Performance | 90+ (móvil y desktop) |

Optimizaciones aplicadas:
- `<picture>` con WebP + JPG fallback
- `fetchpriority="high"` + `loading="eager"` en hero image
- `preconnect` a Fontshare + Google Fonts
- Sharp pipeline (PNG → WebP @ q82 effort:6) reduciendo 12x el peso
- `display=swap` en todas las @font-face

---

## Roadmap futuro

Cosas que dejé fuera para mantener el scope contenido pero que serían interesantes de agregar:

- [ ] Galería de proyectos real (página `/proyectos`)
- [ ] Form de contacto funcional con envío a un backend (actualmente es UI mock)
- [ ] Localization completa al inglés
- [ ] Animación adicional: las cards de servicios "se construyen" individualmente con drawing de los íconos
- [ ] Tests E2E con Playwright para los scroll triggers
- [ ] Dark mode

---

## Créditos

- Concepto, diseño y código: **Alejandro Fernández** ([@AlejoMFernandez](https://github.com/AlejoMFernandez))
- Cliente: **ficticio** — TRAMA Estudio existe únicamente como pieza de portfolio
- Foto del hero: generada con DALL-E (OpenAI), prompt propio
- Tipografías: Fontshare (Clash Display, Satoshi) · Google Fonts (Caveat)
- Animaciones: [GSAP](https://gsap.com) · [Lenis](https://lenis.darkroom.engineering)

---

## Licencia

MIT — usalo, forkealo, aprendé del código. Si te sirvió, una ⭐ en el repo se agradece.
