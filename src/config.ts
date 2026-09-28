/**
 * Datos del autor del sitio (freelancer). Editá este archivo para cambiar
 * el crédito que aparece discretamente en el footer.
 */
export const AUTOR = {
  nombre: 'Mariano Rama',
  whatsapp: '59899000000',
  texto: 'Diseño y desarrollo web en Minas',
}

/**
 * De dónde salen los datos editables del sitio.
 * - 'local': se editan desde el panel (#/admin) y quedan en este navegador.
 * - 'sheets': la colección de servicios se lee de una planilla de Google
 *   Sheets publicada como CSV (Archivo → Compartir → Publicar en la web →
 *   formato CSV). Columnas: id, nombre, categoria, precio, duracionMin,
 *   descripcion, activo, destacado (ver README.md para el detalle).
 *   En ese modo el panel muestra el link a la planilla en vez del formulario.
 */
export const FUENTE_DATOS: { tipo: 'local' } | { tipo: 'sheets'; csvUrl: string } = {
  tipo: 'local',
}
