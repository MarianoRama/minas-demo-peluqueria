import { useMemo, useState, type FormEvent } from "react"
import { whatsappLink } from "../lib/contact"

const products = [
  { id: "shampoo", name: "Champú", category: "Cuidado" },
  { id: "conditioner", name: "Acondicionador", category: "Cuidado" },
  { id: "mask", name: "Máscara capilar", category: "Cuidado" },
  { id: "oil", name: "Aceite capilar", category: "Cuidado" },
  { id: "cream", name: "Crema para peinar", category: "Styling" },
  { id: "fixer", name: "Spray fijador", category: "Styling" },
]
const categories = ["Todos", "Cuidado", "Styling"]

function Products() {
  const [category, setCategory] = useState("Todos")
  const [cart, setCart] = useState<Record<string, number>>({})
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const visibleProducts = category === "Todos" ? products : products.filter((product) => product.category === category)
  const cartItems = useMemo(() => products.filter((product) => cart[product.id]), [cart])
  const itemCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0)

  function changeQuantity(id: string, change: number) {
    setCart((current) => {
      const next = { ...current, [id]: (current[id] ?? 0) + change }
      if (next[id] <= 0) delete next[id]
      return next
    })
    setMessage("")
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const lines = [
      "Hola, quisiera consultar por productos en Tijera & Tinta (demo).",
      `Nombre: ${name.trim()}`,
      phone.trim() ? `Teléfono de contacto: ${phone.trim()}` : "",
      "Selección:",
      ...cartItems.map((item) => `• ${item.name} × ${cart[item.id]}`),
      "¿Podrían indicarme marcas, disponibilidad y precios?",
    ].filter(Boolean)
    setMessage(lines.join("\n"))
  }

  const contactUrl = message ? whatsappLink(message) : null

  return (
    <section id="productos" className="scroll-mt-32 bg-blush-100/60 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-rosewood">Catálogo de ejemplo</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-charcoal sm:text-4xl">Productos para consultar</h2>
          </div>
          <p className="max-w-lg text-sm leading-relaxed text-charcoal/65">Elegí artículos y armá una consulta. Marcas, stock y precios se confirman con el salón.</p>
        </div>

        <div className="mt-7 flex flex-wrap gap-2" aria-label="Filtrar productos por categoría">
          {categories.map((option) => (
            <button key={option} type="button" aria-pressed={category === option} onClick={() => setCategory(option)} className={`min-h-11 rounded-full border px-5 text-sm font-medium transition-colors ${category === option ? "border-rosewood bg-rosewood text-white" : "border-charcoal/20 bg-white text-charcoal hover:border-rosewood"}`}>
              {option}
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.map((product) => (
            <article key={product.id} className="flex items-center justify-between gap-4 rounded-xl border border-charcoal/10 bg-white p-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-rosewood">{product.category}</p>
                <h3 className="mt-1 font-semibold text-charcoal">{product.name}</h3>
              </div>
              <button type="button" onClick={() => changeQuantity(product.id, 1)} className="min-h-11 shrink-0 rounded-full border border-rosewood/40 px-4 text-sm font-semibold text-rosewood hover:bg-rosewood hover:text-white">{cart[product.id] ? `En consulta · ${cart[product.id]}` : "Agregar"}</button>
            </article>
          ))}
        </div>

        <form onSubmit={handleSubmit} onChange={() => setMessage("")} className="mt-8 grid gap-6 rounded-2xl bg-charcoal p-5 text-white sm:p-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-4">
              <h3 className="font-display text-2xl font-semibold">Tu consulta</h3>
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm">{itemCount} {itemCount === 1 ? "artículo" : "artículos"}</span>
            </div>
            {cartItems.length ? (
              <ul className="mt-3 divide-y divide-white/10">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex items-center justify-between gap-3 py-3">
                    <span className="text-sm">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <button type="button" aria-label={`Quitar una unidad de ${item.name}`} onClick={() => changeQuantity(item.id, -1)} className="h-9 w-9 rounded-full border border-white/25 hover:bg-white/10">−</button>
                      <span className="min-w-5 text-center text-sm">{cart[item.id]}</span>
                      <button type="button" aria-label={`Agregar una unidad de ${item.name}`} onClick={() => changeQuantity(item.id, 1)} className="h-9 w-9 rounded-full border border-white/25 hover:bg-white/10">+</button>
                      <button type="button" aria-label={`Quitar ${item.name} de la consulta`} onClick={() => changeQuantity(item.id, -cart[item.id])} className="ml-1 min-h-9 px-2 text-xs text-white/65 underline">Quitar</button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : <p className="py-6 text-sm text-white/60">Todavía no agregaste productos.</p>}
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium">
              Nombre
              <input required maxLength={80} autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} className="mt-2 min-h-11 w-full rounded-lg border border-white/20 bg-white px-3 text-charcoal" placeholder="Cómo te llamás" />
            </label>
            <label className="block text-sm font-medium">
              Teléfono <span className="font-normal text-white/60">(opcional)</span>
              <input type="tel" maxLength={30} autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} className="mt-2 min-h-11 w-full rounded-lg border border-white/20 bg-white px-3 text-charcoal" placeholder="Tu número de contacto" />
            </label>
            <button type="submit" disabled={!itemCount} className="min-h-12 w-full rounded-full bg-white px-5 py-3 font-semibold text-charcoal transition-colors hover:bg-blush-100 disabled:cursor-not-allowed disabled:opacity-40">Preparar consulta</button>
            {message && (contactUrl ? (
              <a href={contactUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-rosewood px-5 py-3 text-center text-sm font-semibold text-white hover:bg-rosewood/90">Continuar por WhatsApp</a>
            ) : (
              <label className="block text-xs text-white/70">Número de contacto pendiente<textarea readOnly value={message} rows={6} onFocus={(event) => event.currentTarget.select()} className="mt-2 w-full rounded-lg border border-white/20 bg-white p-3 text-sm text-charcoal" /></label>
            ))}
            <p className="text-xs leading-relaxed text-white/55">Este demo no confirma compras ni disponibilidad de productos.</p>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Products
