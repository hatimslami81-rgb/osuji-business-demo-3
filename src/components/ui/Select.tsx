import type { SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

export function Select({
  label,
  error,
  options,
  className = '',
  id,
  ...props
}: SelectProps) {
  const selectId = id ?? props.name
  return (
    <label className="block space-y-1.5">
      {label ? (
        <span className="text-sm font-medium text-navy-900">{label}</span>
      ) : null}
      <select
        id={selectId}
        className={[
          'w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-navy-900 outline-none transition-colors focus:border-navy-700 focus:ring-2 focus:ring-navy-100',
          error ? 'border-red-400' : 'border-slate-200',
          className,
        ].join(' ')}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </label>
  )
}
