import { useEffect, useState, type FormEvent } from 'react'
import { useDatos } from '../data/useDatos'
import { useHashRoute } from '../hooks/useHashRoute'
import { IconCandado, IconTijera } from '../components/icons'
import { BotonPrimario, BotonSecundario, Campo, Input, Aviso } from './ui'
import { PanelServicios } from './PanelServicios'
import { PanelEquipo } from './PanelEquipo'
import { PanelGaleria } from './PanelGaleria'
import { PanelNegocio } from './PanelNegocio'
import { PanelTurnos } from './PanelTurnos'
import { PanelCopias } from './PanelCopias'

const CLAVE_SESION = 'peluqueria.admin.sesion'
const PIN_DEMO = '1234'

const SECCIONES = [
  { ruta: '/admin', etiqueta: 'Servicios' },
  { ruta: '/admin/equipo', etiqueta: 'Equipo' },
  { ruta: '/admin/galeria', etiqueta: 'Trabajos' },
  { ruta: '/admin/negocio', etiqueta: 'Negocio' },
  { ruta: '/admin/turnos', etiqueta: 'Turnos' },
  { ruta: '/admin/copias', etiqueta: 'Copias' },
] as const

function IngresoPin({ onIngresar }: { onIngresar: () => void }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState<string | null>(null)

  function enviar(e: FormEvent) {
    e.preventDefault()
    if (pin === PIN_DEMO) {
      try {
        sessionStorage.setItem(CLAVE_SESION, 'ok')
      } catch {
        // sin sessionStorage seguimos igual, solo no persiste entre pestañas
      }
      onIngresar()
    } else {
      setError('PIN incorrecto. Probá de nuevo.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-5">
      <div className="w-full max-w-sm border border-cream/15 bg-[#241d17] p-8 text-cream">
        <div className="flex items-center gap-2">
          <IconTijera className="h-6 w-6 text-wine-light" aria-hidden="true" />
          <span className="font-display text-lg font-semibold">Tijera & Tinta</span>
        </div>
        <h1 className="mt-6 font-display text-2xl font-semibold">Panel de administración</h1>
        <p className="mt-2 text-sm text-cream/60">
          Ingresá el PIN para cambiar precios, equipo, fotos y horarios.
        </p>

        <form onSubmit={enviar} className="mt-6 space-y-4">
          <Campo etiqueta="PIN" htmlFor="pin" error={error ?? undefined}>
            <Input
              id="pin"
              type="password"
              inputMode="numeric"
              autoComplete="off"
              autoFocus
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="bg-[#1c1611] text-cream placeholder:text-cream/30"
              placeholder="••••"
            />
          </Campo>
          <BotonPrimario type="submit" className="w-full">
            <IconCandado className="h-4 w-4" aria-hidden="true" />
            Ingresar
          </BotonPrimario>
        </form>

        <p className="mt-6 border-t border-cream/10 pt-4 text-xs text-cream/45">
          PIN de demostración: <strong className="text-cream/70">1234</strong>. En un sitio real, el
          acceso se hace con una cuenta de Google (si los datos viven en una planilla) o con un
          login de verdad en un backend (por ejemplo Supabase), no con este PIN fijo.
        </p>
        <a href="#/" className="mt-4 inline-block text-xs font-medium text-cream/60 underline underline-offset-4 hover:text-cream">
          Volver al sitio
        </a>
      </div>
    </div>
  )
}

export function AdminApp() {
  const [ruta, ir] = useHashRoute()
  const { errorStorage, cargandoSheet, errorSheet } = useDatos()
  const [autenticado, setAutenticado] = useState(() => {
    try {
      return sessionStorage.getItem(CLAVE_SESION) === 'ok'
    } catch {
      return false
    }
  })

  useEffect(() => {
    document.title = 'Panel · Tijera & Tinta'
  }, [])

  if (!autenticado) {
    return <IngresoPin onIngresar={() => setAutenticado(true)} />
  }

  function salir() {
    try {
      sessionStorage.removeItem(CLAVE_SESION)
    } catch {
      // no-op
    }
    setAutenticado(false)
    ir('/admin')
  }

  return (
    <div className="min-h-screen bg-cream-dim">
      <div className="bg-ink px-4 py-2 text-center text-[11px] tracking-wide text-cream/70">
        Modo demostración: los cambios se guardan solo en este navegador.
      </div>

      <header className="border-b border-ink/15 bg-paper px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <a href="#/" className="flex items-center gap-2">
            <IconTijera className="h-6 w-6 text-wine" aria-hidden="true" />
            <span className="font-display text-lg font-semibold text-ink">Panel del salón</span>
          </a>
          <div className="flex items-center gap-2">
            <a
              href="#/"
              className="hidden text-sm font-medium text-ink/60 underline underline-offset-4 hover:text-ink sm:inline"
            >
              Ver el sitio
            </a>
            <BotonSecundario onClick={salir} className="min-h-[40px] px-4 text-xs">
              Salir
            </BotonSecundario>
          </div>
        </div>

        <nav aria-label="Secciones del panel" className="mx-auto mt-4 max-w-4xl">
          <ul className="flex gap-2 overflow-x-auto pb-1">
            {SECCIONES.map((s) => {
              const activa = ruta === s.ruta
              return (
                <li key={s.ruta} className="shrink-0">
                  <a
                    href={`#${s.ruta}`}
                    aria-current={activa ? 'page' : undefined}
                    className={`inline-flex min-h-[40px] items-center border px-4 text-sm font-semibold transition-colors ${
                      activa ? 'border-wine bg-wine text-cream' : 'border-ink/20 text-ink/70 hover:border-ink'
                    }`}
                  >
                    {s.etiqueta}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-8 sm:px-8">
        {errorStorage && (
          <div className="mb-6">
            <Aviso tono="error">{errorStorage}</Aviso>
          </div>
        )}
        {cargandoSheet && (
          <div className="mb-6">
            <Aviso>Cargando servicios desde la planilla de Google…</Aviso>
          </div>
        )}
        {errorSheet && (
          <div className="mb-6">
            <Aviso tono="error">{errorSheet} Se muestran los datos guardados en este navegador.</Aviso>
          </div>
        )}

        {ruta === '/admin' && <PanelServicios />}
        {ruta === '/admin/equipo' && <PanelEquipo />}
        {ruta === '/admin/galeria' && <PanelGaleria />}
        {ruta === '/admin/negocio' && <PanelNegocio />}
        {ruta === '/admin/turnos' && <PanelTurnos />}
        {ruta === '/admin/copias' && <PanelCopias />}
      </main>
    </div>
  )
}
