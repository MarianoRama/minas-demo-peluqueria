import { AUTOR } from '../config'
import { NEGOCIO } from '../data'
import { IconTijera } from './icons'

const REDES = ['Instagram', 'Facebook', 'TikTok']

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink px-5 py-14 text-cream sm:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <IconTijera className="h-5 w-5 text-wine-light" aria-hidden="true" />
            <span className="font-display text-xl font-semibold">{NEGOCIO.nombre}</span>
          </div>
          <p className="mt-3 text-sm text-cream/55">
            {NEGOCIO.rubro} — proyecto demo de portafolio, no representa un
            negocio real.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-widest text-cream/50 uppercase">
            Contacto (ficticio)
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-cream/70">
            <li>WhatsApp: {NEGOCIO.telefonoDisplay}</li>
            <li>Email: {NEGOCIO.email}</li>
            <li>{NEGOCIO.direccion}</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-widest text-cream/50 uppercase">
            Seguinos
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-cream/70">
            {REDES.map((red) => (
              <li key={red} title={`${red} — sin enlace real, solo demo`}>
                {red}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-cream/10 pt-6 text-center text-xs text-cream/45">
        <p>
          © {new Date().getFullYear()} {NEGOCIO.nombre} — sitio de demostración de portafolio.
          Nombre, precios, contacto e ilustraciones son ficticios.
        </p>
        <p className="mt-3">
          Sitio demo por {AUTOR.nombre} — ¿querés una página así para tu negocio?{' '}
          <a
            href={`https://wa.me/${AUTOR.whatsapp}?text=${encodeURIComponent(
              `Hola ${AUTOR.nombre}! Vi la demo de ${NEGOCIO.nombre} y me interesa una página para mi negocio.`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-cream/80 underline decoration-wine-light/60 underline-offset-4 hover:text-cream"
          >
            Escribime
          </a>{' '}
          — {AUTOR.texto}.
        </p>
      </div>
    </footer>
  )
}
