export const serviceGroups = [
  {
    category: "Corte",
    services: [
      { name: "Corte dama", price: "$450" },
      { name: "Corte caballero", price: "$350" },
      { name: "Corte niños", price: "$280" },
    ],
  },
  {
    category: "Color",
    services: [
      { name: "Color raíz", price: "$900" },
      { name: "Color completo", price: "$1.400" },
      { name: "Mechas / balayage", price: "$1.800" },
    ],
  },
  {
    category: "Tratamientos",
    services: [
      { name: "Hidratación profunda", price: "$650" },
      { name: "Alisado / keratina", price: "$2.200" },
      { name: "Botox capilar", price: "$1.600" },
    ],
  },
  {
    category: "Barbería",
    services: [
      { name: "Corte + barba", price: "$500" },
      { name: "Afeitado clásico", price: "$380" },
      { name: "Perfilado de barba", price: "$250" },
    ],
  },
  {
    category: "Manicura",
    services: [
      { name: "Manicura clásica", price: "$300" },
      { name: "Esmaltado semipermanente", price: "$480" },
      { name: "Manicura + pedicura", price: "$700" },
    ],
  },
] as const

export const sampleProfessionals = ["Sin preferencia", "Lucía (ejemplo)", "Martín (ejemplo)"]
export const appointmentTimes = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
  "15:00", "16:00", "17:00", "18:00",
]

export function estimatedDuration(service: string) {
  if (/color|mechas|balayage/i.test(service)) return 120
  if (/hidratación|keratina|alisado|botox/i.test(service)) return 90
  if (/manicura|pedicura/i.test(service)) return 60
  return 45
}

export function estimatedTotalDuration(services: string[]) {
  return services.reduce((total, service) => total + estimatedDuration(service), 0)
}

