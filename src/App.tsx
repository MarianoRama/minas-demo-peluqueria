import { useState } from 'react'

/**
 * Tijera & Tinta — DEMO de portafolio
 * -----------------------------------
 * Este sitio es un proyecto de EJEMPLO creado para mostrar a dueños de
 * peluquerías/barberías de Minas, Uruguay, el tipo de landing page que un
 * freelancer puede desarrollar para su negocio.
 *
 * "Tijera & Tinta" NO es un negocio real. El nombre, los servicios, los
 * precios, los datos de contacto, los horarios, la ubicación y la foto son
 * ilustrativos, usados únicamente con
 * fines de demostración.
 */

const configuredWhatsAppNumber = import.meta.env.VITE_WHATSAPP_NUMBER?.replace(/\D/g, '') ?? ''
const WHATSAPP_NUMBER = /^598\d{8}$/.test(configuredWhatsAppNumber)
  ? configuredWhatsAppNumber
  : ''
const WHATSAPP_MESSAGE_TEXT =
  'Hola, quisiera consultar por los servicios y coordinar un turno en Tijera & Tinta (demo).'
const WHATSAPP_MESSAGE = encodeURIComponent(WHATSAPP_MESSAGE_TEXT)
const WHATSAPP_URL = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`
  : null

const NAV_LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
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

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-rosewood/10 bg-blush-50/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a href="#inicio" className="flex min-w-0 items-center gap-2" aria-label="Tijera y Tinta, ir al inicio">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rosewood text-sm font-semibold text-white">
            T&amp;T
          </span>
          <span className="font-display text-xl font-semibold tracking-wide text-charcoal">
            Tijera &amp; Tinta
          </span>
        </a>
        <nav aria-label="Navegación principal" className="hidden gap-6 text-sm font-medium text-charcoal/80 md:flex">
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
        <a
          href={WHATSAPP_URL ?? '#contacto'}
          target={WHATSAPP_URL ? '_blank' : undefined}
          rel={WHATSAPP_URL ? 'noopener noreferrer' : undefined}
          className="shrink-0 rounded-full bg-rosewood px-3 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-rosewood/90 sm:px-5 sm:text-sm"
        >
          {WHATSAPP_URL ? 'Consultá por WhatsApp' : 'Ver contacto'}
        </a>
      </div>
      <nav aria-label="Navegación móvil" className="flex justify-center gap-5 overflow-x-auto border-t border-rosewood/10 px-4 py-2 text-xs font-medium text-charcoal/80 md:hidden">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="shrink-0 py-1 transition-colors hover:text-rosewood">
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section
      id="inicio"
      className="bg-blush-50 px-6 py-16 sm:py-20"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 md:flex-row">
        <div className="flex-1 text-center md:text-left">
          <span className="inline-block rounded-full bg-white/70 px-4 py-1 text-xs font-semibold tracking-wide text-rosewood uppercase shadow-sm">
            Peluquería &amp; estética en Minas, Uruguay
          </span>
          <h1 className="mt-6 font-display text-4xl leading-tight font-bold text-charcoal md:text-6xl">
            Corte, color y cuidado personal
          </h1>
          <p className="mt-6 text-lg text-charcoal/70">
            Cortes, color, tratamientos y barbería en un mismo espacio. Escribinos
            para consultar por un servicio y coordinar tu hora.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row md:justify-start">
            <a
              href={WHATSAPP_URL ?? '#contacto'}
              target={WHATSAPP_URL ? '_blank' : undefined}
              rel={WHATSAPP_URL ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2 rounded-full bg-rosewood px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-rosewood/90"
            >
              {WHATSAPP_URL ? 'Consultá por WhatsApp' : 'Ver contacto'}
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/20 px-8 py-3 text-base font-semibold text-charcoal transition-colors hover:border-rosewood hover:text-rosewood"
            >
              Ver servicios
            </a>
          </div>
        </div>

        <figure className="w-full max-w-xl flex-1">
          <img
            src={`${import.meta.env.BASE_URL}salon-interior.jpg`}
            alt="Interior de una peluquería, imagen de referencia; no corresponde al salón ficticio"
            fetchPriority="high"
            className="aspect-[4/3] w-full rounded-xl object-cover"
          />
          <figcaption className="mt-2 text-right text-xs text-charcoal/60">
            Imagen ilustrativa · Benyamin Bohlouli / Unsplash
          </figcaption>
        </figure>
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
            Cabello, color, barba y manos
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-charcoal/60">
            Lista y precios ilustrativos para esta demo. En un proyecto real se
            actualizan según los servicios y valores del salón.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICIOS.map((servicio) => (
            <div
              key={servicio.categoria}
              className="rounded-xl border border-rosewood/15 bg-white p-6 transition-colors hover:border-rosewood/40"
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

function HorariosYUbicacion() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <span className="text-sm font-semibold tracking-widest text-rosewood uppercase">
            Horarios de ejemplo · Minas, Uruguay
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold text-charcoal">
            Horarios y referencia local
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
            Horarios y dirección ilustrativos; la ubicación del mapa es una
            referencia de la ciudad, no de un salón real.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl shadow-lg">
          <iframe
            title="Mapa de referencia de Minas, Uruguay; no indica la ubicación de un salón real"
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
  const [showPreparedMessage, setShowPreparedMessage] = useState(false)

  return (
    <section
      id="contacto"
      className="bg-rosewood px-6 py-16 text-center"
    >
      <div className="mx-auto max-w-2xl">
        <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
          ¿Querés consultar por un servicio?
        </h2>
        <p className="mt-4 text-white/90">
          Escribinos por WhatsApp para consultar servicios y coordinar una hora.
        </p>
        {WHATSAPP_URL ? (
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-base font-semibold text-rosewood transition-colors hover:bg-blush-50"
          >
            Consultar por WhatsApp
          </a>
        ) : (
          <button
            type="button"
            onClick={() => setShowPreparedMessage(true)}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-base font-semibold text-rosewood transition-colors hover:bg-blush-50"
          >
            Preparar consulta
          </button>
        )}
        <p className="mt-3 text-xs text-white/70">
          {WHATSAPP_URL ? 'La disponibilidad se confirma al conversar por WhatsApp.' : 'El WhatsApp se activa al configurar un número real del salón.'}
        </p>
        {showPreparedMessage && !WHATSAPP_URL && (
          <label className="mx-auto mt-4 block max-w-lg text-left text-sm text-white">
            Copiá este mensaje para usarlo con el contacto del salón:
            <textarea
              readOnly
              value={WHATSAPP_MESSAGE_TEXT}
              rows={2}
              onFocus={(event) => event.currentTarget.select()}
              className="mt-2 w-full rounded-lg border border-white/30 bg-white p-3 text-charcoal"
            />
          </label>
        )}
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
            Tijera &amp; Tinta
          </span>
          <p className="mt-3 text-sm text-blush-50/60">
            Peluquería y estética. Esta página es una demo de portafolio.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-widest text-gold-light uppercase">
            Datos ilustrativos
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-blush-50/70">
            <li>{WHATSAPP_NUMBER ? `WhatsApp: +${WHATSAPP_NUMBER}` : 'WhatsApp pendiente de configuración'}</li>
            <li>Ubicación de referencia: Minas, Lavalleja</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-widest text-gold-light uppercase">
            Más información
          </h3>
          <p className="mt-3 max-w-xs text-sm text-blush-50/70">
            Las redes sociales se agregan cuando el salón comparte sus perfiles.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-center text-xs text-blush-50/50">
        © {new Date().getFullYear()} Tijera &amp; Tinta — demo de portafolio. El
        nombre, los precios y los datos de contacto son ilustrativos.
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-blush-50">
      <Header />
      <main>
        <Hero />
        <Servicios />
        <HorariosYUbicacion />
        <ContactoCTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
