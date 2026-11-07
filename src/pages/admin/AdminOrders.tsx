import { getOrders } from '@/lib/storage'
import { OrdersTable } from '@/components/admin/OrdersTable'

export function AdminOrders() {
  const orders = getOrders()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-navy-900">
          Orders
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Demo orders created through checkout and stored in this browser.
        </p>
      </div>
      <OrdersTable orders={orders} />
    </div>
  )
}
