import type { ReactNode } from 'react'

export function StatCard({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon: ReactNode
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {label}
          </p>
          <p className="mt-2 text-2xl font-bold text-navy-900">{value}</p>
        </div>
        <div className="rounded-xl bg-navy-50 p-2.5 text-navy-800">{icon}</div>
      </div>
    </div>
  )
}
