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
- Hero asimétrico con panel ilustrado grande y cifras destacadas
- Lista de precios ("La carta del salón") agrupada por categoría
- Equipo con monogramas/iniciales ilustradas
- **Reservá tu turno**: wizard de 4 pasos (servicio → profesional → día y
  horario → datos de contacto) con horarios de ejemplo generados de forma
  determinística por fecha, confirmación con botón "Confirmar por
  WhatsApp" y sección "Tus turnos" con cancelación (diálogo propio)
- Horarios y ubicación con mapa de Google Maps embebido
- Cinta de marcas ("Trabajamos con") con desplazamiento continuo
- Footer con contacto ficticio y crédito del autor
- Botón flotante de WhatsApp

## Cómo correrlo

```bash
npm install
npm run dev      # entorno de desarrollo
npm run build    # build de producción (carpeta dist/)
npm run preview  # sirve el build de producción localmente
npm run lint      # chequeo de lint (oxlint)
```

## Cómo cambiar los datos del negocio

- **Servicios, precios, duraciones, equipo y horarios**: editá
  `src/data.ts`. Cada servicio tiene `precio` (en pesos uruguayos) y
  `duracionMin` (usada para calcular los horarios disponibles del turno).
- **Fotos reales**: los tipos `Servicio` y `Profesional` en `src/data.ts`
  tienen un campo opcional `foto?: string`. Si le cargás una URL o ruta de
  imagen a un ítem, se muestra esa foto en vez de la ilustración/monograma.
- **Datos de contacto del negocio** (dirección, WhatsApp, email, query del
  mapa): objeto `NEGOCIO` en `src/data.ts`.
- **Crédito del autor** (footer): `src/config.ts`, objeto `AUTOR`.
- **Reservas de ejemplo**: la disponibilidad de horarios es generada de
  forma determinística en `src/lib/booking.ts` (no hay backend real); las
  reservas de los visitantes quedan guardadas únicamente en el
  `localStorage` de su navegador.

## Deploy

- **Vercel**: importar el repositorio, framework "Vite" (autodetectado),
  build command `npm run build`, output directory `dist`.
- **Netlify**: build command `npm run build`, publish directory `dist`.
- **GitHub Pages / subcarpetas**: el proyecto ya tiene `base: './'` en
  `vite.config.ts`, así que el build de `dist/` funciona igual en la raíz
  de un dominio o dentro de una subcarpeta.
