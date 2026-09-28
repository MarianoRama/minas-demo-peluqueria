import { useEffect, useState, type FormEvent } from "react"
import { appointmentTimes, estimatedDuration, sampleProfessionals, serviceGroups } from "../data/appointments"
import { whatsappLink } from "../lib/contact"

const services = serviceGroups.flatMap((group) => group.services.map((service) => service.name))

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

function Booking({ initialService }: { initialService?: string }) {
  const [service, setService] = useState(initialService ?? services[0])
  const [professional, setProfessional] = useState(sampleProfessionals[0])
  const [date, setDate] = useState(todayValue())
  const [time, setTime] = useState(getValidTimes(todayValue(), initialService ?? services[0])[0] ?? "")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [notes, setNotes] = useState("")
  const [requestMessage, setRequestMessage] = useState("")

  useEffect(() => {
    if (initialService) {
      setService(initialService)
      setTime(getValidTimes(date, initialService)[0] ?? "")
      setRequestMessage("")
    }
  }, [initialService])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!validTimes.includes(time)) return
    setRequestMessage([
      "Hola, quisiera solicitar un turno en Tijera & Tinta (demo).",
      `Servicio: ${service}`,
      `Profesional: ${professional}`,
      `Fecha: ${formatDate(date)} de ${time} a ${endTime(time, estimatedDuration(service))}`,
      `Nombre: ${name.trim()}`,
      phone.trim() ? `Teléfono de contacto: ${phone.trim()}` : "Sin teléfono de contacto indicado",
      notes.trim() ? `Notas: ${notes.trim()}` : "",
    ].filter(Boolean).join("\n"))
  }

  const requestLink = requestMessage ? whatsappLink(requestMessage) : null
  const duration = estimatedDuration(service)
  const validTimes = getValidTimes(date, service)

  return (
    <section id="reservar" className="scroll-mt-32 bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-rosewood">Un pedido claro, paso a paso</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-charcoal sm:text-4xl">Solicitá un turno</h2>
          <p className="mt-3 leading-relaxed text-charcoal/70">Elegí el servicio, tu preferencia de profesional y un horario para solicitar. El salón debe confirmar la disponibilidad: enviar este mensaje no reserva el turno.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">
          <form onSubmit={handleSubmit} onChange={() => setRequestMessage("")} className="space-y-6 rounded-2xl border border-charcoal/10 bg-blush-50 p-5 sm:p-8">
            <fieldset className="grid gap-4 sm:grid-cols-2">
              <legend className="mb-3 font-display text-xl font-semibold text-charcoal">1. Elegí el servicio</legend>
              <label className="text-sm font-medium text-charcoal sm:col-span-2">
                Servicio
                <select required value={service} onChange={(event) => { setService(event.target.value); setTime(getValidTimes(date, event.target.value)[0] ?? "") }} className="mt-2 min-h-12 w-full rounded-lg border border-charcoal/20 bg-white px-3 text-base">
                  {services.map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
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
                <input required type="date" min={todayValue()} value={date} onChange={(event) => { setDate(event.target.value); setTime(getValidTimes(event.target.value, service)[0] ?? "") }} className="mt-2 min-h-12 w-full rounded-lg border border-charcoal/20 bg-white px-3 text-base" />
              </label>
              <label className="text-sm font-medium text-charcoal">
                Hora propuesta
                <span className="mt-2 block text-xs font-normal text-charcoal/60">Duración estimada de ejemplo: {duration} min</span>
                <div role="group" aria-label="Elegí una hora propuesta" className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {validTimes.map((option) => (
                    <button key={option} type="button" aria-pressed={time === option} onClick={() => { setTime(option); setRequestMessage("") }} className={`min-h-11 rounded-lg border px-2 text-sm font-semibold ${time === option ? "border-rosewood bg-rosewood text-white" : "border-charcoal/20 bg-white text-charcoal hover:border-rosewood"}`}>
                      {option}
                    </button>
                  ))}
                </div>
                {!validTimes.length && <p className="mt-2 text-xs text-rosewood">No quedan horas de referencia para hoy; elegí otra fecha.</p>}
              </label>
              <p className="text-xs leading-relaxed text-charcoal/60 sm:col-span-2">Fechas y horas de referencia. El salón responde para aceptar o proponer otro horario.</p>
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

            <button type="submit" disabled={!validTimes.includes(time)} className="min-h-12 w-full rounded-full bg-rosewood px-6 py-3 font-semibold text-white transition-colors hover:bg-rosewood/90 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto">Revisar solicitud</button>
          </form>

          <aside aria-live="polite" className="h-fit rounded-2xl bg-charcoal p-5 text-white sm:p-7 lg:sticky lg:top-36">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-light">Tu resumen</p>
            <h3 className="mt-2 font-display text-2xl font-semibold">Solicitud de turno</h3>
            <dl className="mt-5 space-y-3 text-sm">
              <div><dt className="text-white/55">Servicio</dt><dd className="font-medium">{service}</dd></div>
              <div><dt className="text-white/55">Preferencia</dt><dd className="font-medium">{professional}</dd></div>
              <div><dt className="text-white/55">Fecha y hora propuestas</dt><dd className="font-medium capitalize">{formatDate(date)} · {time}–{endTime(time, duration)}</dd></div>
              <div><dt className="text-white/55">A nombre de</dt><dd className="font-medium">{name || "Completá tu nombre"}</dd></div>
            </dl>
            {requestMessage && (
              <div className="mt-6 border-t border-white/15 pt-5">
                {requestLink ? (
                  <a href={requestLink} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-charcoal hover:bg-blush-100">Continuar por WhatsApp</a>
                ) : (
                  <label className="block text-sm text-white/80">Número pendiente de configurar<textarea readOnly value={requestMessage} rows={7} onFocus={(event) => event.currentTarget.select()} className="mt-2 w-full rounded-lg border border-white/20 bg-white p-3 text-sm text-charcoal" /></label>
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

function getValidTimes(date: string, selectedService: string) {
  const nowMinutes = date === todayValue() ? new Date().getHours() * 60 + new Date().getMinutes() : -1
  return appointmentTimes.filter((slot) => {
    const [hour = 0, minute = 0] = slot.split(":").map(Number)
    const start = hour * 60 + minute
    const closesAt = 19 * 60
    return start > nowMinutes && start + estimatedDuration(selectedService) <= closesAt
  })
}
