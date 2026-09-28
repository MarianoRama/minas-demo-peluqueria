import { useDatos } from '../data/useDatos'
import { IconRetratoEditorial } from './icons'

export function Hero() {
  const { datos } = useDatos()
  const { negocio: NEGOCIO } = datos
  return (
    <section id="inicio" className="textura-papel border-b border-ink/10">
      <div className="mx-auto grid max-w-6xl gap-0 md:grid-cols-12">
        <div className="px-5 pt-14 pb-10 sm:px-8 sm:pt-20 sm:pb-16 md:col-span-7 md:py-24">
          <p className="text-xs font-semibold tracking-[0.25em] text-wine uppercase">
            {NEGOCIO.rubro} · Minas, Lavalleja
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.6rem,7vw,4.8rem)] leading-[0.98] font-semibold tracking-tight text-ink">
            Oficio, tijera
            <br />
            y buena charla.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/70">
            Cortes, color y barbería con hora reservada desde el celular:
            elegís el día, quién te atiende y listo, sin tener que llamar.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#reserva"
              className="enlace-flecha inline-flex items-center justify-center gap-2 bg-ink px-8 py-4 text-base font-semibold tracking-wide text-cream transition-colors hover:bg-wine"
            >
              Reservá tu turno
              <span className="enlace-flecha-icono">→</span>
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center justify-center border border-ink/30 px-8 py-4 text-base font-semibold tracking-wide text-ink transition-colors hover:border-ink"
            >
              Ver lista de precios
            </a>
          </div>

          <p className="mt-14 max-w-lg border-t border-ink/15 pt-6 text-sm text-ink/60">
            En el mismo local de Treinta y Tres y Rodó desde 2009. Estacionás
            en la puerta y, si vas caminando, quedamos a dos cuadras de Plaza
            Libertad.
          </p>
        </div>

        <div className="relative flex min-h-[26rem] flex-col overflow-hidden bg-ink px-6 py-8 sm:min-h-[32rem] sm:px-9 sm:py-10 md:col-span-5 md:min-h-full">
          <div className="flex items-baseline justify-between border-b border-cream/15 pb-4 text-[11px] font-semibold tracking-[0.22em] text-cream/55 uppercase">
            <span>Nº 17</span>
            <span>Otoño en Minas</span>
          </div>

          <div className="relative flex flex-1 items-center justify-center py-6">
            {NEGOCIO.heroFoto ? (
              <img
                src={NEGOCIO.heroFoto}
                alt={`Interior de ${NEGOCIO.nombre}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <IconRetratoEditorial className="h-full max-h-80 w-auto" aria-hidden="true" />
            )}
          </div>

          <p className="border-t border-cream/15 pt-4 text-center font-display text-lg text-cream/85 italic">
            "Estilo con oficio, desde 2009"
          </p>
        </div>
      </div>
    </section>
  )
}
