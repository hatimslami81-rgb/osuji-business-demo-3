import { getVtuTransactions } from '@/lib/storage'
import { VtuTable } from '@/components/admin/VtuTable'

export function AdminVtu() {
  const transactions = getVtuTransactions()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-navy-900">
          VTU Transactions
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Simulated airtime and data purchases from the VTU page and WhatsApp
          assistant. Nothing was delivered to customers.
        </p>
      </div>
      <VtuTable transactions={transactions} />
    </div>
  )
}
