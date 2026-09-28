import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'
import { IconAlerta } from '../components/icons'

export function Campo({
  etiqueta,
  ayuda,
  error,
  htmlFor,
  children,
}: {
  etiqueta: string
  ayuda?: string
  error?: string
  htmlFor: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-ink">
        {etiqueta}
      </label>
      {ayuda && <p className="mt-0.5 text-xs text-ink/50">{ayuda}</p>}
      <div className="mt-1.5">{children}</div>
      {error && (
        <p role="alert" className="mt-1.5 text-sm text-wine">
          {error}
        </p>
      )}
    </div>
  )
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`block min-h-[46px] w-full border border-ink/25 bg-cream px-3.5 py-2.5 text-ink outline-none focus:border-wine focus:ring-2 focus:ring-wine/20 ${props.className ?? ''}`}
    />
  )
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`block w-full border border-ink/25 bg-cream px-3.5 py-2.5 text-ink outline-none focus:border-wine focus:ring-2 focus:ring-wine/20 ${props.className ?? ''}`}
    />
  )
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`block min-h-[46px] w-full border border-ink/25 bg-cream px-3.5 py-2.5 text-ink outline-none focus:border-wine focus:ring-2 focus:ring-wine/20 ${props.className ?? ''}`}
    />
  )
}

export function BotonPrimario({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className={`inline-flex min-h-[46px] items-center justify-center gap-2 bg-ink px-5 text-sm font-semibold text-cream transition-colors hover:bg-wine disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
    />
  )
}

export function BotonSecundario({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className={`inline-flex min-h-[46px] items-center justify-center gap-2 border border-ink/25 px-5 text-sm font-semibold text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
    />
  )
}

export function BotonPeligro({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className={`inline-flex min-h-[46px] items-center justify-center gap-2 border border-wine px-5 text-sm font-semibold text-wine transition-colors hover:bg-wine hover:text-cream disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
    />
  )
}

export function Toggle({
  id,
  checked,
  onChange,
  etiqueta,
  ...rest
}: { id: string; checked: boolean; onChange: (v: boolean) => void; etiqueta: string } & Omit<
  LabelHTMLAttributes<HTMLLabelElement>,
  'onChange'
>) {
  return (
    <label htmlFor={id} className="flex min-h-[44px] cursor-pointer items-center gap-3" {...rest}>
      <span className="relative inline-flex h-6 w-11 shrink-0 items-center border border-ink/30">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <span className="absolute inset-0.5 flex items-center bg-cream transition-colors peer-checked:bg-wine">
          <span
            className={`block h-4 w-4 bg-paper transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`}
          />
        </span>
      </span>
      <span className="text-sm font-medium text-ink">{etiqueta}</span>
    </label>
  )
}

export function Aviso({ children, tono = 'info' }: { children: ReactNode; tono?: 'info' | 'error' }) {
  return (
    <p
      className={`flex items-start gap-2 border px-3.5 py-2.5 text-sm ${
        tono === 'error' ? 'border-wine/40 bg-wine/5 text-wine' : 'border-ink/20 bg-cream-dim text-ink/70'
      }`}
    >
      <IconAlerta className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  )
}

export function DialogoConfirmar({
  titulo,
  descripcion,
  textoConfirmar = 'Sí, continuar',
  peligroso,
  onConfirmar,
  onCancelar,
}: {
  titulo: string
  descripcion: string
  textoConfirmar?: string
  peligroso?: boolean
  onConfirmar: () => void
  onCancelar: () => void
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialogo-titulo"
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-5"
    >
      <div className="w-full max-w-sm border border-ink/15 bg-paper p-6">
        <h3 id="dialogo-titulo" className="font-display text-xl font-semibold text-ink">
          {titulo}
        </h3>
        <p className="mt-2 text-sm text-ink/65">{descripcion}</p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          {peligroso ? (
            <BotonPeligro className="flex-1 bg-wine text-cream hover:bg-wine-dark" onClick={onConfirmar}>
              {textoConfirmar}
            </BotonPeligro>
          ) : (
            <BotonPrimario className="flex-1" onClick={onConfirmar}>
              {textoConfirmar}
            </BotonPrimario>
          )}
          <BotonSecundario className="flex-1" onClick={onCancelar}>
            Cancelar
          </BotonSecundario>
        </div>
      </div>
    </div>
  )
}
