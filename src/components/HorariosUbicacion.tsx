import { NOMBRES_DIA, type DiaSemana } from '../data'
import { useDatos } from '../data/useDatos'
import { dateKey, formatearFechaLarga } from '../lib/booking'

function formatearHora(h: number) {
  return `${String(h).padStart(2, '0')}:00`
}

/** Agrupa días consecutivos con el mismo horario, ej. "Lunes a viernes". */
function agruparHorario(horarioSemana: { dia: DiaSemana; apertura: number | null; cierre: number | null }[]) {
  const orden: DiaSemana[] = [1, 2, 3, 4, 5, 6, 0]
  const bloques = orden.map((dia) => horarioSemana.find((b) => b.dia === dia) ?? { dia, apertura: null, cierre: null })

  const grupos: { desde: string; hasta: string; apertura: number | null; cierre: number | null }[] = []
  for (const b of bloques) {
    const ultimo = grupos[grupos.length - 1]
    if (ultimo && ultimo.apertura === b.apertura && ultimo.cierre === b.cierre) {
      ultimo.hasta = NOMBRES_DIA[b.dia]
    } else {
      grupos.push({ desde: NOMBRES_DIA[b.dia], hasta: NOMBRES_DIA[b.dia], apertura: b.apertura, cierre: b.cierre })
    }
  }
  return grupos
}

export function HorariosUbicacion() {
  const { datos } = useDatos()
  const { negocio: NEGOCIO } = datos
  const grupos = agruparHorario(NEGOCIO.horarioSemana)
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)
  const proximoBloqueo = NEGOCIO.diasBloqueados
    .filter((b) => new Date(`${b.fecha}T00:00:00`) >= hoy)
    .sort((a, b) => a.fecha.localeCompare(b.fecha))[0]

  return (
    <section id="ubicacion" className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Te esperamos en el centro
          </h2>

          <dl className="mt-8 divide-y divide-ink/15 border-y border-ink/15">
            {grupos.map((g) => (
              <div key={g.desde} className="flex items-center justify-between py-3">
                <dt className="font-medium text-ink/80">
                  {g.desde === g.hasta ? g.desde : `${g.desde} a ${g.hasta}`}
                </dt>
                <dd className={g.apertura === null ? 'text-ink/40' : 'font-display text-lg text-wine'}>
                  {g.apertura === null || g.cierre === null
                    ? 'Cerrado'
                    : `${formatearHora(g.apertura)} – ${formatearHora(g.cierre)}`}
                </dd>
              </div>
            ))}
          </dl>

          {proximoBloqueo && (
            <p className="mt-4 flex items-start gap-2 border border-dashed border-wine/40 bg-wine/5 px-3 py-2.5 text-sm text-wine">
              <span aria-hidden="true">✎</span>
              <span>
                Ojo: el {dateKey(hoy) === proximoBloqueo.fecha ? 'hoy' : formatearFechaLarga(proximoBloqueo.fecha)} no
                abrimos{proximoBloqueo.motivo ? ` (${proximoBloqueo.motivo})` : ''}.
              </span>
            </p>
          )}

          <address className="mt-8 not-italic text-ink/70">
            <p className="font-medium text-ink">{NEGOCIO.direccion}</p>
            <p className="text-sm text-ink/50">{NEGOCIO.referencia}</p>
            <p className="mt-3 text-sm">
              Tel/WhatsApp:{' '}
              <a
                className="underline decoration-wine/50 underline-offset-4 hover:text-wine"
                href={`https://wa.me/${NEGOCIO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {NEGOCIO.telefonoDisplay}
              </a>
            </p>
          </address>
        </div>

        <div className="relative min-h-[20rem] overflow-hidden border border-ink/15 bg-cream-dim">
          <div
            aria-hidden="true"
            className="textura-papel absolute inset-0 flex items-center justify-center text-ink/25"
          >
            <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth={1.4}>
              <path
                d="M32 6c11 0 19 8 19 18 0 13-19 34-19 34S13 37 13 24C13 14 21 6 32 6Z"
                strokeLinejoin="round"
              />
              <circle cx="32" cy="24" r="6" />
            </svg>
          </div>
          <iframe
            title={`Ubicación de ${NEGOCIO.nombre} en Minas, Uruguay (dirección de ejemplo)`}
            src={`https://www.google.com/maps?q=${NEGOCIO.mapsQuery}&output=embed`}
            className="relative h-80 w-full border-0 md:h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
