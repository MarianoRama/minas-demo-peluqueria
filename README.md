# Tijera & Tinta — DEMO de portafolio

Landing page de una sola página para "Tijera & Tinta", una peluquería y
barbería **ficticia** de Minas, Uruguay, creada como pieza de portafolio
para mostrarle a dueños de peluquerías y barberías locales el tipo de sitio
que un freelancer puede desarrollarles — incluyendo un sistema de reserva
de turnos online funcional.

**Este no es un negocio real.** El nombre, los servicios, los precios, el
equipo, el número de WhatsApp, las redes sociales y la dirección son todos
datos de ejemplo.

## Stack

- [Vite](https://vite.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) (vía `@tailwindcss/vite`)
- Fuentes self-hosted vía `@fontsource`: **Fraunces** (títulos) y **Work
  Sans** (texto) — no se usa Google Fonts por CDN.
- Sin backend: las reservas se guardan en `localStorage` del navegador.

## Identidad visual

Paleta editorial cálida: crema/hueso, bordó profundo y negro tinta. Tipografía
serif con carácter (Fraunces) combinada con una sans limpia (Work Sans).
Layout asimétrico, números grandes, lista de precios tipo carta de
restaurante con líneas punteadas, ilustraciones SVG de línea propias (tijera,
peine, perfil, secador, navaja, gota) en vez de fotos, equipo con monogramas
ilustrados. Todos los colores y fuentes están definidos como tokens
`@theme` en `src/index.css`.

## Secciones

- Franja discreta "Sitio de demostración" + header con menú y CTA
- Aviso editable del home (novedades, ocupación, feriados)
- Hero asimétrico con panel ilustrado grande
- Lista de precios ("La carta del salón") agrupada por categoría, con estilo
  de carta impresa (sello, anotación a mano) y un link "Reservar" por
  servicio que salta directo al wizard con ese servicio ya elegido
- Equipo con monogramas/iniciales ilustradas y días que atiende cada uno
- Galería de trabajos (polaroids con cinta); si no hay fotos cargadas
  muestra marcos vacíos con una nota a mano, y pagina de a 8 si hay más
- **Reservá tu turno**: wizard de 4 pasos (servicio → profesional → día y
  horario → datos de contacto), respeta los días que trabaja cada
  profesional y los días bloqueados del negocio, confirmación con botón
  "Confirmar por WhatsApp" y sección "Tus turnos" con cancelación
- Horarios y ubicación con mapa de Google Maps embebido
- Cinta de marcas ("Trabajamos con") con desplazamiento continuo
- Footer con contacto ficticio, crédito del autor y link al panel
- Botón flotante de WhatsApp

## Panel de administración (`#/admin`)

Pensado para que el dueño del salón cambie precios, equipo, fotos y
horarios desde el celular, sin escribirle al desarrollador.

- **Acceso**: PIN de demostración `1234` (se muestra en la pantalla de
  ingreso), guardado en `sessionStorage`. **En un sitio real este PIN fijo
  no alcanza**: el acceso se resuelve con una cuenta de Google (si los
  datos viven en una planilla de Sheets) o con un login de verdad en un
  backend (por ejemplo Supabase).
- **Secciones**: Servicios, Equipo, Trabajos (galería), Negocio (datos de
  contacto, horario semanal y días puntuales cerrados) y Turnos (los
  turnos reservados en ese navegador, con "marcar atendido" y "cancelar").
- **Fotos**: se cargan desde `<input type="file" accept="image/*"
  capture>`, se redimensionan en el cliente a máx. 1200px con canvas y se
  guardan como JPEG en `localStorage` (`src/lib/imagen.ts`).
- **Copias**: "Descargar copia (JSON)", "Cargar copia" y "Volver a los
  datos de ejemplo" en la pestaña Copias.
- **Arquitectura**: `src/data/store.tsx` expone `<DatosProvider>` y el hook
  `useDatos()` con `crear/actualizar/eliminar/restaurarEjemplo/exportar/
  importar`. Todo el sitio público lee de `useDatos()`, nunca de
  `src/data.ts` directamente, así lo que se edita en el panel se ve al
  instante. Los datos por defecto (los de "fábrica") siguen siendo los de
  `src/data.ts`; el panel solo agrega una capa de `localStorage` con clave
  versionada `peluqueria.datos.v1`.

### Fuente de datos: local o Google Sheets

En `src/config.ts`, `FUENTE_DATOS` define de dónde sale la colección de
servicios:

```ts
export const FUENTE_DATOS = { tipo: 'local' } // por defecto
// o, para un cliente real:
export const FUENTE_DATOS = { tipo: 'sheets', csvUrl: 'https://docs.google.com/.../pub?output=csv' }
```

Con `tipo: 'sheets'`, los servicios se leen de una planilla de Google
publicada como CSV (**Archivo → Compartir → Publicar en la web → CSV**).
Columnas esperadas (con encabezado, en cualquier orden):

| id (opcional) | nombre | categoria | precio | duracionMin | descripcion | activo | destacado |
|---|---|---|---|---|---|---|---|
| corte-dama | Corte dama | Corte | 450 | 45 | Lavado, corte y secado | si | no |

Si la planilla no carga (sin conexión, URL mal publicada), el sitio
muestra los datos locales como respaldo y un aviso. En ese modo, el panel
muestra el link a la planilla en vez del formulario de servicios. El
parser de CSV (soporta comas y comillas dentro de campos) está en
`src/data/sheets.ts` y se puede probar con `node scripts/test-csv.mjs`.

## Cómo correrlo

```bash
npm install
npm run dev      # entorno de desarrollo
npm run build    # build de producción (carpeta dist/)
npm run preview  # sirve el build de producción localmente
npm run lint      # chequeo de lint (oxlint)
```

## Cómo cambiar los datos del negocio

La forma pensada para el día a día es el **panel** (`#/admin`, PIN `1234`).
Para cambiar los datos "de fábrica" (los que ve alguien que nunca tocó el
panel, o después de "Volver a los datos de ejemplo"):

- **Servicios, precios, duraciones, equipo, galería y horarios**: editá
  `src/data.ts`. Cada servicio tiene `precio` (en pesos uruguayos) y
  `duracionMin` (usada para calcular los horarios disponibles del turno);
  cada profesional tiene `diasTrabaja` (0 = domingo … 6 = sábado).
- **Fotos reales**: los tipos `Servicio`, `Profesional` y `TrabajoGaleria`
  en `src/data.ts` tienen un campo opcional `foto?: string` (dataURL o
  ruta de imagen). Se puede completar a mano acá, o cargar desde el panel.
- **Datos de contacto y horario del negocio**: objeto `NEGOCIO` en
  `src/data.ts` (incluye `horarioSemana` y `diasBloqueados`).
- **Crédito del autor** (footer): `src/config.ts`, objeto `AUTOR`.
- **Reservas**: la disponibilidad de horarios es generada de forma
  determinística en `src/lib/booking.ts` (no hay backend real); las
  reservas de los visitantes quedan guardadas únicamente en el
  `localStorage` de su navegador, y son las que ve el panel en "Turnos".

## Deploy

- **Vercel**: importar el repositorio, framework "Vite" (autodetectado),
  build command `npm run build`, output directory `dist`.
- **Netlify**: build command `npm run build`, publish directory `dist`.
- **GitHub Pages / subcarpetas**: el proyecto ya tiene `base: './'` en
  `vite.config.ts`, así que el build de `dist/` funciona igual en la raíz
  de un dominio o dentro de una subcarpeta.
