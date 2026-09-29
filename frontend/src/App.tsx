import { useState, useEffect } from 'react';

interface Servicio {
  id: number;
  documentId?: string;
  nombre: string;
  descripcion: string;
  precio: number;
  tiempo_duracion?: number;
  tipo: string;
}

interface FichaTecnica {
  id: number;
  documentId?: string;
  diagnostico: string;
  historial_quimico: string;
  tipo_cuero_cabelludo: string;
  observaciones: string;
  fecha_visita: string;
}

export default function App() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [fichas, setFichas] = useState<FichaTecnica[]>([]);
  
  // Estados para autenticación
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);

  // Cargar usuario almacenado si ya había iniciado sesión
  useEffect(() => {
    const savedUser = localStorage.getItem('capilar_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('capilar_user');
      }
    }
  }, []);

  // Fetch de servicios desde Strapi
  useEffect(() => {
    fetch('http://localhost:1337/api/servicios')
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setServicios(data.data);
        }
      })
      .catch((err) => console.error('Error al cargar servicios:', err));
  }, []);

  // Fetch de fichas técnicas cuando hay usuario logueado
  useEffect(() => {
    if (user) {
      const token = localStorage.getItem('capilar_token');
      fetch('http://localhost:1337/api/ficha-tecnicas?populate=*', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            setFichas(data.data);
          }
        })
        .catch((err) => console.error('Error al cargar fichas técnicas:', err));
    } else {
      setFichas([]);
    }
  }, [user]);

  // Manejador del Login hacia Strapi
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    try {
      const response = await fetch('http://localhost:1337/api/auth/local', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: identifier,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('capilar_token', data.jwt);
        localStorage.setItem('capilar_user', JSON.stringify(data.user));
        setUser(data.user);
        setIsLoginOpen(false);
        setPassword('');
        setIdentifier('');
      } else {
        setAuthError(data.error?.message || 'Usuario o contraseña incorrectos.');
      }
    } catch (err) {
      setAuthError('Error al conectar con el servidor.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('capilar_token');
    localStorage.removeItem('capilar_user');
    setUser(null);
    setFichas([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center">
            <img 
              src="/capiLAR_logo1.webp" 
              alt="CapiLAR Logo" 
              className="h-14 sm:h-14 w-auto object-contain transition-transform hover:scale-105" 
            />
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 tracking-wider">
            <a href="#inicio" className="hover:text-slate-900 transition-colors uppercase">Inicio</a>
            <a href="#servicios" className="hover:text-slate-900 transition-colors uppercase">Servicios</a>
            {user && (
              <a href="#ficha-tecnica" className="text-[#A35FDA] font-semibold hover:text-[#8338ec] transition-colors uppercase">
                Mi historial
              </a>
            )}
            <a href="#nosotros" className="hover:text-slate-900 transition-colors uppercase">Nosotros</a>
            <a href="#contacto" className="hover:text-slate-900 transition-colors uppercase">Contacto</a>
          </nav>

          <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider">
            {user ? (
              <div className="flex items-center gap-3 bg-white border border-slate-200 pl-2 pr-3 py-1.5 rounded-none shadow-sm">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#A35FDA] to-[#F98D56] text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                  {user.username.charAt(0)}
                </div>
                <div className="text-left leading-tight">
                  <span className="text-[10px] text-slate-400 block font-normal normal-case">Conectado</span>
                  <span className="text-slate-800 font-bold capitalize normal-case text-xs">{user.username}</span>
                </div>
                <span className="text-slate-300 ml-1">|</span>
                <button
                  onClick={handleLogout}
                  className="text-slate-400 hover:text-red-500 text-xs font-medium normal-case transition-colors cursor-pointer ml-1"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="px-5 py-2.5 bg-gradient-to-r from-[#A35FDA] to-[#F98D56] text-white rounded-lg shadow-sm hover:opacity-95 transition-all cursor-pointer"
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      </header>

      {/* SECCIÓN HERO CON FONDO */}
      <section
        id="inicio"
        className="relative bg-slate-100 py-32 px-4 bg-cover bg-center flex items-center justify-center border-b border-slate-200"
        style={{
          backgroundImage: "url('/Fondo.jpg')",
        }}
      >
        <div className="relative z-10 max-w-2xl text-center mx-auto">
          <h1 className="text-4xl sm:text-5xl font-light text-slate-900 leading-tight">
            Tu identidad, <br />
            <span className="font-normal">potenciada en cada detalle.</span>
          </h1>
        </div>
      </section>

      {/* SECCIÓN FICHA TÉCNICA (SOLO VISIBLE SI EL USUARIO ESTÁ LOGUEADO) */}
      {user && (
        <section id="ficha-tecnica" className="py-16 px-4 max-w-7xl mx-auto w-full border-b border-slate-200">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-widest text-[#A35FDA] uppercase mb-2 block">
              Área Personalizada
            </span>
            <h2 className="text-3xl font-bold text-slate-900">Historial de visitas</h2>
            <p className="text-slate-500 mt-2 text-sm">Diagnóstico profesional registrado en CapiLAR para {user.username}</p>
          </div>

          {fichas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {fichas.map((ficha) => (
                <div
                  key={ficha.id}
                  className="bg-white border-2 border-purple-100 rounded-2xl p-6 shadow-sm relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-[#A35FDA] to-[#F98D56] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                    Visita: {ficha.fecha_visita || 'Reciente'}
                  </div>

                  <div className="mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Diagnóstico Capilar
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">{ficha.diagnostico}</h3>
                  </div>

                  <div className="space-y-3 text-xs text-slate-600 border-t border-slate-100 pt-4">
                    <div>
                      <strong className="text-slate-700 block uppercase tracking-wide text-[10px] mb-0.5">
                        Tipo de Cuero Cabelludo:
                      </strong>
                      <span className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md inline-block font-medium">
                        {ficha.tipo_cuero_cabelludo || 'Normal'}
                      </span>
                    </div>

                    <div>
                      <strong className="text-slate-700 block uppercase tracking-wide text-[10px] mb-0.5">
                        Historial Químico Previo:
                      </strong>
                      <p className="text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        {ficha.historial_quimico || 'Sin antecedentes informados.'}
                      </p>
                    </div>

                    <div>
                      <strong className="text-slate-700 block uppercase tracking-wide text-[10px] mb-0.5">
                        Observaciones del Estilista:
                      </strong>
                      <p className="text-slate-600 bg-purple-50/50 p-2.5 rounded-lg border border-purple-100">
                        {ficha.observaciones}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center max-w-md mx-auto">
              <p className="text-slate-600 text-sm">No tenés fichas técnicas registradas todavía.</p>
              <span className="text-xs text-slate-400 mt-1 block">Acercate a CapiLAR para tu primer diagnóstico capilar.</span>
            </div>
          )}
        </section>
      )}

      {/* SECCIÓN SERVICIOS */}
      <section id="servicios" className="py-20 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-[#A35FDA] uppercase mb-2 block">
            Catálogo Capilar
          </span>
          <h2 className="text-3xl font-bold text-slate-900">Nuestros Servicios</h2>
          <p className="text-slate-500 mt-2 text-sm">Datos sincronizados en tiempo real desde Strapi CMS</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicios.map((s) => (
            <div
              key={s.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex justify-between items-center text-xs text-slate-500 mb-4">
                  <span className="bg-purple-50 text-[#A35FDA] font-semibold px-3 py-1 rounded-full uppercase tracking-wider text-[11px]">
                    {s.tipo || 'Tratamiento'}
                  </span>
                  <span className="text-slate-400 font-medium text-xs">
                    {s.tiempo_duracion} min
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">{s.nombre}</h3>
                <p className="text-sm text-slate-500 line-clamp-3 mb-6">
                  {s.descripcion || 'Servicio profesional realizado por estilistas especializados de CapiLAR.'}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Arancel</span>
                  <span className="text-2xl font-bold text-slate-900">${s.precio?.toLocaleString('es-AR')}</span>
                </div>
                <button className="px-5 py-2.5 bg-gradient-to-r from-[#A35FDA] to-[#F98D56] text-white text-xs font-semibold rounded-lg hover:opacity-90 transition-all uppercase tracking-wider">
                  Reservar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 border border-[#A35FDA] bg-[#A35FDA]/10 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-semibold text-slate-900">¿Buscás un asesoramiento personalizado?</h4>
            <p className="text-sm text-slate-600">Nuestros estilistas analizan tu tipo de cabello para recomendarte el mejor tratamiento.</p>
          </div>
          <button className="px-5 py-2.5 bg-gradient-to-r from-[#A35FDA] to-[#F98D56] text-white text-xs font-semibold rounded-lg hover:opacity-90 transition-all whitespace-nowrap uppercase tracking-wider">
            Contactar Especialista
          </button>
        </div>
      </section>

      {/* MODAL DE LOGIN */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative border border-slate-100">
            <button
              onClick={() => setIsLoginOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-lg p-1 cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold text-slate-900 text-center mb-2">Iniciar Sesión</h3>
            <p className="text-sm text-slate-500 text-center mb-6">Ingresá tus credenciales de CapiLAR</p>

            {authError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg text-center font-medium">
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                  Usuario o Correo
                </label>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="ej. cliente@capilar.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#A35FDA] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#A35FDA] text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-4 bg-gradient-to-r from-[#A35FDA] to-[#F98D56] text-white font-semibold rounded-lg shadow-sm hover:opacity-95 transition-all text-sm uppercase tracking-wider cursor-pointer"
              >
                Ingresar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}