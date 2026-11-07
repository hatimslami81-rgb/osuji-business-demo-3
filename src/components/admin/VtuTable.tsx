import { Badge } from '@/components/ui/Badge'
import { formatNgn } from '@/lib/formatCurrency'
import { getNetworkName } from '@/data/dataPlans'
import type { VtuTransaction } from '@/types'

export function VtuTable({ transactions }: { transactions: VtuTransaction[] }) {
  if (transactions.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
        No demo VTU transactions yet. Complete an Airtime & Data or WhatsApp flow.
      </p>
    )
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-slate-100 bg-navy-50/70 text-xs uppercase tracking-wider text-slate-500">
          <tr>
            <th className="px-4 py-3 font-semibold">Reference</th>
            <th className="px-4 py-3 font-semibold">Network</th>
            <th className="px-4 py-3 font-semibold">Type</th>
            <th className="px-4 py-3 font-semibold">Phone</th>
            <th className="px-4 py-3 font-semibold">Amount</th>
            <th className="px-4 py-3 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id} className="border-b border-slate-50 last:border-0">
              <td className="px-4 py-3">
                <p className="font-medium text-navy-900">{txn.ref}</p>
                <p className="text-xs text-slate-500">
                  {new Date(txn.createdAt).toLocaleString('en-NG')}
                </p>
              </td>
              <td className="px-4 py-3">{getNetworkName(txn.network)}</td>
              <td className="px-4 py-3 capitalize">
                {txn.type}
                {txn.planLabel ? (
                  <span className="mt-0.5 block text-xs text-slate-500">
                    {txn.planLabel}
                  </span>
                ) : null}
              </td>
              <td className="px-4 py-3">{txn.phone}</td>
              <td className="px-4 py-3 font-semibold">{formatNgn(txn.amountNgn)}</td>
              <td className="px-4 py-3">
                <Badge tone="demo">Demo</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
