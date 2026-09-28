import { useState } from 'react'
import type { ServicioReserva } from '../types'

function ServiciosPanel({
  servicios,
  onAgregar,
  onEliminar,
}: {
  servicios: ServicioReserva[]
  onAgregar: (nombre: string, precio: string) => void
  onEliminar: (id: string) => void
}) {
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (nombre.trim() === '') return
    onAgregar(nombre.trim(), precio.trim())
    setNombre('')
    setPrecio('')
  }

  return (
    <div>
      <div className="mb-3">
        <h2 className="font-display text-base font-bold text-charcoal">
          Servicios
        </h2>
        <p className="text-xs text-charcoal/50">
          Compartidos entre las 3 estilistas. Se usan tanto en "Nueva
          reserva" del panel como en el paso 1 del wizard de reserva online.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-4 flex flex-col gap-3 rounded-2xl border border-rosewood/10 bg-white p-4 shadow-sm"
      >
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-charcoal/70">
            Nombre del servicio
          </span>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Peinado"
            className="rounded-xl border border-rosewood/20 px-4 py-3 text-base outline-none focus:border-rosewood"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-charcoal/70">
            Precio ilustrativo (opcional)
          </span>
          <input
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Ej: $500"
            className="rounded-xl border border-rosewood/20 px-4 py-3 text-base outline-none focus:border-rosewood"
          />
        </label>
        <button
          type="submit"
          disabled={nombre.trim() === ''}
          className="rounded-xl bg-rosewood px-4 py-3 text-sm font-semibold text-white shadow-sm transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        >
          + Agregar servicio
        </button>
      </form>

      {servicios.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-rosewood/20 bg-white/60 px-4 py-10 text-center">
          <p className="text-sm text-charcoal/50">
            No hay servicios cargados todavía. Agregá el primero arriba.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {servicios.map((servicio) => (
            <li
              key={servicio.id}
              className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm shadow-sm"
            >
              <div>
                <p className="font-semibold text-charcoal">{servicio.nombre}</p>
                {servicio.precio && (
                  <p className="text-xs text-gold">{servicio.precio}</p>
                )}
              </div>
              <button
                onClick={() => onEliminar(servicio.id)}
                className="text-xs font-semibold text-rosewood underline"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ServiciosPanel
