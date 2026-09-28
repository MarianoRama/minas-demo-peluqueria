import { useEffect, useState, type FormEvent } from "react"
import { appointmentTimes, estimatedDuration, estimatedTotalDuration, sampleProfessionals, serviceGroups } from "../data/appointments"
import { whatsappLink } from "../lib/contact"

const services: { name: string; price: string }[] = serviceGroups.flatMap((group) => group.services.map((service) => ({ name: service.name, price: service.price })))
const serviceNames = services.map((service) => service.name)
const serviceByName = new Map(services.map((service) => [service.name, service]))

function todayValue() {
  const date = new Date()
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
  return localDate.toISOString().slice(0, 10)
}

function formatDate(value: string) {
  if (!value) return "Elegí una fecha"
  return new Date(`${value}T12:00:00`).toLocaleDateString("es-UY", {
    weekday: "long", day: "numeric", month: "long",
  })
}

function priceValue(service: string) {
  return Number(serviceByName.get(service)?.price.replace(/[^0-9]/g, "") ?? 0)
}

function formatPrice(value: number) {
  return `$${new Intl.NumberFormat("es-UY").format(value)}`
}

function Booking({ initialService, serviceRequestId }: { initialService?: string; serviceRequestId: number }) {
  const [selectedServices, setSelectedServices] = useState<string[]>([initialService ?? serviceNames[0]])
  const [serviceToAdd, setServiceToAdd] = useState(serviceNames.find((name) => name !== (initialService ?? serviceNames[0])) ?? serviceNames[0])
  const [professional, setProfessional] = useState(sampleProfessionals[0])
  const [date, setDate] = useState(todayValue())
  const [time, setTime] = useState(getValidTimes(todayValue(), [initialService ?? serviceNames[0]])[0] ?? "")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [notes, setNotes] = useState("")
  const [requestMessage, setRequestMessage] = useState("")

  useEffect(() => {
    if (initialService && serviceNames.includes(initialService)) addService(initialService)
  }, [initialService, serviceRequestId])

  const duration = estimatedTotalDuration(selectedServices)
  const totalPrice = selectedServices.reduce((total, service) => total + priceValue(service), 0)
  const validTimes = getValidTimes(date, selectedServices)

  function addService(service: string) {
    if (selectedServices.includes(service)) return
    const nextServices = [...selectedServices, service]
    setSelectedServices(nextServices)
    setTime(getValidTimes(date, nextServices)[0] ?? "")
    setRequestMessage("")
  }

  function removeService(service: string) {
    if (selectedServices.length <= 1) return
    const nextServices = selectedServices.filter((item) => item !== service)
    setSelectedServices(nextServices)
    setTime(getValidTimes(date, nextServices)[0] ?? "")
    setRequestMessage("")
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!selectedServices.length || !validTimes.includes(time)) return
    setRequestMessage([
      "Hola, quisiera solicitar un turno en Tijera & Tinta (demo).",
      `Servicios: ${selectedServices.join(", ")}`,
      `Precio total estimado de ejemplo: ${formatPrice(totalPrice)} UYU`,
      `Profesional: ${professional}`,
      `Fecha: ${formatDate(date)} de ${time} a ${endTime(time, duration)}`,
      `Nombre: ${name.trim()}`,
      phone.trim() ? `Teléfono de contacto: ${phone.trim()}` : "Sin teléfono de contacto indicado",
      notes.trim() ? `Notas: ${notes.trim()}` : "",
    ].filter(Boolean).join("\n"))
  }

  const requestLink = requestMessage ? whatsappLink(requestMessage) : null

  return (
    <section id="reservar" className="scroll-mt-32 bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-rosewood">Un pedido claro, paso a paso</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-charcoal sm:text-4xl">Solicitá un turno</h2>
          <p className="mt-3 leading-relaxed text-charcoal/70">Elegí uno o más servicios, tu preferencia de profesional y un horario para solicitar. El salón debe confirmar la disponibilidad: enviar este mensaje no reserva el turno.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">
          <form onSubmit={handleSubmit} onChange={() => setRequestMessage("")} className="space-y-6 rounded-2xl border border-charcoal/10 bg-blush-50 p-5 sm:p-8">
            <fieldset className="grid gap-4 sm:grid-cols-2">
              <legend className="mb-3 font-display text-xl font-semibold text-charcoal">1. Elegí los servicios</legend>
              <div className="space-y-3 sm:col-span-2">
                {selectedServices.map((service) => (
                  <div key={service} className="flex items-center justify-between gap-3 rounded-xl border border-charcoal/10 bg-white p-3 sm:p-4">
                    <div className="min-w-0">
                      <p className="font-medium text-charcoal">{service}</p>
                      <p className="mt-1 text-xs text-charcoal/60">{estimatedDuration(service)} min · Precio de ejemplo: {formatPrice(priceValue(service))}</p>
                    </div>
                    <button type="button" disabled={selectedServices.length === 1} onClick={() => removeService(service)} aria-label={`Quitar ${service}`} className="min-h-10 shrink-0 rounded-full border border-charcoal/20 px-3 text-sm font-medium text-charcoal hover:border-rosewood hover:text-rosewood disabled:cursor-not-allowed disabled:opacity-40">Quitar</button>
                  </div>
                ))}
              </div>
              <label className="text-sm font-medium text-charcoal sm:col-span-2">
                Agregar servicio
                <select value={serviceToAdd} onChange={(event) => setServiceToAdd(event.target.value)} className="mt-2 min-h-12 w-full rounded-lg border border-charcoal/20 bg-white px-3 text-base">
                  {serviceNames.map((option) => <option key={option} value={option} disabled={selectedServices.includes(option)}>{option}{selectedServices.includes(option) ? " · ya agregado" : ""}</option>)}
                </select>
              </label>
              <button type="button" disabled={selectedServices.includes(serviceToAdd)} onClick={() => addService(serviceToAdd)} className="min-h-11 w-full rounded-full border border-rosewood px-5 py-2 text-sm font-semibold text-rosewood hover:bg-rosewood hover:text-white disabled:cursor-not-allowed disabled:opacity-40 sm:col-span-2 sm:w-fit">Agregar servicio</button>
              <p className="text-xs text-charcoal/60 sm:col-span-2">Los precios y tiempos son estimaciones ilustrativas; el salón confirma el valor final.</p>
              <label className="text-sm font-medium text-charcoal sm:col-span-2">
                Profesional <span className="font-normal text-charcoal/60">(opcional)</span>
                <select value={professional} onChange={(event) => setProfessional(event.target.value)} className="mt-2 min-h-12 w-full rounded-lg border border-charcoal/20 bg-white px-3 text-base">
                  {sampleProfessionals.map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
            </fieldset>

            <fieldset className="grid gap-4 sm:grid-cols-2">
              <legend className="mb-3 font-display text-xl font-semibold text-charcoal">2. Proponé día y hora</legend>
              <label className="text-sm font-medium text-charcoal">
                Fecha
                <input required type="date" min={todayValue()} value={date} onChange={(event) => { const nextDate = event.target.value; const nextTimes = getValidTimes(nextDate, selectedServices); setDate(nextDate); setTime(nextTimes[0] ?? "") }} className="mt-2 min-h-12 w-full rounded-lg border border-charcoal/20 bg-white px-3 text-base" />
              </label>
              <label className="text-sm font-medium text-charcoal">
                Hora propuesta
                <span className="mt-2 block text-xs font-normal text-charcoal/60">Duración total estimada: {duration} min</span>
                <div role="group" aria-label="Elegí una hora propuesta" className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {validTimes.map((option) => (
                    <button key={option} type="button" aria-pressed={time === option} onClick={() => { setTime(option); setRequestMessage("") }} className={`min-h-11 rounded-lg border px-2 text-sm font-semibold ${time === option ? "border-rosewood bg-rosewood text-white" : "border-charcoal/20 bg-white text-charcoal hover:border-rosewood"}`}>
                      {option}
                    </button>
                  ))}
                </div>
                {!validTimes.length && <p className="mt-2 text-xs text-rosewood">No quedan horas de referencia para esta fecha; elegí otra fecha o quitá un servicio.</p>}
              </label>
              <p className="text-xs leading-relaxed text-charcoal/60 sm:col-span-2">Las horas propuestas respetan el horario de cierre ilustrativo. El salón responde para aceptar o proponer otro horario.</p>
            </fieldset>

            <fieldset className="grid gap-4 sm:grid-cols-2">
              <legend className="mb-3 font-display text-xl font-semibold text-charcoal">3. Dejanos tus datos</legend>
              <label className="text-sm font-medium text-charcoal">
                Nombre
                <input required maxLength={80} autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} className="mt-2 min-h-12 w-full rounded-lg border border-charcoal/20 bg-white px-3 text-base" placeholder="Cómo te llamás" />
              </label>
              <label className="text-sm font-medium text-charcoal">
                Teléfono <span className="font-normal text-charcoal/60">(opcional)</span>
                <input type="tel" maxLength={30} autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} className="mt-2 min-h-12 w-full rounded-lg border border-charcoal/20 bg-white px-3 text-base" placeholder="Tu número de contacto" />
              </label>
              <label className="text-sm font-medium text-charcoal sm:col-span-2">
                Nota para el salón <span className="font-normal text-charcoal/60">(opcional)</span>
                <textarea maxLength={300} value={notes} onChange={(event) => setNotes(event.target.value)} rows={3} className="mt-2 w-full rounded-lg border border-charcoal/20 bg-white p-3 text-base" placeholder="Por ejemplo, el largo de cabello o el estilo que tenés en mente" />
              </label>
            </fieldset>

            <button type="submit" disabled={!selectedServices.length || !validTimes.includes(time)} className="min-h-12 w-full rounded-full bg-rosewood px-6 py-3 font-semibold text-white transition-colors hover:bg-rosewood/90 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto">Revisar solicitud</button>
          </form>

          <aside aria-live="polite" className="h-fit rounded-2xl bg-charcoal p-5 text-white sm:p-7 lg:sticky lg:top-36">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-light">Tu resumen</p>
            <h3 className="mt-2 font-display text-2xl font-semibold">Solicitud de turno</h3>
            <dl className="mt-5 space-y-3 text-sm">
              <div><dt className="text-white/55">Servicios</dt><dd className="mt-1 space-y-1 font-medium">{selectedServices.map((service) => <div key={service}>{service}</div>)}</dd></div>
              <div><dt className="text-white/55">Duración total estimada</dt><dd className="font-medium">{duration} min</dd></div>
              <div><dt className="text-white/55">Precio total estimado de ejemplo</dt><dd className="font-medium">{formatPrice(totalPrice)} UYU</dd></div>
              <div><dt className="text-white/55">Preferencia</dt><dd className="font-medium">{professional}</dd></div>
              <div><dt className="text-white/55">Fecha y hora propuestas</dt><dd className="font-medium capitalize">{formatDate(date)} · {time || "Elegí una hora"}{time ? `–${endTime(time, duration)}` : ""}</dd></div>
              <div><dt className="text-white/55">A nombre de</dt><dd className="font-medium">{name || "Completá tu nombre"}</dd></div>
            </dl>
            {requestMessage && (
              <div className="mt-6 border-t border-white/15 pt-5">
                {requestLink ? (
                  <a href={requestLink} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-charcoal hover:bg-blush-100">Continuar por WhatsApp</a>
                ) : (
                  <label className="block text-sm text-white/80">Número pendiente de configurar<textarea readOnly value={requestMessage} rows={9} onFocus={(event) => event.currentTarget.select()} className="mt-2 w-full rounded-lg border border-white/20 bg-white p-3 text-sm text-charcoal" /></label>
                )}
                <p className="mt-3 text-xs leading-relaxed text-white/60">La solicitud queda a la espera de respuesta del salón. Este sitio demo no consulta una agenda ni confirma turnos.</p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  )
}

export default Booking

function endTime(start: string, minutes: number) {
  const [hour = 0, minute = 0] = start.split(":").map(Number)
  const totalMinutes = hour * 60 + minute + minutes
  return `${String(Math.floor(totalMinutes / 60)).padStart(2, "0")}:${String(totalMinutes % 60).padStart(2, "0")}`
}

function getValidTimes(date: string, selectedServices: string[]) {
  if (!date || date < todayValue()) return []
  const now = new Date()
  const nowMinutes = date === todayValue() ? now.getHours() * 60 + now.getMinutes() : -1
  const weekday = date ? new Date(`${date}T12:00:00`).getDay() : -1
  const closesAt = weekday === 6 ? 13 * 60 : weekday === 0 ? 0 : 19 * 60
  const duration = estimatedTotalDuration(selectedServices)
  return appointmentTimes.filter((slot) => {
    const [hour = 0, minute = 0] = slot.split(":").map(Number)
    const start = hour * 60 + minute
    return start > nowMinutes && start + duration <= closesAt
  })
}


