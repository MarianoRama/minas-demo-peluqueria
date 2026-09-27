/**
 * Cinta de "marcas con las que trabajamos" — wordmarks tipográficos propios
 * de marcas FICTICIAS (no representan productos reales) acordes al rubro:
 * coloración, keratina, cuidado de barba, herramientas.
 */
const MARCAS = [
  'Ceniza Color Lab',
  'Queratina Pampa',
  'Barba & Oficio',
  'Filo Norte Herramientas',
  'Botánica Capilar',
  'Espuma del Sur',
]

function Pista({ ocultarParaLectores }: { ocultarParaLectores?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-14 pr-14"
      aria-hidden={ocultarParaLectores}
    >
      {MARCAS.map((marca) => (
        <span
          key={marca}
          className="font-display text-xl font-semibold tracking-tight text-ink/35 whitespace-nowrap transition-colors duration-300 hover:text-wine sm:text-2xl"
        >
          {marca}
        </span>
      ))}
    </div>
  )
}

export function MarcasMarquee() {
  return (
    <section className="border-y border-ink/10 bg-cream-dim py-10" aria-label="Marcas con las que trabajamos">
      <p className="mx-auto mb-6 max-w-6xl px-5 text-xs font-semibold tracking-[0.25em] text-ink/45 uppercase sm:px-8">
        Trabajamos con
      </p>
      <div className="cinta-logos overflow-hidden">
        <div className="cinta-logos-pista flex w-max">
          <Pista />
          <Pista ocultarParaLectores />
        </div>
      </div>
    </section>
  )
}
