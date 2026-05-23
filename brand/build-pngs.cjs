/**
 * Renderiza los SVG de marca a PNG en varios tamaños.
 * Usa @resvg/resvg-js con Clash Display + Satoshi cargados desde disco
 * para que el resultado coincida con el branding real del sitio.
 *
 * Uso:
 *   node brand/build-pngs.js
 */

const { Resvg } = require('@resvg/resvg-js')
const fs   = require('fs')
const path = require('path')

const BRAND_DIR = __dirname

/* ── Fonts disponibles ───────────────────────────────────────
   Bajamos solo Clash Display 700 (lo único que usan los logos).
   Para colors.svg usamos Satoshi 600 — si no está, cae a
   sans-serif del sistema (no afecta visualmente porque son
   labels de detalle). */
const fontFiles = [
  path.join(BRAND_DIR, 'clash-display-700.ttf'),
].filter(f => fs.existsSync(f))

/* ── Definimos qué renderizar y a qué tamaños ── */
const targets = [
  { svg: 'logo-wordmark.svg',       widths: [480, 960, 1920] },
  { svg: 'logo-wordmark-light.svg', widths: [480, 960, 1920] },
  { svg: 'logo-lockup.svg',         widths: [560, 1120, 2240] },
  { svg: 'logo-monogram.svg',       widths: [256, 512, 1024] },
  { svg: 'colors.svg',              widths: [900, 1800] },
]

function renderToSize(svgPath, outPath, width) {
  const svg = fs.readFileSync(svgPath, 'utf8')
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: {
      fontFiles,
      loadSystemFonts: true, // fallback si algo no está embebido
      defaultFontFamily: 'Clash Display',
    },
    background: 'rgba(0,0,0,0)', // transparente
  })
  const png = resvg.render().asPng()
  fs.writeFileSync(outPath, png)
  const kb = (png.length / 1024).toFixed(1)
  console.log(`  → ${path.basename(outPath)}  (${kb} KB)`)
}

function main() {
  console.log(`Brand assets → ${BRAND_DIR}`)
  console.log(`Fonts cargados: ${fontFiles.length}\n`)

  for (const { svg, widths } of targets) {
    const inputPath = path.join(BRAND_DIR, svg)
    if (!fs.existsSync(inputPath)) {
      console.warn(`⚠ no existe: ${svg}`)
      continue
    }
    const base = svg.replace(/\.svg$/, '')
    console.log(svg)
    for (const w of widths) {
      const suffix = widths.length > 1 ? `@${w}` : ''
      const outPath = path.join(BRAND_DIR, `${base}${suffix}.png`)
      renderToSize(inputPath, outPath, w)
    }
    console.log()
  }
  console.log('✅ Listo')
}

main()
