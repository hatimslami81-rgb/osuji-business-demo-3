import type { ReactNode } from 'react'

type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'demo'

const tones: Record<Tone, string> = {
  neutral: 'bg-slate-100 text-slate-700',
  success: 'bg-accent-50 text-accent-700',
  warning: 'bg-amber-50 text-amber-800',
  danger: 'bg-red-50 text-red-700',
  info: 'bg-navy-100 text-navy-800',
  demo: 'bg-amber-100 text-amber-900 border border-amber-200',
}

export function Badge({
  children,
  tone = 'neutral',
  className = '',
}: {
  children: ReactNode
  tone?: Tone
  className?: string
}) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold',
        tones[tone],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  )
}
