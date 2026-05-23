# TRAMA · Brand Pack

Todo lo que necesitás para sumar TRAMA Estudio a tu portfolio web.

---

## 🎨 Paleta de color

| Rol | Nombre | Hex | RGB | Uso |
|---|---|---|---|---|
| **Fondo principal** | Crema | `#F5F1EA` | `245, 241, 234` | Background del sitio en estado final |
| **Texto / Tinta** | Tinta | `#1A1A1A` | `26, 26, 26` | Tipografía principal, nav, sección contacto |
| **Acento** | Terracota | `#D4634A` | `212, 99, 74` | CTAs, dot del logo, hover states, sección contacto label |
| **Secundario** | Lápiz | `#6B6B6B` | `107, 107, 107` | Texto en estado boceto |
| **Detalle** | Grafito | `#C4C4C4` | `196, 196, 196` | Líneas y bordes del sketch |

**Swatch visual:** ver `colors@900.png` o `colors@1800.png` (retina).

---

## 🔤 Tipografía

| Rol | Familia | Pesos | Fuente |
|---|---|---|---|
| **Display** (títulos) | Clash Display | 400, 500, 600, 700 | [Fontshare](https://www.fontshare.com/fonts/clash-display) |
| **Body** (texto) | Satoshi | 400, 500, 700 | [Fontshare](https://www.fontshare.com/fonts/satoshi) |
| **Sketch state** (boceto) | Caveat | 400, 600, 700 | [Google Fonts](https://fonts.google.com/specimen/Caveat) |
| **Mono** (cartouches, labels técnicos) | SF Mono / Fira Code | fallback system | — |

Las tres son **gratuitas** (incluso para uso comercial).

---

## 🏷️ Logo · variantes

| Archivo | Cuándo usarla |
|---|---|
| `logo-wordmark.svg` (+ PNGs) | **Wordmark principal** sobre fondo claro. Header, firma, footer |
| `logo-wordmark-light.svg` (+ PNGs) | Wordmark sobre **fondo oscuro** (ej. sección contacto) |
| `logo-lockup.svg` (+ PNGs) | **Lockup completo** "TRAMA · ESTUDIO DE ARQUITECTURA" — para piezas formales: about, prensa, papelería |
| `logo-monogram.svg` (+ PNGs) | **Avatar / favicon / social** — cuadrado, "T·" sobre fondo tinta |

Cada SVG tiene PNGs renderizados en 3 tamaños (`@480`, `@960`, `@1920` para wordmark; `@256`, `@512`, `@1024` para monogram).

**Regla de aire:** dejá al menos la altura de la "M" del wordmark como espacio en blanco alrededor del logo.

**No hacer:**
- ❌ No estires ni deformes
- ❌ No cambies el color del punto (siempre terracota)
- ❌ No uses sobre fondos saturados que reduzcan el contraste

---

## 📸 Cómo capturar screenshots del sitio

Para tu case study, necesitás al menos **4 screenshots** mostrando los dos estados de cada sección. Recomendación:

### Opción A — Chrome DevTools (recomendada, 1 minuto)

1. Abrí https://trama-ten.vercel.app en Chrome
2. Hacé scroll a la sección que querés capturar (hero, servicios, proceso, contacto)
3. **Ctrl + Shift + P** → escribí "screenshot" → elegí:
   - `Capture full size screenshot` → te baja toda la página completa como PNG
   - `Capture screenshot` → solo el viewport visible
   - `Capture node screenshot` (después de seleccionar un elemento) → captura solo ese elemento

4. **Para capturar los dos estados (sketch vs final) de una sección:**
   - Abrí DevTools → Sources → encontrá el componente
   - O más simple: hacé scroll lento y cuando esté en el estado intermedio (mitad sketch / mitad final), capturá
   - Para forzar el estado **100% sketch**: en la consola pegá `gsap.set('.scene__layer--final', { clipPath: 'inset(0 100% 0 0)' })`
   - Para forzar el estado **100% final**: `gsap.set('.scene__layer--final', { clipPath: 'inset(0 0% 0 0)' })`

### Opción B — Extension "GoFullPage" (alternativa)

Instalá [GoFullPage](https://chromewebstore.google.com/detail/fdpohaocaechififmbbbbbknoalclacl) y con 1 click captura la página entera scrolleada.

### Resoluciones útiles para portfolio

- **Hero desktop:** 1440×900 o 1920×1080
- **Mockup laptop:** 1366×768
- **Mockup phone:** 390×844 (iPhone 14)

Para responsive mockups, usá DevTools → toggle device toolbar (Ctrl+Shift+M) → elegí dispositivo → captura.

---

## 🎬 Cómo grabar el GIF / video de la animación del corte

Lo más wow del sitio: el corte arquitectónico de la casa **se dibuja a mano** durante los primeros ~2 segundos al cargar el hero. Para mostrarlo en tu portfolio, recomiendo grabar 4-5 segundos de la animación.

### Opción A — ScreenToGif (Windows, gratis, recomendada)

ScreenToGif es la mejor herramienta libre para grabar GIFs en Windows. Tiene editor incluido para recortar frames, ajustar velocidad y exportar a MP4/WebM/GIF.

1. **Descargala:** https://www.screentogif.com/ (versión Portable, no requiere instalación)
2. Abrila → modo **Recorder**
3. Posicioná el rectángulo de captura sobre la zona del SVG del corte (lado derecho del hero)
   - Tamaño sugerido: **640×560 px** (matchea el aspect-ratio del visual)
4. Configurá **30 FPS**
5. Abrí https://trama-ten.vercel.app en otra ventana, posicionate listo para refrescar
6. En ScreenToGif: **F7 para grabar**
7. Inmediatamente refrescá la pestaña con F5
8. Grabá ~4 segundos
9. **F8 para detener**
10. Se abre el editor → recortá frames sobrantes del inicio/fin
11. **File → Save As → MP4** (mejor calidad, menos peso) o **GIF** (mayor compatibilidad)

> 💡 **Tip:** exportá a MP4 para web (pesa 10x menos que GIF). Para portfolio web moderno, usá `<video autoplay loop muted playsinline>` en vez de `<img src="x.gif">`.

### Opción B — Xbox Game Bar (built-in Windows)

1. **Win + G** → panel de Game Bar
2. Click en el botón de **grabar** (círculo blanco)
3. Refrescá la pestaña del sitio
4. Grabá ~4 segundos
5. Stop → el archivo MP4 queda en `C:\Users\TU_USUARIO\Videos\Capturas`
6. Recortá con la app **Fotos** de Windows o con ezgif.com

### Opción C — Chrome DevTools (más técnica)

1. DevTools → Tab **Performance**
2. Click "Record" (círculo) → refrescá pagina → stop después de 4s
3. En el panel scrollea hasta encontrar las miniaturas de Screenshots → click derecho → "Save"
4. Te baja todos los frames como PNGs → armás GIF con [ezgif.com/maker](https://ezgif.com/maker)

### Recomendación final

Para el resultado más limpio: **ScreenToGif → exportá a MP4**. Es 30 segundos de trabajo.

---

## 📦 Cómo usar este pack en tu portfolio web

Suponiendo que tu portfolio tiene una página de case study para TRAMA:

```html
<!-- Header del case study -->
<img src="/cases/trama/logo-lockup@1120.png"
     alt="TRAMA Estudio"
     style="max-width: 360px">

<!-- Sección "stack & colors" -->
<img src="/cases/trama/colors@1800.png"
     alt="Paleta de color de TRAMA"
     style="width: 100%">

<!-- Hero animation -->
<video autoplay loop muted playsinline
       style="width: 100%; border-radius: 8px">
  <source src="/cases/trama/hero-draw.mp4" type="video/mp4">
</video>

<!-- Screenshots -->
<div class="case-screenshots">
  <img src="/cases/trama/screenshot-hero.png" alt="Hero - estado final">
  <img src="/cases/trama/screenshot-servicios.png" alt="Servicios">
  <img src="/cases/trama/screenshot-proceso.png" alt="Proceso">
  <img src="/cases/trama/screenshot-contacto.png" alt="Contacto">
</div>
```

**Color hex codes para CSS:**

```css
:root {
  --trama-cream:     #F5F1EA;
  --trama-ink:       #1A1A1A;
  --trama-terracota: #D4634A;
  --trama-pencil:    #6B6B6B;
  --trama-graphite:  #C4C4C4;
}
```

---

## 🔗 Links del proyecto

- **Live:** https://trama-ten.vercel.app
- **Repo:** https://github.com/AlejoMFernandez/TRAMA
- **README técnico:** [/README.md](../README.md)

---

## 📂 Mapa de archivos en este folder

```
brand/
├── BRAND.md                          ← este archivo
├── build-pngs.cjs                    ← script Node para regenerar PNGs
├── clash-display-700.ttf             ← font para render server-side
│
├── colors.svg                        ← swatch palette
├── colors@900.png                    ← PNG estándar
├── colors@1800.png                   ← PNG retina (@2x)
│
├── logo-wordmark.svg                 ← "TRAMA·" sobre fondo claro
├── logo-wordmark@480.png             ← PNG 480px ancho
├── logo-wordmark@960.png             ← PNG 960px ancho (@2x para 480px)
├── logo-wordmark@1920.png            ← PNG 1920px ancho (@4x)
│
├── logo-wordmark-light.svg           ← "TRAMA·" sobre fondo oscuro
├── logo-wordmark-light@*.png         ← (mismas resoluciones)
│
├── logo-lockup.svg                   ← lockup completo con tagline
├── logo-lockup@560.png
├── logo-lockup@1120.png
├── logo-lockup@2240.png
│
├── logo-monogram.svg                 ← "T·" cuadrado para favicon/social
├── logo-monogram@256.png
├── logo-monogram@512.png
└── logo-monogram@1024.png
```

Si querés regenerar todos los PNGs desde los SVGs (por ejemplo, después de tweakear los SVG):

```bash
node brand/build-pngs.cjs
```
