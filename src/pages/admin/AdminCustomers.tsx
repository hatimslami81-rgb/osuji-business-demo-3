import { demoCustomers } from '@/data/customers'
import { getOrders } from '@/lib/storage'
import { formatNgn } from '@/lib/formatCurrency'
import { Badge } from '@/components/ui/Badge'

export function AdminCustomers() {
  const orders = getOrders()
  const localCustomers = Object.values(
    orders.reduce<
      Record<
        string,
        { name: string; email: string; phone: string; orders: number; total: number }
      >
    >((acc, order) => {
      const key = order.customer.email.toLowerCase()
      if (!acc[key]) {
        acc[key] = {
          name: order.customer.fullName,
          email: order.customer.email,
          phone: order.customer.phone,
          orders: 0,
          total: 0,
        }
      }
      acc[key].orders += 1
      acc[key].total += order.totalNgn
      return acc
    }, {}),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-navy-900">
          Customers
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Sample customers plus shoppers created through demo checkout.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-100 bg-navy-50/70 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3 font-semibold">Customer</th>
              <th className="px-4 py-3 font-semibold">Phone</th>
              <th className="px-4 py-3 font-semibold">Orders</th>
              <th className="px-4 py-3 font-semibold">Total spent</th>
              <th className="px-4 py-3 font-semibold">Source</th>
            </tr>
          </thead>
          <tbody>
            {demoCustomers.map((customer) => (
              <tr key={customer.id} className="border-b border-slate-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-navy-900">{customer.name}</p>
                  <p className="text-xs text-slate-500">{customer.email}</p>
                </td>
                <td className="px-4 py-3">{customer.phone}</td>
                <td className="px-4 py-3">{customer.orders}</td>
                <td className="px-4 py-3 font-semibold">
                  {formatNgn(customer.totalSpentNgn)}
                </td>
                <td className="px-4 py-3">
                  <Badge tone="info">Sample</Badge>
                </td>
              </tr>
            ))}
            {localCustomers.map((customer) => (
              <tr key={customer.email} className="border-b border-slate-50 last:border-0">
                <td className="px-4 py-3">
                  <p className="font-medium text-navy-900">{customer.name}</p>
                  <p className="text-xs text-slate-500">{customer.email}</p>
                </td>
                <td className="px-4 py-3">{customer.phone}</td>
                <td className="px-4 py-3">{customer.orders}</td>
                <td className="px-4 py-3 font-semibold">
                  {formatNgn(customer.total)}
                </td>
                <td className="px-4 py-3">
                  <Badge tone="demo">Local demo</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
