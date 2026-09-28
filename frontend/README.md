# Frontend CapiLAR (React + Tailwind)

## Scripts

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run lint`

## Conexión con Strapi

1. Copiar `.env.example` a `.env`.
2. Ajustar `VITE_STRAPI_URL` según tu instancia de Strapi.
3. Crear el content-type `service` en Strapi con los campos:
   - `title` (Text)
   - `description` (Rich text o Text)
4. Cargar datos de prueba y publicar.
5. El frontend consume `GET /api/services`.

Si Strapi no está disponible, el frontend muestra una lista fallback de servicios para mantener la demo visible.
