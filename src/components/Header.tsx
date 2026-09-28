import { useEffect, useState } from 'react'
import { useDatos } from '../data/useDatos'
import { IconMenu, IconCerrar, IconTijera } from './icons'

const NAV_LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#equipo', label: 'Equipo' },
  { href: '#trabajos', label: 'Trabajos' },
  { href: '#reserva', label: 'Reservar' },
  { href: '#ubicacion', label: 'Cómo llegar' },
]

export function Header() {
  const { datos } = useDatos()
  const NEGOCIO = datos.negocio
  const [abierto, setAbierto] = useState(false)

  useEffect(() => {
    if (!abierto) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [abierto])

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#inicio" className="flex items-center gap-3" onClick={() => setAbierto(false)}>
          <IconTijera className="h-7 w-7 text-wine" aria-hidden="true" />
          <span className="font-display text-xl font-semibold tracking-tight text-ink">
            {NEGOCIO.nombre}
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium tracking-wide text-ink/75 md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-wine">
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#reserva"
          className="hidden items-center border border-ink px-5 py-2.5 text-sm font-semibold tracking-wide text-ink transition-colors hover:border-wine hover:bg-wine hover:text-cream md:inline-flex"
        >
          Reservá tu turno
        </a>

        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
          aria-controls="menu-mobile"
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
          className="flex h-11 w-11 items-center justify-center text-ink md:hidden"
        >
          {abierto ? <IconCerrar className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
        </button>
      </div>

      {abierto && (
        <nav
          id="menu-mobile"
          className="border-t border-ink/10 bg-cream px-5 pt-2 pb-6 md:hidden"
        >
          <ul className="flex flex-col divide-y divide-ink/10">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setAbierto(false)}
                  className="block py-4 text-base font-medium text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#reserva"
            onClick={() => setAbierto(false)}
            className="mt-4 flex items-center justify-center border border-ink bg-ink px-5 py-3 text-sm font-semibold tracking-wide text-cream"
          >
            Reservá tu turno
          </a>
        </nav>
      )}
    </header>
  )
}
