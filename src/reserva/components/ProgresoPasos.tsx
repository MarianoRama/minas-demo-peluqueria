function ProgresoPasos({ paso, total }: { paso: number; total: number }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2">
        {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
          <div
            key={n}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              n <= paso ? 'bg-rosewood' : 'bg-rosewood/15'
            }`}
          />
        ))}
      </div>
      <p className="mt-2 text-xs font-semibold text-charcoal/40">
        Paso {paso} de {total}
      </p>
    </div>
  )
}

export default ProgresoPasos
