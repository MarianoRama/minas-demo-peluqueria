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

## Cómo correrlo

```bash
npm install
npm run dev      # entorno de desarrollo
npm run build    # build de producción (carpeta dist/)
npm run preview  # sirve el build de producción localmente
```
