import { useState, type FormEvent, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Fan } from './Fan'
import './form.css'

type FieldProps = { label: string; hint?: string; wide?: boolean }

export function Field({ label, hint, wide, ...input }: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`field ${wide ? 'field--wide' : ''}`}>
      <span className="field__label">
        {label}
        {!input.required && <span className="field__opt"> (optional)</span>}
      </span>
      <input {...input} />
      {hint && <span className="field__hint">{hint}</span>}
    </label>
  )
}

export function SelectField({ label, hint, wide, children, ...select }: FieldProps & SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <label className={`field ${wide ? 'field--wide' : ''}`}>
      <span className="field__label">{label}</span>
      <select {...select}>{children}</select>
      {hint && <span className="field__hint">{hint}</span>}
    </label>
  )
}

export function TextField({ label, hint, ...area }: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="field field--wide">
      <span className="field__label">
        {label}
        {!area.required && <span className="field__opt"> (optional)</span>}
      </span>
      <textarea rows={4} {...area} />
      {hint && <span className="field__hint">{hint}</span>}
    </label>
  )
}

export function Choice({
  name,
  options,
  value,
  onChange,
  legend,
}: {
  name: string
  options: { value: string; label: string; note?: string }[]
  value: string
  onChange: (v: string) => void
  legend: string
}) {
  return (
    <fieldset className="choice field--wide">
      <legend className="field__label">{legend}</legend>
      <div className="choice__row">
        {options.map((o) => (
          <label key={o.value} className={`choice__opt ${value === o.value ? 'is-on' : ''}`}>
            <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} />
            <span className="choice__label">{o.label}</span>
            {o.note && <span className="choice__note">{o.note}</span>}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

/**
 * A front-end-only enquiry form: on submit it spins the fan briefly,
 * then swaps to the confirmation. Nothing is sent anywhere.
 */
export function MockForm({
  children,
  submitLabel,
  confirmation,
  className = '',
}: {
  children: ReactNode
  submitLabel: string
  confirmation: (data: Record<string, string>) => ReactNode
  className?: string
}) {
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle')
  const [data, setData] = useState<Record<string, string>>({})

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const entries = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>
    setData(entries)
    setState('sending')
    window.setTimeout(() => {
      setState('done')
      window.scrollTo({ top: (e.target as HTMLElement).getBoundingClientRect().top + window.scrollY - 120 })
    }, 1300)
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {state === 'done' ? (
        <motion.div key="done" className="confirm" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} role="status">
          {confirmation(data)}
          <p className="confirm__demo small">This is a demo: nothing has been sent or booked.</p>
        </motion.div>
      ) : (
        <motion.form key="form" className={`mock-form ${className}`} onSubmit={submit} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
          <div className="mock-form__fields">{children}</div>
          <div className="mock-form__submit">
            <button type="submit" className="btn" disabled={state === 'sending'}>
              {state === 'sending' ? 'Sending' : submitLabel}
            </button>
            {state === 'sending' && <Fan size={40} />}
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
