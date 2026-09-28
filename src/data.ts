/**
 * Datos ficticios del negocio — Tijera & Tinta (DEMO de portafolio).
 * Todo acá es de ejemplo: servicios, precios, equipo, horarios.
 *
 * Estos son los datos "de fábrica". El panel de administración (#/admin)
 * permite editarlos desde el navegador: los cambios se guardan en
 * localStorage (ver src/data/store.tsx) y el sitio público los lee siempre
 * a través del hook useDatos(), nunca importándolos de acá directamente.
 *
 * Cada ítem con posible foto real tiene un campo opcional `foto?: string`.
 * Si se carga una foto real ahí (o desde el panel), se muestra en lugar de
 * la ilustración SVG / iniciales.
 */

/** day.getDay(): 0 = domingo ... 6 = sábado */
export type DiaSemana = 0 | 1 | 2 | 3 | 4 | 5 | 6

export const NOMBRES_DIA: Record<DiaSemana, string> = {
  0: 'Domingo',
  1: 'Lunes',
  2: 'Martes',
  3: 'Miércoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sábado',
}

export type BloqueHorario = {
  dia: DiaSemana
  apertura: number | null // hora de apertura (24h). null = cerrado ese día
  cierre: number | null
}

export type DiaBloqueado = {
  fecha: string // YYYY-MM-DD
  motivo?: string
}

export type Negocio = {
  nombre: string
  rubro: string
  direccion: string
  referencia: string
  telefonoDisplay: string
  whatsapp: string
  email: string
  mapsQuery: string
  /** Foto real del salón para el hero (opcional). */
  heroFoto?: string
  /** Aviso corto que se muestra como novedad en el home (promo, feriado, etc.). */
  aviso: string
  /** Horario semanal, uno por día (0 = domingo ... 6 = sábado). */
  horarioSemana: BloqueHorario[]
  /** Días puntuales cerrados además del horario semanal (feriados, etc.). */
  diasBloqueados: DiaBloqueado[]
}

export const NEGOCIO: Negocio = {
  nombre: 'Tijera & Tinta',
  rubro: 'Peluquería y barbería',
  direccion: 'Treinta y Tres 812, esquina Rodó, Minas, Lavalleja',
  referencia: 'a dos cuadras de Plaza Libertad',
  telefonoDisplay: '+598 99 000 000',
  whatsapp: '59899000000',
  email: 'hola@tijerayatinta.demo',
  mapsQuery: 'Minas,+Lavalleja,+Uruguay',
  heroFoto: undefined,
  aviso: 'Turnos para el sábado casi completos: te conviene reservar con un par de días de antelación.',
  horarioSemana: [
    { dia: 0, apertura: null, cierre: null },
    { dia: 1, apertura: 9, cierre: 19 },
    { dia: 2, apertura: 9, cierre: 19 },
    { dia: 3, apertura: 9, cierre: 19 },
    { dia: 4, apertura: 9, cierre: 19 },
    { dia: 5, apertura: 9, cierre: 19 },
    { dia: 6, apertura: 9, cierre: 13 },
  ],
  diasBloqueados: [],
}

export type Servicio = {
  id: string
  nombre: string
  categoria: string
  precio: number
  duracionMin: number
  descripcion?: string
  foto?: string
  /** Si está en false, no aparece en la carta ni se puede reservar. */
  activo: boolean
  /** Marca manual "lo más pedido" para destacar en la carta impresa. */
  destacado?: boolean
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
    activo: true,
  },
  {
    id: 'corte-caballero',
    categoria: 'Corte',
    nombre: 'Corte caballero',
    precio: 350,
    duracionMin: 30,
    descripcion: 'Corte a tijera y máquina, terminación prolija.',
    activo: true,
    destacado: true,
  },
  {
    id: 'corte-ninos',
    categoria: 'Corte',
    nombre: 'Corte niños',
    precio: 280,
    duracionMin: 30,
    descripcion: 'Hasta 10 años. Traé la paciencia, la buena onda la ponemos nosotros.',
    activo: true,
  },
  // Color
  {
    id: 'color-raiz',
    categoria: 'Color',
    nombre: 'Color raíz',
    precio: 900,
    duracionMin: 60,
    descripcion: 'Retoque de raíz, un solo tono.',
    activo: true,
  },
  {
    id: 'color-completo',
    categoria: 'Color',
    nombre: 'Color completo',
    precio: 1400,
    duracionMin: 90,
    descripcion: 'Aplicación de raíz a puntas.',
    activo: true,
  },
  {
    id: 'mechas',
    categoria: 'Color',
    nombre: 'Mechas / balayage',
    precio: 1800,
    duracionMin: 120,
    descripcion: 'Técnica a elección según tipo de cabello.',
    activo: true,
    destacado: true,
  },
  // Tratamientos
  {
    id: 'hidratacion',
    categoria: 'Tratamientos',
    nombre: 'Hidratación profunda',
    precio: 650,
    duracionMin: 45,
    descripcion: 'Máscara nutritiva y masaje capilar.',
    activo: true,
  },
  {
    id: 'alisado',
    categoria: 'Tratamientos',
    nombre: 'Alisado / keratina',
    precio: 2200,
    duracionMin: 150,
    descripcion: 'Baja el volumen. Dura entre 3 y 4 meses.',
    activo: true,
  },
  {
    id: 'botox-capilar',
    categoria: 'Tratamientos',
    nombre: 'Botox capilar',
    precio: 1600,
    duracionMin: 90,
    descripcion: 'Repara la fibra sin alisar el pelo.',
    activo: true,
  },
  // Barbería
  {
    id: 'corte-barba',
    categoria: 'Barbería',
    nombre: 'Corte + barba',
    precio: 500,
    duracionMin: 45,
    descripcion: 'El combo de siempre, perfilado a navaja.',
    activo: true,
  },
  {
    id: 'afeitado',
    categoria: 'Barbería',
    nombre: 'Afeitado clásico',
    precio: 380,
    duracionMin: 30,
    descripcion: 'Toalla caliente, espuma y navaja.',
    activo: true,
  },
  {
    id: 'perfilado-barba',
    categoria: 'Barbería',
    nombre: 'Perfilado de barba',
    precio: 250,
    duracionMin: 20,
    descripcion: 'Prolijidad rápida entre corte y corte.',
    activo: true,
  },
  // Manicura
  {
    id: 'manicura-clasica',
    categoria: 'Manicura',
    nombre: 'Manicura clásica',
    precio: 300,
    duracionMin: 30,
    descripcion: 'Limado, cutícula y esmaltado tradicional.',
    activo: true,
  },
  {
    id: 'semipermanente',
    categoria: 'Manicura',
    nombre: 'Esmaltado semipermanente',
    precio: 480,
    duracionMin: 45,
    descripcion: 'Brillo que aguanta hasta 3 semanas.',
    activo: true,
  },
  {
    id: 'mani-pedi',
    categoria: 'Manicura',
    nombre: 'Manicura + pedicura',
    precio: 700,
    duracionMin: 75,
    descripcion: 'Combo completo de manos y pies.',
    activo: true,
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
  /** Días de la semana que atiende (0 = domingo ... 6 = sábado). */
  diasTrabaja: DiaSemana[]
  activo: boolean
}

export const EQUIPO: Profesional[] = [
  {
    id: 'valentina',
    nombre: 'Valentina Duarte',
    iniciales: 'VD',
    rol: 'Estilista senior',
    especialidad: 'Color y balayage',
    diasTrabaja: [1, 2, 3, 4, 5],
    activo: true,
  },
  {
    id: 'braian',
    nombre: 'Braian Ferreira',
    iniciales: 'BF',
    rol: 'Barbero',
    especialidad: 'Cortes clásicos y navaja',
    diasTrabaja: [2, 3, 4, 5, 6],
    activo: true,
  },
  {
    id: 'noelia',
    nombre: 'Noelia Acosta',
    iniciales: 'NA',
    rol: 'Estilista',
    especialidad: 'Tratamientos y alisados',
    diasTrabaja: [1, 2, 4, 5, 6],
    activo: true,
  },
  {
    id: 'ramiro',
    nombre: 'Ramiro Silveira',
    iniciales: 'RS',
    rol: 'Estilista',
    especialidad: 'Cortes y manicura',
    diasTrabaja: [1, 3, 4, 5, 6],
    activo: true,
  },
]

export type TrabajoGaleria = {
  id: string
  titulo: string
  categoria?: string
  foto?: string
  activo: boolean
}

// Sin fotos reales todavía: la sección de trabajos muestra marcos vacíos
// tipo polaroid hasta que se carguen fotos desde el panel.
export const GALERIA: TrabajoGaleria[] = []

// --- Compatibilidad hacia atrás (funciones puras usadas por lib/booking.ts) ---

export function horarioDelDia(horarioSemana: BloqueHorario[], dia: DiaSemana) {
  return horarioSemana.find((b) => b.dia === dia) ?? null
}
