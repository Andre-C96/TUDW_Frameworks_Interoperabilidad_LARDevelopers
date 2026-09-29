import { useEffect, useState } from 'react';

// Estructura idéntica al JSON de Strapi v5
interface ServicioStrapi {
  id: number;
  documentId: string;
  tipo: string;
  tiempo_duracion: number;
  precio: number;
}

export default function App() {
  const [servicios, setServicios] = useState<ServicioStrapi[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorConexion, setErrorConexion] = useState(false);

  useEffect(() => {
    // Consumir la API de Strapi local
    fetch('http://localhost:1337/api/servicios')
      .then((res) => {
        if (!res.ok) throw new Error('Error al consultar la API');
        return res.json();
      })
      .then((json) => {
        if (json.data && Array.isArray(json.data)) {
          setServicios(json.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn('No se pudo conectar a Strapi:', err);
        setErrorConexion(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-[#A35FDA] selection:text-white">
      {/* 1. Header / Navbar */}
      <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo CapiLAR oficial */}
          <div className="flex items-center gap-3">
            <img 
              src="/capiLAR_logo.png" 
              alt="Logo CapiLAR" 
              className="h-20 w-auto object-contain"
            />
          </div>

          {/* Menú de Enlaces */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider uppercase text-slate-600">
            <a href="#inicio" className="text-slate-900 hover:text-[#A35FDA] transition-colors">Inicio</a>
            <a href="#servicios" className="hover:text-[#A35FDA] transition-colors">Servicios</a>
            <a href="#nosotros" className="hover:text-[#A35FDA] transition-colors">Nosotros</a>
            <a href="#contacto" className="hover:text-[#A35FDA] transition-colors">Contacto</a>
          </nav>

          {/* Botones de Acción */}
          <div className="flex items-center gap-3">
            <button className="text-xs uppercase tracking-wider font-bold text-white px-5 py-2.5 rounded-md shadow-sm transition-all hover:opacity-95 active:scale-95 bg-gradient-to-r from-[#A35FDA] to-[#F98D56]">
              Registrarse
            </button>
            <button className="text-xs uppercase tracking-wider font-semibold text-slate-700 hover:text-slate-900 px-4 py-2 rounded-md border border-slate-300 hover:bg-slate-50 transition-colors">
              Iniciar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section con Fondo.jpg */}
      <section
        id="inicio"
        className="relative bg-slate-100 py-32 px-4 bg-cover bg-center flex items-center justify-center border-b border-slate-200"
        style={{
          backgroundImage: "url('/Fondo.jpg')",
        }}
      >
        {/* <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px]"></div> */}

        <div className="relative z-10 max-w-2xl text-center mx-auto">
          <h1 className="text-3xl sm:text-4xl font-light text-slate-900 leading-tight">
            Tu identidad, <br />
            <span className="font-normal">potenciada en cada detalle.</span>
          </h1>
        </div>
      </section>

      {/* 3. Tres Pilares / Funcionalidades */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Calendario */}
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center shadow-lg shadow-slate-200/50 flex flex-col items-center">
            <div className="w-14 h-14 rounded-full border border-pink-200/80 bg-pink-50/40 flex items-center justify-center text-pink-400 mb-5">
              <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-slate-800 mb-3">Gestión de turnos</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Reservá, modificá o cancelá tus citas en segundos desde el celular. Elegí a tu profesional favorito y seleccioná los servicios exactos que buscás.
            </p>
          </div>

          {/* Card 2: Tijera / Historial */}
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center shadow-lg shadow-slate-200/50 flex flex-col items-center">
            <div className="w-14 h-14 rounded-full border border-pink-200/80 bg-pink-50/40 flex items-center justify-center text-pink-400 mb-5">
              <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="6" cy="6" r="3" />
                <circle cx="6" cy="18" r="3" />
                <line x1="20" y1="4" x2="8.12" y2="15.88" />
                <line x1="14.47" y1="14.48" x2="20" y2="20" />
                <line x1="8.12" y1="8.12" x2="12" y2="12" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-slate-800 mb-3">Historial capilar</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Guardamos los detalles de cada visita. Tu estilista siempre sabrá exactamente qué productos y proporciones logran tu mejor look.
            </p>
          </div>

          {/* Card 3: Cámara / Evolución */}
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center shadow-lg shadow-slate-200/50 flex flex-col items-center">
            <div className="w-14 h-14 rounded-full border border-pink-200/80 bg-pink-50/40 flex items-center justify-center text-pink-400 mb-5">
              <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-slate-800 mb-3">Evolución de tu estilo</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Visualizá tu transformación y descubrí qué estilos te quedan mejor. Tu historial fotográfico organizado para inspirar tu próximo gran cambio.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Catálogo de Servicios (Directo de Strapi) */}
      <section id="servicios" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-widest text-[#A35FDA] uppercase">
            Catálogo CapiLAR
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mt-2">
            Nuestros Servicios
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Datos sincronizados en tiempo real desde Strapi CMS
          </p>
        </div>

        {loading && (
          <div className="text-center py-12 text-slate-500 font-medium">
            Consultando servicios en Strapi...
          </div>
        )}

        {errorConexion && (
          <div className="max-w-md mx-auto text-center p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-sm">
            Asegurate de que Strapi esté corriendo en <code>http://localhost:1337</code> con permisos públicos habilitados para Servicios.
          </div>
        )}

        {!loading && !errorConexion && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {servicios.map((s) => (
              <div
                key={s.id}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-[#A35FDA]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-purple-50 text-[#A35FDA]">
                      Tratamiento
                    </span>
                    <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {s.tiempo_duracion} min
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{s.tipo}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    Servicio profesional realizado por estilistas especializados de CapiLAR.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                  <div>
                    <span className="text-xs text-slate-400 block">Arancel</span>
                    <span className="text-2xl font-extrabold text-slate-900">
                      ${s.precio.toLocaleString('es-AR')}
                    </span>
                  </div>
                  <button className="text-xs font-bold px-4 py-2 rounded text-white bg-gradient-to-r from-[#A35FDA] to-[#F98D56] hover:opacity-90 transition-all">
                    Reservar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 5. Banner CTA de registro */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-12">
       <div className="border border-[#A35FDA] bg-[#A35FDA]/10 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-lg font-medium text-slate-800">
            ¿Listo para potenciar tu identidad?
          </p>
          <button className="text-xs uppercase tracking-wider font-bold text-white px-6 py-3 rounded-md shadow-sm bg-gradient-to-r from-[#A35FDA] to-[#F98D56] hover:opacity-95 transition-all">
            Registrarse
          </button>
        </div>
      </section>

      {/* 6. Footer oficial */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 mt-auto text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img 
              src="/capiLAR_logo.png" 
              alt="Logo CapiLAR" 
              className="h-6 w-auto object-contain brightness-0 invert opacity-80"
            />
            <span>© 2026 capiLAR. Desarrollado en Neuquén.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Preguntas frecuentes</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Términos de uso</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
          </div>
        </div>
      </footer>
    </div>
  );
}