# CMS (Strapi) - Guía mínima

## Instalación sugerida (local)

```bash
npx create-strapi@latest cms --quickstart
```

## Content-Type Builder

Crear el collection type `services` con estos campos:

- `title` (Text, requerido)
- `description` (Rich text o Text, requerido)

## Datos de prueba

Cargar los elementos definidos en `cms/sample-data/services.json` desde el panel de Strapi y publicarlos.

## Endpoint esperado

El frontend consume:

- `GET /api/services`

Asegurar permisos públicos de lectura para el collection type `services`.
