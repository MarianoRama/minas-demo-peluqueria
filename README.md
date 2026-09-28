# Tijera & Tinta — demo de portafolio

Landing page para "Tijera & Tinta", un salón **ficticio** creado como pieza de
portafolio para mostrarle a dueños de
peluquerías y barberías de Minas, Uruguay, el tipo de sitio que un
freelancer puede desarrollarles.

**Este no es un negocio real.** El nombre, los servicios, los precios, los
horarios y la ubicación son ilustrativos. WhatsApp queda desactivado hasta
configurar el número real del negocio en `VITE_WHATSAPP_NUMBER` (formato
internacional, solo dígitos: `598` seguido de ocho dígitos). Sin el número, la
página permite preparar el mensaje para copiar.

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
- Consulta por WhatsApp cuando se configura un contacto real
- Horarios y ubicación con mapa de Google Maps embebido (búsqueda genérica
  "Minas, Uruguay")
- Footer con los límites claros de los datos ilustrativos

## Cómo correrlo

```bash
npm ci
npm run dev      # entorno de desarrollo
npm run build    # build de producción (carpeta dist/)
npm run preview  # sirve el build de producción localmente
```
