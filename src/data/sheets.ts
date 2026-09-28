import type { Servicio } from '../data'

/**
 * Parser de CSV mínimo pero correcto: soporta comas y saltos de línea dentro
 * de campos entre comillas dobles, y comillas escapadas como "" dentro de un
 * campo entre comillas. No usa expresiones regulares para no fallar con
 * campos multilínea.
 */
export function parseCSV(texto: string): string[][] {
  const filas: string[][] = []
  let fila: string[] = []
  let campo = ''
  let entreComillas = false

  const contenido = texto.replace(/\r\n/g, '\n').replace(/\r/g, '\n')

  for (let i = 0; i < contenido.length; i++) {
    const c = contenido[i]

    if (entreComillas) {
      if (c === '"') {
        if (contenido[i + 1] === '"') {
          campo += '"'
          i++
        } else {
          entreComillas = false
        }
      } else {
        campo += c
      }
      continue
    }

    if (c === '"') {
      entreComillas = true
    } else if (c === ',') {
      fila.push(campo)
      campo = ''
    } else if (c === '\n') {
      fila.push(campo)
      filas.push(fila)
      fila = []
      campo = ''
    } else {
      campo += c
    }
  }

  // último campo/fila si el archivo no termina en salto de línea
  if (campo.length > 0 || fila.length > 0) {
    fila.push(campo)
    filas.push(fila)
  }

  // descarta filas totalmente vacías (líneas en blanco al final del CSV)
  return filas.filter((f) => f.some((v) => v.trim() !== ''))
}

/**
 * Columnas esperadas en la planilla publicada (ver README):
 * id, nombre, categoria, precio, duracionMin, descripcion, activo, destacado
 */
export async function cargarServiciosDesdeSheet(csvUrl: string): Promise<Servicio[]> {
  const respuesta = await fetch(csvUrl)
  if (!respuesta.ok) throw new Error(`No se pudo leer la planilla (HTTP ${respuesta.status}).`)
  const texto = await respuesta.text()
  const filas = parseCSV(texto)
  if (filas.length < 2) throw new Error('La planilla está vacía o no tiene filas de datos.')

  const encabezados = filas[0].map((h) => h.trim().toLowerCase())
  const indice = (col: string) => encabezados.indexOf(col)

  const iId = indice('id')
  const iNombre = indice('nombre')
  const iCategoria = indice('categoria')
  const iPrecio = indice('precio')
  const iDuracion = indice('duracionmin')
  const iDescripcion = indice('descripcion')
  const iActivo = indice('activo')
  const iDestacado = indice('destacado')

  if (iNombre === -1 || iCategoria === -1 || iPrecio === -1 || iDuracion === -1) {
    throw new Error('Faltan columnas obligatorias: nombre, categoria, precio, duracionMin.')
  }

  return filas.slice(1).map((fila, i) => ({
    id: (iId !== -1 ? fila[iId] : '') || `sheet-${i}`,
    nombre: fila[iNombre] ?? '',
    categoria: fila[iCategoria] ?? '',
    precio: Number(fila[iPrecio]) || 0,
    duracionMin: Number(fila[iDuracion]) || 0,
    descripcion: iDescripcion !== -1 ? fila[iDescripcion] : undefined,
    activo: iActivo !== -1 ? /^(s|si|sí|true|1)$/i.test(fila[iActivo]?.trim() ?? 'si') : true,
    destacado: iDestacado !== -1 ? /^(s|si|sí|true|1)$/i.test(fila[iDestacado]?.trim() ?? '') : false,
  }))
}
