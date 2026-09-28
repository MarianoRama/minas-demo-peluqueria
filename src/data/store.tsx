import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  EQUIPO as EQUIPO_DEFAULT,
  GALERIA as GALERIA_DEFAULT,
  NEGOCIO as NEGOCIO_DEFAULT,
  SERVICIOS as SERVICIOS_DEFAULT,
  type Negocio,
} from '../data'
import { FUENTE_DATOS } from '../config'
import { cargarServiciosDesdeSheet } from './sheets'
import { DatosContext, type Datos, type DatosContextValue, type ItemDe, type NombreColeccion } from './datosContext'

const CLAVE_STORAGE = 'peluqueria.datos.v1'

const DATOS_EJEMPLO: Datos = {
  negocio: NEGOCIO_DEFAULT,
  servicios: SERVICIOS_DEFAULT,
  equipo: EQUIPO_DEFAULT,
  galeria: GALERIA_DEFAULT,
}

function clonarEjemplo(): Datos {
  return JSON.parse(JSON.stringify(DATOS_EJEMPLO)) as Datos
}

function cargarDeStorage(): Datos {
  try {
    const raw = localStorage.getItem(CLAVE_STORAGE)
    if (!raw) return clonarEjemplo()
    const parsed = JSON.parse(raw)
    // fusión superficial por si en el futuro se agregan campos nuevos
    return {
      negocio: { ...NEGOCIO_DEFAULT, ...(parsed.negocio ?? {}) },
      servicios: Array.isArray(parsed.servicios) ? parsed.servicios : SERVICIOS_DEFAULT,
      equipo: Array.isArray(parsed.equipo) ? parsed.equipo : EQUIPO_DEFAULT,
      galeria: Array.isArray(parsed.galeria) ? parsed.galeria : GALERIA_DEFAULT,
    }
  } catch {
    return clonarEjemplo()
  }
}

export function DatosProvider({ children }: { children: ReactNode }) {
  const [datos, setDatos] = useState<Datos>(() => cargarDeStorage())
  const [errorStorage, setErrorStorage] = useState<string | null>(null)
  const [cargandoSheet, setCargandoSheet] = useState(FUENTE_DATOS.tipo === 'sheets')
  const [errorSheet, setErrorSheet] = useState<string | null>(null)

  // Fuente Google Sheets opcional: sincroniza la colección de servicios con
  // un recurso externo (fetch), por eso vive en un efecto.
  useEffect(() => {
    if (FUENTE_DATOS.tipo !== 'sheets') return
    let cancelado = false
    cargarServiciosDesdeSheet(FUENTE_DATOS.csvUrl)
      .then((servicios) => {
        if (cancelado) return
        setDatos((prev) => ({ ...prev, servicios }))
        setErrorSheet(null)
      })
      .catch((err: unknown) => {
        if (cancelado) return
        setErrorSheet(err instanceof Error ? err.message : 'No se pudo cargar la planilla.')
      })
      .finally(() => {
        if (!cancelado) setCargandoSheet(false)
      })
    return () => {
      cancelado = true
    }
  }, [])

  const persistir = useCallback((nuevos: Datos) => {
    setDatos(nuevos)
    try {
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(nuevos))
      setErrorStorage(null)
    } catch {
      setErrorStorage(
        'No se pudo guardar en este navegador (almacenamiento lleno o bloqueado). Los cambios se ven en esta pantalla pero podrían perderse al recargar.',
      )
    }
  }, [])

  const actualizarNegocio = useCallback(
    (parcial: Partial<Negocio>) => {
      setDatos((prev) => {
        const nuevos = { ...prev, negocio: { ...prev.negocio, ...parcial } }
        persistir(nuevos)
        return nuevos
      })
    },
    [persistir],
  )

  const crear = useCallback(
    <K extends NombreColeccion>(coleccion: K, item: ItemDe<K>) => {
      setDatos((prev) => {
        const lista = prev[coleccion] as ItemDe<K>[]
        const nuevos = { ...prev, [coleccion]: [...lista, item] } as Datos
        persistir(nuevos)
        return nuevos
      })
    },
    [persistir],
  )

  const actualizar = useCallback(
    <K extends NombreColeccion>(coleccion: K, id: string, item: ItemDe<K>) => {
      setDatos((prev) => {
        const lista = prev[coleccion] as ItemDe<K>[]
        const nuevos = {
          ...prev,
          [coleccion]: lista.map((it) => (it.id === id ? item : it)),
        } as Datos
        persistir(nuevos)
        return nuevos
      })
    },
    [persistir],
  )

  const eliminar = useCallback(
    (coleccion: NombreColeccion, id: string) => {
      setDatos((prev) => {
        const lista = prev[coleccion] as { id: string }[]
        const nuevos = {
          ...prev,
          [coleccion]: lista.filter((it) => it.id !== id),
        } as Datos
        persistir(nuevos)
        return nuevos
      })
    },
    [persistir],
  )

  const restaurarEjemplo = useCallback(() => {
    persistir(clonarEjemplo())
  }, [persistir])

  const exportar = useCallback(() => {
    const blob = new Blob([JSON.stringify(datos, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `datos-${NEGOCIO_DEFAULT.nombre.toLowerCase().replace(/\s+/g, '-')}.json`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }, [datos])

  const importar = useCallback(
    (json: string): { ok: boolean; error?: string } => {
      try {
        const parsed = JSON.parse(json)
        if (!parsed || typeof parsed !== 'object') throw new Error('formato')
        const nuevos: Datos = {
          negocio: { ...NEGOCIO_DEFAULT, ...(parsed.negocio ?? {}) },
          servicios: Array.isArray(parsed.servicios) ? parsed.servicios : datos.servicios,
          equipo: Array.isArray(parsed.equipo) ? parsed.equipo : datos.equipo,
          galeria: Array.isArray(parsed.galeria) ? parsed.galeria : datos.galeria,
        }
        persistir(nuevos)
        return { ok: true }
      } catch {
        return { ok: false, error: 'El archivo no tiene el formato esperado.' }
      }
    },
    [datos, persistir],
  )

  const value = useMemo<DatosContextValue>(
    () => ({
      datos,
      cargandoSheet,
      errorSheet,
      errorStorage,
      actualizarNegocio,
      crear,
      actualizar,
      eliminar,
      restaurarEjemplo,
      exportar,
      importar,
    }),
    [datos, cargandoSheet, errorSheet, errorStorage, actualizarNegocio, crear, actualizar, eliminar, restaurarEjemplo, exportar, importar],
  )

  return <DatosContext.Provider value={value}>{children}</DatosContext.Provider>
}
