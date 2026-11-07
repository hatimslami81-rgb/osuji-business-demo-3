import { demoSales } from '@/data/sales'
import { formatNgnCompact } from '@/lib/formatCurrency'

export function SalesChart() {
  const max = Math.max(...demoSales.map((s) => s.amountNgn))

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-navy-900">Sales overview</h3>
          <p className="text-xs text-slate-500">Demo monthly revenue (mock data)</p>
        </div>
      </div>
      <div className="flex h-48 items-end gap-3">
        {demoSales.map((point) => {
          const height = Math.max(8, Math.round((point.amountNgn / max) * 100))
          return (
            <div key={point.month} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-[10px] font-medium text-slate-500">
                {formatNgnCompact(point.amountNgn)}
              </span>
              <div className="flex w-full flex-1 items-end">
                <div
                  className="w-full rounded-t-md bg-navy-800 transition hover:bg-accent-600"
                  style={{ height: `${height}%` }}
                  title={formatNgnCompact(point.amountNgn)}
                />
              </div>
              <span className="text-xs font-semibold text-navy-900">{point.month}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
