/**
 * Datos ficticios del negocio — Tijera & Tinta (DEMO de portafolio).
 * Todo acá es de ejemplo: servicios, precios, equipo, horarios.
 *
 * Cada ítem con posible foto real tiene un campo opcional `foto?: string`.
 * Si Mariano carga una foto real ahí, se muestra en lugar de la ilustración
 * SVG / iniciales.
 */

export const NEGOCIO = {
  nombre: 'Tijera & Tinta',
  rubro: 'Peluquería y barbería',
  direccion: 'Treinta y Tres 812, esquina Rodó, Minas, Lavalleja',
  referencia: 'a dos cuadras de Plaza Libertad',
  telefonoDisplay: '+598 99 000 000',
  whatsapp: '59899000000',
  email: 'hola@tijerayatinta.demo',
  mapsQuery: 'Minas,+Lavalleja,+Uruguay',
}

export type Servicio = {
  id: string
  nombre: string
  categoria: string
  precio: number
  duracionMin: number
  descripcion?: string
  foto?: string
}

export const SERVICIOS: Servicio[] = [
  // Corte
  {
    id: 'corte-dama',
    categoria: 'Corte',
    nombre: 'Corte dama',
    precio: 450,
    duracionMin: 45,
    descripcion: 'Lavado, corte y secado con cepillo.',
  },
  {
    id: 'corte-caballero',
    categoria: 'Corte',
    nombre: 'Corte caballero',
    precio: 350,
    duracionMin: 30,
    descripcion: 'Corte a tijera y máquina, terminación prolija.',
  },
  {
    id: 'corte-ninos',
    categoria: 'Corte',
    nombre: 'Corte niños',
    precio: 280,
    duracionMin: 30,
    descripcion: 'Hasta 10 años, con paciencia y buena onda.',
  },
  // Color
  {
    id: 'color-raiz',
    categoria: 'Color',
    nombre: 'Color raíz',
    precio: 900,
    duracionMin: 60,
    descripcion: 'Retoque de raíz, un solo tono.',
  },
  {
    id: 'color-completo',
    categoria: 'Color',
    nombre: 'Color completo',
    precio: 1400,
    duracionMin: 90,
    descripcion: 'Aplicación de raíz a puntas.',
  },
  {
    id: 'mechas',
    categoria: 'Color',
    nombre: 'Mechas / balayage',
    precio: 1800,
    duracionMin: 120,
    descripcion: 'Técnica a elección según tipo de cabello.',
  },
  // Tratamientos
  {
    id: 'hidratacion',
    categoria: 'Tratamientos',
    nombre: 'Hidratación profunda',
    precio: 650,
    duracionMin: 45,
    descripcion: 'Máscara nutritiva + masaje capilar.',
  },
  {
    id: 'alisado',
    categoria: 'Tratamientos',
    nombre: 'Alisado / keratina',
    precio: 2200,
    duracionMin: 150,
    descripcion: 'Reduce el volumen, dura entre 3 y 4 meses.',
  },
  {
    id: 'botox-capilar',
    categoria: 'Tratamientos',
    nombre: 'Botox capilar',
    precio: 1600,
    duracionMin: 90,
    descripcion: 'Repara fibra capilar sin alisar.',
  },
  // Barbería
  {
    id: 'corte-barba',
    categoria: 'Barbería',
    nombre: 'Corte + barba',
    precio: 500,
    duracionMin: 45,
    descripcion: 'Combo clásico, perfilado con navaja.',
  },
  {
    id: 'afeitado',
    categoria: 'Barbería',
    nombre: 'Afeitado clásico',
    precio: 380,
    duracionMin: 30,
    descripcion: 'Toalla caliente, espuma y navaja.',
  },
  {
    id: 'perfilado-barba',
    categoria: 'Barbería',
    nombre: 'Perfilado de barba',
    precio: 250,
    duracionMin: 20,
    descripcion: 'Prolijidad rápida entre cortes.',
  },
  // Manicura
  {
    id: 'manicura-clasica',
    categoria: 'Manicura',
    nombre: 'Manicura clásica',
    precio: 300,
    duracionMin: 30,
    descripcion: 'Limado, cutícula y esmaltado tradicional.',
  },
  {
    id: 'semipermanente',
    categoria: 'Manicura',
    nombre: 'Esmaltado semipermanente',
    precio: 480,
    duracionMin: 45,
    descripcion: 'Brillo y duración hasta 3 semanas.',
  },
  {
    id: 'mani-pedi',
    categoria: 'Manicura',
    nombre: 'Manicura + pedicura',
    precio: 700,
    duracionMin: 75,
    descripcion: 'Combo completo de manos y pies.',
  },
]

export const CATEGORIAS = [
  'Corte',
  'Color',
  'Tratamientos',
  'Barbería',
  'Manicura',
] as const

export type Profesional = {
  id: string
  nombre: string
  iniciales: string
  rol: string
  especialidad: string
  foto?: string
}

export const EQUIPO: Profesional[] = [
  {
    id: 'valentina',
    nombre: 'Valentina Duarte',
    iniciales: 'VD',
    rol: 'Estilista senior',
    especialidad: 'Color y balayage',
  },
  {
    id: 'braian',
    nombre: 'Braian Ferreira',
    iniciales: 'BF',
    rol: 'Barbero',
    especialidad: 'Cortes clásicos y navaja',
  },
  {
    id: 'noelia',
    nombre: 'Noelia Acosta',
    iniciales: 'NA',
    rol: 'Estilista',
    especialidad: 'Tratamientos y alisados',
  },
  {
    id: 'ramiro',
    nombre: 'Ramiro Silveira',
    iniciales: 'RS',
    rol: 'Estilista',
    especialidad: 'Cortes y manicura',
  },
]

export type BloqueHorario = {
  dias: string
  horario: string
  cerrado?: boolean
}

export const HORARIOS: BloqueHorario[] = [
  { dias: 'Lunes a viernes', horario: '9:00 – 19:00' },
  { dias: 'Sábados', horario: '9:00 – 13:00' },
  { dias: 'Domingos', horario: 'Cerrado', cerrado: true },
]

// day.getDay(): 0 = domingo ... 6 = sábado
export const HORARIO_POR_DIA: Record<number, { apertura: number; cierre: number } | null> = {
  0: null, // domingo cerrado
  1: { apertura: 9, cierre: 19 },
  2: { apertura: 9, cierre: 19 },
  3: { apertura: 9, cierre: 19 },
  4: { apertura: 9, cierre: 19 },
  5: { apertura: 9, cierre: 19 },
  6: { apertura: 9, cierre: 13 },
}
