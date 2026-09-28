function PasoContacto({
  cliente,
  telefono,
  onClienteChange,
  onTelefonoChange,
}: {
  cliente: string
  telefono: string
  onClienteChange: (valor: string) => void
  onTelefonoChange: (valor: string) => void
}) {
  return (
    <div>
      <h2 className="mb-1 font-display text-xl font-bold text-charcoal">
        Tus datos de contacto
      </h2>
      <p className="mb-4 text-sm text-charcoal/60">
        Estos datos quedan en la solicitud local de esta demo; no se envían al salón.
      </p>

      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-charcoal/70">
            Nombre y apellido
          </span>
          <input
            autoFocus
            value={cliente}
            onChange={(e) => onClienteChange(e.target.value)}
            placeholder="Nombre y apellido"
            className="rounded-xl border border-rosewood/20 px-4 py-3.5 text-base outline-none focus:border-rosewood"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-charcoal/70">
            Teléfono (WhatsApp)
          </span>
          <input
            value={telefono}
            onChange={(e) => onTelefonoChange(e.target.value)}
            type="tel"
            inputMode="tel"
            placeholder="099 000 000"
            className="rounded-xl border border-rosewood/20 px-4 py-3.5 text-base outline-none focus:border-rosewood"
          />
        </label>
      </div>
    </div>
  )
}

export default PasoContacto

