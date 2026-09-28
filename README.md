# Estilo Minas — DEMO de portafolio

Landing page de una sola página para "Estilo Minas", una peluquería/estética
**ficticia** creada como pieza de portafolio para mostrarle a dueños de
peluquerías y barberías de Minas, Uruguay, el tipo de sitio que un
freelancer puede desarrollarles.

**Este no es un negocio real.** El nombre, los servicios, los precios, el
número de WhatsApp, las redes sociales, la dirección y las imágenes de la
galería (placeholders de picsum.photos) son todos datos de ejemplo.

## Stack

- [Vite](https://vite.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) (vía `@tailwindcss/vite`)
- Fuentes: Playfair Display (títulos) y Poppins (texto), de Google Fonts

## Secciones

- Header con menú de anclas (Inicio, Servicios, Galería, Contacto)
- Hero con CTA "Reservá tu turno"
- Servicios con tarjetas y precios de ejemplo (corte, color, tratamientos,
  barbería, manicura)
- Galería tipo grid con placeholders de imagen
- CTA de WhatsApp (número de ejemplo)
- Horarios y ubicación con mapa de Google Maps embebido (búsqueda genérica
  "Minas, Uruguay")
- Footer con redes sociales (sin enlaces reales) y contacto ficticio

## Reserva de turnos online (demo)

Además del panel interno, el sitio tiene un **wizard de reserva pública**
para que el propio cliente saque su turno sin pasar por la estilista. Se
accede desde el botón "Reservar turno online" del header, del hero o del
footer (ruta `#/reservar`).

- **Wizard paso a paso** (no un formulario largo): un paso por pantalla, con
  barra de progreso arriba y botones grandes "Atrás"/"Siguiente" pensados
  para el pulgar en el celular.
  1. **Servicio**: lista dinámica (ver "Servicios editables" abajo).
  2. **Estilista**: una de las 3, o "Cualquiera disponible".
  3. **Fecha y hora**: solo se muestran combinaciones realmente libres —
     respeta el cierre global del salón, la disponibilidad personal de la
     estilista elegida (`lib/disponibilidad.ts`) y excluye horarios ya
     ocupados por otra reserva de esa estilista ese día
     (`lib/horarios.ts`, franjas de 30 min según el horario de atención). Con
     "Cualquiera disponible" se muestran las franjas donde al menos una
     estilista está libre y se asigna automáticamente a la primera que puede.
  4. **Datos de contacto**: nombre y teléfono.
  5. **Confirmación**: resumen + botón de confirmar, con link de WhatsApp al
     final para que el cliente avise si quiere.
- **Estado de la reserva**: las reservas hechas por el cliente desde este
  wizard quedan con `estado: 'pendiente'`; las que carga la estilista
  directamente en el panel interno (ya acordadas en persona) siguen quedando
  `'confirmada'` sin cambios en ese flujo. En la agenda del panel interno,
  los turnos pendientes se ven resaltados con un botón "Confirmar turno".
- Guarda en el mismo `estilo-minas.reservas` de `localStorage` que usa el
  panel interno — es la misma fuente de datos, solo cambia quién la carga.

## Servicios editables

La lista de servicios (antes fija en el código) ahora se guarda en
`localStorage` (`estilo-minas.servicios`, sembrada con los 4 servicios de
ejemplo originales: corte, color, barba, tratamiento) y es **editable desde
el panel interno**, pestaña "Servicios": cualquier estilista puede agregar un
servicio (nombre y precio ilustrativo opcional) o eliminar uno. Es
compartida entre las 3 estilistas, no personal.

Tanto el selector de servicio de "Nueva reserva" en el panel interno como el
paso 1 del wizard de reserva pública leen de esta misma lista dinámica
(`lib/storage.ts` → `loadServicios`/`saveServicios`).

## Panel de estilistas (demo)

Además de la landing, el sitio incluye un **panel de administración** pensado
para que el dueño de la peluquería lo use desde el celular, en el momento en
que un cliente pide un turno. Se accede desde el link "Panel de estilistas"
del header o del footer (ruta `#/panel`, separada de los anclas de la
landing).

- **Selección de perfil**: al entrar se elige "quién sos" entre los 3
  estilistas de ejemplo. No hay contraseña real — es solo una pantalla de
  selección, suficiente para una demo.
- **Agenda por estilista**: cada estilista ve únicamente sus propias
  reservas, día por día, con nombre del cliente, teléfono y servicio. Las
  reservas hechas por el cliente desde el wizard público se ven resaltadas
  como "Pendiente" con un botón para confirmarlas.
- **Reserva rápida**: formulario mínimo (cliente, teléfono, servicio, fecha,
  hora) pensado para cargarse en pocos toques, parado con el cliente
  adelante. Estas quedan `confirmada` directamente, sin pasar por "pendiente".
- **Servicios**: pestaña para agregar o eliminar los servicios que ofrece el
  salón (ver "Servicios editables" más arriba).
- **Días cerrados**: un calendario donde se toca un día para marcarlo
  cerrado (feriado, día libre) y bloquear que se carguen turnos ese día,
  para cualquier estilista.
- **Mis días libres (disponibilidad personal)**: además del cierre global,
  cada estilista puede marcar sus propios días de semana recurrentes sin
  atender (ej. "no trabajo los martes") y fechas puntuales sueltas (ej. un
  trámite), sin afectar a las otras estilistas. Se ve en la misma pestaña
  "Días cerrados", arriba del calendario global.
- **Confirmación por WhatsApp**: cada reserva creada muestra un botón que
  abre `https://wa.me/<telefono>?text=<mensaje>` con el turno ya redactado
  (link de "click to chat", sin necesitar la API oficial). El punto exacto
  donde en el futuro se conectaría la API de WhatsApp Business está marcado
  con un comentario en `src/admin/lib/whatsapp.ts`.

**Persistencia**: todo (estilistas activos, reservas, días cerrados,
disponibilidad personal por estilista) se guarda en `localStorage` del
navegador, igual que el patrón usado en la demo de pádel del mismo proyecto
— no hay backend ni base de datos real. Es una demo de portafolio, no un
sistema en producción.

## Cómo correrlo

```bash
npm install
npm run dev      # entorno de desarrollo
npm run build    # build de producción (carpeta dist/)
npm run preview  # sirve el build de producción localmente
```
