const STRAPI_URL = import.meta.env.VITE_STRAPI_URL ?? 'http://127.0.0.1:1337'

const fallbackServices = [
  {
    id: 1,
    title: 'Automatización industrial',
    description: 'Integración de PLCs, sensores y tableros para mejorar procesos productivos.',
  },
  {
    id: 2,
    title: 'Trazabilidad logística',
    description: 'Seguimiento de carga y KPIs operativos con paneles conectados en tiempo real.',
  },
  {
    id: 3,
    title: 'Consultoría IoT',
    description: 'Diseño de arquitectura para capturar y explotar datos de campo de forma segura.',
  },
]

const mapService = (service) => ({
  id: service.id,
  title: service.title ?? service.attributes?.title ?? '',
  description: service.description ?? service.attributes?.description ?? '',
})

export const fetchServices = async () => {
  try {
    const response = await fetch(`${STRAPI_URL}/api/services`)
    if (!response.ok) {
      throw new Error(`Strapi request failed: ${response.status}`)
    }

    const data = await response.json()
    const items = Array.isArray(data?.data) ? data.data : []
    const normalized = items.map(mapService).filter((item) => item.title)

    return normalized.length > 0 ? normalized : fallbackServices
  } catch {
    return fallbackServices
  }
}
