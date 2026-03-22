# Casas Living House — Astro + Cloudflare Pages

Sitio web estático migrado desde Reflex a **Astro + TailwindCSS**.
Listo para desplegar en **Cloudflare Pages** con $0/mes.

---

## Requisitos

- Node.js 18+
- npm 9+
- Cuenta en Cloudflare (gratuita)

---

## Instalación local

```bash
npm install
npm run dev
# → http://localhost:4321
```

---

## Assets (imágenes y videos)

Los archivos de media **no están incluidos** en el repositorio.
Copiar manualmente a `public/assets/` siguiendo la convención de nombres:

```
public/assets/README.md   ← guía completa de nombres
```

**Nombres requeridos:**
```
foto_hero1.jpg
foto_carousel1.jpg ... foto_carousel4.jpg
foto_modelo1.jpg ... foto_modelo12.jpg
plano_modelo1.jpg ... plano_modelo12.jpg
foto_equipo1.jpeg, foto_equipo2.jpeg
video_testimonio1.mp4 ... video_testimonio4.mp4
```

---

## Actualizar el catálogo

Editar `src/data/casas.json` con los datos actualizados.
No se requiere base de datos ni servidor.

---

## Despliegue en Cloudflare Pages

### Opción A — Automático con GitHub (recomendado)

1. Subir el repo a GitHub
2. Entrar a [Cloudflare Dashboard](https://dash.cloudflare.com) → Workers & Pages → Create
3. Conectar el repo de GitHub
4. Configurar build:
   - **Framework**: Astro
   - **Build command**: `npm run build`
   - **Output directory**: `dist`
5. Save and Deploy

Cada `git push` desplegará automáticamente.

### Opción B — Manual con Wrangler

```bash
npm install -g wrangler
wrangler login
npm run build
wrangler pages deploy dist --project-name=casaslivinghouse
```

---

## Estructura del proyecto

```
casaslivinghouse/
├── src/
│   ├── pages/
│   │   ├── index.astro          # Landing principal
│   │   └── casa/[slug].astro    # Detalle por modelo
│   ├── components/
│   │   ├── Navbar.astro
│   │   ├── Hero.astro           # Carousel de fondo
│   │   ├── Catalogo.astro       # Grid con filtros
│   │   ├── CasaCard.astro       # Tarjeta de modelo
│   │   ├── ComoComprar.astro    # Pasos del proceso
│   │   ├── QuienesSomos.astro   # Equipo y valores
│   │   ├── Testimonios.astro    # Videos
│   │   ├── Footer.astro
│   │   └── Whatsapp.astro       # Botón flotante
│   ├── layouts/
│   │   └── Layout.astro
│   └── data/
│       ├── casas.json           # Catálogo (reemplaza SQLite)
│       └── equipo.json
├── public/
│   ├── assets/                  # Imágenes y videos (gitignored)
│   └── favicon.svg
├── astro.config.mjs
├── tailwind.config.mjs
├── wrangler.toml
└── .gitignore
```

---

## Comparación con versión Reflex

| Métrica | Reflex (anterior) | Astro (actual) |
|---|---|---|
| RAM servidor | ~495 MB | ~0 MB (serverless) |
| Costo mensual | VPS $5–15 USD | $0 (Cloudflare free) |
| Build en servidor | Sí (Node.js) | No |
| Deploy | docker compose up | git push |
| CDN global | No | Sí (270+ ciudades) |
