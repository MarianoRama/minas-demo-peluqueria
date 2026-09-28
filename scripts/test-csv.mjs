// Test rápido y manual del parser de CSV (sin dependencias de test runner).
// Correr con: node scripts/test-csv.mjs
import assert from 'node:assert'

function parseCSV(texto) {
  const filas = []
  let fila = []
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
    if (c === '"') entreComillas = true
    else if (c === ',') {
      fila.push(campo)
      campo = ''
    } else if (c === '\n') {
      fila.push(campo)
      filas.push(fila)
      fila = []
      campo = ''
    } else campo += c
  }
  if (campo.length > 0 || fila.length > 0) {
    fila.push(campo)
    filas.push(fila)
  }
  return filas.filter((f) => f.some((v) => v.trim() !== ''))
}

const csv = [
  'id,nombre,categoria,precio,duracionMin,descripcion,activo',
  'corte-dama,"Corte, dama y niños",Corte,450,45,"Lavado, corte y ""secado"" con cepillo",si',
  'color-raiz,Color raíz,Color,900,60,Retoque de raíz,si',
].join('\n')

const filas = parseCSV(csv)
assert.strictEqual(filas.length, 3, 'debe haber 3 filas (encabezado + 2 datos)')
assert.deepStrictEqual(filas[0], [
  'id',
  'nombre',
  'categoria',
  'precio',
  'duracionMin',
  'descripcion',
  'activo',
])
assert.strictEqual(filas[1][1], 'Corte, dama y niños', 'coma dentro de comillas')
assert.strictEqual(
  filas[1][5],
  'Lavado, corte y "secado" con cepillo',
  'comillas escapadas dentro de un campo',
)
assert.strictEqual(filas[2][1], 'Color raíz')

console.log('OK: parseCSV pasa las 5 verificaciones.')
