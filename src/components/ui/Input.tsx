import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export function Input({ label, error, hint, className = '', id, ...props }: InputProps) {
  const inputId = id ?? props.name
  return (
    <label className="block space-y-1.5">
      {label ? (
        <span className="text-sm font-medium text-navy-900">{label}</span>
      ) : null}
      <input
        id={inputId}
        className={[
          'w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-navy-900 outline-none transition-colors placeholder:text-slate-400 focus:border-navy-700 focus:ring-2 focus:ring-navy-100',
          error ? 'border-red-400' : 'border-slate-200',
          className,
        ].join(' ')}
        {...props}
      />
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
      {!error && hint ? <span className="text-xs text-slate-500">{hint}</span> : null}
    </label>
  )
}
