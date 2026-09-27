import { NEGOCIO } from '../data'
import { IconGota, IconPeine, IconPerfil, IconTijera } from './icons'

const CIFRAS = [
  { numero: '17', detalle: 'años en el centro de Minas' },
  { numero: '4', detalle: 'profesionales en el salón' },
  { numero: '30', detalle: 'min el corte más rápido' },
]

export function Hero() {
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
            Cortes, color y barbería a la vieja usanza, con la comodidad de
            reservar tu hora exacta desde el celular — sin llamadas, sin
            esperas.
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

          <dl className="mt-14 grid grid-cols-3 gap-4 border-t border-ink/15 pt-8 sm:max-w-lg">
            {CIFRAS.map((c) => (
              <div key={c.detalle}>
                <dt className="sr-only">{c.detalle}</dt>
                <dd className="font-display text-4xl font-semibold text-wine sm:text-5xl">
                  {c.numero}
                </dd>
                <p className="mt-1 text-xs leading-snug text-ink/60">{c.detalle}</p>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative min-h-[22rem] overflow-hidden bg-ink px-8 py-14 sm:min-h-[28rem] md:col-span-5 md:min-h-full">
          <span
            aria-hidden="true"
            className="absolute -top-10 -right-10 font-display text-[9rem] leading-none text-cream/10 select-none"
          >
            &amp;
          </span>

          <div className="relative flex h-full flex-col items-center justify-center gap-8">
            <IconPerfil className="h-36 w-36 text-cream sm:h-44 sm:w-44" aria-hidden="true" />

            <div className="grid w-full max-w-[16rem] grid-cols-2 gap-4">
              <div className="flex flex-col items-center gap-2 border border-cream/20 py-5">
                <IconTijera className="h-8 w-8 text-wine-light" aria-hidden="true" />
                <span className="text-[11px] tracking-wide text-cream/60 uppercase">Corte</span>
              </div>
              <div className="flex flex-col items-center gap-2 border border-cream/20 py-5">
                <IconGota className="h-8 w-8 text-wine-light" aria-hidden="true" />
                <span className="text-[11px] tracking-wide text-cream/60 uppercase">Color</span>
              </div>
            </div>

            <p className="flex items-center gap-2 font-display text-lg text-cream/85">
              <IconPeine className="h-5 w-5 text-cream/50" aria-hidden="true" />
              Desde 2009, estilo con oficio
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
