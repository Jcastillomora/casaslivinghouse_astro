# Assets — Guía de nombres

Los archivos de media NO están incluidos en el repositorio.
Deben copiarse manualmente a esta carpeta antes del build.

## Convención de nombres

### Hero / Carousel
```
foto_hero1.jpg          — imagen principal del hero
foto_carousel1.jpg      — primera imagen del carrusel
foto_carousel2.jpg
foto_carousel3.jpg
foto_carousel4.jpg
```

### Modelos de casas
```
foto_modelo1.jpg        — Lago Ranco 54m²
foto_modelo2.jpg        — 7 Lagos 108m²
foto_modelo3.jpg        — Volcán Osorno 137m²
foto_modelo4.jpg        — Volcán Osorno 124m²
foto_modelo5.jpg        — Volcán Osorno 150m²
foto_modelo6.jpg        — Puerto Octay 54m²
foto_modelo7.jpg        — Puerto Octay 72m²
foto_modelo8.jpg        — Puerto Octay 90m²
foto_modelo9.jpg        — Puerto Varas 60m²
foto_modelo10.jpg       — Puerto Varas 80m²
foto_modelo11.jpg       — Puerto Nuevo 1A 36m²
foto_modelo12.jpg       — Puerto Nuevo 2A 54m²
plano_modelo1.jpg       — plano Lago Ranco
plano_modelo2.jpg       — plano 7 Lagos
... (mismo orden)
```

### Equipo
```
foto_equipo1.jpeg       — Alexander Sáez
foto_equipo2.jpeg       — Juan Carlos García
```

### Testimonios
```
video_testimonio1.mp4
video_testimonio2.mp4
video_testimonio3.mp4
video_testimonio4.mp4
```

## Para Cloudflare Pages

Subir los assets a Cloudflare R2 y actualizar las URLs
en `src/data/casas.json` si se usa CDN externo.
