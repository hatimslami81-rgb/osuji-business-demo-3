import { Package, ShoppingBag, Smartphone, Users } from 'lucide-react'
import { products } from '@/data/products'
import { demoCustomers } from '@/data/customers'
import { demoSales } from '@/data/sales'
import { getOrders, getVtuTransactions } from '@/lib/storage'
import { formatNgn, formatNgnCompact } from '@/lib/formatCurrency'
import { StatCard } from '@/components/admin/StatCard'
import { SalesChart } from '@/components/admin/SalesChart'
import { OrdersTable } from '@/components/admin/OrdersTable'
import { VtuTable } from '@/components/admin/VtuTable'

export function AdminDashboard() {
  const orders = getOrders()
  const vtu = getVtuTransactions()
  const localRevenue = orders.reduce((sum, o) => sum + o.totalNgn, 0)
  const mockRevenue = demoSales.reduce((sum, s) => sum + s.amountNgn, 0)
  const totalRevenue = localRevenue + mockRevenue

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-navy-900">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Overview of demo catalog metrics, local orders, and VTU activity.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Products"
          value={String(products.length)}
          icon={<Package className="h-5 w-5" />}
        />
        <StatCard
          label="Total Orders"
          value={String(orders.length)}
          icon={<ShoppingBag className="h-5 w-5" />}
        />
        <StatCard
          label="Total Customers"
          value={String(demoCustomers.length + new Set(orders.map((o) => o.customer.email)).size)}
          icon={<Users className="h-5 w-5" />}
        />
        <StatCard
          label="Total Revenue"
          value={formatNgnCompact(totalRevenue)}
          icon={<Smartphone className="h-5 w-5" />}
        />
      </div>

      <p className="text-xs text-slate-500">
        Revenue combines mock chart data ({formatNgn(mockRevenue)}) with local
        demo checkout totals ({formatNgn(localRevenue)}).
      </p>

      <SalesChart />

      <div className="grid gap-8 xl:grid-cols-2">
        <div>
          <h2 className="mb-3 text-lg font-semibold text-navy-900">
            Recent orders
          </h2>
          <OrdersTable orders={orders.slice(0, 6)} />
        </div>
        <div>
          <h2 className="mb-3 text-lg font-semibold text-navy-900">
            Recent VTU transactions
          </h2>
          <VtuTable transactions={vtu.slice(0, 6)} />
        </div>
      </div>
    </div>
  )
}
