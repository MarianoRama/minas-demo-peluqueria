import { HORARIOS, NEGOCIO } from '../data'

export function HorariosUbicacion() {
  return (
    <section id="ubicacion" className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold tracking-[0.25em] text-wine uppercase">
            Horarios &amp; ubicación
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Te esperamos en el centro
          </h2>

          <dl className="mt-8 divide-y divide-ink/15 border-y border-ink/15">
            {HORARIOS.map((h) => (
              <div key={h.dias} className="flex items-center justify-between py-3">
                <dt className="font-medium text-ink/80">{h.dias}</dt>
                <dd className={h.cerrado ? 'text-ink/40' : 'font-display text-lg text-wine'}>
                  {h.horario}
                </dd>
              </div>
            ))}
          </dl>

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
