import { createContext } from 'react'
import type { Negocio, Profesional, Servicio, TrabajoGaleria } from '../data'

export type Datos = {
  negocio: Negocio
  servicios: Servicio[]
  equipo: Profesional[]
  galeria: TrabajoGaleria[]
}

export type NombreColeccion = 'servicios' | 'equipo' | 'galeria'

export type ItemDe<K extends NombreColeccion> = Datos[K][number]

export type DatosContextValue = {
  datos: Datos
  cargandoSheet: boolean
  errorSheet: string | null
  errorStorage: string | null
  actualizarNegocio: (parcial: Partial<Negocio>) => void
  crear: <K extends NombreColeccion>(coleccion: K, item: ItemDe<K>) => void
  actualizar: <K extends NombreColeccion>(coleccion: K, id: string, item: ItemDe<K>) => void
  eliminar: (coleccion: NombreColeccion, id: string) => void
  restaurarEjemplo: () => void
  exportar: () => void
  importar: (json: string) => { ok: boolean; error?: string }
}

export const DatosContext = createContext<DatosContextValue | null>(null)
