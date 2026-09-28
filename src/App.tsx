/**
 * Estilo Minas — DEMO de portafolio
 * -----------------------------------
 * Este sitio es un proyecto de EJEMPLO creado para mostrar a dueños de
 * peluquerías/barberías de Minas, Uruguay, el tipo de landing page que un
 * freelancer puede desarrollar para su negocio.
 *
 * "Estilo Minas" NO es un negocio real. El nombre, los servicios, los
 * precios, el número de WhatsApp, las redes sociales y las imágenes de la
 * galería son todos datos ficticios / ilustrativos, usados únicamente con
 * fines de demostración.
 */

import { useEffect, useState } from 'react'
import AdminPanel from './admin/components/AdminPanel'
import ReservaWizard from './reserva/ReservaWizard'

const WHATSAPP_NUMBER_DISPLAY = '+598 99 000 000'
const WHATSAPP_NUMBER_LINK = '59899000000' // número de EJEMPLO, no es real
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hola! Quiero reservar un turno en Estilo Minas (demo).',
)
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER_LINK}?text=${WHATSAPP_MESSAGE}`

const NAV_LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#galeria', label: 'Galería' },
  { href: '#contacto', label: 'Contacto' },
]

type Servicio = {
  categoria: string
  items: { nombre: string; precio: string }[]
}

const SERVICIOS: Servicio[] = [
  {
    categoria: 'Corte',
    items: [
      { nombre: 'Corte dama', precio: '$450' },
      { nombre: 'Corte caballero', precio: '$350' },
      { nombre: 'Corte niños', precio: '$280' },
    ],
  },
  {
    categoria: 'Color',
    items: [
      { nombre: 'Color raíz', precio: '$900' },
      { nombre: 'Color completo', precio: '$1.400' },
      { nombre: 'Mechas / balayage', precio: '$1.800' },
    ],
  },
  {
    categoria: 'Tratamientos',
    items: [
      { nombre: 'Hidratación profunda', precio: '$650' },
      { nombre: 'Alisado / keratina', precio: '$2.200' },
      { nombre: 'Botox capilar', precio: '$1.600' },
    ],
  },
  {
    categoria: 'Barbería',
    items: [
      { nombre: 'Corte + barba', precio: '$500' },
      { nombre: 'Afeitado clásico', precio: '$380' },
      { nombre: 'Perfilado de barba', precio: '$250' },
    ],
  },
  {
    categoria: 'Manicura',
    items: [
      { nombre: 'Manicura clásica', precio: '$300' },
      { nombre: 'Esmaltado semipermanente', precio: '$480' },
      { nombre: 'Manicura + pedicura', precio: '$700' },
    ],
  },
]

const GALERIA_IDS = [101, 102, 103, 104, 105, 106, 107, 108]

const REDES = [
  { nombre: 'Instagram', icono: '📷' },
  { nombre: 'Facebook', icono: '📘' },
  { nombre: 'TikTok', icono: '🎵' },
  { nombre: 'WhatsApp', icono: '💬' },
]

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-rosewood/10 bg-blush-50/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#inicio" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rosewood to-gold text-sm font-semibold text-white">
            EM
          </span>
          <span className="font-display text-xl font-semibold tracking-wide text-charcoal">
            Estilo Minas
          </span>
        </a>
        <nav className="hidden gap-8 text-sm font-medium text-charcoal/80 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-rosewood"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#/panel"
            title="Acceso para estilistas (demo)"
            className="hidden rounded-full border border-rosewood/30 px-3 py-1.5 text-xs font-semibold text-rosewood transition-colors hover:bg-rosewood/10 sm:inline-block sm:px-4 sm:py-2 sm:text-sm"
          >
            Panel de estilistas
          </a>
          <a
            href="#/reservar"
            className="rounded-full bg-rosewood px-4 py-2 text-xs font-semibold text-white shadow-sm transition-transform hover:scale-105 hover:bg-rosewood/90 sm:px-5 sm:text-sm"
          >
            Reservar turno online
          </a>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-br from-blush-100 via-blush-50 to-gold-light/40 px-6 pt-16 pb-24"
    >
      {/* patrón decorativo */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <svg
          className="absolute -top-10 -right-10 h-72 w-72 text-rosewood/20"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="100" cy="100" r="100" fill="currentColor" />
        </svg>
        <svg
          className="absolute -bottom-16 -left-16 h-80 w-80 text-gold/20"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="100" cy="100" r="100" fill="currentColor" />
        </svg>
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-12 md:flex-row">
        <div className="flex-1 text-center md:text-left">
          <span className="inline-block rounded-full bg-white/70 px-4 py-1 text-xs font-semibold tracking-wide text-rosewood uppercase shadow-sm">
            Peluquería &amp; estética en Minas, Uruguay
          </span>
          <h1 className="mt-6 font-display text-4xl leading-tight font-bold text-charcoal md:text-6xl">
            Realzá tu estilo en{' '}
            <span className="text-rosewood">Estilo Minas</span>
          </h1>
          <p className="mt-6 text-lg text-charcoal/70">
            Cortes, color, tratamientos y barbería con una atención cálida y
            personalizada. Pedí tu hora en segundos por WhatsApp.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row md:justify-start">
            <a
              href="#/reservar"
              className="inline-flex items-center gap-2 rounded-full bg-rosewood px-8 py-3 text-base font-semibold text-white shadow-lg shadow-rosewood/30 transition-transform hover:scale-105 hover:bg-rosewood/90"
            >
              Reservar turno online
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/20 px-8 py-3 text-base font-semibold text-charcoal transition-colors hover:border-rosewood hover:text-rosewood"
            >
              Reservar por WhatsApp
            </a>
          </div>
        </div>

        <div className="flex-1">
          <div className="relative mx-auto aspect-square w-full max-w-sm">
            <div className="absolute inset-0 rotate-3 rounded-[2.5rem] bg-gradient-to-br from-rosewood to-gold shadow-2xl" />
            <div className="absolute inset-0 flex -rotate-3 items-center justify-center rounded-[2.5rem] bg-white/60 backdrop-blur-sm">
              <svg
                viewBox="0 0 120 120"
                className="h-40 w-40 text-rosewood"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path
                  d="M60 20c-8 10-22 12-22 28 0 12 10 20 10 32 0 6-4 10-4 10"
                  strokeLinecap="round"
                />
                <path
                  d="M60 20c8 10 22 12 22 28 0 12-10 20-10 32 0 6 4 10 4 10"
                  strokeLinecap="round"
                />
                <circle cx="60" cy="20" r="6" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Servicios() {
  return (
    <section id="servicios" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="text-sm font-semibold tracking-widest text-rosewood uppercase">
            Servicios
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold text-charcoal md:text-4xl">
            Todo lo que necesitás para lucir tu mejor versión
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-charcoal/60">
            Precios ilustrativos a modo de ejemplo — en un sitio real se
            ajustan a la lista de precios vigente del salón.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICIOS.map((servicio) => (
            <div
              key={servicio.categoria}
              className="rounded-2xl border border-rosewood/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
            >
              <h3 className="font-display text-xl font-semibold text-rosewood">
                {servicio.categoria}
              </h3>
              <ul className="mt-4 space-y-3">
                {servicio.items.map((item) => (
                  <li
                    key={item.nombre}
                    className="flex items-center justify-between border-b border-dashed border-charcoal/10 pb-2 text-sm"
                  >
                    <span className="text-charcoal/80">{item.nombre}</span>
                    <span className="font-semibold text-gold">
                      {item.precio}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Galeria() {
  return (
    <section id="galeria" className="bg-blush-100/60 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="text-sm font-semibold tracking-widest text-rosewood uppercase">
            Galería
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold text-charcoal md:text-4xl">
            Un vistazo a nuestro trabajo
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-charcoal/60">
            Imágenes de ejemplo (placeholders) — en el sitio real irían fotos
            propias del salón y sus trabajos.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {GALERIA_IDS.map((id) => (
            <div
              key={id}
              className="group aspect-square overflow-hidden rounded-xl bg-gold-light shadow-sm"
            >
              <img
                src={`https://picsum.photos/seed/estilo-minas-${id}/400/400`}
                alt="Placeholder de ejemplo para la galería de Estilo Minas (demo)"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HorariosYUbicacion() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <span className="text-sm font-semibold tracking-widest text-rosewood uppercase">
            Horarios &amp; ubicación
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold text-charcoal">
            Te esperamos en el centro de Minas
          </h2>

          <div className="mt-8 space-y-4">
            <div className="flex justify-between rounded-xl bg-white p-4 shadow-sm">
              <span className="font-medium text-charcoal/80">
                Lunes a viernes
              </span>
              <span className="text-rosewood">9:00 – 19:00</span>
            </div>
            <div className="flex justify-between rounded-xl bg-white p-4 shadow-sm">
              <span className="font-medium text-charcoal/80">Sábados</span>
              <span className="text-rosewood">9:00 – 13:00</span>
            </div>
            <div className="flex justify-between rounded-xl bg-white p-4 shadow-sm">
              <span className="font-medium text-charcoal/80">Domingos</span>
              <span className="text-charcoal/50">Cerrado</span>
            </div>
          </div>

          <p className="mt-6 text-sm text-charcoal/50">
            Dirección de ejemplo: Calle Ficticia 123, Minas, Lavalleja,
            Uruguay.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl shadow-lg">
          <iframe
            title="Ubicación de ejemplo en Minas, Uruguay"
            src="https://www.google.com/maps?q=Minas,+Uruguay&output=embed"
            className="h-80 w-full border-0 md:h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}

function ContactoCTA() {
  return (
    <section
      id="contacto"
      className="bg-gradient-to-r from-rosewood to-gold px-6 py-20 text-center"
    >
      <div className="mx-auto max-w-2xl">
        <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
          ¿Lista/o para tu próximo cambio de look?
        </h2>
        <p className="mt-4 text-white/90">
          Escribinos por WhatsApp y coordinamos tu turno al instante.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-base font-semibold text-rosewood shadow-lg transition-transform hover:scale-105"
        >
          Reservar por WhatsApp ({WHATSAPP_NUMBER_DISPLAY})
        </a>
        <p className="mt-3 text-xs text-white/70">
          Número de WhatsApp de ejemplo, no es un contacto real.
        </p>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-charcoal px-6 py-14 text-blush-50">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-3">
        <div>
          <span className="font-display text-xl font-semibold">
            Estilo Minas
          </span>
          <p className="mt-3 text-sm text-blush-50/60">
            Peluquería &amp; estética — proyecto DEMO de portafolio, no
            representa un negocio real.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-widest text-gold-light uppercase">
            Contacto (ficticio)
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-blush-50/70">
            <li>WhatsApp: {WHATSAPP_NUMBER_DISPLAY}</li>
            <li>Email: hola@estilominas.demo</li>
            <li>Calle Ficticia 123, Minas, Uruguay</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-widest text-gold-light uppercase">
            Seguinos
          </h3>
          <div className="mt-3 flex gap-3">
            {REDES.map((red) => (
              <span
                key={red.nombre}
                title={`${red.nombre} (sin enlace real, solo demo)`}
                className="flex h-10 w-10 cursor-default items-center justify-center rounded-full bg-white/10 text-lg"
              >
                {red.icono}
              </span>
            ))}
          </div>
          <a
            href="#/reservar"
            className="mt-4 block text-xs text-blush-50/60 underline"
          >
            Reservar turno online
          </a>
          <a
            href="#/panel"
            className="mt-2 block text-xs text-blush-50/60 underline"
          >
            Acceso para estilistas (panel demo)
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-center text-xs text-blush-50/50">
        © {new Date().getFullYear()} Estilo Minas — Sitio de EJEMPLO creado
        como demo de portafolio freelance. Nombre, precios, contacto e
        imágenes son ficticios.
      </div>
    </footer>
  )
}

function useHashRoute(): string {
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return hash
}

function App() {
  const hash = useHashRoute()

  // Rutas separadas (#/panel, #/reservar) del panel de administración de
  // estilistas y del wizard de reserva pública, distintas de los anclas de
  // la landing (#inicio, etc.).
  if (hash.startsWith('#/panel')) {
    return <AdminPanel />
  }
  if (hash.startsWith('#/reservar')) {
    return <ReservaWizard />
  }

  return (
    <div className="min-h-screen bg-blush-50">
      <Header />
      <main>
        <Hero />
        <Servicios />
        <Galeria />
        <HorariosYUbicacion />
        <ContactoCTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
