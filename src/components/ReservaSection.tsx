import { useState } from 'react'
import { Reserva } from './Reserva'
import { MisTurnos } from './MisTurnos'
import { useReveal } from '../hooks/useReveal'

export function ReservaSection() {
  const [senal, setSenal] = useState(0)
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="reserva" className="bg-cream-dim px-5 py-20 sm:px-8 sm:py-28">
      <div ref={ref} className="mx-auto max-w-3xl">
        <div data-reveal>
          <p className="text-xs font-semibold tracking-[0.25em] text-wine uppercase">
            Reservá online
          </p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Sacá tu turno en 4 pasos
          </h2>
          <p className="mt-4 max-w-xl text-ink/65">
            Elegí el servicio, quién te atiende y el horario que más te
            convenga. Confirmá por WhatsApp y listo.
          </p>
        </div>

        <div data-reveal className="mt-10">
          <Reserva onReservaConfirmada={() => setSenal((v) => v + 1)} />
          <MisTurnos actualizarSenal={senal} />
        </div>
      </div>
    </section>
  )
}
