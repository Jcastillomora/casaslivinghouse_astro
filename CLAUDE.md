# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos

```bash
npm run dev        # Servidor de desarrollo
npm run build      # Build estático
npm run preview    # Preview del build
```

No hay comandos de test ni lint configurados.

## Arquitectura

Sitio web estático (SSG) para **Casas Living House**, empresa chilena de casas prefabricadas. Stack: **Astro + Tailwind CSS + Alpine.js**.

### Flujo de datos

Los datos de los productos provienen de un archivo Excel (`Catálogo .xlsx`). `src/lib/casas.ts` lo lee en build time usando la librería `xlsx`, buscándolo en varias rutas candidatas:
1. `../Casaslivinghouse/assets/Catálogo .xlsx`
2. `src/data/Catálogo .xlsx`
3. `public/Catálogo .xlsx`

El sheet debe llamarse `"Hoja 1"` con columnas: `id`, `modelo`, `superficie(m2)`, `dormitorios`, `baños`, `precio`, `descripción`, `imagen`, `url_imagen`, `plano`.

### Páginas y componentes clave

- `src/pages/index.astro` — Homepage que monta todos los componentes en sección
- `src/pages/casa/[casa_id].astro` — Ruta dinámica para detalle de cada casa
- `src/components/CatalogSection.astro` — Catálogo con búsqueda/filtros (Alpine.js)
- `src/layouts/Layout.astro` — Layout raíz con meta SEO
- `public/style.css` — Animaciones custom (slider hero, rotación texto navbar, gradiente stats bar)

### Interactividad cliente

Alpine.js maneja el filtrado del catálogo y el slider de imágenes del hero. Usar `x-data`, `x-show`, `x-cloak` según el patrón existente. No hay framework JS de SPA.

## Despliegue

El proyecto usa `output: 'static'` y se despliega en **Cloudflare Pages** (ver commits con `wrangler@4`). No hay `wrangler.toml` en el repo; la configuración de despliegue está en el dashboard de Cloudflare.

## Consideraciones

- El sitio está en español (locale `es_CL`).
- Los paths en Windows con espacios y caracteres especiales (`Proyectos en producción`) pueden causar problemas. Usar rutas absolutas cuando sea necesario.
- Case sensitivity: el sistema de archivos puede ser case-insensitive en Windows pero case-sensitive en el servidor. Los imports de componentes deben coincidir exactamente con el nombre del archivo (ver commit `fix: forzar case sensitive en componentes`).
