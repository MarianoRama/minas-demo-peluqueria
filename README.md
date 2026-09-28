# Tijera & Tinta — demo de portafolio

Landing page para "Tijera & Tinta", un salón **ficticio** en Minas, Uruguay.
Incluye una solicitud de turno editable y un catálogo de productos con una
consulta preparada.

**Este no es un negocio real.** El nombre, los servicios, los precios, los
horarios y la ubicación son ilustrativos. WhatsApp queda desactivado hasta
configurar el número real del negocio en `VITE_WHATSAPP_NUMBER`. El formulario
no consulta disponibilidad ni confirma turnos; sin un número configurado,
permite revisar y copiar el mensaje.

La foto de portada es ilustrativa y no representa al salón: [Benyamin
Bohlouli, Unsplash](https://unsplash.com/photos/a-salon-with-a-mirror-chairs-and-lights-SmDZa6NlwMg).

## Stack

- [Vite](https://vite.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) (vía `@tailwindcss/vite`)
- Fuentes: Playfair Display (títulos) y Poppins (texto), de Google Fonts

## Secciones

- Header con menú de anclas (Inicio, Servicios, Contacto)
- Hero con imagen ilustrativa y enlace de contacto
- Servicios con tarjetas y precios de ejemplo (corte, color, tratamientos,
  barbería, manicura)
- Solicitud de turno con servicio, preferencia de profesional, fecha, hora y
  datos de contacto
- Catálogo de productos de ejemplo, filtros, selección y cesta de consulta
- Horarios y ubicación con mapa de Google Maps embebido (búsqueda genérica
  "Minas, Uruguay")
- Footer con los límites claros de los datos ilustrativos

Ver [ARCHITECTURE.md](ARCHITECTURE.md) para la integración mínima necesaria
para recibir solicitudes, manejar disponibilidad y vender productos.

## Cómo correrlo

```bash
npm ci
npm run dev      # entorno de desarrollo
npm run build    # build de producción (carpeta dist/)
npm run preview  # sirve el build de producción localmente
```
