import { useEffect, useState } from 'react'
import capilarLogo from './assets/capilar-logo.svg'
import { fetchServices } from './services/strapi'

const menuItems = ['Inicio', 'Servicios', 'Proyectos', 'Contacto']

function App() {
  const [services, setServices] = useState([])

  useEffect(() => {
    const loadServices = async () => {
      const loadedServices = await fetchServices()
      setServices(loadedServices)
    }

    loadServices()
  }, [])

  return (
    <div className="flex min-h-screen bg-capilar-light">
      <aside className="w-72 border-r border-capilar-primary/20 bg-white p-6 shadow-panel">
        <img src={capilarLogo} alt="CapiLAR" className="mb-8 h-8 w-auto" />
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="block rounded-lg px-3 py-2 text-sm font-semibold text-capilar-dark transition hover:bg-capilar-primary hover:text-white"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-8 lg:p-12">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-capilar-secondary">CMS + Frontend</p>
          <h1 className="mt-2 text-3xl font-bold text-capilar-primary">Servicios CapiLAR</h1>
          <p className="mt-2 max-w-2xl text-sm text-capilar-dark/80">
            Este listado consume datos de Strapi desde <code className="rounded bg-white px-1">/api/services</code>.
          </p>
        </header>

        <section id="servicios" className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article key={service.id} className="rounded-xl border border-capilar-primary/20 bg-white p-5 shadow-panel">
              <h2 className="text-lg font-semibold text-capilar-primary">{service.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-capilar-dark/80">{service.description}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}

export default App
