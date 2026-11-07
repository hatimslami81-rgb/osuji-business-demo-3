import { Badge } from '@/components/ui/Badge'
import { formatNgn } from '@/lib/formatCurrency'
import type { Order, OrderStatus } from '@/types'

const statusTone: Record<OrderStatus, 'warning' | 'info' | 'success' | 'danger'> = {
  pending: 'warning',
  processing: 'info',
  completed: 'success',
  cancelled: 'danger',
}

export function OrdersTable({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
        No demo orders yet. Place an order from checkout to see it here.
      </p>
    )
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-slate-100 bg-navy-50/70 text-xs uppercase tracking-wider text-slate-500">
          <tr>
            <th className="px-4 py-3 font-semibold">Order</th>
            <th className="px-4 py-3 font-semibold">Customer</th>
            <th className="px-4 py-3 font-semibold">Total</th>
            <th className="px-4 py-3 font-semibold">Payment</th>
            <th className="px-4 py-3 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-slate-50 last:border-0">
              <td className="px-4 py-3">
                <p className="font-medium text-navy-900">{order.id}</p>
                <p className="text-xs text-slate-500">
                  {new Date(order.createdAt).toLocaleString('en-NG')}
                </p>
              </td>
              <td className="px-4 py-3">
                <p className="font-medium text-navy-900">{order.customer.fullName}</p>
                <p className="text-xs text-slate-500">{order.customer.email}</p>
              </td>
              <td className="px-4 py-3 font-semibold">{formatNgn(order.totalNgn)}</td>
              <td className="px-4 py-3 capitalize text-slate-600">
                {order.paymentMethod.replace('_', ' ')}
              </td>
              <td className="px-4 py-3">
                <Badge tone={statusTone[order.status]}>{order.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
